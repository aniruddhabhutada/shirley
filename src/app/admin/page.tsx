'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, 
  Download, 
  Lock, 
  Search, 
  Share2, 
  Phone, 
  Mail, 
  Calendar, 
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface Member {
  id: string;
  memberNumber: number;
  fullName: string;
  firstName: string;
  email: string;
  phone?: string;
  referralCode: string;
  referredBy?: string;
  referralCount: number;
  createdAt: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/export?key=${encodeURIComponent(passcode)}&format=json`);
      if (res.status === 401) {
        setError('Incorrect admin passcode. Try "shirley2026" or your custom secret.');
        setLoading(false);
        return;
      }
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      setMembers(data.members || []);
      setIsAuthenticated(true);
    } catch (err) {
      setError('Error connecting to admin portal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    window.location.href = `/api/admin/export?key=${encodeURIComponent(passcode)}&format=csv`;
  };

  const filteredMembers = members.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.fullName.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.phone && m.phone.toLowerCase().includes(q)) ||
      m.referralCode.toLowerCase().includes(q)
    );
  });

  const totalReferrals = members.reduce((acc, m) => acc + (m.referralCount || 0), 0);
  const totalPhones = members.filter((m) => !!m.phone).length;

  return (
    <div className="min-h-screen bg-shirley-cream py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-shirley-blush-border/60 pb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-shirley-plum-dark/70 hover:text-shirley-berry-vibrant transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Shirley</span>
            </Link>
            <span className="text-shirley-blush-border">•</span>
            <div className="relative h-6 w-24">
              <Image
                src="/images/shirley-logo-trans.webp"
                alt="SHIRLEY"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Admin Portal
          </span>
        </div>

        {/* Lock Screen */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto pt-12">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-elevated border border-shirley-blush-border/60 text-center space-y-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-shirley-blush flex items-center justify-center text-shirley-plum-rich">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h1 className="font-serif text-2xl text-shirley-plum-rich">
                  Admin Passcode
                </h1>
                <p className="text-xs text-shirley-plum-dark/70 mt-1">
                  Enter your admin secret key to view and export founding member registrations.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter passcode (default: shirley2026)"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full text-center px-4 py-3 rounded-xl border border-shirley-blush-border focus:outline-none focus:ring-2 focus:ring-shirley-berry-vibrant text-sm"
                    autoFocus
                  />
                  {error && (
                    <p className="text-xs text-red-600 mt-2 font-medium">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !passcode}
                  className="w-full py-3 px-4 rounded-xl bg-shirley-plum-rich text-white font-semibold text-sm hover:bg-shirley-plum-dark transition-colors disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Access Member Directory'}
                </button>
              </form>

              <p className="text-[11px] text-shirley-plum-dark/50">
                Default key: <code className="bg-shirley-cream px-1.5 py-0.5 rounded font-mono">shirley2026</code> · Change anytime via <code className="bg-shirley-cream px-1.5 py-0.5 rounded font-mono">ADMIN_SECRET</code> in Netlify.
              </p>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-8 animate-fadeIn">
            {/* Top Bar with Title and Export Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl text-shirley-plum-rich">
                  Founding Member Directory
                </h1>
                <p className="text-xs sm:text-sm text-shirley-plum-dark/70 mt-0.5">
                  Real-time list of registered women and referral leaders on the early-access list.
                </p>
              </div>

              <button
                onClick={handleDownloadCSV}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-emerald-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export to Excel / CSV</span>
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-shirley-blush-border/60 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-shirley-blush flex items-center justify-center text-shirley-berry-vibrant">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-shirley-plum-dark/60 uppercase tracking-wider">
                    Total Members
                  </p>
                  <p className="font-serif text-2xl text-shirley-plum-rich">
                    {members.length}
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-shirley-blush-border/60 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-shirley-lavender-light flex items-center justify-center text-shirley-plum-rich">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-shirley-plum-dark/60 uppercase tracking-wider">
                    Referrals Generated
                  </p>
                  <p className="font-serif text-2xl text-shirley-plum-rich">
                    {totalReferrals}
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-shirley-blush-border/60 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-shirley-plum-dark/60 uppercase tracking-wider">
                    Phones Captured
                  </p>
                  <p className="font-serif text-2xl text-shirley-plum-rich">
                    {totalPhones}
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Table Container */}
            <div className="bg-white rounded-3xl border border-shirley-blush-border/60 shadow-elevated overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-shirley-blush-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-shirley-plum-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, email, phone, referral..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-shirley-blush-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-shirley-berry-vibrant"
                  />
                </div>
                <div className="text-xs text-shirley-plum-dark/60">
                  Showing {filteredMembers.length} of {members.length} records
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-shirley-cream-warm/70 text-shirley-plum-rich font-serif uppercase tracking-wider text-[11px] border-b border-shirley-blush-border/40">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Full Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Referral Code</th>
                      <th className="py-3 px-4 text-center">Referrals</th>
                      <th className="py-3 px-4">Date Registered</th>
                      <th className="py-3 px-4">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-shirley-blush-border/30">
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-shirley-cream/50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-shirley-berry-vibrant">
                          #{m.memberNumber}
                        </td>
                        <td className="py-3 px-4 font-medium text-shirley-plum-rich">
                          {m.fullName}
                        </td>
                        <td className="py-3 px-4 text-shirley-plum-dark">
                          <a
                            href={`mailto:${m.email}`}
                            className="hover:underline flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3 text-shirley-plum-dark/50" />
                            {m.email}
                          </a>
                        </td>
                        <td className="py-3 px-4 text-shirley-plum-dark font-mono text-xs">
                          {m.phone ? (
                            <a
                              href={`tel:${m.phone}`}
                              className="hover:underline flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3 text-emerald-600" />
                              {m.phone}
                            </a>
                          ) : (
                            <span className="text-shirley-plum-dark/30">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs font-semibold text-shirley-plum-rich">
                          {m.referralCode}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {m.referralCount > 0 ? (
                            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                              {m.referralCount}
                            </span>
                          ) : (
                            <span className="text-shirley-plum-dark/40">0</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-xs text-shirley-plum-dark/70 whitespace-nowrap">
                          {new Date(m.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-3 px-4 text-xs text-shirley-plum-dark/60">
                          {m.utm?.source ? (
                            <span className="px-2 py-0.5 rounded bg-shirley-blush text-shirley-berry-vibrant font-mono text-[10px]">
                              {m.utm.source}
                            </span>
                          ) : (
                            <span className="text-shirley-plum-dark/30">Direct</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredMembers.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-10 text-center text-xs text-shirley-plum-dark/50">
                          No matching member registrations found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Google Sheets Integration Guide Card */}
            <div className="bg-gradient-to-tr from-shirley-peach/40 via-white to-shirley-lavender-light/30 rounded-3xl p-6 sm:p-8 border border-shirley-blush-border/60 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-shirley-plum-rich font-serif text-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3>Want every lead in your Google Sheet automatically?</h3>
              </div>
              <p className="text-xs sm:text-sm text-shirley-plum-dark/80 leading-relaxed">
                You can receive every user registration directly into Google Sheets, WhatsApp, or Slack via a free webhook:
              </p>
              <ol className="list-decimal list-inside text-xs text-shirley-plum-dark/75 space-y-1.5 pl-1">
                <li>Create a free incoming webhook with <strong>Google Apps Script</strong>, <strong>Make.com</strong>, or <strong>Zapier</strong> connected to your Google Sheet.</li>
                <li>In Netlify, open your site settings: <strong>Site configuration &gt; Environment variables</strong>.</li>
                <li>Add variable: <code className="bg-white px-2 py-0.5 rounded font-mono border">LEAD_WEBHOOK_URL</code> = <code className="bg-white px-2 py-0.5 rounded font-mono border">https://your-webhook-url</code>.</li>
              </ol>
              <p className="text-[11px] text-shirley-plum-dark/60 pt-1">
                Once set, each new member registration instantly posts all lead details to your sheet in real time!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

