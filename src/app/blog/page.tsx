import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from "lucide-react";

import { blogPosts } from "@/lib/blog-posts";
import { SiteFooter } from "@/components/site/contact-footer";

export const metadata: Metadata = {
  title: "Blog — E-Commerce Data & Profit Insights | MozIntelligence",
  description:
    "Practical, data-driven articles on e-commerce analytics — where profit leaks hide, what to measure, and how to turn dashboards into decisions.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const [featured] = blogPosts;

  return (
    <div className="min-h-screen flex flex-col bg-[#000000]">
      {/* Header — dark, matches the about-mozintelligence sub-page header */}
      <header className="sticky top-0 z-50 bg-[rgba(8,14,24,0.92)] backdrop-blur-xl border-b border-[rgba(0,198,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <a href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="MozIntelligence — E-Commerce Growth Intelligence"
              width={44}
              height={44}
              className="rounded-lg transition-transform duration-300 group-hover:scale-105 img-premium"
              priority
            />
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-white leading-tight">MozIntelligence</div>
              <div className="text-[11px] text-[#8899AA] leading-tight">E-Commerce Growth Focused</div>
            </div>
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-[#8899AA] hover:text-[#00C6FF] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[rgba(0,198,255,0.08)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#0a1424] via-[#060b16] to-[#000000]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#00C6FF] opacity-[0.07] blur-3xl"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#8899AA]">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="transition-colors hover:text-[#00C6FF]">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
              </li>
              <li>
                <span aria-current="page" className="text-white">
                  Blog
                </span>
              </li>
            </ol>
          </nav>
          <span className="mb-3 inline-flex w-fit items-center rounded-full border border-[rgba(0,198,255,0.3)] bg-[rgba(0,198,255,0.08)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#00C6FF]">
            Blog
          </span>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[44px]">
            <span className="text-[#00C6FF]">INSIGHTS</span> THAT PROTECT YOUR PROFIT.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#8899AA] sm:text-lg">
            Practical, data-driven articles on e-commerce analytics — where leaks hide, what to
            measure, and how to turn dashboards into decisions.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <main className="flex-1 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/blog/${featured.slug}`}
            className="group mx-auto flex max-w-3xl flex-col gap-5 rounded-2xl border border-[rgba(0,198,255,0.12)] bg-[rgba(13,21,32,0.6)] p-6 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(0,198,255,0.4)] hover:shadow-[0_20px_44px_-18px_rgba(0,198,255,0.25)] sm:p-8"
          >
            {/* Cover image */}
            <div className="relative -mx-2 -mt-2 overflow-hidden rounded-xl border border-[rgba(0,198,255,0.12)] shadow-[0_12px_28px_-16px_rgba(0,198,255,0.35)] sm:-mx-3 sm:-mt-3">
              <Image
                src={featured.coverImage}
                alt={featured.coverAlt}
                width={1344}
                height={768}
                priority
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#00C6FF] shadow-sm backdrop-blur">
                Featured
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-[#8899AA]">
              <span className="rounded-full bg-[rgba(0,198,255,0.12)] px-3 py-1 font-semibold text-[#00C6FF]">
                {featured.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-[#00C6FF]" aria-hidden="true" />
                {featured.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5 text-[#00C6FF]" aria-hidden="true" />
                {featured.readTime}
              </span>
            </div>
            <h2 className="text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#00C6FF] sm:text-2xl">
              {featured.title}
            </h2>
            <p className="text-[15px] leading-relaxed text-[#8899AA]">{featured.excerpt}</p>
            <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#00C6FF]">
              Read article
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>

          {/* Upcoming posts */}
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="rounded-2xl border border-dashed border-[rgba(0,198,255,0.18)] bg-[rgba(13,21,32,0.4)] px-6 py-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#00C6FF]">
                More articles on the way
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#8899AA]">
                New data-driven breakdowns are being written right now — on retention, CRO, marketing
                spend and profitability. Check back soon.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
