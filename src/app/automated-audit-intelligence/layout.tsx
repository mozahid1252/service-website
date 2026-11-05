import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Automated Audit Intelligence | Moz Intelligence',
  description: 'Turn your business dashboard into a decision support system. Add deeper calculations, classifications, insight summaries, and basic recommendations. Modules from $650.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
