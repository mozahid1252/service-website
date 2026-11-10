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
  "health-check": ["health check", "health-check", "starter", "$599", "$1,490", "$1,990", "7-12 business days", "diagnostic", "tier 1"],
  "marketing-spend-audit": ["marketing spend", "marketing audit", "ad spend", "roas", "cac", "budget optimization", "marketing performance"],
  "customer-retention-audit": ["retention", "customer retention", "churn", "repurchase", "win-back", "retention audit"],
  "product-portfolio-audit": ["product portfolio", "product audit", "inventory", "product performance", "bundle", "cross-sell"],
  "cro-audit": ["cro", "conversion rate", "conversion optimization", "funnel", "checkout", "website audit", "landing page"],
  "profitability-audit": ["profitability", "profit", "margin", "net profit", "cogs", "true profit", "profit audit"],
  "operations-efficiency-audit": ["operations", "efficiency", "operations audit", "process", "workflow"],
  "meta-ads-performance-audit": ["meta ads", "facebook ads", "instagram ads", "meta ads performance", "ad performance"],
  "e-commerce-tracking-attribution-review": ["tracking", "attribution", "ga4", "pixel", "conversion tracking", "event tracking", "numbers don't match", "numbers do not match", "reconciliation", "utm", "capi", "server-side", "double counted", "tracking review", "attribution review"],
  "full-pipeline-setup": ["full pipeline", "pipeline setup", "bigquery", "data warehouse", "etl", "sql", "python"],
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
