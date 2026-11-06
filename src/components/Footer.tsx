'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';

export default function Footer() {
  return (
    <footer className="bg-shirley-plum-rich text-shirley-cream pt-16 pb-12 border-t border-shirley-plum-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-shirley-plum-light/30">
          {/* Brand Info & Mission */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-block relative h-10 w-36">
              <Image
                src="/images/shirley-logo-light.webp"
                alt="SHIRLEY Wellness"
                fill
                className="object-contain object-left"
              />
            </Link>

            <p className="font-serif text-xl sm:text-2xl text-shirley-cream italic font-light">
              &ldquo;Your body. Your rhythm. Your wellness.&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-shirley-blush/80 leading-relaxed max-w-sm">
              SHIRLEY is a modern women&apos;s wellness company redefining menstrual, hormonal, and everyday nutritional rituals with science-backed clarity and compassionate transparency.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="mailto:helloshirleywellness@gmail.com"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-shirley-cream transition-colors group border border-white/10 max-w-full"
                aria-label="Email Shirley Wellness at helloshirleywellness@gmail.com"
              >
                <Mail className="w-3.5 h-3.5 text-shirley-yellow-mango flex-shrink-0" />
                <span className="font-medium truncate">helloshirleywellness@gmail.com</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-shirley-berry-vibrant flex items-center justify-center text-white transition-colors"
                aria-label="Follow Shirley on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs font-bold tracking-widest text-shirley-yellow-mango uppercase">
              EXPLORE
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-shirley-blush/90">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Our Products (In Development)
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-white transition-colors">
                  Wellness Journal
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Early Access Action */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs font-bold tracking-widest text-shirley-yellow-mango uppercase">
              FOUNDING COMMUNITY
            </p>
            <p className="text-xs text-shirley-blush/80 leading-relaxed">
              Join the free Founding List today to receive priority access to our upcoming product batches and private invitations.
            </p>
            <Link
              href="/#founding-list"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs font-bold tracking-wider uppercase transition-colors shadow-glow-yellow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>JOIN FOUNDING LIST</span>
            </Link>
          </div>
        </div>

        {/* Responsible Disclaimer */}
        <div className="text-[11px] text-shirley-blush/60 leading-relaxed space-y-2">
          <p>
            *Disclaimer: The statements and formulations presented on this website are currently in investigational research and development stages. Products are dietary and nutritional supplements, not pharmaceutical drugs, and are not intended to diagnose, treat, cure, or prevent any disease, including PCOS, dysmenorrhea, or other menstrual conditions. Information provided is for educational purposes only and should not replace personalized advice from qualified medical professionals.
          </p>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-shirley-blush/70 pt-4 gap-4">
          <p>© {new Date().getFullYear()} SHIRLEY. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
