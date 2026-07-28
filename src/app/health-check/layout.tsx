import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'E-Commerce Health Check | Moz Intelligence',
  description: 'A focused 5-day diagnostic audit for Shopify stores doing $5K-$50K/mo. Find your profit leaks, conversion blockers, and quick wins without touching a line of code.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
