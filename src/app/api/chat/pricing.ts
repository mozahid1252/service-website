// AUTHORITATIVE PRICING TABLE — Single Source of Truth
// These prices and timelines override any conflicting information found
// elsewhere on the website. The chatbot MUST use these exact values.

export interface PackageInfo {
  name: string;
  category: string;
  price: string;
  timeline: string;
  description: string;
}

export const AUTHORITATIVE_PRICING: PackageInfo[] = [
  // PART 1 — CORE E-COMMERCE PACKAGES
  {
    name: "E-Commerce Health Check",
    category: "Part 1 — Core E-Commerce Packages",
    price: "$150 – $300",
    timeline: "5–7 Days",
    description: "Starter diagnostic package that identifies immediate revenue and profitability leaks. Includes 4 focused analyses, executive summary PDF, visual dashboard, action priority list, and 30-minute walkthrough.",
  },
  {
    name: "E-Commerce Growth & Profit Intelligence",
    category: "Part 1 — Core E-Commerce Packages",
    price: "$600 – $1,200",
    timeline: "10–14 Days",
    description: "Growth package with deeper RFM customer segmentation, channel LTV, churn analysis, and marketing budget optimization. Includes 8 analyses and strategy report.",
  },
  {
    name: "Data-Driven Growth System",
    category: "Part 1 — Core E-Commerce Packages",
    price: "$2,000 – $4,000",
    timeline: "20–30 Days",
    description: "Advanced package with 15 total analyses, live custom Looker Studio dashboard, 90-day forecast document, segmented customer DB export, and marketing budget optimization plan.",
  },
  {
    name: "Analytics Partner Retainer",
    category: "Part 1 — Core E-Commerce Packages",
    price: "$500 – $1,200/mo",
    timeline: "Ongoing (Min. 2-month commitment)",
    description: "Monthly retainer for ongoing partnership. Includes continuous analysis, dashboard maintenance, and strategic support.",
  },
  // PART 2 — SPECIALIZED ADD-ON PACKAGES
  {
    name: "Marketing Spend Audit",
    category: "Part 2 — Specialized Add-On Packages",
    price: "$300 – $600",
    timeline: "7–10 Days",
    description: "Deep-dive audit of marketing spend efficiency, ROAS, CAC, and budget optimization across channels.",
  },
  {
    name: "Customer Retention Audit",
    category: "Part 2 — Specialized Add-On Packages",
    price: "$350 – $700",
    timeline: "7–12 Days",
    description: "Analyzes retention, churn, repurchase rates, and win-back opportunities for existing customers.",
  },
  {
    name: "Product Portfolio Audit",
    category: "Part 2 — Specialized Add-On Packages",
    price: "$350 – $800",
    timeline: "7–14 Days",
    description: "Reviews product performance, inventory opportunities, bundling, and cross-sell potential.",
  },
  {
    name: "CRO Audit",
    category: "Part 2 — Specialized Add-On Packages",
    price: "$250 – $500",
    timeline: "7–10 Days",
    description: "Conversion rate optimization audit covering funnel analysis, checkout friction, and landing page performance.",
  },
  {
    name: "Profitability Audit",
    category: "Part 2 — Specialized Add-On Packages",
    price: "$350 – $700",
    timeline: "8–12 Days",
    description: "True profitability analysis after COGS, ad spend, returns, and shipping to find where money is actually leaking.",
  },
  {
    name: "Operations Efficiency Audit",
    category: "Part 2 — Specialized Add-On Packages",
    price: "$400 – $800",
    timeline: "10–14 Days",
    description: "Reviews operational workflows, process efficiency, and identifies bottlenecks in your e-commerce operations.",
  },
  {
    name: "Meta Ads Performance Audit",
    category: "Part 2 — Specialized Add-On Packages",
    price: "$500 – $900",
    timeline: "10–14 Days",
    description: "Specialized audit of Meta (Facebook/Instagram) ad performance, creative analysis, and budget allocation.",
  },
  // PART 3 — DATA SETUP & INFRASTRUCTURE
  {
    name: "Basic Setup",
    category: "Part 3 — Data Setup & Infrastructure",
    price: "$150 – $300",
    timeline: "2–3 Days",
    description: "One-time data setup connecting 2–3 platforms (Shopify, GA4, Meta Ads, Google Ads, etc.) for analysis. No automation — for one-time analysis use.",
  },
  {
    name: "Full Pipeline Setup",
    category: "Part 3 — Data Setup & Infrastructure",
    price: "$500 – $900",
    timeline: "5–7 Days",
    description: "Full data pipeline setup with BigQuery integration, SQL/Python transformation, and data warehouse architecture.",
  },
  {
    name: "Full Pipeline + Automation",
    category: "Part 3 — Data Setup & Infrastructure",
    price: "$700 – $1,200",
    timeline: "7–10 Days",
    description: "Complete automated data pipeline with cloud functions, real-time updates, and scheduled reporting. Includes everything in Full Pipeline Setup plus automation.",
  },
];

// Format the pricing table as a readable string for the system prompt
export function formatPricingTable(): string {
  let output = "AUTHORITATIVE PRICING TABLE (Single Source of Truth)\n";
  output += "Use these EXACT prices and timelines. Never invent or modify them.\n\n";

  const categories = [...new Set(AUTHORITATIVE_PRICING.map(p => p.category))];
  for (const cat of categories) {
    output += `${cat}\n`;
    output += `${"-".repeat(cat.length)}\n`;
    for (const pkg of AUTHORITATIVE_PRICING.filter(p => p.category === cat)) {
      output += `  ${pkg.name}\n`;
      output += `    Price: ${pkg.price}\n`;
      output += `    Timeline: ${pkg.timeline}\n`;
      output += `    ${pkg.description}\n\n`;
    }
  }
  return output;
}
