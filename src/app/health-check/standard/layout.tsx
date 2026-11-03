import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Standard E-Commerce Health Check Audit | Moz Intelligence',
  description: 'A rapid business diagnostic to identify the biggest revenue, profit, marketing, tracking, funnel, and customer health risks in your e-commerce business. Starting at $499, delivered in 3-5 business days.',
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
