import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Sparkles, Heart, ShieldCheck, ArrowRight, Compass, Droplet } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story | SHIRLEY Wellness',
  description:
    'The inspiration and principles behind SHIRLEY: creating approachable, transparent, science-informed wellness for Indian women.',
};

export default function OurStoryPage() {
  return (
    <div className="bg-shirley-cream min-h-screen py-12 lg:py-20 border-b border-shirley-blush-border/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shirley-blush text-shirley-berry-vibrant text-xs font-bold tracking-wider uppercase border border-shirley-blush-border">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE SHIRLEY JOURNEY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-shirley-plum-rich leading-tight">
            Wellness should never feel like a secret or a struggle.
          </h1>

          <p className="text-base sm:text-lg text-shirley-plum-dark/80 font-normal leading-relaxed">
            SHIRLEY began with a simple idea: women&apos;s wellness deserves more thoughtful conversations, better transparency, and products designed around real everyday routines.
          </p>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden bg-shirley-blush-light p-4 border border-shirley-blush-border/60 shadow-elevated">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/product-cycora.webp"
                  alt="SHIRLEY Botanical Research and Formulation"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-base text-shirley-plum-dark/85 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-serif text-shirley-plum-rich">
              Why We Started SHIRLEY
            </h2>

            <p>
              Growing up and working alongside ambitious women across Indian cities, a consistent reality stood out: whether navigating demanding college exams, corporate schedules, or creative careers, women routinely pushed through intense menstrual discomfort, energy slumps, and PCOS symptoms in silence.
            </p>

            <p>
              When looking at the existing market, the choices were disheartening: on one side were clinical pharmaceuticals associated with illness and intimidation; on the other were heavily sweetened gummy candies with minimal active dosages wrapped in superficial pink packaging.
            </p>

            <p>
              Women didn&apos;t need another gimmicky &ldquo;beauty multivitamin.&rdquo; They deserved serious nutritional science, bioavailable mineral chelates, genuine ingredient transparency, and respectful communication without fear-mongering or patronizing slogans.
            </p>

            <div className="p-6 rounded-2xl bg-white border border-shirley-blush-border/60 shadow-sm space-y-2">
              <p className="font-serif text-lg text-shirley-plum-rich italic">
                &ldquo;We don&apos;t believe in miracle claims or overnight fixes. We believe in daily nutritional consistency that respects female biology.&rdquo;
              </p>
              <p className="text-xs font-bold text-shirley-berry-vibrant tracking-wider uppercase">
                THE SHIRLEY FOUNDING COMMITMENT
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-shirley-berry-vibrant uppercase">
              STANDARDS WE LIVE BY
            </span>
            <h2 className="text-3xl font-serif text-shirley-plum-rich">
              Formulated With Intention
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-shirley-blush-border/50 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-shirley-blush-light flex items-center justify-center text-shirley-berry-vibrant">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-shirley-plum-rich">
                Science Over Superstition
              </h3>
              <p className="text-xs sm:text-sm text-shirley-plum-dark/75 leading-relaxed">
                We select research-backed compounds like Magnesium Bisglycinate and Myo-Inositol that have verifiable cellular pathways in female nutrition.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-shirley-blush-border/50 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-shirley-lavender-light flex items-center justify-center text-shirley-plum-rich">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-shirley-plum-rich">
                Enjoyable Daily Rituals
              </h3>
              <p className="text-xs sm:text-sm text-shirley-plum-dark/75 leading-relaxed">
                Health shouldn&apos;t feel like a chore. Our powder sachets dissolve effortlessly into fresh water with crisp fruit notes like strawberry and blueberry lemonade.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-shirley-blush-border/50 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-shirley-peach-light flex items-center justify-center text-shirley-plum-dark">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-shirley-plum-rich">
                Uncompromising Safety
              </h3>
              <p className="text-xs sm:text-sm text-shirley-plum-dark/75 leading-relaxed">
                Adhering to Indian FSSAI dietary standards with rigorous microbiological and heavy metal testing across every batch before launch.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-shirley-plum-rich text-white p-8 sm:p-12 text-center space-y-6 shadow-soft-plum">
          <h2 className="text-3xl sm:text-4xl font-serif">
            Join the journey from day one.
          </h2>
          <p className="text-sm sm:text-base text-shirley-blush max-w-xl mx-auto leading-relaxed">
            We are actively perfecting our first drops. Become a Founding Member to follow behind-the-scenes progress and claim early access.
          </p>
          <Link
            href="/#founding-list"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs font-bold tracking-wider uppercase transition-colors shadow-glow-yellow"
          >
            <span>JOIN THE FOUNDING LIST</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

