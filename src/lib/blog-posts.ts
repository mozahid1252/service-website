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
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "callout"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

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
    slug: "shopify-checkout-hijacking-2026",
    title: "Shopify Checkout Hijacking in 2026: How Third-Party Apps Put Customer Payments at Risk",
    excerpt:
      "A customer clicks checkout, lands on a fake payment page, then returns to your real store and completes the order. Here is how the October 2026 Shopify checkout hijacking incidents worked - and what merchants should check right now.",
    category: "Shopify Security",
    date: "October 31, 2026",
    readTime: "9 min read",
    author: { name: "Mozahidul Islam", role: "E-Commerce Growth Scientist" },
    coverImage: "/blog/shopify-checkout-hijacking-cover.png",
    coverAlt:
      "Diverse cybersecurity analytics team reviewing Shopify checkout security alerts and payment flow diagrams on large monitors in a bright modern office",
    content: [
      {
        type: "paragraph",
        text: "Imagine a customer visiting your Shopify store, adding products to their cart, and clicking the checkout button. Everything looks normal. But instead of reaching your legitimate payment page, the customer is redirected to a fake checkout page designed to collect their credit card information.",
      },
      {
        type: "paragraph",
        text: "After entering their details, the customer is redirected back to your actual Shopify checkout. They complete their purchase, and the order appears normally in your Shopify Admin. From the merchant's perspective, nothing appears unusual.",
      },
      {
        type: "paragraph",
        text: "This is the type of checkout hijacking activity that affected some Shopify merchants during October 2026. Between October 10 and October 18, multiple third-party Shopify applications were involved in incidents where unauthorized code redirected shoppers toward fraudulent payment pages.",
      },
      {
        type: "paragraph",
        text: "The incidents raised an important question for e-commerce businesses: How secure is your Shopify store when third-party applications have access to your storefront?",
      },
      {
        type: "paragraph",
        text: "In this article, we will examine what happened, how the attacks worked, which applications were involved, and what Shopify merchants should do to protect their stores and customers.",
      },
      {
        type: "image",
        src: "/blog/checkout-redirect-attack-flow.jpg",
        alt: "Laptop screen showing a browser redirect arrow from a legitimate online store checkout button to a fraudulent warning payment page",
        caption:
          "The hijacking pattern: a legitimate checkout click silently redirects the shopper to an external fraudulent payment page before returning them to the genuine store.",
      },
      { type: "heading", text: "1. What Happened in the October 2026 Shopify Security Incident?" },
      {
        type: "paragraph",
        text: "The October incidents involved unauthorized changes to configurations associated with certain third-party Shopify applications. These changes allowed malicious scripts to load on affected storefronts.",
      },
      {
        type: "paragraph",
        text: "When shoppers clicked checkout, the scripts could redirect them to external pages designed to imitate legitimate payment interfaces. The fraudulent pages were intended to capture payment information before sending shoppers back to the genuine Shopify checkout.",
      },
      {
        type: "paragraph",
        text: "This created a particularly concerning situation: an order could still appear successfully completed even though the customer had interacted with a fraudulent payment page.",
      },
      {
        type: "paragraph",
        text: "Three applications were confirmed by their developers as involved in the October incidents:",
      },
      {
        type: "table",
        headers: ["Application", "Incident date", "Reported issue"],
        rows: [
          ["Hulk Product Options", "October 10", "Unauthorized configuration and malicious checkout redirects"],
          ["Selleasy", "October 13", "Unauthorized access to an internal tool and malicious script injection"],
          ["Swym Wishlist Plus", "October 14 and 18", "Unauthorized app configuration changes and malicious storefront scripts"],
        ],
      },
      {
        type: "paragraph",
        text: "These incidents did not establish that every merchant using these applications was affected. The number of affected stores has not been publicly established. Importantly, the incidents were associated with third-party application systems. There is no evidence that Shopify's core checkout infrastructure was breached.",
      },
      { type: "heading", text: "2. How Did the Shopify Checkout Hijacking Attack Work?" },
      {
        type: "paragraph",
        text: "Understanding the attack mechanism is important because the problem was not necessarily visible in a store's normal order records. Here is a simplified explanation of the attack pattern.",
      },
      { type: "subheading", text: "Step 1: A Customer Visits a Legitimate Store" },
      {
        type: "paragraph",
        text: "A shopper visits a Shopify storefront, browses products, and adds an item to their cart. Everything appears normal.",
      },
      { type: "subheading", text: "Step 2: The Customer Clicks Checkout" },
      {
        type: "paragraph",
        text: "When the shopper clicks the checkout button, malicious JavaScript associated with a compromised application may intercept the action.",
      },
      { type: "subheading", text: "Step 3: The Shopper Sees a Fake Payment Page" },
      {
        type: "paragraph",
        text: "Instead of proceeding directly to the legitimate checkout, the shopper may be redirected to an external website designed to look like a real payment interface. These pages can imitate familiar checkout elements, including order summaries and payment fields.",
      },
      { type: "subheading", text: "Step 4: Payment Information May Be Captured" },
      {
        type: "paragraph",
        text: "If the customer manually enters their card details into the fraudulent page, those details may be exposed to the attacker.",
      },
      { type: "subheading", text: "Step 5: The Customer Returns to the Genuine Checkout" },
      {
        type: "paragraph",
        text: "In the reported attack pattern, shoppers could subsequently be redirected to the legitimate Shopify checkout and complete their orders. This is what made the incident particularly difficult to detect through ordinary order monitoring.",
      },
      {
        type: "callout",
        text: "The important lesson: a successfully completed Shopify order does not necessarily prove that the entire checkout journey was safe.",
      },
      {
        type: "image",
        src: "/blog/malicious-app-code-injection.jpg",
        alt: "Software developer reviewing JavaScript code and third-party app configuration on dual monitors during a security scan",
        caption:
          "The malicious code was delivered through application configurations and app-controlled storefront scripts - not always visible in a merchant's own theme files.",
      },
      { type: "heading", text: "3. Why Traditional Store Monitoring May Not Detect the Problem" },
      {
        type: "paragraph",
        text: "Many merchants monitor their stores through Shopify Analytics, order reports, and advertising dashboards. These tools are valuable, but they do not automatically reveal every security issue occurring during the customer journey.",
      },
      {
        type: "paragraph",
        text: "Consider three potential detection challenges.",
      },
      { type: "subheading", text: "Normal-Looking Orders" },
      {
        type: "paragraph",
        text: "An order may appear successfully completed in Shopify Admin even when the customer previously encountered a fraudulent external payment page.",
      },
      { type: "subheading", text: "Third-Party Application Code" },
      {
        type: "paragraph",
        text: "The malicious code in the reported incidents was delivered through application configurations and app-controlled storefront scripts. This means a basic review of merchant-controlled theme files alone might not identify the issue.",
      },
      { type: "subheading", text: "Session-Based Behaviour" },
      {
        type: "paragraph",
        text: "Some reported malicious behaviour was not consistently reproduced during repeated testing in the same browser session. Testing with a fresh private browsing session can therefore be important.",
      },
      {
        type: "paragraph",
        text: "For merchants, this demonstrates why monitoring completed transactions is not enough. The actual checkout experience must also be tested.",
      },
      { type: "heading", text: "4. What Should Shopify Merchants Check Right Now?" },
      {
        type: "paragraph",
        text: "If you operate a Shopify store, reviewing your application ecosystem should be part of your regular operational security process. Here are eight practical checks.",
      },
      { type: "subheading", text: "1. Review Installed Applications" },
      {
        type: "paragraph",
        text: "Open Shopify Admin and review all installed applications. Identify applications that are no longer needed, have unclear ownership, or request permissions beyond their business purpose.",
      },
      { type: "subheading", text: "2. Review App Permissions" },
      {
        type: "paragraph",
        text: "Understand what access each application has to your store. Pay particular attention to applications that can modify storefront content or inject scripts.",
      },
      { type: "subheading", text: "3. Audit Custom JavaScript and HTML" },
      {
        type: "paragraph",
        text: "Review application settings that allow custom JavaScript or HTML. Only use code from trusted sources and investigate unfamiliar scripts.",
      },
      { type: "subheading", text: "4. Review Theme App Embeds" },
      {
        type: "paragraph",
        text: "Open your Shopify theme editor and inspect active app embeds. Check whether each enabled integration is still required and comes from a trusted application.",
      },
      { type: "subheading", text: "5. Test Your Checkout in a Private Browser" },
      {
        type: "paragraph",
        text: "Open a fresh private or incognito browser window. Add a product to your cart and follow the complete checkout journey. Check for unexpected redirects or unfamiliar payment domains.",
      },
      { type: "subheading", text: "6. Investigate Suspicious External Domains" },
      {
        type: "paragraph",
        text: "If your checkout unexpectedly redirects to an unfamiliar domain, do not enter payment information. Capture screenshots and record the URL for investigation.",
      },
      { type: "subheading", text: "7. Review Customer Complaints and Payment Disputes" },
      {
        type: "paragraph",
        text: "Look for unusual customer reports, unexpected payment-related complaints, and suspicious transaction patterns. Contact your payment processor if you suspect customer payment information may have been exposed.",
      },
      { type: "subheading", text: "8. Contact Shopify Support and Application Developers" },
      {
        type: "paragraph",
        text: "If you identify suspicious behaviour, preserve evidence, contact Shopify Support, and notify the relevant application developer. Follow their incident-response guidance before removing applications or modifying store code.",
      },
      {
        type: "image",
        src: "/blog/shopify-app-security-audit.jpg",
        alt: "Shopify store owner reviewing installed applications and permissions on a laptop dashboard with a security checklist",
        caption:
          "Reviewing installed apps, permissions, and theme app embeds is now a routine part of operational security for every Shopify merchant.",
      },
      { type: "heading", text: "5. Shopify's Response: New Protection Against Unexpected Redirects" },
      {
        type: "paragraph",
        text: "On October 20, 2026, Shopify announced new protection against unexpected external redirects. The feature was designed to warn customers before they leave a Shopify storefront for an external website.",
      },
      {
        type: "paragraph",
        text: "According to Shopify's October 23 update, the behaviour was refined:",
      },
      {
        type: "list",
        items: [
          "Links to websites identified as malicious are blocked.",
          "Suspicious external destinations require customer confirmation.",
          "Other external links continue without the additional confirmation message.",
          "Connected store domains and supported Shopify and social websites are treated differently.",
        ],
      },
      {
        type: "paragraph",
        text: "This is an important additional layer of customer protection. However, merchants should not treat redirect warnings as a replacement for application security reviews or checkout testing. Security requires multiple layers of protection.",
      },
      { type: "heading", text: "6. The Business Impact: More Than Just a Technical Problem" },
      {
        type: "paragraph",
        text: "For an e-commerce business, checkout security directly affects more than payment processing. It can influence several important business areas.",
      },
      { type: "subheading", text: "Customer Trust" },
      {
        type: "paragraph",
        text: "Customers expect their payment information to remain secure. A fraudulent checkout experience can damage the trust a brand has built over years.",
      },
      { type: "subheading", text: "Conversion Rate" },
      {
        type: "paragraph",
        text: "Unexpected redirects and confusing payment experiences can interrupt the purchase journey and cause shoppers to abandon their carts.",
      },
      { type: "subheading", text: "Customer Acquisition Costs" },
      {
        type: "paragraph",
        text: "If customers lose confidence in a brand, advertising expenditure may become less effective over time. A business could continue spending money to acquire traffic while experiencing weaker conversion performance.",
      },
      { type: "subheading", text: "Refunds and Chargebacks" },
      {
        type: "paragraph",
        text: "If payment information is compromised, affected customers may report fraudulent transactions to their financial institutions. This can create additional operational costs and payment disputes.",
      },
      { type: "subheading", text: "Brand Reputation" },
      {
        type: "paragraph",
        text: "Security incidents can affect customer reviews, repeat purchases, and long-term brand perception.",
      },
      {
        type: "callout",
        text: "For DTC brands, customer trust is an important part of business performance. Protecting the checkout experience is also protecting the customer relationship.",
      },
      {
        type: "image",
        src: "/blog/customer-trust-impact.jpg",
        alt: "Concerned customer looking at a smartphone showing a payment page with a security warning symbol",
        caption:
          "Checkout security is not only a technical issue - it shapes customer trust, conversion, acquisition costs, and long-term brand reputation.",
      },
      { type: "heading", text: "7. Why E-Commerce Businesses Need Better Operational Visibility" },
      {
        type: "paragraph",
        text: "Traditional e-commerce dashboards typically focus on sales, advertising performance, customer acquisition, and revenue. But understanding business performance also requires visibility into the customer journey and operational issues.",
      },
      {
        type: "paragraph",
        text: "A more comprehensive monitoring approach can include:",
      },
      {
        type: "table",
        headers: ["Monitoring Area", "What to Track"],
        rows: [
          ["Store Performance", "Conversion rate, sessions, checkout completion"],
          ["Customer Experience", "Checkout errors, unusual redirects, complaints"],
          ["Payment Operations", "Payment failures, disputes, suspicious activity"],
          ["Application Health", "Installed apps, permissions, unexpected changes"],
          ["Marketing Performance", "CAC, ROAS, MER, acquisition trends"],
          ["Profitability", "Contribution margin, refunds, operating costs"],
        ],
      },
      {
        type: "paragraph",
        text: "These metrics do not independently detect malicious code. Security monitoring and technical investigation are still necessary. However, combining operational monitoring with business intelligence can help merchants identify unusual patterns earlier and understand their commercial impact.",
      },
      {
        type: "image",
        src: "/blog/ecommerce-monitoring-dashboard.jpg",
        alt: "Data analyst reviewing an e-commerce store health monitoring dashboard with conversion rate and checkout completion charts on large screens",
        caption:
          "Operational visibility - store performance, checkout health, payment operations, and app health in one view - helps merchants spot unusual patterns sooner.",
      },
      { type: "heading", text: "8. A Practical Shopify Store Security Checklist" },
      {
        type: "paragraph",
        text: "Before your next major sales campaign, review the following:",
      },
      {
        type: "list",
        items: [
          "Audit all installed Shopify applications.",
          "Remove unnecessary applications.",
          "Review application permissions.",
          "Inspect custom JavaScript and HTML configurations.",
          "Review active theme app embeds.",
          "Test checkout using a fresh private browser session.",
          "Investigate unexpected external redirects.",
          "Review customer payment complaints.",
          "Enable two-factor authentication for staff accounts.",
          "Contact application developers about relevant security updates.",
        ],
      },
      {
        type: "paragraph",
        text: "Do not assume an application is compromised simply because it was installed during October. Verify its current status with the developer and Shopify.",
      },
      { type: "heading", text: "Frequently Asked Questions" },
      { type: "subheading", text: "Was Shopify's checkout hacked in October 2026?" },
      {
        type: "paragraph",
        text: "There is no evidence that Shopify's core checkout infrastructure was breached in these incidents. The reported attacks involved compromised third-party applications and malicious code delivered through their configurations.",
      },
      { type: "subheading", text: "Which Shopify apps were involved?" },
      {
        type: "paragraph",
        text: "The three applications confirmed by their developers in the October incidents were Hulk Product Options, Selleasy, and Swym Wishlist Plus.",
      },
      { type: "subheading", text: "Can a fraudulent checkout still result in a successful Shopify order?" },
      {
        type: "paragraph",
        text: "Yes. In the reported attack pattern, shoppers could be redirected to a fraudulent page and subsequently returned to the genuine checkout. As a result, some orders could appear normal in Shopify Admin.",
      },
      { type: "subheading", text: "How can I check whether my Shopify store is safe?" },
      {
        type: "paragraph",
        text: "Review installed applications, permissions, custom scripts, and theme app embeds. Test the complete checkout journey in a fresh private browser session and investigate unfamiliar external redirects.",
      },
      { type: "subheading", text: "Does Shopify's new redirect protection solve the problem completely?" },
      {
        type: "paragraph",
        text: "No. It provides an additional layer of protection against unexpected external redirects, but merchants should continue auditing applications, monitoring checkout behaviour, and following security best practices.",
      },
      { type: "heading", text: "Final Thoughts: Protect Your Store Before Scaling Your Business" },
      {
        type: "paragraph",
        text: "The October 2026 Shopify checkout incidents highlight an important reality for e-commerce businesses. Your storefront is not just a website. It is an ecosystem of applications, integrations, scripts, payment systems, and customer interactions. A weakness in one component can affect the entire shopping experience.",
      },
      {
        type: "paragraph",
        text: "As a Shopify merchant, you should not focus exclusively on increasing traffic, improving ROAS, or generating more revenue. You also need to understand what happens between a customer visiting your store and successfully completing a purchase.",
      },
      {
        type: "callout",
        text: "Secure your checkout. Protect customer trust. Build a more resilient e-commerce business. At MozIntelligence, we believe better business decisions begin with better visibility into your data, operations, and customer experience.",
      },
      {
        type: "paragraph",
        text: "Explore our E-Commerce Analytics and Profitability Intelligence services at https://mozintelligence.vercel.app/",
      },
      {
        type: "paragraph",
        text: "About MozIntelligence: MozIntelligence is an independent E-Commerce Growth and Market Decision Intelligence platform founded by Mozahidul Islam. We help businesses understand their e-commerce performance through data analytics, profitability intelligence, customer insights, and business reporting.",
      },
      {
        type: "paragraph",
        text: "Disclaimer: This article is for informational purposes only and does not constitute cybersecurity, legal, or financial advice. Security incident details may evolve as investigations and vendor updates continue.",
      },
    ],
  },
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
