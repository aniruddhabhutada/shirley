'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Check, ArrowDown, ArrowRight, AlertCircle, Info, ShieldCheck } from 'lucide-react';

export interface CatalogueProduct {
  id: string; // product route id
  preferenceId: string; // form preference id matching database & form state
  name: string;
  category: string;
  flavour: string;
  image: string;
  imageAlt: string;
  packagingColor: string;
  badgeText: string;
  format: string;
  accentBg: string;
  accentBorder: string;
  selectedCardClass: string;
  selectedCheckboxClass: string;
  categoryColor: string;
}

export const CATALOGUE_PRODUCTS: CatalogueProduct[] = [
  {
    id: 'cycora',
    preferenceId: 'Period Support',
    name: 'SHIRLEY PERIOD SUPPORT',
    category: 'Menstrual Wellness Drink',
    flavour: 'Strawberry Lemonade',
    image: '/images/product-cycora.webp',
    imageAlt: 'SHIRLEY PERIOD SUPPORT Formulation box and sachet with strawberry lemonade drink',
    packagingColor: 'Original pink packaging',
    badgeText: 'IN DEVELOPMENT',
    format: '15 Sachets Per Box',
    accentBg: 'bg-[#FDF2F5]',
    accentBorder: 'hover:border-shirley-berry-vibrant/60',
    selectedCardClass: 'border-shirley-berry-vibrant ring-2 ring-shirley-berry-vibrant/25 shadow-elevated bg-white',
    selectedCheckboxClass: 'border-shirley-berry-vibrant bg-shirley-berry-vibrant text-white',
    categoryColor: 'text-shirley-berry-vibrant',
  },
  {
    id: 'inosia',
    preferenceId: 'PCOS Support',
    name: 'SHIRLEY PCOS SUPPORT',
    category: 'PCOS Nutritional Wellness',
    flavour: 'Blueberry Lemonade',
    image: '/images/product-inosia.webp',
    imageAlt: 'SHIRLEY PCOS SUPPORT Formulation box and sachet with blueberries',
    packagingColor: 'Original lavender packaging',
    badgeText: 'IN DEVELOPMENT',
    format: '15 Sachets Per Box',
    accentBg: 'bg-[#F5EFF8]',
    accentBorder: 'hover:border-shirley-plum-rich/60',
    selectedCardClass: 'border-shirley-plum-rich ring-2 ring-shirley-plum-rich/25 shadow-elevated bg-white',
    selectedCheckboxClass: 'border-shirley-plum-rich bg-shirley-plum-rich text-white',
    categoryColor: 'text-shirley-plum-rich',
  },
  {
    id: 'anemia-support',
    preferenceId: 'Anemia Support',
    name: 'SHIRLEY ANEMIA SUPPORT',
    category: "Iron and Women's Nutritional Wellness",
    flavour: 'Orange Berry',
    image: '/images/product-anemia.webp',
    imageAlt: 'SHIRLEY Anemia Support box and sachet with orange berry drink',
    packagingColor: 'Original orange packaging',
    badgeText: 'IN DEVELOPMENT',
    format: '15 Sachets Per Box',
    accentBg: 'bg-[#FFF5ED]',
    accentBorder: 'hover:border-amber-600/60',
    selectedCardClass: 'border-amber-600 ring-2 ring-amber-600/25 shadow-elevated bg-white',
    selectedCheckboxClass: 'border-amber-600 bg-amber-600 text-white',
    categoryColor: 'text-amber-800',
  },
  {
    id: 'uti-support',
    preferenceId: 'UTI Support',
    name: 'SHIRLEY UTI SUPPORT',
    category: 'Urinary Tract Nutritional Wellness',
    flavour: 'Cranberry',
    image: '/images/product-uti.webp',
    imageAlt: 'SHIRLEY UTI Support box with cranberry extract drink',
    packagingColor: 'Original burgundy packaging',
    badgeText: 'IN DEVELOPMENT',
    format: '15 Sachets Per Box',
    accentBg: 'bg-[#FAF0F3]',
    accentBorder: 'hover:border-[#7A283C]/60',
    selectedCardClass: 'border-[#7A283C] ring-2 ring-[#7A283C]/25 shadow-elevated bg-white',
    selectedCheckboxClass: 'border-[#7A283C] bg-[#7A283C] text-white',
    categoryColor: 'text-[#7A283C]',
  },
];

interface ProductCatalogueProps {
  selectedProducts: string[];
  onProductsChange: (products: string[]) => void;
}

