'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { Sparkles, ArrowRight, Info, ShieldCheck } from 'lucide-react';

export default function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const flagshipProducts = PRODUCTS.slice(0, 2); // SHIRLEY PERIOD SUPPORT & SHIRLEY PCOS SUPPORT
  const pipelineProducts = PRODUCTS.slice(2, 4); // UTI & Anemia Support

  return (
    <section id="products" className="py-16 lg:py-24 bg-shirley-cream border-b border-shirley-blush-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shirley-blush/80 border border-shirley-blush-border text-xs font-semibold tracking-wider text-shirley-berry-vibrant uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE SHIRLEY PRODUCT SUITE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
            Thoughtful formulations in active development.
          </h2>

          <p className="text-base sm:text-lg text-shirley-plum-dark/80 font-normal leading-relaxed">
            Crafted as clean, pleasant powder rituals in convenient 5g sachets. No synthetic fillers, no extreme claims — just targeted nutritional support designed for her biology.
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-medium text-shirley-plum-dark/60 bg-white/80 px-4 py-2 rounded-full border border-shirley-blush-border/40 shadow-sm">
            <Info className="w-3.5 h-3.5 text-shirley-berry-vibrant flex-shrink-0" />
            <span>Currently in R&amp;D. Free early-access registration open before commercial release.</span>
          </div>
        </div>

        {/* Flagship Product Grid (SHIRLEY PERIOD SUPPORT & SHIRLEY PCOS SUPPORT) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {flagshipProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>

        {/* Future Pipeline Preview */}
        <div className="pt-12 border-t border-shirley-blush-border/50">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-shirley-plum-light uppercase">
                RESEARCH PIPELINE
              </span>
              <h3 className="text-2xl font-serif text-shirley-plum-rich mt-1">
                Future Rituals Being Explored
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-shirley-plum-dark/70 max-w-md">
              Expanding everyday nutritional solutions to address overlooked corners of female wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pipelineProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>

        {/* Responsible Notice Banner */}
        <div className="mt-16 p-6 rounded-2xl bg-white border border-shirley-blush-border/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-shirley-blush-light flex items-center justify-center text-shirley-berry-vibrant flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs text-shirley-plum-dark/80">
              <p className="font-bold text-shirley-plum-rich">Zero Fake Availability &amp; No Forced Carts</p>
              <p>We do not take commercial pre-orders until manufacturing and safety verification in India are fully finalized.</p>
            </div>
          </div>

          <Link
            href="/#founding-list"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs font-bold tracking-wider uppercase transition-colors flex-shrink-0 shadow-sm"
          >
            <span>JOIN FOR FIRST DROP UPDATES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}

