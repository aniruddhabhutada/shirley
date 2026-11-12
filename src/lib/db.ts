import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { getStore, type Store } from '@netlify/blobs';
import { FoundingMember, RegisterInput } from './types';

export type StorageBackend =
  | 'netlify-blobs-strong'
  | 'netlify-blobs-eventual'
  | 'local-file'
  | 'tmp-ephemeral'
  | 'memory';

export interface StorageDiagnostics {
  backend: StorageBackend;
  isNetlifyRuntime: boolean;
  hasBlobsContext: boolean;
  warning?: string;
}

interface DbData {
  members: FoundingMember[];
  nextMemberNumber: number;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'registrations.json');

// Ephemeral fallback directory for non-Netlify read-only filesystems
const TMP_DB_FILE = path.join(os.tmpdir(), 'shirley_registrations.json');

const BLOB_STORE_NAME = 'shirley-registrations';
const BLOB_KEY = 'members-v1';
const INITIAL_MEMBER_NUMBER = 101;
const NF_UNPATCHED_FETCH_SYMBOL = Symbol.for('nf-not-patched-fetch');

// Last-resort fallback only when both Netlify Blobs and writable disk storage fail
let memoryFallback: DbData | null = null;

function getBlobsFetch(): typeof fetch {
  const globalRec = globalThis as unknown as Record<symbol, unknown>;
  const nfOriginal = globalRec[NF_UNPATCHED_FETCH_SYMBOL];
  const currentFetch = globalThis.fetch as typeof fetch & { _nextOriginalFetch?: typeof fetch };
  const rawFetch =
    typeof nfOriginal === 'function'
      ? (nfOriginal as typeof fetch)
      : currentFetch?._nextOriginalFetch ?? currentFetch;

  return ((input: RequestInfo | URL, init?: RequestInit) => {
    const existingNext =
      init && 'next' in init && typeof (init as { next?: unknown }).next === 'object'
        ? (init as { next?: Record<string, unknown> }).next
        : undefined;
    return rawFetch(input, {
      ...init,
      // Opt out of Next.js 14 Data Cache / NetlifyCacheHandler for internal Blobs requests
      next: {
        ...existingNext,
        internal: true,
        revalidate: 0,
      },
    } as RequestInit);
  }) as typeof fetch;
}

function getRuntimeFlags() {
  const globalRec = globalThis as unknown as {
    netlifyBlobsContext?: unknown;
    Netlify?: { env?: { get?: (k: string) => string | undefined } };
  };
  const netlifyEnv = globalRec.Netlify?.env;
  const blobsEnvContext =
    globalRec.netlifyBlobsContext ||
    process.env.NETLIFY_BLOBS_CONTEXT ||
    netlifyEnv?.get?.('NETLIFY_BLOBS_CONTEXT');
  const explicitSiteId =
    process.env.NETLIFY_SITE_ID || process.env.SITE_ID || netlifyEnv?.get?.('SITE_ID');
  const explicitToken =
    process.env.NETLIFY_BLOBS_TOKEN ||
    process.env.NETLIFY_API_TOKEN ||
    process.env.NETLIFY_AUTH_TOKEN;

  const isNetlifyRuntime = Boolean(
    process.env.NETLIFY ||
      process.env.DEPLOY_ID ||
      process.env.CONTEXT ||
      process.env.SITE_ID ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      globalRec.netlifyBlobsContext ||
      netlifyEnv
  );
  const hasBlobsContext = Boolean(blobsEnvContext || (explicitSiteId && explicitToken));

  return {
    isNetlifyRuntime,
    hasBlobsContext,
    explicitSiteId,
    explicitToken,
  };
}

function normalizeDbData(raw: unknown): DbData {
  let parsedRaw = raw;
  if (typeof parsedRaw === 'string') {
    try {
      parsedRaw = JSON.parse(parsedRaw);
    } catch {
      parsedRaw = {};
    }
  }
  const obj = parsedRaw && typeof parsedRaw === 'object' ? (parsedRaw as Partial<DbData>) : {};
  const members = Array.isArray(obj.members) ? obj.members : [];
  const maxMemberNum = members.reduce(
    (max, m) => (typeof m?.memberNumber === 'number' && m.memberNumber > max ? m.memberNumber : max),
    0
  );
  const rawNext = typeof obj.nextMemberNumber === 'number' ? obj.nextMemberNumber : INITIAL_MEMBER_NUMBER;
  return {
    members,
    nextMemberNumber: Math.max(rawNext, maxMemberNum + 1, INITIAL_MEMBER_NUMBER),
  };
}

