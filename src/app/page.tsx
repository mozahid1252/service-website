'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Menu, X, ChevronDown, Mail, Linkedin, Phone, Github,
  Check, Star, ArrowRight, Download, ExternalLink,
  BarChart3, TrendingUp, Users, Shield, Zap, Database,
  Code2, Cloud, LineChart, Plug, FileText, Clock,
  AlertTriangle, Target, Lightbulb, Rocket, MapPin, Calendar, Lock
} from 'lucide-react';

/* GitHub Pages basePath helper */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/* ──────────────────────────────────────────
   DATA CONSTANTS
   ────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: "Why We're Different", href: '#why-were-different' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Technical Portfolio', href: '#technical-portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const TRUST_STATS: { target?: number; prefix?: string; suffix?: string; value?: string; label: string; isRating?: boolean; isPrivacy?: boolean; isDeadline?: boolean; ratingLabel?: string }[] = [
  { target: 127, prefix: '+', suffix: '%', label: 'Avg Revenue Growth' },
  { target: 5, prefix: '', suffix: '+', label: 'Proved Case Study' },
  { target: 100, prefix: '', suffix: '%', label: 'Data Privacy', isPrivacy: true },
  { target: 100, prefix: '', suffix: '+', label: 'Projects Delivered' },
  { target: 4.9, prefix: '', suffix: '', isRating: true, ratingLabel: '' },
];

const QUICK_PROOF_CARDS = [
  {
    store: 'UrbanNest Home Decor',
    niche: 'Home Decor & Lifestyle, Shopify',
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
    timeline: '5–7 day',
    description: 'A 90-day forensic audit across sales, funnel, customers, and true product profitability.',
    features: [
      '4 focused analyses (Sales, Funnel, Customers, Profit)',
      'Executive Summary PDF (2-3 pages)',
      'Visual Dashboard (Looker Studio / Power BI)',
      'Action Priority List (This week / Month / Later)',
      '30-min Video Walkthrough',
      '1 Round of Revision',
    ],
    bestFor: 'Stores doing $5K+/mo',
    promise: 'After this package, you will know exactly where your store is losing potential revenue, which products are actually making you money, and the top 3 things to fix this week to see measurable results.',
    cta: 'Book the Health Check →',
    route: '/health-check',
    featured: false,
  },
  {
    tag: 'SCALE WHAT WORKS.',
    name: 'Revenue Growth Accelerator',
    tier: 'GROWTH',
    price: '$600 – $1,200',
    timeline: '10–14 day',
    description: 'Full RFM, channel LTV:CAC, cohort truth, bundle strategy, and an interactive intelligence dashboard.',
    features: [
      'Everything in Starter, plus 5 deeper analyses',
      'Full 8-segment RFM Customer Segmentation',
      'Channel LTV:CAC & Marketing Audit',
      'Cross-sell & Bundle Opportunity Analysis',
      'Churn Risk Identification Analysis',
      'Interactive Dashboard + Klaviyo-ready CSV',
      '60-min Strategy Call + 30-day Roadmap',
    ],
    bestFor: 'Stores doing $10K+/mo',
    promise: 'After this package, you will know exactly which customers to focus on (and what to say to each group), which marketing channels are wasting your money, and how to implement product bundles that immediately increase your average order value.',
    cta: 'Book the Growth Package →',
    route: '/revenue-growth-accelerator',
    featured: true,
  },
  {
    tag: 'LIVE IN THE DATA.',
    name: 'Data-Driven Growth System',
    tier: 'ADVANCED',
    price: '$2,000 – $4,000',
    timeline: '20–30 day',
    description: 'Your complete analytics engine, built once, runs forever. 15 total analyses including cohorts, forecasts, and live dashboards.',
    features: [
      'Everything in Growth, plus 6 advanced analyses',
      'Full Pipeline Setup package included free',
      'Complete Cohort Analysis & 90-Day Sales Forecast',
      'Profit Margin Deep Dive (True per-product profit)',
      'Live Custom KPI Dashboard',
      'Discount & Return Pattern Analysis',
      '90-min Strategy Session + 60-day Email Support',
    ],
    bestFor: 'Stores doing $50K+/mo',
    promise: 'After this package, you will never make a major business decision without data to back it up. You will know your most valuable customers, most profitable products, and have a live dashboard that gives you your business pulse in under 5 minutes each morning.',
    cta: 'Apply for Advanced →',
    route: '/data-driven-growth-system',
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
    bestFor: 'Stores doing $15K+/mo needing a permanent data partner.',
    promise: 'With this retainer, today\'s insight will never become outdated next month. We will detect problems between analyses before they cost you money, ensure your implemented changes are actually working, and keep you prepared for seasonal shifts before they catch you off guard.',
    cta: 'Become a Retainer Client →',
    route: '/analytics-partner-retainer',
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
    route: '/marketing-spend-audit',
  },
  {
    name: 'Customer Retention Audit',
    price: '$350 – $700 · 7–12 Days',
    problem: '"Customers buy once and disappear."',
    promise: 'You will know which customers are about to leave (and how to reach them before they do), which channels bring loyal customers, and have an upload-ready segmented list for immediate retention campaigns.',
    cssClass: 'retention',
    route: '/customer-retention-audit',
  },
  {
    name: 'Product Portfolio Audit',
    price: '$350 – $800 · 7–14 Days',
    problem: '"50+ SKUs, I don\'t know what to focus on."',
    promise: 'You will know which products to invest in, optimize, or cut, the true profit margin on every SKU in your catalog, and exactly which products to bundle together to increase AOV.',
    cssClass: 'portfolio',
    route: '/product-portfolio-audit',
  },
  {
    name: 'CRO Audit',
    price: '$250 – $500 · 7–10 Days',
    problem: '"Traffic is there but nobody\'s buying."',
    promise: 'You will know exactly where visitors are abandoning (and why), which fixes will have the highest impact, and have a prioritized action list to increase conversion by 20–40% using your existing traffic.',
    cssClass: 'cro',
    route: '/cro-audit',
  },
  {
    name: 'Profitability Audit',
    price: '$350 – $700 · 8–12 Days',
    problem: '"Revenue grows but profit doesn\'t."',
    promise: 'You will know your true profit margin on every product/channel, exactly where revenue is leaking into cost, if your promotions are eroding profit, and when your cash will be tight in coming months.',
    cssClass: 'profitability',
    route: '/profitability-audit',
  },
  {
    name: 'Operations Efficiency Audit',
    price: '$400 – $800 · 10–14 Days',
    problem: '"Returns climbing, inventory out of control."',
    promise: 'You will know which suppliers are causing financial problems, exactly how much inventory to order (and when based on 90-day demand), the true cost of your return rate, and how to free up cash locked in dead stock.',
    cssClass: 'operations',
    route: '/operations-efficiency-audit',
  },
  {
    name: 'Meta Ads Performance Audit',
    price: '$500 – $900 · 10–14 Days',
    problem: '"My Meta Ads are spending, but I don\'t know what\'s actually driving profitable growth."',
    promise: 'You will know which campaigns, audiences, creatives, and placements are driving profitable results, where your ad spend is leaking, and exactly what to scale, optimize, or cut.',
    cssClass: 'meta-ads',
    route: '/meta-ads-performance-audit',
  },
];

const DATA_BUNDLES = [
  { name: 'Basic Setup', bestFor: 'One-time analysis clients (2-3 platforms)', timeline: '2–3 Days', investment: '$150 – $300', cssClass: 'infra-wrapper-basic', route: '/basic-setup' },
  { name: 'Full Pipeline Setup', bestFor: 'Ongoing/recurring clients (All APIs + Merge)', timeline: '5–7 Days', investment: '$500 – $900', cssClass: 'infra-wrapper-pipeline', route: '/full-pipeline-setup' },
  { name: 'Full Pipeline + Automation', bestFor: 'Live dashboard & retainer clients (Auto-updating)', timeline: '7–10 Days', investment: '$700 – $1,200', cssClass: 'infra-wrapper-auto', route: '/full-pipeline-automation' },
];

const BUNDLE_FEATURES = [
  { feature: 'Cloud Infrastructure', basic: true, full: true, auto: true },
  { feature: 'Platform API Connections', basic: '2–3', full: 'All', auto: 'All' },
  { feature: 'Data Pipeline Build', basic: true, full: true, auto: true },
  { feature: 'Data Cleaning', basic: true, full: true, auto: true },
  { feature: 'Multi-Platform Merge', basic: '2–3', full: true, auto: true },
  { feature: 'BigQuery Load Script', basic: false, full: true, auto: true },
  { feature: 'Credential Security', basic: false, full: true, auto: true },
  { feature: 'Dashboard Connection', basic: false, full: true, auto: true },
  { feature: 'Automated Scheduling', basic: false, full: false, auto: true },
  { feature: 'Error Alerts', basic: false, full: false, auto: true },
];

/* Tier key per bundle (indexes match DATA_BUNDLES order) */
const BUNDLE_TIER_KEYS = ['basic', 'full', 'auto'] as const;

