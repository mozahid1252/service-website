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
  ArrowRight,
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
const INTRO =
  "MozIntelligence — E-Commerce Growth Intelligence Partner. Analytics, Automation & Profitability for Shopify and DTC Brands. We uncover where your store is leaking profit, fix what's holding it back, and partner with you to drive sustainable growth.";

const PLATFORMS = [
  { name: "Shopify / E-Commerce Platform", color: "from-cyan-500 to-blue-500" },
  { name: "Google Analytics 4", color: "from-amber-500 to-orange-500" },
  { name: "Meta & Google & TikTok Ads", color: "from-violet-500 to-purple-500" },
  { name: "Klaviyo", color: "from-emerald-500 to-teal-500" },
];

const PROBLEM_PARA_1 =
  "More revenue doesn't automatically mean more profit. Your business data is scattered across disconnected platforms. Meanwhile, hidden profit leaks — from excessive discounts and unmonitored refunds to rising shipping costs and wasted ad spend — quietly erode your margins.";
const PROBLEM_CALLOUT =
  "Your data tells a story. We help you understand what it's really costing you.";

const PROBLEM_CARDS: { title: string; body: string; color: string }[] = [
  { title: "Shopify / E-Commerce Platform", body: "Your core sales, orders, and product data.", color: "from-cyan-500 to-blue-500" },
  { title: "Google Analytics 4", body: "Your traffic, sessions, and funnel behavior.", color: "from-amber-500 to-orange-500" },
  { title: "Meta & Google & TikTok Ads", body: "Your ad spend, CAC, and campaign performance.", color: "from-violet-500 to-purple-500" },
  { title: "Klaviyo", body: "Your retention, LTV, and repeat-buyer data.", color: "from-emerald-500 to-teal-500" },
];

const PROBLEM_CARD_ICONS: LucideIcon[] = [ShoppingBag, BarChart3, Megaphone, Mail];

const HOW_WE_WORK_LEAD =
  "We turn fragmented business data into actionable intelligence, measurable improvements, and sustainable growth.";

type CtaLink = { label: string; href: string };

