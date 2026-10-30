"use client";

/**
 * ============================================================
 *  MOZINTELLIGENCE — FEATURED CASE STUDIES (ALL-IN-ONE)
 * ============================================================
 *  Single-file, self-contained section:
 *    • All 6 case-study stories inlined (no external data imports)
 *    • Premium white theme, FLAT cards — NO box shadows,
 *      thin border only (#e5e0f5) + hover lift + border tint
 *    • Real project-matched photography (no AI images):
 *        ZARA Organics  -> herbal infusion       /images/case-zara.jpg
 *        PACE Perf.     -> running shoe          /images/case-pace.jpg
 *        LUNA Jewelry   -> gold necklace         /images/case-luna.jpg
 *        UrbanNest      -> home-decor interior   /images/case-urbannest.jpg
 *        PawPerfect     -> golden retriever      /images/case-paw.jpg
 *        LUMIÈRE Beauty -> cosmetics flat-lay    /images/case-lumiere.jpg
 *    • Motion: staggered IntersectionObserver entrance reveal,
 *      snap scrolling, mouse drag-to-scroll with smooth settle,
 *      animated 01/06 counter, gradient progress bar
 * ============================================================
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Lightbulb,
  Rocket,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

/* ---------- tiny class-join helper (replaces `cn`) ---------- */
const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

/* ============================================================
 *  DATA — copy inlined verbatim
 * ============================================================ */
interface FeaturedCaseStudy {
  slug: string;
  store: string;
  tag: string;
  industry: string;
  headline: string;
  subtitle: string;
  nightmare: string;
  revelation: string;
  turnaround: string;
  result: string;
  pdf: string;
  image: string;
  disableDownload?: boolean;
}

const studies: FeaturedCaseStudy[] = [
  {
    slug: "luna-jewelry",
    store: "LUNA Jewelry Co.",
    tag: "turnaround",
    industry: "Handcrafted Jewelry",
    headline: "The Store Gifting Away Its Own Profit",
    subtitle: "Working 11 hrs/day. Earning $11.59/hour.",
    nightmare:
      "Making $30K/mo but working 11 hrs/day, 6 days a week, for just $11.59/hour.",
    revelation:
      'She was giving away $115,956/year in "free" services (gift wrap, engraving, shipping). Her bestseller earned her $8.20/hour.',
    turnaround:
      "Added a $12 engraving fee, $4.99 premium gift wrap, raised free shipping threshold, and flipped ad budget from Meta to Pinterest. Took 4 hours to implement.",
    result: "Hourly rate jumped to $66.81/hr. Monthly profit went from $3.3K to $18,900/mo.",
    pdf: "/pdfs/case-luna.pdf",
    image: "/images/case-luna.jpg",
  },
  {
    slug: "urbannest-home-decor",
    store: "UrbanNest Home Decor",
    tag: "diagnostic",
    industry: "Home Decor & Lifestyle",
    headline:
      "How a $23K/Month Store Discovered They Were Bleeding $4,200 Every Month",
    subtitle: "Best-seller was silently losing $769/quarter.",
    nightmare:
      "$23K/mo revenue, growing steadily, but only $3K net profit. A 20% promo sale spiked revenue but actually wiped out margins, dropping profit by 41%.",
    revelation:
      "The #1 best-seller (Boho Macramé) was secretly losing $769/quarter. Forced account creation was causing a 71% cart abandonment rate.",
    turnaround:
      "Paused losing ads, enabled guest checkout, flipped ad budget from Facebook to Google (which had 1.86x higher LTV), and sent win-back emails to at-risk customers.",
    result: "Profit jumped from $3.4K/mo to $7,800/mo in 60 days.",
    pdf: "/pdfs/case-urbannest.pdf",
    image: "/images/case-urbannest.jpg",
  },
  {
    slug: "pawperfect-premium",
    store: "PawPerfect Premium",
    tag: "scale",
    industry: "Pet Supplies & Wellness",
    headline: "How Data Saved $312,000 in Annual Revenue",
    subtitle: "Targeting wrong customers. $312K/year consequence.",
    nightmare:
      "$54K/mo revenue, 4.9★ reviews. Margins were shrinking because ad costs per customer rose 73% in 3 years.",
    revelation:
      'Ads targeted "senior pet owners" (LTV $134) who churned when pets died. Customers acquired with puppies generated 6.3x more LTV ($847). Zero referral program despite 67% of Champions coming from word-of-mouth.',
    turnaround:
      "Flipped ad targeting from senior to puppy parents. Created pet birthday and milestone email automation.",
    result: "Profit jumped from $12.4K/mo to $29,840/mo in 45 days.",
    pdf: "/pdfs/case-paw.pdf",
    image: "/images/case-paw.jpg",
  },
  {
    slug: "lumiere-beauty",
    store: "LUMIÈRE Beauty Co.",
    tag: "scale",
    industry: "Skincare & Beauty",
    headline: "How a $67K/Month Brand Discovered a Hidden $89K/Month Business",
    subtitle: "Plateaued 8 months. Black Friday was the villain.",
    nightmare:
      "Plateaued at $67K/mo for 8 consecutive months. Profitable but stuck, leaving money on the table.",
    revelation:
      "Black Friday discount cohorts had 4.1x LOWER LTV and 81% churn compared to educational content cohorts. Meta Broad ads were destroying $8,963 in value.",
    turnaround:
      "Stopped chasing holiday discount revenue. Replicated best cohorts, created product bundles, and reallocated ad spend to Google Brand and Content.",
    result: "Profit jumped from $18.4K/mo to $41,380/mo in 45 days.",
    pdf: "/pdfs/case-lumiere.pdf",
    image: "/images/case-lumiere.jpg",
  },
  {
    slug: "zara-organics",
    store: "ZARA Organics",
    tag: "turnaround",
    industry: "Organic Wellness & Supplements",
    headline: "The $89K/Month Store That Was Actually Bankrupt",
    subtitle: "A $7/month profit hidden inside $89K in revenue.",
    nightmare:
      "$89K/mo revenue, celebrating a record year. Actual net profit for the entire year was only $84. Margin collapsed from 24% to 10.9%.",
    revelation:
      '46% of her customer base was permanently "Lost." Free organic content channels generated 4.2x more LTV than $18K/mo paid ads.',
    turnaround:
      "Shifted from an ad-spend business to a content/community business. Built a live Looker Studio dashboard.",
    result: "Profit went from $7/mo to $48,400/mo.",
    pdf: "/pdfs/case-zara.pdf",
    image: "/images/case-zara.jpg",
    disableDownload: true,
  },
  {
    slug: "pace-performance",
    store: "PACE Performance",
    tag: "scale",
    industry: "Fitness & Running Gear",
    headline: "All Speed, No Strategy: The Marathon Runner's Store",
    subtitle: "His $8,400/mo ads brought customers worth $9 LTV.",
    nightmare:
      "$41K/mo revenue, running his business like a marathon. Thought he was making $9K/mo profit; he was actually making $425/mo.",
    revelation:
      "His free TikTok race videos brought in customers worth $524 LTV, while his $8,400/mo paid ads brought customers worth $9 LTV.",
    turnaround:
      "Cut ad spend by 70%, killed low-margin/high-return fitness products, leaned into authentic race-day content.",
    result: "Profit jumped from $425/mo to $31,400/mo in 30 days.",
    pdf: "/pdfs/case-pace.pdf",
    image: "/images/case-pace.jpg",
    disableDownload: true,
  },
];

