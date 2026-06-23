'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Menu, X, ChevronDown, Mail, Linkedin, Phone, Github,
  Check, Star, ArrowRight, Download, ExternalLink,
  BarChart3, TrendingUp, Users, Shield, Zap, Database,
  Code2, Cloud, LineChart, Plug, FileText, Clock,
  AlertTriangle, Target, Lightbulb, Rocket
} from 'lucide-react';

/* ──────────────────────────────────────────
   DATA CONSTANTS
   ────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const TRUST_STATS = [
  { value: '$53.5M+', label: 'Revenue Tracked' },
  { value: '2.75M+', label: 'Data Events Processed' },
  { value: '6+', label: 'Industries Served' },
  { value: '0', label: 'Lines of Code You Touch' },
];

const QUICK_PROOF_CARDS = [
  {
    store: 'UrbanNest Home Decor',
    niche: 'Home Decor & Lifestyle, Shopify',
    illusion: '$23K/month revenue, growing steadily. Owner thought the business was healthy.',
    reality: '$3,460/month net profit. 14.4% net margin. The #1 best-seller (Boho Macramé) was quietly losing $769 per quarter.',
    findings: [
      '71% cart abandonment caused by forced account creation.',
      'Mobile converting 2.76x worse than desktop.',
      'A 20% promo sale actually erased margins, dropping profit by 41%.',
    ],
    result: '$7,800/month net profit within 60 days. Ad budget flipped from Facebook to Google 1.86x higher customer LTV.',
    quote: '"I literally could not sleep after watching your Loom video."',
    author: 'Sarah K., UrbanNest Founder',
    investment: '$800',
    timeline: '60 days',
    profitAdded: '+$4,340/mo',
    roi: '10x',
  },
  {
    store: 'PawPerfect Premium',
    niche: 'Pet Supplies, Shopify + Meta Ads',
    illusion: '$54K/month revenue. 4.9★ reviews. Looked like a thriving brand from the outside.',
    reality: '$12,400/month net profit and shrinking. Margins had compressed 8% YoY as ad costs per customer rose 73% in 3 years.',
    findings: [
      'Facebook ads targeting "senior pets" (LTV $134) instead of "new pet parents" (LTV $847).',
      'Zero referral program despite 67% of Champions coming from word-of-mouth.',
    ],
    result: '$29,840/month net profit within 45 days. Ad targeting flipped to new pet parents. Pet birthday email automation activated.',
    quote: '"The data wasn\'t just revenue. It was relationships waiting to happen."',
    author: 'James C., PawPerfect Founder',
    investment: '$600',
    timeline: '45 days',
    profitAdded: '+$17,440/mo',
    roi: '29x',
  },
  {
    store: 'LUMIÈRE Beauty Co.',
    niche: 'Skincare & Beauty, Shopify + Google Ads',
    illusion: '$67K/month revenue. Stable. Profitable. No obvious problems.',
    reality: 'Plateaued for 8 consecutive months. Champions buying 8.4x/year against a 12–14x benchmark, leaving $6,785/month in untouched revenue on the table.',
    findings: [
      'Black Friday discount cohorts had 4.1x lower LTV and 81% churn compared to educational content cohorts.',
      'Meta Broad campaigns were silently destroying $8,963 in value every month.',
    ],
    result: '$41,380/month net profit within 60–75 days. Budget reallocated to Google Brand and Content. Product bundles launched. Discount strategy rebuilt from the ground up.',
    quote: '"I had been working harder and getting worse customers. For two years."',
    author: 'Priya S., LUMIÈRE Founder',
    investment: '$650',
    timeline: '60–75 days',
    profitAdded: '+$22,980/mo',
    roi: '35x',
  },
];

const WHY_ME_REASONS = [
  {
    num: '01',
    title: 'I Expose the Agency Illusion',
    text: 'Your agency tells you your ROAS is 4.2x and everything is performing well. I dig into the actual data and show you that your True Profit ROAS, after cost of goods, returns, and shipping, is 0.83x. Meaning you are paying to lose money on every single sale. I don\'t report vanity metrics. I report net profit. Those are very different numbers, and only one of them pays your bills.',
  },
  {
    num: '02',
    title: 'Enterprise Infrastructure. Without the $150K Salary.',
    text: 'Hiring a full-time in-house data engineer and analyst costs over $150,000 a year. You don\'t need that. I bring the exact same enterprise-level stack, SQL, Python, BigQuery, Power BI, and build a permanent, automated data pipeline for your store at a fraction of that cost. You get the infrastructure. Without the overhead.',
  },
  {
    num: '03',
    title: 'From Data to Decision in Days, Not Months.',
    text: 'Most consultants take 8–12 weeks to deliver a strategy document you\'ll never fully implement. I deliver your complete E-Commerce Health Check in 7 days. Why? Because if your store is bleeding $1,690 a month in hidden losses, you don\'t have 3 months. You need to know exactly what to fix this week, not next quarter.',
  },
  {
    num: '04',
    title: 'I Find Revenue You Already Have.',
    text: 'The majority of profit improvements I deliver require zero increase in ad spend. I don\'t tell you to "spend more to scale." I find the hidden revenue already sitting inside your business by fixing your mobile checkout experience, reallocating budget to your highest-LTV channels, or activating the email list you\'ve been ignoring for months. More profit. Same traffic. Same spend.',
  },
];

const CORE_PACKAGES = [
  {
    tag: 'STOP THE BLEED.',
    name: 'E-Commerce Health Check',
    tier: 'STARTER',
    price: '$150 – $300',
    timeline: 'One-time · 5–7 day delivery',
    description: 'A 90-day forensic audit across sales, funnel, customers, and true product profitability.',
    features: [
      '4 focused analyses (Sales, Funnel, Customers, Profit)',
      'Executive Summary PDF (2-3 pages)',
      'Visual Dashboard (Looker Studio / Power BI)',
      'Action Priority List (This week / Month / Later)',
      '30-min Video Walkthrough',
      '1 Round of Revision',
    ],
    bestFor: 'Stores doing $5K–$50K/mo who suspect something\'s off but don\'t know what.',
    promise: 'After this package, you will know exactly where your store is losing potential revenue, which products are actually making you money, and the top 3 things to fix this week to see measurable results.',
    cta: 'Book the Health Check →',
    featured: false,
  },
  {
    tag: 'SCALE WHAT WORKS.',
    name: 'Revenue Growth Accelerator',
    tier: 'GROWTH',
    price: '$400 – $1,000',
    timeline: 'One-time · 10–14 day delivery',
    description: 'Full RFM, channel LTV:CAC, cohort truth, bundle strategy, and an interactive intelligence dashboard.',
    features: [
      'Everything in Starter, plus 5 deeper analyses',
      'Full 8-segment RFM Customer Segmentation',
      'Channel LTV:CAC & Marketing Audit',
      'Cross-sell & Bundle Opportunity Analysis',
      'Interactive Dashboard + Klaviyo-ready CSV',
      '60-min Strategy Call + 30-day Roadmap',
    ],
    bestFor: 'Stores doing $20K–$200K/mo ready to break through the plateau.',
    promise: 'After this package, you will know exactly which customers to focus on (and what to say to each group), which marketing channels are wasting your money, and how to implement product bundles that immediately increase your average order value.',
    cta: 'Book the Growth Package →',
    featured: true,
  },
  {
    tag: 'LIVE IN THE DATA.',
    name: 'Data-Driven Growth System',
    tier: 'ADVANCED',
    price: '$1,500 – $2,500',
    timeline: 'One-time · 20–30 day delivery',
    description: 'Your complete analytics engine, built once, runs forever. 15 total analyses including cohorts, forecasts, and live dashboards.',
    features: [
      'Everything in Growth, plus 6 advanced analyses',
      'Complete Cohort Analysis & 90-Day Sales Forecast',
      'Profit Margin Deep Dive (True per-product profit)',
      'Live Custom KPI Dashboard (Auto-refreshing)',
      'Discount & Return Pattern Analysis',
      '90-min Strategy Session + 60-day Email Support',
    ],
    bestFor: 'Stores doing $100K+/mo that demand permanent data vigilance.',
    promise: 'After this package, you will never make a major business decision without data to back it up. You will know your most valuable customers, most profitable products, and have a live dashboard that gives you your business pulse in under 5 minutes each morning.',
    cta: 'Apply for Advanced →',
    featured: false,
  },
  {
    tag: 'NEVER GO STALE.',
    name: 'Analytics Partner Retainer',
    tier: 'RETAINER',
    price: '$500 – $1,200 /mo',
    timeline: 'Ongoing (Min. 2-month commitment)',
    description: 'Your dedicated data analyst. A 4-week rhythm that keeps your business moving forward with continuous insight.',
    features: [
      'Monthly Performance & Customer Health Reports',
      'Marketing Efficiency Review & Forward Planning',
      '4 Ad-hoc Analyses per month',
      '48-hr Email / Slack response',
      'Proactive Anomaly Alerts',
      'Dashboard Maintenance & 45-min Monthly Call',
    ],
    bestFor: 'Ongoing growth, live monitoring, and seasonal shifts.',
    promise: 'With this retainer, today\'s insight will never become outdated next month. We will detect problems between analyses before they cost you money, ensure your implemented changes are actually working, and keep you prepared for seasonal shifts before they catch you off guard.',
    cta: 'Become a Retainer Client →',
    featured: false,
  },
];

const ADD_ON_PACKAGES = [
  {
    name: 'Marketing Spend Audit',
    price: '$300 – $600 · 7–10 Days',
    problem: '"My ROAS is declining and I don\'t know why."',
    promise: 'You will know which channels are genuinely profitable vs. creating an illusion, the true cost of acquiring a customer through each platform, and exactly which campaigns to scale, pause, or kill.',
    cssClass: 'marketing',
  },
  {
    name: 'Customer Retention Audit',
    price: '$350 – $700 · 7–12 Days',
    problem: '"Customers buy once and disappear."',
    promise: 'You will know which customers are about to leave (and how to reach them before they do), which channels bring loyal customers, and have an upload-ready segmented list for immediate retention campaigns.',
    cssClass: 'retention',
  },
  {
    name: 'Product Portfolio Audit',
    price: '$350 – $800 · 7–14 Days',
    problem: '"50+ SKUs, I don\'t know what to focus on."',
    promise: 'You will know which products to invest in, optimize, or cut, the true profit margin on every SKU in your catalog, and exactly which products to bundle together to increase AOV.',
    cssClass: 'portfolio',
  },
  {
    name: 'CRO Audit',
    price: '$250 – $500 · 7–10 Days',
    problem: '"Traffic is there but nobody\'s buying."',
    promise: 'You will know exactly where visitors are abandoning (and why), which fixes will have the highest impact, and have a prioritized action list to increase conversion by 20–40% using your existing traffic.',
    cssClass: 'cro',
  },
  {
    name: 'Profitability Audit',
    price: '$350 – $700 · 8–12 Days',
    problem: '"Revenue grows but profit doesn\'t."',
    promise: 'You will know your true profit margin on every product/channel, exactly where revenue is leaking into cost, if your promotions are eroding profit, and when your cash will be tight in coming months.',
    cssClass: 'profitability',
  },
  {
    name: 'Operations Efficiency Audit',
    price: '$400 – $800 · 10–14 Days',
    problem: '"Returns climbing, inventory out of control."',
    promise: 'You will know which suppliers are causing financial problems, exactly how much inventory to order (and when based on 90-day demand), the true cost of your return rate, and how to free up cash locked in dead stock.',
    cssClass: 'operations',
  },
];

const DATA_BUNDLES = [
  { name: 'Basic Setup', bestFor: 'One-time analysis clients (2-3 platforms)', timeline: '2–3 Days', investment: '$150 – $300', cssClass: 'infra-wrapper-basic' },
  { name: 'Full Pipeline Setup', bestFor: 'Ongoing/recurring clients (All APIs + Merge)', timeline: '5–7 Days', investment: '$500 – $900', cssClass: 'infra-wrapper-pipeline' },
  { name: 'Full Pipeline + Automation', bestFor: 'Live dashboard & retainer clients (Auto-updating)', timeline: '7–10 Days', investment: '$700 – $1,200', cssClass: 'infra-wrapper-auto' },
];

const BUNDLE_FEATURES = [
  { feature: 'Cloud Infrastructure', basic: true, full: true, auto: true },
  { feature: 'Platform API Connections', basic: '2–3', full: 'All', auto: 'All' },
  { feature: 'Data Pipeline Build', basic: true, full: true, auto: true },
  { feature: 'Data Cleaning', basic: true, full: true, auto: true },
  { feature: 'Multi-Platform Merge', basic: false, full: true, auto: true },
  { feature: 'BigQuery Load Script', basic: false, full: true, auto: true },
  { feature: 'Dashboard Connection', basic: false, full: true, auto: true },
  { feature: 'Automated Scheduling', basic: false, full: false, auto: true },
  { feature: 'Error Alerts', basic: false, full: false, auto: true },
  { feature: 'Credential Security', basic: false, full: false, auto: true },
];

const CASE_STUDIES = [
  {
    store: 'ZARA Organics',
    title: 'The $89K/Month Store That Was Actually Bankrupt',
    niche: 'Organic Wellness & Supplements',
    nightmare: '$89K/mo revenue, celebrating a record year. Actual net profit for the entire year was only $84. Margin collapsed from 24% to 10.9%.',
    revelation: '46% of her customer base was permanently "Lost." Free organic content channels generated 4.2x more LTV than $18K/mo paid ads.',
    turnaround: 'Shifted from an ad-spend business to a content/community business. Built a live Looker Studio dashboard.',
    result: 'Profit went from $7/mo to $48,400/mo.',
    cssClass: 'zara',
    tagline: 'A $7/month profit hidden inside $89K in revenue.',
    caseType: 'turnaround',
  },
  {
    store: 'PACE Performance',
    title: 'All Speed, No Strategy: The Marathon Runner\'s Store',
    niche: 'Fitness & Running Gear',
    nightmare: '$41K/mo revenue, running his business like a marathon. Thought he was making $9K/mo profit; he was actually making $425/mo.',
    revelation: 'His free TikTok race videos brought in customers worth $524 LTV, while his $8,400/mo paid ads brought customers worth $9 LTV.',
    turnaround: 'Cut ad spend by 70%, killed low-margin/high-return fitness products, leaned into authentic race-day content.',
    result: 'Profit jumped from $425/mo to $31,400/mo in 30 days.',
    cssClass: 'pace',
    tagline: 'His $8,400/mo ads brought customers worth $9 LTV.',
    caseType: 'scale',
  },
  {
    store: 'NOIRE Collective',
    title: 'From Panic to $33K/Month Profit in 73 Days',
    niche: 'Premium Urban Streetwear',
    nightmare: '72 hours from shutting down. $38K/mo revenue but losing $1,690/mo. An agency claimed 4.2x ROAS, but true profit ROAS was 0.83x.',
    revelation: 'Discount addiction and a 24.7% unit return rate from inconsistent sizing were silently bleeding the business dry.',
    turnaround: 'Detoxed discounts (17.6% → 4.8%), cut Facebook/TikTok ads by 70%, unified size charts, rebuilt mobile checkout.',
    result: 'Profit went from -$1.7K/mo to +$33,040/mo in 73 days.',
    cssClass: 'noire',
    tagline: '72 hours from permanent closure. Data saved it.',
    caseType: 'diagnostic',
  },
  {
    store: 'LUNA Jewelry Co.',
    title: 'The Store Gifting Away Its Own Profit',
    niche: 'Handcrafted Jewelry',
    nightmare: 'Making $30K/mo but working 11 hrs/day, 6 days a week, for just $11.59/hour.',
    revelation: 'She was giving away $115,956/year in "free" services (gift wrap, engraving, shipping). Her bestseller earned her $8.20/hour.',
    turnaround: 'Added a $12 engraving fee, $4.99 premium gift wrap, raised free shipping threshold, and flipped ad budget from Meta to Pinterest. Took 4 hours to implement.',
    result: 'Hourly rate jumped to $66.81/hr. Monthly profit went from $3.3K to $18,900/mo.',
    cssClass: 'luna',
    tagline: 'Working 11 hrs/day. Earning $11.59/hour.',
    caseType: 'turnaround',
  },
  {
    store: 'UrbanNest Home Decor',
    title: 'How a $23K/Month Store Discovered They Were Bleeding $4,200 Every Month',
    niche: 'Home Decor & Lifestyle',
    nightmare: '$23K/mo revenue, growing steadily, but only $3K net profit. A 20% promo sale spiked revenue but actually wiped out margins, dropping profit by 41%.',
    revelation: 'The #1 best-seller (Boho Macramé) was secretly losing $769/quarter. Forced account creation was causing a 71% cart abandonment rate.',
    turnaround: 'Paused losing ads, enabled guest checkout, flipped ad budget from Facebook to Google (which had 1.86x higher LTV), and sent win-back emails to at-risk customers.',
    result: 'Profit jumped from $3.4K/mo to $7,800/mo in 60 days.',
    cssClass: 'urbannest',
    tagline: 'Best-seller was silently losing $769/quarter.',
    caseType: 'diagnostic',
  },
  {
    store: 'PawPerfect Premium',
    title: 'How Data Saved $312,000 in Annual Revenue',
    niche: 'Pet Supplies & Wellness',
    nightmare: '$54K/mo revenue, 4.9★ reviews. Margins were shrinking because ad costs per customer rose 73% in 3 years.',
    revelation: 'Ads targeted "senior pet owners" (LTV $134) who churned when pets died. Customers acquired with puppies generated 6.3x more LTV ($847). Zero referral program despite 67% of Champions coming from word-of-mouth.',
    turnaround: 'Flipped ad targeting from senior to puppy parents. Created pet birthday and milestone email automation.',
    result: 'Profit jumped from $12.4K/mo to $29,840/mo in 45 days.',
    cssClass: 'paw',
    tagline: 'Targeting wrong customers. $312K/year consequence.',
    caseType: 'scale',
  },
  {
    store: 'LUMIÈRE Beauty Co.',
    title: 'How a $67K/Month Brand Discovered a Hidden $89K/Month Business',
    niche: 'Skincare & Beauty',
    nightmare: 'Plateaued at $67K/mo for 8 consecutive months. Profitable but stuck, leaving money on the table.',
    revelation: 'Black Friday discount cohorts had 4.1x LOWER LTV and 81% churn compared to educational content cohorts. Meta Broad ads were destroying $8,963 in value.',
    turnaround: 'Stopped chasing holiday discount revenue. Replicated best cohorts, created product bundles, and reallocated ad spend to Google Brand and Content.',
    result: 'Profit jumped from $18.4K/mo to $41,380/mo in 45 days.',
    cssClass: 'lumiere',
    tagline: 'Plateaued 8 months. Black Friday was the villain.',
    caseType: 'scale',
  },
];

const GITHUB_PROJECTS = [
  {
    name: 'Behavioral Funnel & Conversion',
    subtitle: 'Processing 2.75M Raw E-Commerce Events',
    stack: ['SQL', 'Python', 'Power BI'],
    engineering: 'Engineered an end-to-end pipeline processing 2.75 million raw e-commerce events. Implemented a 30-minute inactivity session rule using LAG() window functions to accurately define user behavior.',
    impact: 'Surfaced a 76.8% cart abandonment profile. Ran 5 A/B tests (t-tests, Chi-Square, ANOVA) in Python to uncover "Hidden Gem" products, identifying $50,000 in untapped revenue with zero additional ad spend.',
  },
  {
    name: 'Financial Data Warehouse',
    subtitle: 'Star-Schema Warehouse Tracking $53.5M Revenue',
    stack: ['PostgreSQL', 'Power BI', 'DAX'],
    engineering: 'Architected a centralized PostgreSQL data warehouse consolidating 52 weeks of transactional data (10,000+ records) into a normalized star schema. Built 20+ DAX measures using SUMX iterators and CALCULATE filters.',
    impact: 'Powered a 2-page executive dashboard with 39 visuals for proactive risk management. Reconciled 100% of data between PostgreSQL and Power BI, saving the team 15+ hours per week in manual reporting.',
  },
  {
    name: 'Churn & Retention Analytics',
    subtitle: '11-Tier RFM Segmentation of 96K Customers',
    stack: ['Python', 'SQL', 'Power BI', 'Excel'],
    engineering: 'Performed comprehensive EDA on 100K+ orders using Python (Pandas, Seaborn) and SQL. Built an 11-tier RFM segmentation model and computed Customer Lifetime Value (CLV) using cohort retention matrices.',
    impact: 'Exposed a critical 85% Month-1 churn rate and a 97% one-time buyer rate. Pareto analysis revealed 20% of categories drove 80% of revenue, identifying a $120,000 revenue opportunity via At-Risk customer re-engagement.',
  },
];

const TESTIMONIALS = [
  {
    quote: '"The phone call on Day 5 of the analysis, when I was told my net profit was $84, is the most important phone call of my business life. I cried. I called my husband. He held me. Then he said: \'Now you know. Now you can fix it.\'"',
    author: 'Aisha R., ZARA Organics',
    profit: '$84/year ➔ $48,400/month',
    featured: true,
  },
  {
    quote: '"I was 72 hours from closing my business. The Health Check showed me something that destroyed and rebuilt me at the same time: I wasn\'t failing because of bad products. I was failing because I had no idea what was actually happening in my own business."',
    author: 'Marcus T., NOIRE Collective',
    profit: '-$1.7K/mo ➔ +$33K/mo in 73 days',
  },
  {
    quote: '"In running, we have a concept called junk miles. Miles that feel productive because you\'re moving. But they don\'t make you faster. My $8,400/month in ads were junk miles. The best investment I\'ve ever made cost less than my running shoes."',
    author: 'Daniel O., PACE Performance',
    profit: '$425/mo ➔ $31,400/mo',
  },
  {
    quote: '"I was earning $11.59 an hour. Running a business I worked 11 hours a day to build. The Health Check showed me three things I was giving away for free that I should have been charging for. My brand identity is the jewelry. Not the freebies."',
    author: 'Sofia M., LUNA Jewelry Co.',
    profit: 'Hourly Rate: $11.59 ➔ $66.81',
  },
  {
    quote: '"I literally could not sleep after watching your Loom video. I paused the Macramé ads the same night. I had NO IDEA I was losing money on my best-selling product. I\'ve been promoting it for 8 months!"',
    author: 'Sarah K., UrbanNest Home Decor',
    profit: '$3.4K/mo ➔ $7.8K/mo',
  },
  {
    quote: '"My favorite result from this analysis has nothing to do with money. It\'s the email I now send to customers when their dog turns 7 years old. The data wasn\'t just revenue. It was relationships waiting to happen. I just needed someone to show me how to see it."',
    author: 'James C., PawPerfect Premium',
    profit: '$12.4K/mo ➔ $29.8K/mo',
  },
  {
    quote: '"I want to be careful with how I say this, because I don\'t want it to sound like an exaggeration. I paid $650 for a Growth Package. In 45 days my monthly net profit went from $18,400 to $41,380. I didn\'t launch new products. I didn\'t increase my ad spend. I just finally understood what my data was telling me."',
    author: 'Priya S., LUMIÈRE Beauty Co.',
    profit: '$18.4K/mo ➔ $41.3K/mo',
  },
];

const PROCESS_STEPS = [
  {
    num: 1,
    title: 'Discovery & Strategy',
    text: 'You book a call, we assess your business needs, and you select the analytics package that fits your store (Starter, Growth, Advanced, or Retainer). No guessing, we map exactly which platforms hold your data.',
  },
  {
    num: 2,
    title: 'The Engineering Foundation',
    text: 'This is the behind-the-scenes engineering most analysts skip. We build your cloud infrastructure and connect your APIs. EXTRACT: We securely pull raw data from Shopify, GA4, Meta Ads, Google Ads, and Klaviyo. CLEAN: We align currencies, date formats, and timezones so everything speaks the same language. MERGE: We combine all platforms into one clean master table, your single source of truth. CONNECT: We pipe the unified data directly into the dashboard. You don\'t touch a single line of code.',
  },
  {
    num: 3,
    title: 'The Deep Analysis',
    text: 'With clean, reliable data flowing into our systems, the detective work begins. We run the RFM segmentation models, cohort analyses, funnel audits, true profit margin deep-dives, and churn predictions ETC. We don\'t just look at what happened, we uncover why it happened.',
  },
  {
    num: 4,
    title: 'The Delivery & Strategy Call (Day 15)',
    text: 'You don\'t receive a data dump. You receive a plain-language Executive PDF, a visual dashboard, and a prioritized action plan. We hop on a strategy call (30 to 90 minutes, depending on your package) where I explain every finding and tell you exactly what to fix first.',
  },
  {
    num: 5,
    title: 'Execution & Monitoring (Ongoing)',
    text: 'You implement the fixes, like pausing losing ads, flipping budgets, or sending win-back emails. If you are a Retainer client, I monitor your live dashboard 24/7, sending proactive anomaly alerts and updating your forecasts so today\'s insights never go stale.',
  },
];

const TECH_STACK = [
  {
    category: 'Programming & Analytics',
    icon: Code2,
    description: 'The languages used to process millions of rows and run statistical models.',
    items: [
      { name: 'Python (Pandas, Seaborn)', desc: 'For deep EDA, A/B testing (t-tests, ANOVA), and churn modeling.' },
      { name: 'SQL', desc: 'For extracting, joining, and transforming raw data across multiple platforms.' },
      { name: 'Statistical Modeling', desc: 'Moving beyond "gut feelings" to mathematically proven truths.' },
    ],
  },
  {
    category: 'Cloud & Data Warehousing',
    icon: Cloud,
    description: 'The backend infrastructure where your unified source of truth lives.',
    items: [
      { name: 'Google Cloud Platform (GCP)', desc: 'Secure, scalable cloud infrastructure.' },
      { name: 'BigQuery', desc: 'Enterprise data warehousing for lightning-fast queries.' },
      { name: 'PostgreSQL', desc: 'Relational database management for structured star-schema models.' },
    ],
  },
  {
    category: 'Visualization & BI',
    icon: LineChart,
    description: 'Where the complex math becomes a simple, actionable dashboard for you.',
    items: [
      { name: 'Looker Studio', desc: 'Live, auto-refreshing, custom KPI dashboards.' },
      { name: 'Power BI', desc: 'Advanced business intelligence with 20+ DAX measures.' },
      { name: 'Excel', desc: 'Simplified KPI summary sheets for immediate team action.' },
    ],
  },
  {
    category: 'Platform Integrations',
    icon: Plug,
    description: 'The APIs we connect so your data actually talks to each other.',
    items: [
      { name: 'Shopify', desc: 'Orders, Customers, Products' },
      { name: 'GA4', desc: 'Funnel, Sessions, Conversions' },
      { name: 'Meta Ads & Google Ads', desc: 'True ROAS, Spend, CAC' },
      { name: 'Klaviyo', desc: 'Email performance, Segmentation, Churn triggers' },
    ],
  },
];

/* ──────────────────────────────────────────
   UTILITY COMPONENTS
   ────────────────────────────────────────── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  return ref;
}

function Counter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const runAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      const duration = 2000;
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    // Fallback: start animation after 3s even if observer doesn't fire
    const fallback = setTimeout(runAnimation, 3000);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ──────────────────────────────────────────
   SECTION COMPONENTS
   ────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Active section tracking
    const sectionIds = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(2,4,8,0.92)] backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
        style={{ borderBottom: scrolled ? '1px solid rgba(0,198,255,0.08)' : 'none' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <a href="#hero" className="flex items-center gap-3 group">
            <Image src="/images/logo.png" alt="Logo" width={44} height={44} className="rounded-lg transition-transform duration-300 group-hover:scale-105" />
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-white leading-tight">Mozahidul Islam</div>
              <div className="text-[11px] text-[#8899AA] leading-tight">E-Commerce Growth Analyst</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  activeSection === link.href
                    ? 'nav-link-active'
                    : 'text-[#8899AA] hover:text-[#00C6FF]'
                }`
                }
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-press px-6 py-2.5 rounded-md text-sm font-semibold text-[#020408] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,198,255,0.4)]"
              style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 0 20px rgba(0,198,255,0.3)' }}
            >
              Book a Discovery Call
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 hover:text-[#00C6FF] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[rgba(2,4,8,0.97)] backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-400 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className={`text-2xl font-medium transition-all duration-300 ${
              mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            } ${
              activeSection === link.href ? 'text-[#00C6FF]' : 'text-white hover:text-[#00C6FF]'
            }`}
            style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms' }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          className="btn-press mt-4 px-8 py-3 rounded-md text-base font-semibold text-[#020408] transition-all duration-300 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)' }}
        >
          Book a Discovery Call
        </a>
      </div>
    </>
  );
}

function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Your Store Is Making Revenue. Something Else Is Keeping The Profit.';
  const typingDone = useRef(false);

  useEffect(() => {
    if (typingDone.current) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        typingDone.current = true;
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/photo2.jpg"
          alt="Hero background"
          fill
          sizes="100vw"
          className="object-cover opacity-[0.10]"
          style={{ filter: 'blur(1px)' }}
          priority
        />
      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(2,4,8,0.96) 0%, rgba(8,13,20,0.92) 100%)' }} />
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${8 + (i * 7.5) % 85}%`,
                top: `${15 + (i * 11) % 70}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${6 + (i % 4) * 2}s`,
                width: `${3 + (i % 3) * 2}px`,
                height: `${3 + (i % 3) * 2}px`,
              }}
            />
          ))}
        </div>

        {/* Pre-Headline */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-[2px] bg-[#00C6FF]" />
          <span className="section-label">For E-Commerce Founders Who Are Selling More, But Keeping Less.</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline mb-6">
          {typedText}
          <span className="inline-block w-[3px] h-[0.8em] bg-[#00C6FF] ml-1 align-middle" style={{ animation: 'blink 1s infinite' }} />
        </h1>

        {/* Sub-Headline */}
        <p className="text-[#8899AA] text-base sm:text-lg max-w-[620px] mx-auto leading-relaxed mb-10">
          I find exactly where your money is leaking across your products, your ads, and your customers and show you how to stop it. No confusing reports. No generic advice. Just a clear picture of what is hurting your profit and a specific plan to fix it.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="#contact"
            className="btn-press px-8 py-3.5 rounded-md text-base font-semibold text-[#020408] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,198,255,0.4)]"
            style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 0 20px rgba(0,198,255,0.3)' }}
          >
            Find My Profit Leaks, Free 20-Min Call
          </a>
          <a
            href="#case-studies"
            className="btn-press px-8 py-3.5 rounded-md text-base font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:border-[#00C6FF] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)]"
          >
            See Client Results
          </a>
        </div>

        {/* Trust Bar */}
        <div className="reveal-stagger grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {TRUST_STATS.map((stat, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center transition-all duration-300 hover:border-[rgba(0,198,255,0.3)] hover:shadow-[0_0_20px_rgba(0,198,255,0.1)]">
              <div className="gradient-text text-xl sm:text-2xl font-bold">{stat.value}</div>
              <div className="text-[#8899AA] text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <span className="text-[#445566] text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="text-[#00C6FF] animate-bounce" size={20} />
        </div>
      </div>
    </section>
  );
}

