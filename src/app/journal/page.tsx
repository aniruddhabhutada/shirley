import React from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { Sparkles, ArrowRight, BookOpen, Clock, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wellness Journal | SHIRLEY',
  description:
    'Evidence-informed conversations around menstrual health, PCOS nutrition, hormonal wellness, and approachable daily rituals for Indian women.',
};

export default function JournalPage() {
  return (
    <div className="bg-shirley-cream min-h-screen py-12 lg:py-20 border-b border-shirley-blush-border/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shirley-blush text-shirley-berry-vibrant text-xs font-bold tracking-wider uppercase border border-shirley-blush-border">
            <BookOpen className="w-3.5 h-3.5" />
            <span>EDUCATIONAL SERIES</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-shirley-plum-rich leading-tight">
            Let&apos;s talk about women&apos;s wellness.
          </h1>

          <p className="text-base sm:text-lg text-shirley-plum-dark/80 font-normal leading-relaxed">
            Unpacking the science of menstrual cycles, hormonal fluctuations, and active micronutrients in simple, stigma-free English.
          </p>
        </div>

        {/* Featured Top Article */}
        <div className="card-luxury rounded-3xl p-8 sm:p-12 bg-white border border-shirley-blush-border/60 shadow-soft-plum">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${ARTICLES[0].categoryColor}`}>
                  {ARTICLES[0].category}
                </span>
                <span className="text-xs text-shirley-plum-dark/60 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {ARTICLES[0].readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-shirley-plum-rich leading-snug">
                <Link href={`/journal/${ARTICLES[0].slug}`} className="hover:text-shirley-berry-vibrant transition-colors">
                  {ARTICLES[0].title}
                </Link>
              </h2>

              <p className="text-sm sm:text-base text-shirley-plum-dark/80 leading-relaxed">
                {ARTICLES[0].summary}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs text-shirley-plum-dark/70">
                  By <strong className="text-shirley-plum-rich">{ARTICLES[0].author.name}</strong> · {ARTICLES[0].publishDate}
                </div>

                <Link
                  href={`/journal/${ARTICLES[0].slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-shirley-berry-vibrant hover:text-shirley-plum-rich uppercase group"
                >
                  <span>READ FULL ARTICLE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-shirley-blush-light rounded-2xl p-6 border border-shirley-blush-border/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-shirley-blush text-shirley-berry-vibrant flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-shirley-plum-rich uppercase tracking-wider">
                Evidence-Led Guidance
              </p>
              <p className="text-xs text-shirley-plum-dark/75 leading-relaxed">
                Written for education and clarity. Always consult your personal physician for individualized medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.slice(1).map((article) => (
            <div
              key={article.slug}
              className="card-luxury rounded-3xl p-7 bg-white border border-shirley-blush-border/50 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${article.categoryColor}`}>
                    {article.category}
                  </span>
                  <span className="text-[11px] text-shirley-plum-dark/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-serif text-shirley-plum-rich leading-snug">
                  <Link href={`/journal/${article.slug}`} className="hover:text-shirley-berry-vibrant transition-colors">
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-shirley-plum-dark/75 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-shirley-blush-border/30 flex items-center justify-between">
                <span className="text-[11px] text-shirley-plum-dark/60">
                  {article.publishDate}
                </span>

                <Link
                  href={`/journal/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-shirley-berry-vibrant hover:underline uppercase"
                >
                  <span>READ</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

