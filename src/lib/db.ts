import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { FoundingMember, RegisterInput } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'registrations.json');

// Ephemeral fallback directory for serverless environments (Netlify / AWS Lambda)
const TMP_DB_FILE = path.join(os.tmpdir(), 'shirley_registrations.json');

// In-memory cache to guarantee zero-latency reads & serverless fallback resilience
let memoryCache: { members: FoundingMember[]; nextMemberNumber: number } | null = null;

// In-memory cache + multi-layer file sync (repository file -> ephemeral /tmp -> memory)
function readData(): { members: FoundingMember[]; nextMemberNumber: number } {
  if (memoryCache && memoryCache.members && memoryCache.members.length > 0) {
    return memoryCache;
  }

  // 1. Check if ephemeral tmp file exists (from previous writes in this serverless container)
  try {
    if (fs.existsSync(TMP_DB_FILE)) {
      const raw = fs.readFileSync(TMP_DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.members)) {
        memoryCache = {
          members: parsed.members,
          nextMemberNumber: parsed.nextMemberNumber || 101,
        };
        return memoryCache;
      }
    }
  } catch (err) {
    // ignore
  }

  // 2. Check bundled repository data file
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryCache = {
        members: Array.isArray(parsed.members) ? parsed.members : [],
        nextMemberNumber: parsed.nextMemberNumber || 101,
      };
      return memoryCache;
    }
  } catch (err) {
    console.error('Error reading repository db file:', err);
  }

  memoryCache = { members: [], nextMemberNumber: 101 };
  return memoryCache;
}

function writeData(data: { members: FoundingMember[]; nextMemberNumber: number }): void {
  // Always update in-memory cache first
  memoryCache = data;

  const payload = JSON.stringify(data, null, 2);

  // Attempt 1: Write to local project directory (standard Node.js / dev / persistent server)
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tmpFile = `${DB_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(tmpFile, payload, 'utf-8');
    fs.renameSync(tmpFile, DB_FILE);
    return;
  } catch (err) {
    // Read-only filesystem detected (e.g. Netlify / Vercel serverless environment)
  }

  // Attempt 2: Write to os.tmpdir() (always writable in Netlify / Lambda serverless containers)
  try {
    fs.writeFileSync(TMP_DB_FILE, payload, 'utf-8');
  } catch (tmpErr) {
    console.warn('[SHIRLEY DB] Operating in memory-only mode due to restricted serverless filesystem.');
  }
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
  const { members } = readData();
  const normalized = email.trim().toLowerCase();
  const found = members.find((m) => m.email.toLowerCase() === normalized);
  return found || null;
}

export async function findMemberById(id: string): Promise<FoundingMember | null> {
  const { members } = readData();
  const found = members.find((m) => m.id === id);
  return found || null;
}

export async function findMemberByReferralCode(code: string): Promise<FoundingMember | null> {
  const { members } = readData();
  const normalized = code.trim().toUpperCase();
  const found = members.find((m) => m.referralCode === normalized);
  return found || null;
}

export async function getAllMembers(): Promise<FoundingMember[]> {
  const { members } = readData();
  return [...members].reverse(); // newest first
}

export async function createRegistration(
  input: RegisterInput,
  origin: string
): Promise<{ member: FoundingMember; isExisting: boolean }> {
  const data = readData();
  const normalizedEmail = input.email.trim().toLowerCase();

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
      writeData(data);
    }
    return { member: existing, isExisting: true };
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
  writeData(data);

  return { member: newMember, isExisting: false };
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
