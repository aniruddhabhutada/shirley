'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { RegistrationResult } from '@/lib/types';

function EarlyAccessFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [productInterest, setProductInterest] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  const [referrerCode, setReferrerCode] = useState<string | null>(null);
  const [referrerName, setReferrerName] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const PRODUCT_PREFERENCES = [
    {
      id: 'PCOS Support',
      name: 'PCOS SUPPORT',
      description: 'Nutritional wellness support for women with PCOS.',
      accentBorder: 'hover:border-shirley-lavender',
      selectedBg: 'bg-shirley-lavender-light/50 border-shirley-plum-rich ring-1 ring-shirley-plum-rich/20',
      selectedRadio: 'border-shirley-plum-rich bg-shirley-plum-rich',
    },
    {
      id: 'Period Support',
      name: 'PERIOD SUPPORT',
      description: 'A magnesium-based menstrual wellness drink.',
      accentBorder: 'hover:border-shirley-berry-vibrant',
      selectedBg: 'bg-shirley-blush-light/60 border-shirley-berry-vibrant ring-1 ring-shirley-berry-vibrant/20',
      selectedRadio: 'border-shirley-berry-vibrant bg-shirley-berry-vibrant',
    },
    {
      id: 'UTI Support',
      name: 'UTI SUPPORT',
      description: 'A nutritional wellness product focused on urinary tract health.',
      accentBorder: 'hover:border-rose-400',
      selectedBg: 'bg-rose-50/60 border-shirley-plum-deep ring-1 ring-shirley-plum-deep/20',
      selectedRadio: 'border-shirley-plum-deep bg-shirley-plum-deep',
    },
    {
      id: 'Anemia Support',
      name: 'ANEMIA SUPPORT',
      description: "Nutritional support focused on iron and women's wellness.",
      accentBorder: 'hover:border-amber-400',
      selectedBg: 'bg-shirley-peach-light/60 border-amber-700 ring-1 ring-amber-700/20',
      selectedRadio: 'border-amber-700 bg-amber-700',
    },
  ];

  const handleSelectProduct = (optionId: string) => {
    const nextValue = productInterest === optionId ? null : optionId;
    setProductInterest(nextValue);

    // Track analytics event without personal details
    if (nextValue && typeof window !== 'undefined' && (window as any).dataLayer) {
      try {
        (window as any).dataLayer.push({
          event: 'product_interest_selected',
          product_interest: nextValue,
        });
      } catch {}
    }
  };

  // Check URL parameters for referral code & UTMs
  useEffect(() => {
    const ref = searchParams?.get('ref');
    if (ref) {
      setReferrerCode(ref);
      // Fetch referrer name for warm welcome
      fetch(`/api/referral/${encodeURIComponent(ref)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.valid && data.referrerFirstName) {
            setReferrerName(data.referrerFirstName);
          }
        })
        .catch(() => {});
    }
  }, [searchParams]);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (at least 2 letters).';
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (phone.trim()) {
      const clean = phone.replace(/[\s\-\(\)]/g, '');
      if (!/^[0-9]{8,14}$/.test(clean)) {
        errs.phone = 'Please enter a valid 10-digit mobile number.';
      }
    }

    if (!consent) {
      errs.consent = 'Please check this box to receive early-access updates from SHIRLEY.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const fullPhone = phone.trim() ? `${countryCode} ${phone.trim()}` : undefined;

      const payload = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: fullPhone,
        product_interest: productInterest || null,
        consent,
        referredBy: referrerCode || undefined,
        utmSource: searchParams?.get('utm_source') || undefined,
        utmMedium: searchParams?.get('utm_medium') || undefined,
        utmCampaign: searchParams?.get('utm_campaign') || undefined,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data: RegistrationResult = await res.json();

      if (!res.ok || !data.success || !data.member) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(data.message || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }

      // Success! Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C84B83', '#FFD65A', '#65344F', '#C5B5F0'],
        });
      } catch {}

      // Store member info in sessionStorage for instant hydration and navigate
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('shirley_member', JSON.stringify(data.member));
      }

      // Redirect to dedicated Founding Member success page
      router.push(`/founding-member/${data.member.id}`);
    } catch (err) {
      console.error('Registration failed:', err);
      setServerError('Unable to reach server. Please check your internet connection and try again.');
      setLoading(false);
    }
  };

  return (
    <section id="founding-list" className="py-16 lg:py-24 bg-shirley-cream relative overflow-hidden">
      {/* Background ambient accents */}
      <div
        className="hidden sm:block absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-shirley-blush/60 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hidden sm:block absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-shirley-peach/50 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Form Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 lg:p-14 border border-shirley-blush-border/60 shadow-elevated">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shirley-blush text-shirley-berry-vibrant text-xs font-bold tracking-wider uppercase border border-shirley-blush-border">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE SHIRLEY FOUNDING LIST</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-shirley-plum-rich leading-tight">
              Be part of the beginning.
            </h2>

            <p className="text-base text-shirley-plum-dark/80 font-normal leading-relaxed">
              Something new is taking shape in women&apos;s wellness. Join the SHIRLEY Founding List and be among the first to hear about our journey, upcoming products, and early-access announcements.
            </p>

            {/* Referrer attribution badge if coming from a friend's link */}
            {referrerCode && (
              <div className="p-3 rounded-2xl bg-shirley-blush-light border border-shirley-berry-vibrant/30 inline-flex items-center gap-2 text-xs text-shirley-plum-rich font-medium">
                <CheckCircle2 className="w-4 h-4 text-shirley-berry-vibrant flex-shrink-0" />
                <span>
                  {referrerName
                    ? `You are joining through ${referrerName}'s Founding Member invitation!`
                    : `You are joining with invitation code: ${referrerCode}`}
                </span>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6 max-w-xl mx-auto">
            {serverError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-shirley-plum-rich">
                Full Name <span className="text-shirley-berry-vibrant">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                placeholder="e.g. Ananya Sharma"
                className={`w-full px-4 py-3.5 rounded-2xl border text-sm text-shirley-plum-dark bg-shirley-cream/40 focus:outline-none focus:ring-2 focus:ring-shirley-berry-vibrant/30 transition-all ${
                  errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-shirley-blush-border/80'
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-shirley-plum-rich">
                Email Address <span className="text-shirley-berry-vibrant">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="ananya@example.com"
                className={`w-full px-4 py-3.5 rounded-2xl border text-sm text-shirley-plum-dark bg-shirley-cream/40 focus:outline-none focus:ring-2 focus:ring-shirley-berry-vibrant/30 transition-all ${
                  errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-shirley-blush-border/80'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* WhatsApp Number (Optional) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-shirley-plum-rich">
                  WhatsApp Number <span className="text-xs font-normal text-shirley-plum-dark/60 lowercase">(optional for launch drops)</span>
                </label>
              </div>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-28 flex-shrink-0 px-2.5 py-3.5 rounded-2xl border border-shirley-blush-border/80 text-xs font-semibold text-shirley-plum-rich bg-shirley-cream/40 focus:outline-none"
                  aria-label="Country Code"
                >
                  <option value="+91">+91 (IN)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+971">+971 (AE)</option>
                  <option value="+65">+65 (SG)</option>
                  <option value="+61">+61 (AU)</option>
                </select>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="98765 43210"
                  className={`min-w-0 flex-1 px-4 py-3.5 rounded-2xl border text-sm text-shirley-plum-dark bg-shirley-cream/40 focus:outline-none focus:ring-2 focus:ring-shirley-berry-vibrant/30 transition-all ${
                    errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-shirley-blush-border/80'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.phone}</span>
                </p>
              )}
              <p className="text-[11px] text-shirley-plum-dark/60">
                We will only message you regarding product launch milestones. No spam or daily pings.
              </p>
            </div>

            {/* Question 4: Product Preference (Optional) */}
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-shirley-plum-rich">
                    Which SHIRLEY product are you most excited to try?
                  </label>
                  <span className="text-[11px] font-normal text-shirley-plum-dark/60 lowercase">
                    (optional)
                  </span>
                </div>
                <p className="text-xs text-shirley-plum-dark/75">
                  Choose your favourite. We&apos;d love to know!
                </p>
              </div>

              {/* 2x2 Grid on Desktop / Tablet, 1-col on Mobile */}
              <div
                role="radiogroup"
                aria-label="Which SHIRLEY product are you most excited to try?"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1"
              >
                {PRODUCT_PREFERENCES.map((opt) => {
                  const isSelected = productInterest === opt.id;
                  return (
                    <div
                      key={opt.id}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => handleSelectProduct(opt.id)}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          handleSelectProduct(opt.id);
                        }
                      }}
                      className={`relative rounded-2xl p-4 border text-left transition-all duration-200 cursor-pointer select-none ${
                        isSelected
                          ? opt.selectedBg
                          : `bg-white border-shirley-blush-border/70 ${opt.accentBorder} hover:shadow-sm hover:bg-shirley-cream/50`
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 pr-1">
                          <h4 className="font-serif text-sm font-semibold tracking-wide text-shirley-plum-rich">
                            {opt.name}
                          </h4>
                          <p className="text-xs text-shirley-plum-dark/75 leading-relaxed">
                            {opt.description}
                          </p>
                        </div>

                        {/* Attractive Radio Selection Indicator */}
                        <div
                          className={`w-4 h-4 rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                            isSelected
                              ? `${opt.selectedRadio} border-transparent`
                              : 'border-shirley-blush-border bg-white'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Optional clear button when a choice is active */}
              {productInterest && (
                <div className="flex justify-end pt-0.5">
                  <button
                    type="button"
                    onClick={() => setProductInterest(null)}
                    className="text-[11px] text-shirley-plum-dark/60 hover:text-shirley-berry-vibrant transition-colors underline"
                  >
                    Clear selection
                  </button>
                </div>
              )}
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (errors.consent) setErrors({ ...errors, consent: '' });
                  }}
                  className="mt-1 w-4 h-4 rounded border-shirley-blush-border text-shirley-berry-vibrant focus:ring-shirley-berry-vibrant/30 cursor-pointer"
                />
                <span className="text-xs text-shirley-plum-dark/80 leading-relaxed">
                  I agree to receive SHIRLEY early-access updates and understand how my information will be used as explained in the{' '}
                  <Link href="/privacy" className="text-shirley-berry-vibrant underline font-medium hover:text-shirley-plum-rich">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1.5 ml-7">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>{errors.consent}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-shirley-yellow-mango hover:bg-shirley-yellow-hover text-shirley-plum-rich text-xs sm:text-sm font-bold tracking-wider uppercase shadow-glow-yellow transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-shirley-plum-rich" />
                    <span>SECURING YOUR FOUNDING SPOT...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-shirley-plum-rich" />
                    <span>JOIN THE FOUNDING LIST</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-xs text-shirley-plum-dark/60 font-medium">
                  Free to join. No purchase required. No credit card collected.
                </p>
              </div>
            </div>

            {/* Privacy Promise Banner */}
            <div className="pt-4 border-t border-shirley-blush-border/40 flex items-center justify-center gap-2 text-xs text-shirley-plum-dark/70">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Your contact details are strictly confidential and never sold.</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function EarlyAccessForm() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-shirley-plum-rich">Loading registration...</div>}>
      <EarlyAccessFormInner />
    </Suspense>
  );
}

