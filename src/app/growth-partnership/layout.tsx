import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'E-Commerce Growth Intelligence Partnership | Moz Intelligence',
  description: 'Turn business data into consistent, measurable growth. Ongoing analytical and strategic support across profitability, marketing, conversion, products, customers, retention, tracking, and growth priorities. Starting at $1,000/month.',
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