function readJsonFile(filePath: string): { data: DbData; mtimeMs: number } | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    const stats = fs.statSync(filePath);
    const raw = fs.readFileSync(filePath, 'utf-8');
    if (!raw.trim()) return null;
    return {
      data: normalizeDbData(JSON.parse(raw)),
      mtimeMs: stats.mtimeMs,
    };
  } catch (err) {
    console.warn(`[SHIRLEY DB] Failed to read ${filePath}:`, err);
    return null;
  }
}

function readLocalDataWithSource(): { data: DbData; source: 'local-file' | 'tmp-ephemeral' | 'memory' } {
  const repoFile = readJsonFile(DB_FILE);
  const tmpFile = readJsonFile(TMP_DB_FILE);

  // Prefer /tmp only when repo file is missing or /tmp was written more recently (read-only FS fallback)
  if (tmpFile && (!repoFile || tmpFile.mtimeMs > repoFile.mtimeMs)) {
    memoryFallback = tmpFile.data;
    return { data: tmpFile.data, source: 'tmp-ephemeral' };
  }

  if (repoFile) {
    memoryFallback = repoFile.data;
    return { data: repoFile.data, source: 'local-file' };
  }

  if (memoryFallback) {
    return { data: memoryFallback, source: 'memory' };
  }

  return { data: { members: [], nextMemberNumber: INITIAL_MEMBER_NUMBER }, source: 'local-file' };
}

function readLocalData(): DbData {
  return readLocalDataWithSource().data;
}

function writeLocalData(data: DbData): 'local-file' | 'tmp-ephemeral' | 'memory' {
  memoryFallback = data;
  const payload = JSON.stringify(data, null, 2);

  // Attempt 1: Atomic write to local project directory (standard Node.js / persistent server)
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tmpFile = `${DB_FILE}.${Date.now()}.${process.pid}.tmp`;
    fs.writeFileSync(tmpFile, payload, 'utf-8');
    fs.renameSync(tmpFile, DB_FILE);
    return 'local-file';
  } catch {
    // Read-only filesystem detected (e.g., serverless lambda)
  }

  // Attempt 2: Atomic write to os.tmpdir()
  try {
    const tmpFile = `${TMP_DB_FILE}.${Date.now()}.${process.pid}.tmp`;
    fs.writeFileSync(tmpFile, payload, 'utf-8');
    fs.renameSync(tmpFile, TMP_DB_FILE);
    return 'tmp-ephemeral';
  } catch {
    console.warn('[SHIRLEY DB] Operating in memory-only mode due to restricted filesystem.');
    return 'memory';
  }
}

function tryGetNetlifyStore(
  consistency: 'strong' | 'eventual' = 'strong'
): { store: Store | null; initError?: string } {
  const { explicitSiteId, explicitToken } = getRuntimeFlags();
  try {
    const blobsFetch = getBlobsFetch();
    // Only supply explicit credentials if a full pair was configured manually
    if (process.env.NETLIFY_SITE_ID && explicitToken) {
      return {
        store: getStore({
          name: BLOB_STORE_NAME,
          consistency,
          siteID: explicitSiteId,
          token: explicitToken,
          fetch: blobsFetch,
        }),
      };
    }
    return {
      store: getStore({
        name: BLOB_STORE_NAME,
        consistency,
        fetch: blobsFetch,
      }),
    };
  } catch (err: unknown) {
    const errName =
      err && typeof err === 'object' && 'name' in err
        ? String((err as { name?: unknown }).name)
        : '';
    if (errName === 'MissingBlobsEnvironmentError') {
      return { store: null, initError: 'MissingBlobsEnvironmentError' };
    }
    const errMsg = err instanceof Error ? err.message : String(err);
    console.warn('[SHIRLEY DB] Netlify Blobs initialization error:', err);
    return { store: null, initError: errMsg };
  }
}

