import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Custom Analytics & Insights | Moz Intelligence',
  description: 'Built around your business questions. Custom analysis, dashboards, KPI systems, and reporting tailored to your exact data, goals, and decisions. Custom pricing based on scope.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Syne:wght@600;700;800&family=Anton&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Bricolage+Grotesque:wght@600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
