import { NextRequest, NextResponse } from 'next/server';
import { findMemberByReferralCode } from '@/lib/db';

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
    return NextResponse.json({
      success: true,
      valid: true,
      referrerFirstName: member.firstName,
      referralCode: member.referralCode,
    });
  } catch (error) {
    console.error('Referral lookup error:', error);
    return NextResponse.json({ success: false, valid: false }, { status: 500 });
  }
}