const STEPS: {
  label: string;
  num: string;
  Icon: LucideIcon;
  title: string;
  body: string;
  ctas: CtaLink[];
  accent: string;        // gradient classes (e.g. "from-cyan-500 to-blue-600")
  accentSoft: string;    // soft bg (e.g. "from-cyan-50 to-blue-50")
  glow: string;          // shadow glow color rgba
  ring: string;          // border color on hover
}[] = [
  {
    label: "Diagnose",
    num: "01",
    Icon: ScanSearch,
    title: "Find Where Your Profit Is Leaking.",
    body: "We integrate your Shopify, GA4, advertising, and customer data to uncover the real drivers of your profitability. We analyze product margins, channel profitability, customer acquisition costs, retention, and purchasing behavior. You receive a clear business scorecard and a prioritized action roadmap.",
    ctas: [
      { label: "Health Check", href: "/health-check" },
      { label: "Specialized Audits", href: "#part-2" },
    ],
    accent: "from-cyan-500 to-blue-600",
    accentSoft: "from-cyan-50 to-blue-50",
    glow: "rgba(6,182,212,0.35)",
    ring: "hover:border-cyan-400",
  },
  {
    label: "Fix",
    num: "02",
    Icon: Wrench,
    title: "Turn Insights Into Measurable Results.",
    body: "We implement high-impact improvements based on your business priorities. From repairing broken tracking and reallocating ad spend to improving conversion, retention, pricing, and product performance — we help turn recommendations into action.",
    ctas: [
      { label: "Performance Improvement", href: "/performance-improvement" },
      { label: "Marketing Measurement & Attribution", href: "/e-commerce-tracking-attribution-review" },
    ],
    accent: "from-violet-500 to-purple-600",
    accentSoft: "from-violet-50 to-purple-50",
    glow: "rgba(139,92,246,0.35)",
    ring: "hover:border-violet-400",
  },
  {
    label: "Grow",
    num: "03",
    Icon: TrendingUp,
    title: "Your Ongoing Growth Intelligence Partner.",
    body: "We continuously monitor performance, identify emerging opportunities, track profitability, and support strategic decisions through ongoing analytics and testing.",
    ctas: [{ label: "Growth Partnership", href: "/growth-partnership" }],
    accent: "from-emerald-500 to-teal-600",
    accentSoft: "from-emerald-50 to-teal-50",
    glow: "rgba(16,185,129,0.35)",
    ring: "hover:border-emerald-400",
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
      className="relative scroll-mt-20 overflow-hidden border-y border-border bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-24"
    >
      {/* Decorative background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-violet-200/20 blur-3xl" />

      <div className="container-site relative">
        {/* 1 · Section header */}
        <FadeIn className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-cyan-700">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            {EYEBROW}
          </span>
          <h2
            id="what-we-do-heading"
            className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-heading sm:text-4xl md:text-5xl"
          >
            What MozIntelligence <span className="bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">Actually</span> Does
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-body-text sm:text-lg">
            {INTRO}
          </p>
        </FadeIn>

        {/* 2 · Platform strip */}
        <FadeIn className="mt-10" delay={60}>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-white/80 px-6 py-4 shadow-sm backdrop-blur-sm">
            {PLATFORMS.map((platform) => (
              <span
                key={platform.name}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-4 py-2 text-xs font-bold text-white shadow-md sm:text-sm",
                  platform.color,
                )}
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white/90" />
                {platform.name}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* 3 · The Problem */}
        <FadeIn className="mt-16 sm:mt-24" delay={60}>
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-rose-600">
              <span aria-hidden="true" className="h-px w-8 bg-rose-300" />
              The Problem
            </span>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
              Too Much Data, <span className="text-rose-600">Zero Clarity</span>
            </h3>
          </div>

          <div className="mx-auto max-w-3xl">
            <p className="text-center text-sm leading-relaxed text-body-text sm:text-base">
              {PROBLEM_PARA_1}
            </p>
          </div>

          {/* Callout */}
          <div className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-orange-50 p-5 shadow-sm">
            <TriangleAlert aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-rose-500" />
            <p className="text-sm font-bold leading-relaxed text-heading sm:text-base">
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
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  {/* Top gradient accent line */}
                  <span aria-hidden="true" className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", card.color)} />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md",
                      card.color,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 text-[15px] font-bold leading-snug text-heading">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-body-text">{card.body}</p>
                </article>
              );
            })}
          </div>
        </FadeIn>

        {/* 4 · How We Work */}
        <FadeIn className="mt-16 sm:mt-24" delay={60}>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
              <span aria-hidden="true" className="h-px w-8 bg-cyan-300" />
              How We Work
            </span>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
              Diagnose <span className="text-cyan-600">→</span> Fix <span className="text-violet-600">→</span> <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Grow</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-body-text sm:text-base">
              {HOW_WE_WORK_LEAD}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {STEPS.map((step) => {
              const Icon = step.Icon;
              const primary = step.ctas[0];
              const secondary = step.ctas.slice(1);
              return (
                <article
                  key={step.label}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
                    step.ring,
                  )}
                >
                  {/* Top gradient header bar */}
                  <span aria-hidden="true" className={cn("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r", step.accent)} />

                  {/* Step number + icon */}
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                        step.accent,
                      )}
                      style={{ boxShadow: `0 8px 24px -4px ${step.glow}` }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="flex flex-col items-end">
                      <span className="text-2xl font-extrabold text-heading/10">{step.num}</span>
                      <span className={cn("-mt-4 bg-gradient-to-r bg-clip-text text-sm font-bold uppercase tracking-wider text-transparent", step.accent)}>
                        {step.label}
                      </span>
                    </span>
                  </div>

                  <h4 className="mt-5 text-lg font-bold leading-snug text-heading">
                    {step.title}
                  </h4>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-body-text">
                    {step.body}
                  </p>

                  {/* CTAs */}
                  <div className="mt-6 space-y-2.5">
                    {/* Primary CTA — gradient button */}
                    <GradientCta href={primary.href} accent={step.accent} glow={step.glow}>
                      {primary.label}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </GradientCta>
                    {/* Secondary CTAs — outline pills */}
                    {secondary.map((cta) => (
                      <a
                        key={cta.href + cta.label}
                        href={cta.href}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-white px-4 py-2.5 text-xs font-semibold text-heading transition-all duration-200 hover:border-heading/40 hover:bg-slate-50"
                      >
                        {cta.label}
                      </a>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </FadeIn>

        {/* 5 · The Foundation */}
        <FadeIn className="mt-16 sm:mt-24" delay={60}>
          <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-8 shadow-lg sm:p-10">
            {/* Decorative accent */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-amber-200/30 blur-2xl" />

            <div className="relative grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-8">
              <span
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg"
                style={{ boxShadow: "0 8px 24px -4px rgba(245,158,11,0.4)" }}
              >
                <Database className="h-7 w-7" />
              </span>
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                  <span aria-hidden="true" className="h-px w-8 bg-amber-300" />
                  The Foundation
                </span>
                <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-heading sm:text-3xl">
                  One Source of Truth. <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Complete Business Visibility.</span>
                </h3>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-body-text sm:text-base">
                  {FOUNDATION_PARA}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {FOUNDATION_CTAS.map((cta) => (
                    <a
                      key={cta.href + cta.label}
                      href={cta.href}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/30"
                    >
                      {cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- Gradient CTA button ---------- */
function GradientCta({
  href,
  children,
  accent,
  glow,
}: {
  href: string;
  children: ReactNode;
  accent: string;
  glow: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5",
        accent,
      )}
      style={{ boxShadow: `0 4px 14px -2px ${glow}` }}
    >
      {children}
    </a>
  );
}
