'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import EarlyAccessForm from '@/components/EarlyAccessForm';
import FAQAccordion from '@/components/FAQAccordion';

export default function HomePage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Check URL parameters for product preselection (e.g. ?product=PCOS+Support)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const productParam = params.get('product') || params.get('prebook');
      if (productParam) {
        const lower = productParam.trim().toLowerCase();
        let matchedId: string | null = null;
        if (lower === 'pcos support' || lower.includes('pcos') || lower === 'inosia') {
          matchedId = 'PCOS Support';
        } else if (lower === 'period support' || lower.includes('period') || lower === 'cycora') {
          matchedId = 'Period Support';
        } else if (lower === 'uti support' || lower.includes('uti')) {
          matchedId = 'UTI Support';
        } else if (lower === 'anemia support' || lower.includes('anemia')) {
          matchedId = 'Anemia Support';
        }
        if (matchedId) {
          setSelectedProducts([matchedId]);
        }
      }
    }
  }, []);

  const handleToggleProduct = (preferenceId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(preferenceId)
        ? prev.filter((id) => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  return (
    <>
      <HeroSection />
      <ProductShowcase
        selectedProducts={selectedProducts}
        onToggleProduct={handleToggleProduct}
      />
      <EarlyAccessForm
        selectedProducts={selectedProducts}
        onToggleProduct={handleToggleProduct}
      />
      <FAQAccordion />
    </>
  );
}
