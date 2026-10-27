"use client";

import Image from "next/image";
import { Clock3, Wallet } from "lucide-react";
import { FadeIn } from "./reveal";

/* ================================================================
   MozIntelligence — Dashboard Showcase
   Self-contained: all data inlined (no external services-data/site-data).
   Two opposite-direction auto-scrolling marquee rows of dashboard cards.
   ================================================================ */

type DashboardAsset = { src: string; alt: string };

const packageAssets: Record<string, DashboardAsset> = {
  "E-Commerce Health Check": {
    src: "/dashboards/dash-health.png",
    alt: "E-Commerce Health Check diagnostic dashboard",
  },
  "E-Commerce Growth & Profit Intelligence": {
    src: "/dashboards/dash-growth.png",
    alt: "Growth intelligence dashboard with RFM segmentation and channel LTV",
  },
  "Data-Driven Growth System": {
    src: "/dashboards/dash-system.png",
    alt: "Live business pulse command center with cohort retention and forecasts",
  },
  "Analytics Partner Retainer": {
    src: "/dashboards/dash-retainer.png",
    alt: "Retail analysis dashboard tracking sales variance and store performance",
  },
  "Custom Analytics & Insights": {
    src: "/dashboards/dash-custom.png",
    alt: "Custom analytics workspace with KPI scorecards and experiment results",
  },
};

const auditAssets: Record<string, DashboardAsset> = {
  "Marketing Spend Audit": {
    src: "/dashboards/dash-marketing.png",
    alt: "Marketing spend audit dashboard with true ROAS and channel ROI bars",
  },
  "Customer Retention Audit": {
    src: "/dashboards/dash-retention.png",
    alt: "Customer churn risk and value analysis dashboard",
  },
  "Product Portfolio Audit": {
    src: "/dashboards/dash-product.jpg",
    alt: "Revenue and profit dashboard with product profitability by category",
  },
  "CRO/Website Audit": {
    src: "/dashboards/dash-cro.png",
    alt: "Conversion leak map dashboard with funnel drop-off analysis",
  },
  "Profitability Audit": {
    src: "/dashboards/dash-profit.jpg",
    alt: "Financial summary report with revenue, COGS and gross margin",
  },
  "Operations Efficiency Audit": {
    src: "/dashboards/dash-operations.png",
    alt: "Supply chain operations dashboard with vendor ranking",
  },
  "Meta Ads Performance Audit": {
    src: "/dashboards/dash-meta.png",
    alt: "Meta ads account deep dive with campaign performance and attribution",
  },
};

type ShowcaseItem = {
  name: string;
  quote: string;
  kicker?: string;
  badge?: string;
  timeline?: string;
  investment?: string;
  asset: DashboardAsset;
};

/* Row 1 — Core E-Commerce Packages + Custom Analytics */
const packageItems: ShowcaseItem[] = [
  {
    name: "E-Commerce Health Check",
    quote: "Find out exactly where your store is leaking money, delivered in 5–7 days.",
    kicker: "Starter",
    badge: "Diagnostic",
    timeline: "5–7 Days",
    investment: "$150–$300",
    asset: packageAssets["E-Commerce Health Check"],
  },
  {
    name: "E-Commerce Growth & Profit Intelligence",
    quote: "Turn your existing customers and traffic into more revenue, without spending more on ads.",
    kicker: "Growth",
    badge: "Scale",
    timeline: "10–14 Days",
    investment: "$600–$1,200",
    asset: packageAssets["E-Commerce Growth & Profit Intelligence"],
  },
  {
    name: "Data-Driven Growth System",
    quote: "A complete 15-analysis intelligence system with a live custom KPI dashboard.",
    kicker: "Advanced",
    badge: "Full System",
    timeline: "20–30 Days",
    investment: "$2,000–$4,000",
    asset: packageAssets["Data-Driven Growth System"],
  },
  {
    name: "Analytics Partner Retainer",
    quote: "Ongoing weekly analytics partnership with proactive alerts and monthly strategy calls.",
    kicker: "Ongoing",
    badge: "Partner",
    timeline: "Monthly",
    investment: "$500–$1,200/mo",
    asset: packageAssets["Analytics Partner Retainer"],
  },
  {
    name: "Custom Analytics & Insights",
    quote: "A custom-built analysis designed around your specific business question.",
    investment: "Custom Quote",
    asset: packageAssets["Custom Analytics & Insights"],
  },
];

