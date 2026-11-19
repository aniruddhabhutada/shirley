'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { Sparkles, ArrowRight, Check, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

interface ProductShowcaseProps {
  selectedProducts?: string[];
  onToggleProduct?: (preferenceId: string) => void;
}

const PRODUCT_TO_PREFERENCE_MAP: Record<string, string> = {
  cycora: 'Period Support',
  inosia: 'PCOS Support',
  'anemia-support': 'Anemia Support',
  'uti-support': 'UTI Support',
};

export default function ProductShowcase({
  selectedProducts = [],
  onToggleProduct,
}: ProductShowcaseProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const [selectionError, setSelectionError] = useState<string | null>(null);

  const activeSelected = onToggleProduct ? selectedProducts : internalSelected;

  const handleToggle = (preferenceId: string) => {
    if (selectionError) setSelectionError(null);
    if (onToggleProduct) {
      onToggleProduct(preferenceId);
    } else {
      setInternalSelected((prev) =>
        prev.includes(preferenceId)
          ? prev.filter((id) => id !== preferenceId)
          : [...prev, preferenceId]
      );
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 260;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handlePrebookClick = () => {
    if (activeSelected.length === 0) {
      setSelectionError('Please select at least one SHIRLEY product to continue.');
      return;
    }
    setSelectionError(null);

    const formSection = document.getElementById('founding-list');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const nameInput = document.getElementById('fullName');
        if (nameInput) {
          nameInput.focus();
        }
      }, 500);
    }
  };

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-20 bg-shirley-cream border-b border-shirley-blush-border/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Label, Heading, Supporting Copy + Carousel Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 lg:mb-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shirley-blush text-shirley-berry-vibrant text-xs font-bold tracking-wider uppercase border border-shirley-blush-border">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE SHIRLEY COLLECTION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-serif text-shirley-plum-rich leading-tight">
              Find your favourites.
            </h2>

            <p className="text-sm sm:text-base text-shirley-plum-dark/80 font-normal leading-relaxed">
              Explore our four upcoming women&apos;s wellness products and choose the ones you&apos;re most excited to try.
            </p>
          </div>

          {/* Carousel Arrows (active on mobile, tablet & responsive widths) */}
          <div className="flex items-center gap-2 self-start sm:self-end flex-shrink-0">
            <button
              onClick={() => scrollCarousel('left')}
              type="button"
              className="w-10 h-10 rounded-full bg-white hover:bg-shirley-blush-light active:bg-shirley-blush text-shirley-plum-rich border border-shirley-blush-border flex items-center justify-center shadow-xs transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              type="button"
              className="w-10 h-10 rounded-full bg-white hover:bg-shirley-blush-light active:bg-shirley-blush text-shirley-plum-rich border border-shirley-blush-border flex items-center justify-center shadow-xs transition-colors"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Single-Row Horizontal Carousel Container */}
        <div className="relative -mx-4 sm:-mx-6 lg:mx-0">
          <div
            ref={carouselRef}
            className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto lg:overflow-x-visible pb-4 pt-1 px-4 sm:px-6 lg:px-0 scrollbar-none snap-x snap-mandatory scroll-smooth"
          >
            {PRODUCTS.map((product) => {
              const preferenceId = PRODUCT_TO_PREFERENCE_MAP[product.id] || product.id;
              const isSelected = activeSelected.includes(preferenceId);

              return (
                <div
                  key={product.id}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => handleToggle(preferenceId)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      handleToggle(preferenceId);
                    }
                  }}
                  className={`group relative rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer select-none flex flex-col justify-between snap-start flex-shrink-0 w-[230px] sm:w-[245px] lg:w-auto ${
                    isSelected
                      ? 'border-shirley-berry-vibrant ring-2 ring-shirley-berry-vibrant/25 bg-shirley-blush-light/30 shadow-md'
                      : 'border-shirley-blush-border/80 bg-white hover:border-shirley-berry-vibrant/60 hover:shadow-sm'
                  }`}
                >
                  {/* Compact Product Image Area (~160-165px) */}
                  <div className={`relative h-[160px] sm:h-[165px] ${product.bgPastel} p-3.5 flex items-center justify-center overflow-hidden`}>
                    {/* Subtle Status Pill */}
                    <div className="absolute top-2.5 left-2.5 z-10 glass-pill px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[9px] font-bold tracking-widest text-shirley-plum-rich uppercase">
                        Pre-Launch
                      </span>
                    </div>

                    {/* Sachet Count Pill */}
                    <div className="absolute top-2.5 right-2.5 z-10 glass-pill px-2 py-0.5 rounded-full text-[9px] font-semibold text-shirley-plum-dark/75 shadow-xs border border-white/80">
                      15 Sachets
                    </div>

                    {/* Actual Product Artwork */}
                    <div className="relative w-full h-full transform transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 240px, 260px"
                        className="object-contain drop-shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Minimal Product Information & Checkbox */}
                  <div className="p-3.5 sm:p-4 space-y-2 flex flex-col justify-between flex-1">
                    <div className="space-y-1 text-left">
                      <h3 className="font-serif font-bold text-shirley-plum-rich text-xs sm:text-sm leading-tight group-hover:text-shirley-berry-vibrant transition-colors min-h-[2.2rem] flex items-center">
                        <span>{product.name}</span>
                      </h3>
                      <p className="text-xs text-shirley-plum-dark/70 font-medium line-clamp-1">
                        {product.flavour}
                      </p>
                    </div>

                    {/* Checkbox Selection Control */}
                    <div className="pt-2 border-t border-shirley-blush-border/40 flex items-center justify-between">
                      <span
                        className={`text-xs transition-colors ${
                          isSelected
                            ? 'text-shirley-berry-vibrant font-bold'
                            : 'text-shirley-plum-dark/75 font-medium'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select product'}
                      </span>

                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-shirley-berry-vibrant border-shirley-berry-vibrant text-white shadow-xs'
                            : 'border-shirley-blush-border/90 bg-white group-hover:border-shirley-berry-vibrant/60'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Selection Counter & Single Primary Pre-Booking CTA */}
        <div className="mt-8 pt-4 flex flex-col items-center text-center space-y-3">
          {/* Dynamic Selection Indicator */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold">
            <span
              className={`px-3 py-1 rounded-full border transition-all duration-200 ${
                activeSelected.length > 0
                  ? 'bg-shirley-blush text-shirley-berry-vibrant border-shirley-blush-border shadow-xs'
                  : 'bg-white text-shirley-plum-dark/60 border-shirley-blush-border/60'
              }`}
            >
              {activeSelected.length === 0
                ? '0 products selected'
                : `${activeSelected.length} ${activeSelected.length === 1 ? 'product' : 'products'} selected`}
            </span>
          </div>

          {/* Validation Error Message */}
          {selectionError && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{selectionError}</span>
            </div>
          )}

          {/* Primary CTA Button */}
          <div>
            <button
              type="button"
              onClick={handlePrebookClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs sm:text-sm font-bold tracking-wider uppercase shadow-glow-yellow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-shirley-plum-rich" />
              <span>PRE-BOOK SELECTED PRODUCTS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Supporting Text */}
          <p className="text-xs text-shirley-plum-dark/70 font-medium">
            Free pre-booking · No payment required
          </p>
        </div>
      </div>
    </section>
  );
}