/* Shared check / cross icons used inside each package card's feature list */
const FeatureCheckIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const FeatureCrossIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* 15 Individual Services — category data for the redesigned "à la carte" box */
const ISB_CATEGORIES = [
  {
    title: 'Infra & APIs',
    catIcon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    items: [
      { name: 'Cloud Setup', logo: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00C6FF" strokeWidth="2" strokeLinecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>) },
      { name: 'Shopify API Connect', logo: (<svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.337 3.28c-.013-.1-.1-.15-.18-.16-.08-.01-1.74-.13-1.74-.13s-1.16-1.14-1.28-1.26c-.12-.12-.36-.08-.45-.06l-.98.3C10.367.72 9.757.5 9.057.5c-1.97 0-2.92 1.47-3.23 2.96-.84.19-1.68.44-2.29.64L2.027 19.5l11.5 2 6-1.5L15.337 3.28z" fill="#96BF48" /><path d="M14.157 3.12c-.08-.01-1.74-.13-1.74-.13s-1.16-1.14-1.28-1.26c-.05-.05-.11-.07-.17-.07v19.86l6-1.5-2.63-16.73c-.013-.1-.1-.15-.18-.16z" fill="#5E8E3E" /></svg>) },
      { name: 'GA4 API Connect', logo: (<svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" fill="#E37400" /><rect x="7" y="13" width="2.5" height="4" rx="1" fill="white" /><rect x="11" y="10" width="2.5" height="7" rx="1" fill="white" /><rect x="15" y="7" width="2.5" height="10" rx="1" fill="white" opacity="0.8" /></svg>) },
      { name: 'Meta Ads API Connect', logo: (<svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" /></svg>) },
      { name: 'Google Ads API Connect', logo: (<svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>) },
      { name: 'Klaviyo API Connect', logo: (<svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="22" height="22" rx="4" fill="#1A1A1A" /><text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="900" fill="#00FF66" fontFamily="Arial">KL</text></svg>) },
    ],
  },
  {
    title: 'Pipeline & Quality',
    catIcon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    items: [
      { name: 'Pipeline Build (per platform)', logo: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>) },
      { name: 'Pagination & Rate-Limit Handling', logo: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>) },
      { name: 'Data Cleaning', logo: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"><polyline points="22 11.08 22 12 a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>) },
      { name: 'Multi-Platform Merge Logic', logo: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M13 6h3a2 2 0 0 1 2 2v7" /><line x1="6" y1="9" x2="6" y2="21" /></svg>) },
    ],
  },
  {
    title: 'Loading & Auto',
    catIcon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    items: [
      { name: 'BigQuery Load Script', logo: (<svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#4285F4" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#4285F4" strokeWidth="1.5" fill="none" /></svg>) },
      { name: 'Automation & Scheduling', logo: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>) },
      { name: 'Error Alerts', logo: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>) },
      { name: 'Credential Security', logo: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>) },
      { name: 'Dashboard Data-Source Connection', logo: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>) },
    ],
  },
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

const TECH_ICONS: Record<string, React.ReactNode> = {
  'SQL': <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" /></svg>,
  'Python': <svg width="12" height="12" viewBox="0 0 24 24" fill="#3776AB"><path d="M11.9 0c-3.9 0-3.7 1.7-3.7 1.7v2h3.8v.6H5.8S3 4.2 3 8.1s2.4 4.8 2.4 4.8h1.4V9.4s-.1-2.4 2.3-2.4h3.8s2.2 0 2.2-2.1V2.1S15.6 0 11.9 0zM9.8 1.2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" /><path d="M12.1 24c3.9 0 3.7-1.7 3.7-1.7v-2h-3.8v-.6h6.2s2.8-.1 2.8-4-2.4-4.8-2.4-4.8h-1.4v3.5s.1 2.4-2.3 2.4h-3.8s-2.2 0-2.2 2.1v4.6S8.4 24 12.1 24zm2.1-1.2c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="#FFD43B" /></svg>,
  'Power BI': <svg width="12" height="12" viewBox="0 0 24 24" fill="#F2C811"><path d="M3 18h4v3H3z" /><rect x="9" y="11" width="4" height="10" rx="0.5" /><rect x="15" y="5" width="4" height="16" rx="0.5" opacity="0.85" /></svg>,
  'PostgreSQL': <svg width="12" height="12" viewBox="0 0 24 24" fill="#336791"><path d="M23 9c-.2-1.5-1.2-2.5-2.7-2.8-.5-.1-1.1-.1-1.7-.1-.3-1.2-1-2.2-2-2.9C15.1 2.1 13.2 1.5 11 1.5c-2.9 0-5.3 1.2-6.7 3.3-.8 1.2-1.1 2.6-.9 4C2 9.7 1 11 .8 12.5c-.2 1.8.4 3.4 1.7 4.5 1 .9 2.4 1.4 3.8 1.4.3 0 .6 0 .9-.1.4.6 1 1 1.7 1.2.4.1.8.2 1.2.2.5 0 1-.1 1.5-.3.4.5 1 .8 1.6.9 1.3.2 2.6-.3 3.3-1.3.6-.8.8-1.8.6-2.8.8-.3 1.4-.9 1.7-1.7.4-1.1.2-2.3-.5-3.2.5-.4.9-.9 1.1-1.5.3-1 .2-2-.1-2.8.5.1 1 .2 1.5.1 1.5-.2 2.7-1.2 3.1-2.6.1-.4.1-.7.1-1z" /></svg>,
  'DAX': <svg width="12" height="12" viewBox="0 0 24 24" fill="#F2C811"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#F2C811" strokeWidth="2" /><text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="900" fill="#F2C811">DAX</text></svg>,
  'Excel': <svg width="12" height="12" viewBox="0 0 24 24" fill="#217346"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#217346" strokeWidth="2" /><text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="900" fill="#217346">XLS</text></svg>,
  'BigQuery': <svg width="12" height="12" viewBox="0 0 24 24" fill="#4285F4"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#4285F4" strokeWidth="1.5" fill="none" /></svg>,
  'GCP': <svg width="12" height="12" viewBox="0 0 24 24" fill="#4285F4"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" fill="none" stroke="#4285F4" strokeWidth="2" /><text x="12" y="15" textAnchor="middle" fontSize="6" fontWeight="900" fill="#4285F4">GCP</text></svg>,
  'GA4': <svg width="12" height="12" viewBox="0 0 24 24" fill="#E37400"><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" /><rect x="7" y="13" width="2.5" height="4" rx="1" fill="white" /><rect x="11" y="10" width="2.5" height="7" rx="1" fill="white" /><rect x="15" y="7" width="2.5" height="10" rx="1" fill="white" opacity="0.8" /></svg>,
  'Shopify': <svg width="12" height="12" viewBox="0 0 24 24" fill="#96BF48"><path d="M15.337 3.28c-.013-.1-.1-.15-.18-.16-.08-.01-1.74-.13-1.74-.13s-1.16-1.14-1.28-1.26c-.12-.12-.36-.08-.45-.06l-.98.3C10.367.72 9.757.5 9.057.5c-1.97 0-2.92 1.47-3.23 2.96-.84.19-1.68.44-2.29.64L2.027 19.5l11.5 2 6-1.5L15.337 3.28z" /></svg>,
  'Meta Ads': <svg width="12" height="12" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
  'Google Ads': <svg width="12" height="12" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>,
  'Looker Studio': <svg width="12" height="12" viewBox="0 0 24 24" fill="#4285F4"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#4285F4" strokeWidth="2" /><path d="M7 14l3-3 3 2 4-5" stroke="#4285F4" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  'APIs': <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00C6FF" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
};

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
    title: 'The Delivery & Strategy Call',
    text: 'You don\'t receive a data dump. You receive a plain-language Executive PDF, a visual dashboard, and a prioritized action plan. We hop on a strategy call (30 to 90 minutes, depending on your package) where I explain every finding and tell you exactly what to fix first.',
  },
  {
    num: 5,
    title: 'Execution & Monitoring (Ongoing)',
    text: 'You implement the fixes, like pausing losing ads, flipping budgets, or sending win-back emails. If you are a Retainer client, I monitor your live dashboard 24/7, sending proactive anomaly alerts and updating your forecasts so today\'s insights never go stale.',
  },
];

/* Tool logo SVGs for the Infrastructure section (replace bullet dots) */
const TOOL_LOGOS: Record<string, React.ReactNode> = {
  python: (
    <svg width="20" height="20" viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pyGrad1" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%">
          <stop offset="0%" stopColor="#387EB8" />
          <stop offset="100%" stopColor="#366994" />
        </linearGradient>
        <linearGradient id="pyGrad2" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%">
          <stop offset="0%" stopColor="#FFE052" />
          <stop offset="100%" stopColor="#FFC331" />
        </linearGradient>
      </defs>
      <path fill="url(#pyGrad1)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" />
      <path fill="url(#pyGrad2)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.519 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" />
    </svg>
  ),
  sql: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="5" rx="9" ry="3" fill="#00C6FF" opacity="0.9" />
      <path d="M3 5v4c0 1.657 4.03 3 9 3s9-1.343 9-3V5" stroke="#00C6FF" strokeWidth="1.5" fill="rgba(0,198,255,0.15)" />
      <path d="M3 9v4c0 1.657 4.03 3 9 3s9-1.343 9-3V9" stroke="#00C6FF" strokeWidth="1.5" fill="rgba(0,198,255,0.10)" />
      <path d="M3 13v4c0 1.657 4.03 3 9 3s9-1.343 9-3v-4" stroke="#00C6FF" strokeWidth="1.5" fill="rgba(0,198,255,0.05)" />
    </svg>
  ),
  stats: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3v18h18" stroke="#00C6FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 16l4-6 4 4 4-8" stroke="#00C6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="16" r="1.5" fill="#00C6FF" />
      <circle cx="11" cy="10" r="1.5" fill="#00C6FF" />
      <circle cx="15" cy="14" r="1.5" fill="#00C6FF" />
      <circle cx="19" cy="6" r="1.5" fill="#00C6FF" />
    </svg>
  ),
  gcp: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.19 2.5l6.93 12h-13.86l6.93-12z" fill="#EA4335" />
      <path d="M5.26 14.5l3.47 6h6.93l-3.47-6H5.26z" fill="#FBBC04" />
      <path d="M15.19 14.5h-6.93l3.47 6 3.46-6z" fill="#34A853" />
      <path d="M12.19 2.5L5.26 14.5h3.46L12.19 8.5l3.47 6h3.46L12.19 2.5z" fill="#4285F4" />
    </svg>
  ),
  bigquery: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#4285F4" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#4285F4" strokeWidth="1.5" fill="none" />
      <circle cx="17" cy="17" r="4" fill="#4285F4" opacity="0.9" />
      <circle cx="17" cy="17" r="2.5" fill="#1a73e8" />
      <path d="M20 20l2.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  postgres: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#336791" />
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" fill="#fff" opacity="0.15" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" fontFamily="Arial">PG</text>
    </svg>
  ),
  looker: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#4285F4" />
      <circle cx="12" cy="12" r="6" fill="#EA4335" />
      <circle cx="12" cy="12" r="3" fill="#FBBC04" />
      <circle cx="12" cy="12" r="1.5" fill="white" />
    </svg>
  ),
  powerbi: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="10" width="4" height="12" rx="1" fill="#F2C811" />
      <rect x="8" y="6" width="4" height="16" rx="1" fill="#F2C811" opacity="0.85" />
      <rect x="14" y="2" width="4" height="20" rx="1" fill="#F2C811" opacity="0.70" />
      <rect x="20" y="8" width="2" height="14" rx="1" fill="#F2C811" opacity="0.50" />
    </svg>
  ),
  excel: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#217346" />
      <path d="M7 8l3 4-3 4h2l2-2.5L13 16h2l-3-4 3-4h-2l-2 2.5L9 8H7z" fill="white" />
      <rect x="14" y="8" width="6" height="1.5" rx="0.5" fill="white" opacity="0.7" />
      <rect x="14" y="11.25" width="6" height="1.5" rx="0.5" fill="white" opacity="0.7" />
      <rect x="14" y="14.5" width="6" height="1.5" rx="0.5" fill="white" opacity="0.7" />
    </svg>
  ),
  shopify: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.337 3.28c-.013-.1-.1-.15-.18-.16-.08-.01-1.74-.13-1.74-.13s-1.16-1.14-1.28-1.26c-.12-.12-.36-.08-.45-.06-.02 0-.38.12-.98.3C10.367.72 9.757.5 9.057.5c-1.97 0-2.92 1.47-3.23 2.96C4.787 3.65 3.947 3.9 3.337 4.1c-.03.01-.06.02-.08.04L2.027 19.5l11.5 2 6-1.5L15.337 3.28z" fill="#96BF48" />
      <path d="M14.157 3.12c-.08-.01-1.74-.13-1.74-.13s-1.16-1.14-1.28-1.26c-.05-.05-.11-.07-.17-.07v19.86l6-1.5-2.63-16.73c-.013-.1-.1-.15-.18-.16z" fill="#5E8E3E" />
      <path d="M9.057 7.5l-.74 2.76s-.82-.37-1.82-.37c-1.47 0-1.54.92-1.54 1.15 0 1.26 3.29 1.74 3.29 4.69 0 2.32-1.47 3.81-3.46 3.81-2.38 0-3.59-1.48-3.59-1.48l.64-2.1s1.25 1.07 2.3 1.07c.69 0 .97-.54.97-1 0-1.64-2.7-1.71-2.7-4.43 0-2.28 1.64-4.49 4.94-4.49 1.27 0 1.9.36 1.9.36z" fill="white" />
    </svg>
  ),
  ga4: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" fill="#E37400" />
      <rect x="7" y="13" width="3" height="5" rx="1.5" fill="white" />
      <rect x="12" y="9" width="3" height="9" rx="1.5" fill="white" />
      <rect x="17" y="6" width="3" height="12" rx="1.5" fill="white" opacity="0.8" />
    </svg>
  ),
  'meta-google': (
    <>
      <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
      </svg>
      <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '-4px' }}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    </>
  ),
  klaviyo: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#1A1A1A" />
      <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="900" fill="#00FF66" fontFamily="Arial, sans-serif" letterSpacing="-0.5">KL</text>
    </svg>
  ),
  aws: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 11.7c0 .3 0 .5.05.7.05.2.15.45.3.75.05.1.05.15 0 .2l-.6.5c-.05.05-.15.05-.2 0-.3-.45-.5-.85-.6-1.25-.2-.55-.3-1.15-.3-1.8 0-.65.1-1.25.3-1.8.2-.6.5-1.05.85-1.5.4-.5.85-.85 1.4-1.15.6-.3 1.25-.45 2-.45.5 0 .95.05 1.4.2.4.15.8.4 1.15.7.05.05.05.1.05.15v.05l-.05.1-.55.65c-.05.05-.1.05-.2 0-.45-.3-.9-.45-1.45-.45-.55 0-1 .25-1.4.65-.4.4-.6.95-.6 1.7zm6.55-.6c0 .25-.05.45-.15.65-.1.2-.25.35-.45.5-.2.15-.4.25-.65.3-.25.05-.5.1-.75.1-.5 0-1-.1-1.5-.25-.5-.15-.95-.4-1.35-.7-.05-.05-.05-.1-.05-.15l.05-.05.55-.7c.05-.05.1-.05.2 0 .35.25.7.45 1.05.55.35.1.7.15 1 .15.4 0 .65-.05.85-.15.2-.1.25-.25.25-.45 0-.1-.05-.2-.15-.3-.1-.1-.3-.15-.55-.25l-.85-.2c-.5-.1-.85-.3-1.1-.5-.25-.2-.35-.55-.35-1 0-.5.2-.9.6-1.2.4-.3.95-.45 1.65-.45.45 0 .9.1 1.35.25.45.15.85.4 1.15.7.05.05.05.1.05.15l-.05.05-.5.7c-.05.05-.1.05-.2 0-.3-.2-.6-.35-.9-.45-.3-.1-.55-.15-.8-.15-.35 0-.6.05-.75.15-.15.1-.2.25-.2.4 0 .1.05.2.15.3.1.1.3.15.6.25l.85.2c.55.1.9.3 1.15.55.25.25.35.6.35 1zM19.45 9.2c0-.05-.05-.1-.1-.1h-.85c-.05 0-.1.05-.15.1l-.65 2.05-.7-2.05c0-.05-.05-.1-.15-.1h-.7c-.05 0-.1.05-.15.1l-.7 2.05-.65-2.05c0-.05-.05-.1-.15-.1h-.85c-.05 0-.1.05-.1.1v.1l1.2 3.55c0 .05.05.1.15.1h.75c.05 0 .1-.05.15-.1l.65-1.95.65 1.95c0 .05.05.1.15.1h.75c.05 0 .1-.05.15-.1l1.2-3.55z" fill="#FF9900" />
      <path d="M19.95 12.4c.65.6 1.45.85 2.4.85.5 0 .95-.1 1.3-.25.35-.15.6-.35.7-.6.1-.25.15-.5.15-.75 0-.5-.15-.85-.45-1.1-.3-.25-.75-.45-1.35-.55l-.55-.15c-.25-.05-.45-.15-.55-.2-.1-.05-.15-.15-.15-.25 0-.15.05-.25.2-.35.15-.1.35-.15.6-.15.45 0 .9.15 1.3.4.05.05.1.05.15 0l.5-.65c.05-.05.05-.1 0-.15-.45-.35-1.05-.55-1.8-.55-.45 0-.85.1-1.2.25-.35.15-.55.35-.7.6-.15.25-.2.5-.2.75 0 .5.15.85.45 1.1.3.25.7.4 1.3.55l.55.15c.3.05.5.15.6.2.1.05.15.15.15.25 0 .15-.05.25-.2.35-.15.1-.4.15-.7.15-.25 0-.5-.05-.75-.15-.25-.1-.45-.25-.65-.4-.05-.05-.1-.05-.15 0l-.55.7c-.05.05-.05.1 0 .15z" fill="#FF9900" />
    </svg>
  ),
  azure: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="azureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0078D4" />
          <stop offset="100%" stopColor="#00BCF2" />
        </linearGradient>
      </defs>
      <path d="M11.4 4.5L5 17.6h6.95l.55-1.45L8.6 12.7l3.5-7.5z" fill="url(#azureGrad)" opacity="0.4" />
      <path d="M11.4 4.5L4.95 17.6h4.55l4.55-9.5z" fill="url(#azureGrad)" />
      <path d="M12.65 17.6l5.85-2.15-3.5-3.55z" fill="url(#azureGrad)" opacity="0.7" />
      <path d="M13.05 17.6L19 12.3l-1.7-1.95-3.45 4.95z" fill="url(#azureGrad)" />
      <path d="M11.9 4.5l1.15 13.1h6L19.05 4.5z" fill="url(#azureGrad)" opacity="0.85" />
    </svg>
  ),
  snowflake: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#29B5E8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="3.5" y1="7" x2="20.5" y2="17" />
      <line x1="20.5" y1="7" x2="3.5" y2="17" />
      <polyline points="9.5 4 12 6 14.5 4" />
      <polyline points="9.5 20 12 18 14.5 20" />
      <polyline points="5 9.5 7.5 9.5 6.5 7.5" />
      <polyline points="17.5 14.5 19 16.5 17 16.5" />
      <polyline points="19 9.5 17 9.5 18 7.5" />
      <polyline points="5 14.5 7 14.5 6 16.5" />
    </svg>
  ),
  tableau: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="2" x2="12" y2="9.5" stroke="#E8762D" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="6" y1="11" x2="6" y2="15.5" stroke="#5B5FCB" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="18" y1="11" x2="18" y2="15.5" stroke="#5B5FCB" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="9" y1="17" x2="9" y2="22" stroke="#1E8CE3" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="15" y1="17" x2="15" y2="22" stroke="#1E8CE3" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="#5B5FCB" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="9" y1="16" x2="15" y2="16" stroke="#5B5FCB" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="9.5" r="1.6" fill="#E8762D" />
      <circle cx="6" cy="15.5" r="1.4" fill="#5B5FCB" />
      <circle cx="18" cy="15.5" r="1.4" fill="#5B5FCB" />
      <circle cx="9" cy="22" r="1.2" fill="#1E8CE3" />
      <circle cx="15" cy="22" r="1.2" fill="#1E8CE3" />
    </svg>
  ),
  woocommerce: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 4.5h17A1.5 1.5 0 0 1 22 6v8a1.5 1.5 0 0 1-1.5 1.5h-11L6 19v-3.5H3.5A1.5 1.5 0 0 1 2 14V6a1.5 1.5 0 0 1 1.5-1.5z" fill="#7F54B3" />
      <path d="M6.5 8.2c-.4 0-.7.2-.9.5-.2.4-.3.9-.3 1.5 0 .6.1 1.1.3 1.5.2.4.5.6.9.6.4 0 .7-.2.9-.6.2-.4.3-.9.3-1.5 0-.6-.1-1.1-.3-1.5-.2-.3-.5-.5-.9-.5zm-2.6 2c0-.7.1-1.3.4-1.9.3-.5.7-.9 1.2-1.2.5-.3 1.1-.4 1.7-.4.5 0 1 .1 1.4.3.4.2.8.5 1 .9.3.4.4.8.4 1.3 0 .4-.1.7-.2 1-.2.3-.4.5-.6.7-.2.2-.5.4-.9.6-.3.2-.6.3-.8.4-.2.1-.3.1-.4.2-.1.1-.2.2-.2.3l-.5 1.4c-.1.2-.2.4-.4.5-.2.1-.4.2-.6.2-.2 0-.4-.1-.5-.2-.1-.2-.2-.4-.2-.6 0-.3.1-.7.2-1.1l.6-1.8c-.3-.5-.4-1.1-.4-1.8z" fill="#FFFFFF" />
      <path d="M12.7 8.4c-.3-.2-.6-.2-1-.2-.4 0-.7.1-1 .2-.3.2-.5.4-.7.7-.2.3-.3.7-.3 1.1 0 .4.1.8.3 1.1.2.3.4.5.7.7.3.2.6.2 1 .2.4 0 .7-.1 1-.2.3-.2.5-.4.7-.7.2-.3.3-.7.3-1.1 0-.4-.1-.8-.3-1.1-.2-.3-.4-.5-.7-.7zm-2.9-.6c.3-.4.7-.7 1.1-.9.4-.2.9-.3 1.4-.3.5 0 1 .1 1.4.3.4.2.8.5 1.1.9.3.4.5.8.5 1.3 0 .3 0 .6-.1.9-.1.3-.2.5-.4.7-.2.2-.3.4-.5.5-.2.1-.4.3-.6.4-.2.1-.4.2-.5.3.4.3.7.7.9 1.1.2.4.3.9.3 1.4 0 .5-.1.9-.3 1.3-.2.4-.5.7-.8.9-.4.2-.8.4-1.2.5-.5.1-.9.2-1.4.2-.5 0-1-.1-1.4-.2-.5-.1-.9-.3-1.2-.5-.4-.2-.6-.6-.8-.9-.2-.4-.3-.8-.3-1.3 0-.5.1-1 .3-1.4.2-.4.5-.8.9-1.1.2-.2.5-.4.8-.5l.7-.7c-.3-.1-.5-.3-.7-.5-.2-.2-.3-.4-.4-.7-.1-.3-.1-.6-.1-.9 0-.5.2-1 .5-1.3z" fill="#FFFFFF" />
      <path d="M16.5 8.4c-.3-.2-.6-.2-1-.2-.4 0-.7.1-1 .2-.3.2-.5.4-.7.7-.2.3-.3.7-.3 1.1 0 .4.1.8.3 1.1.2.3.4.5.7.7.3.2.6.2 1 .2.4 0 .7-.1 1-.2.3-.2.5-.4.7-.7.2-.3.3-.7.3-1.1 0-.4-.1-.8-.3-1.1-.2-.3-.4-.5-.7-.7z" fill="#FFFFFF" />
    </svg>
  ),
  bigcommerce: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.5 2.5h-13L2 6v15.5h13L22 12V6l-3.5-3.5z" fill="#121118" />
      <path d="M18.5 2.5h-13L2 6h13l3.5-3.5z" fill="#2A2A35" />
      <path d="M22 6h-7v6h7V6z" fill="#44454F" />
      <path d="M15 12l-5.5 5.5L7 15l3-3H7l-3 3 6.5 6.5L17 18l5-5h-4l-4 4-2-2 4-3h-1z" fill="#FFFFFF" />
    </svg>
  ),
  stripe: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#635BFF" />
      <path d="M11.6 9.2c0-.5.4-.7 1-.7.9 0 2 .3 3 .8V6.4c-1-.4-2.1-.6-3-.6-2.4 0-4 1.3-4 3.4 0 3.3 4.6 2.8 4.6 4.2 0 .6-.5.8-1.2.8-1 0-2.3-.4-3.3-1v3c1.1.5 2.2.7 3.3.7 2.5 0 4.2-1.2 4.2-3.4 0-3.6-4.6-3-4.6-4.3z" fill="#FFFFFF" />
    </svg>
  ),
  erp: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#00C6FF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <line x1="10" y1="6.5" x2="14" y2="6.5" />
      <line x1="10" y1="17.5" x2="14" y2="17.5" />
      <line x1="6.5" y1="10" x2="6.5" y2="14" />
      <line x1="17.5" y1="10" x2="17.5" y2="14" />
    </svg>
  ),
  etc: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="12" r="1.8" fill="#00C6FF" />
      <circle cx="12" cy="12" r="1.8" fill="#00C6FF" />
      <circle cx="19" cy="12" r="1.8" fill="#00C6FF" />
    </svg>
  ),
  others: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#00C6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="1.5" fill="#00C6FF" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="#00C6FF" stroke="none" />
      <circle cx="19" cy="12" r="1.5" fill="#00C6FF" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.69a8.16 8.16 0 004.77 1.52V6.76a4.85 4.85 0 01-1.84-.07z" fill="#000000" />
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.69a8.16 8.16 0 004.77 1.52V6.76a4.85 4.85 0 01-1.84-.07z" fill="#25F4EE" opacity="0.6" transform="translate(-1,0)" />
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.69a8.16 8.16 0 004.77 1.52V6.76a4.85 4.85 0 01-1.84-.07z" fill="#FE2C55" opacity="0.6" transform="translate(1,0)" />
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.69a8.16 8.16 0 004.77 1.52V6.76a4.85 4.85 0 01-1.84-.07z" fill="#000000" />
    </svg>
  ),
  'machine-learning': (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#00C6FF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" fill="rgba(0,198,255,0.15)" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <line x1="6.5" y1="6.5" x2="10" y2="10" />
      <line x1="17.5" y1="6.5" x2="14" y2="10" />
      <line x1="6.5" y1="17.5" x2="10" y2="14" />
      <line x1="17.5" y1="17.5" x2="14" y2="14" />
    </svg>
  ),
  'data-engineering': (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#00C6FF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="2.5" fill="rgba(0,198,255,0.12)" />
      <path d="M4 5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
      <path d="M4 11v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
      <circle cx="12" cy="5" r="1" fill="#00C6FF" stroke="none" />
    </svg>
  ),
  'data-automation': (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#00C6FF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 11-3-6.7" />
      <polyline points="21 4 21 10 15 10" />
      <circle cx="12" cy="12" r="2" fill="rgba(0,198,255,0.2)" />
    </svg>
  ),
  qlik: (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#009848" />
      <path d="M8 8v8M8 8h4a2.5 2.5 0 010 5H8M14 13l3 3M16 8l1.5 1.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="17" cy="16.5" r="1.2" fill="#FFFFFF" />
    </svg>
  ),
};

const TECH_STACK = [
  {
    category: 'Programming & Analytics',
    icon: Code2,
    description: 'The languages used to process millions of rows and run statistical models.',
    items: [
      { logo: 'python', name: 'Python', desc: '' },
      { logo: 'sql', name: 'SQL', desc: '' },
      { logo: 'stats', name: 'Statistical Modeling', desc: '' },
      { logo: 'machine-learning', name: 'Machine Learning', desc: '' },
      { logo: 'data-engineering', name: 'Data Engineering', desc: '' },
      { logo: 'data-automation', name: 'Data Automation', desc: '' },
    ],
  },
  {
    category: 'Cloud & Data Warehousing',
    icon: Cloud,
    description: 'The backend infrastructure where your unified source of truth lives.',
    items: [
      { logo: 'gcp', name: 'Google Cloud Platform (GCP)', desc: '' },
      { logo: 'bigquery', name: 'BigQuery', desc: '' },
      { logo: 'postgres', name: 'PostgreSQL', desc: '' },
      { logo: 'aws', name: 'AWS', desc: '' },
      { logo: 'azure', name: 'Azure', desc: '' },
      { logo: 'snowflake', name: 'Snowflake', desc: '' },
    ],
  },
  {
    category: 'Visualization & BI',
    icon: LineChart,
    description: 'Where the complex math becomes a simple, actionable dashboard for you.',
    items: [
      { logo: 'looker', name: 'Looker Studio', desc: '' },
      { logo: 'powerbi', name: 'Power BI', desc: '' },
      { logo: 'excel', name: 'Excel', desc: '' },
      { logo: 'tableau', name: 'Tableau', desc: '' },
      { logo: 'qlik', name: 'Qlik Sense', desc: '' },
      { logo: 'others', name: 'Others', desc: '' },
    ],
  },
  {
    category: 'Platform Integrations',
    icon: Plug,
    description: 'The APIs we connect so your data actually talks to each other.',
    items: [
      { logo: 'shopify', name: 'Shopify', desc: 'Orders, Customers, Products' },
      { logo: 'ga4', name: 'GA4', desc: 'Funnel, Sessions, Conversions' },
      { logo: 'meta-google', name: 'Meta Ads & Google Ads', desc: 'True ROAS, Spend, CAC' },
      { logo: 'tiktok', name: 'TikTok Ads', desc: '' },
      { logo: 'klaviyo', name: 'Klaviyo', desc: 'Email performance, Segmentation, Churn triggers' },
      { logo: 'woocommerce', name: 'WooCommerce', desc: '' },
      { logo: 'bigcommerce', name: 'BigCommerce', desc: '' },
      { logo: 'stripe', name: 'Stripe / Payment Platforms', desc: '' },
      { logo: 'erp', name: 'ERP / CRM Systems', desc: '' },
      { logo: 'etc', name: 'Etc.', desc: '' },
    ],
  },
];

