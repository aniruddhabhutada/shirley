'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { Sparkles, ArrowRight, Clock, CheckCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div className="card-luxury rounded-3xl overflow-hidden flex flex-col justify-between group bg-white border border-shirley-blush-border/40">
      <div>
        {/* Product Visual Area */}
        <div className={`relative aspect-[4/5] ${product.bgPastel} overflow-hidden p-6 flex items-center justify-center`}>
          {/* Status Badge */}
          <div className="absolute top-4 left-4 z-10 glass-pill px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/80">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-shirley-plum-rich uppercase">
              {product.status}
            </span>
          </div>

          {/* Sachet format tag */}
          <div className="absolute top-4 right-4 z-10 glass-pill px-3 py-1 rounded-full text-[10px] font-semibold text-shirley-plum-dark/80 shadow-sm border border-white/80">
            {product.sachetCount}
          </div>

          {/* Actual high-res product photo */}
          <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-105">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="p-6 sm:p-7 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold tracking-wider uppercase text-shirley-berry-vibrant">
              {product.category}
            </span>
            <span className="font-medium text-shirley-plum-dark/60">
              {product.flavour}
            </span>
          </div>

          <h3 className="text-2xl font-serif text-shirley-plum-rich group-hover:text-shirley-berry-vibrant transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-shirley-plum-dark/75 leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="pt-2 flex flex-wrap gap-1.5">
            {product.keyHighlights.slice(0, 2).map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-shirley-cream-warm text-shirley-plum-rich border border-shirley-blush-border/50"
              >
                <CheckCircle className="w-3 h-3 text-shirley-berry-vibrant" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-6 pt-0 border-t border-shirley-blush-border/30 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-shirley-plum-dark/60">
          <Clock className="w-3.5 h-3.5 text-shirley-berry-vibrant" />
          <span>Pre-Launch</span>
        </div>

        <button
          onClick={() => onSelect(product)}
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-shirley-blush-light hover:bg-shirley-yellow-mango text-shirley-plum-rich text-xs font-bold tracking-wider uppercase transition-all duration-200 group/btn"
        >
          <span>DISCOVER THE PRODUCT</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

