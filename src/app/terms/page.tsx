import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | SHIRLEY Wellness',
  description: 'Terms governing early-access registration and website use for SHIRLEY Wellness.',
};

export default function TermsPage() {
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
            <FileText className="w-3.5 h-3.5" />
            <span>LEGAL TERMS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-shirley-plum-dark/60">
            Last Updated: November 2024 · Pre-Launch Informational Platform
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-shirley-blush-border/50 shadow-sm space-y-8 text-sm text-shirley-plum-dark/85 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-shirley-plum-rich">1. Pre-Launch Nature of Products</h2>
            <p>
              SHIRLEY products (including proposed concepts such as SHIRLEY PERIOD SUPPORT and SHIRLEY PCOS SUPPORT) are currently in active research, formulation, and regulatory review in India. No products are currently offered for sale or commercial purchase on this website. Joining the Founding List creates no contractual obligation to purchase any product when available.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-shirley-plum-rich">2. Non-Medical Educational Disclaimer</h2>
            <p>
              The content provided across the SHIRLEY website, including the Wellness Journal and ingredient overviews, is for educational and informational purposes only. It is not intended as medical advice, clinical diagnosis, or a treatment plan for Polycystic Ovary Syndrome (PCOS), menstrual cramps, hormonal disorders, or any health condition. Always consult your healthcare provider with any medical questions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-shirley-plum-rich">3. Founding Member Status &amp; Referrals</h2>
            <p>
              &ldquo;Founding Member&rdquo; status is an honorary early-access designation for our pre-launch community. It does not represent equity ownership, financial entitlement, or commercial agency. Referral links are provided for personal sharing among friends and family and may not be used in unsolicited commercial communications (spam).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-shirley-plum-rich">4. Intellectual Property</h2>
            <p>
              All trademarks, trade names, logos, package designs, graphics, and written content appearing on this website are the intellectual property of SHIRLEY. Unauthorized reproduction or commercial use is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-shirley-plum-rich">5. Contact Information</h2>
            <p>
              If you have inquiries regarding these terms, please contact us at{' '}
              <a href="mailto:helloshirleywellness@gmail.com" className="text-shirley-berry-vibrant underline">
                helloshirleywellness@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

