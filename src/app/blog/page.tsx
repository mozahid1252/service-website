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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header — white, matches the reference light theme */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <a href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="MozIntelligence — E-Commerce Growth Intelligence"
              width={44}
              height={44}
              className="rounded-lg transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-[#1F2937] leading-tight">MozIntelligence</div>
              <div className="text-[11px] text-[#9CA3AF] leading-tight">E-Commerce Growth Focused</div>
            </div>
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-[#6B7280] hover:text-[#7C3AED] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      {/* Hero — deep purple gradient with bokeh glow */}
      <section className="relative overflow-hidden border-b border-[#E5E7EB]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#2D1B69] via-[#4A2C8A] to-[#5B21B6]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-[#A78BFA] opacity-[0.25] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 -left-20 h-64 w-64 rounded-full bg-[#818CF8] opacity-[0.18] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-1/3 h-56 w-56 rounded-full bg-[#C084FC] opacity-[0.15] blur-3xl"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="transition-colors hover:text-white">
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
          <span className="mb-3 inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
            Blog
          </span>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[44px]">
            INSIGHTS THAT PROTECT YOUR PROFIT.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#E0E7FF] sm:text-lg">
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
            className="group mx-auto flex max-w-3xl flex-col gap-5 rounded-[5px] border border-[#E5E7EB] bg-white p-6 shadow-[0_10px_30px_-16px_rgba(31,31,31,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#A855F7]/40 hover:shadow-[0_20px_44px_-18px_rgba(124,58,237,0.30)] sm:p-8"
          >
            {/* Cover image */}
            <div className="relative -mx-2 -mt-2 overflow-hidden rounded-[5px] border border-[#E5E7EB] shadow-[0_12px_28px_-16px_rgba(124,58,237,0.30)] sm:-mx-3 sm:-mt-3">
              <Image
                src={featured.coverImage}
                alt={featured.coverAlt}
                width={1344}
                height={768}
                priority
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#7C3AED] shadow-sm backdrop-blur">
                Featured
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-[#9CA3AF]">
              <span className="rounded-full bg-[#EDE9FE] px-3 py-1 font-semibold text-[#6D28D9]">
                {featured.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-[#7C3AED]" aria-hidden="true" />
                {featured.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5 text-[#7C3AED]" aria-hidden="true" />
                {featured.readTime}
              </span>
            </div>
            <h2 className="text-xl font-bold leading-snug text-[#1F2937] transition-colors duration-300 group-hover:text-[#7C3AED] sm:text-2xl">
              {featured.title}
            </h2>
            <p className="text-[15px] leading-relaxed text-[#4B5563]">{featured.excerpt}</p>
            <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#7C3AED]">
              Read article
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>

          {/* Upcoming posts */}
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="rounded-[5px] border border-dashed border-[#D8D5F0] bg-[#F5F3FF] px-6 py-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
                More articles on the way
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#6B7280]">
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
