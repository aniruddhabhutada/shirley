import { NextRequest, NextResponse } from 'next/server';
import { getAllMembers } from '@/lib/db';

const DEFAULT_SECRET = 'shirley2026';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('key') || req.headers.get('x-admin-key');
  const expectedSecret = process.env.ADMIN_SECRET || DEFAULT_SECRET;

  if (secret !== expectedSecret) {
    return NextResponse.json(
      { error: 'Unauthorized. Please provide a valid admin key.' },
      { status: 401 }
    );
  }

  const members = await getAllMembers();
  const format = searchParams.get('format') || 'json';

  if (format === 'csv') {
    // Generate clean CSV format for Excel / Google Sheets
    const header = [
      'Member #',
      'Full Name',
      'Email',
      'Phone',
      'Referral Code',
      'Referred By',
      'Referral Count',
      'Registration Date (UTC)',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
    ].join(',');

    const rows = members.map((m) => {
      const escape = (val?: string | number) => {
        if (val === undefined || val === null) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      };

      return [
        escape(m.memberNumber),
        escape(m.fullName),
        escape(m.email),
        escape(m.phone || ''),
        escape(m.referralCode),
        escape(m.referredBy || ''),
        escape(m.referralCount || 0),
        escape(m.createdAt),
        escape(m.utm?.source || ''),
        escape(m.utm?.medium || ''),
        escape(m.utm?.campaign || ''),
      ].join(',');
    });

    const csvContent = [header, ...rows].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="shirley-founding-members-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  }

  return NextResponse.json({
    success: true,
    total: members.length,
    members,
  });
}

