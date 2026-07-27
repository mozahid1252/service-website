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
  { value: 'On time', label: 'Deadline Driven', isDeadline: true },
  { target: 4.9, prefix: '', suffix: '', isRating: true, ratingLabel: '100+ projects' },
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
    bestFor: 'Stores doing $100K+/mo needing a permanent data partner.',
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
};

const TECH_STACK = [
  {
    category: 'Programming & Analytics',
    icon: Code2,
    description: 'The languages used to process millions of rows and run statistical models.',
    items: [
      { logo: 'python', name: 'Python (Pandas, Seaborn)', desc: 'For deep EDA, A/B testing (t-tests, ANOVA), and churn modeling.' },
      { logo: 'sql', name: 'SQL', desc: 'For extracting, joining, and transforming raw data across multiple platforms.' },
      { logo: 'stats', name: 'Statistical Modeling', desc: 'Moving beyond "gut feelings" to mathematically proven truths.' },
    ],
  },
  {
    category: 'Cloud & Data Warehousing',
    icon: Cloud,
    description: 'The backend infrastructure where your unified source of truth lives.',
    items: [
      { logo: 'gcp', name: 'Google Cloud Platform (GCP)', desc: 'Secure, scalable cloud infrastructure.' },
      { logo: 'bigquery', name: 'BigQuery', desc: 'Enterprise data warehousing for lightning-fast queries.' },
      { logo: 'postgres', name: 'PostgreSQL', desc: 'Relational database management for structured star-schema models.' },
    ],
  },
  {
    category: 'Visualization & BI',
    icon: LineChart,
    description: 'Where the complex math becomes a simple, actionable dashboard for you.',
    items: [
      { logo: 'looker', name: 'Looker Studio', desc: 'Live, auto-refreshing, custom KPI dashboards.' },
      { logo: 'powerbi', name: 'Power BI', desc: 'Advanced business intelligence with 20+ DAX measures.' },
      { logo: 'excel', name: 'Excel', desc: 'Simplified KPI summary sheets for immediate team action.' },
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
      { logo: 'klaviyo', name: 'Klaviyo', desc: 'Email performance, Segmentation, Churn triggers' },
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
                      <span key={s} className="hero-star" style={{ animationDelay: `${0.8 + s * 0.15}s` }}>★</span>
                    ))}
                  </div>
                  <div className="font-bold text-white text-sm mt-1.5">
                    <Counter target={stat.target || 0} prefix={stat.prefix || ''} suffix={stat.suffix || '/5'} />
                  </div>
                  <div className="text-[#8899AA] text-xs mt-0.5 uppercase">{stat.ratingLabel}</div>
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
            Every store has hidden profit. Most founders never find it — because they&apos;re looking at the wrong numbers.
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
                <span className="mini-v">10x</span>
                <span className="mini-l">Avg ROI</span>
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
          <h2 className="qp3-title reveal-up" style={{ transitionDelay: '0.15s' }}>
            The Money Was Always There. <span className="qp3-title-accent">Nobody Was Looking.</span>
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
                <span className="about2-hero-stat-v">$53.5M+</span>
                <span className="about2-hero-stat-l">Revenue Tracked</span>
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

            {/* Personal info */}
            <div className="about2-info reveal-up" style={{ transitionDelay: '0.6s' }}>
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

            {/* CTA buttons */}
            <div className="about2-cta reveal-up" style={{ transitionDelay: '0.7s' }}>
              <a href={`${basePath}/pdfs/resume.pdf`} download="Mozahidul_Islam_Resume.pdf" className="about2-btn about2-btn-primary">
                <Download size={16} /> Download CV
              </a>
              <a href="#case-studies" className="about2-btn about2-btn-secondary">
                <BarChart3 size={16} /> See My Projects
              </a>
            </div>
          </div>

          {/* RIGHT — Photo + floating stat cards */}
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
                <span className="about2-float-v">$53.5M+</span>
                <span className="about2-float-l">Revenue Tracked</span>
              </div>
              {/* Floating stat card 2 — Experience */}
              <div className="about2-float-card about2-float-card-2">
                <span className="about2-float-v">3 Years</span>
                <span className="about2-float-l">Experience</span>
              </div>
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
        <div className="whyme-header">
          <div className="whyme-header-left">
            <span className="whyme-eyebrow reveal-up">
              <span className="whyme-eyebrow-dot" aria-hidden="true" />
              Why Me
            </span>
            <h2 className="whyme-title reveal-up" style={{ transitionDelay: '0.15s' }}>
              The 4 Principles<br />
              <span className="whyme-title-accent">That Shape Every Engagement</span>
            </h2>
          </div>
          <p className="whyme-intro reveal-up" style={{ transitionDelay: '0.3s' }}>
            Not a framework. Not a template. Just four non-negotiable standards that define how I work — and why the work actually moves the needle.
          </p>
        </div>

        {/* ── PRINCIPLES LIST ── */}
        <div className="whyme-principles">
          {principles.map((p, i) => (
            <article
              key={p.num}
              className={`whyme-principle whyme-p-${i + 1} reveal-up`}
              style={{ transitionDelay: `${0.4 + i * 0.12}s` }}
            >
              {/* Connector line (between cards) */}
              {i < principles.length - 1 && (
                <span className="whyme-connector" aria-hidden="true" />
              )}

              {/* Number rail */}
              <div className="whyme-num-rail">
                <div className="whyme-num-badge">
                  <span className="whyme-num-text">{p.num}</span>
                </div>
                <div className="whyme-num-line" aria-hidden="true" />
              </div>

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

        {/* ── FOOTER STRIP ── */}
        <div className="whyme-footer reveal-up" style={{ transitionDelay: '1s' }}>
          <div className="whyme-footer-stat">
            <span className="whyme-footer-stat-v">100%</span>
            <span className="whyme-footer-stat-l">Custom Analysis</span>
          </div>
          <div className="whyme-footer-divider" aria-hidden="true" />
          <div className="whyme-footer-stat">
            <span className="whyme-footer-stat-v">0</span>
            <span className="whyme-footer-stat-l">Generic Templates</span>
          </div>
          <div className="whyme-footer-divider" aria-hidden="true" />
          <div className="whyme-footer-stat">
            <span className="whyme-footer-stat-v">Every</span>
            <span className="whyme-footer-stat-l">Finding Actionable</span>
          </div>
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
          <h2 className="section-headline text-[clamp(27px,4vw,47px)] font-extrabold text-white mt-3 mb-2 uppercase tracking-tight whitespace-nowrap reveal-up" style={{ transitionDelay: '0.2s' }}>
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

function ServicesSection() {
  const sectionRef = useScrollReveal();
  return (
    <section id="services" className="bg-[#080D14] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label reveal-up">Choose Your Starting Point</span>
          <h2 className="section-headline text-[clamp(27px,4vw,47px)] font-extrabold text-white mt-3 mb-4 uppercase tracking-tight reveal-up" style={{ transitionDelay: '0.2s' }}>
            Services
          </h2>
          <p className="text-[#8899AA] text-base max-w-2xl mx-auto">
            Every engagement delivers a clear finding, a specific action plan, and a direct conversation, not a data dump.
          </p>
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
              <ExternalLink size={14} /> View Details
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
                <div className="gradient-text-gold text-sm font-semibold mb-3">{pkg.price}</div>
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
              <ExternalLink size={14} /> View Details
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
                    <div className="text-right">
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
          </div>

          <div className="text-center">
            <a href={`${basePath}/pdfs/data-setup-infrastructure.pdf`} download="Data_Setup_Infrastructure_Services.pdf" className="btn-press px-6 py-2.5 rounded-md text-sm font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center gap-2 cursor-pointer no-underline">
              <Download size={14} /> Download Data Setup &amp; Infrastructure Details PDF
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
          <span className="section-label reveal-up">The Receipts</span>
          <h2 className="section-headline text-[clamp(27px,4vw,47px)] text-white mt-3 mb-4 uppercase tracking-tight reveal-up" style={{ transitionDelay: '0.2s' }}>
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

              <a href={`${basePath}/pdfs/case-${cs.cssClass}.pdf`} download={`${cs.store}_Case_Study.pdf`} className="text-[#00C6FF] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all no-underline">
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

              <a href={`${basePath}/pdfs/case-${cs.cssClass}.pdf`} download={`${cs.store}_Case_Study.pdf`} className="text-[#00C6FF] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all no-underline">
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
    <section id="technical-portfolio" className="bg-[#080D14] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label reveal-up">The Engineering Behind The Insights</span>
          <h2 className="section-headline text-[clamp(27px,4vw,47px)] font-extrabold text-white mt-3 mb-4 uppercase tracking-tight reveal-up" style={{ transitionDelay: '0.2s' }}>
            Technical Portfolio
          </h2>
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
          <span className="section-label reveal-up">Founders, Transformed</span>
          <h2 className="section-headline text-[clamp(27px,4vw,47px)] font-extrabold text-white mt-3 mb-4 uppercase tracking-tight reveal-up" style={{ transitionDelay: '0.2s' }}>
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
          <h2 className="section-headline text-[clamp(23px,3.5vw,39px)] font-extrabold text-white mt-3 mb-2 uppercase tracking-tight reveal-up" style={{ transitionDelay: '0.2s' }}>
            Enterprise Engineering. Without the $150K Salary.
          </h2>
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
                <ul className="infra-tool-list">
                  {cat.items.map((item, ii) => (
                    <li key={ii} className="infra-tool-item">
                      <div className={`tool-logo-wrap${item.logo === 'meta-google' ? ' tool-logo-double' : ''}`}>
                        {TOOL_LOGOS[item.logo]}
                      </div>
                      <div className="tool-text">
                        <span className="tool-name">{item.name}</span>
                        <span className="tool-desc">{item.desc}</span>
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
      <article
        className={`faq-card${isOpen ? ' open' : ''}`}
        data-index={item.num}
        key={item.num}
      >
        <div className="faq-card-number">{item.num}</div>
        <div className="faq-card-body">
          {/* Question row — always visible, clickable to toggle */}
          <button
            type="button"
            className="faq-card-left"
            onClick={() => toggle(displayIndex)}
            aria-expanded={isOpen}
            aria-controls={`faq-answer-${item.num}`}
          >
            <div className="faq-card-q-label">
              <span className="faq-q-dot"></span>
              Question
            </div>
            <h3 className="faq-card-question" id={`faq-question-${item.num}`}>{item.question}</h3>
            {/* +/- toggle icon (cross-faded) */}
            <span className="faq-toggle" aria-hidden="true">
              <span className="faq-toggle-icon faq-toggle-plus">+</span>
              <span className="faq-toggle-icon faq-toggle-minus">−</span>
            </span>
          </button>
          <div className="faq-card-divider" aria-hidden="true"></div>
          {/* Answer region — collapses/expands below the question */}
          <div
            className={`faq-card-right${isOpen ? ' open' : ''}`}
            id={`faq-answer-${item.num}`}
            role="region"
            aria-labelledby={`faq-question-${item.num}`}
          >
            <div className="faq-card-right-inner">
              <div className="faq-card-a-label">
                <span className="faq-a-dot"></span>
                Answer
              </div>
              <p className="faq-card-answer">{item.answer}</p>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section id="faq" className="faq-section" ref={sectionRef}>
      <div className="faq-wrap reveal">

        {/* ── Header ── */}
        <div className="faq-header">
          <span className="faq-eyebrow">FAQ</span>
          <h2 className="faq-title">
            Straight Answers.
            <span className="faq-title-accent"> No Jargon</span>
          </h2>
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
          <h2 className="contact-main-heading">
            Let&apos;s Find Your Next <span className="money-accent">$10,000.</span>
          </h2>
          <h2 className="contact-main-heading contact-sub-heading sg-sk-text" ref={(el) => { if (el && !el.dataset.split) { el.dataset.split = '1'; el.innerHTML = '<span class="sgw" style="color:#EF4444;transition-delay:0s">Stop</span> <span class="sgw" style="color:#EF4444;transition-delay:0.08s">Guessing.</span> <span class="sgw" style="color:#22C55E;transition-delay:0.16s">Start</span> <span class="sgw" style="color:#22C55E;transition-delay:0.24s">Knowing.</span>'; } }}>
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
      <WhyWorkWithMeSection />
      <ServicesSection />
      <CaseStudiesSection />
      <CaseStudies2Section />
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
