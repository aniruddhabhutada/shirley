'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-shirley-plum-rich text-shirley-cream text-xs sm:text-sm py-2 px-4 border-b border-shirley-plum-light/30">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
        <Sparkles className="w-3.5 h-3.5 text-shirley-yellow-mango flex-shrink-0 animate-pulse-soft" />
        <span className="font-medium tracking-wide">
          A new era of women&apos;s wellness is on the way.
        </span>
        <span className="hidden md:inline text-shirley-blush/80">|</span>
        <Link
          href="/#founding-list"
          className="hidden md:inline-flex items-center gap-1 text-shirley-yellow-mango hover:underline font-semibold ml-1 group"
        >
          <span>Join the Founding List for Free</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

