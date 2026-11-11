"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BarChart3,
  Database,
  Mail,
  Megaphone,
  ScanSearch,
  ShoppingBag,
  TrendingUp,
  TriangleAlert,
  Wrench,
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
      { threshold: 0.08 },
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
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ================================================================
   What We Do — verbatim copy (client-approved)
   ================================================================ */

const EYEBROW = "What MozIntelligence Does";
const TITLE_LEAD = "What MozIntelligence";
const TITLE_ACCENT = "Actually";
const TITLE_TAIL = "Does";
const INTRO =
  "MozIntelligence — E-Commerce Growth Intelligence Partner. Analytics, Automation & Profitability for Shopify and DTC Brands. We uncover where your store is leaking profit, fix what's holding it back, and partner with you to drive sustainable growth.";

const PLATFORMS = [
  "Shopify / E-Commerce Platform",
  "Google Analytics 4",
  "Meta & Google & TikTok Ads",
  "Klaviyo",
];

const PROBLEM_PARA_1 =
  "More revenue doesn't automatically mean more profit. Your business data is scattered across disconnected platforms. Meanwhile, hidden profit leaks — from excessive discounts and unmonitored refunds to rising shipping costs and wasted ad spend — quietly erode your margins.";
const PROBLEM_CALLOUT =
  "Your data tells a story. We help you understand what it's really costing you.";

const PROBLEM_CARDS: { title: string; body: string }[] = [
  {
    title: "Shopify / E-Commerce Platform",
    body: "Your core sales, orders, and product data.",
  },
  {
    title: "Google Analytics 4",
    body: "Your traffic, sessions, and funnel behavior.",
  },
  {
    title: "Meta & Google & TikTok Ads",
    body: "Your ad spend, CAC, and campaign performance.",
  },
  {
    title: "Klaviyo",
    body: "Your retention, LTV, and repeat-buyer data.",
  },
];

const PROBLEM_CARD_ICONS: LucideIcon[] = [ShoppingBag, BarChart3, Megaphone, Mail];

const HOW_WE_WORK_LEAD =
  "We turn fragmented business data into actionable intelligence, measurable improvements, and sustainable growth.";

type CtaLink = { label: string; href: string };

const STEPS: {
  label: string;
  Icon: LucideIcon;
  title: string;
  body: string;
  ctas: CtaLink[];
}[] = [
  {
    label: "01 — Diagnose",
    Icon: ScanSearch,
    title: "Find Where Your Profit Is Leaking.",
    body: "We integrate your Shopify, GA4, advertising, and customer data to uncover the real drivers of your profitability. We analyze product margins, channel profitability, customer acquisition costs, retention, and purchasing behavior. You receive a clear business scorecard and a prioritized action roadmap.",
    ctas: [
      { label: "Health Check", href: "/health-check" },
      { label: "Specialized Audits", href: "#part-2" },
    ],
  },
  {
    label: "Step 2: Fix",
    Icon: Wrench,
    title: "Turn Insights Into Measurable Results.",
    body: "We implement high-impact improvements based on your business priorities. From repairing broken tracking and reallocating ad spend to improving conversion, retention, pricing, and product performance — we help turn recommendations into action.",
    ctas: [
      { label: "Performance Improvement", href: "/performance-improvement" },
      {
        label: "Marketing Measurement & Attribution",
        href: "/e-commerce-tracking-attribution-review",
      },
    ],
  },
  {
    label: "Step 3: Grow",
    Icon: TrendingUp,
    title: "Your Ongoing Growth Intelligence Partner.",
    body: "We continuously monitor performance, identify emerging opportunities, track profitability, and support strategic decisions through ongoing analytics and testing.",
    ctas: [{ label: "Growth Partnership", href: "/growth-partnership" }],
  },
];

const FOUNDATION_PARA =
  "Your business shouldn't depend on disconnected reports and conflicting numbers. We connect your Shopify store, GA4, Meta Ads, Google Ads, and Klaviyo into a unified data infrastructure and centralized live dashboards. So your team can monitor performance, understand profitability, and make better decisions — all from one place.";

const FOUNDATION_CTAS: CtaLink[] = [
  { label: "Data Preparation & Integration", href: "/data-preparation-integration" },
  { label: "Data Pipeline & Dashboard Setup", href: "/data-pipeline-dashboard-setup" },
  { label: "E-Commerce Intelligence Dashboard", href: "/e-commerce-intelligence-dashboard" },
];

/* ---------- What We Do section ---------- */

