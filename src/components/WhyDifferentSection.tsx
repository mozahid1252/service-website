/* ==========================================================================
   WhyDifferentSection.tsx — ALL-IN-ONE (data + components + markup)
   "Why MozIntelligence is Different" — strategic edge + capability matrix
   --------------------------------------------------------------------------
   Dependencies : react, lucide-react, Tailwind CSS v4
   Usage        : <WhyDifferentSection />  — no props needed
   Notes        : No "use client" needed (zero state, hover = pure CSS).
                  No Next.js imports — pure React, usable in ANY project.
   ========================================================================== */

import { Fragment } from "react";
import { Check, Database, Eye, Star, Target, TrendingUp } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   1) CSS DESIGN TOKENS — paste into your globals.css (Tailwind v4 @theme)
   ──────────────────────────────────────────────────────────────────────────

@theme {
  --color-brand: #6f3ede;
  --color-btn-purple: #9d3af9;
  --color-btn-purple-hover: #8124d8;
  --color-surface-soft: #f2f0fe;
  --color-surface-card: #edf4ff;
  --color-heading: #1f1f1f;
  --color-body-text: #4d4d4d;
  --color-coral: #ff7d7d;
  --color-border: #e5e0f5;
}

.container-site {
  @apply mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8;
}

.scrollbar-slim::-webkit-scrollbar { width: 6px; height: 6px; }
.scrollbar-slim::-webkit-scrollbar-thumb { background: #c9bcf1; border-radius: 999px; }
.scrollbar-slim::-webkit-scrollbar-track { background: transparent; }

   ────────────────────────────────────────────────────────────────────────── */

/* ── tiny classname helper (no clsx dependency) ── */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ═══════════════ 2) DATA (100% verbatim — edit copy here) ═══════════════ */

export interface CapabilityRow {
  category: "Business Intelligence" | "Data Infrastructure" | "Strategic Advisory" | "Implementation";
  name: string;
  builtIn: string;
  apps: string;
  moz: string;
}

