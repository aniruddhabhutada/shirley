'use client';

import React from 'react';
import { Heart, Search, Clock, VolumeX } from 'lucide-react';

export default function WhyShirley() {
  const principles = [
    {
      number: '01',
      title: 'MADE FOR HER',
      subtitle: "Women's wellness is the center of our brand.",
      description:
        'Not an afterthought, a repackaged men’s supplement, or a trendy pink sticker. Every ingredient, flavor profile, and sachet is designed specifically for female physiology and metabolism.',
      icon: Heart,
      bg: 'bg-shirley-blush-light',
      accent: 'text-shirley-berry-vibrant',
      borderColor: 'border-shirley-blush-border',
    },
    {
      number: '02',
      title: 'TRANSPARENT BY NATURE',
      subtitle: 'Clarity about every ingredient and intention.',
      description:
        'We believe you deserve full honesty about what you drink every day. No secret proprietary concoctions, no hidden synthetic additives, and no exaggerated clinical pseudo-science.',
      icon: Search,
      bg: 'bg-shirley-lavender-light',
      accent: 'text-shirley-plum-light',
      borderColor: 'border-shirley-lavender/50',
    },
    {
      number: '03',
      title: 'EVERYDAY WELLNESS',
      subtitle: 'Designed around convenient real routines.',
      description:
        'Wellness only works when it is easy to sustain. Our single-serve powder sachets dissolve smoothly in cold water, requiring no blenders, no measuring scoops, and zero morning stress.',
      icon: Clock,
      bg: 'bg-shirley-peach-light',
      accent: 'text-shirley-plum-rich',
      borderColor: 'border-shirley-peach-warm/50',
    },
    {
      number: '04',
      title: 'WELLNESS WITHOUT THE NOISE',
      subtitle: 'Approachable conversations without fear-based guilt.',
      description:
        'We refuse to market through insecurity or body shame. We celebrate natural biological rhythms with science-backed optimism, empathetic education, and realistic expectations.',
      icon: VolumeX,
      bg: 'bg-shirley-blue-light',
      accent: 'text-shirley-plum-dark',
      borderColor: 'border-shirley-blue-sky/60',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-shirley-cream border-b border-shirley-blush-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-shirley-berry-vibrant">
            THE SHIRLEY COMMITMENT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
            A little more thoughtful. <br />
            A little more her.
          </h2>
          <p className="text-base sm:text-lg text-shirley-plum-dark/80 font-normal leading-relaxed">
            Four guiding principles behind every formulation, conversation, and experience we create.
          </p>
        </div>

        {/* 4 Brand Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className={`card-luxury rounded-3xl p-7 bg-white border ${p.borderColor} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold tracking-widest text-shirley-plum-dark/40 font-mono">
                      {p.number}
                    </span>
                    <div className={`w-11 h-11 rounded-2xl ${p.bg} flex items-center justify-center ${p.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold tracking-wider uppercase text-shirley-plum-rich mb-2">
                    {p.title}
                  </h3>

                  <p className="text-xs font-semibold text-shirley-berry-vibrant mb-3 leading-snug">
                    {p.subtitle}
                  </p>

                  <p className="text-xs text-shirley-plum-dark/75 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-shirley-blush-border/30 text-[11px] font-medium text-shirley-plum-dark/50">
                  SHIRLEY STANDARD
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

