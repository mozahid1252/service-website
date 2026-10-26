"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Database,
  Gem,
  Mail,
  Megaphone,
  PlugZap,
  Route,
  ScanSearch,
  ShoppingBag,
  SlidersHorizontal,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

/* ---------- local utils ---------- */
function cn(...inputs: (string | false | null | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}

/* ---------- FadeIn — shared section entrance wrapper ---------- */
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
      className={cn(
        "transition-all duration-700 ease-out",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ================================================================
   What We Do — verbatim copy (client-approved)
   ================================================================ */

const whatWeDoData = {
  lead: "What We Do",
  title: "What MozIntelligence Actually Does",
  intro:
    "MozIntelligence is an e-commerce growth analytics and profitability consultancy explicitly tailored for modern Ecommerce platforms - Shopify, direct-to-consumer (DTC), and online brands. We take 100% of the technical data engineering workload off your hands—extracting, cleaning, and merging fragmented data across your e-commerce platforms & stores into One Source of Truth so you know exactly where every dollar is going.",
  problem: {
    titleLead: "The Core Problem We Solve:",
    titleRest: "Too Much Data, Zero Clarity",
    paragraphs: [
      "Every online store owner faces the same massive headache: you have a ton of data spread across different systems, but no clear picture of your actual net profit. For high-growth online brands and direct-to-consumer (DTC) companies, more revenue does not automatically mean more profit.",
      "When data sits completely siloed across various e-commerce platforms & stores, you miss hidden profit leaks that quietly eat away your net margins:",
    ],
    silos: [
      {
        title: "Shopify & E-Commerce Platforms",
        body: "Your core sales data, inventory values, and dynamic transaction records are trapped inside your store.",
      },
      {
        title: "Google Analytics 4",
        body: "Your traffic patterns and conversion funnel metrics live in a separate silo.",
      },
      {
        title: "Meta & Google Ads",
        body: "Your customer acquisition cost (CAC) and marketing spend data are completely split up here.",
      },
      {
        title: "Klaviyo",
        body: "Your critical retention, customer lifetime value (LTV), and repeat-buyer numbers are isolated here.",
      },
    ],
    callout:
      "Without a central ecosystem connecting these channels, direct-to-consumer (DTC) operators suffer from unoptimized discount strategies, unmonitored refund rates, hidden shipping fees, and wasteful ad spend.",
  },
  howItWorks: {
    titleLead: "How It Works:",
    titleRest: "Tech Infrastructure + Deep Growth Analysis",
    lead: "You don't need to hire expensive data engineers or write complex SQL code to audit your online operations. We do the heavy lifting so you get the insights. MozIntelligence completely manages the technical analytics infrastructure for your e-commerce platforms & stores end-to-end:",
    steps: [
      {
        title: "Extract",
        body: "We securely connect directly to your entire tech stack, pulling raw data straight from Shopify, GA4, Meta Ads, Google Ads, and Klaviyo.",
      },
      {
        title: "Clean & Standardize",
        body: "We filter out the noise, fix broken tracking errors, and perfectly align conflicting metric definitions across all channels.",
      },
      {
        title: "Merge & Centralize",
        body: "We pipe all of your processed raw data from your online brands into a secure, centralized cloud database to create a One Source of Truth.",
      },
    ],
  },
  growth: {
    titleLead: "Turning Raw Data Into",
    titleRest: "High-Margin Growth",
    lead: "Building the dashboard is just the beginning. Our real impact comes from what we do next:",
    items: [
      {
        title: "Deep Advanced Analysis",
        body: "We look beyond basic vanity metrics. We run rigorous data forensics to calculate your true product-level margins, customer acquisition economics, and cohort behaviors.",
      },
      {
        title: "Uncovering True Value",
        body: "We pinpoint exactly which products, channels, and campaigns are driving real cash flow, and which ones are secretly draining your budget.",
      },
      {
        title: "Actionable Growth Recommendations",
        body: "We provide a clear, prioritized strategic roadmap. We don't just show you past metrics; we give you specific, data-backed recommendations on pricing, ad spend redistribution, and retention strategies to unlock maximum efficiency and aggressively scale the growth of your e-commerce platforms & stores.",
      },
    ],
  },
};

/* ---------- What We Do section ---------- */

const SILO_ICONS: LucideIcon[] = [ShoppingBag, BarChart3, Megaphone, Mail];
const STEP_ICONS: LucideIcon[] = [PlugZap, SlidersHorizontal, Database];
const GROWTH_ICONS: LucideIcon[] = [ScanSearch, Gem, Route];

const PLATFORMS = [
  "Shopify & E-Commerce Platforms",
  "Google Analytics 4",
  "Meta & Google Ads",
  "Klaviyo",
];

export function WhatWeDoSection() {
  const { problem, howItWorks, growth } = whatWeDoData;

  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className="scroll-mt-20 border-y border-border bg-white py-16 sm:py-24"
    >
      <div className="container-site">
        {/* Section header */}
        <FadeIn className="flex flex-col items-start">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-heading">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
            {whatWeDoData.lead}
          </span>
          <h2
            id="what-we-do-heading"
            className="mt-4 text-3xl font-semibold leading-tight text-heading sm:text-4xl"
          >
            What MozIntelligence <span className="text-brand">Actually</span> Does
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-body-text sm:text-lg">
            {whatWeDoData.intro.split("One Source of Truth")[0]}
            <span className="font-semibold text-heading">One Source of Truth</span>
            {whatWeDoData.intro.split("One Source of Truth")[1]}
          </p>
        </FadeIn>

        {/* Hero board */}
        <FadeIn className="mt-10 sm:mt-12" delay={60}>
          <figure className="overflow-hidden rounded-[5px] border border-border bg-white p-2 shadow-[0_1px_3px_rgba(31,31,31,0.05)] sm:p-3">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[3px] lg:aspect-[21/9]">
              <Image
                src="/images/whatwedo-hero-dashboard.jpg"
                alt="E-commerce analytics dashboard with sales charts on a laptop"
                fill
                sizes="(min-width: 1240px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex flex-wrap items-center gap-x-6 gap-y-2 px-2 py-3 sm:px-3">
              {PLATFORMS.map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wide text-heading/70 sm:text-xs"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {platform}
                </span>
              ))}
            </figcaption>
          </figure>
        </FadeIn>

        {/* 1 · The core problem */}
        <FadeIn className="mt-14 sm:mt-20" delay={60}>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <SubHeading num="01" lead={problem.titleLead} rest={problem.titleRest} />
              <div className="mt-6 space-y-4">
                {problem.paragraphs.map((p, i) => (
                  <p key={i} className="max-w-xl text-sm leading-relaxed text-body-text">
                    {i === 0 ? (
                      p
                    ) : (
                      <>
                        {p.split("hidden profit leaks")[0]}
                        <span className="font-semibold text-heading">hidden profit leaks</span>
                        {p.split("hidden profit leaks")[1]}
                      </>
                    )}
                  </p>
                ))}
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-[5px] border border-border border-l-4 border-l-[#1d4ed8] bg-white p-5">
                <TriangleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#1d4ed8]" />
                <p className="text-sm leading-relaxed text-body-text">
                  {problem.callout.split("unoptimized discount strategies")[0]}
                  <span className="font-semibold text-heading">
                    unoptimized discount strategies, unmonitored refund rates, hidden shipping fees,
                    and wasteful ad spend
                  </span>
                  .
                </p>
              </div>
            </div>
            <PhotoFrame
              src="/images/whatwedo-problem-data.jpg"
              alt="Team working through charts and reports spread across a desk"
            />
          </div>

          {/* Siloed platform cards */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {problem.silos.map((silo, i) => {
              const Icon = SILO_ICONS[i % SILO_ICONS.length];
              return (
                <article
                  key={silo.title}
                  className="group flex flex-col rounded-[5px] border border-heading/20 border-l-4 border-l-heading bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-heading/60 hover:border-l-brand hover:shadow-[0_18px_44px_rgba(31,31,31,0.10)]"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-heading text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 text-[15px] font-semibold leading-snug text-heading">{silo.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-body-text">{silo.body}</p>
                </article>
              );
            })}
          </div>
        </FadeIn>

        {/* 2 · How it works */}
        <FadeIn className="mt-14 sm:mt-20" delay={60}>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <PhotoFrame
              className="lg:order-1"
              src="/images/whatwedo-how-analyst.jpg"
              alt="Analyst reviewing performance charts on a desktop monitor"
            />
            <div className="lg:order-2">
              <SubHeading num="02" lead={howItWorks.titleLead} rest={howItWorks.titleRest} />
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-body-text">{howItWorks.lead}</p>
            </div>
          </div>

          {/* Connected step flow */}
          <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-4">
            {howItWorks.steps.map((step, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              return (
                <FadeStep key={step.title} index={i}>
                  <article className="group relative flex h-full flex-col rounded-[5px] border border-heading/20 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-heading/60 hover:shadow-[0_18px_44px_rgba(31,31,31,0.10)]">
                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-5 text-xs font-semibold tracking-[0.2em] text-heading/35"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[5px] bg-heading text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h4 className="mt-4 text-base font-semibold text-heading">{step.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-body-text">{step.body}</p>
                  </article>
                </FadeStep>
              );
            })}
          </div>
        </FadeIn>

        {/* 3 · Growth impact */}
        <FadeIn className="mt-14 sm:mt-20" delay={60}>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <SubHeading num="03" lead={growth.titleLead} rest={growth.titleRest} restTone="green" />
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-body-text">{growth.lead}</p>
            </div>
            <PhotoFrame
              accent="green"
              src="/images/whatwedo-growth-team.jpg"
              alt="Business team reviewing growth charts together in an office"
            />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {growth.items.map((item, i) => {
              const Icon = GROWTH_ICONS[i % GROWTH_ICONS.length];
              return (
                <article
                  key={item.title}
                  className="group flex flex-col rounded-[5px] border border-heading/20 border-l-4 border-l-[#047857] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-heading/60 hover:border-l-[#047857] hover:shadow-[0_18px_44px_rgba(31,31,31,0.10)]"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[5px] bg-[#047857] text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 text-base font-semibold text-heading">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-body-text">{item.body}</p>
                </article>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function PhotoFrame({
  src,
  alt,
  className,
  accent,
}: {
  src: string;
  alt: string;
  className?: string;
  accent?: "green";
}) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[5px] border border-border bg-white p-2 shadow-[0_1px_3px_rgba(31,31,31,0.05)]",
        accent === "green" && "border-l-4 border-l-[#047857]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover"
        />
      </div>
    </figure>
  );
}

function SubHeading({
  num,
  lead,
  rest,
  restTone = "brand",
}: {
  num?: string;
  lead: string;
  rest: string;
  restTone?: "brand" | "green";
}) {
  return (
    <div className="flex items-start gap-3">
      <span aria-hidden="true" className="mt-1.5 h-6 w-1 shrink-0 rounded-[2px] bg-brand" />
      <div>
        {num && (
          <span
            aria-hidden="true"
            className="block text-[11px] font-semibold tracking-[0.22em] text-heading/35"
          >
            {num}
          </span>
        )}
        <h3 className="text-xl font-semibold leading-snug text-heading sm:text-2xl">
          <span className="text-body-text">{lead}</span>{" "}
          <span className={cn(restTone === "green" ? "text-[#047857]" : "text-brand")}>{rest}</span>
        </h3>
      </div>
    </div>
  );
}

function FadeStep({ index, children }: { index: number; children: ReactNode }) {
  return (
    <>
      <div className={cn(index === 2 ? "sm:col-span-2 lg:col-span-1" : undefined)}>{children}</div>
      {index < 2 && (
        <div aria-hidden="true" className="hidden items-center justify-center self-center lg:flex">
          <ArrowRight className="h-6 w-6 text-brand/50" />
        </div>
      )}
    </>
  );
}
