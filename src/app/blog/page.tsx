import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen } from "lucide-react";

export const metadata = {
  title: "Blog — MozIntelligence",
  description: "E-commerce analytics insights, growth playbooks, and case breakdowns from MozIntelligence.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header — matches the about-mozintelligence page header */}
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

      {/* Coming soon content */}
      <main className="flex-1 flex items-center justify-center px-4 py-24 sm:py-32">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-[5px] bg-surface-soft text-brand mb-6">
            <BookOpen className="h-8 w-8" aria-hidden="true" />
          </span>
          <h1 className="text-3xl font-semibold leading-tight text-heading sm:text-4xl">
            The MozIntelligence <span className="text-brand">Blog</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-body-text sm:text-lg">
            E-commerce analytics insights, growth playbooks, and case breakdowns are on the way. We&apos;re
            putting the finishing touches on our first articles.
          </p>
          <p className="mt-3 text-sm text-body-text/70">Check back soon — or book a free discovery call in the meantime.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://calendar.app.google/TGnzfC65zBF3hVeD9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-btn-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-btn-purple-hover"
            >
              Book a Free Discovery Call
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-[5px] border border-border bg-white px-6 py-3 text-sm font-semibold text-heading transition-colors hover:bg-surface-soft"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="mt-auto border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-body-text">
            © 2025 Mozahidul Islam · E-Commerce Analytics. All rights reserved.
          </p>
          <p className="text-sm font-medium text-body-text">Built with data. Designed for profit.</p>
        </div>
      </footer>
    </div>
  );
}
