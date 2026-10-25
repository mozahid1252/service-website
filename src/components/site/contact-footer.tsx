"use client";

/* ============================================================================
 *  MOZINTELLIGENCE — CONTACT SECTION + FOOTER SECTION · ALL-IN-ONE FILE
 *  (9 files merged into 1 · all data inlined · copy-paste ready)
 * ============================================================================
 *  INSIDE THIS FILE (in order):
 *    [A] DATA (inlined) — site, socialLinks, finalCta, serviceOptions,
 *        budgetOptions, footerData          (was: src/lib/site-data.ts)
 *    [B] cn() helper — dependency-free      (was: src/lib/utils.ts)
 *    [C] <SocialIcons/> — 4 variants: light / purple / white / black
 *    [D] <ContactForm/> — full + quick → POST /api/contact
 *    [E] <CtaBanner/>  — ★ CONTACT SECTION (white bg, black text/icons)
 *    [F] <SiteFooter/> — ★ FOOTER SECTION (purple, sticky via mt-auto)
 *    [G] CSS BLOCK     → paste into src/app/globals.css
 *    [H] API ROUTE     → create src/app/api/contact/route.ts
 *    [I] PRISMA MODEL  → paste into prisma/schema.prisma, then: bun run db:push
 *    [J] MOUNT BLOCK   → paste into src/app/page.tsx
 *
 *  ASSET NEEDED:  /public/logo.svg   (footer brand logo)
 *  DEPENDENCY:    lucide-react       (bun add lucide-react)
 * ========================================================================== */

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
 * [A] DATA — INLINED
 * ══════════════════════════════════════════════════════════════════════════ */

const site = {
  name: "MozIntelligence",
  subtitle: "E-Commerce Growth Focused",
  tagline:
    "We transform raw data into clear, profitable decisions. We don't just deliver numbers, we deliver answers, direction, and results.",
  copyright: "© 2025 Mozahidul Islam · E-Commerce Analytics. All rights reserved.",
  motto: "Built with data. Designed for profit.",
};

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/mozahidul-islam-analyst", icon: "linkedin" },
  { label: "WhatsApp", href: "https://wa.me/8801940131074", icon: "whatsapp" },
  { label: "GitHub", href: "https://github.com/mojahid1252", icon: "github" },
  { label: "Email", href: "mailto:mojahidulislam101010@gmail.com", icon: "email" },
] as const;

const finalCta = {
  kicker: "Still have questions?",
  kickerTitle: "Let's find your next $10,000.",
  titleLead: "Let's Find Your Next",
  titleRest: "$10,000.",
  title2: "Stop Guessing. Start Knowing.",
  description:
    "Every e-commerce business already has opportunities hidden inside its data. The difference is knowing where to look. MozIntelligence helps uncover what's holding back your growth, explains it in plain business language, and provides a clear roadmap to increase revenue, improve profitability, and make smarter decisions.",
  subheading: "Ready to find out exactly where your profit is hiding?",
  subdescription:
    "Book a complimentary 20-minute Discovery Call. We'll understand your business, identify your most urgent data problem, and recommend the right starting point. No pressure, no jargon.",
  primaryCta: { label: "Book My Free Discovery Call", href: "/book" },
  secondaryCta: { label: "Email Me", href: "mailto:mojahidulislam101010@gmail.com" },
};

const serviceOptions = [
  "E-Commerce Health Check",
  "Revenue Growth Accelerator",
  "Data-Driven Growth System",
  "Ongoing Analytics Retainer",
  "Marketing Spend Audit",
  "Customer Retention Audit",
  "Product Portfolio Audit",
  "CRO & Checkout Audit",
  "Profitability & COGS Audit",
  "Operations & Automation Audit",
  "Basic Data Setup",
  "Full Data Pipeline",
  "Full Pipeline + Automation",
  "Not sure — help me figure it out",
  "Custom / Something else",
] as const;