async function withBlobsStore<T>(
  operation: (store: Store, backend: StorageBackend) => Promise<T>
): Promise<{ ok: true; value: T; storage: StorageDiagnostics } | { ok: false; storage: StorageDiagnostics }> {
  const runtime = getRuntimeFlags();
  const strongAttempt = tryGetNetlifyStore('strong');
  if (!strongAttempt.store) {
    return {
      ok: false,
      storage: {
        backend: 'local-file',
        isNetlifyRuntime: runtime.isNetlifyRuntime,
        hasBlobsContext: runtime.hasBlobsContext,
        warning: runtime.isNetlifyRuntime
          ? `Netlify Blobs unavailable (${strongAttempt.initError || 'no context'}). Set NETLIFY_SITE_ID and NETLIFY_BLOBS_TOKEN in Netlify Environment Variables or enable Blobs for this site.`
          : undefined,
      },
    };
  }

  try {
    const value = await operation(strongAttempt.store, 'netlify-blobs-strong');
    return {
      ok: true,
      value,
      storage: {
        backend: 'netlify-blobs-strong',
        isNetlifyRuntime: runtime.isNetlifyRuntime,
        hasBlobsContext: true,
      },
    };
  } catch (err: unknown) {
    const errName =
      err && typeof err === 'object' && 'name' in err
        ? String((err as { name?: unknown }).name)
        : '';

    // Retry with eventual consistency if environment lacks uncachedEdgeURL
    if (errName === 'BlobsConsistencyError') {
      const eventualAttempt = tryGetNetlifyStore('eventual');
      if (eventualAttempt.store) {
        try {
          const value = await operation(eventualAttempt.store, 'netlify-blobs-eventual');
          return {
            ok: true,
            value,
            storage: {
              backend: 'netlify-blobs-eventual',
              isNetlifyRuntime: runtime.isNetlifyRuntime,
              hasBlobsContext: true,
              warning: 'Using eventual Blobs consistency (uncachedEdgeURL unavailable); updates may take a few seconds to propagate.',
            },
          };
        } catch (eventualErr) {
          console.error('[SHIRLEY DB] Eventual Blobs fallback also failed:', eventualErr);
        }
      }
    }

    throw err;
  }
}

async function readBlobState(store: Store): Promise<{ data: DbData; etag?: string }> {
  const existing = await store.getWithMetadata(BLOB_KEY, { type: 'json' });
  if (existing && existing.data) {
    const normalized = normalizeDbData(existing.data);
    memoryFallback = normalized;
    return { data: normalized, etag: existing.etag };
  }

  // Seed Netlify Blobs on first access from bundled data/registrations.json (preserving existing members)
  const seed = readLocalData();
  const seedWrite = await store.setJSON(BLOB_KEY, seed, { onlyIfNew: true });
  if (seedWrite.modified) {
    memoryFallback = seed;
    return { data: seed, etag: seedWrite.etag };
  }

  // Another concurrent invocation seeded the blob first; re-read authoritative state
  const afterSeed = await store.getWithMetadata(BLOB_KEY, { type: 'json' });
  if (!afterSeed || !afterSeed.data) {
    throw new Error('Failed to initialize Netlify Blobs state after seed check.');
  }
  const normalized = normalizeDbData(afterSeed.data);
  memoryFallback = normalized;
  return { data: normalized, etag: afterSeed.etag };
}

async function readDataWithStorage(): Promise<{ data: DbData; storage: StorageDiagnostics }> {
  const blobsOutcome = await withBlobsStore((store) => readBlobState(store));
  if (blobsOutcome.ok) {
    return { data: blobsOutcome.value.data, storage: blobsOutcome.storage };
  }

  const local = readLocalDataWithSource();
  return {
    data: local.data,
    storage: {
      ...blobsOutcome.storage,
      backend: local.source,
    },
  };
}

async function readData(): Promise<DbData> {
  const { data } = await readDataWithStorage();
  return data;
}

async function mutateData<T>(
  mutator: (data: DbData) => { changed: boolean; result: T }
): Promise<{ result: T; storage: StorageDiagnostics }> {
  const blobsOutcome = await withBlobsStore(async (store) => {
    const MAX_RETRIES = 5;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const { data, etag } = await readBlobState(store);
      const { changed, result } = mutator(data);
      if (!changed) {
        return result;
      }

      const writeRes = await store.setJSON(
        BLOB_KEY,
        data,
        etag ? { onlyIfMatch: etag } : undefined
      );
      if (writeRes.modified) {
        memoryFallback = data;
        return result;
      }
    }

    throw new Error('Failed to save registration after concurrent write retries.');
  });

  if (blobsOutcome.ok) {
    return { result: blobsOutcome.value, storage: blobsOutcome.storage };
  }

  const local = readLocalDataWithSource();
  const { changed, result } = mutator(local.data);
  const writtenBackend = changed ? writeLocalData(local.data) : local.source;
  return {
    result,
    storage: {
      ...blobsOutcome.storage,
      backend: writtenBackend,
    },
  };
}

// Generate referral code like "SHIRLEY-8492"
function generateReferralCode(): string {
  const hex = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `SHIRLEY-${hex}`;
}

export function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!user || !domain) return '***@gmail.com';
  const maskedUser = user.length <= 2 
    ? `${user[0]}*` 
    : `${user[0]}${'*'.repeat(user.length - 2)}${user[user.length - 1]}`;
  return `${maskedUser}@${domain}`;
}

export function maskPhone(phone?: string): string {
  if (!phone) return '';
  const clean = phone.replace(/\s+/g, '');
  if (clean.length < 5) return '***';
  return clean.slice(0, 3) + '****' + clean.slice(-3);
}

export async function findMemberByEmail(email: string): Promise<FoundingMember | null> {
  const { members } = await readData();
  const normalized = email.trim().toLowerCase();
  const found = members.find((m) => m.email.toLowerCase() === normalized);
  return found || null;
}