/* ──────────────────────────────────────────
   UTILITY COMPONENTS
   ────────────────────────────────────────── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    // also observe any reveal descendants inside (premium + classic)
    const inner = el.querySelectorAll('.reveal, .reveal-stagger, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .count-up');
    inner.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);
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
        setCount(eased * target);
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

  // Format: integers use toLocaleString, decimals keep up to 2 decimals (strip trailing zeros)
  const display = Number.isInteger(target)
    ? Math.floor(count).toLocaleString()
    : parseFloat(count.toFixed(2)).toString();
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* Renders the "Best For" text with a styled "rev" shortform tag
   inserted right after the revenue figure (the "/mo" part). */
function BestForText({ text }: { text: string }) {
  const idx = text.indexOf('/mo');
  if (idx === -1) return <>{text}</>;
  const before = text.slice(0, idx + 3);
  const after = text.slice(idx + 3).trimStart();
  return (
    <>
      {before} <span className="rev-tag">rev</span> {after}
    </>
  );
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
            <Image src={`${basePath}/images/logo.png`} alt="Logo" width={44} height={44} className="rounded-lg transition-transform duration-300 group-hover:scale-105 img-premium" />
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-white leading-tight">Mozahidul Islam</div>
              <div className="text-[11px] text-[#8899AA] leading-tight">E-Commerce Growth Analyst</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap ${
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
        <span className="section-label max-w-[620px] mx-auto block mb-10 leading-relaxed hero-sub-headline">
          I find exactly where your money is leaking across your products, your ads, and your customers and show you how to stop it. No confusing reports. No generic advice. Just a clear picture of what is hurting your profit and a specific plan to fix it.
        </span>

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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {TRUST_STATS.map((stat, i) => (
            <div key={i} className={`hero-stat-card glass rounded-xl p-4 text-center transition-all duration-300 hover:border-[rgba(0,198,255,0.3)] hover:shadow-[0_0_20px_rgba(0,198,255,0.1)]`} style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
              {stat.isRating ? (
                <>
                  <div className="hero-rating-stars text-xl sm:text-2xl leading-none" title="4.9 out of 5 stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="hero-star" style={{ animationDelay: `${0.8 + s * 0.15}s` }}><Star size={20} className="inline-block" fill="currentColor" /></span>
                    ))}
                  </div>
                  <div className="font-bold text-white text-sm mt-1.5">
                    <Counter target={stat.target || 0} prefix={stat.prefix || ''} suffix={stat.suffix || '/5'} />
                  </div>
                  {stat.ratingLabel && <div className="text-[#8899AA] text-xs mt-0.5 uppercase">{stat.ratingLabel}</div>}
                </>
              ) : stat.isPrivacy ? (
                <>
                  <div className="gradient-text text-xl sm:text-2xl font-bold leading-tight">
                    <Counter target={stat.target || 0} prefix={stat.prefix || ''} suffix={stat.suffix || '%'} />
                  </div>
                  <div className="text-[#8899AA] text-xs mt-1 uppercase">{stat.label}</div>
                </>
              ) : stat.isDeadline ? (
                <>
                  <div className="gradient-text text-xl sm:text-2xl font-bold leading-tight uppercase">On time</div>
                  <div className="text-[#8899AA] text-xs mt-1 uppercase">{stat.label}</div>
                </>
              ) : (
                <>
                  <div className="gradient-text text-xl sm:text-2xl font-bold">
                    <Counter target={stat.target || 0} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
                  </div>
                  <div className="text-[#8899AA] text-xs mt-1 uppercase">{stat.label}</div>
                </>
              )}
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

/* ── PAGE 2: WHY DATA (building pictures background + premium content) ── */
function WhyDataSection() {
  const sectionRef = useScrollReveal();
  const points = [
    { icon: TrendingUp, title: 'Stop Guessing', text: 'Your gut feeling is costing you money. Data shows exactly what works.' },
    { icon: Target, title: 'Find Hidden Profit', text: 'Revenue is visible. Profit leaks are not. Data reveals where money disappears.' },
    { icon: Shield, title: 'Risk-Free Decisions', text: 'Every move backed by numbers. No more hoping. Just knowing.' },
    { icon: Zap, title: 'Act Faster', text: 'Spot problems in days, not quarters. Fix them before they drain your margins.' },
  ];
  return (
    <section className="why-data-section" ref={sectionRef}>
      {/* Cycling background slideshow — premium corporate building images crossfade */}
      <div className="qp-bg-slideshow" aria-hidden="true">
        <div className="qp-bg-slide qp-bg-slide-1" />
        <div className="qp-bg-slide qp-bg-slide-2" />
        <div className="qp-bg-slide qp-bg-slide-4" />
        <div className="qp-bg-slide qp-bg-slide-5" />
        <div className="qp-bg-slide qp-bg-slide-6" />
      </div>
      <div className="why-data-overlay" aria-hidden="true" />

      <div className="reveal why-data-container">
        {/* LEFT: Why Data content */}
        <div className="why-data-left">
          <span className="section-label reveal-up">Why Data</span>
          <h2 className="why-data-headline reveal-up" style={{ transitionDelay: '0.15s' }}>
            Data Doesn&apos;t Lie.<br />Gut Feelings Do.
          </h2>
          <p className="why-data-sub reveal-up" style={{ transitionDelay: '0.3s' }}>
            Every store has hidden profit. Most founders never find it, because they&apos;re looking at the wrong numbers.
          </p>

          <div className="why-data-points reveal-stagger">
            {points.map((p, i) => (
              <div key={i} className="why-data-point">
                <div className="why-data-point-icon" aria-hidden="true">
                  <p.icon size={16} />
                </div>
                <div className="why-data-point-text">
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#quick-proof" className="why-data-cta reveal-up" style={{ transitionDelay: '0.5s' }}>
            See The Proof <ArrowRight size={15} />
          </a>
        </div>

        {/* RIGHT: floating stat card */}
        <div className="why-data-right reveal-up" style={{ transitionDelay: '0.4s' }}>
          <div className="why-data-stat-card">
            <div className="why-data-stat-glow" aria-hidden="true" />
            <span className="why-data-stat-label">Average Result</span>
            <span className="why-data-stat-value">+127%</span>
            <span className="why-data-stat-desc">Revenue Growth</span>
            <div className="why-data-stat-divider" aria-hidden="true" />
            <div className="why-data-stat-mini">
              <div>
                <span className="mini-v">5+</span>
                <span className="mini-l">Proved Cases</span>
              </div>
              <div>
                <span className="mini-v">100+</span>
                <span className="mini-l">Projects Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── QUICK PROOF SECTION — Compact premium redesign ── */
function QuickProofSection() {
  const sectionRef = useScrollReveal();
  return (
    <section id="quick-proof" className="qp3-section" ref={sectionRef}>
      {/* Ambient background */}
      <div className="qp3-bg-glow qp3-bg-glow-1" aria-hidden="true" />
      <div className="qp3-bg-glow qp3-bg-glow-2" aria-hidden="true" />

      <div className="qp3-inner reveal">
        {/* ── HEADER ── */}
        <div className="qp3-header">
          <span className="qp3-eyebrow reveal-up">Quick Proof</span>
          <h2 className="qp3-title qp3-title-single reveal-up" style={{ transitionDelay: '0.15s' }}>
            The Money Was Always There. Nobody Was Looking.
          </h2>
        </div>

        {/* ── CASE CARDS (3-column grid, compact) ── */}
        <div className="qp3-grid reveal-stagger">
          {QUICK_PROOF_CARDS.map((card, i) => (
            <article
              key={i}
              className={`qp3-card qp3-card-${i + 1} reveal-up`}
              style={{ transitionDelay: `${0.3 + i * 0.12}s` }}
            >
              {/* Top accent bar */}
              <div className="qp3-accent" aria-hidden="true" />

              {/* Header: store + niche */}
              <div className="qp3-card-head">
                <h3 className="qp3-store">{card.store}</h3>
                <span className="qp3-niche">{card.niche}</span>
              </div>

              {/* Result */}
              <div className="qp3-result">
                <span className="qp3-result-label">The Result</span>
                <p className="qp3-result-text">{card.result}</p>
              </div>

              {/* Stats: 2x2 grid */}
              <div className="qp3-stats">
                <div className="qp3-stat">
                  <span className="qp3-stat-v">{card.investment}</span>
                  <span className="qp3-stat-l">Investment</span>
                </div>
                <div className="qp3-stat">
                  <span className="qp3-stat-v">{card.timeline}</span>
                  <span className="qp3-stat-l">Timeline</span>
                </div>
                <div className="qp3-stat qp3-stat-hl">
                  <span className="qp3-stat-v">{card.profitAdded}</span>
                  <span className="qp3-stat-l">Profit Added</span>
                </div>
                <div className="qp3-stat qp3-stat-roi">
                  <span className="qp3-stat-v">{card.roi}</span>
                  <span className="qp3-stat-l">ROI</span>
                </div>
              </div>

              {/* Quote */}
              <div className="qp3-quote">
                <p className="qp3-quote-text">{card.quote.replace(/"/g, '')}</p>
                <span className="qp3-quote-author">— {card.author}</span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA button */}
        <div className="qp3-cta-wrap reveal-up" style={{ transitionDelay: '0.8s' }}>
          <a href="#case-studies" className="qp3-cta">
            See The Full Case Studies <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT SECTION — Premium light editorial redesign ── */
function AboutSection() {
  const sectionRef = useScrollReveal();
  const achievements = [
    { value: 2.75, prefix: '', suffix: 'M+', label: 'Data Events Processed' },
    { value: 3, prefix: '', suffix: '', label: 'Years Experienced' },
    { value: 100, prefix: '', suffix: '+', label: 'Projects Delivered' },
    { value: 6, prefix: '', suffix: '+', label: 'Industries Served' },
  ];
  return (
    <section id="about" className="about2-section" ref={sectionRef}>
      <div className="about2-inner reveal">
        {/* ── TOP ROW: two-column layout ── */}
        <div className="about2-grid">
          {/* LEFT — Content */}
          <div className="about2-left">
            {/* Eyebrow + name + role */}
            <div className="about2-identity reveal-up">
              <span className="about2-eyebrow">About</span>
              <h2 className="about2-name">Mozahidul Islam</h2>
              <p className="about2-role">E-Commerce Growth Analyst</p>
            </div>

            {/* Hero stats */}
            <div className="about2-hero-stats reveal-up" style={{ transitionDelay: '0.1s' }}>
              <div className="about2-hero-stat">
                <span className="about2-hero-stat-v">CEO</span>
                <span className="about2-hero-stat-l">MOZ INTELLIGENCE</span>
              </div>
              <div className="about2-hero-divider" aria-hidden="true" />
              <div className="about2-hero-stat">
                <span className="about2-hero-stat-v">3 Years</span>
                <span className="about2-hero-stat-l">Experience</span>
              </div>
              <div className="about2-hero-divider" aria-hidden="true" />
              <div className="about2-hero-stat about2-hero-stat-available">
                <span className="about2-available-dot" aria-hidden="true" />
                <span className="about2-hero-stat-l">Available For Projects</span>
              </div>
            </div>

            {/* Heading */}
            <div className="about2-heading reveal-up" style={{ transitionDelay: '0.2s' }}>
              <p className="about2-heading-label">The Analyst Behind the Data</p>
              <h3 className="about2-headline">
                I Don&apos;t Just Build Dashboards.
                <br />
                <span className="about2-headline-accent">I Build the Engine That Powers Them.</span>
              </h3>
            </div>

            {/* Introduction */}
            <div className="about2-intro reveal-up" style={{ transitionDelay: '0.3s' }}>
              <p>
                Hi, I&apos;m <strong>Mozahidul Islam</strong>, E-Commerce Growth Analyst.
              </p>
              <p>
                For 3 years, I worked behind the scenes at a Bangladesh-based agency, leading the data strategy and analysis for e-commerce clients. The kind of deep-dive work you&apos;ll see in the case studies on this site.
              </p>
              <p>
                In 2026, I decided it was time to do this on my own. Not because the work changed, it&apos;s the same rigor, the same process, but because I wanted to work directly with founders, build real relationships, and skip the layers in between.
              </p>
              <p>
                This site is the start of that next chapter.
              </p>
            </div>

            {/* What I Do */}
            <div className="about2-whatido reveal-up" style={{ transitionDelay: '0.4s' }}>
              <div className="about2-whatido-label">
                <span className="about2-whatido-line" aria-hidden="true" />
                What I Do
              </div>
              <p className="about2-whatido-text">
                I connect the data founders already have, <strong>Shopify, GA4, Meta Ads, Klaviyo</strong>, into one reliable source of truth, then turn it into decisions you can actually act on.
              </p>
              <p className="about2-whatido-text">
                Not vanity metrics. Not a dashboard you check once and forget. Just a clear answer to the question every founder eventually asks: <strong>where is the money actually going?</strong>
              </p>
            </div>

            {/* Achievement cards */}
            <div className="about2-achievements reveal-up" style={{ transitionDelay: '0.5s' }}>
              {achievements.map((stat, i) => (
                <div key={i} className="about2-achievement">
                  <span className="about2-achievement-v">
                    <Counter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </span>
                  <span className="about2-achievement-l">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Photo + floating stat cards + personal info + CTA */}
          <div className="about2-right reveal-up" style={{ transitionDelay: '0.3s' }}>
            <div className="about2-photo-wrap">
              <div className="about2-photo-frame">
                <Image
                  src={`${basePath}/images/photo1.png`}
                  alt="Mozahidul Islam — E-Commerce Growth Analyst"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating stat card 1 — Revenue */}
              <div className="about2-float-card about2-float-card-1">
                <span className="about2-float-v">CEO</span>
                <span className="about2-float-l">MOZ INTELLIGENCE</span>
              </div>
              {/* Floating stat card 2 — Experience */}
              <div className="about2-float-card about2-float-card-2">
                <span className="about2-float-v">3 Years</span>
                <span className="about2-float-l">Experience</span>
              </div>
            </div>

            {/* Personal info — moved below profile picture */}
            <div className="about2-info reveal-up" style={{ transitionDelay: '0.6s', marginTop: '32px' }}>
              <div className="about2-info-item">
                <span className="about2-info-label">Education</span>
                <span className="about2-info-value">University of Rajshahi</span>
              </div>
              <div className="about2-info-item">
                <span className="about2-info-label">Languages</span>
                <span className="about2-info-value">English • Bengali • Hindi • Urdu</span>
              </div>
              <div className="about2-info-item">
                <span className="about2-info-label">Location</span>
                <span className="about2-info-value">Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* CTA buttons — moved below personal info */}
            <div className="about2-cta reveal-up" style={{ transitionDelay: '0.7s', marginTop: '20px' }}>
              <a href={`${basePath}/pdfs/resume.pdf`} download="Mozahidul_Islam_Resume.pdf" className="about2-btn about2-btn-primary">
                <Download size={16} /> Download CV
              </a>
              <a href="#case-studies" className="about2-btn about2-btn-secondary">
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
  const principles = [
    {
      num: '01',
      icon: FileText,
      title: 'I speak business, not jargon.',
      text: 'Every report is written so that a business owner, not a data scientist, can read it, understand it, and act on it immediately. If you need a glossary to read my work, I have failed.',
      keyword: 'Clarity',
    },
    {
      num: '02',
      icon: Target,
      title: 'I deliver decisions, not data dumps.',
      text: 'You will never receive a spreadsheet full of numbers with no context. Every single finding comes with a specific, prioritized recommendation and a clear reason why it matters to your bottom line.',
      keyword: 'Decisions',
    },
    {
      num: '03',
      icon: Lightbulb,
      title: 'I focus on your actual problem.',
      text: 'Every engagement is designed around the specific challenge your business is facing right now, not a generic template copy-pasted from the last client. Your data is unique. Your analysis should be too.',
      keyword: 'Relevance',
    },
    {
      num: '04',
      icon: Rocket,
      title: 'I build for action, not admiration.',
      text: 'Dashboards and reports that sit unopened are worthless. Everything I build is designed to be used, by you and your team, every day, to make faster and better decisions with complete confidence.',
      keyword: 'Action',
    },
  ];
  return (
    <section id="why-me" className="whyme-section" ref={sectionRef}>
      {/* Ambient background layers */}
      <div className="whyme-bg-grid" aria-hidden="true" />
      <div className="whyme-bg-glow whyme-bg-glow-1" aria-hidden="true" />
      <div className="whyme-bg-glow whyme-bg-glow-2" aria-hidden="true" />

      <div className="whyme-inner reveal">
        {/* ── HEADER ── */}
        <div className="whyme-header whyme-header-centered">
          <div className="whyme-header-left whyme-header-left-centered">
            <span className="whyme-eyebrow reveal-up">
              <span className="whyme-eyebrow-dot" aria-hidden="true" />
              Why Me
            </span>
            <h2 className="whyme-title whyme-title-single whyme-title-gradient reveal-up text-center" style={{ transitionDelay: '0.15s' }}>
              The 4 Principles That Shape Every Engagement
            </h2>
          </div>
        </div>

        {/* ── PRINCIPLES LIST ── */}
        <div className="whyme-principles">
          {principles.map((p, i) => (
            <article
              key={p.num}
              className={`whyme-principle whyme-p-${i + 1} reveal-up`}
              style={{ transitionDelay: `${0.4 + i * 0.12}s` }}
            >
              {/* Card body */}
              <div className="whyme-card">
                <div className="whyme-card-glow" aria-hidden="true" />
                <div className="whyme-card-top">
                  <div className="whyme-icon-wrap" aria-hidden="true">
                    <p.icon size={20} strokeWidth={2} />
                  </div>
                  <span className="whyme-keyword">{p.keyword}</span>
                </div>
                <h3 className="whyme-card-title">{p.title}</h3>
                <p className="whyme-card-text">{p.text}</p>
                <div className="whyme-card-arrow" aria-hidden="true">
                  <ArrowRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── FOUNDER TESTIMONIAL (moved from Why Work With Me) ── */}
        <div className="whyme-testimonial reveal-up" style={{ transitionDelay: '0.9s' }}>
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

        {/* ── CTA ── */}
        <div className="whyme-cta reveal-up text-center" style={{ transitionDelay: '1.05s' }}>
          <a
            href="#contact"
            className="btn-press inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-base font-semibold text-[#020408] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,198,255,0.4)]"
            style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 0 20px rgba(0,198,255,0.3)' }}
          >
            <Calendar size={18} />
            Lets Find Revenue You Already Have
          </a>
        </div>
      </div>
    </section>
  );
}

function WhyWorkWithMeSection() {
  const sectionRef = useScrollReveal();
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-[rgba(2,4,8,0.92)]" />

      <div className="reveal relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label reveal-up">The Unfair Advantage</span>
          <h2 className="section-headline text-[clamp(20px,3vw,34px)] font-extrabold text-white mt-3 mb-2 uppercase tracking-tight whitespace-nowrap reveal-up" style={{ transitionDelay: '0.2s' }}>
            Don&apos;t Hire an Agency. <span className="gradient-text">Hire a Profit Detective.</span>
          </h2>
        </div>

        {/* 4 Reasons */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {WHY_ME_REASONS.map((reason) => (
            <div
              key={reason.num}
              className={`agency-reason-card agency-card-${reason.num}`}
            >
              <div className="flex items-start gap-4 relative z-10">
                <div className="reason-number shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold">
                  <span className="text-white">{reason.num}</span>
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

/* ──────────────────────────────────────────
   WHY WE'RE DIFFERENT — Light-theme standalone section
   (Converted from owner-supplied standalone HTML.)
   ────────────────────────────────────────── */

type WwdStatus = 'none' | 'limited' | 'basic' | 'avail' | 'adv' | 'premium';
interface WwdCap { s: WwdStatus; t: string }
interface WwdItem { name: string; icon: string; a: WwdCap; b: WwdCap; c: WwdCap }
interface WwdGroup { cat: string; items: WwdItem[] }

const WWD_CAPABILITIES: WwdGroup[] = [
  { cat: 'Business Intelligence', items: [
    { name: 'KPI & Custom Dashboards', icon: 'gauge', a: { s: 'limited', t: 'Limited (Live View + Overview)' }, b: { s: 'avail', t: 'Available (Limited Depth)' }, c: { s: 'premium', t: 'Custom KPI Dashboards & Executive Views' } },
    { name: 'Sales & Revenue Analysis', icon: 'chart', a: { s: 'basic', t: 'Basic' }, b: { s: 'adv', t: 'Advanced' }, c: { s: 'premium', t: 'Deep Business & Profitability Analysis' } },
    { name: 'Conversion Funnel Analysis', icon: 'funnel', a: { s: 'basic', t: 'Basic' }, b: { s: 'avail', t: 'Available (Limited Depth)' }, c: { s: 'premium', t: 'Root-Cause Analysis & Drop-off Fixes' } },
    { name: 'Customer Segmentation', icon: 'segments', a: { s: 'basic', t: 'Basic (Native RFM Scoring)' }, b: { s: 'avail', t: 'Available (Limited Depth)' }, c: { s: 'premium', t: 'Full RFM + Advanced Business Strategy' } },
    { name: 'Customer Cohort Analysis', icon: 'cohort', a: { s: 'limited', t: 'Limited' }, b: { s: 'avail', t: 'Available (Limited Depth)' }, c: { s: 'premium', t: 'Multi-Dimensional Cohort & LTV Analysis' } },
    { name: 'Customer Lifetime Value (LTV)', icon: 'ltv', a: { s: 'limited', t: 'Limited' }, b: { s: 'avail', t: 'Available (Limited Depth)' }, c: { s: 'premium', t: 'Granular Cohort & Channel-Level LTV' } },
    { name: 'Churn Risk Identification', icon: 'churn', a: { s: 'none', t: 'Not Available' }, b: { s: 'limited', t: 'Some Apps' }, c: { s: 'premium', t: 'Predictive AI Churn Risk Analysis' } },
    { name: 'Product Performance Analysis', icon: 'trend', a: { s: 'basic', t: 'Basic' }, b: { s: 'avail', t: 'Available (Limited Depth)' }, c: { s: 'premium', t: 'Growth & Inventory Opportunity Analysis' } },
    { name: 'Product Profitability Analysis', icon: 'coins', a: { s: 'limited', t: 'Limited (Gross Profit Only)' }, b: { s: 'limited', t: 'Some Apps' }, c: { s: 'premium', t: 'True Product-Level Net Profitability' } },
    { name: 'True Net Profit (After Ads/Fees)', icon: 'netprofit', a: { s: 'none', t: 'Not Available' }, b: { s: 'limited', t: 'Some Apps' }, c: { s: 'premium', t: 'Real-Time True Profitability Analysis' } },
    { name: 'Marketing Performance Analysis', icon: 'megaphone', a: { s: 'basic', t: 'Basic' }, b: { s: 'avail', t: 'Available (Limited Depth)' }, c: { s: 'premium', t: 'Cross-Channel ROI & Strategy Recommendations' } },
    { name: 'Cross-Sell & Upsell Analysis', icon: 'crosssell', a: { s: 'limited', t: 'Limited (Product & Order Data)' }, b: { s: 'avail', t: 'Available (Limited Depth)' }, c: { s: 'premium', t: 'Big Opportunity Identification & Strategy' } },
    { name: 'Operations Efficiency Analysis', icon: 'gear', a: { s: 'none', t: 'Not Available' }, b: { s: 'limited', t: 'Specialized Tools Only' }, c: { s: 'premium', t: 'Operational Efficiency & Cost Optimization' } },
    { name: 'Custom Business Analysis', icon: 'puzzle', a: { s: 'none', t: 'Not Available' }, b: { s: 'limited', t: 'Limited' }, c: { s: 'premium', t: 'Bespoke Analysis for Your Business Questions' } },
    { name: 'Custom KPI Framework', icon: 'sliders', a: { s: 'basic', t: 'Basic' }, b: { s: 'avail', t: 'Available (Limited Depth)' }, c: { s: 'premium', t: 'Business-Specific KPI Ecosystem' } },
    { name: 'Multi-Store Analytics', icon: 'layers', a: { s: 'limited', t: 'Limited (Plan Dependent)' }, b: { s: 'avail', t: 'Available (Limited Depth)' }, c: { s: 'premium', t: 'Unified Multi-Store Global Analysis' } },
    { name: 'Cross-Platform Business Analysis', icon: 'network', a: { s: 'none', t: 'Not Available' }, b: { s: 'limited', t: 'Requires Multiple Apps' }, c: { s: 'premium', t: 'Unified Cross-Platform Business Intelligence' } },
  ]},
  { cat: 'Data Infrastructure', items: [
    { name: 'Cloud Data Infrastructure', icon: 'cloud', a: { s: 'none', t: 'Not Available' }, b: { s: 'limited', t: 'Separate Platform Required' }, c: { s: 'premium', t: 'Enterprise-Grade Infrastructure Included' } },
    { name: 'Data Pipeline Engineering', icon: 'pipeline', a: { s: 'none', t: 'Not Available' }, b: { s: 'limited', t: 'Separate Platform Required' }, c: { s: 'premium', t: 'Fully Managed & Automated Data Pipelines' } },
    { name: 'Multi-Platform Data Integration', icon: 'integrate', a: { s: 'none', t: 'Not Available' }, b: { s: 'limited', t: 'Separate Platform Required' }, c: { s: 'premium', t: 'Seamless Ads, ERP, & CRM Integration' } },
    { name: 'Data Cleaning & Standardization', icon: 'sparkle', a: { s: 'none', t: 'Not Available' }, b: { s: 'limited', t: 'Varies' }, c: { s: 'premium', t: 'Continuous Data Auditing & Cleaning' } },
    { name: 'Automated Data Refresh', icon: 'refresh', a: { s: 'limited', t: 'Platform Dependent' }, b: { s: 'avail', t: 'Available (Limited Depth)' }, c: { s: 'premium', t: 'Real-Time Automated Data Refresh' } },
  ]},
  { cat: 'Strategic Advisory', items: [
    { name: 'Strategic Recommendations', icon: 'compass', a: { s: 'basic', t: 'Basic (Platform Insights)' }, b: { s: 'limited', t: 'Limited' }, c: { s: 'premium', t: 'Strategic Advisory & Actionable Roadmaps' } },
  ]},
  { cat: 'Implementation', items: [
    { name: 'Implementation Support', icon: 'hand', a: { s: 'none', t: 'Not Available' }, b: { s: 'limited', t: 'Usually Separate' }, c: { s: 'premium', t: 'Full Done-for-You Implementation' } },
  ]},
];

const WWD_COLOR_MAP: Record<string, string> = {
  'KPI & Custom Dashboards': '#2563EB',
  'Sales & Revenue Analysis': '#059669',
  'Conversion Funnel Analysis': '#4F46E5',
  'Customer Segmentation': '#7C3AED',
  'Customer Cohort Analysis': '#7C3AED',
  'Customer Lifetime Value (LTV)': '#10B981',
  'Churn Risk Identification': '#DC2626',
  'Product Performance Analysis': '#059669',
  'Product Profitability Analysis': '#10B981',
  'True Net Profit (After Ads/Fees)': '#10B981',
  'Marketing Performance Analysis': '#EA580C',
  'Cross-Sell & Upsell Analysis': '#059669',
  'Operations Efficiency Analysis': '#0D9488',
  'Custom Business Analysis': '#0891B2',
  'Custom KPI Framework': '#4F46E5',
  'Multi-Store Analytics': '#2563EB',
  'Cross-Platform Business Analysis': '#0891B2',
  'Cloud Data Infrastructure': '#0891B2',
  'Data Pipeline Engineering': '#0D9488',
  'Multi-Platform Data Integration': '#0D9488',
  'Data Cleaning & Standardization': '#0D9488',
  'Automated Data Refresh': '#0D9488',
  'Strategic Recommendations': '#B8860B',
  'Implementation Support': '#B8860B',
};

const WWD_AUTO_ITEMS = [
  'Data Pipeline Engineering',
  'Automated Data Refresh',
  'Multi-Platform Data Integration',
  'Data Cleaning & Standardization',
  'Operations Efficiency Analysis',
];

const WWD_ICONS: Record<string, React.ReactNode> = {
  gauge: <><circle cx="12" cy="12" r="9"/><path d="M12 12l4-3"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></>,
  chart: <><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/></>,
  funnel: <path d="M3 4h18l-7 8v6l-4 2v-8z"/>,
  segments: <><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/></>,
  cohort: <><circle cx="6" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="6" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="6" cy="18" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none"/><circle cx="18" cy="18" r="1.5" fill="currentColor" stroke="none"/></>,
  ltv: <><path d="M6 12a4 4 0 014-4"/><path d="M18 12a4 4 0 01-4 4"/><path d="M8 8l-2 2 2 2M16 16l2-2-2-2"/></>,
  churn: <><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></>,
  trend: <><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></>,
  coins: <><circle cx="8" cy="8" r="5"/><circle cx="16" cy="16" r="5"/></>,
  netprofit: <><circle cx="12" cy="12" r="9"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5 1-2.5 2s1 1.5 2.5 2 2.5 1 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5"/><path d="M12 6v2M12 16v2"/></>,
  megaphone: <><path d="M3 11l14-7v16L3 13v-2z"/><path d="M3 11H2v2h1M19 9v6"/></>,
  crosssell: <><path d="M9 3H5a2 2 0 00-2 2v4M15 3h4a2 2 0 012 2v4M9 21H5a2 2 0 01-2-2v-4M15 21h4a2 2 0 002-2v-4"/><path d="M9 12h6M12 9v6"/></>,
  gear: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
  puzzle: <path d="M19 11h2a1 1 0 001-1V7a1 1 0 00-1-1h-3a2 2 0 01-2-2V3a2 2 0 00-4 0v1a2 2 0 01-2 2H4a1 1 0 00-1 1v3a1 1 0 001 1h1a2 2 0 010 4H4a1 1 0 00-1 1v3a1 1 0 001 1h3a2 2 0 012 2v1a2 2 0 004 0v-1a2 2 0 012-2h3a1 1 0 001-1v-3a1 1 0 00-1-1h-1a2 2 0 010-4z"/>,
  sliders: <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>,
  layers: <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></>,
  network: <><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4M12 11l-5 6M12 11l5 6"/></>,
  cloud: <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>,
  pipeline: <path d="M3 12h4l3 7 4-14 3 7h4"/>,
  integrate: <><rect x="2" y="9" width="6" height="6" rx="1"/><rect x="16" y="9" width="6" height="6" rx="1"/><path d="M8 12h8"/></>,
  sparkle: <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>,
  refresh: <><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></>,
  compass: <><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></>,
  hand: <><path d="M18 11V6a2 2 0 00-2-2 2 2 0 00-2 2M14 10V4a2 2 0 00-2-2 2 2 0 00-2 2v2M10 10.5V6a2 2 0 00-2-2 2 2 0 00-2 2v8"/><path d="M18 8a2 2 0 114 0v6a8 8 0 01-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 012.83-2.82L7 15"/></>,
};

function WwdStatusSymbol(s: WwdStatus, goldVariant = false) {
  // ✕ Red    = Not Available
  // ⚠ Amber  = Limited / Partial / Warning (including "Basic" limited capabilities)
  // ✓ Blue   = Available (default)
  // ✓ Gold   = MozIntelligence column (all ✓) + Other Analytics Apps 'Advanced' only
  if (s === 'none') return { sym: '✕', cls: 'st-none' };
  if (s === 'limited' || s === 'basic') return { sym: '⚠', cls: 'st-limited' };
  // Positive states: use gold variant for MozIntelligence column or 'Advanced' in col b
  if (goldVariant) return { sym: '✓', cls: 'st-gold' };
  return { sym: '✓', cls: 'st-avail' };
}

function WwdCapIcon({ name, color }: { name: string; color: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cap-icon"
      style={{ color }}
    >
      {WWD_ICONS[name] || WWD_ICONS.gauge}
    </svg>
  );
}

function WhyWeAreDifferentSection() {
  const sectionRef = useScrollReveal();
  return (
    <section id="why-were-different" className="wwd-section" ref={sectionRef}>
      {/* Background */}
      <div className="wwd-mesh-bg" aria-hidden="true" />
      <div className="wwd-grid-overlay" aria-hidden="true" />

      {/* HERO */}
      <header className="relative flex items-center pt-16 pb-8 px-6 overflow-hidden">
        <div className="hero-orb" style={{ width: 300, height: 300, background: 'var(--wwd-gold)', top: '10%', left: '-10%' }} aria-hidden="true" />
        <div className="hero-orb" style={{ width: 250, height: 250, background: 'var(--wwd-purple)', bottom: '10%', right: '-5%', animationDelay: '-4s' }} aria-hidden="true" />

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7">
            <div className="reveal flex items-center gap-3 mb-4">
              <span className="pulse-dot inline-block w-2 h-2 rounded-full" style={{ background: 'var(--wwd-purple)', color: 'var(--wwd-purple)' }} aria-hidden="true" />
              <span className="text-xs tracking-[0.2em] uppercase font-bold flex items-center" style={{ color: 'var(--wwd-purple)' }}>
                <svg className="auto-icon-header" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                Why We&apos;re Different
              </span>
              <span className="h-px w-12" style={{ background: 'linear-gradient(90deg, var(--wwd-purple), transparent)' }} aria-hidden="true" />
            </div>

            <h1 className="reveal reveal-delay-1 wwd-font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-medium mb-4 flex flex-col gap-1">
              <span style={{ color: 'var(--wwd-indigo)' }}>MozIntelligence</span>
              <span className="italic font-normal" style={{ color: 'var(--wwd-text-primary)' }}>The Strategic Edge In</span>
              <span className="font-bold" style={{ color: 'var(--wwd-blue)' }}>E-Commerce Analytics</span>
            </h1>

            <p className="reveal reveal-delay-2 text-base leading-relaxed max-w-2xl mb-6" style={{ color: 'var(--wwd-text-secondary)' }}>
              Your existing platforms collect data, and various apps provide specialized metrics. However, MozIntelligence transcends traditional reporting by integrating <span style={{ color: 'var(--wwd-text-primary)' }} className="font-semibold">deep business analysis</span>, <span style={{ color: 'var(--wwd-text-primary)' }} className="font-semibold">robust data infrastructure</span>, and <span style={{ color: 'var(--wwd-text-primary)' }} className="font-semibold">strategic implementation support</span> into a single, unified solution.
            </p>

            <div className="reveal reveal-delay-3 grid grid-cols-3 gap-6 mt-6 max-w-xl items-end">
              <div>
                <div className="wwd-metric-num text-3xl whitespace-nowrap" style={{ color: 'var(--wwd-blue)' }}>24+</div>
                <div className="text-[10px] uppercase tracking-wider mt-1 font-bold" style={{ color: 'var(--wwd-text-muted)' }}>Capabilities</div>
              </div>
              <div>
                <div className="wwd-metric-num text-xl whitespace-nowrap" style={{ color: 'var(--wwd-teal)' }}>Multiple → 1</div>
                <div className="text-[10px] uppercase tracking-wider mt-3 font-bold" style={{ color: 'var(--wwd-text-muted)' }}>Tools Unified</div>
              </div>
              <div>
                <div className="wwd-metric-num text-3xl whitespace-nowrap" style={{ color: 'var(--wwd-purple)' }}>∞</div>
                <div className="text-[10px] uppercase tracking-wider mt-1 font-bold" style={{ color: 'var(--wwd-text-muted)' }}>Custom Analysis</div>
              </div>
            </div>
          </div>

          {/* Animated data viz */}
          <div className="lg:col-span-5 reveal reveal-delay-2 hidden lg:block">
            <div className="relative">
              <div className="wwd-glass-strong rounded-2xl p-5 float-anim">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-bold flex items-center" style={{ color: 'var(--wwd-text-muted)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }} aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                      Live Intelligence
                    </div>
                    <div className="wwd-font-display text-lg mt-1" style={{ color: 'var(--wwd-text-primary)' }}>Strategic Dashboard</div>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--wwd-red)' }} />
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--wwd-amber)' }} />
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--wwd-green)' }} />
                  </div>
                </div>

                <svg viewBox="0 0 320 300" className="w-full h-auto" role="img" aria-label="Strategic intelligence dashboard visualisation">
                  <defs>
                    <linearGradient id="wwdGoldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C89544"/><stop offset="100%" stopColor="#8A6508"/>
                    </linearGradient>
                    <linearGradient id="wwdAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#B8860B" stopOpacity="0.15"/>
                      <stop offset="100%" stopColor="#B8860B" stopOpacity="0"/>
                    </linearGradient>
                  </defs>

                  <text x="20" y="20" fontFamily="Manrope" fontSize="9" fontWeight="700" fill="#9CA3AF" letterSpacing="1">TRUE NET PROFIT</text>
                  <text x="300" y="20" textAnchor="end" fontFamily="Fraunces" fontSize="14" fontWeight="600" fill="#059669">+ 47.2%</text>

                  <g stroke="rgba(0,0,0,0.05)" strokeWidth="1" strokeDasharray="3 3">
                    <line x1="20" y1="60" x2="300" y2="60"/>
                    <line x1="20" y1="110" x2="300" y2="110"/>
                    <line x1="20" y1="160" x2="300" y2="160"/>
                  </g>

                  <path d="M 30 140 Q 80 110, 120 90 T 200 70 T 290 40 L 290 180 L 30 180 Z" fill="url(#wwdAreaGrad)" />
                  <path d="M 30 140 Q 80 110, 120 90 T 200 70 T 290 40" stroke="#B8860B" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

                  <circle r="4" fill="#B8860B">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M 30 140 Q 80 110, 120 90 T 200 70 T 290 40" />
                  </circle>

                  <circle cx="30" cy="140" r="4" fill="#FFFFFF" stroke="#B8860B" strokeWidth="2" className="node-pulse"/>
                  <circle cx="120" cy="90" r="4" fill="#FFFFFF" stroke="#B8860B" strokeWidth="2" className="node-pulse" style={{ animationDelay: '0.5s' }}/>
                  <circle cx="200" cy="70" r="4" fill="#FFFFFF" stroke="#B8860B" strokeWidth="2" className="node-pulse" style={{ animationDelay: '1s' }}/>
                  <circle cx="290" cy="40" r="5" fill="#059669" stroke="#059669" strokeWidth="2" className="node-pulse" style={{ animationDelay: '1.5s' }}/>

                  <g transform="translate(0, 230)">
                    <circle cx="50" cy="20" r="12" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2"/>
                    <text x="50" y="20" textAnchor="middle" dominantBaseline="central" fontSize="9" fill="#2563EB" fontWeight="700" fontFamily="Manrope">1</text>
                    <text x="50" y="50" textAnchor="middle" fontSize="10" fill="#4B5563" fontFamily="Manrope" fontWeight="600">Collect</text>

                    <path d="M 64 20 L 146 20" stroke="#9CA3AF" strokeWidth="1.5" fill="none" className="flow-line"/>

                    <circle cx="160" cy="20" r="14" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.5"/>
                    <text x="160" y="20" textAnchor="middle" dominantBaseline="central" fontSize="10" fill="#7C3AED" fontWeight="700" fontFamily="Manrope">2</text>
                    <text x="160" y="50" textAnchor="middle" fontSize="10" fill="#7C3AED" fontFamily="Manrope" fontWeight="700">Analyze</text>

                    <path d="M 176 20 L 256 20" stroke="#9CA3AF" strokeWidth="1.5" fill="none" className="flow-line"/>

                    <circle cx="270" cy="20" r="12" fill="#FFFFFF" stroke="#059669" strokeWidth="2"/>
                    <text x="270" y="20" textAnchor="middle" dominantBaseline="central" fontSize="9" fill="#059669" fontWeight="700" fontFamily="Manrope">3</text>
                    <text x="270" y="50" textAnchor="middle" fontSize="10" fill="#4B5563" fontFamily="Manrope" fontWeight="600">Act</text>
                  </g>
                </svg>
              </div>

              <div className="absolute -top-3 -right-3 wwd-glass rounded-xl p-2.5 float-anim" style={{ animationDelay: '-2s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'rgba(5,150,105,0.1)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" aria-hidden="true"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div className="text-[8px] uppercase tracking-wider font-bold" style={{ color: 'var(--wwd-text-muted)' }}>True Profit</div>
                    <div className="text-xs font-bold wwd-gold-text">Real-Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CAPABILITIES TABLE */}
      <section className="relative py-16 px-6 wwd-bg-section">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, var(--wwd-gold))' }} aria-hidden="true" />
              <span className="text-xs tracking-[0.2em] uppercase font-bold flex items-center" style={{ color: 'var(--wwd-gold)' }}>
                <svg className="auto-icon-header" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/></svg>
                Capability Matrix
              </span>
              <span className="h-px w-10" style={{ background: 'linear-gradient(90deg, var(--wwd-gold), transparent)' }} aria-hidden="true" />
            </div>
            <h2 className="wwd-font-display text-3xl md:text-4xl font-medium mb-2" style={{ color: 'var(--wwd-text-primary)' }}>
              A <span className="wwd-gold-text italic">Side-by-Side</span> Comparison
            </h2>
            <p className="max-w-2xl mx-auto text-sm" style={{ color: 'var(--wwd-text-secondary)' }}>
              Every capability, evaluated across three tiers — from basic built-in reporting to the unified strategic intelligence layer.
            </p>
          </div>

          <div className="reveal table-container table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '32%' }}>
                    <div className="h-full flex flex-col justify-end">
                      <div className="text-lg font-bold normal-case tracking-normal" style={{ color: 'var(--wwd-text-primary)' }}>Capability</div>
                    </div>
                  </th>
                  <th style={{ width: '22%' }}>
                    <div className="h-full flex flex-col justify-end">
                      <div className="text-lg font-bold mb-1 normal-case tracking-normal" style={{ color: 'var(--wwd-blue)' }}>Built-In Analytics</div>
                      <div className="text-[10px] flex items-center gap-1.5 font-medium uppercase tracking-wider" style={{ color: 'var(--wwd-text-muted)' }}>
                        For Example: Shopify · WooCommerce
                      </div>
                    </div>
                  </th>
                  <th style={{ width: '22%' }}>
                    <div className="h-full flex flex-col justify-end">
                      <div className="text-lg font-bold mb-1 normal-case tracking-normal" style={{ color: 'var(--wwd-amber)' }}>Other Analytics Apps</div>
                      <div className="text-[10px] flex items-center gap-1.5 font-medium uppercase tracking-wider" style={{ color: 'var(--wwd-text-muted)' }}>
                        Specialized Analytics Tools
                      </div>
                    </div>
                  </th>
                  <th className="moz-col-header" style={{ width: '24%' }}>
                    <div className="h-full flex flex-col justify-end items-start gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold normal-case tracking-normal" style={{ color: 'var(--wwd-gold)' }}>MozIntelligence</span>
                        <span className="text-xs font-medium normal-case" style={{ color: 'var(--wwd-gold-light)' }}>(✓ Advanced)</span>
                      </div>
                      <span className="premium-badge">The Strategic Choice</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {WWD_CAPABILITIES.map((group) => (
                  <React.Fragment key={group.cat}>
                    <tr className="cat-divider"><td colSpan={4}>{group.cat}</td></tr>
                    {group.items.map((item) => {
                      const a = WwdStatusSymbol(item.a.s);
                      const b = WwdStatusSymbol(item.b.s, item.b.s === 'adv');
                      const c = WwdStatusSymbol(item.c.s, true);
                      const isStrong = item.c.s === 'premium';
                      const iconColor = WWD_COLOR_MAP[item.name] || '#9CA3AF';
                      const iconBg = `${iconColor}1A`;
                      const iconBorder = `${iconColor}33`;
                      const isAuto = WWD_AUTO_ITEMS.includes(item.name);
                      const autoStyle = isAuto ? { boxShadow: `0 0 0 2px ${iconColor}33` } : undefined;
                      return (
                        <tr key={item.name}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg, border: `1px solid ${iconBorder}`, ...autoStyle }}>
                                <WwdCapIcon name={item.icon} color={iconColor} />
                              </div>
                              <span className="cap-name text-sm" style={{ color: 'var(--wwd-text-primary)' }}>{item.name}</span>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-start gap-2.5">
                              <span className={`${a.cls} text-sm mt-0.5 shrink-0`}>{a.sym}</span>
                              <span className="text-xs font-medium" style={{ color: 'var(--wwd-text-secondary)' }}>{item.a.t}</span>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-start gap-2.5">
                              <span className={`${b.cls} text-sm mt-0.5 shrink-0`}>{b.sym}</span>
                              <span className="text-xs font-medium" style={{ color: 'var(--wwd-text-secondary)' }}>{item.b.t}</span>
                            </div>
                          </td>
                          <td className="moz-col">
                            <div className="flex items-start gap-2.5">
                              <span className={`${c.cls} text-sm mt-0.5 shrink-0 font-bold`}>{c.sym}</span>
                              <span className={`text-xs ${isStrong ? 'font-semibold' : 'font-medium'}`} style={{ color: isStrong ? 'var(--wwd-text-primary)' : 'var(--wwd-text-secondary)' }}>{item.c.t}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHY MOZINTELLIGENCE */}
      <section className="relative py-16 px-6 overflow-hidden wwd-bg-white">
        <div className="hero-orb" style={{ width: 400, height: 400, background: 'var(--wwd-purple)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.05 }} aria-hidden="true" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="reveal text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, var(--wwd-purple))' }} aria-hidden="true" />
              <span className="text-xs tracking-[0.2em] uppercase font-bold flex items-center" style={{ color: 'var(--wwd-purple)' }}>
                <svg className="auto-icon-header" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
                The Strategic Answer
              </span>
              <span className="h-px w-10" style={{ background: 'linear-gradient(90deg, var(--wwd-purple), transparent)' }} aria-hidden="true" />
            </div>
            <h2 className="wwd-font-display text-3xl md:text-4xl font-medium" style={{ color: 'var(--wwd-text-primary)' }}>
              Why <span className="italic" style={{ color: 'var(--wwd-purple)' }}>MozIntelligence?</span>
            </h2>
          </div>

          <div className="reveal reveal-delay-1 wwd-glass-strong rounded-2xl p-8 relative overflow-hidden" style={{ borderTop: '4px solid var(--wwd-purple)' }}>
            <p className="wwd-font-display text-lg md:text-xl leading-relaxed font-normal" style={{ color: 'var(--wwd-text-primary)' }}>
              You don&apos;t need to replace your existing tools. Your platforms already collect the data. MozIntelligence helps you <span className="font-bold" style={{ color: 'var(--wwd-purple)' }}>connect it</span>, uncover what is actually happening, identify the <span className="font-bold" style={{ color: 'var(--wwd-purple)' }}>highest-impact opportunities</span>, and turn those findings into <span className="font-bold" style={{ color: 'var(--wwd-purple)' }}>clear, profitable business actions</span>.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t" style={{ borderColor: 'var(--wwd-border-standard)' }}>
              <div className="group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" aria-hidden="true"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="wwd-font-display text-base font-semibold mb-1" style={{ color: 'var(--wwd-text-primary)' }}>Connect</div>
                <div className="text-xs" style={{ color: 'var(--wwd-text-secondary)' }}>Unify every data source.</div>
              </div>
              <div className="group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
                </div>
                <div className="wwd-font-display text-base font-semibold mb-1" style={{ color: 'var(--wwd-text-primary)' }}>Uncover</div>
                <div className="text-xs" style={{ color: 'var(--wwd-text-secondary)' }}>Reveal what&apos;s real.</div>
              </div>
              <div className="group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="wwd-font-display text-base font-semibold mb-1" style={{ color: 'var(--wwd-text-primary)' }}>Identify</div>
                <div className="text-xs" style={{ color: 'var(--wwd-text-secondary)' }}>Find highest-impact moves.</div>
              </div>
              <div className="group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round"/><path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="wwd-font-display text-base font-semibold mb-1" style={{ color: 'var(--wwd-text-primary)' }}>Act</div>
                <div className="text-xs" style={{ color: 'var(--wwd-text-secondary)' }}>Turn insight into profit.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENCE AT A GLANCE */}
      <section className="relative py-16 px-6 wwd-bg-section">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, var(--wwd-gold))' }} aria-hidden="true" />
              <span className="text-xs tracking-[0.2em] uppercase font-bold flex items-center" style={{ color: 'var(--wwd-gold)' }}>
                <svg className="auto-icon-header" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="9.17" y1="14.83" x2="4.93" y2="19.07"/></svg>
                The Difference at a Glance
              </span>
              <span className="h-px w-10" style={{ background: 'linear-gradient(90deg, var(--wwd-gold), transparent)' }} aria-hidden="true" />
            </div>
            <h2 className="wwd-font-display text-3xl md:text-4xl font-medium mb-2" style={{ color: 'var(--wwd-text-primary)' }}>
              Three Tiers. <span className="wwd-gold-text italic">One Clear Winner.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-sm" style={{ color: 'var(--wwd-text-secondary)' }}>
              The evolution from basic reporting to specialized metrics to true strategic intelligence.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {/* Tier 1 */}
            <div className="reveal tier-card t1 wwd-glass rounded-2xl p-6 relative flex flex-col h-full">
              <div className="flex justify-between items-center mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold h-5 flex items-center" style={{ color: 'var(--wwd-text-muted)' }}>Tier 1</div>
              </div>
              <h3 className="wwd-font-display text-xl mb-1" style={{ color: 'var(--wwd-text-primary)' }}>Built-In Analytics</h3>
              <div className="wwd-font-display text-lg mb-5 italic font-medium" style={{ color: 'var(--wwd-blue)' }}>Basic Reporting</div>
              <div className="text-[10px] uppercase tracking-widest mb-2 font-bold" style={{ color: 'var(--wwd-text-muted)' }}>What it does</div>
              <div className="text-xl wwd-font-display font-normal mb-6" style={{ color: 'var(--wwd-text-secondary)' }}>Collect &amp; Report</div>
              <div className="space-y-3 pt-4 border-t mt-auto" style={{ borderColor: 'var(--wwd-border-standard)' }}>
                <div className="flex items-center gap-2 text-xs"><span className="st-basic">✓</span><span style={{ color: 'var(--wwd-text-secondary)' }}>Platform-native metrics</span></div>
                <div className="flex items-center gap-2 text-xs"><span className="st-limited">⚠</span><span style={{ color: 'var(--wwd-text-secondary)' }}>Limited live view</span></div>
                <div className="flex items-center gap-2 text-xs"><span className="st-none">✕</span><span style={{ color: 'var(--wwd-text-secondary)' }}>No strategic layer</span></div>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="reveal reveal-delay-1 tier-card t2 wwd-glass rounded-2xl p-6 relative flex flex-col h-full">
              <div className="flex justify-between items-center mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" aria-hidden="true"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold h-5 flex items-center" style={{ color: 'var(--wwd-text-muted)' }}>Tier 2</div>
              </div>
              <h3 className="wwd-font-display text-xl mb-1" style={{ color: 'var(--wwd-text-primary)' }}>Other Analytics Apps</h3>
              <div className="wwd-font-display text-lg mb-5 italic font-medium flex items-center gap-2" style={{ color: 'var(--wwd-amber)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                Limited Specialized Metrics
              </div>
              <div className="text-[10px] uppercase tracking-widest mb-2 font-bold" style={{ color: 'var(--wwd-text-muted)' }}>What it does</div>
              <div className="text-xl wwd-font-display font-normal mb-6" style={{ color: 'var(--wwd-text-secondary)' }}>Measure &amp; Monitor</div>
              <div className="space-y-3 pt-4 border-t mt-auto" style={{ borderColor: 'var(--wwd-border-standard)' }}>
                <div className="flex items-center gap-2 text-xs">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                  <span style={{ color: 'var(--wwd-text-secondary)' }}>Tool-Specific Metrics</span>
                </div>
                <div className="flex items-center gap-2 text-xs"><span className="st-limited">⚠</span><span style={{ color: 'var(--wwd-text-secondary)' }}>Multiple apps required</span></div>
                <div className="flex items-center gap-2 text-xs"><span className="st-none">✕</span><span style={{ color: 'var(--wwd-text-secondary)' }}>No unified infrastructure</span></div>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="reveal reveal-delay-2 tier-card t3 rounded-2xl p-6 relative flex flex-col h-full" style={{ border: '1.5px solid var(--wwd-gold)', background: 'linear-gradient(135deg, rgba(184,134,11,0.03), rgba(255,255,255,0.95))', boxShadow: '0 10px 15px -3px rgba(184, 134, 11, 0.1)' }}>
              <div className="flex justify-between items-center mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--wwd-gold-light), var(--wwd-gold))' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <span className="premium-badge">Tier 3 · Best</span>
              </div>
              <h3 className="wwd-font-display text-xl mb-1 wwd-gold-text">MozIntelligence</h3>
              <div className="wwd-font-display text-lg mb-5 italic font-medium wwd-gold-text">Advanced BI + Strategy</div>
              <div className="text-[10px] uppercase tracking-widest mb-2 font-bold" style={{ color: 'var(--wwd-gold)' }}>What it does</div>
              <div className="text-xl wwd-font-display font-normal mb-6 wwd-gold-text">Analyze, Diagnose &amp; Act</div>
              <div className="space-y-3 pt-4 border-t mt-auto" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
                <div className="flex items-center gap-2 text-xs"><span className="st-premium">✓</span><span style={{ color: 'var(--wwd-text-primary)' }}>Unified cross-platform intelligence</span></div>
                <div className="flex items-center gap-2 text-xs"><span className="st-premium">✓</span><span style={{ color: 'var(--wwd-text-primary)' }}>Enterprise-grade infrastructure</span></div>
                <div className="flex items-center gap-2 text-xs"><span className="st-premium">✓</span><span style={{ color: 'var(--wwd-text-primary)' }}>Strategic advisory &amp; roadmaps</span></div>
              </div>
            </div>
          </div>

          {/* Implementation Support Highlight */}
          <div className="reveal reveal-delay-3 mt-8 wwd-glass-strong rounded-2xl p-8 relative overflow-hidden" style={{ borderLeft: '4px solid var(--wwd-gold)' }}>
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--wwd-gold-light), var(--wwd-gold))' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" aria-hidden="true"><path d="M20 7L9 18l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--wwd-gold)' }}>Implementation Support</div>
                </div>
                <h3 className="wwd-font-display text-2xl font-medium" style={{ color: 'var(--wwd-text-primary)' }}>
                  <span className="wwd-gold-text italic">Done-for-You</span><br/>Implementation
                </h3>
              </div>
              <div className="md:col-span-8 grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border" style={{ background: '#FFFFFF', borderColor: 'rgba(220,38,38,0.2)' }}>
                  <div className="st-none text-xl mb-2">✕</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'var(--wwd-text-primary)' }}>Built-In Analytics</div>
                  <div className="text-xs" style={{ color: 'var(--wwd-text-muted)' }}>Not Available</div>
                </div>
                <div className="p-4 rounded-xl border" style={{ background: '#FFFFFF', borderColor: 'rgba(217,119,6,0.2)' }}>
                  <div className="st-limited text-xl mb-2">⚠</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'var(--wwd-text-primary)' }}>Other Analytics Apps</div>
                  <div className="text-xs" style={{ color: 'var(--wwd-text-muted)' }}>Usually Separate</div>
                </div>
                <div className="p-4 rounded-xl border" style={{ background: 'rgba(184,134,11,0.03)', borderColor: 'var(--wwd-gold)' }}>
                  <div className="st-premium text-xl mb-2">✓</div>
                  <div className="text-sm font-semibold mb-1 wwd-gold-text">MozIntelligence</div>
                  <div className="text-xs" style={{ color: 'var(--wwd-gold)' }}>Full Done-for-You Implementation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

function ServicesSection() {
  const sectionRef = useScrollReveal();
  return (
    <section id="services" className="bg-[#080D14] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="section-label reveal-up">Choose Your Starting Point</span>
        </div>

        {/* Part 1: Core Packages */}
        <div className="mb-20">
          <h3 className="text-white text-xl font-bold mb-2 uppercase tracking-tight part-gold-heading sg-sk-text" ref={(el) => { if (el && !el.dataset.split) { el.dataset.split = '1'; const words = el.textContent.trim().split(/\s+/); el.innerHTML = words.map((w,i) => `<span class="sgw" style="transition-delay:${i*0.08}s">${w}</span>`).join(' '); } }}>Part 1: Core E-Commerce Packages</h3>
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
                <div className="mb-4">
                  <div className="text-[#8899AA] text-xs">Timeline</div>
                  <div className="text-white text-sm font-medium">{pkg.timeline}</div>
                  <div className="text-[#8899AA] text-xs mt-1">Investment</div>
                  <div className="gradient-text-gold text-sm font-bold">{pkg.price}</div>
                </div>
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
                  <p className="text-[#8899AA] text-sm"><BestForText text={pkg.bestFor} /></p>
                </div>

                <div className="p-4 rounded-lg bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.1)] mb-5">
                  <div className="text-[#00C6FF] text-xs font-semibold mb-2">Our Promise To You:</div>
                  <p className="text-[#F0F4F8] text-sm leading-relaxed">{pkg.promise}</p>
                </div>

                <a href="#contact" className="service-book-btn package-book-btn">{pkg.cta}</a>
                <a href={`${basePath}${pkg.route}`} target="_blank" rel="noopener noreferrer" className="btn-press mt-3 px-4 py-2 rounded-md text-xs font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center justify-center gap-2 cursor-pointer no-underline w-full">
                  <ExternalLink size={12} /> View Details
                </a>
                </div>
              </div>
            ))}
          </div>

          {/* View Details — opens the Core E-Commerce Packages landing page */}
          <div className="text-center mt-2 mb-10">
            <a href={`${basePath}/core-packages`} target="_blank" rel="noopener noreferrer" className="btn-press px-6 py-2.5 rounded-md text-sm font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center gap-2 cursor-pointer no-underline">
              <ExternalLink size={14} /> Core E-Commerce Packages Full Details
            </a>
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
                    <div className="mb-4">
                  <div className="text-[#8899AA] text-xs">Timeline</div>
                  <div className="text-white text-sm font-medium">{pkg.timeline}</div>
                  <div className="text-[#8899AA] text-xs mt-1">Investment</div>
                  <div className="gradient-text-gold text-sm font-bold">{pkg.price}</div>
                </div>
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
                      <p className="text-[#8899AA] text-sm"><BestForText text={pkg.bestFor} /></p>
                    </div>
                    <div className="p-4 rounded-lg bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.1)] mb-5">
                      <div className="text-[#00C6FF] text-xs font-semibold mb-2">Our Promise To You:</div>
                      <p className="text-[#F0F4F8] text-sm leading-relaxed">{pkg.promise}</p>
                    </div>
                    <a href="#contact" className="service-book-btn">{pkg.cta}</a>
                    <a href={`${basePath}${pkg.route}`} target="_blank" rel="noopener noreferrer" className="btn-press mt-3 px-4 py-2 rounded-md text-xs font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center justify-center gap-2 cursor-pointer no-underline w-full">
                      <ExternalLink size={12} /> View Details
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
          <h3 className="text-white text-xl font-bold mb-2 uppercase tracking-tight part-gold-heading sg-sk-text" ref={(el) => { if (el && !el.dataset.split) { el.dataset.split = '1'; const words = el.textContent.trim().split(/\s+/); el.innerHTML = words.map((w,i) => `<span class="sgw" style="transition-delay:${i*0.08}s">${w}</span>`).join(' '); } }}>Part 2: Specialized Add-On Packages</h3>
          <p className="text-[#00C6FF] text-base font-semibold mb-1">Have One Specific Problem?</p>
          <p className="text-[#8899AA] text-sm mb-8">Six focused audits, each one built around a single critical business question. Delivered in 7–14 days.</p>

          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADD_ON_PACKAGES.map((pkg, i) => (
              <div key={i} className={`addon-card-wrapper ${pkg.cssClass}`}>
                <div className="addon-card-inner">
                <h4 className="text-white font-bold text-base mb-1">{pkg.name}</h4>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[#8899AA] text-xs">Timeline</div>
                    <div className="text-white text-sm font-medium">{pkg.price.split(' · ')[1] || '7–14 Days'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#8899AA] text-xs">Investment</div>
                    <div className="gradient-text-gold text-sm font-bold">{pkg.price.split(' · ')[0]}</div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-[#FF4444] text-xs font-semibold mb-1">Problem:</div>
                  <p className="text-[#8899AA] text-sm">{pkg.problem}</p>
                </div>
                <div>
                  <div className="text-[#00E676] text-xs font-semibold mb-1">Our Promise:</div>
                  <p className="text-[#F0F4F8] text-sm leading-relaxed">{pkg.promise}</p>
                </div>
                <div className="flex items-stretch gap-2 mt-4">
                  <a href="#contact" className="addon-book-btn flex-1 items-center">
                    Book the {pkg.name} →
                  </a>
                  <a href={`${basePath}${pkg.route}`} target="_blank" rel="noopener noreferrer" className="btn-press px-4 py-2.5 rounded-md text-xs font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center justify-center gap-1.5 cursor-pointer no-underline whitespace-nowrap self-stretch">
                    <ExternalLink size={12} /> View Details
                  </a>
                </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href={`${basePath}/specialized-add-on-packages`} target="_blank" rel="noopener noreferrer" className="btn-press px-6 py-2.5 rounded-md text-sm font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center gap-2 cursor-pointer no-underline">
              <ExternalLink size={14} /> Specialized Add-On Packages Full Details
            </a>
          </div>
        </div>

        {/* Part 3: Data Infrastructure */}
        <div>
          <h3 className="text-white text-xl font-bold mb-2 uppercase tracking-tight part-gold-heading sg-sk-text" ref={(el) => { if (el && !el.dataset.split) { el.dataset.split = '1'; const words = el.textContent.trim().split(/\s+/); el.innerHTML = words.map((w,i) => `<span class="sgw" style="transition-delay:${i*0.08}s">${w}</span>`).join(' '); } }}>Part 3: Data Setup &amp; Infrastructure</h3>
          <p className="gradient-text text-base font-semibold mb-1">The Technical Foundation.</p>
          <p className="text-[#8899AA] text-sm mb-8">
            Before any analysis, your data must be connected and cleaned. We handle the entire backend engineering (GCP, BigQuery, API pipelines). You never touch a line of code. Pay only for what your stack actually needs.
          </p>

          {/* Bundle Cards — features merged in (comparison table removed) */}
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {DATA_BUNDLES.map((bundle, i) => {
              const tierKey = BUNDLE_TIER_KEYS[i];
              return (
                <div key={i} className={`infra-card-wrapper ${bundle.cssClass}`}>
                  <div className="infra-card-inner">
                  <h4 className="text-white font-bold text-lg mb-2">{bundle.name}</h4>
                  <p className="text-[#8899AA] text-sm mb-3">{bundle.bestFor}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[#8899AA] text-xs">Timeline</div>
                      <div className="text-white text-sm font-medium">{bundle.timeline}</div>
                    </div>
                    <div>
                      <div className="text-[#8899AA] text-xs">Investment</div>
                      <div className="gradient-text-gold text-sm font-bold">{bundle.investment}</div>
                    </div>
                  </div>
                  {/* Feature List (merged from former comparison table) */}
                  <div className="infra-feature-list">
                    {BUNDLE_FEATURES.map((feat, fi) => {
                      const val = feat[tierKey];
                      const has = val === true || typeof val === 'string';
                      const note = typeof val === 'string' ? val : null;
                      return (
                        <div key={fi} className={`infra-feature-row ${has ? 'has' : 'not'}`}>
                          <span className={`feature-icon ${has ? 'feature-yes' : 'feature-no'}`}>
                            {has ? FeatureCheckIcon : FeatureCrossIcon}
                          </span>
                          <span className="feature-name">
                            {feat.feature}
                            {note && <span className="feature-note">{note}</span>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <a href="#contact" className="infra-book-btn">
                    Book the {bundle.name} →
                  </a>
                  <a href={`${basePath}${bundle.route}`} target="_blank" rel="noopener noreferrer" className="btn-press mt-3 px-4 py-2.5 rounded-md text-xs font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center justify-center gap-1.5 cursor-pointer no-underline w-full">
                    <ExternalLink size={12} /> View Details
                  </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 15 Individual Services — Redesigned box */}
          <div className="individual-services-box mb-8">
            {/* Box Header */}
            <div className="isb-header">
              <div className="isb-header-left">
                <span className="isb-count-badge">15</span>
                <div className="isb-header-text">
                  <h4 className="isb-title">Individual Services Available</h4>
                  <p className="isb-subtitle">Pick Only What You Need</p>
                </div>
              </div>
              <div className="isb-header-right">
                <span className="isb-tag">À la carte</span>
              </div>
            </div>

            {/* Divider */}
            <div className="isb-divider"></div>

            {/* 3 Categories Grid */}
            <div className="isb-categories-grid">
              {ISB_CATEGORIES.map((cat, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="isb-cat-separator" />}
                  <div className="isb-category">
                    <div className="isb-cat-header">
                      <div className="isb-cat-icon">{cat.catIcon}</div>
                      <span className="isb-cat-title">{cat.title}</span>
                    </div>
                    <ul className="isb-service-list">
                      {cat.items.map((item, ii) => (
                        <li key={ii} className="isb-service-item">
                          <div className="isb-service-logo">{item.logo}</div>
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Custom Infrastructure — View Details button (inside the card) */}
            <div className="text-center mt-6">
              <a href={`${basePath}/custom-infrastructure`} target="_blank" rel="noopener noreferrer" className="btn-press px-6 py-2.5 rounded-md text-sm font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center gap-2 cursor-pointer no-underline">
                <ExternalLink size={14} /> View Details
              </a>
            </div>
          </div>

          <div className="text-center">
            <a href={`${basePath}/data-setup-infrastructure`} target="_blank" rel="noopener noreferrer" className="btn-press px-6 py-2.5 rounded-md text-sm font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center gap-2 cursor-pointer no-underline">
              <ExternalLink size={14} /> View Data Setup &amp; Infrastructure Full Details
            </a>
          </div>
        </div>

        {/* ── Part 4: Custom Analytics & Insights ── */}
        <div className="mb-20">
          <h3 className="text-white text-xl font-bold mb-2 uppercase tracking-tight part-gold-heading sg-sk-text" ref={(el) => { if (el && !el.dataset.split) { el.dataset.split = '1'; const words = el.textContent.trim().split(/\s+/); el.innerHTML = words.map((w,i) => `<span class="sgw" style="transition-delay:${i*0.08}s">${w}</span>`).join(' '); } }}>Part 4: Custom Analytics &amp; Insights</h3>
          <p className="text-[#00C6FF] text-base font-semibold mb-1">Built Around Your Business Questions</p>
          <p className="text-[#8899AA] text-sm mb-8">Not every business problem fits into a standard package. If you need a specific analysis, dashboard, KPI system, or custom report that isn&apos;t covered by our existing services, we can build it around your exact business question, data, and goals.</p>

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 01: Custom Business Analysis */}
            <div className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,198,255,0.15)]" style={{ background: 'linear-gradient(145deg, rgba(13,21,32,0.95) 0%, rgba(0,198,255,0.08) 100%)', border: '1px solid rgba(0,198,255,0.20)', borderLeft: '4px solid #00C6FF', boxShadow: '0 0 30px rgba(0,198,255,0.08), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,198,255,0.1)', border: '1px solid rgba(0,198,255,0.3)' }}>
                  <Lightbulb size={18} className="text-[#00C6FF]" />
                </div>
                <span className="text-[#00C6FF] text-xs font-bold tracking-widest uppercase">Service 01</span>
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Custom Business Analysis</h4>
              <div className="text-[#8899AA] text-xs mb-4">Custom Pricing · Based on Scope</div>
              <p className="text-[#8899AA] text-sm leading-relaxed mb-5">Have a specific business question you need answered? We analyze the relevant data to identify what is happening, why it is happening, and what you should do next.</p>
              <div className="mb-5">
                <div className="text-[#00C6FF] text-xs font-semibold mb-2">Examples</div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Why are sales declining despite steady traffic?</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Which customer segments generate the most profit?</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Which products are driving or hurting growth?</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Where are we losing revenue?</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> What is causing a sudden change in conversion or retention?</li>
                </ul>
              </div>
              <div className="mb-5 p-4 rounded-lg" style={{ background: 'rgba(0,198,255,0.05)', border: '1px solid rgba(0,198,255,0.1)' }}>
                <div className="text-[#00C6FF] text-xs font-semibold mb-2">You Receive</div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Custom analysis based on your question</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Key findings and insights</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Supporting data and visualizations</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Clear strategic recommendations</li>
                </ul>
              </div>
              <a href="#contact" className="service-book-btn package-book-btn">Discuss Your Analysis →</a>
            </div>

            {/* Service 02: Custom E-Commerce Analysis */}
            <div className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,198,255,0.15)]" style={{ background: 'linear-gradient(145deg, rgba(13,21,32,0.95) 0%, rgba(0,230,118,0.08) 100%)', border: '1px solid rgba(0,230,118,0.20)', borderLeft: '4px solid #00E676', boxShadow: '0 0 30px rgba(0,230,118,0.08), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)' }}>
                  <BarChart3 size={18} className="text-[#00E676]" />
                </div>
                <span className="text-[#00E676] text-xs font-bold tracking-widest uppercase">Service 02</span>
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Custom E-Commerce Analysis</h4>
              <div className="text-[#8899AA] text-xs mb-4">Custom Pricing · Based on Scope</div>
              <p className="text-[#8899AA] text-sm leading-relaxed mb-5">Need a deeper analysis of a specific area of your Shopify business? We investigate the exact part of your store or customer journey you want to understand.</p>
              <div className="mb-5">
                <div className="text-[#00E676] text-xs font-semibold mb-2">Examples</div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Customer Lifetime Value analysis</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Repeat purchase analysis</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Product performance analysis</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Customer cohort analysis</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> AOV analysis</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Conversion funnel analysis</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Customer segmentation analysis</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Revenue leakage analysis</li>
                </ul>
              </div>
              <div className="mb-5 p-4 rounded-lg" style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.1)' }}>
                <div className="text-[#00E676] text-xs font-semibold mb-2">You Receive</div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Custom analysis</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Performance breakdown</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Key opportunities and problems</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Actionable recommendations</li>
                </ul>
              </div>
              <a href="#contact" className="service-book-btn package-book-btn">Discuss Your Analysis →</a>
            </div>

            {/* Service 03: Custom Dashboard */}
            <div className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,198,255,0.15)]" style={{ background: 'linear-gradient(145deg, rgba(13,21,32,0.95) 0%, rgba(245,166,35,0.08) 100%)', border: '1px solid rgba(245,166,35,0.20)', borderLeft: '4px solid #F5A623', boxShadow: '0 0 30px rgba(245,166,35,0.08), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)' }}>
                  <LineChart size={18} className="text-[#F5A623]" />
                </div>
                <span className="text-[#F5A623] text-xs font-bold tracking-widest uppercase">Service 03</span>
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Custom Dashboard</h4>
              <div className="text-[#8899AA] text-xs mb-4">Custom Pricing · Based on Scope</div>
              <p className="text-[#8899AA] text-sm leading-relaxed mb-5">Need a dashboard that shows exactly what matters to your business? We build custom dashboards around your KPIs, data sources, and reporting requirements.</p>
              <div className="mb-5">
                <div className="text-[#F5A623] text-xs font-semibold mb-2">Possible Dashboards</div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Executive Performance Dashboard</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> E-Commerce KPI Dashboard</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Marketing Performance Dashboard</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Customer & Retention Dashboard</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Product Performance Dashboard</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Profitability Dashboard</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Sales & Revenue Dashboard</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Custom Management Dashboard</li>
                </ul>
              </div>
              <div className="mb-5">
                <div className="text-[#F5A623] text-xs font-semibold mb-2">Data Sources Can Include</div>
                <p className="text-[#8899AA] text-sm">Shopify · GA4 · Google Ads · Meta Ads · Klaviyo · BigQuery · Other Business Data</p>
              </div>
              <div className="mb-5 p-4 rounded-lg" style={{ background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.1)' }}>
                <div className="text-[#F5A623] text-xs font-semibold mb-2">You Receive</div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Custom dashboard</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> KPI tracking</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Interactive charts and filters</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Connected data sources</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Clear, decision-ready reporting</li>
                </ul>
              </div>
              <a href="#contact" className="service-book-btn package-book-btn">Discuss Your Dashboard →</a>
            </div>

            {/* Service 04: Custom KPI & Reporting System */}
            <div className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,198,255,0.15)]" style={{ background: 'linear-gradient(145deg, rgba(13,21,32,0.95) 0%, rgba(139,92,246,0.08) 100%)', border: '1px solid rgba(139,92,246,0.20)', borderLeft: '4px solid #8B5CF6', boxShadow: '0 0 30px rgba(139,92,246,0.08), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)' }}>
                  <Target size={18} className="text-[#8B5CF6]" />
                </div>
                <span className="text-[#8B5CF6] text-xs font-bold tracking-widest uppercase">Service 04</span>
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Custom KPI &amp; Reporting System</h4>
              <div className="text-[#8899AA] text-xs mb-4">Custom Pricing · Based on Scope</div>
              <p className="text-[#8899AA] text-sm leading-relaxed mb-5">Need a better way to monitor your business every week or month? We create a custom KPI and reporting system around the metrics your team actually needs to track.</p>
              <div className="mb-5">
                <div className="text-[#8B5CF6] text-xs font-semibold mb-2">Examples</div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#8B5CF6] mt-0.5">•</span> Weekly e-commerce performance report</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#8B5CF6] mt-0.5">•</span> Monthly executive report</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#8B5CF6] mt-0.5">•</span> Marketing KPI tracking</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#8B5CF6] mt-0.5">•</span> Customer retention reporting</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#8B5CF6] mt-0.5">•</span> Product performance reporting</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#8B5CF6] mt-0.5">•</span> Profitability monitoring</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#8B5CF6] mt-0.5">•</span> Custom KPI scorecard</li>
                </ul>
              </div>
              <div className="mb-5 p-4 rounded-lg" style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.1)' }}>
                <div className="text-[#8B5CF6] text-xs font-semibold mb-2">You Receive</div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#8B5CF6] mt-0.5">•</span> Custom KPI framework</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#8B5CF6] mt-0.5">•</span> Automated or repeatable reporting structure</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#8B5CF6] mt-0.5">•</span> Performance tracking</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#8B5CF6] mt-0.5">•</span> Clear reporting format</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#8B5CF6] mt-0.5">•</span> Decision-ready insights</li>
                </ul>
              </div>
              <a href="#contact" className="service-book-btn package-book-btn">Discuss Your KPI System →</a>
            </div>

            {/* Service 05: Custom Data Analysis */}
            <div className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,198,255,0.15)]" style={{ background: 'linear-gradient(145deg, rgba(13,21,32,0.95) 0%, rgba(0,198,255,0.08) 100%)', border: '1px solid rgba(0,198,255,0.20)', borderLeft: '4px solid #00C6FF', boxShadow: '0 0 30px rgba(0,198,255,0.08), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,198,255,0.1)', border: '1px solid rgba(0,198,255,0.3)' }}>
                  <Database size={18} className="text-[#00C6FF]" />
                </div>
                <span className="text-[#00C6FF] text-xs font-bold tracking-widest uppercase">Service 05</span>
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Custom Data Analysis</h4>
              <div className="text-[#8899AA] text-xs mb-4">Custom Pricing · Based on Scope</div>
              <p className="text-[#8899AA] text-sm leading-relaxed mb-5">Have data across multiple platforms but need one clear answer? We can combine and analyze data from your existing tools to uncover relationships, patterns, and opportunities that are difficult to see from individual platforms.</p>
              <div className="mb-5">
                <div className="text-[#00C6FF] text-xs font-semibold mb-2">Possible Data Sources</div>
                <p className="text-[#8899AA] text-sm">Shopify · GA4 · Klaviyo · Meta Ads · Google Ads · BigQuery · Excel · Other Business Data</p>
              </div>
              <div className="mb-5">
                <div className="text-[#00C6FF] text-xs font-semibold mb-2">Examples</div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> <span><strong className="text-white">Shopify + GA4</strong><br />Identify where traffic converts or drops off.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> <span><strong className="text-white">Shopify + Klaviyo</strong><br />Understand whether email customers generate higher repeat revenue.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> <span><strong className="text-white">Shopify + Ads</strong><br />Compare advertising spend against actual sales and customer value.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> <span><strong className="text-white">Multiple Sources</strong><br />Build a unified view of your e-commerce performance.</span></li>
                </ul>
              </div>
              <div className="mb-5 p-4 rounded-lg" style={{ background: 'rgba(0,198,255,0.05)', border: '1px solid rgba(0,198,255,0.1)' }}>
                <div className="text-[#00C6FF] text-xs font-semibold mb-2">You Receive</div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Combined data analysis</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Cross-platform insights</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Key findings</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Strategic recommendations</li>
                </ul>
              </div>
              <a href="#contact" className="service-book-btn package-book-btn">Discuss Your Data Analysis →</a>
            </div>

            {/* Service 06: Custom Conversion & Experiment Analysis */}
            <div className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,198,255,0.15)]" style={{ background: 'linear-gradient(145deg, rgba(13,21,32,0.95) 0%, rgba(0,230,118,0.08) 100%)', border: '1px solid rgba(0,230,118,0.20)', borderLeft: '4px solid #00E676', boxShadow: '0 0 30px rgba(0,230,118,0.08), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)' }}>
                  <Zap size={18} className="text-[#00E676]" />
                </div>
                <span className="text-[#00E676] text-xs font-bold tracking-widest uppercase">Service 06</span>
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Custom Conversion &amp; Experiment Analysis</h4>
              <div className="text-[#8899AA] text-xs mb-4">Custom Pricing · Based on Scope</div>
              <p className="text-[#8899AA] text-sm leading-relaxed mb-5">Want to know whether a change to your store actually improved performance? We analyze before-and-after results, customer behavior, and performance data to measure the impact of changes, campaigns, or experiments.</p>
              <div className="mb-5">
                <div className="text-[#00E676] text-xs font-semibold mb-2">Real-Life Examples</div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> <span><strong className="text-white">A/B Test Analysis</strong><br />Compare two versions of a product page to identify which one generates more Add-to-Carts or purchases.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> <span><strong className="text-white">Landing Page Test</strong><br />Measure whether a new landing page improves conversion compared with the previous version.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> <span><strong className="text-white">Pricing Change Analysis</strong><br />Determine whether changing a product&apos;s price affected sales, AOV, or revenue.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> <span><strong className="text-white">Promotion Analysis</strong><br />Measure whether a discount campaign actually generated incremental sales or simply reduced margins.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> <span><strong className="text-white">Checkout Improvement Analysis</strong><br />Compare checkout performance before and after a UX change.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> <span><strong className="text-white">Campaign Impact Analysis</strong><br />Determine whether a marketing campaign created meaningful improvement in revenue or customer acquisition.</span></li>
                </ul>
              </div>
              <div className="mb-5 p-4 rounded-lg" style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.1)' }}>
                <div className="text-[#00E676] text-xs font-semibold mb-2">You Receive</div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Before-and-after performance analysis</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Experiment/test results</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Conversion impact analysis</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00E676] mt-0.5">•</span> Key findings</li>
                </ul>
              </div>
              <a href="#contact" className="service-book-btn package-book-btn">Discuss Your Experiment Analysis →</a>
            </div>
          </div>

          {/* How Custom Analytics Works */}
          <div className="mt-12">
            <h4 className="text-white font-bold text-lg mb-6 text-center uppercase tracking-tight">How Custom Analytics Works</h4>
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { num: '01', title: 'Tell Us What You Need', text: 'Share the business question, reporting requirement, or problem you want to solve.' },
                { num: '02', title: 'We Define the Scope', text: 'We identify the data, KPIs, analysis, and deliverables required.' },
                { num: '03', title: 'We Analyze & Build', text: 'We perform the analysis or build the dashboard/reporting system.' },
                { num: '04', title: 'You Get Clear Answers', text: 'You receive actionable insights designed to help you make better business decisions.' },
              ].map((step, i) => (
                <div key={i} className="rounded-2xl p-6 text-center relative" style={{ background: 'linear-gradient(145deg, rgba(13,21,32,0.95) 0%, rgba(0,198,255,0.05) 100%)', border: '1px solid rgba(0,198,255,0.15)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
                  <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(0,198,255,0.1)', border: '1px solid rgba(0,198,255,0.3)' }}>
                    <span className="text-[#00C6FF] font-bold text-lg">{step.num}</span>
                  </div>
                  <h5 className="text-white font-bold text-sm mb-2">{step.title}</h5>
                  <p className="text-[#8899AA] text-xs leading-relaxed">{step.text}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                      <ArrowRight size={16} className="text-[#00C6FF]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-10 text-center rounded-2xl p-8 sm:p-12" style={{ background: 'linear-gradient(135deg, rgba(0,198,255,0.08) 0%, rgba(0,114,255,0.05) 100%)', border: '1px solid rgba(0,198,255,0.2)', boxShadow: '0 0 40px rgba(0,198,255,0.1)' }}>
            <h4 className="text-white font-bold text-xl sm:text-2xl mb-3 uppercase tracking-tight">Don&apos;t See the Analysis You Need?</h4>
            <p className="text-[#00C6FF] text-base font-semibold mb-2">That&apos;s exactly what Custom Analytics &amp; Insights is for.</p>
            <p className="text-[#8899AA] text-sm max-w-2xl mx-auto mb-5">If you have a business question, we can build the analysis around it.</p>
            <a href="#contact" className="btn-press inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-base font-semibold text-[#020408] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,198,255,0.4)] no-underline" style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 0 20px rgba(0,198,255,0.3)' }}>
              Get Custom Analytics <ArrowRight size={18} />
            </a>
          </div>
        </div>
        {/* ── Part 5: Implementation Add-Ons ── */}
        <div className="mb-20">
          <h3 className="text-white text-base font-bold mb-2 uppercase tracking-tight part-gold-heading sg-sk-text" ref={(el) => { if (el && !el.dataset.split) { el.dataset.split = '1'; const words = el.textContent.trim().split(/\s+/); el.innerHTML = words.map((w,i) => `<span class="sgw" style="transition-delay:${i*0.08}s">${w}</span>`).join(' '); } }}>Part 5: Implementation Add-Ons</h3>
          <p className="text-[#00C6FF] text-base font-semibold mb-1">Turn Insights Into Action</p>
          <p className="text-[#8899AA] text-sm mb-8">You now know what&apos;s holding your business back. These implementation services help turn recommendations into real improvements.</p>

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 01: Klaviyo Email Flows Setup */}
            <div className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,198,255,0.15)]" style={{ background: 'linear-gradient(145deg, rgba(13,21,32,0.95) 0%, rgba(0,198,255,0.08) 100%)', border: '1px solid rgba(0,198,255,0.20)', borderLeft: '4px solid #00C6FF', boxShadow: '0 0 30px rgba(0,198,255,0.08), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,198,255,0.1)', border: '1px solid rgba(0,198,255,0.3)' }}>
                  <Mail size={18} className="text-[#00C6FF]" />
                </div>
                <span className="text-[#00C6FF] text-xs font-bold tracking-widest uppercase">Service 01</span>
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Klaviyo Email Flows Setup</h4>
              <div className="mb-4">
                  <div className="text-[#8899AA] text-xs">Type</div>
                  <div className="text-white text-sm font-medium">Done-for-You</div>
                  <div className="text-[#8899AA] text-xs mt-1">Investment</div>
                  <div className="gradient-text-gold text-sm font-bold">$300 – $600</div>
                </div>
              <p className="text-[#8899AA] text-sm leading-relaxed mb-5">We build and configure the essential Klaviyo email automations that help recover lost customers, increase repeat purchases, and generate more sales without requiring ongoing manual work.</p>

              <div className="mb-5">
                <div className="text-[#00C6FF] text-xs font-semibold mb-2">What We Can Set Up</div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> <span><strong className="text-white">Win-Back Flow</strong>: Reconnect with customers who haven&apos;t purchased recently.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> <span><strong className="text-white">Cross-Sell Flow</strong>: Recommend complementary products after each purchase to increase Average Order Value (AOV).</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> <span><strong className="text-white">VIP Customer Flow</strong>: Reward your highest-value customers with exclusive experiences and retention campaigns.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> <span><strong className="text-white">Post-Purchase Flow</strong>: Keep customers engaged after checkout with follow-up emails, education, reviews, and repeat-purchase reminders.</span></li>
                </ul>
              </div>

              <div className="mb-5">
                <div className="text-[#00C6FF] text-xs font-semibold mb-1">Best For</div>
                <p className="text-[#8899AA] text-sm">Stores already using Klaviyo or planning to improve customer retention through email automation.</p>
              </div>

              <div className="mb-5 p-4 rounded-lg" style={{ background: 'rgba(0,198,255,0.05)', border: '1px solid rgba(0,198,255,0.1)' }}>
                <div className="text-[#00C6FF] text-xs font-semibold mb-2">You Receive</div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Fully configured Klaviyo flows</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Email automation logic</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Trigger & condition setup</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Recommended email sequence structure</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#00C6FF] mt-0.5">•</span> Flow testing before handover</li>
                </ul>
              </div>

              <a href="#contact" className="service-book-btn package-book-btn">Book the Klaviyo Setup →</a>
            </div>

            {/* Service 02: Shopify / Tech Implementation Session */}
            <div className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,198,255,0.15)]" style={{ background: 'linear-gradient(145deg, rgba(13,21,32,0.95) 0%, rgba(245,166,35,0.08) 100%)', border: '1px solid rgba(245,166,35,0.20)', borderLeft: '4px solid #F5A623', boxShadow: '0 0 30px rgba(245,166,35,0.08), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)' }}>
                  <Code2 size={18} className="text-[#F5A623]" />
                </div>
                <span className="text-[#F5A623] text-xs font-bold tracking-widest uppercase">Service 02</span>
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Shopify / Tech Implementation Session</h4>
              <div className="text-[#F5A623] text-xs font-medium mb-2">Done-With-You</div>
              <div className="mb-4">
                  <div className="text-[#8899AA] text-xs">Investment</div>
                  <div className="gradient-text-gold text-sm font-bold">$200–$300</div>
                </div>
              <p className="text-[#8899AA] text-sm leading-relaxed mb-5">Already know what needs fixing but aren&apos;t sure how to implement it? Join a live implementation session where we&apos;ll guide you step by step while you or your team make the changes.</p>

              <div className="mb-5">
                <div className="text-[#F5A623] text-xs font-semibold mb-2">We Can Help You Implement</div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> Shopify store improvements</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> Product page optimization</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> CRO recommendations</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> Tracking & Analytics setup</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> Apps & third-party integrations</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> Technical recommendations from any MozIntelligence audit</li>
                </ul>
              </div>

              <div className="mb-5">
                <div className="text-[#F5A623] text-xs font-semibold mb-1">Best For</div>
                <p className="text-[#8899AA] text-sm">Businesses that want expert guidance while making changes themselves.</p>
              </div>

              <div className="mb-5 p-4 rounded-lg" style={{ background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.1)' }}>
                <div className="text-[#F5A623] text-xs font-semibold mb-2">You Receive</div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> 90-minute live implementation session</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Screen-sharing support</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Step-by-step guidance</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Questions answered live</li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><span className="text-[#F5A623] mt-0.5">•</span> Implementation checklist</li>
                </ul>
              </div>

              <a href="#contact" className="service-book-btn package-book-btn">Book the Implementation Session →</a>
            </div>

            {/* Service 03: Custom Implementation Support */}
            <div className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,198,255,0.15)]" style={{ background: 'linear-gradient(145deg, rgba(13,21,32,0.95) 0%, rgba(0,230,118,0.08) 100%)', border: '1px solid rgba(0,230,118,0.20)', borderLeft: '4px solid #00E676', boxShadow: '0 0 30px rgba(0,230,118,0.08), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)' }}>
                  <Rocket size={18} className="text-[#00E676]" />
                </div>
                <span className="text-[#00E676] text-xs font-bold tracking-widest uppercase">Service 03</span>
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Custom Implementation Support</h4>
              <div className="mb-4">
                  <div className="text-[#8899AA] text-xs">Type</div>
                  <div className="text-white text-sm font-medium">Based on Scope</div>
                  <div className="text-[#8899AA] text-xs mt-1">Investment</div>
                  <div className="gradient-text-gold text-sm font-bold">Custom Pricing</div>
                </div>
              <p className="text-[#8899AA] text-sm leading-relaxed mb-5">Have a specific recommendation from your audit that you want implemented? We can turn your findings into actual changes across your store, marketing, analytics, or operations.</p>

              <div className="mb-5">
                <div className="text-[#00E676] text-xs font-semibold mb-2">What We Can Implement</div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> <span><strong className="text-white">Marketing Spend Audit</strong>: Implement campaign tracking, attribution setup, or budget monitoring.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> <span><strong className="text-white">Customer Retention Audit</strong>: Implement retention flows, customer segments, or re-engagement campaigns.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> <span><strong className="text-white">Product Portfolio Audit</strong>: Implement product bundling, cross-sell setup, or product merchandising changes.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> <span><strong className="text-white">CRO Audit</strong>: Implement recommended changes to your product pages, cart, checkout, or conversion flow.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> <span><strong className="text-white">Profitability Audit</strong>: Implement margin tracking, product-level profitability monitoring, or profit alerts.</span></li>
                  <li className="flex items-start gap-2 text-sm text-[#F0F4F8]"><Check size={14} className="text-[#00E676] shrink-0 mt-0.5" /> <span><strong className="text-white">Operations Efficiency Audit</strong>: Implement workflow automation, operational tracking, or cost monitoring.</span></li>
                </ul>
              </div>

              <div className="mb-5 p-4 rounded-lg" style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.1)' }}>
                <div className="text-[#00E676] text-xs font-semibold mb-2">You Get</div>
                <p className="text-[#F0F4F8] text-sm">The recommended solution implemented based on your audit findings and business requirements.</p>
              </div>

              <a href="#contact" className="service-book-btn package-book-btn">Discuss Your Implementation →</a>
            </div>
          </div>

          {/* Done-for-You vs Done-With-You comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="rounded-2xl p-6 sm:p-8 text-center" style={{ background: 'linear-gradient(145deg, rgba(13,21,32,0.95) 0%, rgba(0,198,255,0.06) 100%)', border: '1px solid rgba(0,198,255,0.15)', boxShadow: '0 0 30px rgba(0,198,255,0.05), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(0,198,255,0.1)', border: '1px solid rgba(0,198,255,0.3)' }}>
                <Check size={20} className="text-[#00C6FF]" />
              </div>
              <h4 className="text-white font-bold text-lg mb-3">Done-for-You</h4>
              <p className="text-[#8899AA] text-sm leading-relaxed">We complete the implementation for you.</p>
              <p className="text-[#8899AA] text-sm leading-relaxed">Minimal involvement required.</p>
              <p className="text-[#00C6FF] text-sm font-semibold mt-2">Best for busy teams.</p>
            </div>
            <div className="rounded-2xl p-6 sm:p-8 text-center" style={{ background: 'linear-gradient(145deg, rgba(13,21,32,0.95) 0%, rgba(245,166,35,0.06) 100%)', border: '1px solid rgba(245,166,35,0.15)', boxShadow: '0 0 30px rgba(245,166,35,0.05), 0 8px 32px rgba(0,0,0,0.4)' }}>
              <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)' }}>
                <Users size={20} className="text-[#F5A623]" />
              </div>
              <h4 className="text-white font-bold text-lg mb-3">Done-With-You</h4>
              <p className="text-[#8899AA] text-sm leading-relaxed">We guide you while you implement the changes yourself.</p>
              <p className="text-[#8899AA] text-sm leading-relaxed">Collaborative live working session.</p>
              <p className="text-[#F5A623] text-sm font-semibold mt-2">Best for teams that want to learn while implementing.</p>
            </div>
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
          <span className="section-label reveal-up">The Receipts</span>
          <h2 className="section-headline text-[clamp(23px,3.5vw,40px)] text-white mt-3 mb-4 uppercase tracking-tight reveal-up" style={{ transitionDelay: '0.2s' }}>
            Featured Case Studies
          </h2>
          <p className="text-[#8899AA] text-base max-w-2xl mx-auto">
            High revenue doesn&apos;t mean high profit. Here is what happened when founders stopped looking at vanity metrics and let me read their real data.
          </p>
        </div>

        <div className="reveal-stagger case-studies-compact-grid">
          {CASE_STUDIES.map((cs, i) => (
            <article
              key={i}
              className={`case-card-qp-style case-card-qp-${i + 1} reveal-up`}
              style={{ transitionDelay: `${0.3 + i * 0.12}s` }}
            >
              <div className="case-qp-accent" aria-hidden="true" />
              <div className="case-qp-head">
                <h3 className="case-qp-store">{cs.store}</h3>
                <span className={`case-qp-badge ${cs.caseType}`}>{cs.caseType}</span>
              </div>
              <span className="case-qp-niche">{cs.niche}</span>
              <p className="case-qp-title">{cs.title}</p>
              <p className="case-qp-tagline">{cs.tagline}</p>

              <div className="case-qp-sections">
                <div className="case-qp-block">
                  <div className="case-qp-label case-qp-label-nightmare">
                    <AlertTriangle size={10} /> The Nightmare
                  </div>
                  <p className="case-qp-text">{cs.nightmare}</p>
                </div>
                <div className="case-qp-block">
                  <div className="case-qp-label case-qp-label-revelation">
                    <Lightbulb size={10} /> The Revelation
                  </div>
                  <p className="case-qp-text">{cs.revelation}</p>
                </div>
                <div className="case-qp-block">
                  <div className="case-qp-label case-qp-label-turnaround">
                    <Zap size={10} /> The Turnaround
                  </div>
                  <p className="case-qp-text">{cs.turnaround}</p>
                </div>
                <div className="case-qp-result">
                  <div className="case-qp-label case-qp-label-result">
                    <Rocket size={10} /> The Result
                  </div>
                  <p className="case-qp-result-text">{cs.result}</p>
                </div>
              </div>

              <a href={`${basePath}/pdfs/case-${cs.cssClass}.pdf`} download={`${cs.store}_Case_Study.pdf`} className="case-qp-download">
                <Download size={12} /> Download Full {cs.store} Case Study PDF
              </a>
            </article>
          ))}
        </div>

        {/* Section Divider */}
        <div className="section-divider mt-16" />
      </div>
    </section>
  );
}

/* CaseStudies2Section removed — all 6 case studies now render in the
   single #case-studies section in a 3-column compact grid. */

function TechPortfolioSection() {
  const sectionRef = useScrollReveal();
  return (
    <section id="technical-portfolio" className="bg-[#080D14] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label reveal-up">The Engineering Behind The Insights</span>
          <h2 className="section-headline text-[clamp(23px,3.5vw,40px)] font-extrabold text-white mt-3 mb-4 uppercase tracking-tight reveal-up" style={{ transitionDelay: '0.2s' }}>
            Technical Portfolio
          </h2>
        </div>

        <div className="portfolio-cards-grid mb-8">
          {GITHUB_PROJECTS.map((proj, i) => {
            const accents = [
              { border: 'rgba(0,198,255,0.20)', left: '#00C6FF', bg: 'rgba(0,198,255,0.08)', hover: 'rgba(0,198,255,0.15)' },
              { border: 'rgba(0,230,118,0.20)', left: '#00E676', bg: 'rgba(0,230,118,0.08)', hover: 'rgba(0,230,118,0.15)' },
              { border: 'rgba(245,166,35,0.20)', left: '#F5A623', bg: 'rgba(245,166,35,0.08)', hover: 'rgba(245,166,35,0.15)' },
            ];
            const a = accents[i] || accents[0];
            return (
            <div key={i} className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,198,255,0.15)]" style={{ background: `linear-gradient(145deg, rgba(13,21,32,0.95) 0%, ${a.bg} 100%)`, border: `1px solid ${a.border}`, borderLeft: `4px solid ${a.left}`, boxShadow: '0 0 30px ' + a.bg + ', 0 8px 32px rgba(0,0,0,0.4)' }}>
              <h3 className="font-bold text-lg mb-1" style={{ color: a.left }}>{proj.name}</h3>
              <p className="gradient-text text-sm font-semibold mb-3">{proj.subtitle}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.stack.map((s, si) => (
                  <span key={si} className="tech-tag px-2.5 py-1 rounded-md text-xs font-medium inline-flex items-center gap-1.5">
                    {TECH_ICONS[s] || null}{s}
                  </span>
                ))}
              </div>
              <div className="mb-4">
                <div className="card-label-engineering text-xs font-semibold mb-1">The Engineering:</div>
                <p className="text-[#8899AA] text-sm leading-relaxed">{proj.engineering}</p>
              </div>
              <div className="mb-5 p-4 rounded-lg" style={{ background: a.bg, border: `1px solid ${a.border}` }}>
                <div className="card-label-impact text-xs font-semibold mb-1">The Impact:</div>
                <p className="text-[#F0F4F8] text-sm leading-relaxed">{proj.impact}</p>
              </div>
              <a href="https://github.com/mojahid1252" target="_blank" rel="noopener noreferrer" className="text-[#00C6FF] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all no-underline">
                View Code &amp; Methodology on GitHub <ExternalLink size={14} />
              </a>
            </div>
            );
          })}
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
          <span className="section-label reveal-up">Founders, Transformed</span>
          <h2 className="section-headline text-[clamp(23px,3.5vw,40px)] font-extrabold text-white mt-3 mb-4 uppercase tracking-tight reveal-up" style={{ transitionDelay: '0.2s' }}>
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
      <div className="absolute inset-0 bg-[rgba(2,4,8,0.94)]" />

      <div className="reveal relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label reveal-up" style={{ fontSize: '16px', letterSpacing: '3px' }}>The Engagement Flow</span>
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
          <span className="section-label reveal-up">The Infrastructure Behind The Insights</span>
          <h2 className="section-headline text-[clamp(20px,3vw,33px)] font-extrabold text-white mt-3 mb-2 uppercase tracking-tight reveal-up" style={{ transitionDelay: '0.2s' }}>
            Enterprise Engineering. Without the $150K Salary.
          </h2>
          <p className="text-[#8899AA] text-sm max-w-3xl mx-auto leading-relaxed mt-2">
            I bring the exact same tech stack used by Fortune 500 companies, and build it custom for your store. You get enterprise-grade data infrastructure without the $150,000/year in-house data engineer salary.
          </p>
        </div>

        <div className="infra-tech-grid mb-10">
          {TECH_STACK.map((cat, i) => {
            const IconComp = cat.icon;
            const accents = [
              { border: 'rgba(0,198,255,0.20)', left: '#00C6FF', bg: 'rgba(0,198,255,0.08)' },
              { border: 'rgba(0,230,118,0.20)', left: '#00E676', bg: 'rgba(0,230,118,0.08)' },
              { border: 'rgba(245,166,35,0.20)', left: '#F5A623', bg: 'rgba(245,166,35,0.08)' },
              { border: 'rgba(139,92,246,0.20)', left: '#8B5CF6', bg: 'rgba(139,92,246,0.08)' },
            ];
            const a = accents[i] || accents[0];
            // All categories use the compact 2-column grid (icons + names only).
            const showDesc = false;
            return (
              <div key={i} className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,198,255,0.15)]" style={{ background: `linear-gradient(145deg, rgba(13,21,32,0.95) 0%, ${a.bg} 100%)`, border: `1px solid ${a.border}`, borderLeft: `4px solid ${a.left}`, boxShadow: '0 0 30px ' + a.bg + ', 0 8px 32px rgba(0,0,0,0.4)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <IconComp size={22} style={{ color: a.left }} />
                  <h3 className="font-bold text-lg text-white">{cat.category}</h3>
                </div>
                {showDesc && <p className="text-[#8899AA] text-sm mb-5">{cat.description}</p>}
                <ul className={`infra-tool-list${showDesc ? '' : ' infra-tool-list-grid'}`}>
                  {cat.items.map((item, ii) => (
                    <li key={ii} className="infra-tool-item">
                      <div className={`tool-logo-wrap${item.logo === 'meta-google' ? ' tool-logo-double' : ''}`}>
                        {TOOL_LOGOS[item.logo]}
                      </div>
                      <div className="tool-text">
                        <span className="tool-name">{item.name}</span>
                        {showDesc && <span className="tool-desc">{item.desc}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
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

/* ──────────────────────────────────────────
   FAQ DATA — text must stay EXACTLY as provided
   ────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    num: '01',
    question: 'My marketing agency already provides dashboards. Why do I need you?',
    answer: <>Agencies are paid to spend your money, and their dashboards are designed to justify their retainers. They will show you a <strong>"4.2x ROAS"</strong> while your bank account empties. I don't care about vanity metrics; I care about <strong>net profit</strong>. I act as your independent data detective, exposing the <strong>True Profit ROAS</strong> of your campaigns so you know exactly where you're actually making money.</>,
  },
  {
    num: '02',
    question: 'Do I need to have my data perfectly organized before we work together?',
    answer: <>Absolutely not. Most founders have messy data spread across Shopify, GA4, and ad platforms that don't talk to each other. That's exactly what my <strong>Data Setup & Infrastructure</strong> service fixes. I handle <strong>100% of the backend engineering</strong> (SQL, Python, BigQuery) to clean, merge, and structure your data. <strong>You never have to touch a single line of code.</strong></>,
  },
  {
    num: '03',
    question: 'Why is there a separate fee for the Data Setup? Can\'t you just look at my Shopify dashboard?',
    answer: <>Shopify's default dashboard only shows about <strong>10% of the picture</strong>. To find the hidden profit leaks, I have to pull raw data from all your platforms, align currencies and timezones, and merge them into <strong>one central database</strong>. This is a <strong>one-time investment</strong> that pays for itself with every decision you make going forward. You only pay for the platforms you actually use.</>,
  },
  {
    num: '04',
    question: 'I have a specific, urgent problem (like high return rates or declining ad performance). Do I have to buy a full $1,500 package?',
    answer: <>No. If you have one critical pain point, you can choose one of my <strong>6 Specialized Add-On Audits</strong> (like the CRO Audit, Profitability Audit, or Marketing Spend Audit). These are deep-dive, standalone engagements delivered in <strong>7–14 days</strong>, starting at <strong>$250</strong>.</>,
  },
  {
    num: '05',
    question: 'My revenue is growing, but I don\'t feel like I\'m making more money. Can you help?',
    answer: <>This is the most common scenario I see. <strong>Revenue is vanity; profit is sanity.</strong> I will run a <strong>Profit Reality Check</strong> on your top products, calculate your true margins (after COGS, ad spend, returns, and shipping), and show you exactly which <strong>"best-sellers" are quietly draining your bank account</strong>.</>,
  },
  {
    num: '06',
    question: 'How much of my time is required during the engagement?',
    answer: <><strong>Very little.</strong> I built this process specifically for busy founders. I handle the data extraction, engineering, and analysis. You simply provide initial platform access, and then join me for the <strong>final strategy call</strong> to review the findings and action plan. You don't need to babysit the project.</>,
  },
  {
    num: '07',
    question: 'I don\'t have a marketing team. Will I actually be able to implement your recommendations?',
    answer: <>Yes. I don't hand you a 50-page technical document and disappear. Every finding comes with a <strong>prioritized, plain-language action plan</strong> (e.g., "Pause this ad," "Enable guest checkout," "Email these 312 at-risk customers today"). Many of my clients are solo founders or small teams who implement the <strong>"quick wins" within hours of our call</strong>.</>,
  },
  {
    num: '08',
    question: 'I\'m nervous about giving access to my Shopify and ad accounts. Is my data secure?',
    answer: <><strong>100% secure.</strong> I use strict, permission-based API connections. For live dashboard and retainer clients, I store all API keys and tokens securely using <strong>environment variables or Secret Manager</strong> — never exposed, never at risk. Your data is used solely for your analysis and is <strong>never shared</strong>.</>,
  },
  {
    num: '09',
    question: 'How fast can we start? I\'m bleeding money.',
    answer: <>The <strong>E-Commerce Health Check</strong> is delivered in exactly <strong>5–7 days</strong>. If your business is losing <strong>$1,690 a month</strong>, you don't have 3 months to wait for a consultant to figure it out. You need to know exactly what to fix <strong>this week</strong>.</>,
  },
];

function FAQSection() {
  const sectionRef = useScrollReveal();
  // Accordion state: index of the currently-open FAQ item, or -1 if all closed.
  // Only one item can be open at a time (per requirement).
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  // Render a single FAQ card as an accordion item.
  // The question row (with +/- toggle) is ALWAYS visible.
  // The answer collapses/expands below it.
  const renderCard = (item: { num: string; question: string; answer: React.ReactNode }, displayIndex: number) => {
    const isOpen = openIndex === displayIndex;
    return (
      <div
        className={`faq-item${isOpen ? ' open' : ''}`}
        key={item.num}
      >
        <button
          type="button"
          className="faq-item-question"
          onClick={() => toggle(displayIndex)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${item.num}`}
        >
          <span className="faq-item-text">{item.question}</span>
          <span className="faq-toggle" aria-hidden="true">
            <span className="faq-toggle-icon faq-toggle-plus">+</span>
            <span className="faq-toggle-icon faq-toggle-minus">−</span>
          </span>
        </button>
        <div
          className={`faq-item-answer${isOpen ? ' open' : ''}`}
          id={`faq-answer-${item.num}`}
          role="region"
        >
          <p className="faq-item-answer-text">{item.answer}</p>
        </div>
        <div className="faq-item-divider" aria-hidden="true"></div>
      </div>
    );
  };

  return (
    <section id="faq" className="faq-section" ref={sectionRef}>
      <div className="faq-wrap reveal">

        {/* ── Header ── */}
        <div className="faq-header">
          <span className="faq-eyebrow">FAQ</span>
          <p className="faq-subtitle">
            Everything you need to know before we work together.
          </p>
          <div className="faq-title-bar"></div>
        </div>

        {/* Q1–Q5 */}
        {FAQ_ITEMS.slice(0, 5).map((item, i) => renderCard(item, i))}

        {/* Q6–Q9 */}
        {FAQ_ITEMS.slice(5, 9).map((item, i) => renderCard(item, 5 + i))}

        {/* ── Bottom CTA ── */}
        <div className="faq-cta">
          <div className="faq-cta-inner">
            <div className="faq-cta-left">
              <p className="faq-cta-eyebrow">Still have questions?</p>
              <h3 className="faq-cta-heading">
                Let&apos;s find your next <span className="faq-cta-money">$10,000</span>.
              </h3>
            </div>
            <div className="faq-cta-right">
              <a href="#contact" className="faq-cta-btn">
                Book a Complimentary 20-Minute Discovery Call
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* Maps service dropdown values to human-readable labels for the email payload */
const SERVICE_LABELS: Record<string, string> = {
  'starter': 'E-Commerce Health Check',
  'growth': 'Revenue Growth Accelerator',
  'advanced': 'Data-Driven Growth System',
  'retainer': 'Ongoing Analytics Retainer',
  'marketing-spend': 'Marketing Spend Audit',
  'customer-retention': 'Customer Retention Audit',
  'product-portfolio': 'Product Portfolio Audit',
  'cro-audit': 'CRO & Checkout Audit',
  'profitability': 'Profitability & COGS Audit',
  'operations': 'Operations & Automation Audit',
  'basic-setup': 'Basic Data Setup',
  'full-pipeline': 'Full Data Pipeline',
  'full-automation': 'Full Pipeline + Automation',
  'not-sure': 'Not sure — help me figure it out',
  'custom': 'Custom / Something else',
};

function ContactSection() {
  const sectionRef = useScrollReveal();
  const [formState, setFormState] = useState({ name: '', email: '', url: '', message: '', budget: '', service: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'd3ac2832-f3ca-48cb-abdf-4827bc8c9d12',
          name: formState.name,
          email: formState.email,
          storeUrl: formState.url || 'Not provided',
          service: SERVICE_LABELS[formState.service] || 'Not selected',
          budget: formState.budget || 'Not selected',
          message: formState.message,
          subject: `New Inquiry from ${formState.name} — Mozahidul Islam Portfolio`,
          from_name: formState.name,
          disable_captcha: 'true',
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to send');
      }
      setSubmitted(true);
      setFormState({ name: '', email: '', url: '', message: '', budget: '', service: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(msg);
      setTimeout(() => setError(''), 8000);
    } finally {
      setSending(false);
    }
  }, [formState]);

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(2,4,8,0.96) 0%, rgba(8,13,20,0.94) 100%)' }} />

      <div className="reveal relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="contact-main-heading whitespace-nowrap">
            Let&apos;s Find Your Next <span className="money-accent">$10,000.</span>
          </h2>
          <h2 className="contact-main-heading contact-sub-heading sg-sk-text" ref={(el) => { if (el && !el.dataset.split) { el.dataset.split = '1'; el.innerHTML = '<span class="sgw sgw-accent" style="transition-delay:0s">Stop</span> <span class="sgw sgw-accent" style="transition-delay:0.08s">Guessing.</span> <span class="sgw sgw-accent" style="transition-delay:0.16s">Start</span> <span class="sgw sgw-accent" style="transition-delay:0.24s">Knowing.</span>'; } }}>
            Stop Guessing. Start Knowing.
          </h2>
          <p className="contact-highlight-text max-w-3xl mx-auto leading-relaxed mt-6">
            Every struggling store already has the data. What it doesn&apos;t have is someone willing to read it honestly, explain it clearly, and act on it decisively.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="glass rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto mb-12 text-center"
          style={{ boxShadow: '0 0 40px rgba(0,198,255,0.1)' }}>
          <h3 className="text-white text-xl font-bold mb-2">Ready to find out exactly where your profit is hiding?</h3>
          <p className="text-[#8899AA] text-sm mb-5">
            Book a complimentary 20-minute Discovery Call. We&apos;ll understand your business, identify your most urgent data problem, and recommend the right starting point. No pressure, no jargon.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://calendar.app.google/TGnzfC65zBF3hVeD9" target="_blank" rel="noopener noreferrer" className="btn-press inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-base font-semibold text-[#020408] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,198,255,0.4)]"
              style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 0 20px rgba(0,198,255,0.3)' }}>
              <Calendar size={18} />
              Book My Discovery Call
            </a>
            <button
              type="button"
              onClick={() => { window.open('https://mail.google.com/mail/?view=cm&fs=1&to=mojahidulislam101010@gmail.com&su=Discovery+Call+Inquiry&body=Hi+Mozahidul%2C+I+visited+your+portfolio+and+want+to+discuss+my+e-commerce+data+needs.', '_blank'); }}
              className="btn-press inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,67,53,0.4)] cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #EA4335, #C5221F)', boxShadow: '0 0 20px rgba(234,67,53,0.3)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              Email Me
            </button>
          </div>
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
                    type="text" required name="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.12)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00C6FF] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-[#8899AA] text-xs font-semibold tracking-wider uppercase block mb-1.5">Email</label>
                  <input
                    type="email" required name="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.12)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00C6FF] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-[#8899AA] text-xs font-semibold tracking-wider uppercase block mb-1.5">Store URL <span className="field-optional">(optional)</span></label>
                  <input
                    type="url" name="storeUrl"
                    value={formState.url}
                    onChange={(e) => setFormState({ ...formState, url: e.target.value })}
                    className="w-full bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.12)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00C6FF] transition-colors"
                    placeholder="https://yourstore.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="service-select" className="form-label">
                    What do you need help with?
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="service-select"
                      name="service"
                      className="form-select"
                      required
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    >
                      <option value="" disabled>Select a service...</option>
                      <optgroup label="── Core E-Commerce Packages ──">
                        <option value="starter">E-Commerce Health Check</option>
                        <option value="growth">Revenue Growth Accelerator</option>
                        <option value="advanced">Data-Driven Growth System</option>
                        <option value="retainer">Ongoing Analytics Retainer</option>
                      </optgroup>
                      <optgroup label="── Specialized Add-On Audits ──">
                        <option value="marketing-spend">Marketing Spend Audit</option>
                        <option value="customer-retention">Customer Retention Audit</option>
                        <option value="product-portfolio">Product Portfolio Audit</option>
                        <option value="cro-audit">CRO &amp; Checkout Audit</option>
                        <option value="profitability">Profitability &amp; COGS Audit</option>
                        <option value="operations">Operations &amp; Automation Audit</option>
                      </optgroup>
                      <optgroup label="── Data Setup & Infrastructure ──">
                        <option value="basic-setup">Basic Data Setup</option>
                        <option value="full-pipeline">Full Data Pipeline</option>
                        <option value="full-automation">Full Pipeline + Automation</option>
                      </optgroup>
                      <optgroup label="── Other ──">
                        <option value="not-sure">Not sure — help me figure it out</option>
                        <option value="custom">Custom / Something else</option>
                      </optgroup>
                    </select>
                    <div className="select-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[#8899AA] text-xs font-semibold tracking-wider uppercase block mb-1.5">Budget Range</label>
                  <select
                    value={formState.budget} name="budget"
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
                    required rows={4} name="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[rgba(0,198,255,0.05)] border border-[rgba(0,198,255,0.12)] rounded-lg px-4 py-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00C6FF] transition-colors resize-none"
                    placeholder="Tell me about your store and what you're struggling with..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-press w-full px-6 py-3.5 rounded-md text-base font-semibold text-[#020408] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,198,255,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)' }}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
                {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="text-white font-bold text-lg mb-5">Prefer to reach out directly? Let&apos;s talk.</h3>
              <div className="space-y-4">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mojahidulislam101010@gmail.com&su=Discovery+Call+Inquiry" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
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
          <h3 className="section-headline text-[clamp(19px,2.5vw,31px)] mb-3 uppercase tracking-tight reveal-up sg-sk-text" style={{ transitionDelay: '0.2s' }} ref={(el) => { if (el && !el.dataset.split) { el.dataset.split = '1'; el.innerHTML = '<span class="sgw" style="color:#EF4444;transition-delay:0s">Stop</span> <span class="sgw" style="color:#EF4444;transition-delay:0.08s">Guessing.</span> <span class="sgw" style="color:#22C55E;transition-delay:0.16s">Start</span> <span class="sgw" style="color:#22C55E;transition-delay:0.24s">Knowing.</span>'; } }}>Stop Guessing. Start Knowing.</h3>
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
              <Image src={`${basePath}/images/logo.png`} alt="Logo" width={44} height={44} className="rounded-lg img-premium" />
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
              <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=mojahidulislam101010@gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#8899AA] text-sm hover:text-[#00C6FF] transition-colors inline-flex items-center gap-1.5"><Mail size={12}/> Email</a></li>
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
    /* Scroll progress + back-to-top */
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowBackToTop(scrollTop > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* Scroll reveal — activate reveal elements as they enter view */
    const REVEAL_SELECTOR = '.reveal, .reveal-stagger, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .count-up, .sg-sk-text';
    let revealIO: IntersectionObserver | null = null;
    const checkReveals = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.classList.contains('active')) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < vh - 60 && rect.bottom > 0) {
          el.classList.add('active');
          revealIO?.unobserve(el);
        }
      });
    };
    revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealIO?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => revealIO!.observe(el));
    window.addEventListener('scroll', checkReveals, { passive: true });
    window.addEventListener('resize', checkReveals);
    // Activate anything already in view (after a short delay for hydration)
    const t1 = window.setTimeout(checkReveals, 100);
    const t2 = window.setTimeout(checkReveals, 600);
    if (document.readyState === 'complete') window.setTimeout(checkReveals, 50);
    else window.addEventListener('load', checkReveals);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', checkReveals);
      window.removeEventListener('resize', checkReveals);
      window.removeEventListener('load', checkReveals);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      revealIO?.disconnect();
    };
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
      <WhyDataSection />
      <QuickProofSection />
      <AboutSection />
      <WhyMeSection />
      <WhyWeAreDifferentSection />
      <ServicesSection />
      <CaseStudiesSection />
      {/* CaseStudies2Section removed — all 6 cards now in #case-studies */}
      <TechPortfolioSection />
      <TestimonialsSection />
      <ProcessSection />
      <TechStackSection />
      <FAQSection />
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
