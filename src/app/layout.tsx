import type { Metadata } from "next";
import { Inter, Syne, Anton, Bricolage_Grotesque, Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from '@next/third-parties/google';
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
});

/* "Why We're Different" section display + body fonts */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

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
        url: "/images/logo.png",
        width: 1200,
        height: 655,
        alt: "MozIntelligence Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MozIntelligence | E-commerce Growth Intelligence",
    description: "MozIntelligence helps e-commerce brands uncover profit leaks, analyze marketing performance, understand customer behavior, and make data-driven growth decisions.",
    images: ["/images/logo.png"],
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
    logo: "https://mozintelligence.vercel.app/images/logo.png",
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
      <body
        className={`${inter.variable} ${syne.variable} ${anton.variable} ${bricolage.variable} ${fraunces.variable} ${manrope.variable} antialiased`}
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
