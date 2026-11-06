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
  kicker: "Still Have Questions?",
  title: "Let's Find the Right Starting Point for Your Business",
  description: "Whether you need a full business diagnosis, a focused audit, prepared data, a custom dashboard, or a longer-term growth engagement, we'll help you choose the service that fits your actual situation.",
};

const faqs = [
  {
    question: "Which service should I start with?",
    answer: "That depends on the problem you are trying to solve. Choose the E-Commerce Health Check Audit if you are not sure where the main problem is and need a broad diagnosis. Choose a Specialized E-Commerce Audit if you already know the area that needs attention — for example profitability, marketing performance, CRO, customer retention, products, operations, or Meta Ads. Choose Data Preparation & Integration if your data needs to be collected, cleaned, or organized before an audit or analysis. Choose the E-Commerce Intelligence & Audit Automation Dashboard if you want a connected dashboard, deeper automated insights, or recurring monitoring. For a unique business question, choose Custom Analytics & Decision Support.",
  },
  {
    question: "What is the difference between the E-Commerce Health Check and a Specialized Audit?",
    answer: "The E-Commerce Health Check Audit is a broader review of the overall business. It helps identify the main areas creating revenue leaks, profit pressure, tracking problems, conversion issues, or operational risk. A Specialized Audit focuses on one specific business area, such as: E-Commerce Profitability, Marketing Performance & Profitability, Meta Ads Measurement & Profitability, CRO, Customer Retention & LTV, Product Profitability & Portfolio, Operations Efficiency, or Marketing Measurement & Attribution. You do not need to purchase both. The right starting point depends on how clearly you already understand the problem.",
  },
  {
    question: "I know my problem already. Do I need to buy a full Health Check?",
    answer: "No. If you already know that the problem is related to marketing, Meta Ads, conversion, retention, products, profitability, operations, or measurement, you can start with the relevant Specialized Audit. The Health Check is more suitable when the problem is broader or unclear.",
  },
  {
    question: "Do I need to have my data perfectly organized before we work together?",
    answer: "No. Your data does not need to be perfect before you contact us. If your data is scattered across Shopify, GA4, Meta Ads, Google Ads, CRM platforms, spreadsheets, inventory files, or other sources, we can first assess what is available and what is missing. If preparation is required, you can add Data Preparation & Integration. This service prepares the required data for a selected audit, Health Check, or custom analysis.",
  },
  {
    question: "Why is there a separate fee for Data Preparation & Integration?",
    answer: "Data preparation is a separate technical service because collecting, cleaning, mapping, organizing, and validating data requires additional work. A Shopify dashboard alone may not contain all the information needed to review: product profitability, marketing efficiency, customer retention, attribution, refunds and returns, contribution margin, product costs, or channel economics. Data Preparation & Integration allows us to create a more reliable dataset before the actual analysis begins.",
  },
  {
    question: "What is the difference between Data Preparation and the Intelligence Dashboard?",
    answer: "Data Preparation & Integration prepares the data for a specific audit or analysis. The E-Commerce Intelligence Dashboard connects data sources into a custom reporting environment where you can monitor business KPIs over time. In simple terms: Data Preparation = Prepare the data for analysis. Intelligence Dashboard = Build a connected system to monitor the business. The dashboard may include sales, marketing, customer, product, profitability, conversion, inventory, and returns views depending on the selected scope.",
  },
  {
    question: "If I buy an automated module directly, do I need to buy the full audit first?",
    answer: "No. You can purchase an Automated Audit Intelligence module directly if the required data and dashboard foundation are available. The module includes the limited initial data and logic review required to configure: KPIs, calculations, segments, thresholds, status labels, insight rules, and dashboard views. This setup review is not a full one-time strategic audit. It does not include a complete audit report, detailed business investigation, or implementation plan unless separately scoped.",
  },
  {
    question: "Does the automated system provide recommendations?",
    answer: "Selected Automated Audit Intelligence modules may provide: text-based insight summaries, performance signals, status labels, and basic recommended next steps. Examples include: Review, Monitor, Maintain, Test, Prioritize, Investigate, or Reduce. These are decision-support signals. They are not guaranteed instructions, and they do not replace business judgment or implementation work.",
  },
  {
    question: "I already have a dashboard. Can you still help?",
    answer: "Yes. If your existing dashboard and data structure are usable, we may be able to add: new KPI views, audit-specific intelligence, business rules, insight summaries, basic recommendations, monitoring logic, scheduled refreshes, or error alerts. The exact scope depends on the dashboard platform, data access, data quality, and current architecture.",
  },
  {
    question: "Does the dashboard update automatically?",
    answer: "Not by default. The standard E-Commerce Intelligence Dashboard is a one-time setup and handover service. Automated updates are available through Automated Scheduling, Refresh Monitoring & Error Alerts. This optional add-on starts from $200.",
  },
  {
    question: "Are error alerts included in the dashboard setup?",
    answer: "The standard setup includes initial data validation and an initial pipeline error check before handover. Ongoing alerts require the automation add-on, which may include: failed-refresh alerts, missing-data alerts, data-loading error notifications, refresh logs, or automated validation. The dashboard and data preparation services generally support up to five standard data sources, unless a larger custom scope is agreed.",
  },
  {
    question: "Will Shopify, GA4, Meta, and Google Ads show the same numbers?",
    answer: "Not necessarily. Different platforms use different attribution windows, tracking methods, time zones, definitions, and reporting models. The goal is not always to force every platform to show the exact same number. The goal is to: identify why the numbers differ, find missing or duplicate data, clarify which source is suitable for which decision, improve confidence in the reporting, and highlight important measurement limitations. For this type of review, you may need: Marketing Measurement & Attribution Review, Meta Ads Measurement & Profitability Review, or Data Preparation & Integration.",
  },
  {
    question: "Can you fix the problems you identify?",
    answer: "The audit or review will identify the problem, explain its likely impact, and provide a prioritized action plan. Implementation may be scoped separately, including: tracking correction, pixel or CAPI implementation, GTM or GA4 changes, dashboard changes, website or landing-page improvements, campaign restructuring, creative testing, CRM or retention implementation, or operations improvements. The base audit price does not automatically include implementation.",
  },
  {
    question: "I have a specific urgent problem. Do I have to buy a large package?",
    answer: "No. You can start with a focused service such as: Meta Ads Measurement & Profitability Review, E-Commerce CRO Audit, Customer Retention & LTV Audit, Product Profitability & Portfolio Audit, Operations Efficiency Audit, or Marketing Measurement & Attribution Review. If your question does not fit an existing service, you can request Custom Analytics & Decision Support.",
  },
  {
    question: "My revenue is growing, but I do not feel like I am making more money. Can you help?",
    answer: "Yes. The best starting points may be: E-Commerce Profitability Audit, Product Profitability & Portfolio Audit, Marketing Performance & Profitability Audit, or Customer Retention & LTV Audit. The review may examine: product costs, marketing costs, discounts, refunds and returns, shipping and payment fees, channel economics, customer value, contribution-margin signals, or revenue versus profit trends. Complete profitability analysis depends on the availability and quality of the required cost data.",
  },
  {
    question: "How much of my time is required?",
    answer: "Usually, we need your help during: initial scope confirmation, data and platform access, business context clarification, review of important findings, and final walkthrough or strategy call (where included). The exact time required depends on the service, data availability, access requirements, and complexity.",
  },
  {
    question: "I do not have a marketing or analytics team. Will I be able to use the findings?",
    answer: "Yes. The deliverables are designed to make the findings understandable and actionable. Depending on the selected service, you may receive: a decision-ready report, prioritized findings, scorecards or comparison tables, clear action categories, recommended next steps, a roadmap, or a review call. Implementation support can be scoped separately if you need help carrying out the recommendations.",
  },
  {
    question: "Is my business data secure?",
    answer: "We only request the access and data required for the agreed scope. Where possible, access should be provided through appropriate permissions rather than unnecessary full-account access. Credentials, files, and data handling should follow the agreed secure process. You should also avoid sharing passwords directly when a platform supports user invitations, partner access, API permissions, or restricted roles.",
  },
  {
    question: "How quickly can we start?",
    answer: "The start date depends on: service availability, scope confirmation, platform access, data delivery, required files, and technical complexity. Work usually begins after the scope, access, and required data have been confirmed.",
  },
  {
    question: "Are cloud, software, and third-party connector costs included?",
    answer: "Not always. Cloud hosting, BigQuery, software subscriptions, third-party connectors, API fees, and other external platform costs may be quoted separately unless specifically included in your proposal.",
  },
  {
    question: "Is ongoing maintenance included?",
    answer: "No. One-time audits, data preparation, dashboard setup, and intelligence module configuration include the agreed initial scope and handover. Ongoing maintenance may be scoped separately for: source changes, API changes, dashboard updates, KPI changes, rule changes, pipeline troubleshooting, scheduled refresh monitoring, or additional data sources.",
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
