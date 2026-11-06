'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'OUR STORY', href: '/our-story' },
  { name: 'OUR PRODUCTS', href: '/products' },
  { name: 'WELLNESS JOURNAL', href: '/journal' },
  { name: 'FAQ', href: '/faq' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-shirley-cream/95 backdrop-blur-md shadow-sm border-b border-shirley-blush-border/50 py-3'
          : 'bg-shirley-cream py-4 border-b border-shirley-blush-border/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group relative z-10">
            <div className="relative h-9 sm:h-11 w-32 sm:w-40 transition-transform group-hover:scale-[1.02]">
              <Image
                src="/images/shirley-logo-trans.webp"
                alt="SHIRLEY Wellness"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-semibold tracking-widest transition-colors duration-200 py-1 border-b-2 ${
                    isActive
                      ? 'text-shirley-plum-rich border-shirley-berry-vibrant'
                      : 'text-shirley-plum-dark/75 hover:text-shirley-plum-rich border-transparent hover:border-shirley-blush'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/#founding-list"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs font-bold tracking-wider uppercase shadow-glow-yellow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-shirley-plum-rich" />
              <span>JOIN THE FOUNDING LIST</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/#founding-list"
              className="inline-flex items-center justify-center px-3 py-2 min-h-[36px] rounded-full bg-shirley-yellow-mango text-shirley-plum-rich text-[11px] font-bold tracking-wider uppercase shadow-sm active:scale-95 transition-transform"
            >
              JOIN LIST
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-shirley-plum-rich hover:bg-shirley-blush/50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 top-[60px] bg-shirley-cream z-40 border-t border-shirley-blush-border flex flex-col justify-between p-6 animate-fadeIn">
          <div className="space-y-6 pt-4">
            <div className="text-[11px] font-semibold tracking-widest text-shirley-berry-vibrant uppercase">
              Navigation
            </div>
            <div className="space-y-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-xl font-serif font-medium tracking-wide transition-colors ${
                      isActive ? 'text-shirley-berry-vibrant' : 'text-shirley-plum-rich hover:text-shirley-berry-vibrant'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-shirley-blush-border/60 space-y-4 pb-12">
            <div className="bg-shirley-blush-light p-4 rounded-2xl border border-shirley-blush-border/50">
              <p className="text-xs text-shirley-plum-dark/80 font-medium">
                Be among the first women in India to experience thoughtful menstrual and hormonal nutrition.
              </p>
            </div>
            <Link
              href="/#founding-list"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-shirley-yellow-mango text-shirley-plum-rich text-xs font-bold tracking-widest uppercase shadow-glow-yellow"
            >
              <span>GET EARLY ACCESS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