export async function findMemberById(id: string): Promise<FoundingMember | null> {
  const { members } = await readData();
  const found = members.find((m) => m.id === id);
  return found || null;
}

export async function findMemberByReferralCode(code: string): Promise<FoundingMember | null> {
  const { members } = await readData();
  const normalized = code.trim().toUpperCase();
  const found = members.find((m) => m.referralCode === normalized);
  return found || null;
}

export async function getAllMembers(): Promise<FoundingMember[]> {
  const { members } = await readData();
  return [...members].reverse(); // newest first
}

export async function getAllMembersWithStorage(): Promise<{
  members: FoundingMember[];
  storage: StorageDiagnostics;
}> {
  const { data, storage } = await readDataWithStorage();
  return {
    members: [...data.members].reverse(), // newest first
    storage,
  };
}

export async function createRegistrationWithStorage(
  input: RegisterInput,
  _origin: string
): Promise<{ member: FoundingMember; isExisting: boolean; storage: StorageDiagnostics }> {
  const normalizedEmail = input.email.trim().toLowerCase();

  const { result, storage } = await mutateData<{ member: FoundingMember; isExisting: boolean }>(
    (data) => {
      // Check if member already exists
      const existing = data.members.find((m) => m.email.toLowerCase() === normalizedEmail);
      if (existing) {
        const incomingInterests =
          input.product_interests && input.product_interests.length > 0
            ? input.product_interests
            : input.product_interest
            ? [input.product_interest]
            : [];

        if (incomingInterests.length > 0) {
          existing.product_interests = incomingInterests;
          existing.product_interest = incomingInterests[0];
          return { changed: true, result: { member: existing, isExisting: true } };
        }
        return { changed: false, result: { member: existing, isExisting: true } };
      }

      // Handle referral attribution
      let validReferrerCode: string | undefined = undefined;
      if (input.referredBy) {
        const referrer = data.members.find(
          (m) => m.referralCode === input.referredBy?.trim().toUpperCase()
        );
        if (referrer) {
          validReferrerCode = referrer.referralCode;
          referrer.referralCount = (referrer.referralCount || 0) + 1;
        }
      }

      const cleanFullName = input.fullName.trim();
      const firstName = cleanFullName.split(' ')[0] || cleanFullName;
      const id = `fnd_${crypto.randomBytes(8).toString('hex')}`;
      const memberNumber = data.nextMemberNumber;
      data.nextMemberNumber += 1;

      let referralCode = generateReferralCode();
      // Ensure uniqueness
      while (data.members.some((m) => m.referralCode === referralCode)) {
        referralCode = generateReferralCode();
      }

      const now = new Date().toISOString();

      const selectedInterests =
        input.product_interests && input.product_interests.length > 0
          ? input.product_interests
          : input.product_interest
          ? [input.product_interest]
          : [];

      const newMember: FoundingMember = {
        id,
        memberNumber,
        fullName: cleanFullName,
        firstName,
        email: normalizedEmail,
        phone: input.phone ? input.phone.trim() : undefined,
        product_interests: selectedInterests,
        product_interest: selectedInterests.length > 0 ? selectedInterests[0] : null,
        consent: true,
        consentTimestamp: now,
        createdAt: now,
        referralCode,
        referredBy: validReferrerCode,
        referralCount: 0,
        utm: {
          source: input.utmSource,
          medium: input.utmMedium,
          campaign: input.utmCampaign,
        },
      };

      data.members.push(newMember);
      return { changed: true, result: { member: newMember, isExisting: false } };
    }
  );

  return {
    ...result,
    storage,
  };
}

export async function createRegistration(
  input: RegisterInput,
  origin: string
): Promise<{ member: FoundingMember; isExisting: boolean }> {
  const { member, isExisting } = await createRegistrationWithStorage(input, origin);
  return { member, isExisting };
}

export function formatMemberResponse(member: FoundingMember, origin: string) {
  const baseUrl = origin.replace(/\/$/, '');
  const interests =
    member.product_interests && member.product_interests.length > 0
      ? member.product_interests
      : member.product_interest
      ? [member.product_interest]
      : [];
  return {
    id: member.id,
    memberNumber: member.memberNumber,
    fullName: member.fullName,
    firstName: member.firstName,
    maskedEmail: maskEmail(member.email),
    maskedPhone: maskPhone(member.phone),
    product_interests: interests,
    product_interest: interests.length > 0 ? interests[0] : null,
    referralCode: member.referralCode,
    referralUrl: `${baseUrl}?ref=${member.referralCode}`,
    referralCount: member.referralCount || 0,
    createdAt: member.createdAt,
  };
}
