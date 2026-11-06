'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import BrandIntroduction from '@/components/BrandIntroduction';
import ProductShowcase from '@/components/ProductShowcase';
import WhyShirley from '@/components/WhyShirley';
import EarlyAccessForm from '@/components/EarlyAccessForm';
import FAQAccordion from '@/components/FAQAccordion';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandIntroduction />
      <ProductShowcase />
      <WhyShirley />
      <EarlyAccessForm />
      <FAQAccordion />
    </>
  );
}
