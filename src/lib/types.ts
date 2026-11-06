export interface FoundingMember {
  id: string;
  memberNumber: number;
  fullName: string;
  firstName: string;
  email: string;
  phone?: string;
  consent: boolean;
  consentTimestamp: string;
  createdAt: string;
  referralCode: string;
  referredBy?: string;
  referralCount: number;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
}

export interface RegisterInput {
  fullName: string;
  email: string;
  phone?: string;
  consent: boolean;
  referredBy?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface RegistrationResult {
  success: boolean;
  isExisting?: boolean;
  message?: string;
  member?: {
    id: string;
    memberNumber: number;
    fullName: string;
    firstName: string;
    maskedEmail: string;
    referralCode: string;
    referralUrl: string;
    referralCount: number;
    createdAt: string;
  };
  errors?: Record<string, string>;
}

