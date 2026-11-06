import type { Metadata, Viewport } from 'next';
import './globals.css';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://shirleywellness.com'),
  title: "SHIRLEY | Women's Wellness, Thoughtfully Reimagined",
  description:
    "Discover SHIRLEY, an upcoming women's wellness brand focused on menstrual wellness, nutritional support, and everyday wellbeing. Join the free early-access list.",
  keywords: [
    "Shirley Wellness",
    "Women's Wellness India",
    "Menstrual Wellness",
    "PCOS Support",
    "Shirley Period Support",
    "Shirley PCOS Support",
    "Hormonal Health",
    "Nutritional Supplements",
  ],
  authors: [{ name: "SHIRLEY Wellness" }],
  creator: "SHIRLEY Wellness",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shirleywellness.com",
    siteName: "SHIRLEY Wellness",
    title: "SHIRLEY | Women's Wellness, Thoughtfully Reimagined",
    description:
      "A new era of women's wellness is on the way. Meet Shirley — thoughtfully formulated menstrual and hormonal wellness rituals for Indian women.",
    images: [
      {
        url: "/images/product-cycora.png",
        width: 1145,
        height: 1374,
        alt: "SHIRLEY Women's Wellness Formulation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIRLEY | Women's Wellness, Thoughtfully Reimagined",
    description: "Meet SHIRLEY. A fresh approach to everyday women's wellness, thoughtfully designed around her needs.",
    images: ["/images/product-cycora.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/shirley-logo-trans.png",
    apple: "/images/shirley-logo-trans.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#452039",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-shirley-cream text-shirley-plum-dark">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

