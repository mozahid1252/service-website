import Image from "next/image";
import { ArrowRight } from "lucide-react";

/* ── tiny class joiner (replaces the cn helper) ── */
const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

/* ── Real tool logos shown inside the tag pills ── */
const TAG_LOGOS: Record<string, { src: string; alt: string }> = {
  SQL: { src: "/images/logos/sql.svg", alt: "SQL" },
  Python: { src: "/images/logos/python.svg", alt: "Python logo" },
  "Power BI": { src: "/images/logos/power-bi.svg", alt: "Power BI logo" },
  PostgreSQL: { src: "/images/logos/postgresql.svg", alt: "PostgreSQL logo" },
  DAX: { src: "/images/logos/dax.svg", alt: "DAX" },
  Excel: { src: "/images/logos/excel.svg", alt: "Excel logo" },
};

/* ── Section data (inlined) ── */
const technicalPortfolio = {
  lead: "The Engineering Behind The Insights",
  title: "Technical Portfolio",
  projects: [
    {
      title: "Behavioral Funnel & Conversion",
      subtitle: "Processing 2.75M Raw E-Commerce Events",
      tags: ["SQL", "Python", "Power BI"],
      engineering:
        "Engineered an end-to-end pipeline processing 2.75 million raw e-commerce events. Implemented a 30-minute inactivity session rule using LAG() window functions to accurately define user behavior.",
      impact:
        'Surfaced a 76.8% cart abandonment profile. Ran 5 A/B tests (t-tests, Chi-Square, ANOVA) in Python to uncover "Hidden Gem" products, identifying $50,000 in untapped revenue with zero additional ad spend.',
      cta: "View Code & Methodology on GitHub",
      href: "https://github.com/mojahid1252",
      image: "/images/process-2.jpg",
    },
    {
      title: "Financial Data Warehouse",
      subtitle: "Star-Schema Warehouse Tracking $53.5M Revenue",
      tags: ["PostgreSQL", "Power BI", "DAX"],
      engineering:
        "Architected a centralized PostgreSQL data warehouse consolidating 52 weeks of transactional data (10,000+ records) into a normalized star schema. Built 20+ DAX measures using SUMX iterators and CALCULATE filters.",
      impact:
        "Powered a 2-page executive dashboard with 39 visuals for proactive risk management. Reconciled 100% of data between PostgreSQL and Power BI, saving the team 15+ hours per week in manual reporting.",
      cta: "View Code & Methodology on GitHub",
      href: "https://github.com/mojahid1252",
      image: "/images/portfolio-warehouse.jpg",
    },
    {
      title: "Churn & Retention Analytics",
      subtitle: "11-Tier RFM Segmentation of 96K Customers",
      tags: ["Python", "SQL", "Power BI", "Excel"],
      engineering:
        "Performed comprehensive EDA on 100K+ orders using Python (Pandas, Seaborn) and SQL. Built an 11-tier RFM segmentation model and computed Customer Lifetime Value (CLV) using cohort retention matrices.",
      impact:
        "Exposed a critical 85% Month-1 churn rate and a 97% one-time buyer rate. Pareto analysis revealed 20% of categories drove 80% of revenue, identifying a $120,000 revenue opportunity via At-Risk customer re-engagement.",
      cta: "View Code & Methodology on GitHub",
      href: "https://github.com/mojahid1252",
      image: "/images/portfolio-churn.jpg",
    },
  ],
  footer: {
    text: "Want to see the full codebase, SQL queries, and architecture?",
    cta: "Explore My Full GitHub Portfolio",
    href: "https://github.com/mojahid1252",
  },
};

/* ── Section component ── */
export function TechnicalPortfolioSection() {
  return (
    <section
      id="technical-portfolio"
      aria-labelledby="portfolio-heading"
      className="bg-[#6f3ede]/[0.08] py-16 sm:py-24 scroll-mt-20"
    >
      <div className="container-site">
        {/* Section heading — dual-color pattern */}
        <div className={cn("flex flex-col items-center gap-3 text-center")}>
          <span className="inline-flex items-center rounded-full bg-surface-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {technicalPortfolio.lead}
          </span>
          <h2
            id="portfolio-heading"
            className="max-w-3xl text-3xl font-semibold leading-tight text-heading sm:text-4xl"
          >
            {technicalPortfolio.title}
          </h2>
        </div>

        {/* Project cards */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {technicalPortfolio.projects.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col overflow-hidden rounded-[5px] border border-border bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(111,62,222,0.16)]"
            >
              {/* Image band — data-related photo + title overlay */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#160b38]/70 to-transparent"
                  aria-hidden="true"
                />
                <h3 className="absolute bottom-4 left-5 right-5 text-lg font-semibold text-white">
                  {p.title}
                </h3>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-semibold text-brand">{p.subtitle}</p>

                {/* Tech tags — each pill carries its real logo */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => {
                    const logo = TAG_LOGOS[t];
                    return (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full bg-surface-soft py-1 pl-2.5 pr-3 text-xs font-semibold text-brand"
                      >
                        {logo ? (
                          <img
                            src={logo.src}
                            alt=""
                            aria-hidden="true"
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 shrink-0 object-contain"
                          />
                        ) : null}
                        {t}
                      </span>
                    );
                  })}
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-heading">The Engineering:</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-body-text">{p.engineering}</p>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-heading">The Impact:</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-body-text">{p.impact}</p>
                </div>

                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand transition-colors hover:text-btn-purple"
                >
                  {p.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Footer CTA box */}
        <div className="mx-auto mt-12 max-w-2xl rounded-[5px] bg-surface-card p-7 text-center">
          <p className="text-base font-medium text-heading">{technicalPortfolio.footer.text}</p>
          <a
            href={technicalPortfolio.footer.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-cta mt-4"
          >
            {technicalPortfolio.footer.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
