"use client";

/* ================================================================
   MozIntelligence — "The Infrastructure Behind The Insights"
   SINGLE-FILE SECTION — everything lives in this one file:
     1) Verbatim copy (data) at the bottom
     2) Local FadeIn entrance wrapper (no external imports)
     3) Ticker animation + film-grain CSS injected via <style>
        (React 19 hoists + dedupes it into <head>)
     4) The section component itself

   External requirements (project-level):
     - Tailwind @theme tokens: brand, brand-light, btn-purple, .container-site
     - Real-colour logo SVGs in /public/images/logos/
   ================================================================ */

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  BrainCircuit,
  DatabaseZap,
  Ellipsis,
  LayoutGrid,
  MailPlus,
  Network,
  Sigma,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* ----------------------------------------------------------------
   2) FadeIn — self-contained entrance wrapper (IntersectionObserver,
      threshold 0.08, fade + rise, matching the site-wide language)
---------------------------------------------------------------- */
function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        "transition-all duration-700 ease-out",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------
   3) Section CSS — ticker keyframes/classes + film grain. Injected
      once via a hoisted <style>; removed from globals.css so this
      file is the single source of truth for the band's animation.
---------------------------------------------------------------- */
const SECTION_CSS = `
@keyframes ticker-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes ticker-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
.animate-ticker-left { animation: ticker-left 38s linear infinite; will-change: transform; }
.animate-ticker-right { animation: ticker-right 44s linear infinite; will-change: transform; }
@media (prefers-reduced-motion: reduce) {
  .animate-ticker-left, .animate-ticker-right { animation: none; }
}
.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
}
`;

/* ----------------------------------------------------------------
   Per-item visuals: real brand-colour logo, else a brand-light icon
---------------------------------------------------------------- */
type ItemVisual =
  | { logo: string; secondLogo?: string }
  | { icon: LucideIcon };

const ITEM_VISUALS: Record<string, ItemVisual> = {
  /* Programming & Analytics */
  Python: { logo: "/images/logos/python-real.svg" },
  SQL: { logo: "/images/logos/sql-real.svg" },
  "Statistical Modeling": { icon: Sigma },
  "Machine Learning": { icon: BrainCircuit },
  "Data Engineering": { icon: DatabaseZap },
  "Data Automation": { icon: Workflow },
  /* Cloud & Data Warehousing */
  "Google Cloud Platform (GCP)": { logo: "/images/logos/googlecloud.svg" },
  BigQuery: { logo: "/images/logos/googlebigquery.svg" },
  PostgreSQL: { logo: "/images/logos/postgresql-real.svg" },
  AWS: { logo: "/images/logos/amazonwebservices.svg" },
  Azure: { logo: "/images/logos/microsoftazure.svg" },
  Snowflake: { logo: "/images/logos/snowflake.svg" },
  /* Visualization & BI */
  "Looker Studio": { logo: "/images/logos/looker.svg" },
  "Power BI": { logo: "/images/logos/powerbi-real.svg" },
  Excel: { logo: "/images/logos/excel-real.svg" },
  Tableau: { logo: "/images/logos/tableau.svg" },
  "Qlik Sense": { logo: "/images/logos/qlik.svg" },
  Others: { icon: LayoutGrid },
  /* Platform Integrations */
  Shopify: { logo: "/images/logos/shopify.svg" },
  GA4: { logo: "/images/logos/googleanalytics.svg" },
  "Meta Ads & Google Ads": {
    logo: "/images/logos/meta.svg",
    secondLogo: "/images/logos/googleads.svg",
  },
  "TikTok Ads": { logo: "/images/logos/tiktok.svg" },
  Klaviyo: { icon: MailPlus },
  WooCommerce: { logo: "/images/logos/woocommerce.svg" },
  BigCommerce: { logo: "/images/logos/bigcommerce.svg" },
  "Stripe / Payment Platforms": { logo: "/images/logos/stripe.svg" },
  "ERP / CRM Systems": { icon: Network },
  "Etc.": { icon: Ellipsis },
};

/* Desynchronised start phases so the four tickers never look identical */
const TICKER_DELAYS = [
  "[animation-delay:-5s]",
  "[animation-delay:-13s]",
  "[animation-delay:-21s]",
  "[animation-delay:-29s]",
];

/* Half-list repeats — guarantees the seamless -50% loop is wider than any viewport */
const TICKER_REPEATS = (items: TechItem[]) => (items.length <= 6 ? 3 : 2);

