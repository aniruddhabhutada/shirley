'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import EarlyAccessForm from '@/components/EarlyAccessForm';
import FAQAccordion from '@/components/FAQAccordion';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductShowcase />
      <EarlyAccessForm />
      <FAQAccordion />
    </>
  );
}
