'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function WellnessStory() {
  const stories = [
    {
      title: 'Decoded Menstrual Cycles',
      subtitle: 'Living in sync with your follicular, luteal & menstrual phases.',
      description:
        'Hormones naturally fluctuate throughout your monthly cycle. Instead of fighting fatigue or mood shifts, we build nutrition that supports your body where it actually is.',
      tag: 'CYCLE CARE',
      icon: Compass,
      color: 'bg-shirley-blush text-shirley-berry-vibrant',
    },
    {
      title: 'PCOS With Understanding',
      subtitle: 'Empathetic nutritional education, not fear or shame.',
      description:
        'PCOS affects 1 in 5 Indian women, yet most advice is overwhelming or guilt-ridden. We focus on gentle daily metabolic & inositol nutrition that fits real college and office schedules.',
      tag: 'HORMONAL CLARITY',
      icon: Sparkles,
      color: 'bg-shirley-lavender text-shirley-plum-rich',
    },
    {
      title: '100% Ingredient Honesty',
      subtitle: 'What is inside matters. And what is left out matters just as much.',
      description:
        'Bioavailable mineral chelates, proven vitamins, clean natural fruit flavours, and stable probiotics. No secret proprietary concoctions or filler ingredients.',
      tag: 'CLEAN STANDARDS',
      icon: Layers,
      color: 'bg-shirley-peach text-shirley-plum-dark',
    },
    {
      title: 'Built For Modern Mornings',
      subtitle: 'Tear, pour, stir — done in under 15 seconds.',
      description:
        'Whether you are rushing to a 9 AM lecture or dialing into a morning sync, your wellness routine should take 15 seconds, taste crisp, and leave you feeling nourished.',
      tag: 'DAILY EASE',
      icon: BookOpen,
      color: 'bg-shirley-blue-sky text-shirley-plum-rich',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-shirley-cream-warm border-b border-shirley-blush-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase text-shirley-berry-vibrant">
              REALITY-FIRST NUTRITION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
              Because every woman&apos;s wellness journey is different.
            </h2>
            <p className="text-base text-shirley-plum-dark/80 font-normal leading-relaxed">
              No generic multivitamins. No one-size-fits-all prescriptions. Just thoughtful nutritional building blocks tailored to how young Indian women live, work, and bleed.
            </p>
          </div>

          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-shirley-berry-vibrant hover:text-shirley-plum-rich uppercase group transition-colors"
          >
            <span>EXPLORE WELLNESS JOURNAL</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-shirley-blush-border/40 shadow-sm hover:shadow-soft-plum transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-shirley-cream-warm border border-shirley-blush-border/60 text-[11px] font-bold tracking-wider text-shirley-plum-dark/70 uppercase">
                      {item.tag}
                    </span>
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif text-shirley-plum-rich mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-shirley-berry-vibrant mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-shirley-plum-dark/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-shirley-blush-border/30 flex items-center justify-between text-xs text-shirley-plum-dark/60">
                  <span>Thoughtfully formulated in India</span>
                  <span className="font-semibold text-shirley-plum-rich">SHIRLEY STANDARD</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

