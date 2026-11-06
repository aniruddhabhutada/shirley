import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/data/articles';
import { ArrowLeft, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Article Not Found | SHIRLEY' };

  return {
    title: `${article.title} | SHIRLEY Wellness Journal`,
    description: article.summary,
  };
}

export default function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <div className="bg-shirley-cream min-h-screen py-12 lg:py-20 border-b border-shirley-blush-border/30">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-shirley-plum-rich hover:text-shirley-berry-vibrant uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO JOURNAL</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${article.categoryColor}`}>
              {article.category}
            </span>
            <span className="text-xs text-shirley-plum-dark/60 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
            {article.title}
          </h1>

          <div className="pt-2 flex items-center justify-between text-xs text-shirley-plum-dark/70 border-b border-shirley-blush-border/40 pb-6">
            <div>
              Written by <strong>{article.author.name}</strong> · {article.author.role}
            </div>
            <div>{article.publishDate}</div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-shirley-blush-light p-6 rounded-2xl border border-shirley-blush-border/60 text-sm sm:text-base text-shirley-plum-dark leading-relaxed font-medium">
          {article.summary}
        </div>

        {/* Article Body Content */}
        <div className="space-y-6 text-base sm:text-lg text-shirley-plum-dark/85 leading-relaxed font-normal">
          {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Non-medical disclaimer */}
        <div className="p-4 rounded-2xl bg-white border border-shirley-blush-border/60 text-xs text-shirley-plum-dark/70 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Editorial Medical Disclaimer:</strong> Articles published in the SHIRLEY Wellness Journal are for educational and nutritional discussion purposes only. They do not constitute clinical diagnoses or treatment protocols. Always seek medical advice for chronic pain or irregular symptoms.
          </span>
        </div>

        {/* End of article Founding List Banner */}
        <div className="rounded-3xl bg-shirley-plum-rich text-white p-8 text-center space-y-4 shadow-soft-plum">
          <h3 className="text-2xl font-serif">
            Enjoyed this perspective?
          </h3>
          <p className="text-xs sm:text-sm text-shirley-blush max-w-md mx-auto">
            Join the SHIRLEY Founding List to get early access to our science-informed drink sachets when they launch in India.
          </p>
          <Link
            href="/#founding-list"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs font-bold tracking-wider uppercase transition-colors"
          >
            <span>JOIN THE FOUNDING LIST</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}

