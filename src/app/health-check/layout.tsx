import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'E-Commerce Health Check Audit | Moz Intelligence',
  description: 'A business-level diagnostic audit across revenue, profitability, products, marketing, tracking, conversion, and customer health. See what is working, what is leaking money, and what needs attention first. Choose Standard or Deep.',
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
