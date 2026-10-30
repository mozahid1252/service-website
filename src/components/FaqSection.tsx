"use client";

/* ============================================================
   FAQ SECTION — ALL-IN-ONE (single file)
   Ek file e sob: data + section heading + accordion
   (pure React — @radix-ui/react-accordion lagbe na,
    smooth open/close animation built-in)
   Design : DataDrip design system
   Content: MozIntelligence — 11 verbatim FAQs
   ============================================================ */

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* ------------------------------------------------------------
   1) DATA — sob ekhane edit korba
   ------------------------------------------------------------ */
const faqHeading = {
  kicker: "Still have questions?",
  title: "Let's find your next $10,000.",
  description: "Everything you need to know before we work together.",
};

const faqs = [
  {
    question:
      "I've already bought the Health Check or Growth Package. Do I have to pay full price again to upgrade?",
    answer:
      "No, absolutely not. You only pay for what's new. If you start with a smaller package and want to upgrade later, every dollar you already spent is deducted from the new package price. We simply subtract your previous payment and focus on delivering the new analyses and automated tools you need.",
  },
  {
    question: "My marketing agency already provides dashboards. Why do I need you?",
    answer:
      "That's not a problem. Your agency focuses on running and optimizing your marketing. I focus on understanding the business behind the numbers. I go beyond ROAS and campaign metrics by connecting your marketing data with product costs, returns, shipping, customer value, and true profitability. This helps reveal what your dashboards may not show: where you're actually making money, where you're losing it, and what you should do next. Your agency optimizes the campaigns. I uncover the business opportunities behind them.",
  },
  {
    question: "Do I need to have my data perfectly organized before we work together?",
    answer:
      "Absolutely not. Most founders have messy data spread across Shopify, GA4, and ad platforms that don't talk to each other. That's exactly what my Data Setup & Infrastructure service fixes. I handle 100% of the backend engineering (SQL, Python, BigQuery) to clean, merge, and structure your data. You never have to touch a single line of code.",
  },
  {
    question: "Why is there a separate fee for the Data Setup? Can't you just look at my Shopify dashboard?",
    answer:
      "Shopify's default dashboard only shows about 10% of the picture. To find the hidden profit leaks, I have to pull raw data from all your platforms, align currencies and timezones, and merge them into one central database. This is a one-time investment that pays for itself with every decision you make going forward. You only pay for the platforms you actually use.",
  },
  {
    question: "Does my store really need all 15 analyses in the Data-Driven Growth System?",
    answer:
      "Not always. We can build all 15 for you, or fully customize them based on your needs. If you want the complete picture, we are happy to run all 15 deep analyses. However, every store gets our 8 Core Analytics Foundations (Revenue, Margins, RFM Segments, LTV, Funnels, and Live Dashboards), and for the rest, we can pick only the modules that make the most sense for your business: If you have many products: We activate Inventory Forecasting & Return Pattern Analysis. If you have a few core products: We focus heavily on Market Basket Cross-Sells & LTV Cohorts. If you run heavy discounts: We prioritize Margin Erosion & Promo Strategy Analysis. During onboarding, you can choose to get all 15 analyses or customize the remaining modules so you get zero fluff and 100% actionable data.",
  },
  {
    question:
      "I have a specific, urgent problem (like high return rates or declining ad performance). Do I have to buy a full $1,500 package?",
    answer:
      "No. You don't need to commit to a full package if you only need help solving one specific problem. You can choose one of my Specialized Add-On Audits, such as a CRO/Website Audit, Profitability Audit, Marketing Audit, or another focused audit designed around a specific business issue. These are deep-dive, standalone engagements delivered in 7–14 days. If your problem doesn't fit into a predefined audit, you can also use Part 4: Custom Analytics & Insights. I can build a custom analysis specifically around the business question you need answered, using the data and context relevant to your situation. You pay for the problem you need solved, not for analysis you don't need.",
  },
  {
    question: "My revenue is growing, but I don't feel like I'm making more money. Can you help?",
    answer:
      'This is the most common scenario I see. Revenue is vanity; profit is sanity. I will run a Profit Reality Check on your top products, calculate your true margins (after COGS, ad spend, returns, and shipping), and show you exactly which "best-sellers" are quietly draining your bank account.',
  },
  {
    question: "How much of my time is required during the engagement?",
    answer:
      "Very little. I built this process specifically for busy founders. I handle the data extraction, engineering, and analysis. You simply provide initial platform access, and then join me for the final strategy call to review the findings and action plan. You don't need to babysit the project.",
  },
  {
    question: "I don't have a marketing team. Will I actually be able to implement your recommendations?",
    answer:
      "Absolutely. I make every recommendation simple enough for a founder or small team to understand and implement without needing a technical background or a dedicated marketing team. You won't get complicated instructions or a 50-page technical report. Every finding comes with a clear, prioritized action plan written in plain business language, such as \"Pause this ad,\" \"Fix this checkout step,\" or \"Target these high-value customers.\" And if you still don't have the time, resources, or confidence to implement something yourself, that's where my Implementation Add-Ons come in. You can choose Done-With-You support for guided implementation or Done-for-You support where I handle the implementation for you. So you can either implement it yourself with clear guidance, or have me help you put it into action.",
  },
  {
    question: "I'm nervous about giving access to my Shopify and ad accounts. Is my data secure?",
    answer:
      "100% secure. I use strict, permission-based API connections. For live dashboard and retainer clients, I store all API keys and tokens securely using environment variables or Secret Manager — never exposed, never at risk. Your data is used solely for your analysis and is never shared.",
  },
  {
    question: "How fast can we start? I'm bleeding money.",
    answer:
      "The E-Commerce Health Check is delivered in exactly 5–7 days. If your business is losing $1,690 a month, you don't have 3 months to wait for a consultant to figure it out. You need to know exactly what to fix this week.",
  },
];

/* ------------------------------------------------------------
   2) ACCORDION ITEM — pure React, smooth animation,
      single-open (ek sathe ek tai khule)
   ------------------------------------------------------------ */
function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentId = `faq-content-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`mb-3 overflow-hidden rounded-[5px] border bg-surface-card px-5 transition-colors duration-300 ${
        isOpen ? "border-brand/30 bg-white" : "border-border"
      }`}
    >
      {/* Trigger — full-row button, keyboard accessible */}
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-semibold text-heading transition-colors hover:text-brand"
      >
        <span>{question}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 translate-y-0.5 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-brand" : "text-body-text/60"
          }`}
        />
      </button>

      {/* Content — grid-rows animation trick (dependency-free smooth collapse) */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed text-body-text">{answer}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   3) SECTION — puro FAQ section
   ------------------------------------------------------------ */
export function FaqSection() {
  // single-open behavior: je item khula ache shudhu tar index
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-surface-soft py-16 sm:py-24 scroll-mt-20">
      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          {/* ---- Section heading: kicker pill + title + description ---- */}
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {faqHeading.kicker}
            </span>
            <h2
              id="faq-heading"
              className="max-w-3xl text-3xl font-semibold leading-tight text-heading sm:text-4xl"
            >
              {faqHeading.title}
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-body-text">
              {faqHeading.description}
            </p>
          </div>

          {/* ---- Accordion list ---- */}
          <div className="mt-10">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.question}
                index={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
