import React from 'react';
import FAQAccordion from '@/components/FAQAccordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | SHIRLEY Wellness',
  description:
    'Answers to common questions regarding SHIRLEY women’s wellness formulations, the free Founding List, and launch timelines in India.',
};

export default function FAQPage() {
  return (
    <div className="bg-shirley-cream min-h-screen py-8">
      <FAQAccordion />
    </div>
  );
}

