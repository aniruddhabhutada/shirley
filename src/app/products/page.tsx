'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { Sparkles, Info, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="bg-shirley-cream min-h-screen py-12 lg:py-20 border-b border-shirley-blush-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shirley-blush text-shirley-berry-vibrant text-xs font-bold tracking-wider uppercase border border-shirley-blush-border">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NUTRACEUTICAL FORMULATION SUITE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-shirley-plum-rich leading-tight">
            Our Products in Development
          </h1>

          <p className="text-base sm:text-lg text-shirley-plum-dark/80 font-normal leading-relaxed">
            Formulated as refreshing daily drink sachets designed around women&apos;s biological phases and nutritional requirements.
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-medium text-shirley-plum-dark/70 bg-white/80 px-4 py-2 rounded-full border border-shirley-blush-border/40 shadow-sm">
            <Info className="w-3.5 h-3.5 text-shirley-berry-vibrant flex-shrink-0" />
            <span>No commercial orders accepted yet. Join the free Founding List for early access.</span>
          </div>
        </div>

        {/* Flagship Products */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-shirley-blush-border/40">
            <div>
              <h2 className="text-2xl font-serif text-shirley-plum-rich">
                Inaugural Drop Formulations
              </h2>
              <p className="text-xs text-shirley-plum-dark/60">
                Primary focus of our initial production run in India.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {PRODUCTS.slice(0, 2).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>

        {/* Research Pipeline */}
        <div className="space-y-6 pt-10 border-t border-shirley-blush-border/50">
          <div className="flex items-center justify-between pb-3 border-b border-shirley-blush-border/40">
            <div>
              <h2 className="text-2xl font-serif text-shirley-plum-rich">
                Pipeline Formulations
              </h2>
              <p className="text-xs text-shirley-plum-dark/60">
                Future rituals currently undergoing sensory and stability evaluation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.slice(2, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>

        {/* Responsible Pre-Launch Notice */}
        <div className="bg-white rounded-3xl p-8 border border-shirley-blush-border/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-shirley-blush-light flex items-center justify-center text-shirley-berry-vibrant flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs text-shirley-plum-dark/80 space-y-1">
              <p className="font-bold text-shirley-plum-rich text-sm">
                Authentic Pre-Launch Philosophy
              </p>
              <p>
                We do not collect payments, show fake stock counts, or manufacture false urgency. All products will launch only after full FSSAI testing and quality assurance in India.
              </p>
            </div>
          </div>

          <Link
            href="/#founding-list"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs font-bold tracking-wider uppercase transition-colors shadow-glow-yellow flex-shrink-0"
          >
            <span>JOIN THE FOUNDING LIST</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