/* ================================================================
   1) VERBATIM COPY — from the client's approved content
   ================================================================ */
type TechItem = { name: string };
type TechGroup = { title: string; items: TechItem[] };
type TechClosingPart = { text: string; bold?: boolean };

const techStackData = {
  kicker: "The Infrastructure Behind The Insights",
  heading: "Enterprise Engineering. Without the $150K Salary.",
  intro:
    "I bring the exact same tech stack used by Fortune 500 companies, and build it custom for your store. You get enterprise-grade data infrastructure without the $150,000/year in-house data engineer salary.",
  groups: [
    {
      title: "Programming & Analytics",
      items: [
        { name: "Python" },
        { name: "SQL" },
        { name: "Statistical Modeling" },
        { name: "Machine Learning" },
        { name: "Data Engineering" },
        { name: "Data Automation" },
      ],
    },
    {
      title: "Cloud & Data Warehousing",
      items: [
        { name: "Google Cloud Platform (GCP)" },
        { name: "BigQuery" },
        { name: "PostgreSQL" },
        { name: "AWS" },
        { name: "Azure" },
        { name: "Snowflake" },
      ],
    },
    {
      title: "Visualization & BI",
      items: [
        { name: "Looker Studio" },
        { name: "Power BI" },
        { name: "Excel" },
        { name: "Tableau" },
        { name: "Qlik Sense" },
        { name: "Others" },
      ],
    },
    {
      title: "Platform Integrations",
      items: [
        { name: "Shopify" },
        { name: "GA4" },
        { name: "Meta Ads & Google Ads" },
        { name: "TikTok Ads" },
        { name: "Klaviyo" },
        { name: "WooCommerce" },
        { name: "BigCommerce" },
        { name: "Stripe / Payment Platforms" },
        { name: "ERP / CRM Systems" },
        { name: "Etc." },
      ],
    },
  ] as TechGroup[],
  closing: [
    { text: "This is the exact stack I used to process " },
    { text: "2.75M raw e-commerce events", bold: true },
    { text: ", build a " },
    { text: "$53.5M financial data warehouse", bold: true },
    { text: ", and run " },
    { text: "11-tier RFM segmentation models", bold: true },
    { text: ". No generic templates. Just pure, custom-built data engineering." },
  ] as TechClosingPart[],
};

/* ================================================================
   4) THE SECTION — deep near-black neutral backdrop (no colour
   cast) + faint blueprint grid; four full-bleed horizontal ticker
   rows streaming big real-brand-colour chips — odd rows left, even
   rows right — under editorial hairline labels.
   ================================================================ */
