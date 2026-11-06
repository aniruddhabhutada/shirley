'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import FoundingMemberCard from '@/components/FoundingMemberCard';
import ShareActions from '@/components/ShareActions';
import { Sparkles, ArrowLeft, Users, ShieldCheck, Heart, UserCheck, Eye, EyeOff } from 'lucide-react';

interface MemberData {
  id: string;
  memberNumber: number;
  fullName: string;
  firstName: string;
  maskedEmail: string;
  maskedPhone?: string;
  referralCode: string;
  referralUrl: string;
  referralCount: number;
  createdAt: string;
}

export default function FoundingMemberSuccessPage() {
  const params = useParams();
  const id = params?.id as string;

  const [member, setMember] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCustomName, setShowCustomName] = useState(true);

  useEffect(() => {
    // 1. Check if we have member in sessionStorage from direct submission
    if (typeof window !== 'undefined') {
      try {
        const cached = sessionStorage.getItem('shirley_member');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.id === id) {
            setMember(parsed);
            setLoading(false);
            return;
          }
        }
      } catch {}
    }

    // 2. Otherwise fetch from backend API
    if (id) {
      fetch(`/api/member/${encodeURIComponent(id)}`)
        .then((res) => {
          if (!res.ok) throw new Error('Member not found');
          return res.json();
        })
        .then((data) => {
          if (data.success && data.member) {
            setMember(data.member);
          } else {
            setError('Member invitation not found.');
          }
        })
        .catch((err) => {
          console.error(err);
          setError('Unable to load Founding Member card. Please ensure your link is valid.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-shirley-blush-light py-20 px-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-3 border-shirley-berry-vibrant border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-xl text-shirley-plum-rich">
            Preparing your Founding Member invitation...
          </p>
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-shirley-cream py-20 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center space-y-5 border border-shirley-blush-border shadow-md">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto font-bold text-xl">
            !
          </div>
          <h1 className="text-2xl font-serif text-shirley-plum-rich">
            Invitation Not Found
          </h1>
          <p className="text-xs text-shirley-plum-dark/80 leading-relaxed">
            {error || 'This Founding Member link appears invalid or expired. You can join the Founding List for free below.'}
          </p>
          <Link
            href="/#founding-list"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-shirley-yellow-mango text-shirley-plum-rich text-xs font-bold tracking-wider uppercase shadow-sm"
          >
            <span>JOIN THE FOUNDING LIST</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-shirley-blush-light via-shirley-cream to-shirley-peach-light py-12 lg:py-20 relative overflow-hidden">
      {/* Offscreen 1080x1920 Story Card (Only used for pixel-perfect export) */}
      <div
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: '0px',
          height: '0px',
          overflow: 'hidden',
          zIndex: -1,
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <FoundingMemberCard
          fullName={member.fullName}
          firstName={member.firstName}
          memberNumber={member.memberNumber}
          referralCode={member.referralCode}
          showCustomName={showCustomName}
          isExportMode={true}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-shirley-plum-rich hover:text-shirley-berry-vibrant uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO SHIRLEY</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-shirley-blush text-shirley-plum-rich text-[10px] font-bold tracking-wider uppercase border border-shirley-blush-border">
            <Sparkles className="w-3 h-3 text-shirley-berry-vibrant" />
            <span>FOUNDING STATUS VERIFIED</span>
          </div>
        </div>

        {/* Page Top Headline */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto px-2">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-shirley-berry-vibrant">
            YOU ARE OFFICIALLY ON THE LIST
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-snug">
            Welcome to the SHIRLEY <br className="sm:hidden" />
            beginning, {member.firstName}!
          </h1>
          <p className="text-xs sm:text-base text-shirley-plum-dark/80 leading-relaxed font-normal">
            Your founding invitation is ready. Download your 1080×1920 Story Card or share it with your inner circle.
          </p>
        </div>

        {/* Main Grid: Card Preview on Left/Center + Action Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Card Presentation */}
          <div className="lg:col-span-6 flex flex-col items-center space-y-4">
            <FoundingMemberCard
              fullName={member.fullName}
              firstName={member.firstName}
              memberNumber={member.memberNumber}
              referralCode={member.referralCode}
              showCustomName={showCustomName}
              isExportMode={false}
            />

            {/* Personalization Toggle */}
            <div className="flex items-center gap-2 text-xs text-shirley-plum-rich font-medium bg-white/70 px-4 py-2 rounded-full border border-shirley-blush-border/50 shadow-sm">
              <button
                type="button"
                onClick={() => setShowCustomName(!showCustomName)}
                className="inline-flex items-center gap-1.5 hover:text-shirley-berry-vibrant transition-colors"
              >
                {showCustomName ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-shirley-berry-vibrant" />
                    <span>Displaying name on card (Tap to hide)</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-shirley-plum-dark/60" />
                    <span>Name hidden (Tap to show)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Center & Community Perks */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-shirley-blush-border shadow-soft-plum space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold tracking-widest text-shirley-berry-vibrant uppercase">
                  SHARE YOUR INVITATION
                </span>
                <h2 className="text-2xl font-serif text-shirley-plum-rich">
                  Share the Story with Friends
                </h2>
                <p className="text-xs text-shirley-plum-dark/75 leading-relaxed">
                  Download your high-definition card sized for Instagram Stories or share directly to WhatsApp.
                </p>
              </div>

              {/* Share Actions Component */}
              <ShareActions
                fullName={member.fullName}
                firstName={member.firstName}
                memberNumber={member.memberNumber}
                referralCode={member.referralCode}
                referralUrl={member.referralUrl}
              />

              {/* Unique Referral Attribution Stats */}
              <div className="pt-6 border-t border-shirley-blush-border/50 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-shirley-plum-rich font-bold">
                    <Users className="w-4 h-4 text-shirley-berry-vibrant" />
                    <span>Your Community Attribution</span>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-shirley-cream-warm border border-shirley-blush-border">
                    {member.referralCode}
                  </span>
                </div>

                <div className="bg-shirley-cream-warm p-4 rounded-2xl border border-shirley-blush-border/40 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-shirley-plum-rich">
                      {member.referralCount} {member.referralCount === 1 ? 'Friend' : 'Friends'} Joined
                    </p>
                    <p className="text-[11px] text-shirley-plum-dark/70">
                      When someone registers via your link, they are attributed to you.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-shirley-blush flex items-center justify-center font-serif text-lg font-bold text-shirley-berry-vibrant">
                    {member.referralCount}
                  </div>
                </div>
              </div>

              {/* Founding Member Perks */}
              <div className="pt-4 border-t border-shirley-blush-border/40 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-shirley-plum-rich">
                  Your Founding Privileges
                </p>
                <div className="space-y-2 text-xs text-shirley-plum-dark/80">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-shirley-yellow-hover flex-shrink-0 mt-0.5" />
                    <span><strong>Priority First-Batch Access:</strong> Guaranteed allocation before public launch.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="w-3.5 h-3.5 text-shirley-berry-vibrant flex-shrink-0 mt-0.5" />
                    <span><strong>Behind-the-Scenes Formulation:</strong> Vote on upcoming flavours and sensory trials.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Permanent Founding Status:</strong> Recorded as member #{String(member.memberNumber).padStart(5, '0')}.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Confirmation */}
            <div className="bg-white/80 p-4 rounded-2xl border border-shirley-blush-border/50 text-[11px] text-shirley-plum-dark/70 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Registered as: {member.maskedEmail}. Your contact information is never shown publicly or in invitation links.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