export default function ProductCatalogue({
  selectedProducts,
  onProductsChange,
}: ProductCatalogueProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleToggle = (preferenceId: string) => {
    let next: string[];
    if (selectedProducts.includes(preferenceId)) {
      next = selectedProducts.filter((id) => id !== preferenceId);
    } else {
      next = [...selectedProducts, preferenceId];
    }
    onProductsChange(next);
    if (next.length > 0) {
      setErrorMessage(null);
    }
  };

  const handlePreBookClick = () => {
    if (selectedProducts.length === 0) {
      setErrorMessage('Please select at least one SHIRLEY product to continue.');
      return;
    }

    setErrorMessage(null);
    const formElement = document.getElementById('founding-list');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedCount = selectedProducts.length;

  return (
    <section id="products" className="py-16 lg:py-24 bg-shirley-cream border-b border-shirley-blush-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shirley-blush text-shirley-berry-vibrant text-xs font-bold tracking-wider uppercase border border-shirley-blush-border">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXPLORE THE SHIRLEY COLLECTION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
            Find your kind of wellness.
          </h2>

          <p className="text-base sm:text-lg text-shirley-plum-dark/80 font-normal leading-relaxed">
            Four thoughtfully imagined products. One more approachable way to explore women&apos;s wellness.
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-medium text-shirley-plum-dark/70 bg-white/80 px-4 py-2 rounded-full border border-shirley-blush-border/40 shadow-sm">
            <Info className="w-3.5 h-3.5 text-shirley-berry-vibrant flex-shrink-0" />
            <span>Formulations in development · Free pre-booking open now · No payment required</span>
          </div>
        </div>

        {/* 2x2 Product Grid (Desktop/Tablet: 2-column grid with 2 rows. Mobile: compact responsive cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-8 mb-12">
          {CATALOGUE_PRODUCTS.map((prod) => {
            const isSelected = selectedProducts.includes(prod.preferenceId);
            return (
              <div
                key={prod.id}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => handleToggle(prod.preferenceId)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggle(prod.preferenceId);
                  }
                }}
                className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? prod.selectedCardClass
                    : `bg-white border-shirley-blush-border/70 ${prod.accentBorder} hover:shadow-card hover:-translate-y-0.5`
                }`}
              >
                <div>
                  {/* Product Visual Container */}
                  <div
                    className={`relative aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] ${prod.accentBg} overflow-hidden p-5 flex items-center justify-center transition-colors`}
                  >
                    {/* Status Pill */}
                    <div className="absolute top-3.5 left-3.5 z-10 glass-pill px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/80">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-widest text-shirley-plum-rich uppercase">
                        {prod.badgeText}
                      </span>
                    </div>

                    {/* Sachet format tag */}
                    <div className="absolute top-3.5 right-3.5 z-10 glass-pill px-3 py-1 rounded-full text-[10px] font-semibold text-shirley-plum-dark/80 shadow-sm border border-white/80">
                      {prod.format}
                    </div>

                    {/* Product Image */}
                    <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={prod.image}
                        alt={prod.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-bold tracking-wider uppercase text-[11px] sm:text-xs ${prod.categoryColor}`}>
                        {prod.category}
                      </span>
                      <span className="font-medium text-shirley-plum-dark/70 text-xs">
                        {prod.flavour}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif text-shirley-plum-rich group-hover:text-shirley-berry-vibrant transition-colors">
                      {prod.name}
                    </h3>

                    <div className="pt-0.5 flex items-center justify-between text-xs">
                      <span className="text-shirley-plum-dark/65 text-xs">
                        {prod.flavour} Powder Ritual · 5g Sachets
                      </span>
                      <Link
                        href={`/products/${prod.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-semibold text-shirley-berry-vibrant hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>Formulation</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Selection Control Bar */}
                <div className="p-4 sm:p-5 pt-0 mt-2">
                  <div
                    className={`w-full py-2.5 px-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? `${prod.accentBg} border-shirley-blush-border/80 shadow-sm`
                        : 'bg-shirley-cream/40 border-shirley-blush-border/60 group-hover:bg-shirley-cream/70 group-hover:border-shirley-blush-border'
                    }`}
                  >
                    <span className="text-xs font-semibold text-shirley-plum-rich tracking-wide">
                      Select this product
                    </span>

                    {/* Custom Checkbox */}
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        isSelected
                          ? `${prod.selectedCheckboxClass} border-transparent shadow-sm`
                          : 'border-shirley-blush-border/90 bg-white group-hover:border-shirley-plum-light/50'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Selection Indicator & Pre-Booking CTA Bar */}
        <div className="max-w-2xl mx-auto text-center space-y-4 pt-4 pb-2">
          {/* Dynamic Selection Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-shirley-blush-border shadow-sm text-xs font-bold text-shirley-plum-rich">
            <span
              className={`w-2 h-2 rounded-full ${
                selectedCount > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-shirley-plum-light/40'
              }`}
            />
            <span>
              {selectedCount === 0
                ? '0 products selected'
                : selectedCount === 1
                ? '1 product selected'
                : selectedCount === 4
                ? 'All 4 products selected'
                : `${selectedCount} products selected`}
            </span>
          </div>

          {/* Validation Error Notice if clicked with 0 selections */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-center gap-2 max-w-md mx-auto">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span className="font-semibold">{errorMessage}</span>
            </div>
          )}

          {/* Action CTA Button */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handlePreBookClick}
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover active:bg-shirley-yellow-mango text-shirley-plum-rich text-xs sm:text-sm font-bold tracking-wider uppercase shadow-glow-yellow transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-shirley-plum-rich flex-shrink-0" />
              <span>PRE-BOOK SELECTED PRODUCTS</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>

            <p className="text-xs text-shirley-plum-dark/70 font-medium">
              Free pre-booking · No payment required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
