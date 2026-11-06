'use client';

import React from 'react';
import { Sparkles, MessageSquareHeart, Droplet, HeartHandshake } from 'lucide-react';

export default function BrandIntroduction() {
  const pillars = [
    {
      number: '01',
      title: 'Approachable Conversations',
      description:
        'Period health and hormonal balance should never be taboo. We speak with openness, clarity, and warmth — without medical jargon or shame.',
      icon: MessageSquareHeart,
      bg: 'bg-shirley-blush-light',
      accent: 'text-shirley-berry-vibrant',
    },
    {
      number: '02',
      title: 'Science-Informed Formulations',
      description:
        'Every powder blend starts with clinically researched micronutrients and bioavailable minerals that genuinely support female physiology.',
      icon: Sparkles,
      bg: 'bg-shirley-lavender-light',
      accent: 'text-shirley-plum-light',
    },
    {
      number: '03',
      title: 'Effortless Daily Rituals',
      description:
        'No complicated routines or chalky pills. Designed as a refreshing 5g sachet you can easily mix with water at your desk or home.',
      icon: Droplet,
      bg: 'bg-shirley-peach-light',
      accent: 'text-shirley-plum-rich',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-shirley-cream border-b border-shirley-blush-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-shirley-berry-vibrant">
            THE SHIRLEY PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
            Wellness should feel like it belongs to you.
          </h2>
          <p className="text-base sm:text-lg text-shirley-plum-dark/80 font-normal leading-relaxed pt-2">
            Understanding your body should never feel complicated or uncomfortable. SHIRLEY is being created to make women&apos;s wellness more approachable through thoughtful products, transparent conversations, and everyday wellness rituals.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="card-luxury rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold tracking-widest text-shirley-plum-dark/40 font-mono">
                      {pillar.number}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl ${pillar.bg} flex items-center justify-center ${pillar.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-shirley-plum-rich mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-shirley-plum-dark/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-shirley-blush-border/40 flex items-center gap-2 text-xs font-semibold text-shirley-berry-vibrant">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Designed for Her</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