const whyDifferent = {
  lead: "Why MozIntelligence is Different",
  title: "The Strategic Edge In E-Commerce Analytics",
  intro:
    "Your existing platforms collect data, and various apps provide specialized metrics. However, MozIntelligence transcends traditional reporting by integrating deep business analysis, robust data infrastructure, and strategic implementation support into a single, unified solution.",
  chips: [
    { value: "24+", label: "Capabilities" },
    { value: "Multiple → 1", label: "Tools Unified" },
    { value: "∞", label: "Custom Analysis" },
  ],
  dashboard: { headline: "TRUE NET PROFIT", value: "+47.2%", steps: ["Collect", "Analyze", "Act"] },
  matrixTitle: "Capability Matrix",
  matrixSubtitle: "A Clear Comparison of What You're Really Getting",
  matrix: [
    { category: "Business Intelligence", name: "KPI & Custom Dashboards", builtIn: "⚠ Limited (Live View + Overview)", apps: "✓ Available (Limited Depth)", moz: "✓ Custom KPI Dashboards & Executive Views" },
    { category: "Business Intelligence", name: "Sales & Revenue Analysis", builtIn: "⚠ Basic", apps: "✓ Advanced", moz: "✓ Deep Business & Profitability Analysis" },
    { category: "Business Intelligence", name: "Conversion Funnel Analysis", builtIn: "⚠ Basic", apps: "✓ Available (Limited Depth)", moz: "✓ Root-Cause Analysis & Drop-off Fixes" },
    { category: "Business Intelligence", name: "Customer Segmentation", builtIn: "⚠ Basic (Native RFM Scoring)", apps: "✓ Available (Limited Depth)", moz: "✓ Full RFM + Advanced Business Strategy" },
    { category: "Business Intelligence", name: "Customer Cohort Analysis", builtIn: "⚠ Limited", apps: "✓ Available (Limited Depth)", moz: "✓ Multi-Dimensional Cohort & LTV Analysis" },
    { category: "Business Intelligence", name: "Customer Lifetime Value (LTV)", builtIn: "⚠ Limited", apps: "✓ Available (Limited Depth)", moz: "✓ Granular Cohort & Channel-Level LTV" },
    { category: "Business Intelligence", name: "Churn Risk Identification", builtIn: "✕ Not Available", apps: "⚠ Some Apps", moz: "✓ Predictive AI Churn Risk Analysis" },
    { category: "Business Intelligence", name: "Product Performance Analysis", builtIn: "⚠ Basic", apps: "✓ Available (Limited Depth)", moz: "✓ Growth & Inventory Opportunity Analysis" },
    { category: "Business Intelligence", name: "Product Profitability Analysis", builtIn: "⚠ Limited (Gross Profit Only)", apps: "⚠ Some Apps", moz: "✓ True Product-Level Net Profitability" },
    { category: "Business Intelligence", name: "True Net Profit (After Ads/Fees)", builtIn: "✕ Not Available", apps: "⚠ Some Apps", moz: "✓ Real-Time True Profitability Analysis" },
    { category: "Business Intelligence", name: "Marketing Performance Analysis", builtIn: "⚠ Basic", apps: "✓ Available (Limited Depth)", moz: "✓ Cross-Channel ROI & Strategy Recommendations" },
    { category: "Business Intelligence", name: "Cross-Sell & Upsell Analysis", builtIn: "⚠ Limited (Product & Order Data)", apps: "✓ Available (Limited Depth)", moz: "✓ Big Opportunity Identification & Strategy" },
    { category: "Business Intelligence", name: "Operations Efficiency Analysis", builtIn: "✕ Not Available", apps: "⚠ Specialized Tools Only", moz: "✓ Operational Efficiency & Cost Optimization" },
    { category: "Business Intelligence", name: "Custom Business Analysis", builtIn: "✕ Not Available", apps: "⚠ Limited", moz: "✓ Bespoke Analysis for Your Business Questions" },
    { category: "Business Intelligence", name: "Custom KPI Framework", builtIn: "⚠ Basic", apps: "✓ Available (Limited Depth)", moz: "✓ Business-Specific KPI Ecosystem" },
    { category: "Business Intelligence", name: "Multi-Store Analytics", builtIn: "⚠ Limited (Plan Dependent)", apps: "✓ Available (Limited Depth)", moz: "✓ Unified Multi-Store Global Analysis" },
    { category: "Business Intelligence", name: "Cross-Platform Business Analysis", builtIn: "✕ Not Available", apps: "⚠ Requires Multiple Apps", moz: "✓ Unified Cross-Platform Business Intelligence" },
    { category: "Data Infrastructure", name: "Cloud Data Infrastructure", builtIn: "✕ Not Available", apps: "⚠ Separate Platform Required", moz: "✓ Enterprise-Grade Infrastructure Included" },
    { category: "Data Infrastructure", name: "Data Pipeline Engineering", builtIn: "✕ Not Available", apps: "⚠ Separate Platform Required", moz: "✓ Fully Managed & Automated Data Pipelines" },
    { category: "Data Infrastructure", name: "Multi-Platform Data Integration", builtIn: "✕ Not Available", apps: "⚠ Separate Platform Required", moz: "✓ Seamless Ads, ERP, & CRM Integration" },
    { category: "Data Infrastructure", name: "Data Cleaning & Standardization", builtIn: "✕ Not Available", apps: "⚠ Varies", moz: "✓ Continuous Data Auditing & Cleaning" },
    { category: "Data Infrastructure", name: "Automated Data Refresh", builtIn: "⚠ Platform Dependent", apps: "✓ Available (Limited Depth)", moz: "✓ Real-Time Automated Data Refresh" },
    { category: "Strategic Advisory", name: "Strategic Recommendations", builtIn: "⚠ Basic (Platform Insights)", apps: "⚠ Limited", moz: "✓ Strategic Advisory & Actionable Roadmaps" },
    { category: "Implementation", name: "Implementation Support", builtIn: "✕ Not Available", apps: "⚠ Usually Separate", moz: "✓ Full Done-for-You Implementation" },
  ] satisfies CapabilityRow[],
  answer: {
    label: "The Strategic Answer",
    titleLead: "Why",
    titleRest: "MozIntelligence?",
    text: "You don't need to replace your existing tools. Your platforms already collect the data. MozIntelligence helps you connect it, uncover what is actually happening, identify the highest-impact opportunities, and turn those findings into clear, profitable business actions.",
    steps: [
      { icon: Database, name: "Connect", desc: "Unify every data source." },
      { icon: Eye, name: "Uncover", desc: "Reveal what's real." },
      { icon: Target, name: "Identify", desc: "Find highest-impact moves." },
      { icon: TrendingUp, name: "Act", desc: "Turn insight into profit." },
    ],
  },
  tiers: {
    label: "The Difference at a Glance",
    titleLead: "Three Tiers.",
    titleRest: "One Clear Winner.",
    subtitle: "The evolution from basic reporting to specialized metrics to true strategic intelligence.",
    items: [
      {
        badge: "Tier 1",
        name: "Built-In Analytics",
        tagline: "Basic Reporting",
        what: "What it does",
        action: "Collect & Report",
        points: [
          { ok: "yes", text: "Platform-native metrics" },
          { ok: "warn", text: "Limited live view" },
          { ok: "no", text: "No strategic layer" },
        ],
      },
      {
        badge: "Tier 2",
        name: "Other Analytics Apps",
        tagline: "Limited Specialized Metrics",
        what: "What it does",
        action: "Measure & Monitor — Tool-Specific Metrics",
        points: [
          { ok: "warn", text: "Multiple apps required" },
          { ok: "no", text: "No unified infrastructure" },
        ],
      },
      {
        badge: "Tier 3 · Best",
        name: "MozIntelligence",
        tagline: "Advanced BI + Strategy",
        what: "What it does",
        action: "Analyze, Diagnose & Act",
        points: [
          { ok: "yes", text: "Unified cross-platform intelligence" },
          { ok: "yes", text: "Enterprise-grade infrastructure" },
          { ok: "yes", text: "Strategic advisory & roadmaps" },
        ],
      },
    ],
    implementation: {
      title: "Implementation Support",
      subtitle: "Done-for-You Implementation",
      rows: [
        { tier: "Built-In Analytics", verdict: "no", text: "Not Available" },
        { tier: "Other Analytics Apps", verdict: "warn", text: "Usually Separate" },
        { tier: "MozIntelligence", verdict: "yes", text: "Full Done-for-You Implementation" },
      ],
    },
  },
};

