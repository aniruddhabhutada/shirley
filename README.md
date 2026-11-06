# SHIRLEY — Wellness for Her

> **A premium, modern women's wellness D2C experience & founding member platform built for India.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-plum.svg)](LICENSE)

---

## 🌸 Brand Overview

**SHIRLEY** is an upcoming modern women’s wellness brand in India created to demystify menstrual comfort, hormonal balance, and everyday nutrition. Designed for Gen Z and young working women (ages 18–30), SHIRLEY bridges the gap between clinically validated nutrition and approachable, vibrant daily self-care rituals.

- **Tagline:** *"Meet Shirley — Wellness for Her."*
- **Primary Focus Areas:**
  - Menstrual cycle comfort and luteal phase support
  - PCOS / PCOD nutritional wellness and insulin sensitivity
  - Transparent, stigma-free hormonal education
- **Official Brand Inquiries:** [helloshirleywellness@gmail.com](mailto:helloshirleywellness@gmail.com)

---

## ✨ Features & Architecture

### 1. 🛍️ Product Experience
- **SHIRLEY PERIOD SUPPORT (Formula 01):** Targeted menstrual wellness drink mix formulated with bioavailable magnesium bisglycinate, vitamin B6, and cycle-supportive botanicals. Delicious natural strawberry lemonade flavor.
- **SHIRLEY PCOS SUPPORT (Formula 02):** Hormonal harmony blend featuring 40:1 Myo-Inositol to D-Chiro-Inositol, Chromium Picolinate, and active folate. Crisp peach iced tea flavor.
- **Interactive Quick-View Modals:** Seamless modal views with ingredient spotlights, nutritional facts, formulation disclaimers, and direct registration CTAs.
- **Dedicated Product Pages:** SEO-rich dynamic routes at `/products/cycora` and `/products/inosia`.

### 2. 🎬 Vertical Video Advertising (9:16)
- **Built-in Mobile Story Players:** Custom video player designed for 9:16 aspect ratio vertical reels/stories.
- **Player Controls:** Play/pause overlay, mute/unmute toggle, playback progress bar, replay icon, and high-res poster frames.
- **Performance Optimized:** Uses `preload="metadata"` to conserve mobile bandwidth until the user initiates interaction.

### 3. 🎟️ Founding Member Pass & Shareable Cards
- **1080×1920 Instagram Story Cards:** Renders pixel-perfect, high-resolution story cards with the member's name, unique membership number (e.g. `#104`), referral code, and custom visual styling.
- **One-Click Download & Sharing:** Built with `html-to-image` for high-fidelity client-side PNG export, copyable referral links, and native mobile Web Share API integration.
- **Celebratory Confetti:** Triggers festive canvas confetti animations upon successful registration.

### 4. 🔗 Referral & Attribution Engine
- **Unique Referral Codes:** Each founding member receives a distinct referral token (e.g. `SHIRLEY-5E9FD0`).
- **Attribution Tracking:** Automatic referral credit attribution with live referral count tracking.
- **UTM Parameter Capture:** Records `utm_source`, `utm_medium`, and `utm_campaign` for marketing attribution.

### 5. 📚 Editorial Journal & Education
- **Research-Backed Articles:** Evidence-informed wellness guides on magnesium bisglycinate, inositol ratios, and cycle tracking.
- **Clean Editorial Design:** Typographic hierarchy with Fraunces serif display and DM Sans body typography.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS with custom design tokens (Deep Berry `#65344F`, Vibrant Berry `#C84B83`, Soft Blush `#F8DDE5`, Mango Yellow `#FFD65A`)
- **Icons:** Lucide React + Bespoke Hand-Crafted SVGs (Shirley Flower & Outline Icons)
- **Image Generation:** `html-to-image` for high-resolution client-side canvas rasterization
- **Animations:** Canvas Confetti + CSS keyframe transitions
- **Persistence:** Local atomic JSON datastore (`src/lib/db.ts`) with temporary file write guarantees

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or later
- npm or yarn or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aniruddhabhutada/shirley.git
   cd shirley
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 Deploying to Netlify

This website is pre-configured for zero-config deployment on Netlify using the Next.js Runtime v5 (`@netlify/plugin-nextjs`) and edge caching.

### Step-by-Step Netlify Deployment:
1. Log in to [Netlify](https://app.netlify.com) and select **"Add new site"** → **"Import an existing project"**.
2. Connect your GitHub account and select repository: **`aniruddhabhutada/shirley`**.
3. Netlify reads [`netlify.toml`](./netlify.toml) automatically:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Plugin:** `@netlify/plugin-nextjs`
   - **Node.js Version:** `20`
4. Click **"Deploy shirley"**.
5. Your production site will be live on your custom `.netlify.app` domain (or custom domain).

---

## 🧪 Testing

A comprehensive automated test suite validates the registration flow, duplicate handling, input validation, referral tracking, and page status codes:

```bash
python test_shirley.py
```

---

## 📁 Project Structure

```
shirley/
├── assist/                # Source branding & media assets
├── data/
│   └── registrations.json # Datastore for founding members & referrals
├── public/
│   ├── images/            # High-res product renders & brand logos
│   └── videos/            # 9:16 vertical video ads & poster frames
├── src/
│   ├── app/
│   │   ├── api/           # API routes (register, member, referral)
│   │   ├── founding-member/ # Founding member dynamic card page
│   │   ├── journal/       # Wellness editorial articles
│   │   ├── our-story/     # Brand mission & philosophy
│   │   ├── privacy/       # Privacy policy
│   │   ├── products/      # Catalog & individual product routes
│   │   ├── terms/         # Terms of service
│   │   ├── globals.css    # Design tokens & typography
│   │   ├── layout.tsx     # Root layout with font optimization & SEO metadata
│   │   ├── page.tsx       # Homepage
│   │   ├── robots.ts      # Search engine crawler rules
│   │   └── sitemap.ts     # Automated XML sitemap
│   ├── components/        # Reusable UI components & video players
│   ├── data/              # Static product definitions & articles
│   └── lib/               # Database persistence & TypeScript types
├── tailwind.config.ts     # Design tokens & responsive breakpoints
├── tsconfig.json          # TypeScript compiler configuration
└── package.json           # Dependencies & scripts
```

---

## 💌 Contact & Community

- **Brand:** SHIRLEY
- **Email:** [helloshirleywellness@gmail.com](mailto:helloshirleywellness@gmail.com)
- **Target Launch:** Coming Soon to India 🇮🇳

---

© 2026 SHIRLEY Wellness. All rights reserved.

