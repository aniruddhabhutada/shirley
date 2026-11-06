'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: 'What is SHIRLEY?',
    answer:
      'SHIRLEY is an upcoming Indian women’s wellness brand creating thoughtful, science-informed nutritional rituals. We focus on menstrual wellness, hormonal balance education, and everyday nutritional support tailored to young women, making health approachable, transparent, and stigma-free.',
  },
  {
    question: 'Are SHIRLEY products available yet?',
    answer:
      'Not yet. SHIRLEY products are currently in active formulation research, stability testing, and regulatory alignment in India. We are currently inviting women to join our free Founding List before our inaugural drop becomes commercially available.',
  },
  {
    question: 'What is the Founding List?',
    answer:
      'The Founding List is our free pre-launch community. By joining, you secure priority access to our very first product batch, exclusive development updates, behind-the-scenes formulation insights, and private community invitations.',
  },
  {
    question: 'Is joining the Founding List free?',
    answer:
      'Yes, 100% free. There are no registration fees, no payment details collected, and no obligation to purchase anything when products launch.',
  },
  {
    question: 'What is a Founding Member?',
    answer:
      'A Founding Member is someone who joins our early-access community during our formative pre-launch phase. Each member receives a unique member verification number, an Instagram Story-ready invitation card, and personal referral privileges.',
  },
  {
    question: 'When will SHIRLEY PERIOD SUPPORT launch?',
    answer:
      'SHIRLEY PERIOD SUPPORT is currently undergoing formulation development and sensory testing in India. Rather than rushing an unverified product, we are taking the time to ensure optimal taste, bioavailable ingredient stability, and complete regulatory compliance. Founding List members will receive first notification as soon as launch dates are finalized.',
  },
  {
    question: 'What is SHIRLEY PCOS SUPPORT?',
    answer:
      'SHIRLEY PCOS SUPPORT is an investigational nutritional supplement concept being developed for women interested in supporting their broader PCOS wellness routines. It is built around Myo-Inositol, D-Chiro Inositol, active folate, and gut-supportive probiotics in a daily blueberry lemonade sachet drink.',
  },
  {
    question: 'Can SHIRLEY products treat PCOS?',
    answer:
      'No. SHIRLEY products are dietary supplements designed to provide targeted nutritional support; they do not diagnose, treat, reverse, or cure PCOS/PCOD or any other medical condition. We encourage every woman to consult qualified healthcare providers for diagnosis and comprehensive medical management.',
  },
  {
    question: 'How can I receive launch updates?',
    answer:
      'By registering your name and email on our Founding List. You may also provide an optional WhatsApp number if you prefer direct, concise drop alerts when early-access spots open.',
  },
  {
    question: 'How can I contact SHIRLEY?',
    answer:
      'You can reach our team directly via our official brand email at helloshirleywellness@gmail.com or connect with our early community on Instagram @shirleywellness. We read every thoughtful message, feedback, and question.',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-shirley-cream border-b border-shirley-blush-border/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shirley-blush text-shirley-berry-vibrant text-xs font-bold tracking-wider uppercase border border-shirley-blush-border">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>COMMON QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-base text-shirley-plum-dark/80 max-w-xl mx-auto font-normal leading-relaxed">
            Everything you need to know about SHIRLEY, our upcoming formulations, and the Founding Member experience.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-shirley-blush-border/60 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-serif font-medium text-shirley-plum-rich">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-shirley-berry-vibrant text-white'
                        : 'bg-shirley-blush text-shirley-plum-rich'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-shirley-plum-dark/80 leading-relaxed border-t border-shirley-blush-border/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

