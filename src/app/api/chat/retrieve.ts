// Simple keyword-based retrieval for the MozIntelligence knowledge base.
// This retrieves the most relevant page(s) based on keyword matching.

import kbData from "./knowledge-base.json";

interface KBPage {
  id: string;
  title: string;
  category?: string;
  url: string;
  content: string;
}

const knowledgeBase: KBPage[] = kbData as KBPage[];

// Keywords that map to specific pages/categories
const KEYWORD_MAP: Record<string, string[]> = {
  "health-check": ["health check", "health-check", "starter", "$500", "$800", "7-10 business days", "tier 1"],
  "revenue-growth-accelerator": ["revenue growth", "growth accelerator", "growth package", "$1,000", "$1,500", "14-21 business days", "tier 2", "rfm", "churn", "cohort", "ltv"],
  "data-driven-growth-system": ["data-driven", "growth system", "advanced", "$2,000", "$4,000", "20-30 business days", "tier 3", "bigquery", "looker studio", "dashboard", "forecast", "15 analyses"],
  "analytics-partner-retainer": ["retainer", "monthly", "ongoing", "partner", "$1,000/month", "$2,500/month", "subscription"],
  "marketing-spend-audit": ["marketing spend", "marketing audit", "ad spend", "roas", "cac", "budget optimization"],
  "customer-retention-audit": ["retention", "customer retention", "churn", "repurchase", "win-back", "retention audit"],
  "product-portfolio-audit": ["product portfolio", "product audit", "inventory", "product performance", "bundle", "cross-sell"],
  "cro-audit": ["cro", "conversion rate", "conversion optimization", "funnel", "checkout", "website audit", "landing page"],
  "profitability-audit": ["profitability", "profit", "margin", "net profit", "cogs", "true profit", "profit audit"],
  "operations-efficiency-audit": ["operations", "efficiency", "operations audit", "process", "workflow"],
  "meta-ads-performance-audit": ["meta ads", "facebook ads", "instagram ads", "meta ads performance", "ad performance"],
  "basic-setup": ["basic setup", "data setup", "infrastructure", "google analytics", "ga4", "tracking", "pixel"],
  "full-pipeline-setup": ["full pipeline", "pipeline setup", "bigquery", "data warehouse", "etl", "sql", "python"],
  "full-pipeline-automation": ["automation", "automated", "full pipeline automation", "cloud functions", "cloud run", "real-time"],
  "homepage": ["about", "why moz", "case study", "case studies", "faq", "process", "tech stack", "technical portfolio", "contact", "book", "mozahidul", "brand", "positioning"],
};

/**
 * Retrieve the most relevant knowledge base pages based on the user's query.
 * Returns top 3 pages with highest keyword match scores.
 */
export function retrieveKnowledge(query: string, maxPages = 3): string {
  const queryLower = query.toLowerCase();
  const scores: { page: KBPage; score: number }[] = [];

  for (const page of knowledgeBase) {
    let score = 0;
    const keywords = KEYWORD_MAP[page.id] || [];

    // Check keyword matches
    for (const kw of keywords) {
      if (queryLower.includes(kw.toLowerCase())) {
        score += kw.length > 10 ? 3 : 2; // Longer keywords get higher weight
      }
    }

    // Check direct content matches
    const contentLower = page.content.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 3);
    for (const word of queryWords) {
      if (contentLower.includes(word)) {
        score += 1;
      }
    }

    // Always include homepage with a base score (it has FAQs, brand info)
    if (page.id === "homepage") {
      score += 1;
    }

    scores.push({ page, score });
  }

  // Sort by score descending and take top pages
  scores.sort((a, b) => b.score - a.score);
  const topPages = scores.slice(0, maxPages).filter(s => s.score > 0);

  // If no matches, return homepage as fallback
  if (topPages.length === 0) {
    const home = knowledgeBase.find(p => p.id === "homepage");
    const fallback = [home].filter(Boolean) as KBPage[];
    return fallback.map(p => `[${p.title}]\n${p.content}`).join("\n\n---\n\n");
  }

  return topPages.map(s => `[${s.page.title}]\n${s.page.content}`).join("\n\n---\n\n");
}

/**
 * Get all knowledge base pages (for debugging or full context).
 */
export function getAllKnowledge(): string {
  return knowledgeBase.map(p => `[${p.title}]\n${p.content}`).join("\n\n---\n\n");
}