/* Row 2 — Specialized Add-On Audits */
const auditItems: ShowcaseItem[] = [
  {
    name: "Marketing Spend Audit",
    quote: "Find wasted ad spend and discover budget reallocation opportunities.",
    timeline: "7–10 Days",
    investment: "$300–$600",
    asset: auditAssets["Marketing Spend Audit"],
  },
  {
    name: "Customer Retention Audit",
    quote: "Analyze repeat purchases, retention, churn, and customer value.",
    timeline: "7–12 Days",
    investment: "$350–$700",
    asset: auditAssets["Customer Retention Audit"],
  },
  {
    name: "Product Portfolio Audit",
    quote: "Identify which products drive revenue, margin, and growth.",
    timeline: "7–14 Days",
    investment: "$350–$800",
    asset: auditAssets["Product Portfolio Audit"],
  },
  {
    name: "CRO/Website Audit",
    quote: "Find conversion leaks across the store and checkout journey.",
    timeline: "7–10 Days",
    investment: "$250–$500",
    asset: auditAssets["CRO/Website Audit"],
  },
  {
    name: "Profitability Audit",
    quote: "Uncover margin leaks and understand true profitability.",
    timeline: "8–12 Days",
    investment: "$350–$700",
    asset: auditAssets["Profitability Audit"],
  },
  {
    name: "Operations Efficiency Audit",
    quote: "Identify operational inefficiencies affecting revenue and profit.",
    timeline: "10–14 Days",
    investment: "$400–$800",
    asset: auditAssets["Operations Efficiency Audit"],
  },
  {
    name: "Meta Ads Performance Audit",
    quote: "Diagnose Meta Ads performance, attribution, and scaling opportunities.",
    timeline: "10–14 Days",
    investment: "$500–$900",
    asset: auditAssets["Meta Ads Performance Audit"],
  },
];

const CARD_SIZES =
  "(min-width: 1280px) 620px, (min-width: 1024px) 600px, (min-width: 640px) 440px, 300px";

function DashCard({ item, index }: { item: ShowcaseItem; index: number }) {
  return (
    <figure className="group relative w-[300px] shrink-0 sm:w-[440px] lg:w-[600px] xl:w-[620px]">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#12101f] shadow-[0_24px_70px_-24px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-brand-light/50 group-hover:shadow-[0_32px_90px_-24px_rgba(139,93,255,0.4)]">
        {/* Always-on brand gradient hairline across the card top */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-20 h-[3px] bg-gradient-to-r from-brand via-[#a97dff] to-btn-purple"
        />

        {/* Screenshot + brand watermark + optional package badge */}
        <div className="relative aspect-[16/10] overflow-hidden bg-white">
          <Image
            src={item.asset.src}
            alt={item.asset.alt}
            fill
            sizes={CARD_SIZES}
            className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {item.badge ? (
            <div className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-brand shadow-[0_8px_24px_rgba(0,0,0,0.28)] ring-1 ring-black/5">
              {item.badge}
            </div>
          ) : null}
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

        {/* Caption */}
        <figcaption className="border-t border-white/10 bg-[#131024] p-5 sm:p-6">
          {item.kicker ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-light" />
              {item.kicker}
            </span>
          ) : null}
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`text-base font-semibold leading-snug text-white sm:text-lg ${
                item.kicker ? "mt-3" : ""
              }`}
            >
              {item.name}
            </h3>
            <span
              aria-hidden="true"
              className="shrink-0 text-[11px] font-semibold tracking-[0.24em] text-white/30"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm italic leading-relaxed text-white/55">
            {item.quote}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-md bg-white/[0.04] px-4 py-2.5 ring-1 ring-white/10">
            {item.timeline ? (
              <div className="flex items-center gap-2">
                <Clock3 aria-hidden="true" className="h-3.5 w-3.5 text-brand-light" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  Timeline
                </span>
                <span className="text-xs font-semibold text-white/85">{item.timeline}</span>
              </div>
            ) : null}
            {item.investment ? (
              <div className="flex items-center gap-2">
                <Wallet aria-hidden="true" className="h-3.5 w-3.5 text-brand-light" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  Investment
                </span>
                <span className="text-xs font-semibold text-brand-light">{item.investment}</span>
              </div>
            ) : null}
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

function DashRow({
  items,
  direction,
  startIndex,
}: {
  items: ShowcaseItem[];
  direction: "right" | "left";
  startIndex: number;
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
            {items.map((item, i) => (
              <DashCard key={item.name} item={item} index={startIndex + i} />
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

      {/* Two marquee rows — SWAPPED: audits on top (left scroll), packages on bottom (left scroll) */}
      <div className="relative space-y-6 pb-16 pt-14 sm:space-y-8 sm:pb-24 sm:pt-20">
        <FadeIn>
          <DashRow items={auditItems} startIndex={0} direction="left" />
        </FadeIn>
        <FadeIn delay={120}>
          <DashRow items={packageItems} startIndex={auditItems.length} direction="left" />
        </FadeIn>
      </div>
    </section>
  );
}
