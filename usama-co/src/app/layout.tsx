import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Usama & Co',
    default: 'Usama & Co | Premium Wholesale Trading & Products',
  },
  description: 'Global trading expertise in luxury footwear, leather goods, painting products, and lighting solutions. Professional wholesale and retail distribution for international markets.',
  keywords: ['wholesale trading', 'leather goods', 'luxury footwear', 'Agra traders', 'Qhibtiya shoes', 'bulk supply', 'leather exports', 'premium lighting'],
  authors: [{ name: 'Usama & Co' }],
  metadataBase: new URL('https://usamaco.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Usama & Co | Premium Wholesale Trading',
    description: 'Providing elite products across multiple divisions including Footwear, Leather, and Fashion. Partner with Usama & Co for wholesale excellence.',
    url: '/',
    siteName: 'Usama & Co',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Usama & Co Professional Trading',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Usama & Co | Premium Wholesale Trading',
    description: 'Elite products and global trading solutions.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  }
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Providers>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
