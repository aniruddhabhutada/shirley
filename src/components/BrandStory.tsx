'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function BrandStory() {
  return (
    <section className="py-16 lg:py-24 bg-shirley-cream-warm border-b border-shirley-blush-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Storytelling Composition */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl bg-gradient-to-tr from-shirley-blush to-shirley-peach p-4 shadow-elevated border border-white">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-shirley-blush-light">
                  <Image
                    src="/images/product-inosia.png"
                    alt="SHIRLEY Botanical Formulation Inspiration"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-shirley-plum-rich/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <p className="text-xs font-semibold tracking-widest uppercase text-shirley-yellow-mango">
                      THE BEGINNING
                    </p>
                    <p className="text-xl font-serif">
                      Built with care in India.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating quote card */}
              <div className="absolute -bottom-6 -right-4 sm:right-4 bg-white rounded-2xl p-4 sm:p-5 shadow-elevated border border-shirley-blush-border/60 max-w-[260px] hidden sm:block">
                <div className="flex items-center gap-2 mb-2 text-shirley-berry-vibrant">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-bold text-shirley-plum-rich">Our Promise</span>
                </div>
                <p className="text-xs text-shirley-plum-dark/80 italic leading-relaxed">
                  &ldquo;Wellness should respect her rhythm, not complicate it.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shirley-blush/80 border border-shirley-blush-border text-xs font-semibold tracking-wider text-shirley-berry-vibrant uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUR STORY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
              Meet Shirley.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-shirley-plum-dark/80 font-normal leading-relaxed">
              <p>
                SHIRLEY began with a simple idea: women&apos;s wellness deserves more thoughtful conversations, better transparency, and products designed around real everyday routines.
              </p>
              <p className="text-sm sm:text-base text-shirley-plum-dark/75">
                Across India, millions of young women navigate period cramps, hormonal fluctuations, and PCOS while managing demanding college exams or workplace schedules. Yet most existing options were either medicinal and intimidating, or packed with generic pink marketing and exaggerated promises.
              </p>
              <p className="text-sm sm:text-base text-shirley-plum-dark/75">
                We set out to create something different: a women&apos;s nutritional brand grounded in bioavailable science, clean ingredients, honest communication, and enjoyable daily rituals.
              </p>
              <p className="text-sm font-medium text-shirley-berry-vibrant italic">
                We are building a new kind of women&apos;s wellness brand, one step at a time.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/our-story"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-shirley-plum-rich hover:bg-shirley-plum-deep text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-sm group"
              >
                <span>GET TO KNOW US</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/#founding-list"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-shirley-blush-light border border-shirley-blush-border text-shirley-plum-rich text-xs font-bold tracking-wider uppercase transition-colors"
              >
                <span>JOIN THE COMMUNITY</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

