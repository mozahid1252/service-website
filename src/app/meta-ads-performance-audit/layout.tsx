import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Meta Ads Measurement & Profitability Review | Moz Intelligence',
  description: 'A measurement, profitability, and decision review connecting Meta campaign performance, audience quality, creative efficiency, tracking reliability, post-click behaviour, and acquisition economics into one prioritized growth plan.',
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
