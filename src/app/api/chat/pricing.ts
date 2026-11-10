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
  // PART 1 — E-COMMERCE GROWTH FRAMEWORK
  {
    name: "E-Commerce Health Check Audit",
    category: "Part 1 — E-Commerce Growth Framework",
    price: "Standard from $599 · Deep $1,490–$1,990",
    timeline: "Standard: 7–12 business days · Deep: 15–20 business days",
    description: "Full-store diagnostic audit that reveals revenue leaks, profit risks, tracking gaps, and conversion bottlenecks. Two tiers: Standard and Deep.",
  },
  {
    name: "E-Commerce Performance Improvement",
    category: "Part 1 — E-Commerce Growth Framework",
    price: "Custom project, typically starts from $750",
    timeline: "Typically 2–4 weeks",
    description: "Focused improvement projects that turn Health Check findings into measurable business results across CRO, marketing, products, tracking, retention, or analytics.",
  },
  {
    name: "E-Commerce Growth Intelligence Partnership",
    category: "Part 1 — E-Commerce Growth Framework",
    price: "Advisory from $1,000/month · Performance Partnership from $2,000/month",
    timeline: "Ongoing (monthly)",
    description: "Ongoing strategic and analytical partnership to monitor performance, prioritize opportunities, improve execution, and build sustainable e-commerce growth.",
  },
  // PART 2 — SPECIALIZED E-COMMERCE AUDITS
  {
    name: "E-Commerce Profitability Audit",
    category: "Part 2 — Specialized E-Commerce Audits",
    price: "Starting from $650",
    timeline: "10–14 days",
    description: "True profit margin on every product/channel, where revenue leaks into cost, promotion erosion, and cash-flow timing.",
  },
  {
    name: "Marketing Performance & Profitability Audit",
    category: "Part 2 — Specialized E-Commerce Audits",
    price: "Starting from $750",
    timeline: "10–14 days",
    description: "Channel efficiency, acquisition cost, profitability signals, and where marketing investment may need to change.",
  },
  {
    name: "E-Commerce CRO Audit",
    category: "Part 2 — Specialized E-Commerce Audits",
    price: "Starting at $900",
    timeline: "10–15 days",
    description: "11 CRO analyses revealing where customers drop off, whether the issue is traffic or experience, with a prioritized conversion improvement roadmap.",
  },
  {
    name: "Customer Retention & LTV Audit",
    category: "Part 2 — Specialized E-Commerce Audits",
    price: "Starting from $400",
    timeline: "7–10 days",
    description: "Which customers are about to leave, which channels bring loyal customers, and an upload-ready segmented list for retention campaigns.",
  },
  {
    name: "Product Profitability & Portfolio Audit",
    category: "Part 2 — Specialized E-Commerce Audits",
    price: "Starting from $450",
    timeline: "7–10 days",
    description: "Which products to invest in, optimize, or cut, true margin per SKU, and the best bundling opportunities to increase AOV.",
  },
  {
    name: "Operations Efficiency Audit",
    category: "Part 2 — Specialized E-Commerce Audits",
    price: "Starting from $850",
    timeline: "10–14 days",
    description: "Supplier problems, exact inventory order quantities based on 90-day demand, true return-rate cost, and cash locked in dead stock.",
  },
  {
    name: "Meta Ads Measurement & Profitability Review",
    category: "Part 2 — Specialized E-Commerce Audits",
    price: "Starting at $900",
    timeline: "10–14 days",
    description: "Which Meta campaigns, audiences, creatives, and placements drive profitable results, plus a 30-day prioritized action plan.",
  },
  {
    name: "Marketing Measurement & Attribution",
    category: "Part 2 — Specialized E-Commerce Audits",
    price: "Starting at $1,800",
    timeline: "3–4 weeks (15–20 business days)",
    description: "End-to-end service: Phase 1 technical audit, Phase 2 implementation (GA4, GTM, Meta Pixel, CAPI, Google Ads, UTM), and Phase 3 test-purchase verification — so Shopify, GA4, Meta, and Google numbers finally match.",
  },
  // PART 3 — DATA INFRASTRUCTURE & INTELLIGENCE SYSTEMS
  {
    name: "Data Preparation & Integration",
    category: "Part 3 — Data Infrastructure & Intelligence Systems",
    price: "$150 – $300",
    timeline: "2–3 days",
    description: "One-time data cleaning, preparation, and integration across up to 5 platforms for analysis projects. No automation.",
  },
  {
    name: "Data Pipeline & Dashboard Setup",
    category: "Part 3 — Data Infrastructure & Intelligence Systems",
    price: "$500 – $900",
    timeline: "5–7 days",
    description: "Multi-platform data integration, automated data pipelines, BigQuery warehouse, and dashboard data-source connection.",
  },
  {
    name: "E-Commerce Intelligence Dashboard",
    category: "Part 3 — Data Infrastructure & Intelligence Systems",
    price: "$850",
    timeline: "5–7 days",
    description: "Custom e-commerce intelligence dashboard: revenue, profit, customers, marketing, and products in one live view.",
  },
  {
    name: "Automated Audit Intelligence",
    category: "Part 3 — Data Infrastructure & Intelligence Systems",
    price: "$650 per module",
    timeline: "Per module",
    description: "Automated, recurring audit modules that continuously monitor a specific area of the business and flag changes.",
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
