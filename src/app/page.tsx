'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import BrandIntroduction from '@/components/BrandIntroduction';
import WellnessStory from '@/components/WellnessStory';
import ProductShowcase from '@/components/ProductShowcase';
import ProductVideoSpotlight from '@/components/ProductVideoSpotlight';
import WhyShirley from '@/components/WhyShirley';
import BrandStory from '@/components/BrandStory';
import EarlyAccessForm from '@/components/EarlyAccessForm';
import FAQAccordion from '@/components/FAQAccordion';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandIntroduction />
      <WellnessStory />
      <ProductShowcase />
      <ProductVideoSpotlight />
      <WhyShirley />
      <BrandStory />
      <EarlyAccessForm />
      <FAQAccordion />
    </>
  );
}
