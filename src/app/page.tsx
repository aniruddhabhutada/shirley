'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ProductCatalogue from '@/components/ProductCatalogue';
import EarlyAccessForm from '@/components/EarlyAccessForm';
import FAQAccordion from '@/components/FAQAccordion';

export default function HomePage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  return (
    <>
      <HeroSection />
      <ProductCatalogue
        selectedProducts={selectedProducts}
        onProductsChange={setSelectedProducts}
      />
      <EarlyAccessForm
        selectedProducts={selectedProducts}
        onProductsChange={setSelectedProducts}
      />
      <FAQAccordion />
    </>
  );
}
