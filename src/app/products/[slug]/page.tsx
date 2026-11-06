import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import ProductVideoPlayer from '@/components/ProductVideoPlayer';
import { ArrowLeft, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Package, Droplet, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.id === params.slug);
  if (!product) return { title: 'Product Not Found | SHIRLEY' };

  return {
    title: `${product.name} | SHIRLEY Wellness`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | SHIRLEY Wellness`,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = PRODUCTS.find((p) => p.id === params.slug);
  if (!product) notFound();

  return (
    <div className="bg-shirley-cream min-h-screen py-12 lg:py-20 border-b border-shirley-blush-border/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-shirley-plum-rich hover:text-shirley-berry-vibrant uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ALL PRODUCTS</span>
        </Link>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className={`relative aspect-square ${product.bgPastel} rounded-3xl p-8 overflow-hidden shadow-elevated border border-shirley-blush-border/60`}>
              <div className="absolute top-4 left-4 z-10 glass-pill px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-shirley-plum-rich uppercase">
                {product.status}
              </div>
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  priority
                  className="object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-shirley-blush text-shirley-berry-vibrant text-xs font-bold tracking-wider uppercase border border-shirley-blush-border">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{product.category}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
                {product.name}
              </h1>
              <p className="text-sm font-semibold text-shirley-plum-light">
                {product.flavour} · {product.format}
              </p>
            </div>

            <p className="text-base text-shirley-plum-dark/85 leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Spec Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-shirley-blush-border/50 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-shirley-plum-rich uppercase">
                  <Package className="w-4 h-4 text-shirley-berry-vibrant" />
                  <span>Retail Packaging</span>
                </div>
                <p className="text-xs text-shirley-plum-dark/80 mt-1">{product.sachetCount}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-shirley-blush-border/50 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-shirley-plum-rich uppercase">
                  <Droplet className="w-4 h-4 text-shirley-berry-vibrant" />
                  <span>Serving Size</span>
                </div>
                <p className="text-xs text-shirley-plum-dark/80 mt-1">{product.netWeight}</p>
              </div>
            </div>

            {/* Direct Early Access CTA */}
            <div className="pt-2">
              <Link
                href="/#founding-list"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs sm:text-sm font-bold tracking-wider uppercase shadow-glow-yellow transition-all"
              >
                <span>JOIN FOUNDING LIST FOR FIRST DROP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Video Ad Section */}
        {product.videoUrl && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-shirley-blush-border/60 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <span className="text-[10px] font-bold tracking-widest text-shirley-berry-vibrant uppercase bg-shirley-blush px-3 py-1 rounded-full">
                  OFFICIAL AD FILM
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-shirley-plum-rich">
                  Experience {product.name}
                </h2>
                <p className="text-sm text-shirley-plum-dark/80 leading-relaxed">
                  Watch the daily sachet ritual unfold. Formulated for seamless 15-second dissolving in cold water with refreshing taste and bioavailable nutrition.
                </p>
                <div className="space-y-2 pt-2">
                  {product.keyHighlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-shirley-plum-dark/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 flex justify-center">
                <ProductVideoPlayer
                  src={product.videoUrl}
                  poster={product.videoPoster}
                  title={product.name}
                  badge="PROMO AD"
                />
              </div>
            </div>
          </div>
        )}

        {/* Responsible Non-Medical Notice */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Responsible Formulation Notice: </strong>
            {product.disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
}
