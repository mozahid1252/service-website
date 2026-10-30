/**
 * Blog posts - original editorial content for the MozIntelligence blog.
 *
 * Structure: each post is a sequence of typed blocks so the renderer in
 * /blog/[slug] can style headings, paragraphs, lists and callouts without
 * a markdown dependency. New posts: append to `blogPosts`.
 */

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "callout"; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: { name: string; role: string };
  coverImage: string;
  coverAlt: string;
  content: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "where-is-your-store-leaking-money",
    title: "Where Is Your E-Commerce Store Leaking Money? 7 Data Signals Most Store Owners Ignore",
    excerpt:
      "Your dashboard says traffic is up. Sales look fine. Yet profit keeps shrinking. Here are the seven data signals that quietly drain e-commerce stores - and how to spot each one in your own numbers this week.",
    category: "Profit Analytics",
    date: "October 27, 2026",
    readTime: "8 min read",
    author: { name: "Mozahidul Islam", role: "E-Commerce Growth Scientist" },
    coverImage: "/blog/cover-leaking-money.png",
    coverAlt:
      "Illustration of a cracked purple sales funnel leaking gold coins beside a shopping cart and fading analytics charts",
    content: [
      {
        type: "paragraph",
        text: "Most store owners I meet are not blind - they are busy. They check revenue every morning, they watch the ad account, they know their conversion rate by heart. And still, at the end of the quarter, the bank balance does not match the dashboard. Revenue looks healthy, profit looks thin, and nobody can point to exactly why.",
      },
      {
        type: "paragraph",
        text: "The reason is simple: the metrics that are easy to check are rarely the metrics that leak money. Leaks hide in the gaps between metrics - between traffic and conversion, between revenue and margin, between a first order and a second one. Below are the seven signals I look for first in every e-commerce audit, ordered by how often they turn out to be the real problem.",
      },
      { type: "heading", text: "1. Mobile traffic that converts like desktop doesn't" },
      {
        type: "paragraph",
        text: "For most stores, 70–80% of sessions now come from mobile, but mobile conversion often sits at half (or less) of desktop conversion. Owners see the blended conversion rate and feel fine. Split it by device and the story changes: a store doing 2.4% blended might be at 3.1% on desktop and 1.4% on mobile. That gap is not a curiosity - it is the single most expensive line in the funnel.",
      },
      {
        type: "list",
        items: [
          "Compare conversion rate, add-to-cart rate and checkout completion by device, not blended.",
          "Test your own checkout on a real phone, on mobile data - not on your laptop.",
          "Watch mobile page speed on product pages specifically; that is where paid traffic lands.",
        ],
      },
      {
        type: "image",
        src: "/blog/mobile-checkout.jpg",
        alt: "Hand holding a debit card over a smartphone resting on a laptop keyboard during an online checkout",
        caption:
          "Most sessions now start on a phone in one hand - blended conversion rates quietly average away what happens here.",
      },
      { type: "heading", text: "2. Best-sellers that lose money on every order" },
      {
        type: "paragraph",
        text: "Ranking products by revenue is the most common reporting mistake I see. The product that sells the most units is frequently not the product that makes the most money - after cost of goods, shipping, packaging, payment fees and returns, the picture can invert completely. A store can grow revenue every month while its best-seller quietly eats the margin that funds the ads.",
      },
      {
        type: "paragraph",
        text: "The fix is a profit-ranked product view: revenue minus product cost, shipping cost, discounts and an allowance for returns, per SKU. When I run this for clients, it is common to find that the top 3 revenue products and the top 3 profit products only overlap by one item - and that the 'worst' product by revenue is actually carrying the store.",
      },
      {
        type: "image",
        src: "/blog/warehouse-packing.jpg",
        alt: "Three warehouse workers in a fulfillment center inspecting parcel boxes before shipping",
        caption:
          "Profit per SKU is decided on shelves like this one - revenue rank alone never shows which products actually carry the store.",
      },
      { type: "heading", text: "3. Blended ROAS hiding a rising acquisition cost" },
      {
        type: "paragraph",
        text: "A blended ROAS of 3.2x can hide two very different realities: every channel performing at 3.2x, or one channel at 5x carrying two channels at 1.5x. Blended numbers are averages, and averages protect whatever is underperforming. When acquisition cost creeps up quarter over quarter, blended ROAS often stays flat - the leak flows straight out of gross margin.",
      },
      {
        type: "list",
        items: [
          "Track CAC and ROAS per channel and per campaign, not blended.",
          "Set a break-even ROAS per product margin - a 3x target means nothing if margins differ by SKU.",
          "Review creative fatigue every 2–3 weeks; falling CTR with stable spend is CAC rising in slow motion.",
        ],
      },
      { type: "heading", text: "4. A repeat purchase rate you have never actually calculated" },
      {
        type: "paragraph",
        text: "Ask ten store owners their repeat purchase rate and seven will guess. It is the least-watched number with the largest leverage: acquiring a second order from an existing customer usually costs a fraction of acquiring the first. If 85% of your revenue comes from first-time buyers, every marketing decision is made on the most expensive ground possible.",
      },
      {
        type: "paragraph",
        text: "Cohort analysis makes this visible: group customers by the month of their first order and watch what percentage ever comes back. Flat cohorts month after month mean the store is a revolving door - growth depends entirely on keeping the ad spend tap open.",
      },
      { type: "heading", text: "5. Discount creep" },
      {
        type: "paragraph",
        text: "Discounts rarely arrive all at once; they accumulate. A welcome code, then a cart-abandonment code, then a winback offer, then a 'just because' sale. Six months later 40% of orders carry a discount and nobody has recalculated whether the store is still profitable at that average selling price. Margin erosion through discounts is the slowest leak and the hardest to feel, because revenue keeps ticking along.",
      },
      {
        type: "paragraph",
        text: "Measure average discount as a percentage of gross revenue every month, and measure it per code. Codes that fire constantly without moving incremental volume are pure margin loss.",
      },
      { type: "heading", text: "6. Returns and support tickets treated as an operations cost" },
      {
        type: "paragraph",
        text: "Returns are not paperwork - they are feedback at scale. A rising return rate on one SKU usually means a product page over-promising, a sizing chart failing, or quality slipping. Support tickets cluster the same way: the same five questions, asked a hundred times, are five product-page or checkout problems in disguise.",
      },
      {
        type: "list",
        items: [
          "Track return rate per SKU and per reason code, monthly.",
          "Tag support tickets and rank the top recurring themes each month.",
          "Treat a sudden return-rate spike on one product as a profit incident, not a shipping event.",
        ],
      },
      { type: "heading", text: "7. Decisions made on stale data" },
      {
        type: "paragraph",
        text: "The last leak is the quietest one: latency. If your numbers arrive on the 5th of the month for the month before, you are steering the store by looking in the rear-view mirror. Ad budgets get scaled on week-old signals, stockouts get noticed after the traffic has already been paid for, and a broken checkout can run for days before anyone notices in a report.",
      },
      {
        type: "paragraph",
        text: "A single automated pipeline - platform data flowing into one warehouse, refreshed daily, surfaced in one dashboard - removes most of this latency. That is not a luxury for big teams; it is the cheapest hire a small store can make, because it makes every other decision faster and less wrong.",
      },
      {
        type: "image",
        src: "/blog/analytics-desk.jpg",
        alt: "Store owner analyzing sales charts on a dashboard while working on a laptop in a bright office",
        caption:
          "A dashboard refreshed daily is the cheapest fix for the latency leak - decisions made on live data beat decisions made on last month's report.",
      },
      { type: "heading", text: "What to do this week" },
      {
        type: "list",
        items: [
          "Split conversion rate by device and write the mobile-vs-desktop gap on a sticky note.",
          "Pick your top 5 products by revenue and re-rank them by actual profit per order.",
          "Calculate your true repeat purchase rate for the last 6 months - cohorts, not guesses.",
          "Sum every discount code's cost last month and ask what it bought you.",
          "Check how old your data is the next time you make a spending decision.",
        ],
      },
      { type: "heading", text: "The bottom line" },
      {
        type: "paragraph",
        text: "None of these seven signals require new traffic, new products or a bigger ad budget. They require looking at data you already own, from a slightly different angle. That is usually where the fastest profit lives - not in growing the top line, but in stopping the leaks underneath it.",
      },
      {
        type: "callout",
        text: "Want to see exactly where your store is leaking? Book a complimentary 20-minute discovery call and we will identify your most urgent data problem - no pressure, no jargon.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
