import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  metadataBase: new URL("https://mozintelligence.vercel.app"),
  title: "MozIntelligence | E-commerce Growth Intelligence",
  description: "MozIntelligence helps e-commerce brands uncover profit leaks, analyze marketing performance, understand customer behavior, and make data-driven growth decisions.",
  keywords: ["MozIntelligence", "E-Commerce Analytics", "Growth Intelligence", "Shopify Analytics", "Data Analysis", "Profit Optimization"],
  authors: [{ name: "Mozahidul Islam" }],
  creator: "Mozahidul Islam",
  publisher: "MozIntelligence",
  verification: {
    google: "googlebf2530808b361a30",
  },
  icons: {
    icon: "/images/logo-icon.png",
  },
  alternates: {
    canonical: "https://mozintelligence.vercel.app/",
  },
  openGraph: {
    title: "MozIntelligence | E-commerce Growth Intelligence",
    description: "MozIntelligence helps e-commerce brands uncover profit leaks, analyze marketing performance, understand customer behavior, and make data-driven growth decisions.",
    type: "website",
    url: "https://mozintelligence.vercel.app/",
    siteName: "MozIntelligence",
    images: [
      {
        url: "/images/logo-og.png",
        width: 1200,
        height: 630,
        alt: "MozIntelligence Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MozIntelligence | E-commerce Growth Intelligence",
    description: "MozIntelligence helps e-commerce brands uncover profit leaks, analyze marketing performance, understand customer behavior, and make data-driven growth decisions.",
    images: ["/images/logo-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MozIntelligence",
    url: "https://mozintelligence.vercel.app",
    logo: "https://mozintelligence.vercel.app/images/logo-og.png",
    description: "MozIntelligence helps e-commerce brands uncover profit leaks, analyze marketing performance, understand customer behavior, and make data-driven growth decisions.",
    founder: {
      "@type": "Person",
      name: "Mozahidul Islam",
      jobTitle: "E-Commerce Growth Intelligence Consultant",
    },
    sameAs: [
      "https://www.linkedin.com/in/mozahidul-islam",
      "https://github.com/mojahid1252",
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700;800&family=Syne:wght@700;800&family=Anton&family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-inter: 'Inter', sans-serif;
            --font-manrope: 'Manrope', sans-serif;
            --font-syne: 'Syne', sans-serif;
            --font-anton: 'Anton', sans-serif;
            --font-fraunces: 'Fraunces', serif;
            --font-bricolage: 'Bricolage Grotesque', sans-serif;
          }
        `}</style>
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <GoogleAnalytics gaId="G-NETNBH6KZ4" />
        <Toaster />
      </body>
    </html>
  );
}