export function TechStackSection() {
  const { kicker, heading, intro, groups, closing } = techStackData;

  return (
    <section
      id="tech-stack"
      aria-labelledby="techstack-heading"
      className="relative scroll-mt-20 overflow-hidden bg-[#0a0a0d] py-16 sm:py-24"
    >
      {/* section-scoped animation + grain styles (hoisted to <head>) */}
      <style href="tech-stack-anim" precedence="medium">
        {SECTION_CSS}
      </style>

      {/* backdrop — deep neutral black: studio top sheen, faint grid, whisper
          accents, grain, vignette. No colour wash — purple lives only in
          tiny accents (dots, hairlines, hover). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* neutral top sheen — studio light from above, zero colour cast */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
        {/* blueprint grid — fainter, fades out radially */}
        <div className="absolute inset-0 [-webkit-mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_70%)] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_70%)]" />
        {/* whisper-level brand glow — accent only, never washes the band */}
        <div className="absolute -top-48 left-1/2 h-[22rem] w-[44rem] -translate-x-1/2 rounded-full bg-brand/[0.08] blur-[150px]" />
        {/* neutral corner fog for depth (no hue) */}
        <div className="absolute -bottom-60 -left-40 h-96 w-[38rem] rounded-full bg-white/[0.03] blur-[160px]" />
        <div className="absolute -bottom-60 -right-40 h-96 w-[38rem] rounded-full bg-white/[0.03] blur-[160px]" />
        {/* film grain */}
        <div className="noise-overlay absolute inset-0 opacity-[0.05] mix-blend-overlay" />
        {/* vignette — neutral black, no violet tint */}
        <div className="absolute inset-0 bg-[radial-gradient(115%_100%_at_50%_50%,transparent_55%,rgba(2,2,4,0.6)_100%)]" />
      </div>

      {/* premium seam hairlines — top & bottom edges */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-light/30 to-transparent" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-light/15 to-transparent" />

      <div className="container-site relative">
        {/* Section header */}
        <FadeIn className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            <span aria-hidden="true" className="h-px w-8 bg-white/15" />
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-light shadow-[0_0_12px_rgba(139,93,255,0.9)]" />
            {kicker}
            <span aria-hidden="true" className="h-px w-8 bg-white/15" />
          </span>
          <h2
            id="techstack-heading"
            className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Enterprise Engineering.{" "}
            <span className="bg-gradient-to-r from-brand-light via-[#a06bff] to-btn-purple bg-clip-text text-transparent">
              Without the $150K Salary.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/55 sm:text-lg">
            {intro.split("enterprise-grade data infrastructure")[0]}
            <span className="font-semibold text-white">
              enterprise-grade data infrastructure
            </span>
            {intro.split("enterprise-grade data infrastructure")[1]}
          </p>
        </FadeIn>

        {/* Four full-bleed ticker rows — odd left, even right */}
        <div className="mt-12 space-y-10 sm:mt-14">
          {groups.map((group, i) => {
            const left = i % 2 === 0;
            const half = Array.from({ length: TICKER_REPEATS(group.items) }, () => group.items).flat();

            return (
              <FadeIn key={group.title} delay={i * 90}>
                {/* hairline row label */}
                <div className="mb-5 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="text-2xl font-semibold tabular-nums text-white/10"
                  >
                    0{i + 1}
                  </span>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    {group.title}
                  </h3>
                  <span aria-hidden="true" className="h-px flex-1 bg-white/[0.08]" />
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light shadow-[0_0_10px_rgba(139,93,255,0.9)]" />
                </div>

                {/* full-bleed ticker (breaks out of the container gutters) */}
                <div className="group relative -mx-4 overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] sm:-mx-6 lg:-mx-8">
                  <div
                    className={`flex w-max ${
                      left ? "animate-ticker-left" : "animate-ticker-right"
                    } group-hover:[animation-play-state:paused] motion-reduce:animate-none ${
                      TICKER_DELAYS[i % TICKER_DELAYS.length]
                    }`}
                  >
                    <div className="flex items-center">
                      {half.map((item, idx) => (
                        <StackChip key={`${item.name}-a-${idx}`} item={item} />
                      ))}
                    </div>
                    <div className="flex items-center" aria-hidden="true">
                      {half.map((item, idx) => (
                        <StackChip key={`${item.name}-b-${idx}`} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Closing proof paragraph — bold segments in brand light */}
        <FadeIn delay={60}>
          <p className="mx-auto mt-14 max-w-3xl border-t border-white/[0.08] pt-10 text-center text-sm leading-relaxed text-white/55 sm:text-base">
            {closing.map((part, i) =>
              part.bold ? (
                <strong key={i} className="font-semibold text-brand-light">
                  {part.text}
                </strong>
              ) : (
                <Fragment key={i}>{part.text}</Fragment>
              )
            )}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/**
 * One ticker chip — big dark glass tile with a real-colour logo (or a
 * brand-light Lucide icon) next to the verbatim tool name.
 */
function StackChip({ item }: { item: TechItem }) {
  const visual = ITEM_VISUALS[item.name];
  const Icon = visual && "icon" in visual ? visual.icon : null;

  return (
    <div className="mr-3 flex shrink-0 items-center gap-4 rounded-[5px] border border-white/[0.09] bg-white/[0.05] px-5 py-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_10px_28px_rgba(3,2,6,0.45)] transition-all duration-300 hover:border-brand-light/50 hover:bg-white/[0.075] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.09),0_0_28px_rgba(139,93,255,0.12)]">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] border border-white/[0.07] bg-white/[0.06]">
        {visual && "logo" in visual ? (
          <span className="flex items-center">
            <Image
              src={visual.logo}
              alt=""
              width={28}
              height={28}
              unoptimized
              aria-hidden="true"
              className="h-7 w-7 shrink-0 object-contain"
            />
            {visual.secondLogo ? (
              <Image
                src={visual.secondLogo}
                alt=""
                width={24}
                height={24}
                unoptimized
                aria-hidden="true"
                className="-ml-1.5 h-6 w-6 shrink-0 object-contain"
              />
            ) : null}
          </span>
        ) : Icon ? (
          <Icon aria-hidden="true" className="h-6 w-6 text-brand-light" />
        ) : (
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-light/50" />
        )}
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-white/85">
        {item.name}
      </span>
    </div>
  );
}
