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
  description: 'Global trading expertise in luxury footwear, leather goods, painting products, and lighting solutions. Professional wholesale and retail distribution.',
  keywords: ['wholesale trading', 'leather goods', 'luxury footwear', 'Agra traders', 'Qhibtiya shoes', 'bulk supply'],
  authors: [{ name: 'Usama & Co' }],
  openGraph: {
    title: 'Usama & Co | Premium Wholesale Trading',
    description: 'Serving retail and wholesale markets with excellence.',
    url: 'https://usamaco.com',
    siteName: 'Usama & Co',
    locale: 'en_IN',
    type: 'website',
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
