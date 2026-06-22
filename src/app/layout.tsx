import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
  title: "Mozahidul Islam — E-Commerce Growth Analyst",
  description: "I find exactly where your money is leaking — across your products, your ads, and your customers — and show you how to stop it. No confusing reports. No generic advice.",
  keywords: ["E-Commerce Analytics", "Growth Analyst", "Shopify Analytics", "Data Analysis", "Profit Optimization"],
  authors: [{ name: "Mozahidul Islam" }],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "Mozahidul Islam — E-Commerce Growth Analyst",
    description: "I find exactly where your money is leaking and show you how to stop it.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syne.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