export function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className="scroll-mt-20 border-y border-border bg-white py-16 sm:py-24"
    >
      <div className="container-site">
        {/* 1 · Section header */}
        <FadeIn className="flex flex-col items-start">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-heading">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
            {EYEBROW}
          </span>
          <h2
            id="what-we-do-heading"
            className="mt-4 text-3xl font-semibold leading-tight text-heading sm:text-4xl"
          >
            {TITLE_LEAD} <span className="text-brand">{TITLE_ACCENT}</span> {TITLE_TAIL}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-body-text sm:text-lg">
            {INTRO}
          </p>
        </FadeIn>

        {/* 2 · Platform strip */}
        <FadeIn className="mt-8 sm:mt-10" delay={60}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-[5px] border border-border bg-white px-5 py-4">
            {PLATFORMS.map((platform) => (
              <span
                key={platform}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-heading/75 sm:text-sm"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                />
                {platform}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* 3 · The Problem */}
        <FadeIn className="mt-14 sm:mt-20" delay={60}>
          <SubHeading num="01" lead="The Problem:" rest="Too Much Data, Zero Clarity" />

          <div className="mt-6 max-w-3xl space-y-4">
            <p className="text-sm leading-relaxed text-body-text sm:text-base">
              {PROBLEM_PARA_1}
            </p>
          </div>

          <div className="mt-6 flex max-w-3xl items-start gap-3 rounded-[5px] border border-border border-l-4 border-l-brand bg-white p-5">
            <TriangleAlert
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-brand"
            />
            <p className="text-sm font-semibold leading-relaxed text-heading">
              {PROBLEM_CALLOUT}
            </p>
          </div>

          {/* Siloed platform cards */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEM_CARDS.map((card, i) => {
              const Icon = PROBLEM_CARD_ICONS[i % PROBLEM_CARD_ICONS.length];
              return (
                <article
                  key={card.title}
                  className="group flex flex-col rounded-[5px] border border-heading/20 border-l-4 border-l-brand bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-heading/60 hover:shadow-[0_18px_44px_rgba(31,31,31,0.10)]"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-heading text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 text-[15px] font-semibold leading-snug text-heading">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-body-text">{card.body}</p>
                </article>
              );
            })}
          </div>
        </FadeIn>

        {/* 4 · How We Work */}
        <FadeIn className="mt-14 sm:mt-20" delay={60}>
          <SubHeading
            lead="How We Work:"
            rest="Diagnose → Fix → Grow"
          />
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-body-text sm:text-base">
            {HOW_WE_WORK_LEAD}
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {STEPS.map((step) => {
              const Icon = step.Icon;
              return (
                <article
                  key={step.label}
                  className="group flex h-full flex-col rounded-[5px] border border-heading/20 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-heading/60 hover:shadow-[0_18px_44px_rgba(31,31,31,0.10)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[5px] bg-brand text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold tracking-[0.12em] text-brand">
                      {step.label}
                    </span>
                  </div>
                  <h4 className="mt-4 text-base font-semibold leading-snug text-heading">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-body-text">{step.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2 pt-1">
                    {step.ctas.map((cta) => (
                      <CtaPill key={cta.href + cta.label} href={cta.href}>
                        {cta.label}
                      </CtaPill>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </FadeIn>

        {/* 5 · The Foundation */}
        <FadeIn className="mt-14 sm:mt-20" delay={60}>
          <SubHeading
            num="02"
            lead="The Foundation:"
            rest="One Source of Truth. Complete Business Visibility."
          />

          <div className="mt-6 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[5px] bg-heading text-white"
            >
              <Database className="h-6 w-6" />
            </span>
            <div>
              <p className="max-w-3xl text-sm leading-relaxed text-body-text sm:text-base">
                {FOUNDATION_PARA}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {FOUNDATION_CTAS.map((cta) => (
                  <CtaPill key={cta.href + cta.label} href={cta.href}>
                    {cta.label}
                  </CtaPill>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- CTA pill ---------- */
function CtaPill({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-heading transition-colors hover:border-brand hover:bg-brand/10 hover:text-brand"
    >
      {children}
    </a>
  );
}

/* ---------- SubHeading ---------- */
function SubHeading({
  num,
  lead,
  rest,
}: {
  num?: string;
  lead: string;
  rest: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-1.5 h-6 w-1 shrink-0 rounded-[2px] bg-brand"
      />
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
          <span className="text-brand">{rest}</span>
        </h3>
      </div>
    </div>
  );
}
