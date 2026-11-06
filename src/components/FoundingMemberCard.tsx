'use client';

import React from 'react';
import Image from 'next/image';
import ShirleyFlowerIcon from './icons/ShirleyFlowerIcon';

interface FoundingMemberCardProps {
  fullName: string;
  firstName: string;
  memberNumber: number;
  referralCode: string;
  showCustomName?: boolean;
  isExportMode?: boolean; // When rendering the 1080x1920 exact Story format
}

export default function FoundingMemberCard({
  fullName,
  firstName,
  memberNumber,
  referralCode,
  showCustomName = true,
  isExportMode = false,
}: FoundingMemberCardProps) {
  // Pad member number like #00142
  const formattedNumber = String(memberNumber).padStart(5, '0');

  // If export mode (1080x1920)
  if (isExportMode) {
    return (
      <div
        id="shirley-story-export-card"
        style={{
          width: '1080px',
          height: '1920px',
          backgroundColor: '#F8DDE5', // Soft blush outer frame
          padding: '48px',
          boxSizing: 'border-box',
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Inner Card Container in Rich Plum */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#452039', // Rich Plum
            borderRadius: '56px',
            padding: '80px 72px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            position: 'relative',
            border: '2px solid rgba(255, 240, 245, 0.25)',
            boxShadow: '0 40px 100px rgba(46, 32, 41, 0.45)',
          }}
        >
          {/* Subtle floral background emblem */}
          <div
            style={{
              position: 'absolute',
              top: '50px',
              right: '60px',
              opacity: 0.08,
              fontSize: '400px',
              color: '#FFF',
              lineHeight: 1,
              pointerEvents: 'none',
              fontFamily: "'Fraunces', serif",
            }}
          >
            ✦
          </div>

          {/* Top Row: Logo & Founding List Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10,
            }}
          >
            {/* Shirley Logo Wordmark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '56px',
                  fontWeight: 600,
                  color: '#FFF9F5',
                  letterSpacing: '-1px',
                }}
              >
                Shirley
              </span>
              <div style={{ width: '40px', height: '40px' }}>
                <ShirleyFlowerIcon className="w-10 h-10" color="#F8A5C2" />
              </div>
            </div>

            {/* Founding List Badge */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                borderRadius: '100px',
                padding: '16px 36px',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '4px',
                  color: '#FFE0D2',
                  textTransform: 'uppercase',
                }}
              >
                FOUNDING LIST
              </span>
            </div>
          </div>

          {/* Main Headline & Subtitle */}
          <div style={{ zIndex: 10, marginTop: '40px', marginBottom: '40px' }}>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '84px',
                fontWeight: 500,
                color: '#FFF9F5',
                lineHeight: 1.15,
                margin: '0 0 28px 0',
                letterSpacing: '-1.5px',
              }}
            >
              I&apos;m on the list. <br />
              <span style={{ color: '#FFD65A', fontStyle: 'italic' }}>Are you?</span>
            </h1>

            <p
              style={{
                fontSize: '32px',
                color: '#F8DDE5',
                lineHeight: 1.45,
                margin: 0,
                maxWidth: '820px',
                fontWeight: 400,
              }}
            >
              A new era of women&apos;s wellness is coming. And I&apos;m getting first access.
            </p>
          </div>

          {/* Membership Panel (Soft Blush Container) */}
          <div
            style={{
              backgroundColor: '#F8DDE5',
              borderRadius: '40px',
              padding: '60px 56px',
              zIndex: 10,
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '3px',
                  color: '#65344F',
                  textTransform: 'uppercase',
                }}
              >
                MY SHIRLEY STATUS
              </span>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#65344F',
                  fontFamily: 'monospace',
                }}
              >
                #{formattedNumber}
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '60px',
                fontWeight: 700,
                color: '#452039',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              FOUNDING MEMBER
            </div>

            {showCustomName && (
              <div
                style={{
                  fontSize: '30px',
                  fontWeight: 600,
                  color: '#C84B83',
                  marginBottom: '18px',
                }}
              >
                Issued to: {fullName || firstName}
              </div>
            )}

            <div
              style={{
                fontSize: '24px',
                color: '#452039',
                opacity: 0.85,
                fontWeight: 500,
              }}
            >
              Early access community · First drop pending
            </div>
          </div>

          {/* Bottom Card Copy */}
          <div style={{ zIndex: 10, marginTop: '40px' }}>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '52px',
                fontWeight: 400,
                color: '#FFF9F5',
                margin: '0 0 40px 0',
                lineHeight: 1.25,
              }}
            >
              Your wellness era <br />
              <span style={{ color: '#FFE0D2', fontStyle: 'italic' }}>starts here.</span>
            </h2>

            {/* Card Footer Banner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '2px solid rgba(248, 221, 229, 0.25)',
                paddingTop: '36px',
              }}
            >
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '4px',
                  color: '#FFF9F5',
                  textTransform: 'uppercase',
                }}
              >
                SHIRLEY WELLNESS
              </span>

              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '4px',
                  color: '#FFD65A',
                  textTransform: 'uppercase',
                }}
              >
                COMING SOON
              </span>
            </div>
          </div>
        </div>

        {/* Outer Frame Footer Text */}
        <div
          style={{
            textAlign: 'center',
            paddingTop: '28px',
            color: '#452039',
          }}
        >
          <p
            style={{
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              margin: '0 0 6px 0',
            }}
          >
            YOUR INVITATION TO THE FIRST DROP
          </p>
          <p style={{ fontSize: '18px', margin: 0, opacity: 0.75 }}>
            shirleywellness.com · Invitation #{referralCode}
          </p>
        </div>
      </div>
    );
  }

  // Responsive On-Screen Preview Card (exact visual replica styled for interactive screens)
  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-md bg-shirley-blush rounded-[32px] sm:rounded-[36px] p-3 sm:p-5 shadow-elevated border border-shirley-blush-border transition-transform hover:scale-[1.01] duration-300">
      {/* Inner Card Container in Rich Plum */}
      <div className="bg-shirley-plum-rich rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between aspect-[9/16] shadow-2xl border border-white/20">
        {/* Subtle decorative glow */}
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-shirley-berry-vibrant/20 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Card Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-shirley-cream">
              Shirley
            </span>
            <ShirleyFlowerIcon className="w-5 h-5" color="#F8A5C2" />
          </div>

          <div className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[9px] sm:text-[11px] font-bold tracking-widest uppercase text-shirley-peach">
            FOUNDING LIST
          </div>
        </div>

        {/* Headline Section */}
        <div className="space-y-2 sm:space-y-3 z-10 my-auto py-1">
          <h2 className="text-2xl sm:text-4xl font-serif leading-[1.15] text-shirley-cream">
            I&apos;m on the list. <br />
            <span className="text-shirley-yellow-mango italic">Are you?</span>
          </h2>

          <p className="text-[11px] sm:text-sm text-shirley-blush font-normal leading-relaxed">
            A new era of women&apos;s wellness is coming. And I&apos;m getting first access.
          </p>
        </div>

        {/* Membership Badge Panel */}
        <div className="bg-shirley-blush rounded-2xl p-4 sm:p-5 z-10 text-shirley-plum-rich shadow-md space-y-1 my-1">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold tracking-widest text-shirley-plum-light uppercase">
            <span>MY SHIRLEY STATUS</span>
            <span className="font-mono">#{formattedNumber}</span>
          </div>

          <div className="text-xl sm:text-3xl font-serif font-bold uppercase tracking-tight text-shirley-plum-rich">
            FOUNDING MEMBER
          </div>

          {showCustomName && (
            <div className="text-[11px] sm:text-xs font-semibold text-shirley-berry-vibrant truncate">
              Issued to: {fullName || firstName}
            </div>
          )}

          <div className="text-[10px] sm:text-xs text-shirley-plum-dark/80 font-medium">
            Early access community · First drop pending
          </div>
        </div>

        {/* Card Footer Section */}
        <div className="space-y-3 z-10 pt-1">
          <p className="text-base sm:text-xl font-serif text-shirley-cream leading-tight">
            Your wellness era <br />
            <span className="text-shirley-peach italic">starts here.</span>
          </p>

          <div className="pt-2.5 border-t border-white/20 flex items-center justify-between text-[9px] sm:text-[11px] font-bold tracking-widest uppercase">
            <span className="text-shirley-cream">SHIRLEY WELLNESS</span>
            <span className="text-shirley-yellow-mango">COMING SOON</span>
          </div>
        </div>
      </div>

      {/* Frame Bottom Label */}
      <div className="text-center pt-2.5 pb-0.5 text-shirley-plum-rich">
        <p className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
          YOUR INVITATION TO THE FIRST DROP
        </p>
        <p className="text-[9px] sm:text-[10px] text-shirley-plum-dark/70">
          Official Founding Member Verification #{referralCode}
        </p>
      </div>
    </div>
  );
}
