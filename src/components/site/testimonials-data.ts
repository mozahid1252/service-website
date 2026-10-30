/* ================================================================
   MozIntelligence — Testimonials
   Copy verbatim from /tmp/live/text-sec12.txt (client-approved).
   NOTE: each quote is stored EXACTLY as in the dump, including its
   own surrounding straight quotation marks (some quotes contain
   inner quotation marks — do not "fix" the nesting).
   ================================================================ */

export type Testimonial = {
  quote: string;
  author: string;
  before: string;
  after: string;
};

export type TestimonialsData = {
  kicker: string;
  title: string;
  intro: string;
  items: Testimonial[];
};

export const testimonialsData: TestimonialsData = {
  kicker: "Founders, Transformed",
  title: "Testimonials",
  intro:
    "Don't take my word for it. Listen to the founders who were running fast in the wrong direction, until the data showed them the truth.",
  items: [
    {
      quote:
        "\"The phone call on Day 5 of the analysis, when I was told my net profit was $84, is the most important phone call of my business life. I cried. I called my husband. He held me. Then he said: 'Now you know. Now you can fix it.'\"",
      author: "Aisha R., ZARA Organics",
      before: "$84/year",
      after: "$48,400/month",
    },
    {
      quote:
        "\"I was 72 hours from closing my business. The Health Check showed me something that destroyed and rebuilt me at the same time: I wasn't failing because of bad products. I was failing because I had no idea what was actually happening in my own business.\"",
      author: "Marcus T., NOIRE Collective",
      before: "-$1.7K/mo",
      after: "+$33K/mo in 60–70 days",
    },
    {
      quote:
        "\"In running, we have a concept called junk miles. Miles that feel productive because you're moving. But they don't make you faster. My $8,400/month in ads were junk miles. The best investment I've ever made cost less than my running shoes.\"",
      author: "Daniel O., PACE Performance",
      before: "$425/mo",
      after: "$31,400/mo",
    },
    {
      quote:
        "\"I was earning $11.59 an hour. Running a business I worked 11 hours a day to build. The Health Check showed me three things I was giving away for free that I should have been charging for. My brand identity is the jewelry. Not the freebies.\"",
      author: "Sofia M., LUNA Jewelry Co.",
      before: "Hourly Rate: $11.59",
      after: "$66.81",
    },
    {
      quote:
        "\"I literally could not sleep after watching your Loom video. I paused the Macramé ads the same night. I had NO IDEA I was losing money on my best-selling product. I've been promoting it for 8 months!\"",
      author: "Sarah K., UrbanNest Home Decor",
      before: "$3.4K/mo",
      after: "$7.8K/mo",
    },
    {
      quote:
        "\"My favorite result from this analysis has nothing to do with money. It's the email I now send to customers when their dog turns 7 years old. The data wasn't just revenue. It was relationships waiting to happen. I just needed someone to show me how to see it.\"",
      author: "James C., PawPerfect Premium",
      before: "$12.4K/mo",
      after: "$29.8K/mo",
    },
    {
      quote:
        "\"I want to be careful with how I say this, because I don't want it to sound like an exaggeration. I paid $650 for a Growth Package. In 45 days my monthly net profit went from $18,400 to $41,380. I didn't launch new products. I didn't increase my ad spend. I just finally understood what my data was telling me.\"",
      author: "Priya S., LUMIÈRE Beauty Co.",
      before: "$18.4K/mo",
      after: "$41.3K/mo",
    },
  ],
};
