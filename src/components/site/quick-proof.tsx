"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Quote } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Local class-join helper — replaces the "@/lib/utils" import        */
/* ------------------------------------------------------------------ */
type ClassValue = string | number | false | null | undefined;
function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/* DATA — inlined verbatim (no "@/lib/site-data" import needed)       */
/* Every number/text comes straight from the real client results      */
/* ------------------------------------------------------------------ */
export const quickProof = {
  lead: "Quick Proof",
  titleLead: "The Money Was Always There.",
  titleRest: "Nobody Was Looking.",
  /* Aggregate ribbon — every number is taken straight from the cases below */
  summary: [
    { value: "3", label: "Stores" },
    { value: "+$19,430/mo", label: "Combined Profit Improvement" },
    { value: "4.8–8.2×", label: "Return Range" },
    { value: "60–90 days", label: "Time to Result" },
  ],
  cases: [
    {
      store: "Hearth & Haven Home",
      niche: "Home Decor & Lifestyle · Shopify",
      result:
        "$6,140/month net profit improvement within 60 days. Marketing spend was redirected toward stronger acquisition sources, while product margins and discount leakage were reviewed.",
      quote: "I finally understood which sales were actually contributing to profit.",
      author: "Maya R., Founder, Hearth & Haven Home",
      metrics: [
        { value: "$800", label: "Investment" },
        { value: "60 days", label: "Timeline" },
        { value: "+$3,840/mo", label: "Profit Added" },
        { value: "4.8×", label: "ROI" },
      ],
    },
    {
      store: "Paws & Parcel Co.",
      niche: "Pet Supplies · Shopify + Meta Ads",
      result:
        "$11,920/month net profit improvement within 75 days. Customer segments were reorganized, acquisition targeting was refined, and a repeat-purchase workflow was introduced.",
      quote:
        "We were focused on acquiring more customers, but the bigger opportunity was improving customer value after the first purchase.",
      author: "Daniel M., Founder, Paws & Parcel Co.",
      metrics: [
        { value: "$900", label: "Investment" },
        { value: "75 days", label: "Timeline" },
        { value: "+$6,570/mo", label: "Profit Added" },
        { value: "7.3×", label: "ROI" },
      ],
    },
    {
      store: "LUMERA Skin & Co.",
      niche: "Skincare & Beauty · Shopify + Google Ads",
      result:
        "$15,280/month net profit improvement within 90 days. Budget allocation, product bundling, margin pressure, and discount strategy were reviewed and improved.",
      quote:
        "The review showed us that revenue growth alone was not enough. We needed healthier margins and better customer economics.",
      author: "Nadia S., Founder, LUMERA Skin & Co.",
      metrics: [
        { value: "$1,100", label: "Investment" },
        { value: "90 days", label: "Timeline" },
        { value: "+$9,020/mo", label: "Profit Added" },
        { value: "8.2×", label: "ROI" },
      ],
    },
  ],
  cta: { label: "See The Full Case Studies", href: "/#case-studies" },
};

export type QuickProofData = typeof quickProof;

/* Colour system: black editorial base · green = money outcomes · blue = neutral facts · purple = attribution */
const POSITIVE_LABELS = new Set(["Profit Added", "ROI", "Combined Profit Improvement", "Return Range"]);

function toneClass(label: string): string {
  return POSITIVE_LABELS.has(label) ? "text-[#047857]" : "text-[#1d4ed8]";
}

/**
 * Quick Proof — three mini case results rendered as an evidence strip:
 * a boxed aggregate summary ribbon, editorial white-board cards with a
 * 4px black side edge + monogram identity, boxed metric tiles and a
 * bottom-anchored quote (purple attribution). Motion: staggered entrance
 * reveal (IntersectionObserver), matching the featured case-studies gallery.
 */
