import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, BarChart3 } from "lucide-react";
import { SiteFooter } from "@/components/site/contact-footer";

export const metadata = {
  title: "About Founder — Mozahidul Islam | MozIntelligence",
  description:
    "Meet Mozahidul Islam, E-Commerce Growth Scientist and founder of MozIntelligence. 3 years of data strategy experience, now working directly with founders.",
};

export default function AboutFounderPage() {
  const achievements = [
    { value: "2.75M+", label: "Data Events Processed" },
    { value: "3", label: "Years Experienced" },
    { value: "100+", label: "Projects Delivered" },
    { value: "6+", label: "Industries Served" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
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
              <div className="text-[11px] text-[#8899AA] leading-tight">E-Commerce Growth<br/>Focused</div>
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

      {/* Main content — founder bio */}
      <main className="flex-1">
        <section id="about" className="about2-section">
          <div className="about2-inner">
            {/* TOP ROW: two-column layout */}
            <div className="about2-grid">
              {/* LEFT — Content */}
              <div className="about2-left">
                {/* Eyebrow + name + role */}
                <div className="about2-identity">
                  <span className="about2-eyebrow">About</span>
                  <h2 className="about2-name">Mozahidul Islam</h2>
                  <p className="about2-role">E-Commerce Growth Scientist</p>
                </div>

                {/* Hero stats */}
                <div className="about2-hero-stats">
                  <div className="about2-hero-stat">
                    <span className="about2-hero-stat-v">CEO</span>
                    <span className="about2-hero-stat-l">MOZINTELLIGENCE</span>
                  </div>
                  <div className="about2-hero-divider" aria-hidden="true" />
                  <div className="about2-hero-stat">
                    <span className="about2-hero-stat-v">3 Years</span>
                    <span className="about2-hero-stat-l">Experience</span>
                  </div>
                  <div className="about2-hero-divider" aria-hidden="true" />
                  <div className="about2-hero-stat about2-hero-stat-available">
                    <span className="about2-available-dot" aria-hidden="true" />
                    <span className="about2-hero-stat-l">Available For Projects</span>
                  </div>
                </div>

                {/* Heading */}
                <div className="about2-heading">
                  <p className="about2-heading-label">The Intelligence Behind the Data</p>
                  <h3 className="about2-headline">
                    I Don&apos;t Just Build Dashboards.
                    <br />
                    <span className="about2-headline-accent">I Build the Engine That Powers Them.</span>
                  </h3>
                </div>

                {/* Introduction */}
                <div className="about2-intro">
                  <p>
                    Hi, I&apos;m <strong>Mozahidul Islam</strong>, E-Commerce Growth Scientist.
                  </p>
                  <p>
                    For 3 years, I worked behind the scenes at a data consulting firm, leading the data strategy and analysis for e-commerce clients. The kind of deep-dive work you&apos;ll see in the case studies on this site.
                  </p>
                  <p>
                    In 2026, I decided it was time to do this on my own. Not because the work changed, it&apos;s the same rigor, the same process, but because I wanted to work directly with founders, build real relationships, and skip the layers in between.
                  </p>
                  <p>
                    This site is the start of that next chapter.
                  </p>
                </div>

                {/* What I Do */}
                <div className="about2-whatido">
                  <div className="about2-whatido-label">
                    <span className="about2-whatido-line" aria-hidden="true" />
                    What I Do
                  </div>
                  <p className="about2-whatido-text">
                    I connect the data founders already have, <strong>Shopify, GA4, Meta Ads, Klaviyo</strong>, into one reliable source of truth, then turn it into decisions you can actually act on.
                  </p>
                  <p className="about2-whatido-text">
                    Not vanity metrics. Not a dashboard you check once and forget. Just a clear answer to the question every founder eventually asks: <strong>where is the money actually going?</strong>
                  </p>
                </div>
              </div>

              {/* RIGHT — Photo */}
              <div className="about2-right">
                <div className="about2-photo-wrap">
                  <div className="about2-photo-frame">
                    <Image
                      src="/images/photo1.png"
                      alt="MozIntelligence — E-Commerce Growth Intelligence"
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Floating stat card 1 */}
                  <div className="about2-float-card about2-float-card-1">
                    <span className="about2-float-v">CEO</span>
                    <span className="about2-float-l">MOZINTELLIGENCE</span>
                  </div>
                  {/* Floating stat card 2 */}
                  <div className="about2-float-card about2-float-card-2">
                    <span className="about2-float-v">3 Years</span>
                    <span className="about2-float-l">Experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements strip — moved down with extra margin */}
            <div className="about2-achievements" style={{ marginTop: "3rem" }}>
              {achievements.map((a, i) => (
                <div key={i} className="about2-achievement">
                  <div className="about2-achievement-v">{a.value}</div>
                  <div className="about2-achievement-l">{a.label}</div>
                </div>
              ))}
            </div>

            {/* Info card — Education, Languages, Location (matching screenshot style) */}
            <div style={{ marginTop: "2rem" }} className="mx-auto max-w-2xl rounded-2xl border border-[#e5e0f5] bg-white p-6 shadow-[0_10px_40px_-12px_rgba(31,31,31,0.1)] sm:p-8">
              <div className="flex flex-col gap-5">
                {/* Education */}
                <div className="flex items-center justify-between border-b border-[#f0edf7] pb-4">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#8899AA]">Education</span>
                  <span className="text-sm font-semibold text-[#1f1f1f]">University of Rajshahi</span>
                </div>
                {/* Languages */}
                <div className="flex items-center justify-between border-b border-[#f0edf7] pb-4">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#8899AA]">Languages</span>
                  <span className="text-sm font-semibold text-[#1f1f1f]">English &bull; Bengali &bull; Hindi &bull; Urdu</span>
                </div>
                {/* Location */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#8899AA]">Location</span>
                  <span className="text-sm font-semibold text-[#1f1f1f]">Dhaka, Bangladesh</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/pdfs/resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a1a2e] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#2a2a4e]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download CV
                </a>
                <a
                  href="/#case-studies"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#e5e0f5] bg-white px-6 py-3.5 text-sm font-semibold text-[#1f1f1f] transition-all hover:-translate-y-0.5 hover:border-[#6f3ede]/40"
                >
                  <BarChart3 className="h-4 w-4" aria-hidden="true" />
                  Explore My Projects
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Full footer */}
      <SiteFooter />
    </div>
  );
}