const sectionCopy = {
  lead: "The Receipts",
  title: "Featured Case Studies",
  description:
    "High revenue doesn't mean high profit. Here is what happened when founders stopped looking at vanity metrics and let me read their real data.",
};

/* ---------- story-stage metadata ---------- */
const stageMeta = [
  { key: "nightmare", label: "The Nightmare", icon: TriangleAlert, chip: "bg-coral/10 text-coral" },
  { key: "revelation", label: "The Revelation", icon: Eye, chip: "bg-brand/10 text-brand" },
  { key: "turnaround", label: "The Turnaround", icon: Lightbulb, chip: "bg-brand/10 text-brand" },
] as const;

/* ============================================================
 *  COMPONENT
 * ============================================================ */
export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const [inView, setInView] = useState(false);
  const [settled, setSettled] = useState(false);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

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
    const t = setTimeout(() => setSettled(true), studies.length * 90 + 800);
    return () => clearTimeout(t);
  }, [inView]);

  /** scroll distance of one card + gap */
  const step = () => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    return first.offsetWidth + 24; // gap-6
  };

  const scrollTo = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const s = step() || 1;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? track.scrollLeft / max : 0);
    if (max > 0 && track.scrollLeft >= max - 4) {
      setIndex(studies.length - 1);
    } else {
      setIndex(Math.min(studies.length - 1, Math.max(0, Math.round(track.scrollLeft / s))));
    }
  };

  /* ── Mouse drag-to-scroll (touch devices use native swipe) ── */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { down: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    track.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    setDragging(false);
    /* smooth-settle onto the nearest card */
    const track = trackRef.current;
    const s = step();
    if (track && s > 0) {
      track.scrollTo({ left: Math.round(track.scrollLeft / s) * s, behavior: "smooth" });
    }
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  /* shared entrance classes (header block) */
  const reveal = () =>
    cn(
      "transition-all duration-700 ease-out will-change-transform",
      inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    );

  const [firstWord, ...restWords] = sectionCopy.title.split(" ");

  return (
    <section
      id="case-studies"
      aria-labelledby="cases-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-24 scroll-mt-20"
    >
      {/* soft ambient glows on white */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-brand/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-btn-purple/[0.06] blur-3xl"
      />

      <div ref={sectionRef} className="container-site relative">
        {/* ── Header: copy left, controls right ── */}
        <div
          className={cn(
            "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
            reveal()
          )}
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-surface-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {sectionCopy.lead}
            </span>
            <h2 id="cases-heading" className="mt-4 text-3xl font-semibold leading-tight text-heading sm:text-4xl">
              <span className="text-brand">{firstWord}</span>{" "}
              {restWords.join(" ")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body-text">{sectionCopy.description}</p>
          </div>

          <div className="flex items-center gap-5">
            <p className="hidden text-sm font-medium tabular-nums text-body-text sm:block" aria-live="polite">
              <span key={index} className="counter-tick inline-block font-semibold text-brand">
                {pad(index + 1)}
              </span>{" "}
              <span className="text-body-text/50">/ {pad(studies.length)}</span>
            </p>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => scrollTo(-1)}
                disabled={progress <= 0.01}
                aria-label="Previous case study"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-heading transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:border-border disabled:hover:bg-white disabled:hover:text-heading"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo(1)}
                disabled={progress >= 0.99}
                aria-label="Next case study"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-heading transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:border-border disabled:hover:bg-white disabled:hover:text-heading"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Horizontal snap track (swipe / drag / arrows / wheel) ── */}
        <div className="relative mt-12">
          <div
            ref={trackRef}
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            role="region"
            aria-label="Featured case studies — scroll horizontally"
            className={cn(
              "flex gap-6 overflow-x-auto px-1 pb-2 scrollbar-hide select-none",
              dragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory scroll-smooth"
            )}
          >
            {studies.map((study, i) => (
              <article
                key={study.slug}
                style={{ transitionDelay: settled ? "0ms" : `${i * 90}ms` }}
                className={cn(
                  /* FLAT CARD — border only, NO box shadows */
                  "group relative flex w-[86vw] max-w-[680px] shrink-0 snap-start flex-col overflow-hidden rounded-[8px] border border-border bg-white transition-all hover:-translate-y-1.5 hover:border-brand/40 sm:w-[640px] lg:w-[680px]",
                  settled ? "duration-300" : "duration-700 ease-out will-change-transform",
                  !settled && (inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")
                )}
              >
                {/* Image band — real photo */}
                <div className="relative h-56 shrink-0 overflow-hidden sm:h-64">
                  <Image
                    src={study.image}
                    alt={`${study.store} — ${study.industry}`}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 86vw, 680px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#150a35]/80 via-[#150a35]/10 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand shadow-sm backdrop-blur">
                    {study.tag}
                  </span>
                  <span
                    className="absolute right-4 top-3 text-3xl font-semibold text-white/45"
                    aria-hidden="true"
                  >
                    {pad(i + 1)}
                  </span>
                  <p className="absolute bottom-4 left-5 right-5 text-sm font-semibold text-white">
                    {study.store}
                    <span className="font-normal text-white/70"> · {study.industry}</span>
                  </p>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-xl font-semibold leading-snug text-heading sm:text-[22px]">
                    {study.headline}
                  </h3>
                  <p className="mt-1.5 text-sm italic text-body-text">&ldquo;{study.subtitle}&rdquo;</p>

                  {/* Story stages */}
                  <div className="mt-5 flex flex-col gap-3.5 border-t border-border pt-5">
                    {stageMeta.map((stage) => (
                      <div key={stage.key} className="flex items-start gap-3">
                        <span
                          className={cn(
                            "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
                            stage.chip
                          )}
                        >
                          <stage.icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-heading">
                            {stage.label}
                          </p>
                          <p className="mt-0.5 text-sm leading-relaxed text-body-text">
                            {study[stage.key]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Result banner */}
                  <div className="mt-5 overflow-hidden rounded-[5px] bg-gradient-to-r from-brand to-btn-purple p-4 text-white transition-transform duration-300 group-hover:scale-[1.01]">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                      <Rocket className="h-4 w-4" aria-hidden="true" />
                      The Result
                    </p>
                    <p className="mt-1.5 flex items-center gap-2 text-base font-semibold leading-relaxed">
                      <TrendingUp className="h-5 w-5 shrink-0" aria-hidden="true" />
                      {study.result}
                    </p>
                  </div>

                  <div className="mt-auto pt-5">
                    {study.disableDownload ? (
                      <span
                        aria-disabled="true"
                        className="inline-flex items-center gap-2 rounded-[5px] border-2 border-brand px-5 py-2.5 text-sm font-semibold text-brand opacity-60 cursor-not-allowed"
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        Download Full {study.store} Case Study PDF
                      </span>
                    ) : (
                      <a
                        href={study.pdf}
                        download
                        className="inline-flex items-center gap-2 rounded-[5px] border-2 border-brand px-5 py-2.5 text-sm font-semibold text-brand transition-all duration-300 hover:bg-brand hover:text-white active:scale-95"
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        Download Full {study.store} Case Study PDF
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div
          className="mt-6 h-1 overflow-hidden rounded-full bg-surface-soft"
          role="progressbar"
          aria-label="Case studies scroll progress"
          aria-valuemin={0}
          aria-valuemax={studies.length - 1}
          aria-valuenow={index}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#8b5dff] to-[#9d3af9] transition-[width] duration-200"
            style={{ width: `${Math.max(progress * 100, 5)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
