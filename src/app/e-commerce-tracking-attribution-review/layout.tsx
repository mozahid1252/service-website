import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Marketing Measurement & Attribution | Moz Intelligence',
  description: 'An end-to-end service that audits your tracking, implements the fixes (GA4, GTM, Meta Pixel, CAPI, Google Ads, UTM), and verifies everything with test purchases — so Shopify, GA4, Meta, and Google numbers finally match.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
