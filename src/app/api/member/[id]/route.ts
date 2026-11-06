import { NextRequest, NextResponse } from 'next/server';
import { findMemberById, formatMemberResponse } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ success: false, message: 'Member ID required' }, { status: 400 });
    }

    const member = await findMemberById(id);
    if (!member) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
    }

    const host = req.headers.get('host') || 'localhost:3000';
    const proto = req.headers.get('x-forwarded-proto') || 'http';
    const origin = `${proto}://${host}`;

    return NextResponse.json({
      success: true,
      member: formatMemberResponse(member, origin),
    });
  } catch (error) {
    console.error('Member lookup error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

