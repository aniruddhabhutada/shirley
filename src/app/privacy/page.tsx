import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | SHIRLEY Wellness',
  description: 'How SHIRLEY protects, uses, and respects your personal registration details.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-shirley-cream min-h-screen py-12 lg:py-20 border-b border-shirley-blush-border/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-shirley-plum-rich hover:text-shirley-berry-vibrant uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </Link>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-shirley-blush text-shirley-berry-vibrant text-xs font-bold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DATA INTEGRITY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich">
            Privacy Policy
          </h1>
          <p className="text-xs text-shirley-plum-dark/60">
            Last Updated: November 2024 · Effective for SHIRLEY Early-Access Registrations
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-shirley-blush-border/50 shadow-sm space-y-8 text-sm text-shirley-plum-dark/85 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-shirley-plum-rich">1. Introduction</h2>
            <p>
              SHIRLEY (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the personal information you share with us during our pre-launch early-access registration phase. This policy outlines how your information is gathered, managed, and safeguarded.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-shirley-plum-rich">2. Information We Collect</h2>
            <p>
              When joining the SHIRLEY Founding List, we collect only the minimal necessary data to deliver early-access updates:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Full Name:</strong> To address you personally on your digital Founding Member invitation card.</li>
              <li><strong>Email Address:</strong> To deliver launch notifications, formulation updates, and community news.</li>
              <li><strong>WhatsApp Number (Optional):</strong> If provided, used solely for direct drop announcements.</li>
              <li><strong>Referral Token &amp; Source Attribution:</strong> To credit referring friends when you join via their unique link.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-shirley-plum-rich">3. How We Use Your Information</h2>
            <p>
              We process your registration data exclusively for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Providing your Founding Member verification status and digital card.</li>
              <li>Sending milestone updates concerning the commercial availability of SHIRLEY PERIOD SUPPORT and SHIRLEY PCOS SUPPORT.</li>
              <li>Attributing community referral counts securely.</li>
            </ul>
            <p className="font-semibold text-shirley-plum-rich">
              We never sell, rent, or lease your personal information to third-party advertisers, data brokers, or marketing networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-shirley-plum-rich">4. Data Security</h2>
            <p>
              All registration transmissions are secured via modern TLS encryption. Your contact details are stored in access-controlled environments and are masked in user-facing views to protect against accidental exposure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-shirley-plum-rich">5. Your Rights &amp; Unsubscribing</h2>
            <p>
              You have the right to request deletion of your Founding List entry at any time. Simply send an email to{' '}
              <a href="mailto:helloshirleywellness@gmail.com" className="text-shirley-berry-vibrant underline">
                helloshirleywellness@gmail.com
              </a>{' '}
              and we will permanently remove your contact record within 7 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

