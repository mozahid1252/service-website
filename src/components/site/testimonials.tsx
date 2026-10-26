import { MoveRight } from "lucide-react";

import { testimonialsData, type Testimonial } from "./testimonials-data";
import { FadeIn } from "./reveal";

/* ----------------------------------------------------------------
   Section CSS — single slow marquee loop for the testimonial row.
   Self-contained (own keyframes/class names; injected once and
   hoisted to <head>), same seamless -50% pattern as the Tech Stack
   tickers. Hover pauses; reduced-motion turns it off.
   ---------------------------------------------------------------- */
const MARQUEE_CSS = `
@keyframes marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.animate-marquee-left { animation: marquee-left 64s linear infinite; will-change: transform; }
@media (prefers-reduced-motion: reduce) {
  .animate-marquee-left { animation: none; }
}
`;

/**
 * Testimonials — "Founders, Transformed".
 * Editorial header, then ALL testimonial cards in ONE full-bleed row
 * that drifts slowly sideways on its own (CSS marquee). Cards keep the
 * verbatim quote + before → after stat strip; the row loops seamlessly
 * (halves duplicated), pauses on hover, and disables under
 * prefers-reduced-motion. Copy is verbatim (testimonials-data.ts).
 */
export function TestimonialsSection() {
  /* 7 cards ≈ 2.9kpx per half — duplicated once more so the seamless
     -50% loop stays wider than any viewport */
  const half = [...testimonialsData.items, ...testimonialsData.items];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="overflow-hidden border-y border-border bg-surface-soft/60 py-16 sm:py-24"
    >
      <style href="testimonials-marquee" precedence="medium">
        {MARQUEE_CSS}
      </style>

      <div className="container-site">
        {/* Editorial header */}
        <FadeIn className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-heading">
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
            {testimonialsData.kicker}
            <span aria-hidden="true" className="h-px w-8 bg-border" />
          </span>
          <h2
            id="testimonials-heading"
            className="mt-4 text-2xl font-semibold uppercase leading-tight tracking-wide text-heading sm:text-3xl"
          >
            {testimonialsData.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base font-medium uppercase leading-relaxed tracking-[0.08em] text-brand">
            {testimonialsData.intro}
          </p>
        </FadeIn>
      </div>

      {/* ONE row — every card, drifting slowly sideways, forever */}
      <FadeIn delay={120}>
        <div className="group relative mt-12 overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:mt-14">
          <div className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            <div className="flex items-stretch">
              {half.map((t, i) => (
                <TestimonialCard key={`${t.author}-a-${i}`} t={t} />
              ))}
            </div>
            <div className="flex items-stretch" aria-hidden="true">
              {half.map((t, i) => (
                <TestimonialCard key={`${t.author}-b-${i}`} t={t} />
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/**
 * One founder card — verbatim quote, avatar-initial author line and
 * the before → after stat strip. Fixed width so the marquee stays
 * rhythmic; flex column + flex-1 quote keeps every card equal height.
 */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="relative mr-4 flex w-[320px] shrink-0 flex-col overflow-hidden rounded-[5px] border border-border bg-gradient-to-b from-white to-[#f7f5fd] p-6 shadow-[0_10px_28px_rgba(31,31,31,0.05)] transition-all duration-300 hover:border-brand/40 hover:shadow-[0_18px_44px_rgba(111,62,222,0.14)] sm:w-[380px] sm:p-7">
      {/* oversized decorative quote mark — quiet brand tint */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-1 select-none font-serif text-[5.5rem] leading-none text-brand/10"
      >
        &rdquo;
      </span>

      <figure className="flex flex-1 flex-col">
        {/* Quote text verbatim — includes its own quotation marks */}
        <blockquote className="relative flex-1 text-[15px] italic leading-relaxed text-[#2a2440]">
          {t.quote}
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[5px] bg-gradient-to-br from-brand to-btn-purple text-lg font-semibold text-white shadow-[0_6px_16px_rgba(111,62,222,0.35)] ring-1 ring-white/25"
          >
            {t.author.charAt(0)}
          </span>
          <span className="text-sm font-semibold text-brand">— {t.author}</span>
        </figcaption>
      </figure>

      {/* Before → after stat strip — dark command-center accent */}
      <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-[5px] bg-heading px-4 py-3 text-sm">
        <span className="font-medium tabular-nums text-red-400">{t.before}</span>
        <MoveRight aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-light" />
        <span className="font-semibold tabular-nums text-emerald-500">{t.after}</span>
      </div>
    </article>
  );
}
