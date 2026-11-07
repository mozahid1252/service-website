"use client";

import Image from "next/image";
import { FadeIn } from "./reveal";

/* ================================================================
   MozIntelligence — Dashboard Showcase
   Self-contained: all data inlined (no external services-data/site-data).
   Two opposite-direction auto-scrolling marquee rows of dashboard cards.
   ================================================================ */

type DashboardAsset = { src: string; alt: string };

/* Audit dashboard images — keyed by the current audit names (homepage Part 2) */
const auditAssets: Record<string, DashboardAsset> = {
  "E-Commerce Profitability Audit": {
    src: "/dashboards/dash-profit.jpg",
    alt: "Financial summary report with revenue, COGS and gross margin",
  },
  "Marketing Performance & Profitability Audit": {
    src: "/dashboards/dash-marketing.png",
    alt: "Marketing spend audit dashboard with true ROAS and channel ROI bars",
  },
  "E-Commerce CRO Audit": {
    src: "/dashboards/dash-cro.png",
    alt: "Conversion leak map dashboard with funnel drop-off analysis",
  },
  "Customer Retention & LTV Audit": {
    src: "/dashboards/dash-retention.png",
    alt: "Customer churn risk and value analysis dashboard",
  },
  "Product Profitability & Portfolio Audit": {
    src: "/dashboards/dash-product.jpg",
    alt: "Revenue and profit dashboard with product profitability by category",
  },
  "Operations Efficiency Audit": {
    src: "/dashboards/dash-operations.png",
    alt: "Supply chain operations dashboard with vendor ranking",
  },
  "Meta Ads Measurement & Profitability Review": {
    src: "/dashboards/dash-meta.png",
    alt: "Meta ads account deep dive with campaign performance and attribution",
  },
};

type ShowcaseItem = {
  name: string;
  asset: DashboardAsset;
};

/* Marquee order mirrors the homepage Part 2 audit lineup */
const auditItems: ShowcaseItem[] = [
  { name: "E-Commerce Profitability Audit", asset: auditAssets["E-Commerce Profitability Audit"] },
  { name: "Marketing Performance & Profitability Audit", asset: auditAssets["Marketing Performance & Profitability Audit"] },
  { name: "E-Commerce CRO Audit", asset: auditAssets["E-Commerce CRO Audit"] },
  { name: "Customer Retention & LTV Audit", asset: auditAssets["Customer Retention & LTV Audit"] },
  { name: "Product Profitability & Portfolio Audit", asset: auditAssets["Product Profitability & Portfolio Audit"] },
  { name: "Operations Efficiency Audit", asset: auditAssets["Operations Efficiency Audit"] },
  { name: "Meta Ads Measurement & Profitability Review", asset: auditAssets["Meta Ads Measurement & Profitability Review"] },
];

const CARD_SIZES =
  "(min-width: 1280px) 620px, (min-width: 1024px) 600px, (min-width: 640px) 440px, 300px";

function DashCard({ item }: { item: ShowcaseItem }) {
  return (
    <figure className="group relative w-[300px] shrink-0 sm:w-[440px] lg:w-[600px] xl:w-[620px]">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#12101f] shadow-[0_24px_70px_-24px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-brand-light/50 group-hover:shadow-[0_32px_90px_-24px_rgba(139,93,255,0.4)]">
        {/* Always-on brand gradient hairline across the card top */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-brand via-[#a97dff] to-btn-purple"
        />

        {/* Screenshot + brand watermark */}
        <div className="relative aspect-[16/10] overflow-hidden bg-white">
          <Image
            src={item.asset.src}
            alt={item.asset.alt}
            fill
            sizes={CARD_SIZES}
            className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-md bg-white/95 px-2.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.28)] ring-1 ring-black/5">
            <Image
              src="/images/logo.png"
              alt="MozIntelligence logo"
              width={40}
              height={26}
              className="h-5 w-auto object-contain"
            />
            <span className="text-[10px] font-bold tracking-wide text-heading">
              MozIntelligence
            </span>
          </div>
        </div>

        {/* Caption removed per user request — keep only the dashboard screenshot */}
        <figcaption className="border-t border-white/10 bg-[#131024] p-3 sm:p-4">
          <h3 className="sr-only">{item.name}</h3>
        </figcaption>
      </div>
    </figure>
  );
}

function DashRow({
  items,
  direction,
}: {
  items: ShowcaseItem[];
  direction: "right" | "left";
}) {
  const label = `Auto-scrolling dashboard previews: ${items
    .map((item) => item.name)
    .join(", ")}`;
  return (
    <div
      role="region"
      aria-label={label}
      className="dash-row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_72px,black_calc(100%-72px),transparent)]"
    >
      <div
        className={`flex w-max ${direction === "right" ? "dash-track-right" : "dash-track-left"}`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-6 pr-6" aria-hidden={copy === 1}>
            {items.map((item) => (
              <DashCard key={item.name} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardShowcaseSection() {
  return (
    <section
      id="dashboards"
      aria-label="MozIntelligence dashboard previews"
      className="relative scroll-mt-20 overflow-hidden bg-[#0B0817] text-white"
    >
      {/* Brand gradient top rule + ambient glows + faint grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
        <div className="absolute -left-40 top-[-140px] h-[420px] w-[420px] rounded-full bg-brand/25 blur-[120px]" />
        <div className="absolute right-[-160px] top-1/3 h-[460px] w-[460px] rounded-full bg-brand-2/15 blur-[130px]" />
        <div className="absolute bottom-[-180px] left-1/3 h-[380px] w-[380px] rounded-full bg-btn-purple/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.13] [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      {/* Single marquee row — audits only (package row removed per user request) */}
      <div className="relative space-y-6 pb-16 pt-14 sm:space-y-8 sm:pb-24 sm:pt-20">
        <FadeIn>
          <DashRow items={auditItems} direction="right" />
        </FadeIn>
      </div>
    </section>
  );
}
