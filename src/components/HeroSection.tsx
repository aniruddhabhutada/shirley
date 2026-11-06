'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-shirley-blush-light via-shirley-cream to-shirley-cream pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-shirley-blush-border/40">
      {/* Subtle background ambient glow */}
      <div
        className="hidden sm:block absolute -top-24 -left-24 w-96 h-96 rounded-full bg-shirley-blush/60 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hidden sm:block absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-shirley-peach/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Country and Status Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-shirley-blush/80 border border-shirley-blush-border text-shirley-plum-rich text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-shirley-berry-vibrant animate-ping" />
              <span>COMING SOON TO INDIA</span>
              <span className="text-shirley-berry-vibrant">·</span>
              <span className="text-shirley-plum-light">FREE EARLY ACCESS</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-shirley-plum-rich leading-[1.15] tracking-tight">
              Your wellness. <br className="hidden sm:inline" />
              Your rhythm. <br />
              <span className="italic font-medium text-shirley-berry-vibrant">
                Your Shirley.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-shirley-plum-dark/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Meet SHIRLEY. A fresh approach to everyday women&apos;s wellness, thoughtfully designed around her needs. Real science, transparent ingredients, and daily powder rituals that honor your natural cycle.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/#founding-list"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs sm:text-sm font-bold tracking-wider uppercase shadow-glow-yellow transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <Sparkles className="w-4 h-4 text-shirley-plum-rich flex-shrink-0" />
                <span>JOIN THE FOUNDING LIST</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-shirley-blush/30 border border-shirley-blush-border text-shirley-plum-rich text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200"
              >
                <span>EXPLORE SHIRLEY</span>
              </Link>
            </div>

            {/* Trust and Values Row */}
            <div className="pt-4 border-t border-shirley-blush-border/50 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-x-6 text-[11px] sm:text-xs text-shirley-plum-dark/70">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-shirley-berry-vibrant flex-shrink-0" />
                <span>100% Free Early Access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-shirley-berry-vibrant flex-shrink-0" />
                <span>Science-Informed Nutrition</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-shirley-berry-vibrant flex-shrink-0" />
                <span>Zero Fake Promises</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Product Editorial Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative pastel backdrop container */}
              <div className="relative rounded-3xl bg-gradient-to-tr from-shirley-peach/50 via-shirley-blush/60 to-shirley-lavender/30 p-3 sm:p-5 border border-white/80 shadow-soft-plum">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[4/5] bg-shirley-blush-light shadow-inner">
                  {/* Real Product Photography */}
                  <Image
                    src="/images/product-cycora.png"
                    alt="SHIRLEY PERIOD SUPPORT Formulation Mockup"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient bottom overlay for subtle text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-shirley-plum-rich/40 via-transparent to-transparent pointer-events-none" />

                  {/* Floating badge inside picture */}
                  <div className="absolute top-4 left-4 glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold tracking-wider text-shirley-plum-rich uppercase">
                      Formula 01 · PERIOD SUPPORT
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 glass-pill p-3.5 rounded-xl border border-white/60 shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold tracking-wider text-shirley-berry-vibrant uppercase">
                        Menstrual Wellness Drink
                      </p>
                      <p className="text-xs sm:text-sm font-serif font-medium text-shirley-plum-rich">
                        Strawberry Lemonade · 15 Daily Sachets
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-shirley-plum-rich text-white text-[10px] font-bold tracking-wider uppercase">
                      IN R&amp;D
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating decorative chip: Natural Ingredients */}
              <div className="absolute -bottom-5 -left-4 sm:left-2 bg-white rounded-2xl p-3.5 shadow-elevated border border-shirley-blush-border/60 max-w-[210px] hidden sm:block animate-float">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-shirley-blush flex items-center justify-center text-shirley-berry-vibrant">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-shirley-plum-rich">Thoughtful Ritual</span>
                </div>
                <p className="text-[11px] text-shirley-plum-dark/80 leading-snug">
                  Magnesium, Vitamin B6 &amp; Probiotics in an easy daily drink.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