const budgetOptions = [
  "$150 – $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500+",
] as const;

const footerData = {
  blurb: "Stop Guessing. Start Knowing.",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Case Studies", href: "/#case-studies" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/#contact" },
    { label: "Infrastructure", href: "/data-setup-infrastructure" },
    { label: "Why We're Different", href: "/#why-different" },
  ],
  services: [
    { label: "Core E-Commerce Packages", href: "/core-packages" },
    { label: "Specialized Add-On Packages", href: "/specialized-add-on-packages" },
    { label: "Data Setup & Infrastructure", href: "/data-setup-infrastructure" },
    { label: "Custom Analytics & Insights", href: "/#custom-analytics" },
    { label: "Implementation Add-Ons", href: "/#implementation" },
  ],
  detailsSetup: [
    { label: "E-Commerce Health Check", href: "/health-check" },
    { label: "Revenue Growth Accelerator", href: "/revenue-growth-accelerator" },
    { label: "Data-Driven Growth System", href: "/data-driven-growth-system" },
    { label: "Basic Setup", href: "/basic-setup" },
    { label: "Full Pipeline Setup", href: "/full-pipeline-setup" },
    { label: "Full Pipeline + Automation", href: "/full-pipeline-automation" },
  ],
  detailsAudits: [
    { label: "Marketing Audit", href: "/marketing-spend-audit" },
    { label: "Customer Retention Audit", href: "/customer-retention-audit" },
    { label: "Product Portfolio Audit", href: "/product-portfolio-audit" },
    { label: "CRO / Website Audit", href: "/cro-audit" },
    { label: "Profitability Audit", href: "/profitability-audit" },
    { label: "Operations Efficiency Audit", href: "/operations-efficiency-audit" },
    { label: "Meta Ads Performance Audit", href: "/meta-ads-performance-audit" },
  ],
  connect: [
    { label: "LinkedIn", href: "https://linkedin.com/in/mozahidul-islam-analyst", icon: "linkedin" },
    { label: "WhatsApp", href: "https://wa.me/8801940131074", icon: "whatsapp" },
    { label: "GitHub", href: "https://github.com/mojahid1252", icon: "github" },
    { label: "Email", href: "mailto:mojahidulislam101010@gmail.com", icon: "email" },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════
 * [B] cn() HELPER — dependency-free (no clsx / tailwind-merge needed here)
 * ══════════════════════════════════════════════════════════════════════════ */

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/* ═══════════════════════════════════════════════════════════════════════════
 * [C] SOCIAL ICONS — circular icon row, 4 colour variants
 * ══════════════════════════════════════════════════════════════════════════ */

const iconMap = {
  linkedin: Linkedin,
  whatsapp: MessageCircle,
  github: Github,
  email: Mail,
} as const;

interface SocialIconsProps {
  variant?: "light" | "purple" | "white" | "black";
  bob?: boolean;
  className?: string;
}

/**
 * Circular social icon row, matching the reference design's rounded social icons.
 * - light: white circles with purple icons (on light backgrounds)
 * - purple: purple circles with white icons (hero / footer)
 * - white: translucent white circles with white icons (over hero imagery)
 * - black: black circles with white icons (white/black themed sections)
 */
export function SocialIcons({ variant = "purple", bob = true, className }: SocialIconsProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} role="list" aria-label="Social media">
      {socialLinks.map((social, i) => {
        const Icon = iconMap[social.icon as keyof typeof iconMap];
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label={social.label}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1",
              variant === "purple" && "bg-brand text-white hover:bg-brand-light",
              variant === "white" && "border border-white/40 bg-white/10 text-white hover:bg-white hover:text-brand",
              variant === "light" && "bg-white text-brand shadow-sm hover:bg-surface-soft",
              variant === "black" && "bg-heading text-white hover:bg-black hover:shadow-md",
              bob && "animate-bob"
            )}
            style={bob ? { animationDelay: `${i * 0.15}s` } : undefined}
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * [D] CONTACT FORM — full + quick variants, POSTs to /api/contact
 * ══════════════════════════════════════════════════════════════════════════ */

interface ContactFormProps {
  /** compact variant used inside the contact section (footer quick form) */
  variant?: "full" | "quick";
}

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Contact form — fields mirror the site's real contact form:
 * Name, Email, Store URL (optional), Service, Budget, Message.
 */
export function ContactForm({ variant = "full" }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const isQuick = variant === "quick";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: isQuick ? "quick" : "contact",
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          website: String(data.get("website") || ""),
          service: String(data.get("service") || ""),
          budget: String(data.get("budget") || ""),
          message: String(data.get("message") || ""),
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-[5px] border border-brand/30 bg-surface-soft p-8 text-center"
      >
        <p className="text-lg font-semibold text-brand">Message sent!</p>
        <p className="mt-2 text-sm text-body-text">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-[5px] border border-input bg-white px-4 py-3 text-sm text-heading placeholder:text-body-text/50 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25 disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate={false}>
      <div className={isQuick ? "flex flex-col gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div className={isQuick ? "" : "flex flex-col gap-1.5"}>
          <label htmlFor={isQuick ? "q-name" : "c-name"} className="sr-only">
            Name
          </label>
          <input
            id={isQuick ? "q-name" : "c-name"}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Name *"
            className={inputBase}
          />
        </div>
        <div className={isQuick ? "" : "flex flex-col gap-1.5"}>
          <label htmlFor={isQuick ? "q-email" : "c-email"} className="sr-only">
            Email
          </label>
          <input
            id={isQuick ? "q-email" : "c-email"}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email *"
            className={inputBase}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={isQuick ? "q-website" : "c-website"} className="sr-only">
          Store URL (optional)
        </label>
        <input
          id={isQuick ? "q-website" : "c-website"}
          name="website"
          type="url"
          placeholder="Store URL (optional)"
          className={inputBase}
        />
      </div>

      <div className={isQuick ? "" : "grid gap-4 sm:grid-cols-2"}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={isQuick ? "q-service" : "c-service"} className="sr-only">
            What do you need help with?
          </label>
          <select
            id={isQuick ? "q-service" : "c-service"}
            name="service"
            required
            defaultValue=""
            className={`${inputBase} appearance-none ${isQuick ? "" : ""}`}
          >
            <option value="" disabled>
              What do you need help with?
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={isQuick ? "q-budget" : "c-budget"} className="sr-only">
            Budget Range
          </label>
          <select
            id={isQuick ? "q-budget" : "c-budget"}
            name="budget"
            defaultValue=""
            className={`${inputBase} appearance-none`}
          >
            <option value="">Budget Range</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={isQuick ? "q-message" : "c-message"} className="sr-only">
          Message
        </label>
        <textarea
          id={isQuick ? "q-message" : "c-message"}
          name="message"
          rows={isQuick ? 3 : 5}
          placeholder="Message"
          className={`${inputBase} resize-y`}
        />
      </div>

      {error ? (
        <p role="alert" className="rounded-[5px] bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary-cta w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * [E] ★ CONTACT SECTION — white background, black text, black icons,
 *     purple accents (dual-color heading + purple primary CTA)
 * ══════════════════════════════════════════════════════════════════════════ */

/**
 * Contact section — clean white pre-footer block:
 * black dual-color heading (purple lead accent), editorial left-accent
 * highlight, black outline buttons + black social icons, and the quick
 * contact form on a bordered white card with soft shadow.
 */
export function CtaBanner() {
  return (
    <section id="contact" aria-labelledby="cta-heading" className="bg-white py-16 sm:py-20">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy side */}
        <div className="flex flex-col items-start gap-6">
          <h2 id="cta-heading" className="text-3xl font-semibold leading-tight text-heading sm:text-4xl">
            <span className="text-brand">{finalCta.titleLead}</span> {finalCta.titleRest}
          </h2>
          <p className="text-xl font-semibold text-heading">{finalCta.title2}</p>
          <p className="max-w-xl text-base leading-relaxed text-body-text">
            {finalCta.description}
          </p>

          <div className="border-l-2 border-heading pl-5">
            <p className="text-lg font-semibold text-heading">{finalCta.subheading}</p>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-body-text">
              {finalCta.subdescription}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a href={finalCta.primaryCta.href} className="btn-primary-cta">
                {finalCta.primaryCta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={finalCta.secondaryCta.href}
                className="btn-outline-cta !border-heading !px-5 !py-2.5 !text-sm !text-heading hover:!bg-heading hover:!text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> {finalCta.secondaryCta.label}
              </a>
            </div>
            <SocialIcons variant="black" bob={false} className="mt-6" />
          </div>
        </div>

        {/* Quick form side — white card, light-theme fields */}
        <div className="rounded-[5px] border border-border bg-white p-6 shadow-[0_18px_44px_rgba(31,31,31,0.08)] sm:p-8">
          <h3 className="text-xl font-semibold text-heading">Send a Message</h3>
          <p className="mt-1.5 text-sm text-body-text">
            Fill in your details and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="mt-6">
            <ContactForm variant="quick" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * [F] ★ FOOTER SECTION — deep purple, brand column + 4 link columns,
 *     bottom bar, sticky via mt-auto (parent must be min-h-screen flex flex-col)
 * ══════════════════════════════════════════════════════════════════════════ */

const connectIconMap = {
  linkedin: null,
  whatsapp: MessageCircle,
  github: null,
  email: Mail,
} as const;

/**
 * Purple footer in the reference site's style:
 * brand + tagline on the left, link columns on the right,
 * deep purple background with lighter form-field tone accents.
 */
export function SiteFooter() {
  const columns: { title: string; links: readonly { label: string; href: string }[] }[] = [
    { title: "Quick Links", links: footerData.quickLinks },
    { title: "Services", links: footerData.services },
    { title: "Details", links: footerData.detailsSetup },
    { title: "Details", links: footerData.detailsAudits },
  ];

  return (
    <footer className="mt-auto bg-footer-purple text-white">
      {/* Main footer */}
      <div className="container-site grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-8">
        {/* Brand column */}
        <div className="flex flex-col gap-5">
          <a href="/" className="flex items-center gap-2.5" aria-label="MozIntelligence — Home">
            <img src="/images/logo.png" alt="MozIntelligence logo" width={40} height={40} className="h-10 w-10 rounded-lg" />
            <span className="text-xl font-semibold leading-none text-white">
              Moz<span className="text-[#d9c9ff]">Intelligence</span>
            </span>
          </a>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/80">
            {site.subtitle}
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-white/85">{site.tagline}</p>
          <p className="text-lg font-semibold text-white">
            {footerData.blurb.split(".")[0]}.<br />
            {footerData.blurb.split(".")[1]?.trim()}.
          </p>
          <SocialIcons variant="white" bob={false} className="mt-1" />
        </div>

        {/* Link columns */}
        {columns.map((col, ci) => (
          <nav key={`${col.title}-${ci}`} aria-label={col.title} className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-white">{col.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  {/* Use <a> (full page reload) instead of <Link> to avoid
                      client-side navigation state bugs where scroll-reveal
                      animations + dynamic heights break when returning via
                      browser back button. */}
                  <a
                    href={link.href}
                    className="text-sm text-white/85 transition-colors duration-200 hover:text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-white/85">{site.copyright}</p>
          <p className="text-sm font-medium text-white/90">{site.motto}</p>
        </div>
      </div>
    </footer>
  );
}

export function FooterConnectIcon({ icon }: { icon: string }) {
  const Icon = connectIconMap[icon as keyof typeof connectIconMap];
  return Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null;
}
