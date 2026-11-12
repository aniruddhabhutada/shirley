import { NextRequest, NextResponse } from 'next/server';
import { getAllMembersWithStorage } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

const DEFAULT_SECRET = 'anirudha21#';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'CDN-Cache-Control': 'no-store',
  'Netlify-CDN-Cache-Control': 'no-store',
  'Surrogate-Control': 'no-store',
  Pragma: 'no-cache',
  Expires: '0',
};

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

  const { members, storage } = await getAllMembersWithStorage();
  const format = searchParams.get('format') || 'json';

  if (format === 'csv') {
    // Generate clean CSV format for Excel / Google Sheets
    const header = [
      'Member #',
      'Full Name',
      'Email',
      'Phone',
      'Product Interest',
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
        escape(
          m.product_interests && m.product_interests.length > 0
            ? m.product_interests.join('; ')
            : m.product_interest || 'None'
        ),
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
        'X-Shirley-Storage': storage.backend,
        ...NO_STORE_HEADERS,
      },
    });
  }

  return NextResponse.json(
    {
      success: true,
      total: members.length,
      storage,
      members,
    },
    {
      headers: {
        'X-Shirley-Storage': storage.backend,
        ...NO_STORE_HEADERS,
      },
    }
  );
}

