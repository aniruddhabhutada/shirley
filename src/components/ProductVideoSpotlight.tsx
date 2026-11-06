'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductVideoPlayer from './ProductVideoPlayer';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function ProductVideoSpotlight() {
  return (
    <section className="py-16 lg:py-24 bg-shirley-cream border-b border-shirley-blush-border/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shirley-blush text-shirley-berry-vibrant text-xs font-bold tracking-wider uppercase border border-shirley-blush-border">
            <Sparkles className="w-3.5 h-3.5" />
            <span>RITUALS IN MOTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
            See the SHIRLEY experience come to life.
          </h2>

          <p className="text-base sm:text-lg text-shirley-plum-dark/80 font-normal leading-relaxed">
            From the unboxing to the 15-second cold water pour — watch our upcoming formulations designed for real women and real morning routines.
          </p>
        </div>

        {/* ========================================================
            SPOTLIGHT 01: SHIRLEY PERIOD SUPPORT
            ======================================================== */}
        <div className="rounded-3xl bg-gradient-to-br from-shirley-blush-light via-white to-shirley-peach-light/40 p-8 sm:p-12 lg:p-14 border border-shirley-blush-border/60 shadow-soft-plum">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Product Editorial & Packshot */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-shirley-blush text-shirley-berry-vibrant text-xs font-bold tracking-wider uppercase">
                  <span>MENSTRUAL WELLNESS DRINK</span>
                  <span>·</span>
                  <span className="text-shirley-plum-rich">IN DEVELOPMENT</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
                  SHIRLEY PERIOD SUPPORT
                </h3>

                <p className="text-sm font-semibold text-shirley-plum-light">
                  Strawberry Lemonade · 15 Daily Powder Sachets (5g each)
                </p>
              </div>

              <p className="text-base sm:text-lg text-shirley-plum-dark/85 leading-relaxed">
                A convenient powder-based drink concept being developed around everyday menstrual wellness routines and cycle comfort. Formulated with chelated Magnesium Bisglycinate, Vitamin B6, and targeted probiotics to turn cycle care into a refreshing morning ritual.
              </p>

              {/* Highlights & Pack Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs text-shirley-plum-dark/80 bg-white/70 p-3 rounded-2xl border border-shirley-blush-border/50">
                  <CheckCircle2 className="w-4 h-4 text-shirley-berry-vibrant flex-shrink-0" />
                  <span>Bioavailable Magnesium Chelate</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-shirley-plum-dark/80 bg-white/70 p-3 rounded-2xl border border-shirley-blush-border/50">
                  <CheckCircle2 className="w-4 h-4 text-shirley-berry-vibrant flex-shrink-0" />
                  <span>15-Second Water Dissolution</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-shirley-plum-dark/80 bg-white/70 p-3 rounded-2xl border border-shirley-blush-border/50">
                  <CheckCircle2 className="w-4 h-4 text-shirley-berry-vibrant flex-shrink-0" />
                  <span>Stomach-Friendly &amp; Non-Chalky</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-shirley-plum-dark/80 bg-white/70 p-3 rounded-2xl border border-shirley-blush-border/50">
                  <CheckCircle2 className="w-4 h-4 text-shirley-berry-vibrant flex-shrink-0" />
                  <span>Zero Fake Hormonal Claims</span>
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/#founding-list"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs font-bold tracking-wider uppercase transition-all shadow-glow-yellow"
                >
                  <span>JOIN FOUNDING LIST FOR PERIOD SUPPORT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/products/cycora"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-shirley-blush-light border border-shirley-blush-border text-shirley-plum-rich text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <span>VIEW FORMULATION</span>
                </Link>
              </div>
            </div>

            {/* Right: Promotional Video Ad Player */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <ProductVideoPlayer
                src="/videos/shirley-period-support.mp4"
                poster="/videos/shirley-period-support-poster.jpg"
                title="SHIRLEY PERIOD SUPPORT"
                badge="PERIOD SUPPORT AD"
              />
              <p className="text-[11px] text-shirley-plum-dark/60 mt-3 text-center">
                Tap to play video with controls · 1080×1920 vertical ritual ad
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            SPOTLIGHT 02: SHIRLEY PCOS SUPPORT
            ======================================================== */}
        <div className="rounded-3xl bg-gradient-to-br from-shirley-lavender-light/50 via-white to-shirley-blush-light/50 p-8 sm:p-12 lg:p-14 border border-shirley-lavender/50 shadow-soft-plum">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Promotional Video Ad Player (mirrored for dynamic rhythm) */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-center">
              <ProductVideoPlayer
                src="/videos/shirley-pcos-support.mp4"
                poster="/videos/shirley-pcos-support-poster.jpg"
                title="SHIRLEY PCOS SUPPORT"
                badge="PCOS SUPPORT AD"
              />
              <p className="text-[11px] text-shirley-plum-dark/60 mt-3 text-center">
                Tap to play video with controls · 1080×1920 vertical ritual ad
              </p>
            </div>

            {/* Right: Product Editorial & Packshot */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-shirley-lavender text-shirley-plum-rich text-xs font-bold tracking-wider uppercase">
                  <span>PCOS NUTRITIONAL WELLNESS</span>
                  <span>·</span>
                  <span className="text-shirley-plum-light">IN DEVELOPMENT</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
                  SHIRLEY PCOS SUPPORT
                </h3>

                <p className="text-sm font-semibold text-shirley-plum-light">
                  Blueberry Lemonade · 15 Daily Powder Sachets (5g each)
                </p>
              </div>

              <p className="text-base sm:text-lg text-shirley-plum-dark/85 leading-relaxed">
                A nutritional wellness supplement concept being developed for women interested in supporting their broader PCOS wellness routines. Features clinically researched Myo-Inositol, D-Chiro-Inositol, bioactive L-Methylfolate, and probiotics in an uplifting daily drink.
              </p>

              {/* Highlights & Pack Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs text-shirley-plum-dark/80 bg-white/70 p-3 rounded-2xl border border-shirley-lavender/40">
                  <CheckCircle2 className="w-4 h-4 text-shirley-plum-rich flex-shrink-0" />
                  <span>Myo &amp; D-Chiro Inositol Complex</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-shirley-plum-dark/80 bg-white/70 p-3 rounded-2xl border border-shirley-lavender/40">
                  <CheckCircle2 className="w-4 h-4 text-shirley-plum-rich flex-shrink-0" />
                  <span>Active Methylated Folate</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-shirley-plum-dark/80 bg-white/70 p-3 rounded-2xl border border-shirley-lavender/40">
                  <CheckCircle2 className="w-4 h-4 text-shirley-plum-rich flex-shrink-0" />
                  <span>Cellular Glucose &amp; Ovary Rhythms</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-shirley-plum-dark/80 bg-white/70 p-3 rounded-2xl border border-shirley-lavender/40">
                  <CheckCircle2 className="w-4 h-4 text-shirley-plum-rich flex-shrink-0" />
                  <span>Non-Medical, Science-Informed</span>
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/#founding-list"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs font-bold tracking-wider uppercase transition-all shadow-glow-yellow"
                >
                  <span>JOIN FOUNDING LIST FOR PCOS SUPPORT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/products/inosia"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-shirley-lavender-light border border-shirley-blush-border text-shirley-plum-rich text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <span>VIEW FORMULATION</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

