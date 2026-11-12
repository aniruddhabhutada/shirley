import { NextRequest, NextResponse } from 'next/server';
import { findMemberByReferralCode } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code;
    if (!code) {
      return NextResponse.json({ success: false, valid: false }, { status: 400 });
    }

    const member = await findMemberByReferralCode(code);
    if (!member) {
      return NextResponse.json({ success: true, valid: false });
    }

    // Only return non-sensitive first name and referral code
    return NextResponse.json(
      {
        success: true,
        valid: true,
        referrerFirstName: member.firstName,
        referralCode: member.referralCode,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'CDN-Cache-Control': 'no-store',
          'Netlify-CDN-Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('Referral lookup error:', error);
    return NextResponse.json({ success: false, valid: false }, { status: 500 });
  }
}

