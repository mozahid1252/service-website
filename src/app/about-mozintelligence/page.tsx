import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { AboutSection } from "@/components/site/about-section";
import { SiteFooter } from "@/components/site/contact-footer";

export const metadata = {
  title: "About MozIntelligence — E-Commerce Growth Analytics Consultancy",
  description:
    "MozIntelligence is an e-commerce growth analytics and profitability consultancy for Shopify, DTC, and online brands. Founded by Mozahidul Islam, E-Commerce Growth Scientist.",
};

export default function AboutMozIntelligencePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Minimal header — logo left, back-to-home right (same tab) */}
      <header className="sticky top-0 z-50 bg-[rgba(8,14,24,0.92)] backdrop-blur-xl border-b border-[rgba(0,198,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <a href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="MozIntelligence — E-Commerce Growth Intelligence"
              width={44}
              height={44}
              className="rounded-lg transition-transform duration-300 group-hover:scale-105 img-premium"
              priority
            />
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-white leading-tight">MozIntelligence</div>
              <div className="text-[11px] text-[#8899AA] leading-tight">E-Commerce Growth Focused</div>
            </div>
          </a>
          {/* Back to home — opens in the SAME tab (no target=_blank) */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-[#8899AA] hover:text-[#00C6FF] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      {/* Main content — the About MozIntelligence section */}
      <main className="flex-1">
        <AboutSection />
      </main>

      {/* Full purple footer — same as the homepage */}
      <SiteFooter />
    </div>
  );
}