/* ── group capability matrix rows by category for cleaner table rendering ── */
const matrixGroups: { category: string; rows: CapabilityRow[] }[] = [];
for (const row of whyDifferent.matrix) {
  const last = matrixGroups[matrixGroups.length - 1];
  if (last && last.category === row.category) {
    last.rows.push(row);
  } else {
    matrixGroups.push({ category: row.category, rows: [row] });
  }
}

/* ═══════════════ 3) SMALL COMPONENTS ═══════════════ */

/* Colorize leading status glyphs inside matrix cells (⚠ yellow, ✕ red) */
function MatrixCell({ value }: { value: string }) {
  if (value.startsWith("⚠") || value.startsWith("✕")) {
    return (
      <span className="text-body-text">
        <span
          className={
            value.startsWith("⚠")
              ? "font-semibold text-amber-500"
              : "font-semibold text-red-600"
          }
        >
          {value.charAt(0)}
        </span>
        {value.slice(1)}
      </span>
    );
  }
  return <span className="text-body-text">{value}</span>;
}

/* Dual-color section heading — kicker pill + heading + optional description */
function SectionHeading({
  kicker,
  lead,
  rest,
  title,
  description,
  className,
}: {
  kicker?: string;
  lead?: string;
  rest?: string;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 items-center text-center", className)}>
      {kicker ? (
        <span className="inline-flex items-center rounded-full bg-surface-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          {kicker}
        </span>
      ) : null}
      <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-heading sm:text-4xl">
        {lead ? <span className="text-brand">{lead}</span> : null}
        {lead && rest ? " " : null}
        {rest ? <span>{rest}</span> : null}
        {!lead && !rest && title ? <span>{title}</span> : null}
      </h2>
      {description ? <p className="max-w-2xl text-base leading-relaxed text-body-text mx-auto">{description}</p> : null}
    </div>
  );
}

/* ═══════════════ 4) THE SECTION ═══════════════ */