function QuickProofSection() {
  const sectionRef = useScrollReveal();
  return (
    <section className="bg-[#080D14] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Quick Proof</span>
          <h2 className="section-headline text-[clamp(28px,4vw,48px)] font-extrabold text-white mt-3 mb-4">
            Real Stores. Real Numbers. Real Results.
          </h2>
          <p className="text-[#8899AA] text-base max-w-2xl mx-auto">
            Every single finding below came from data these founders already had. They just couldn&apos;t see it.
          </p>
        </div>

        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUICK_PROOF_CARDS.map((card, i) => (
            <div
              key={i}
              className={`quick-proof-card-${i + 1} bg-[#0D1520] border border-[rgba(0,198,255,0.12)] rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[rgba(0,198,255,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] group`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">{card.store}</h3>
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[rgba(0,198,255,0.1)] text-[#00C6FF] mb-5">
                {card.niche}
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-[#FF4444] text-sm font-semibold mb-2">
                  <AlertTriangle size={14} /> The Illusion
                </div>
                <p className="text-[#8899AA] text-sm leading-relaxed">{card.illusion}</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-[#F5A623] text-sm font-semibold mb-2">
                  <AlertTriangle size={14} /> The Reality
                </div>
                <p className="text-[#F0F4F8] text-sm leading-relaxed">{card.reality}</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-[#00C6FF] text-sm font-semibold mb-2">
                  <Target size={14} /> What We Found
                </div>
                <ul className="space-y-1">
                  {card.findings.map((f, fi) => (
                    <li key={fi} className="text-[#8899AA] text-sm leading-relaxed flex gap-2">
                      <span className="text-[#00C6FF] mt-1 shrink-0">•</span>{f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5 p-3 rounded-lg bg-[rgba(0,230,118,0.08)] border border-[rgba(0,230,118,0.15)]">
                <div className="flex items-center gap-2 text-[#00E676] text-sm font-semibold mb-1">
                  <Check size={14} /> The Result
                </div>
                <p className="text-[#F0F4F8] text-sm leading-relaxed">{card.result}</p>
              </div>

              <div className="border-l-2 border-[#00C6FF] pl-4 mb-5">
                <p className="text-[#8899AA] text-sm italic">{card.quote}</p>
                <p className="text-[#445566] text-xs mt-1">{card.author}</p>
              </div>

              <div className="overflow-hidden rounded-lg border border-[rgba(0,198,255,0.1)]">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[rgba(0,198,255,0.05)]">
                      <th className="px-3 py-2 text-left text-[#8899AA] font-medium">Investment</th>
                      <th className="px-3 py-2 text-left text-[#8899AA] font-medium">Timeline</th>
                      <th className="px-3 py-2 text-left text-[#8899AA] font-medium">Profit Added</th>
                      <th className="px-3 py-2 text-left text-[#8899AA] font-medium">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-2 text-[#F0F4F8]">{card.investment}</td>
                      <td className="px-3 py-2 text-[#F0F4F8]">{card.timeline}</td>
                      <td className="px-3 py-2 text-[#00E676] font-semibold">{card.profitAdded}</td>
                      <td className="px-3 py-2 gradient-text-gold font-bold">{card.roi}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-[#8899AA] text-base mb-4">These aren&apos;t edge cases. This is what happens when you stop running your store on gut feeling and start running it on data.</p>
          <a href="#case-studies" className="inline-flex items-center gap-2 text-[#00C6FF] font-semibold hover:gap-3 transition-all">
            See The Full Case Studies <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const sectionRef = useScrollReveal();
  return (
    <section id="about" className="bg-[#020408] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12" style={{ alignItems: 'stretch' }}>
          {/* Left - Photo */}
          <div className="relative h-full min-h-[600px]">
            <div className="relative h-full min-h-[600px] rounded-[20px] overflow-hidden border-2 border-[rgba(0,198,255,0.2)]" style={{ boxShadow: '0 0 40px rgba(0,198,255,0.15)' }}>
              <Image
                src="/images/photo1.png"
                alt="Mozahidul Islam - E-Commerce Growth Analyst"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -right-4 top-8 glass rounded-xl px-4 py-3" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <div className="gradient-text text-lg font-bold">$53.5M+</div>
              <div className="text-[#8899AA] text-xs">Revenue Tracked</div>
            </div>
            <div className="absolute -left-4 bottom-24 glass rounded-xl px-4 py-3" style={{ animation: 'float 6s ease-in-out infinite 2s' }}>
              <div className="gradient-text-gold text-lg font-bold">3 Years</div>
              <div className="text-[#8899AA] text-xs">Experience</div>
            </div>
            <div className="absolute -right-4 bottom-8 glass rounded-xl px-4 py-3" style={{ animation: 'float 6s ease-in-out infinite 4s' }}>
              <div className="text-[#00E676] text-lg font-bold">Available <span className="inline-block w-2 h-2 rounded-full bg-[#00E676] animate-pulse" /></div>
              <div className="text-[#8899AA] text-xs">For Projects</div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="section-label">The Analyst Behind the Data</span>
            <h2 className="section-headline text-[clamp(28px,3.5vw,44px)] font-extrabold text-white mt-3 mb-2 leading-tight">
              I Don&apos;t Just Read Dashboards.
            </h2>
            <h3 className="section-headline text-[clamp(20px,2.5vw,32px)] font-bold gradient-text mb-6">
              I Build the Engine That Powers Them.
            </h3>

            <p className="text-[#8899AA] text-base leading-relaxed mb-2">
              Hi, I&apos;m <strong className="text-white">Mozahidul Islam</strong>, E-Commerce Growth Analyst. (3 Years Of Experienced)
            </p>

            <div className="mt-5 mb-6">
              <div className="text-[#00C6FF] text-sm font-semibold tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#00C6FF]" /> What I Do
              </div>
              <p className="text-[#8899AA] text-base leading-relaxed mb-3">
                Most analysts only look at the surface, pulling basic Shopify reports and guessing at trends. <strong>I go deeper.</strong>
              </p>
              <p className="text-[#8899AA] text-base leading-relaxed mb-3">
                Before any analysis can begin, your data needs to be properly connected, cleaned, and structured. That is the behind-the-scenes engineering work I handle, <strong>connecting Shopify, GA4, Meta Ads, and Klaviyo</strong> into <strong>one unified source of truth</strong> using <strong>SQL, Python, and BigQuery</strong>.
              </p>
              <p className="text-[#8899AA] text-base leading-relaxed mb-3">
                Once the foundation is solid, I translate that <strong>raw, complex data into clear, profitable decisions</strong>.
              </p>
              <p className="text-[#8899AA] text-base leading-relaxed mb-3">
                E-commerce founders are often <strong>flying blind</strong>. Misled by <strong>vanity metrics</strong>. Handed agency reports claiming <strong>&quot;4.2x ROAS&quot;</strong> while their bank accounts quietly empty out. Working 11-hour days to make $11 an hour in real profit. My job is to <strong>find exactly where the money is leaking</strong>, <strong>tell you precisely what to fix first</strong>, and <strong>build the systems so it never happens again</strong>.
              </p>
              <p className="text-[#8899AA] text-base leading-relaxed">
                <strong>You don&apos;t need to touch a single line of code</strong>. <strong>Your job is to make decisions on clean, reliable data</strong>. <strong>My job is to make sure that data exists</strong>, and that it tells you the truth.
              </p>
            </div>

            {/* By The Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: 53.5, prefix: '$', suffix: 'M+', label: 'Revenue Tracked & Analyzed' },
                { value: 2.75, prefix: '', suffix: 'M+', label: 'Raw Data Events Processed' },
                { value: 47, prefix: '', suffix: '+', label: 'Analyses Delivered' },
                { value: 3, prefix: '', suffix: '', label: 'Industries Served' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 glass rounded-xl">
                  <div className="gradient-text text-2xl font-bold">
                    <Counter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="text-[#8899AA] text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div className="glass rounded-xl p-5 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[#00C6FF] text-xs font-semibold tracking-wider uppercase mb-1">Education</div>
                  <div className="text-white text-sm font-medium">University of Rajshahi</div>
                </div>
                <div>
                  <div className="text-[#00C6FF] text-xs font-semibold tracking-wider uppercase mb-1">Languages</div>
                  <div className="text-white text-sm font-medium">English | Bengali | Hindi | Urdu</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <button className="btn-press px-6 py-2.5 rounded-md text-sm font-semibold text-[#020408] transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)' }}>
                <Download size={16} /> Download CV
              </button>
              <a href="#case-studies" className="btn-press px-6 py-2.5 rounded-md text-sm font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center gap-2">
                <BarChart3 size={16} /> See My Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyMeSection() {
  const sectionRef = useScrollReveal();
  return (
    <section className="bg-[#0A0F18] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">WHY ME</span>
          <h2 className="section-headline text-[clamp(28px,4vw,48px)] text-white mt-3 mb-4">
            The 4 Principles That Shape Every Engagement
          </h2>
        </div>

        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { num: '01', title: 'I speak business, not jargon.', text: 'Every report is written so that a business owner, not a data scientist, can read it, understand it, and act on it immediately. If you need a glossary to read my work, I have failed.', cssClass: 'principle-card-01' },
            { num: '02', title: 'I deliver decisions, not data dumps.', text: 'You will never receive a spreadsheet full of numbers with no context. Every single finding comes with a specific, prioritized recommendation and a clear reason why it matters to your bottom line.', cssClass: 'principle-card-02' },
            { num: '03', title: 'I focus on your actual problem.', text: 'Every engagement is designed around the specific challenge your business is facing right now, not a generic template copy-pasted from the last client. Your data is unique. Your analysis should be too.', cssClass: 'principle-card-03' },
            { num: '04', title: 'I build for action, not admiration.', text: 'Dashboards and reports that sit unopened are worthless. Everything I build is designed to be used, by you and your team, every day, to make faster and better decisions with complete confidence.', cssClass: 'principle-card-04' },
          ].map((item) => (
            <div
              key={item.num}
              className={`rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,198,255,0.15)] ${item.cssClass}`}
            >
              <div className="text-5xl font-bold gradient-text mb-3">{item.num}</div>
              <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
              <p className="text-[#8899AA] text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyWorkWithMeSection() {
  const sectionRef = useScrollReveal();
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" ref={sectionRef}>
      {/* Background Photo */}
      <div className="absolute inset-0">
        <Image src="/images/photo3.jpg" alt="Background" fill sizes="100vw" className="object-cover opacity-[0.10]" />
      </div>
      <div className="absolute inset-0 bg-[rgba(2,4,8,0.92)]" />

      <div className="reveal relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">The Unfair Advantage</span>
          <h2 className="section-headline text-[clamp(28px,4vw,48px)] font-extrabold text-white mt-3 mb-2">
            Don&apos;t Hire an Agency.
          </h2>
          <h3 className="section-headline text-[clamp(22px,3vw,36px)] font-bold gradient-text mb-6">
            Hire a Profit Detective.
          </h3>
          <p className="text-[#8899AA] text-base max-w-3xl mx-auto leading-relaxed mb-3">
            Marketing agencies are paid to spend your money. They show you vanity metrics like &quot;4.2x ROAS&quot; to justify their retainers, while your actual bank account quietly empties out.
          </p>
          <p className="text-[#8899AA] text-base max-w-3xl mx-auto leading-relaxed">
            I am paid to find your money. I don&apos;t look at surface-level reports and call it analysis. I engineer your raw data from Shopify, GA4, Meta Ads, and Klaviyo and uncover the truth your current dashboards are hiding from you.
          </p>
          <p className="text-white font-semibold mt-4">Here is why founders trust me with their life&apos;s work.</p>
        </div>

        {/* 4 Reasons */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {WHY_ME_REASONS.map((reason) => (
            <div
              key={reason.num}
              className={`agency-reason-card agency-card-${reason.num}`}
            >
              <div className="flex items-start gap-4">
                <div className="reason-number shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold">
                  <span className="text-[#020408]">{reason.num}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-3">{reason.title}</h3>
                  <p className="text-[#8899AA] text-sm leading-relaxed">{reason.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marcus Testimonial */}
        <div className="glass rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="text-[#00C6FF] text-xs font-semibold tracking-widest uppercase mb-4">What A Founder Says</div>
          <p className="text-[#F0F4F8] text-base leading-relaxed italic mb-4">
            &quot;I fired my $2,500/month agency because their &apos;amazing dashboards&apos; still left me broke. The Health Check found the exact holes in my business in 7 days. I wish I had done this two years earlier.&quot;
          </p>
          <p className="text-[#8899AA] text-sm mb-4">Marcus T., NOIRE Collective</p>

          <div className="overflow-hidden rounded-lg border border-[rgba(0,198,255,0.15)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[rgba(0,198,255,0.05)]">
                  <th className="px-4 py-2 text-left text-[#FF4444] font-semibold">Before</th>
                  <th className="px-4 py-2 text-left text-[#00E676] font-semibold">After</th>
                  <th className="px-4 py-2 text-left text-[#F5A623] font-semibold">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-[#FF4444]">-$1,690/mo net profit</td>
                  <td className="px-4 py-3 text-[#00E676] font-semibold">+$33,040/mo net profit</td>
                  <td className="px-4 py-3 text-[#F5A623]">73 days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#8899AA] text-xs mt-3 leading-relaxed">
            How: Discount addiction detoxed (17.6% → 4.8%). Facebook &amp; TikTok ads cut by 70% and reallocated to organic/Google. Unified size charts to stop a 24.7% unit return rate. Mobile checkout rebuilt. Win-back email sent to 6,063 dormant customers.
          </p>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const sectionRef = useScrollReveal();
  return (
    <section id="services" className="bg-[#080D14] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Choose Your Starting Point</span>
          <h2 className="section-headline text-[clamp(28px,4vw,48px)] font-extrabold text-white mt-3 mb-4">
            Services
          </h2>
          <p className="text-[#8899AA] text-base max-w-2xl mx-auto">
            Every engagement delivers a clear finding, a specific action plan, and a direct conversation, not a data dump.
          </p>
        </div>

        {/* Part 1: Core Packages */}
        <div className="mb-20">
          <h3 className="text-white text-xl font-bold mb-2">Part 1: Core E-Commerce Packages</h3>
          <p className="text-[#8899AA] text-sm mb-8">Three tiers, one retainer. Designed to meet your store wherever it is today.</p>

          <div className="packages-grid mb-6">
            {CORE_PACKAGES.slice(0, 3).map((pkg) => (
              <div
                key={pkg.tier}
                className={`package-outer-wrapper service-card-wrapper ${pkg.tier.toLowerCase()}`}
              >
                <div className="package-inner-card service-card-inner">
                  {pkg.featured && (
                    <div className="most-chosen-badge-container">
                      <span className="most-chosen-badge">
                        <span className="badge-star">⭐</span> Most Chosen
                      </span>
                    </div>
                  )}

                <div className="text-[#00C6FF] text-xs font-semibold tracking-widest uppercase mb-2">{pkg.tag}</div>
                <h4 className="text-white text-lg font-bold mb-1">{pkg.name}</h4>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="gradient-text-gold text-xl font-bold">{pkg.price}</span>
                </div>
                <div className="text-[#8899AA] text-xs mb-4">{pkg.timeline}</div>
                <p className="text-[#8899AA] text-sm leading-relaxed mb-5">{pkg.description}</p>

                <ul className="space-y-2 mb-5">
                  {pkg.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-[#F0F4F8]">
                      <Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="mb-5">
                  <div className="text-[#00C6FF] text-xs font-semibold mb-1">Best For:</div>
                  <p className="text-[#8899AA] text-sm">{pkg.bestFor}</p>
                </div>

                <div className="p-4 rounded-lg bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.1)] mb-5">
                  <div className="text-[#00C6FF] text-xs font-semibold mb-2">Our Promise To You:</div>
                  <p className="text-[#F0F4F8] text-sm leading-relaxed">{pkg.promise}</p>
                </div>

                <a href="#contact" className="service-book-btn package-book-btn">{pkg.cta}</a>
                <a href={`/pdfs/${pkg.tier.toLowerCase()}-package.pdf`} download={`${pkg.tier}_Package_Details.pdf`} className="pdf-download-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download Full {pkg.tier.charAt(0) + pkg.tier.slice(1).toLowerCase()} Details PDF
                </a>
                </div>
              </div>
            ))}
          </div>
          {/* Retainer full width */}
          {(() => {
            const pkg = CORE_PACKAGES[3];
            return (
              <div className="service-card-wrapper retainer">
                <div className="service-card-inner">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-[#00C6FF] text-xs font-semibold tracking-widest uppercase mb-2">{pkg.tag}</div>
                    <h4 className="text-white text-lg font-bold mb-1">{pkg.name}</h4>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="gradient-text-gold text-xl font-bold">{pkg.price}</span>
                    </div>
                    <div className="text-[#8899AA] text-xs mb-4">{pkg.timeline}</div>
                    <p className="text-[#8899AA] text-sm leading-relaxed mb-5">{pkg.description}</p>
                    <ul className="space-y-2 mb-5">
                      {pkg.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm text-[#F0F4F8]">
                          <Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-5">
                      <div className="text-[#00C6FF] text-xs font-semibold mb-1">Best For:</div>
                      <p className="text-[#8899AA] text-sm">{pkg.bestFor}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.1)] mb-5">
                      <div className="text-[#00C6FF] text-xs font-semibold mb-2">Our Promise To You:</div>
                      <p className="text-[#F0F4F8] text-sm leading-relaxed">{pkg.promise}</p>
                    </div>
                    <a href="#contact" className="service-book-btn">{pkg.cta}</a>
                    <a href={`/pdfs/${pkg.tier.toLowerCase()}-package.pdf`} download={`${pkg.tier}_Package_Details.pdf`} className="pdf-download-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download Full Retainer Details PDF
                    </a>
                  </div>
                </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Part 2: Add-On Packages */}
        <div className="mb-20">
          <h3 className="text-white text-xl font-bold mb-2">Part 2: Specialized Add-On Packages</h3>
          <p className="text-[#00C6FF] text-base font-semibold mb-1">Have One Specific Problem?</p>
          <p className="text-[#8899AA] text-sm mb-8">Six focused audits, each one built around a single critical business question. Delivered in 7–14 days.</p>

          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADD_ON_PACKAGES.map((pkg, i) => (
              <div key={i} className={`addon-card-wrapper ${pkg.cssClass}`}>
                <div className="addon-card-inner">
                <h4 className="text-white font-bold text-base mb-1">{pkg.name}</h4>
                <div className="gradient-text-gold text-sm font-semibold mb-3">{pkg.price}</div>
                <div className="mb-3">
                  <div className="text-[#FF4444] text-xs font-semibold mb-1">Problem:</div>
                  <p className="text-[#8899AA] text-sm">{pkg.problem}</p>
                </div>
                <div>
                  <div className="text-[#00E676] text-xs font-semibold mb-1">Our Promise:</div>
                  <p className="text-[#F0F4F8] text-sm leading-relaxed">{pkg.promise}</p>
                </div>
                <a href="#contact" className="addon-book-btn">
                  Book the {pkg.name} →
                </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="/pdfs/addon-packages.pdf" download="Specialized_Add-On_Packages.pdf" className="btn-press px-6 py-2.5 rounded-md text-sm font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center gap-2 cursor-pointer no-underline">
              <Download size={14} /> Download Full Add-On Details PDF
            </a>
          </div>
        </div>

        {/* Part 3: Data Infrastructure */}
        <div>
          <h3 className="text-white text-xl font-bold mb-2">Part 3: Data Setup &amp; Infrastructure</h3>
          <p className="gradient-text text-base font-semibold mb-1">The Technical Foundation.</p>
          <p className="text-[#8899AA] text-sm mb-8">
            Before any analysis, your data must be connected and cleaned. We handle the entire backend engineering (GCP, BigQuery, API pipelines). You never touch a line of code. Pay only for what your stack actually needs.
          </p>

          {/* Bundle Cards */}
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {DATA_BUNDLES.map((bundle, i) => (
              <div key={i} className={`infra-card-wrapper ${bundle.cssClass}`}>
                <div className="infra-card-inner">
                <h4 className="text-white font-bold text-lg mb-2">{bundle.name}</h4>
                <p className="text-[#8899AA] text-sm mb-3">{bundle.bestFor}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#8899AA] text-xs">Timeline</div>
                    <div className="text-white text-sm font-medium">{bundle.timeline}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#8899AA] text-xs">Investment</div>
                    <div className="gradient-text-gold text-sm font-bold">{bundle.investment}</div>
                  </div>
                </div>
                <a href="#contact" className="infra-book-btn">
                  Book the {bundle.name} →
                </a>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="infra-table-wrapper">
            <div className="infra-table-inner">
            <table className="infra-table">
              <thead>
                <tr>
                  <th>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', letterSpacing: '3px' }}>
                      CAPABILITIES
                    </span>
                  </th>
                  <th>
                    <div className="col-badge basic">STARTER</div>
                    <div>Basic Setup</div>
                  </th>
                  <th>
                    <div className="col-badge pipeline">PRO</div>
                    <div>Full Pipeline</div>
                  </th>
                  <th>
                    <div className="col-badge auto">ELITE</div>
                    <div>Full + Automation</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {BUNDLE_FEATURES.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td>
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? <span className="check-cyan">✓</span> : <span className="cross-dim">✕</span>
                      ) : (
                        <span className="table-text-value cyan">{row.basic}</span>
                      )}
                    </td>
                    <td>
                      {typeof row.full === 'boolean' ? (
                        row.full ? <span className="check-purple">✓</span> : <span className="cross-dim">✕</span>
                      ) : (
                        <span className="table-text-value purple">{row.full}</span>
                      )}
                    </td>
                    <td>
                      {typeof row.auto === 'boolean' ? (
                        row.auto ? <span className="check-gold">✓</span> : <span className="cross-dim">✕</span>
                      ) : (
                        <span className="table-text-value gold">{row.auto}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          {/* 15 Individual Services */}
          <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
            <h4 className="text-white font-bold text-base mb-4">15 Individual Services Available (Pick Only What You Need)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-[#00C6FF] text-xs font-semibold tracking-wider uppercase mb-2">Infra &amp; APIs</div>
                <p className="text-[#8899AA] text-sm">Cloud Setup, Shopify, GA4, Meta Ads, Google Ads, Klaviyo Connections.</p>
              </div>
              <div>
                <div className="text-[#00C6FF] text-xs font-semibold tracking-wider uppercase mb-2">Pipeline &amp; Quality</div>
                <p className="text-[#8899AA] text-sm">Pipeline Build (per platform), Pagination &amp; Rate-Limit Handling, Data Cleaning, Multi-Platform Merge Logic.</p>
              </div>
              <div>
                <div className="text-[#00C6FF] text-xs font-semibold tracking-wider uppercase mb-2">Loading &amp; Auto</div>
                <p className="text-[#8899AA] text-sm">BigQuery Load Script, Automation &amp; Scheduling, Error Alerts, Credential Security, Dashboard Data-Source Connection.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href="/pdfs/data-setup-infrastructure.pdf" download="Data_Setup_Infrastructure_Services.pdf" className="btn-press px-6 py-2.5 rounded-md text-sm font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center gap-2 cursor-pointer no-underline">
              <Download size={14} /> Download Data Setup Presentation PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  const sectionRef = useScrollReveal();
  return (
    <section id="case-studies" className="bg-[#020408] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">The Receipts</span>
          <h2 className="section-headline text-[clamp(28px,4vw,48px)] text-white mt-3 mb-4">
            Featured Case Studies
          </h2>
          <p className="text-[#8899AA] text-base max-w-2xl mx-auto">
            High revenue doesn&apos;t mean high profit. Here is what happened when founders stopped looking at vanity metrics and let me read their real data.
          </p>
        </div>

        <div className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CASE_STUDIES.slice(0, 4).map((cs, i) => (
            <div key={i} className={`case-card-wrapper ${cs.cssClass}`}>
              <div className="case-card-inner">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-white font-bold text-lg">{cs.store}</h3>
                <span className={`case-type-badge ${cs.caseType}`}>{cs.caseType}</span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[rgba(0,198,255,0.1)] text-[#00C6FF] mb-2">
                {cs.niche}
              </div>
              <p className="text-[#F0F4F8] font-semibold text-sm mb-2">{cs.title}</p>
              <p className="case-tagline">{cs.tagline}</p>

              <div className="space-y-3 mb-5">
                <div>
                  <div className="flex items-center gap-2 text-[#FF4444] text-xs font-semibold mb-1">
                    <AlertTriangle size={12} /> The Nightmare
                  </div>
                  <p className="text-[#8899AA] text-sm leading-relaxed">{cs.nightmare}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#F5A623] text-xs font-semibold mb-1">
                    <Lightbulb size={12} /> The Revelation
                  </div>
                  <p className="text-[#8899AA] text-sm leading-relaxed">{cs.revelation}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#00C6FF] text-xs font-semibold mb-1">
                    <Zap size={12} /> The Turnaround
                  </div>
                  <p className="text-[#8899AA] text-sm leading-relaxed">{cs.turnaround}</p>
                </div>
                <div className="p-3 rounded-lg bg-[rgba(0,230,118,0.08)] border border-[rgba(0,230,118,0.15)]">
                  <div className="flex items-center gap-2 text-[#00E676] text-xs font-semibold mb-1">
                    <Rocket size={12} /> The Result
                  </div>
                  <p className="text-[#F0F4F8] text-sm font-semibold">{cs.result}</p>
                </div>
              </div>

              <a href={`/pdfs/case-${cs.cssClass}.pdf`} download={`${cs.store}_Case_Study.pdf`} className="text-[#00C6FF] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all no-underline">
                <Download size={14} /> Download Full {cs.store} Case Study PDF
              </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#case-studies-2" className="btn-press inline-flex items-center gap-2 text-[#00C6FF] font-semibold hover:gap-3 transition-all">
            See More Case Studies <ChevronDown size={16} />
          </a>
        </div>

        {/* Section Divider */}
        <div className="section-divider mt-20" />
      </div>
    </section>
  );
}

function CaseStudies2Section() {
  const sectionRef = useScrollReveal();
  return (
    <section id="case-studies-2" className="bg-[#0A0F18] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="case-studies-part2-grid mb-10">
          {CASE_STUDIES.slice(4).map((cs, i) => (
            <div key={i} className={`case-card-wrapper ${cs.cssClass}`}>
              <div className="case-card-inner">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-white font-bold text-lg">{cs.store}</h3>
                <span className={`case-type-badge ${cs.caseType}`}>{cs.caseType}</span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[rgba(0,198,255,0.1)] text-[#00C6FF] mb-2">
                {cs.niche}
              </div>
              <p className="text-[#F0F4F8] font-semibold text-sm mb-2">{cs.title}</p>
              <p className="case-tagline">{cs.tagline}</p>

              <div className="space-y-3 mb-5">
                <div>
                  <div className="flex items-center gap-2 text-[#FF4444] text-xs font-semibold mb-1">
                    <AlertTriangle size={12} /> The Nightmare
                  </div>
                  <p className="text-[#8899AA] text-sm leading-relaxed">{cs.nightmare}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#F5A623] text-xs font-semibold mb-1">
                    <Lightbulb size={12} /> The Revelation
                  </div>
                  <p className="text-[#8899AA] text-sm leading-relaxed">{cs.revelation}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#00C6FF] text-xs font-semibold mb-1">
                    <Zap size={12} /> The Turnaround
                  </div>
                  <p className="text-[#8899AA] text-sm leading-relaxed">{cs.turnaround}</p>
                </div>
                <div className="p-3 rounded-lg bg-[rgba(0,230,118,0.08)] border border-[rgba(0,230,118,0.15)]">
                  <div className="flex items-center gap-2 text-[#00E676] text-xs font-semibold mb-1">
                    <Rocket size={12} /> The Result
                  </div>
                  <p className="text-[#F0F4F8] text-sm font-semibold">{cs.result}</p>
                </div>
              </div>

              <a href={`/pdfs/case-${cs.cssClass}.pdf`} download={`${cs.store}_Case_Study.pdf`} className="text-[#00C6FF] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all no-underline">
                <Download size={14} /> Download Full {cs.store} Case Study PDF
              </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
        </div>
      </div>
    </section>
  );
}

function TechPortfolioSection() {
  const sectionRef = useScrollReveal();
  return (
    <section className="bg-[#080D14] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">The Engineering Behind The Insights</span>
          <h2 className="section-headline text-[clamp(28px,4vw,48px)] font-extrabold text-white mt-3 mb-4">
            Technical Portfolio
          </h2>
          <p className="text-[#8899AA] text-base max-w-2xl mx-auto">
            I don&apos;t just read Shopify&apos;s default reports. I build enterprise-grade analytical pipelines to process millions of raw data points.
          </p>
          <p className="text-[#8899AA] text-sm max-w-2xl mx-auto mt-2">
            Most analysts rely on basic plugins. I write the code that connects your platforms, processes millions of rows, and surfaces the truth. Here is a look at the production-grade data infrastructure I build behind the scenes.
          </p>
        </div>

        <div className="portfolio-cards-grid mb-8">
          {GITHUB_PROJECTS.map((proj, i) => (
            <div key={i} className={`portfolio-project-card portfolio-card-${['behavioral','financial','churn'][i]}`}>
              <h3 className="text-white font-bold text-lg mb-1">{proj.name}</h3>
              <p className="gradient-text text-sm font-semibold mb-3">{proj.subtitle}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.stack.map((s, si) => (
                  <span key={si} className="tech-tag px-2.5 py-1 rounded-md text-xs font-medium">{s}</span>
                ))}
              </div>
              <div className="mb-4">
                <div className="card-label-engineering text-xs font-semibold mb-1">The Engineering:</div>
                <p className="text-[#8899AA] text-sm leading-relaxed">{proj.engineering}</p>
              </div>
              <div className="mb-5">
                <div className="card-label-impact text-xs font-semibold mb-1">The Impact:</div>
                <p className="text-[#F0F4F8] text-sm leading-relaxed">{proj.impact}</p>
              </div>
              <a href="https://github.com/mojahid1252" target="_blank" rel="noopener noreferrer" className="text-[#00C6FF] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                View Code &amp; Methodology on GitHub <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-white text-base mb-3">Want to see the full codebase, SQL queries, and architecture?</p>
          <a href="https://github.com/mojahid1252" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold text-[#020408] transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)' }}>
            🔗 Explore My Full GitHub Portfolio <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const sectionRef = useScrollReveal();
  const featured = TESTIMONIALS.find((t) => t.featured);
  const grid = TESTIMONIALS.filter((t) => !t.featured);

  return (
    <section className="bg-[#020408] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Founders, Transformed</span>
          <h2 className="section-headline text-[clamp(28px,4vw,48px)] font-extrabold text-white mt-3 mb-4">
            Testimonials
          </h2>
          <p className="text-[#8899AA] text-base max-w-2xl mx-auto">
            Don&apos;t take my word for it. Listen to the founders who were running fast in the wrong direction, until the data showed them the truth.
          </p>
        </div>

        {/* Featured Testimonial */}
        {featured && (
          <div className="featured-quote-box max-w-4xl mx-auto mb-12 text-center">
            <span className="quote-mark">&ldquo;</span>
            <p className="text-[#F0F4F8] text-lg sm:text-xl leading-relaxed italic mb-6">{featured.quote}</p>
            <p className="text-[#8899AA] text-sm mb-2">{featured.author}</p>
            <div className="flex justify-center">
              <div className="profit-badge">
                <span className="profit-before">$84/year</span>
                <span className="profit-arrow">➔</span>
                <span className="profit-after">$48,400/month</span>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grid.map((t, i) => {
            const parts = t.profit.split(' ➔ ');
            return (
              <div key={i} className={`testimonial-card testimonial-card-${i + 1}`}>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} size={14} className="text-[#F5A623] fill-[#F5A623]" />
                  ))}
                </div>
                <p className="text-[#8899AA] text-sm leading-relaxed italic mb-4">{t.quote}</p>
                <p className="text-[#F0F4F8] text-sm font-medium mb-2">{t.author}</p>
                <div className="profit-badge">
                  <span className="profit-before">{parts[0]}</span>
                  <span className="profit-arrow">➔</span>
                  <span className="profit-after">{parts[1]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const sectionRef = useScrollReveal();
  return (
    <section id="process" className="relative py-20 sm:py-28 overflow-hidden" ref={sectionRef}>
      {/* Background Photo */}
      <div className="absolute inset-0">
        <Image src="/images/photo4.jpg" alt="Background" fill sizes="100vw" className="object-cover opacity-[0.08]" />
      </div>
      <div className="absolute inset-0 bg-[rgba(2,4,8,0.94)]" />

      <div className="reveal relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">The Engagement Flow</span>
          <h2 className="section-headline text-[clamp(28px,4vw,48px)] font-extrabold text-white mt-3 mb-2">
            Setup is Not an Add-on. It is the Foundation.
          </h2>
          <p className="text-[#8899AA] text-base max-w-3xl mx-auto leading-relaxed">
            Every engagement flows through the same disciplined sequence, from hire to insight. You make the decisions; I handle the engineering, the data cleaning, and the math. Here is exactly how we transform your raw data into profit:
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto space-y-6 mb-12">
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} className="flex gap-6 group">
              {/* Number Circle + Vertical Line */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,198,255,0.4)] group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)' }}>
                  <span className="text-[#020408]">{step.num}</span>
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="w-[2px] h-full bg-[rgba(0,198,255,0.2)] my-2 transition-all duration-500 group-hover:bg-[rgba(0,198,255,0.5)]" />
                )}
              </div>
              <div className="pb-4">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#00C6FF] transition-colors">{step.title}</h3>
                <p className="text-[#8899AA] text-sm leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quote Bar */}
        <div className="glass rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto text-center">
          <p className="text-[#F0F4F8] text-base leading-relaxed italic mb-2">
            &quot;The Health Check showed me something that destroyed and rebuilt me at the same time: I wasn&apos;t failing because of bad products. I was failing because I had no idea what was actually happening in my own business.&quot;
          </p>
          <p className="text-[#8899AA] text-sm">Marcus T., NOIRE Collective</p>
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  const sectionRef = useScrollReveal();
  return (
    <section className="bg-[#080D14] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">The Infrastructure Behind The Insights</span>
          <h2 className="section-headline text-[clamp(28px,4vw,48px)] font-extrabold text-white mt-3 mb-2">
            Enterprise Engineering. Without the $150K Salary.
          </h2>
          <p className="text-[#8899AA] text-base max-w-3xl mx-auto leading-relaxed">
            Shopify&apos;s default reports only tell 10% of the story. To find the hidden profit, you need to connect, warehouse, and model your data properly.
          </p>
          <p className="text-[#8899AA] text-sm max-w-3xl mx-auto leading-relaxed mt-2">
            I bring the exact same tech stack used by Fortune 500 companies, and build it custom for your store. You get enterprise-grade data infrastructure without the $150,000/year in-house data engineer salary.
          </p>
        </div>

        <div className="infra-tech-grid mb-10">
          {TECH_STACK.map((cat, i) => {
            const IconComp = cat.icon;
            return (
              <div key={i} className={`infra-tech-card infra-card-${['programming','cloud','visualization','platforms'][i]}`}>
                <div className="flex items-center gap-3 mb-2">
                  <IconComp size={22} className="infra-card-icon" />
                  <h3 className="infra-card-title font-bold text-lg">{cat.category}</h3>
                </div>
                <p className="text-[#8899AA] text-sm mb-5">{cat.description}</p>
                <div className="space-y-3">
                  {cat.items.map((item, ii) => (
                    <div key={ii} className="flex items-start gap-3">
                      <div className="infra-bullet-dot w-1.5 h-1.5 rounded-full mt-2 shrink-0" />
                      <div>
                        <div className="text-[#F0F4F8] text-sm font-medium">{item.name}</div>
                        <div className="text-[#8899AA] text-xs">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Bar */}
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-[#8899AA] text-sm leading-relaxed">
            This is the exact stack I used to process <strong className="text-white">2.75M raw e-commerce events</strong>, build a <strong className="text-white">$53.5M financial data warehouse</strong>, and run <strong className="text-white">11-tier RFM segmentation models</strong>. No generic templates. Just pure, custom-built data engineering.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const sectionRef = useScrollReveal();
  const [formState, setFormState] = useState({ name: '', email: '', url: '', message: '', budget: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }, []);

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden" ref={sectionRef}>
      {/* Background Photo */}
      <div className="absolute inset-0">
        <Image src="/images/photo5.jpg" alt="Background" fill sizes="100vw" className="object-cover opacity-[0.10]" />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(2,4,8,0.96) 0%, rgba(8,13,20,0.94) 100%)' }} />

      <div className="reveal relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Let&apos;s Find Your Next $10,000.</span>
          <h2 className="section-headline text-[clamp(28px,4vw,48px)] font-extrabold text-white mt-3 mb-2">
            Stop Guessing. Start Knowing.
          </h2>
          <p className="text-[#8899AA] text-base max-w-3xl mx-auto leading-relaxed">
            Every struggling store already has the data. What it doesn&apos;t have is someone willing to read it honestly, explain it clearly, and act on it decisively.
          </p>
          <p className="text-[#8899AA] text-sm max-w-3xl mx-auto mt-2">
            If your revenue is growing but something doesn&apos;t add up, you&apos;re probably right. The data knows. Let&apos;s read it together.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="glass rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto mb-12 text-center"
          style={{ boxShadow: '0 0 40px rgba(0,198,255,0.1)' }}>
          <h3 className="text-white text-xl font-bold mb-2">Ready to find out exactly where your profit is hiding?</h3>
          <p className="text-[#8899AA] text-sm mb-5">
            Book a complimentary 20-minute Discovery Call. We&apos;ll understand your business, identify your most urgent data problem, and recommend the right starting point. No pressure, no jargon.
          </p>
          <a href="#" className="btn-press inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-base font-semibold text-[#020408] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,198,255,0.4)]"
            style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 0 20px rgba(0,198,255,0.3)' }}>
            Book My Discovery Call <ArrowRight size={18} />
          </a>
        </div>

        {/* Two columns: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h3 className="text-white font-bold text-lg mb-5">Send a Message</h3>
            {submitted ? (
              <div className="text-center py-10">
                <Check size={48} className="text-[#00E676] mx-auto mb-4" />
                <p className="text-white text-lg font-semibold">Message Sent!</p>
                <p className="text-[#8899AA] text-sm mt-2">I&apos;ll get back to you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[#8899AA] text-xs font-semibold tracking-wider uppercase block mb-1.5">Name</label>
                  <input
                    type="text" required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.12)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00C6FF] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-[#8899AA] text-xs font-semibold tracking-wider uppercase block mb-1.5">Email</label>
                  <input
                    type="email" required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.12)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00C6FF] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-[#8899AA] text-xs font-semibold tracking-wider uppercase block mb-1.5">Store URL</label>
                  <input
                    type="url"
                    value={formState.url}
                    onChange={(e) => setFormState({ ...formState, url: e.target.value })}
                    className="w-full bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.12)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00C6FF] transition-colors"
                    placeholder="https://yourstore.com"
                  />
                </div>
                <div>
                  <label className="text-[#8899AA] text-xs font-semibold tracking-wider uppercase block mb-1.5">Budget Range</label>
                  <select
                    value={formState.budget}
                    onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                    className="w-full bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.12)] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00C6FF] transition-colors"
                  >
                    <option value="" className="bg-[#0D1520]">Select budget range</option>
                    <option value="150-500" className="bg-[#0D1520]">$150 – $500</option>
                    <option value="500-1000" className="bg-[#0D1520]">$500 – $1,000</option>
                    <option value="1000-2500" className="bg-[#0D1520]">$1,000 – $2,500</option>
                    <option value="2500+" className="bg-[#0D1520]">$2,500+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8899AA] text-xs font-semibold tracking-wider uppercase block mb-1.5">Message</label>
                  <textarea
                    required rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.12)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00C6FF] transition-colors resize-none"
                    placeholder="Tell me about your store and what you're struggling with..."
                  />
                </div>
                <button
                  type="submit"
                  className="btn-press w-full px-6 py-3.5 rounded-md text-base font-semibold text-[#020408] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,198,255,0.4)]"
                  style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)' }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-white font-bold text-lg mb-5">Prefer to reach out directly? Let&apos;s talk.</h3>
              <div className="space-y-4">
                <a href="mailto:mojahidulislam101010@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(0,198,255,0.1)] group-hover:bg-[rgba(0,198,255,0.2)] transition-colors">
                    <Mail size={18} className="text-[#00C6FF]" />
                  </div>
                  <div>
                    <div className="text-[#8899AA] text-xs">Email</div>
                    <div className="text-white text-sm font-medium">mojahidulislam101010@gmail.com</div>
                  </div>
                </a>
                <a href="https://linkedin.com/in/mozahidul-islam-analyst" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(0,198,255,0.1)] group-hover:bg-[rgba(0,198,255,0.2)] transition-colors">
                    <Linkedin size={18} className="text-[#00C6FF]" />
                  </div>
                  <div>
                    <div className="text-[#8899AA] text-xs">LinkedIn</div>
                    <div className="text-white text-sm font-medium">mozahidul-islam-analyst</div>
                  </div>
                </a>
                <a href="https://wa.me/8801940131074" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(0,198,255,0.1)] group-hover:bg-[rgba(0,198,255,0.2)] transition-colors">
                    <Phone size={18} className="text-[#00C6FF]" />
                  </div>
                  <div>
                    <div className="text-[#8899AA] text-xs">WhatsApp</div>
                    <div className="text-white text-sm font-medium">+880 1940131074</div>
                  </div>
                </a>
                <a href="https://github.com/mojahid1252" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(0,198,255,0.1)] group-hover:bg-[rgba(0,198,255,0.2)] transition-colors">
                    <Github size={18} className="text-[#00C6FF]" />
                  </div>
                  <div>
                    <div className="text-[#8899AA] text-xs">GitHub</div>
                    <div className="text-white text-sm font-medium">mojahid1252</div>
                  </div>
                </a>
              </div>
            </div>

            <a href="#" className="btn-press glass rounded-2xl p-6 flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,198,255,0.3)] group"
              style={{ background: 'linear-gradient(135deg, rgba(0,198,255,0.1), rgba(0,114,255,0.1))' }}>
              <Clock size={20} className="text-[#00C6FF]" />
              <div>
                <div className="text-white font-bold text-base">Book Discovery Call</div>
                <div className="text-[#8899AA] text-xs">Free 20-minute consultation</div>
              </div>
              <ArrowRight size={18} className="text-[#00C6FF] ml-auto group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#020408] border-t border-[rgba(0,198,255,0.08)] pt-16 pb-20 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with brand statement */}
        <div className="text-center mb-12">
          <h3 className="section-headline text-[clamp(20px,2.5vw,32px)] text-white mb-3">Stop Guessing. Start Knowing.</h3>
          <p className="text-[#8899AA] text-base max-w-xl mx-auto mb-6">Your data already has the answers. Let me find them for you.</p>
          <a href="#contact" className="btn-press inline-flex items-center gap-2 px-8 py-3 rounded-md text-sm font-semibold text-[#020408] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,198,255,0.4)]"
            style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 0 20px rgba(0,198,255,0.3)' }}>
            Book Your Free Discovery Call <ArrowRight size={16} />
          </a>
        </div>

        <div className="section-divider mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/images/logo.png" alt="Logo" width={44} height={44} className="rounded-lg" />
              <div>
                <div className="text-white font-bold text-sm">Mozahidul Islam</div>
                <div className="text-[#00C6FF] text-[11px] font-medium">E-Commerce Growth Analyst</div>
              </div>
            </div>
            <p className="text-[#8899AA] text-sm leading-relaxed">
              We transform raw data into clear, profitable decisions. We don&apos;t just deliver numbers, we deliver answers, direction, and results.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[{label:'Home',href:'#hero'},{label:'About',href:'#about'},{label:'Case Studies',href:'#case-studies'},{label:'Process',href:'#process'},{label:'Contact',href:'#contact'}].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[#8899AA] text-sm hover:text-[#00C6FF] transition-colors inline-flex items-center gap-1.5 group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-[#00C6FF] transition-all duration-200" /> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['E-Commerce Health Check', 'Revenue Growth Accelerator', 'Data-Driven Growth System', 'Analytics Partner Retainer', 'Specialized Add-On Audits', 'Data Setup & Infrastructure'].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-[#8899AA] text-sm hover:text-[#00C6FF] transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources & Connect */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Resources & Connect</h4>
            <ul className="space-y-2.5">
              <li><button className="text-[#8899AA] text-sm hover:text-[#00C6FF] transition-colors inline-flex items-center gap-1.5"><FileText size={12}/> Full Services PDF</button></li>
              <li><button className="text-[#8899AA] text-sm hover:text-[#00C6FF] transition-colors inline-flex items-center gap-1.5"><Database size={12}/> Data Setup PDF</button></li>
              <li><a href="https://linkedin.com/in/mozahidul-islam-analyst" target="_blank" rel="noopener noreferrer" className="text-[#8899AA] text-sm hover:text-[#00C6FF] transition-colors inline-flex items-center gap-1.5"><Linkedin size={12}/> LinkedIn</a></li>
              <li><a href="https://wa.me/8801940131074" target="_blank" rel="noopener noreferrer" className="text-[#8899AA] text-sm hover:text-[#00C6FF] transition-colors inline-flex items-center gap-1.5"><Phone size={12}/> WhatsApp</a></li>
              <li><a href="https://github.com/mojahid1252" target="_blank" rel="noopener noreferrer" className="text-[#8899AA] text-sm hover:text-[#00C6FF] transition-colors inline-flex items-center gap-1.5"><Github size={12}/> GitHub</a></li>
              <li><a href="mailto:mojahidulislam101010@gmail.com" className="text-[#8899AA] text-sm hover:text-[#00C6FF] transition-colors inline-flex items-center gap-1.5"><Mail size={12}/> Email</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(0,198,255,0.08)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#445566] text-sm">© 2025 Mozahidul Islam · E-Commerce Analytics. All rights reserved.</p>
          <p className="text-[#445566] text-xs">Built with data. Designed for profit.</p>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] lg:hidden"
      style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 -4px 20px rgba(0,198,255,0.30)' }}>
      <a href="#contact" className="btn-press flex items-center justify-center h-14 text-[#020408] font-bold text-sm gap-2">
        <Phone size={16} /> Book a Free Discovery Call
      </a>
    </div>
  );
}

/* ──────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────── */

export default function PortfolioPage() {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowBackToTop(scrollTop > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Scroll Progress */}
      <div id="scroll-progress" style={{ width: `${progress}%` }} />

      <Navbar />
      <HeroSection />
      <QuickProofSection />
      <AboutSection />
      <WhyMeSection />
      <WhyWorkWithMeSection />
      <ServicesSection />
      <CaseStudiesSection />
      <CaseStudies2Section />
      <TechPortfolioSection />
      <TestimonialsSection />
      <ProcessSection />
      <TechStackSection />
      <ContactSection />
      <Footer />
      <MobileStickyBar />

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        aria-label="Back to top"
      >
        <ChevronDown size={20} style={{ transform: 'rotate(180deg)' }} />
      </button>
    </main>
  );
}
