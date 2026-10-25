/* ==========================================================================
 *  PrinciplesSection.tsx  —  ALL-IN-ONE (data inlined, single file)
 *  Section: "Why MozIntelligence — The 4 Principles That Shape Every Engagement"
 *
 *  Design: editorial alternating photo rows + floating icon badges +
 *          ghost index numbers + polished founder-quote block.
 *  Verified: desktop 1280px + mobile 390px, lint 0 errors.
 * ========================================================================== */

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  MessageSquare,
  Quote,
  Rocket,
  Target,
} from "lucide-react";

/* ──────────────────────────────────────────────────────
 * 1) DATA — inlined from src/lib/site-data.ts
 * ────────────────────────────────────────────────────── */

const principles = {
  lead: "Why MozIntelligence",
  title: "The 4 Principles That Shape Every Engagement",
  items: [
    {
      icon: MessageSquare,
      kicker: "Clarity",
      title: "We speak business, not jargon.",
      description:
        "Every report is written so that a business owner, not a data scientist, can read it, understand it, and act on it immediately. If you need a glossary to read my work, I have failed.",
      image: "/images/principle-clarity.jpg",
      imageAlt:
        "Clean analytics dashboard on a laptop, written so a business owner can read it at a glance",
    },
    {
      icon: Compass,
      kicker: "Decisions",
      title: "We deliver decisions, not data dumps.",
      description:
        "You will never receive a spreadsheet full of numbers with no context. Every single finding comes with a specific, prioritized recommendation and a clear reason why it matters to your bottom line.",
      image: "/images/principle-decisions.jpg",
      imageAlt:
        "Consultant marking prioritized recommendations directly on a printed business plan",
    },
    {
      icon: Target,
      kicker: "Relevance",
      title: "We focus on your actual problem.",
      description:
        "Every engagement is designed around the specific challenge your business is facing right now, not a generic template copy-pasted from the last client. Your data is unique. Your analysis should be too.",
      image: "/images/principle-relevance.jpg",
      imageAlt:
        "Customer journey steps mapped and connected on a wall for one specific business problem",
    },
    {
      icon: Rocket,
      kicker: "Action",
      title: "We build for action, not admiration.",
      description:
        "Dashboards and reports that sit unopened are worthless. Everything I build is designed to be used, by you and your team, every day, to make faster and better decisions with complete confidence.",
      image: "/images/principle-action.jpg",
      imageAlt:
        "Team working through an action plan together during a working session",
    },
  ],
  founderQuote: {
    label: "What A Founder Says",
    quote:
      "I fired my $2,500/month agency because their 'amazing dashboards' still left me broke. The Health Check and the Growth Packages found the exact holes in my business in 13 days. I wish I had done this two years earlier.",
    author: "Marcus T., NOIRE Collective",
    before: "-$1,690/mo net profit",
    after: "+$15,000/mo net profit",
    timeline: "60–70 days",
    how: "Discount addiction detoxed (17.6% → 4.8%). Facebook & TikTok ads cut by 70% and reallocated to organic/Google. Unified size charts to stop a 24.7% unit return rate. Mobile checkout rebuilt. Win-back email sent to 6,063 dormant customers.",
  },
  cta: { label: "Lets Find Revenue You Already Have", href: "#book-a-call" },
};

/* ──────────────────────────────────────────────────────
 * 2) SECTION HEADING — inlined (dual-color heading pattern)
 * ────────────────────────────────────────────────────── */

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
        {kicker}
      </span>
      <h2
        id="principles-heading"
        className="max-w-3xl text-3xl font-semibold leading-tight text-heading sm:text-4xl"
      >
        {title}
      </h2>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
 * 3) SECTION — editorial alternating photo rows
 * ────────────────────────────────────────────────────── */

export function PrinciplesSection() {
  return (
    <section
      id="why-me"
      aria-labelledby="principles-heading"
      className="bg-surface-soft py-16 sm:py-24 scroll-mt-20"
    >
      <div className="container-site">
        <SectionHeading kicker={principles.lead} title={principles.title} />

        {/* ── 4 principles: photo + copy, alternating left/right ── */}
        <div className="mt-14 sm:mt-16">
          <ol className="space-y-16 sm:space-y-24">
            {principles.items.map((item, i) => {
              const flip = i % 2 === 1;
              return (
                <li
                  key={item.kicker}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Related photo with floating principle icon */}
                  <div className={`relative ${flip ? "lg:order-2" : ""}`}>
                    <div className="group relative aspect-[3/2] overflow-hidden rounded-[5px] border border-border bg-white shadow-[0_18px_44px_rgba(111,62,222,0.14)]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span
                      className={`absolute -bottom-6 flex h-14 w-14 items-center justify-center rounded-[5px] bg-brand text-white shadow-[0_12px_28px_rgba(111,62,222,0.4)] ${
                        flip ? "right-6" : "left-6"
                      }`}
                    >
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>

                  {/* Principle copy with index + hairline rule */}
                  <div className={flip ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="text-5xl font-bold leading-none text-brand/15 sm:text-6xl"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                        {item.kicker}
                      </span>
                      <span aria-hidden="true" className="h-px flex-1 bg-border" />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold leading-snug text-heading sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-body-text sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ── Founder quote + before/after ── */}
        <figure className="mx-auto mt-16 max-w-4xl rounded-[5px] border border-border bg-white p-8 shadow-[0_18px_44px_rgba(111,62,222,0.1)] sm:p-10">
          <Quote aria-hidden="true" className="h-9 w-9 text-brand/25" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {principles.founderQuote.label}
          </p>
          <blockquote className="mt-4 text-lg font-medium leading-relaxed text-heading sm:text-xl">
            &ldquo;{principles.founderQuote.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-sm font-semibold text-brand">
            &mdash; {principles.founderQuote.author}
          </figcaption>

          <div className="mt-6 grid gap-3 rounded-[5px] bg-surface-soft p-5 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-body-text">Before</p>
              <p className="mt-1 text-lg font-semibold text-coral">
                {principles.founderQuote.before}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-body-text">After</p>
              <p className="mt-1 text-lg font-semibold text-brand">
                {principles.founderQuote.after}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-body-text">Time</p>
              <p className="mt-1 text-lg font-semibold text-heading">
                {principles.founderQuote.timeline}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-body-text">
            <strong className="text-heading">How:</strong> {principles.founderQuote.how}
          </p>
        </figure>

        {/* ── CTA ── */}
        <div className="mt-10 text-center">
          <Link href={principles.cta.href} className="btn-primary-cta">
            {principles.cta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
