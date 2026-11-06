import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { FoundingMember, RegisterInput } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'registrations.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory cache + file sync
function readData(): { members: FoundingMember[]; nextMemberNumber: number } {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        members: Array.isArray(parsed.members) ? parsed.members : [],
        nextMemberNumber: parsed.nextMemberNumber || 101,
      };
    }
  } catch (err) {
    console.error('Error reading db file, initializing fresh:', err);
  }
  return { members: [], nextMemberNumber: 101 };
}

function writeData(data: { members: FoundingMember[]; nextMemberNumber: number }): void {
  const tmpFile = `${DB_FILE}.${Date.now()}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmpFile, DB_FILE);
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

export async function createRegistration(
  input: RegisterInput,
  origin: string
): Promise<{ member: FoundingMember; isExisting: boolean }> {
  const data = readData();
  const normalizedEmail = input.email.trim().toLowerCase();

  // Check if member already exists
  const existing = data.members.find((m) => m.email.toLowerCase() === normalizedEmail);
  if (existing) {
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

  const newMember: FoundingMember = {
    id,
    memberNumber,
    fullName: cleanFullName,
    firstName,
    email: normalizedEmail,
    phone: input.phone ? input.phone.trim() : undefined,
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
  return {
    id: member.id,
    memberNumber: member.memberNumber,
    fullName: member.fullName,
    firstName: member.firstName,
    maskedEmail: maskEmail(member.email),
    maskedPhone: maskPhone(member.phone),
    referralCode: member.referralCode,
    referralUrl: `${baseUrl}?ref=${member.referralCode}`,
    referralCount: member.referralCount || 0,
    createdAt: member.createdAt,
  };
}