export function WhyDifferentSection() {
  return (
    <section id="why-were-different" aria-labelledby="why-different-heading" className="bg-white py-16 sm:py-24">
      <div className="container-site">
        {/* ── Intro: copy left, live dashboard right ── */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <span className="inline-flex items-center rounded-full bg-surface-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {whyDifferent.lead}
            </span>
            <h2
              id="why-different-heading"
              className="mt-4 text-3xl font-semibold leading-tight text-heading sm:text-4xl"
            >
              <span className="text-brand">The Strategic Edge</span> In E-Commerce Analytics
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-body-text">
              {whyDifferent.intro}
            </p>

            {/* Stat cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {whyDifferent.chips.map((chip) => (
                <div
                  key={chip.label}
                  className="rounded-[5px] border border-border bg-white p-5 text-center shadow-[0_10px_28px_rgba(111,62,222,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(111,62,222,0.16)]"
                >
                  <p className="text-2xl font-semibold text-brand sm:text-[28px]">{chip.value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-body-text">
                    {chip.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard mock — browser chrome + bar chart + flow steps */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[12px] bg-brand/10 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[8px] bg-gradient-to-br from-[#160b38] via-[#2a1560] to-brand p-6 text-white shadow-[0_24px_60px_rgba(22,11,56,0.4)] sm:p-8">
              {/* window chrome */}
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              </div>

              {/* headline + value */}
              <div className="mt-6 flex items-end justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                  {whyDifferent.dashboard.headline}
                </p>
                <p className="text-3xl font-semibold">{whyDifferent.dashboard.value}</p>
              </div>

              {/* bar chart */}
              <div
                className="mt-5 flex h-32 items-end gap-2.5 border-b border-white/15 pb-px"
                aria-hidden="true"
              >
                {[42, 58, 48, 74, 63, 88, 97].map((h, i) => (
                  <span
                    key={i}
                    className="w-full rounded-t-[3px] bg-gradient-to-t from-[#9d3af9]/30 via-[#9d3af9]/60 to-[#c9b2ff] transition-all duration-300 hover:from-[#9d3af9]/60 hover:to-white"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              {/* flow steps with connectors */}
              <ol className="mt-5 flex items-center justify-between text-xs font-medium text-white/85">
                {whyDifferent.dashboard.steps.map((s, i) => (
                  <Fragment key={s}>
                    {i > 0 ? (
                      <span aria-hidden="true" className="h-px w-5 shrink-0 bg-white/25 sm:w-8" />
                    ) : null}
                    <li className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-[11px] font-semibold">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  </Fragment>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Capability Matrix — grouped by category, winner column highlighted */}
        <div className="mt-20">
          <SectionHeading
            kicker={whyDifferent.matrixTitle}
            title={whyDifferent.matrixSubtitle}
            className="max-w-none uppercase [&>p]:max-w-none [&>h2]:max-w-none [&>h2]:tracking-tight [&>h2]:text-xl sm:[&>h2]:text-2xl md:[&>h2]:whitespace-nowrap lg:[&>h2]:text-3xl xl:[&>h2]:text-4xl"
          />

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-body-text">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5">
              <span className="font-semibold text-brand">✓</span> Full capability
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5">
              <span className="font-semibold text-amber-600">⚠</span> Limited / platform dependent
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5">
              <span className="font-semibold text-coral">✕</span> Not available
            </span>
          </div>

          <div className="mt-8 max-h-[560px] overflow-auto rounded-[5px] border border-border scrollbar-slim">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Capability comparison across Built-In Analytics, Other Analytics Apps, and MozIntelligence
              </caption>
              <thead className="sticky top-0 z-10">
                <tr>
                  <th scope="col" className="bg-[#160b38] px-5 py-4 font-semibold text-white">Capability</th>
                  <th scope="col" className="bg-[#160b38] px-5 py-4 font-semibold text-white/85">Built-In Analytics</th>
                  <th scope="col" className="bg-[#160b38] px-5 py-4 font-semibold text-white/85">Other Analytics Apps</th>
                  <th scope="col" className="bg-[#4a378f] px-5 py-4 font-semibold text-white">MozIntelligence</th>
                </tr>
              </thead>
              <tbody>
                {matrixGroups.map((group) => (
                  <Fragment key={group.category}>
                    {/* category group row */}
                    <tr>
                      <th
                        colSpan={4}
                        scope="colgroup"
                        className="bg-surface-soft px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand"
                      >
                        {group.category}
                      </th>
                    </tr>
                    {group.rows.map((row, i) => (
                      <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-surface-soft/60"}>
                        <th scope="row" className="px-5 py-3 font-semibold text-heading">
                          {row.name}
                        </th>
                        <td className="px-5 py-3"><MatrixCell value={row.builtIn} /></td>
                        <td className="px-5 py-3"><MatrixCell value={row.apps} /></td>
                        <td className="bg-brand/[0.06] px-5 py-3 font-medium text-brand">{row.moz}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategic answer steps */}
        <div className="mt-16">
          <SectionHeading
            kicker={whyDifferent.answer.label}
            lead={whyDifferent.answer.titleLead}
            rest={whyDifferent.answer.titleRest}
            description={whyDifferent.answer.text}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyDifferent.answer.steps.map((s, i) => (
              <div
                key={s.name}
                className="relative rounded-[5px] border border-border bg-surface-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_18px_44px_rgba(111,62,222,0.16)]"
              >
                <span className="absolute right-5 top-5 text-3xl font-semibold text-brand/15" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                  <s.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-heading">{s.name}</h3>
                <p className="mt-1.5 text-sm text-body-text">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Three tiers */}
        <div className="mt-16">
          <SectionHeading
            kicker={whyDifferent.tiers.label}
            lead={whyDifferent.tiers.titleLead}
            rest={whyDifferent.tiers.titleRest}
            description={whyDifferent.tiers.subtitle}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {whyDifferent.tiers.items.map((tier) => {
              const best = tier.badge.includes("Best");
              return (
                <article
                  key={tier.badge}
                  className={
                    best
                      ? "relative rounded-[5px] border-2 border-brand bg-white p-7 shadow-[0_18px_44px_rgba(111,62,222,0.18)]"
                      : "rounded-[5px] border border-border bg-surface-card p-7"
                  }
                >
                  {best ? (
                    <span className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-btn-purple px-3.5 py-1.5 text-xs font-semibold text-white">
                      <Star className="h-3.5 w-3.5" aria-hidden="true" /> Recommended
                    </span>
                  ) : null}
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                    {tier.badge}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-heading">{tier.name}</h3>
                  <p className="text-sm font-medium text-body-text">{tier.tagline}</p>
                  <div className="mt-4 rounded-[5px] bg-surface-soft p-4">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-body-text">
                      {tier.what}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-heading">{tier.action}</p>
                  </div>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {tier.points.map((p) => (
                      <li key={p.text} className="flex items-start gap-2.5 text-sm text-body-text">
                        <span
                          aria-hidden="true"
                          className={
                            p.ok === "yes"
                              ? "mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-brand/10 font-semibold text-brand"
                              : p.ok === "warn"
                                ? "mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-semibold text-amber-700"
                                : "mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-coral/10 text-[10px] font-semibold text-coral"
                          }
                        >
                          {p.ok === "yes" ? <Check className="h-3 w-3" /> : p.ok === "warn" ? "⚠" : "✕"}
                        </span>
                        {p.text}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          {/* Implementation support row */}
          <div className="mt-8 overflow-hidden rounded-[5px] border border-border">
            <div className="bg-brand px-6 py-4 text-white">
              <h3 className="text-lg font-semibold">{whyDifferent.tiers.implementation.title}</h3>
              <p className="text-sm text-white/85">{whyDifferent.tiers.implementation.subtitle}</p>
            </div>
            <div className="grid bg-white sm:grid-cols-3">
              {whyDifferent.tiers.implementation.rows.map((r) => (
                <div key={r.tier} className="border-b border-border px-6 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <p className="text-sm font-semibold text-heading">{r.tier}</p>
                  <p
                    className={
                      r.verdict === "yes"
                        ? "mt-1 text-sm font-medium text-brand"
                        : r.verdict === "warn"
                          ? "mt-1 text-sm text-amber-700"
                          : "mt-1 text-sm text-coral"
                    }
                  >
                    {r.verdict === "yes" ? "✓" : r.verdict === "warn" ? "⚠" : "✕"} {r.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyDifferentSection;
