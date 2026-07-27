import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'E-Commerce Profitability Audit | E-Commerce Analytics',
  description: 'Find out where your revenue is going. A deep-dive financial audit analyzing true product margins, cost leaks, discount impact, and cash flow patterns.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