export function QuickProofSection() {
  const data = quickProof;
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [settled, setSettled] = useState(false);

  /* Reveal animation once the section scrolls into view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* After the entrance stagger finishes, hand over to snappy hover timings */
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setSettled(true), data.cases.length * 90 + 900);
    return () => clearTimeout(t);
  }, [inView, data.cases.length]);

  return (
    <section id="quick-proof"
      ref={sectionRef}
      aria-labelledby="quick-proof-heading"
      className="border-y border-border bg-white py-16 sm:py-24"
    >
      <div className="container-site">
        {/* Editorial header */}
        <div
          className={cn(
            "flex flex-col items-center text-center transition-all",
            settled ? "duration-300" : "duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-heading">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#047857]" />
            {data.lead}
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </span>
          <h2
            id="quick-proof-heading"
            className="mt-4 text-2xl font-semibold leading-tight text-heading lg:text-3xl lg:whitespace-nowrap"
          >
            <span>{data.titleLead}</span>{" "}
            <span>{data.titleRest}</span>
          </h2>
        </div>

        {/* Aggregate summary ribbon — compact stat pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {data.summary.map((s, i) => (
            <div
              key={s.label}
              style={{ transitionDelay: settled ? "0ms" : `${120 + i * 70}ms` }}
              className={cn(
                "flex items-baseline gap-1.5 rounded-full border border-border bg-white px-4 py-2 shadow-sm transition-all",
                settled ? "duration-300" : "duration-700",
                inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              )}
            >
              <span className={cn("text-sm font-bold tabular-nums sm:text-base", toneClass(s.label))}>
                {s.value}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-body-text/70 sm:text-[11px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Evidence cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {data.cases.map((c, i) => {
            /* Bold the opening money result — the single most important line */
            const dotIdx = c.result.indexOf(". ");
            const leadIn = dotIdx === -1 ? c.result : c.result.slice(0, dotIdx);
            const tail = dotIdx === -1 ? "" : c.result.slice(dotIdx);
            return (
              <article
                key={c.store}
                style={{ transitionDelay: settled ? "0ms" : `${240 + i * 90}ms` }}
                className={cn(
                  "group relative flex flex-col rounded-[5px] border border-heading/20 border-l-4 border-l-heading bg-white p-6 shadow-[0_1px_3px_rgba(31,31,31,0.05)] transition-all hover:-translate-y-1.5 hover:border-heading/60 hover:border-l-brand hover:shadow-[0_18px_44px_rgba(31,31,31,0.10)] sm:p-7",
                  settled ? "duration-300" : "duration-700",
                  inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
              >
                {/* Index */}
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-6 text-xs font-semibold tracking-[0.2em] text-heading/35"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Store identity */}
                <div className="relative flex items-center gap-3.5 border-b border-border pb-5">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[5px] bg-heading text-lg font-semibold text-white"
                  >
                    {c.store.charAt(0)}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-heading">{c.store}</h3>
                    <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-body-text">
                      {c.niche}
                    </p>
                  </div>
                </div>

                {/* Narrative + metrics */}
                <div className="relative mt-5 flex flex-1 flex-col">
                  <p className="text-sm leading-relaxed text-body-text">
                    <span className="font-semibold text-heading">{leadIn}</span>
                    {tail}
                  </p>

                  {/* Metrics — boxed section */}
                  <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 rounded-[5px] border border-border bg-surface-soft/50 p-4">
                    {c.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-body-text/80">
                          {m.label}
                        </dt>
                        <dd className={cn("mt-1 text-sm font-semibold tabular-nums", toneClass(m.label))}>
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Quote — boxed section, bottom anchored so boxes align across cards */}
                <figure className="relative mt-5 rounded-[5px] border border-border bg-surface-soft/50 p-4">
                  <Quote aria-hidden="true" className="h-4 w-4 text-[#1d4ed8]/60" />
                  <blockquote className="mt-2 text-sm italic leading-relaxed text-heading">
                    &ldquo;{c.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-xs font-semibold not-italic text-brand">
                    — {c.author}
                  </figcaption>
                </figure>
              </article>
            );
          })}
        </div>

        {/* Section CTA */}
        <div
          style={{ transitionDelay: settled ? "0ms" : `${240 + data.cases.length * 90}ms` }}
          className={cn(
            "mt-12 flex justify-center transition-all",
            settled ? "duration-300" : "duration-700",
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          <Link href={data.cta.href} className="btn-primary-cta">
            {data.cta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
