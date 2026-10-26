import Image from "next/image";
import { ArrowRight, Dna, ShieldCheck, UserCheck, type LucideIcon } from "lucide-react";

import { FadeIn } from "@/components/site/reveal";
import { aboutSectionData } from "@/components/site/about-data";

/* Colour language: purple = section accents · black = editorial icon squares */
const WHY_ICONS: LucideIcon[] = [Dna, ShieldCheck, UserCheck];

/**
 * About — "About MozIntelligence".
 * Editorial magazine profile, pure white: hero split with an overlapping
 * two-photo composition, sticky-label philosophy band, full-width hairline
 * rows for Why Choose Us, and a large typographic closing manifesto.
 * Copy is client-approved verbatim (about-data.ts).
 */
export function AboutSection() {
  const { philosophy, whyChooseUs } = aboutSectionData;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 bg-white py-16 sm:py-24"
    >
      <div className="container-site">
        {/* 1 — Hero split: copy left / overlapping photo composition right */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="flex flex-col items-start">
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-heading">
              <span aria-hidden="true" className="h-px w-8 bg-border" />
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
              {aboutSectionData.lead}
            </span>
            <h2
              id="about-heading"
              className="mt-4 text-3xl font-semibold leading-tight text-heading sm:text-4xl"
            >
              About <span className="text-brand">MozIntelligence</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-body-text sm:text-lg">
              {aboutSectionData.intro.split("Mozahidul Islam, an experienced E-Commerce Growth Scientist")[0]}
              <span className="font-semibold text-heading">
                Mozahidul Islam, an experienced E-Commerce Growth Scientist
              </span>
              {aboutSectionData.intro.split("Mozahidul Islam, an experienced E-Commerce Growth Scientist")[1]}
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="relative pb-14 sm:pb-16">
              {/* decorative dot grid peeking above the frame */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 right-0 h-24 w-24 [background-image:radial-gradient(#e5e0f5_1.5px,transparent_1.5px)] [background-size:14px_14px]"
              />
              {/* purple accent bar peeking above the frame */}
              <span aria-hidden="true" className="absolute -top-3 left-10 h-3 w-20 rounded-full bg-brand" />

              {/* main photo — white matte frame */}
              <figure className="relative z-10 rounded-[5px] border border-border bg-white p-2 shadow-[0_18px_44px_rgba(31,31,31,0.10)] sm:p-3">
                <div className="relative aspect-[16/11] overflow-hidden rounded-[3px]">
                  <Image
                    src="/images/about-hero.jpg"
                    alt="Two e-commerce consultants reviewing analytics charts on a laptop in a bright modern office"
                    fill
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="object-cover"
                  />
                </div>
              </figure>

              {/* overlapping secondary photo — thick white border */}
              <figure className="absolute bottom-0 left-0 z-20 w-1/2 rounded-[5px] border-[6px] border-white bg-white shadow-[0_18px_44px_rgba(31,31,31,0.18)] sm:w-[46%]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
                  <Image
                    src="/images/about-team.jpg"
                    alt="Strategy meeting with a presenter in a glass boardroom overlooking the city"
                    fill
                    sizes="(min-width: 1024px) 250px, 46vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            </div>
          </FadeIn>
        </div>

        {/* 2 — Philosophy: photo left · sticky label · statement typography */}
        <FadeIn className="mt-16 border-t border-border pt-12 sm:mt-24 sm:pt-16" delay={60}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <div className="flex items-start gap-3 lg:sticky lg:top-28">
                <span aria-hidden="true" className="mt-2 h-6 w-1 shrink-0 rounded-[2px] bg-brand" />
                <h3 className="text-xl font-semibold leading-snug text-heading sm:text-2xl">
                  <span className="text-body-text">{philosophy.titleLead}</span>{" "}
                  <span className="text-brand">{philosophy.titleRest}</span>
                </h3>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="text-lg font-medium leading-relaxed text-heading sm:text-xl">
                {philosophy.paragraphs[0]}
              </p>
              <p className="mt-6 text-base leading-relaxed text-body-text">
                {philosophy.paragraphs[1]}
              </p>
            </div>
            <div className="lg:order-first lg:col-span-4">
              <figure className="relative rounded-[5px] border border-border bg-white p-2 shadow-[0_18px_44px_rgba(31,31,31,0.10)] sm:p-3">
                <span aria-hidden="true" className="absolute -top-3 left-8 h-3 w-20 rounded-full bg-brand" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
                  <Image
                    src="/images/about-philosophy.jpg"
                    alt="Close-up of hands using a calculator over printed revenue charts beside a laptop"
                    fill
                    sizes="(min-width: 1024px) 380px, 100vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            </div>
          </div>
        </FadeIn>

        {/* 3 — Why E-Commerce Brands Choose Us: full-width hairline rows */}
        <FadeIn className="mt-16 border-t border-border pt-12 sm:mt-24 sm:pt-16" delay={60}>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
            <div className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-2 h-6 w-1 shrink-0 rounded-[2px] bg-brand" />
              <h3 className="text-xl font-semibold leading-snug text-heading sm:text-2xl">
                <span className="text-body-text">{whyChooseUs.titleLead}</span>{" "}
                <span className="text-brand">{whyChooseUs.titleRest}</span>
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-body-text">
              {whyChooseUs.lead.split("MozIntelligence is your dedicated data partner.")[0]}
              <span className="font-semibold text-heading">
                MozIntelligence is your dedicated data partner.
              </span>
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <ul className="border-t border-border">
                {whyChooseUs.items.map((item, i) => {
                  const Icon = WHY_ICONS[i % WHY_ICONS.length];
                  return (
                    <li
                      key={item.title}
                      className="group border-b border-border transition-colors duration-300 hover:bg-surface-soft/40"
                    >
                      <div className="flex flex-col gap-3 px-1 py-7 sm:px-3 lg:flex-row lg:items-center lg:gap-12 lg:px-5">
                        <div className="flex items-center gap-4 lg:w-[20rem] lg:shrink-0">
                          <span
                            aria-hidden="true"
                            className="text-2xl font-semibold tabular-nums text-heading/20 transition-colors duration-300 group-hover:text-brand sm:text-3xl"
                          >
                            0{i + 1}
                          </span>
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[5px] bg-heading text-white transition-colors duration-300 group-hover:bg-brand">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <h4 className="text-base font-semibold leading-snug text-heading sm:text-lg">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-sm leading-relaxed text-body-text lg:flex-1">{item.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* sticky expertise photo right */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <figure className="relative rounded-[5px] border border-border bg-white p-2 shadow-[0_18px_44px_rgba(31,31,31,0.10)] sm:p-3">
                  <span aria-hidden="true" className="absolute -top-3 left-8 h-3 w-20 rounded-full bg-brand" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 right-0 h-24 w-24 [background-image:radial-gradient(#e5e0f5_1.5px,transparent_1.5px)] [background-size:14px_14px]"
                  />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
                    <Image
                      src="/images/about-expertise.jpg"
                      alt="Six colleagues collaborating around a laptop in a bright modern office"
                      fill
                      sizes="(min-width: 1024px) 380px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 4 — Closing manifesto + CTA */}
        <FadeIn className="mt-16 border-t border-border pt-12 sm:mt-24 sm:pt-16" delay={60}>
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-2 hidden h-36 w-36 [background-image:radial-gradient(#e5e0f5_1.5px,transparent_1.5px)] [background-size:16px_16px] lg:block"
            />
            <p className="max-w-4xl text-2xl font-semibold leading-snug text-heading sm:text-3xl lg:text-4xl lg:leading-[1.25]">
              {aboutSectionData.closing.split("your ultimate competitive advantage")[0]}
              <span className="text-brand">your ultimate competitive advantage</span>
              {aboutSectionData.closing.split("your ultimate competitive advantage")[1]}
            </p>
            <a href={aboutSectionData.cta.href} className="btn-primary-cta mt-8 sm:mt-10">
              {aboutSectionData.cta.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
