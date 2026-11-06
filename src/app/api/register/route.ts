import { NextRequest, NextResponse } from 'next/server';
import { createRegistration, formatMemberResponse } from '@/lib/db';
import { RegisterInput, RegistrationResult } from '@/lib/types';

// Simple in-memory rate limiting map
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 60 * 1000 });
    return true;
  }
  if (entry.count >= 12) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json<RegistrationResult>(
        {
          success: false,
          message: 'Too many requests. Please pause for a moment and try again.',
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { fullName, email, phone, consent, referredBy, utmSource, utmMedium, utmCampaign } = body;

    const errors: Record<string, string> = {};

    // Validate full name
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 letters).';
    } else if (fullName.trim().length > 100) {
      errors.fullName = 'Full name must be less than 100 characters.';
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    // Validate phone (optional)
    if (phone && typeof phone === 'string' && phone.trim().length > 0) {
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
      // allow +91 followed by 10 digits, or 10 digits, or international 8-15 digits
      const phoneRegex = /^(\+?\d{1,4})?[0-9]{7,14}$/;
      if (!phoneRegex.test(cleanPhone)) {
        errors.phone = 'Please enter a valid phone number (e.g. +91 98765 43210).';
      }
    }

    // Validate consent
    if (consent !== true) {
      errors.consent = 'You must agree to receive early-access updates to join the list.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json<RegistrationResult>(
        {
          success: false,
          message: 'Please resolve the highlighted errors.',
          errors,
        },
        { status: 400 }
      );
    }

    // Determine host origin for referral link
    const host = req.headers.get('host') || 'localhost:3000';
    const proto = req.headers.get('x-forwarded-proto') || 'http';
    const origin = `${proto}://${host}`;

    const input: RegisterInput = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      consent: true,
      referredBy: typeof referredBy === 'string' ? referredBy.trim() : undefined,
      utmSource: typeof utmSource === 'string' ? utmSource : undefined,
      utmMedium: typeof utmMedium === 'string' ? utmMedium : undefined,
      utmCampaign: typeof utmCampaign === 'string' ? utmCampaign : undefined,
    };

    const { member, isExisting } = await createRegistration(input, origin);
    const memberData = formatMemberResponse(member, origin);

    // Optional webhook forwarding (Google Sheets, Zapier, Make, Slack)
    if (!isExisting) {
      const webhookUrl = process.env.LEAD_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'new_founding_member',
              memberNumber: member.memberNumber,
              fullName: member.fullName,
              email: member.email,
              phone: member.phone || '',
              referralCode: member.referralCode,
              referredBy: member.referredBy || '',
              createdAt: member.createdAt,
              utmSource: member.utm?.source || '',
              utmMedium: member.utm?.medium || '',
              utmCampaign: member.utm?.campaign || '',
            }),
          }).catch((err) => console.error('[Webhook] sync failed:', err));
        } catch (webhookErr) {
          console.error('[Webhook] dispatch error:', webhookErr);
        }
      }
    }

    return NextResponse.json<RegistrationResult>(
      {
        success: true,
        isExisting,
        message: isExisting
          ? "Welcome back! You're already on the Founding List. Here is your invitation."
          : "Welcome to the SHIRLEY Founding List! You're officially in.",
        member: memberData,
      },
      { status: isExisting ? 200 : 201 }
    );
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json<RegistrationResult>(
      {
        success: false,
        message: 'A temporary error occurred while processing your registration. Please try again.',
      },
      { status: 500 }
    );
  }
}

