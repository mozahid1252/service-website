import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mozintelligence.vercel.app";
  const lastModified = new Date();

  const pages: {
    url: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
  }[] = [
    { url: "/", changeFrequency: "weekly", priority: 1.0 },
    { url: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { url: "/book", changeFrequency: "yearly", priority: 0.6 },
    /* Part 1 — E-Commerce Growth Framework */
    { url: "/health-check", changeFrequency: "monthly", priority: 0.9 },
    { url: "/performance-improvement", changeFrequency: "monthly", priority: 0.9 },
    { url: "/growth-partnership", changeFrequency: "monthly", priority: 0.9 },
    /* Part 2 — Specialized E-Commerce Audits */
    { url: "/marketing-spend-audit", changeFrequency: "monthly", priority: 0.8 },
    { url: "/customer-retention-audit", changeFrequency: "monthly", priority: 0.8 },
    { url: "/product-portfolio-audit", changeFrequency: "monthly", priority: 0.8 },
    { url: "/cro-audit", changeFrequency: "monthly", priority: 0.8 },
    { url: "/profitability-audit", changeFrequency: "monthly", priority: 0.8 },
    { url: "/operations-efficiency-audit", changeFrequency: "monthly", priority: 0.8 },
    { url: "/meta-ads-performance-audit", changeFrequency: "monthly", priority: 0.8 },
    { url: "/e-commerce-tracking-attribution-review", changeFrequency: "monthly", priority: 0.8 },
    /* Part 3 — Data Infrastructure & Intelligence Systems */
    { url: "/data-preparation-integration", changeFrequency: "monthly", priority: 0.8 },
    { url: "/data-pipeline-dashboard-setup", changeFrequency: "monthly", priority: 0.8 },
    { url: "/e-commerce-intelligence-dashboard", changeFrequency: "monthly", priority: 0.8 },
    { url: "/automated-audit-intelligence", changeFrequency: "monthly", priority: 0.8 },
    /* Part 4 — Custom Analytics */
    { url: "/custom-analytics-insights", changeFrequency: "monthly", priority: 0.8 },
    /* Blog posts */
    { url: "/blog/where-is-your-store-leaking-money", changeFrequency: "monthly", priority: 0.7 },
    { url: "/blog/shopify-checkout-hijacking-2026", changeFrequency: "monthly", priority: 0.7 },
    /* About pages */
    { url: "/about-mozintelligence", changeFrequency: "yearly", priority: 0.5 },
    { url: "/about-founder", changeFrequency: "yearly", priority: 0.5 },
  ];

  return pages.map((p) => ({
    url: `${baseUrl}${p.url}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
