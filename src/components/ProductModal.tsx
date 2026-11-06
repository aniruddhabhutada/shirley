'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import ProductVideoPlayer from './ProductVideoPlayer';
import { X, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Package, Droplet, Layers } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-shirley-plum-dark/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-shirley-blush-border/50 max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-shirley-blush text-shirley-plum-rich flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Top Grid: Image + Core Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className={`md:col-span-5 ${product.bgPastel} rounded-2xl p-6 relative aspect-square flex items-center justify-center shadow-inner`}>
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>
              <div className="absolute top-3 left-3 glass-pill px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-shirley-plum-rich uppercase">
                {product.status}
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold tracking-widest uppercase text-shirley-berry-vibrant">
                  {product.category}
                </span>
                <h3 id="modal-headline" className="text-3xl font-serif text-shirley-plum-rich">
                  {product.name}
                </h3>
                <p className="text-sm font-medium text-shirley-plum-dark/70">
                  {product.flavour} · {product.format}
                </p>
              </div>

              <p className="text-sm sm:text-base text-shirley-plum-dark/85 leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-shirley-cream-warm p-3 rounded-xl border border-shirley-blush-border/40">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-shirley-plum-rich uppercase">
                    <Package className="w-3.5 h-3.5 text-shirley-berry-vibrant" />
                    <span>Format</span>
                  </div>
                  <p className="text-xs text-shirley-plum-dark/80 mt-0.5">{product.sachetCount}</p>
                </div>

                <div className="bg-shirley-cream-warm p-3 rounded-xl border border-shirley-blush-border/40">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-shirley-plum-rich uppercase">
                    <Droplet className="w-3.5 h-3.5 text-shirley-berry-vibrant" />
                    <span>Serving Size</span>
                  </div>
                  <p className="text-xs text-shirley-plum-dark/80 mt-0.5">{product.netWeight}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Proposed Ingredients Under Development */}
          <div className="space-y-4 pt-4 border-t border-shirley-blush-border/40">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-serif text-shirley-plum-rich">
                  Proposed Formulation Compounds
                </h4>
                <p className="text-xs text-shirley-berry-vibrant font-semibold tracking-wider uppercase">
                  INGREDIENTS UNDER DEVELOPMENT · SUBJECT TO SCIENTIFIC REVIEW
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.proposedIngredients.map((ing, i) => (
                <div
                  key={i}
                  className="bg-shirley-cream/60 p-4 rounded-2xl border border-shirley-blush-border/40 space-y-1.5"
                >
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-shirley-berry-vibrant flex-shrink-0" />
                    <span className="text-xs font-bold text-shirley-plum-rich">{ing.name}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-shirley-berry-vibrant">
                    Role: {ing.role}
                  </p>
                  <p className="text-xs text-shirley-plum-dark/75 leading-relaxed">
                    {ing.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Formulation highlights */}
          <div className="space-y-3 pt-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-shirley-plum-rich">
              R&amp;D Standards &amp; Principles
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-shirley-plum-dark/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Promotional Video Ad Feature */}
          {product.videoUrl && (
            <div className="space-y-4 pt-6 border-t border-shirley-blush-border/40">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-bold tracking-widest text-shirley-berry-vibrant uppercase bg-shirley-blush px-3 py-1 rounded-full">
                  OFFICIAL AD FILM
                </span>
                <h4 className="text-xl font-serif text-shirley-plum-rich mt-2">
                  Watch {product.name} in Motion
                </h4>
                <p className="text-xs text-shirley-plum-dark/70">
                  Tap below to experience the morning unboxing and sachet ritual.
                </p>
              </div>

              <div className="flex justify-center pt-2">
                <ProductVideoPlayer
                  src={product.videoUrl}
                  poster={product.videoPoster}
                  title={product.name}
                  badge="RITUAL AD"
                />
              </div>
            </div>
          )}

          {/* Responsible Non-Medical Disclaimer */}
          <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900/90 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Responsible Pre-Launch Notice: </span>
              {product.disclaimer}
            </div>
          </div>

          {/* Modal Action CTA */}
          <div className="pt-4 border-t border-shirley-blush-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-shirley-plum-dark/70 text-center sm:text-left">
              Want first access when this formulation drops?
            </div>

            <Link
              href="/#founding-list"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs font-bold tracking-wider uppercase shadow-glow-yellow transition-all"
            >
              <span>JOIN FOUNDING LIST FOR EARLY ACCESS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

