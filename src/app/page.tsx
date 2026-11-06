'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Menu, X, ChevronDown, Mail, Linkedin, Phone, Github,
  Check, Star, ArrowRight, Download, ExternalLink,
  BarChart3, TrendingUp, Users, Shield, Zap, Database,
  Code2, Cloud, LineChart, Plug, FileText, Clock,
  AlertTriangle, Target, Lightbulb, Rocket, MapPin, Calendar, Lock, Quote
} from 'lucide-react';
import { CtaBanner, SiteFooter } from '@/components/site/contact-footer';
import { QuickProofSection } from '@/components/site/quick-proof';
import { WhatWeDoSection } from '@/components/site/what-we-do';
import { TechStackSection } from '@/components/site/tech-stack';
import { TestimonialsSection } from '@/components/site/testimonials';
import { DashboardShowcaseSection } from '@/components/site/dashboard-showcase';
import { PlatformsShowcaseSection } from '@/components/site/platforms-showcase';
import { ChatbotWidget } from '@/components/chatbot-widget';
import { WhyDifferentSection } from '@/components/WhyDifferentSection';
import { FaqSection } from '@/components/FaqSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import { TechnicalPortfolioSection } from '@/components/TechnicalPortfolioSection';
import { PrinciplesSection } from '@/components/PrinciplesSection';

/* GitHub Pages basePath helper */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/* ──────────────────────────────────────────
   DATA CONSTANTS
   ────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Technical Portfolio', href: '#technical-portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '#faq' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

/* Single source of truth for the Services submenu (desktop dropdown + mobile). */
const SERVICES_SUBMENU = [
  { label: 'E-Commerce Growth Framework', href: '#part-1' },
  { label: 'Specialized E-Commerce Audits', href: '#part-2' },
  { label: 'Data Infrastructure & Intelligence Systems', href: '#part-3' },
  { label: 'Custom Analytics & Decision Support', href: '#part-4' },
];

/* Single source of truth for the About submenu (desktop dropdown + mobile).
   Consolidates the previous "What We Do", "About", and "Why Moz's Different"
   navigation items into one dropdown under "About".
   Items with href starting with '/' are cross-page links (rendered as plain
   <a> to force full page reload — avoids client-side nav back-button bug).
   Items with href: undefined are placeholders (no link yet). */
const ABOUT_SUBMENU = [
  { label: 'About MozIntelligence', href: '/about-mozintelligence' },
  { label: 'Why MozIntelligence Different', href: '#why-were-different' },
  { label: 'About Founder', href: '/about-founder' },
];

const TRUST_STATS: { target?: number; prefix?: string; suffix?: string; value?: string; label: string; isRating?: boolean; isPrivacy?: boolean; isDeadline?: boolean; ratingLabel?: string }[] = [
  { target: 127, prefix: '+', suffix: '%', label: 'Avg Revenue Growth' },
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
    tag: 'STEP 01 — DIAGNOSE',
    name: 'E-Commerce Health Check Audit',
    tier: 'STARTER',
    badge: 'Start Here',
    price: 'Standard from $499',
    priceNote: 'Deep: $1,200–$1,800',
    timeline: '',
    tagline: 'Identify revenue leaks, profit risks, product issues, marketing inefficiencies, tracking gaps, conversion bottlenecks, and customer-health concerns.',
    description: 'A full-store diagnostic audit that reveals exactly where your e-commerce business is losing revenue and profit.',
    features: [],
    bestFor: '',
    promise: '',
    cta: 'Get My Health Check →',
    route: '/health-check',
    featured: false,
  },
  {
    tag: 'STEP 02 — FIX & IMPROVE',
    name: 'E-Commerce Performance Improvement',
    tier: 'GROWTH',
    badge: 'After Your Audit',
    price: 'Custom project',
    priceNote: 'Typically starts from $750',
    timeline: '',
    tagline: 'Turn your Health Check findings into focused improvements across CRO, marketing, products, tracking, retention, or analytics.',
    description: 'Focused improvement projects that turn your audit findings into measurable business results.',
    features: [],
    bestFor: '',
    promise: '',
    cta: 'Discuss My Improvement Plan →',
    route: '/performance-improvement',
    featured: true,
  },
  {
    tag: 'STEP 03 — GROW',
    name: 'E-Commerce Growth Intelligence Partnership',
    tier: 'ADVANCED',
    badge: 'Ongoing Support',
    price: 'Advisory from $1,000/month',
    priceNote: 'Performance Partnership from $2,000/month',
    timeline: '',
    tagline: 'Receive ongoing strategic and analytical support to monitor performance, prioritize opportunities, improve execution, and build sustainable e-commerce growth.',
    description: 'An ongoing partnership that keeps your business moving forward with continuous insight and strategic guidance.',
    features: [],
    bestFor: '',
    promise: '',
    cta: 'Discuss a Growth Partnership →',
    route: '/growth-partnership',
    featured: false,
  },
];

const ADD_ON_PACKAGES = [
  // ── Core Business Performance Audits (1–6) ──
  {
    name: 'E-Commerce Profitability Audit',
    price: 'Starting from $650 · 10–14 Days',
    problem: '"Revenue grows but profit doesn\'t."',
    promise: 'You will know your true profit margin on every product/channel, exactly where revenue is leaking into cost, if your promotions are eroding profit, and when your cash will be tight in coming months.',
    cssClass: 'profitability',
    route: '/profitability-audit',
  },
  {
    name: 'Marketing Performance & Profitability Audit',
    price: 'Starting from $350 · 5–7 Days',
    problem: '"My marketing spend is growing, but I cannot see the real business return."',
    promise: 'Understand channel efficiency, acquisition cost, profitability signals, and where marketing investment may need to change.',
    cssClass: 'marketing',
    route: '/marketing-spend-audit',
    cta: 'Explore Marketing Audit',
  },
  {
    name: 'E-Commerce CRO Audit',
    price: 'Starting at $900 · 10–15 Days',
    problem: '"Traffic is there but nobody\'s buying."',
    promise: 'You will know where customers are dropping off across 11 CRO analyses, whether the issue is traffic or experience, which device or segment converts poorly, and receive a prioritized, testable conversion improvement roadmap.',
    cssClass: 'cro',
    route: '/cro-audit',
  },
  {
    name: 'Customer Retention & LTV Audit',
    price: 'Starting from $400 · 7–10 Days',
    cta: 'Explore Retention Audit',
    problem: '"Customers buy once and disappear."',
    promise: 'You will know which customers are about to leave (and how to reach them before they do), which channels bring loyal customers, and have an upload-ready segmented list for immediate retention campaigns.',
    cssClass: 'retention',
    route: '/customer-retention-audit',
  },
  {
    name: 'Product Profitability & Portfolio Audit',
    price: 'Starting from $450 · 7–10 Days',
    problem: '"50+ SKUs, I don\'t know what to focus on."',
    promise: 'You will know which products to invest in, optimize, or cut, the true profit margin on every SKU in your catalog, and exactly which products to bundle together to increase AOV.',
    cssClass: 'portfolio',
    route: '/product-portfolio-audit',
  },
  {
    name: 'Operations Efficiency Audit',
    price: 'Starting from $850 · 10–14 Days',
    problem: '"Returns climbing, inventory out of control."',
    promise: 'You will know which suppliers are causing financial problems, exactly how much inventory to order (and when based on 90-day demand), the true cost of your return rate, and how to free up cash locked in dead stock.',
    cssClass: 'operations',
    route: '/operations-efficiency-audit',
  },
  // ── Channel & Measurement Reviews (7–8) ──
  {
    name: 'Meta Ads Measurement & Profitability Review',
    price: 'Starting at $900 · 10–14 Days',
    problem: '"My Meta Ads are spending, but I don\'t know what\'s actually driving profitable growth."',
    promise: 'You will know which campaigns, audiences, creatives, and placements are driving profitable results, whether your Meta data can be trusted, and receive a 30-day prioritized action plan showing what to scale, test, refresh, reduce, or pause.',
    cssClass: 'meta-ads',
    route: '/meta-ads-performance-audit',
  },
  {
    name: 'Marketing Measurement & Attribution Review',
    price: 'Starting at $450 · 7–10 Days',
    problem: '"Shopify, GA4, Meta, and Google Ads all show different numbers and I don\'t know which to trust."',
    promise: 'You will know why your platform numbers differ, where tracking is breaking, whether conversions are being double-counted, and receive a prioritized correction roadmap your developer or agency can act on.',
    cssClass: 'tracking',
    route: '/e-commerce-tracking-attribution-review',
  },
];

const DATA_BUNDLES = [
  { name: 'Data Preparation & Integration', bestFor: 'For One-Time Analysis Projects\nData cleaning, preparation & integration across up to 5 platforms', timeline: '2–3 Days', investment: '$150 – $300', cssClass: 'infra-wrapper-basic', route: '/data-preparation-integration' },
  { name: 'Data Pipeline & Dashboard Setup', bestFor: 'Multi-platform data integration, automated data pipelines & dashboard setup', timeline: '5–7 Days', investment: '$500 – $900', cssClass: 'infra-wrapper-pipeline', route: '/data-pipeline-dashboard-setup' },
];

const BUNDLE_FEATURES = [
  { feature: 'Cloud Infrastructure', basic: true, full: true, auto: true },
  { feature: 'Platform API Connections', basic: 'Up to 5', full: 'All', auto: 'All' },
  { feature: 'Data Pipeline Build', basic: true, full: true, auto: true },
  { feature: 'Data Cleaning', basic: true, full: true, auto: true },
  { feature: 'Data Modeling & Transformation', basic: true, full: true, auto: true },
  { feature: 'Multi-Platform Merge', basic: 'Up to 5', full: true, auto: true },
  { feature: 'BigQuery Load Script', basic: true, full: true, auto: true },
  { feature: 'Credential Security', basic: true, full: true, auto: true },
  { feature: 'Dashboard Connection', basic: false, full: true, auto: true },
  { feature: 'Basic KPI Dashboard', basic: false, full: true, auto: false },
  { feature: 'Automated Custom KPI Dashboard', basic: false, full: false, auto: true },
  { feature: 'Automated Scheduling', basic: false, full: false, auto: true },
  { feature: 'Error Alerts', basic: false, full: false, auto: true },
];

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
    profit: '-$1.7K/mo ➔ +$33K/mo in 60–70 days',
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
    text: 'You book a call, we assess your business needs, and you select the analytics package that fits your store (Starter, Growth, or Advanced). No guessing, we map exactly which platforms hold your data.',
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
    text: 'You implement the fixes, like pausing losing ads, flipping budgets, or sending win-back emails. If you partner with us on an ongoing basis, we monitor your live dashboard and send proactive anomaly alerts so today\'s insights never go stale.',
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

/* Renders promise text with **bold** segments and \n\n paragraph breaks. */
function PromiseText({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");
  return (
    <>
      {paragraphs.map((para, pi) => {
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        return (
          <span key={pi}>
            {pi > 0 && (
              <>
                <br />
                <br />
              </>
            )}
            {parts.map((part, i) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
              ) : (
                <React.Fragment key={i}>{part}</React.Fragment>
              )
            )}
          </span>
        );
      })}
    </>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const servicesHoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const aboutHoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Active section tracking
    // Merge NAV_LINKS IDs + About submenu IDs (what-we-do, why-were-different, about-founder)
    // so scroll-spy highlights the parent "About" item when in any of those sections.
    // Filter out items without href and cross-page links (starting with '/').
    const sectionIds = Array.from(new Set([
      ...NAV_LINKS.map(l => l.href.replace('#', '')),
      ...ABOUT_SUBMENU.filter(l => l.href && l.href.startsWith('#')).map(l => l.href.replace('#', '')),
    ]));
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

  // Desktop hover handlers with small delay so the dropdown stays open
  // while the cursor moves from "Services" into the dropdown panel.
  const openServices = () => {
    if (servicesHoverTimeout.current) clearTimeout(servicesHoverTimeout.current);
    setServicesOpen(true);
  };
  const closeServices = () => {
    if (servicesHoverTimeout.current) clearTimeout(servicesHoverTimeout.current);
    servicesHoverTimeout.current = setTimeout(() => setServicesOpen(false), 150);
  };

  // Mirror the Services hover handlers for the About dropdown.
  const openAbout = () => {
    if (aboutHoverTimeout.current) clearTimeout(aboutHoverTimeout.current);
    setAboutOpen(true);
  };
  const closeAbout = () => {
    if (aboutHoverTimeout.current) clearTimeout(aboutHoverTimeout.current);
    aboutHoverTimeout.current = setTimeout(() => setAboutOpen(false), 150);
  };

  // Close the About dropdown on Escape and on click outside (accessibility).
  useEffect(() => {
    if (!aboutOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAboutOpen(false);
    };
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-about-wrap')) setAboutOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDocClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDocClick);
    };
  }, [aboutOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(0,0,0,0.92)] backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
        style={{ borderBottom: scrolled ? '1px solid rgba(0,198,255,0.08)' : 'none' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between h-[72px]">
          <a href="#hero" className="flex items-center gap-3 group z-10">
            <Image src={`${basePath}/images/logo.png`} alt="MozIntelligence — E-Commerce Growth Intelligence" width={44} height={44} className="rounded-lg transition-transform duration-300 group-hover:scale-105 img-premium" priority />
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-white leading-tight">MozIntelligence</div>
              <div className="text-[11px] text-[#8899AA] leading-tight">E-Commerce Growth<br/>Focused</div>
            </div>
          </a>

          {/* Centered nav links — absolutely positioned so they sit in the
              horizontal middle of the header, independent of logo/CTA width. */}
          <div className="hidden lg:flex items-center gap-5 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => {
              if (link.label === 'Services') {
                return (
                  <div
                    key={link.href}
                    className="relative nav-services-wrap"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServices}
                  >
                    <a
                      href={link.href}
                      className={`text-[13px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap inline-flex items-center gap-1 ${
                        activeSection === link.href || servicesOpen
                          ? 'nav-link-active'
                          : 'text-[#8899AA] hover:text-[#00C6FF]'
                      }`}
                    >
                      {link.label}
                      <svg
                        className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                        width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </a>
                    {/* Desktop dropdown */}
                    <div
                      className={`nav-services-dropdown absolute left-1/2 top-full pt-2 -translate-x-1/2 transition-all duration-200 ${servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'}`}
                    >
                      <div className="nav-services-panel min-w-[260px] rounded-lg border border-[rgba(0,198,255,0.16)] bg-[rgba(8,14,24,0.98)] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2">
                        {SERVICES_SUBMENU.map((s) => (
                          <a
                            key={s.href}
                            href={s.href}
                            className="block px-4 py-2.5 text-[13px] font-medium text-[#8899AA] hover:text-[#00C6FF] hover:bg-[rgba(0,198,255,0.06)] transition-colors duration-150 whitespace-nowrap"
                          >
                            {s.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              if (link.label === 'About') {
                return (
                  <div
                    key={link.href}
                    className="relative nav-about-wrap"
                    onMouseEnter={openAbout}
                    onMouseLeave={closeAbout}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); setAboutOpen(v => !v); }}
                      aria-expanded={aboutOpen}
                      aria-controls="about-dropdown"
                      className={`text-[13px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap inline-flex items-center gap-1 ${
                        aboutOpen || ['#what-we-do', '#why-were-different', '/about-founder'].includes(activeSection)
                          ? 'nav-link-active'
                          : 'text-[#8899AA] hover:text-[#00C6FF]'
                      }`}
                    >
                      {link.label}
                      <svg
                        className={`transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`}
                        width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </a>
                    {/* Desktop dropdown */}
                    <div
                      id="about-dropdown"
                      className={`nav-services-dropdown absolute left-1/2 top-full pt-2 -translate-x-1/2 transition-all duration-200 ${aboutOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'}`}
                    >
                      <div className="nav-services-panel min-w-[260px] rounded-lg border border-[rgba(0,198,255,0.16)] bg-[rgba(8,14,24,0.98)] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2">
                        {ABOUT_SUBMENU.map((s) => (
                          s.href ? (
                            <a
                              key={s.label}
                              href={s.href}
                              onClick={() => setAboutOpen(false)}
                              className="block px-4 py-2.5 text-[13px] font-medium text-[#8899AA] hover:text-[#00C6FF] hover:bg-[rgba(0,198,255,0.06)] transition-colors duration-150 whitespace-nowrap"
                            >
                              {s.label}
                            </a>
                          ) : (
                            <span
                              key={s.label}
                              className="block px-4 py-2.5 text-[13px] font-medium text-[#8899AA]/50 whitespace-nowrap cursor-default"
                              aria-disabled="true"
                              title="Coming soon"
                            >
                              {s.label}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
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
              );
            })}
          </div>

          {/* CTA button — direct calendar booking link (opens new tab). */}
          <a
            href="https://calendar.app.google/TGnzfC65zBF3hVeD9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press px-6 py-2.5 rounded-md text-sm font-semibold text-[#000000] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,198,255,0.4)] hidden lg:flex flex-col items-center justify-center leading-tight text-center z-10"
            style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 0 20px rgba(0,198,255,0.3)' }}
          >
            <span>Book a Free</span>
            <span>Discovery Call</span>
          </a>

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
        className={`fixed inset-0 z-40 bg-[rgba(0,0,0,0.97)] backdrop-blur-xl flex flex-col items-center justify-center gap-6 transition-all duration-400 overflow-y-auto py-20 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link, i) => {
          if (link.label === 'Services') {
            return (
              <div key={link.href} className="flex flex-col items-center gap-3" style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms' }}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-2xl font-medium transition-all duration-300 inline-flex items-center gap-2 ${
                    mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  } ${activeSection === link.href ? 'text-[#00C6FF]' : 'text-white hover:text-[#00C6FF]'}`}
                >
                  {link.label}
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMobileServicesOpen(!mobileServicesOpen); }}
                    className="ml-1 text-[#00C6FF] transition-transform duration-200"
                    style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    aria-label="Toggle Services submenu"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                </a>
                {/* Mobile Services submenu (nested) */}
                <div
                  className="flex flex-col items-center gap-3 overflow-hidden transition-all duration-300"
                  style={{ maxHeight: mobileServicesOpen ? '320px' : '0px', opacity: mobileServicesOpen ? 1 : 0 }}
                >
                  {SERVICES_SUBMENU.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                      className="text-base font-medium text-[#8899AA] hover:text-[#00C6FF] transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            );
          }
          if (link.label === 'About') {
            return (
              <div key={link.href} className="flex flex-col items-center gap-3" style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms' }}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); setMobileAboutOpen(!mobileAboutOpen); }}
                  className={`text-2xl font-medium transition-all duration-300 inline-flex items-center gap-2 ${
                    mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  } ${['#what-we-do', '#why-were-different', '/about-founder'].includes(activeSection) ? 'text-[#00C6FF]' : 'text-white hover:text-[#00C6FF]'}`}
                >
                  {link.label}
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMobileAboutOpen(!mobileAboutOpen); }}
                    className="ml-1 text-[#00C6FF] transition-transform duration-200"
                    style={{ transform: mobileAboutOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    aria-label="Toggle About submenu"
                    aria-expanded={mobileAboutOpen}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                </a>
                {/* Mobile About submenu (nested) */}
                <div
                  className="flex flex-col items-center gap-3 overflow-hidden transition-all duration-300"
                  style={{ maxHeight: mobileAboutOpen ? '400px' : '0px', opacity: mobileAboutOpen ? 1 : 0 }}
                >
                  {ABOUT_SUBMENU.map((s) => (
                    s.href ? (
                      <a
                        key={s.label}
                        href={s.href}
                        onClick={() => { setMobileOpen(false); setMobileAboutOpen(false); }}
                        className="text-base font-medium text-[#8899AA] hover:text-[#00C6FF] transition-colors"
                      >
                        {s.label}
                      </a>
                    ) : (
                      <span
                        key={s.label}
                        className="text-base font-medium text-[#8899AA]/50 cursor-default"
                        aria-disabled="true"
                        title="Coming soon"
                      >
                        {s.label}
                      </span>
                    )
                  ))}
                </div>
              </div>
            );
          }
          return (
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
          );
        })}
        <a
          href="https://calendar.app.google/TGnzfC65zBF3hVeD9"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className="btn-press mt-4 px-8 py-3 rounded-md text-base font-semibold text-[#000000] transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center leading-tight text-center"
          style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)' }}
        >
          <span>Book a Free</span>
          <span>Discovery Call</span>
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
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.96) 0%, rgba(8,13,20,0.92) 100%)' }} />
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
          MozIntelligence finds exactly where your money is leaking across your products, your ads, and your customers and shows you how to stop it. No confusing reports. No generic advice. Just a clear picture of what is hurting your profit and a specific plan to fix it.
        </span>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="https://calendar.app.google/TGnzfC65zBF3hVeD9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press px-8 py-3.5 rounded-md text-base font-semibold text-[#000000] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,198,255,0.4)]"
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
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
function WhyWorkWithMeSection() {
  const sectionRef = useScrollReveal();
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.92)]" />

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
            &quot;I fired my $2,500/month agency because their &apos;amazing dashboards&apos; still left me broke. The Health Check and the Growth Packages found the exact holes in my business in 13 days. I wish I had done this two years earlier.&quot;
          </p>
          <p className="text-[#8899AA] text-sm mb-4">Marcus T., NOIRE Collective</p>

          <div className="overflow-x-auto rounded-lg border border-[rgba(0,198,255,0.15)]">
            <table className="w-full text-sm min-w-[360px]">
              <thead>
                <tr className="bg-[rgba(0,198,255,0.05)]">
                  <th className="px-4 py-2 text-left text-[#FF4444] font-semibold">Before</th>
                  <th className="px-4 py-2 text-left text-[#00E676] font-semibold">After</th>
                  <th className="px-4 py-2 text-left text-[#F5A623] font-semibold whitespace-nowrap">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-[#FF4444]">-$1,690/mo net profit</td>
                  <td className="px-4 py-3 text-[#00E676] font-semibold">+$15,000/mo net profit</td>
                  <td className="px-4 py-3 text-[#F5A623] whitespace-nowrap">60–70 days</td>
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
    <section id="services" className="bg-[#000000] py-20 sm:py-28" ref={sectionRef}>
      <div className="reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="section-label reveal-up">Choose Your Starting Point</span>
        </div>

        {/* Part 1: Core Packages */}
        <div id="part-1" className="mb-20">
          <h3 className="text-white text-3xl sm:text-4xl font-extrabold mb-3 uppercase tracking-tight part-gold-heading sg-sk-text" ref={(el) => { if (el && !el.dataset.split) { el.dataset.split = '1'; const words = el.textContent.trim().split(/\s+/); el.innerHTML = words.map((w,i) => `<span class="sgw" style="transition-delay:${i*0.08}s">${w}</span>`).join(' '); } }}>E-Commerce Growth Framework</h3>
          <div className="h-0.5 w-24 mb-4" style={{ background: 'linear-gradient(90deg, #00C6FF 0%, #0072FF 50%, transparent 100%)', borderRadius: '2px' }}></div>
          <p className="text-white text-lg sm:text-xl font-semibold mb-3">From Diagnosis to Sustainable Growth</p>
          <p className="text-[#8899AA] text-sm leading-relaxed mb-8 pl-4" style={{ borderLeft: '3px solid rgba(148,163,184,0.4)' }}>We help e-commerce businesses understand what is holding them back, improve the highest-priority problems, and build a clearer path to sustainable growth.</p>

          <div className="packages-grid mb-6">
            {CORE_PACKAGES.slice(0, 3).map((pkg) => (
              <div
                key={pkg.tier}
                className={`package-outer-wrapper service-card-wrapper ${pkg.tier.toLowerCase()}`}
              >
                <div className="package-inner-card service-card-inner">

                <div className="text-[#00C6FF] text-xs font-semibold tracking-widest uppercase mb-2">{pkg.tag}</div>
                <h4 className="text-white text-lg font-bold mb-2">{pkg.name}</h4>
                {pkg.badge && (
                  <div className="inline-block px-3 py-1 rounded-full bg-[rgba(0,198,255,0.1)] border border-[rgba(0,198,255,0.2)] text-[#00C6FF] text-xs font-semibold mb-3">{pkg.badge}</div>
                )}
                <div className="mb-4">
                  <div className="gradient-text-gold text-sm font-bold">{pkg.price}</div>
                  {pkg.priceNote && <div className="text-[#8899AA] text-xs mt-1">{pkg.priceNote}</div>}
                </div>
                {pkg.description && <p className="text-[#8899AA] text-sm leading-relaxed mb-3">{pkg.description}</p>}
                {pkg.tagline && <p className="text-[#F0F4F8] text-sm leading-relaxed mb-5">{pkg.tagline}</p>}

                <a href={`/book?package=${pkg.route.replace('/', '')}`} className="service-book-btn package-book-btn">{pkg.cta}</a>
                <a href={`${basePath}${pkg.route}`} className="btn-press mt-3 px-4 py-2.5 rounded-md text-sm font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center justify-center gap-2 cursor-pointer no-underline w-full">
                  <ExternalLink size={14} /> View Details
                </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Add-On Packages */}
        <div id="part-2" className="mb-20">
          <h3 className="text-white text-3xl sm:text-4xl font-extrabold mb-3 uppercase tracking-tight part-gold-heading sg-sk-text" ref={(el) => { if (el && !el.dataset.split) { el.dataset.split = '1'; const words = el.textContent.trim().split(/\s+/); el.innerHTML = words.map((w,i) => `<span class="sgw" style="transition-delay:${i*0.08}s">${w}</span>`).join(' '); } }}>Specialized E-Commerce Audits</h3>
          <div className="h-0.5 w-24 mb-4" style={{ background: 'linear-gradient(90deg, #00C6FF 0%, #0072FF 50%, transparent 100%)', borderRadius: '2px' }}></div>
          <p className="text-white text-lg sm:text-xl font-semibold mb-3">Have One Specific Problem?</p>
          <p className="text-[#8899AA] text-sm leading-relaxed mb-8 pl-4" style={{ borderLeft: '3px solid rgba(148,163,184,0.4)' }}>Focused audits designed to investigate one critical business question and give you clear findings, priorities, and next steps. Typically delivered within 7&ndash;14 business days.</p>

          {/* ── Category 1: Core Business Performance Audits ── */}
          <div className="reveal-stagger mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#00C6FF] text-xs font-bold tracking-[0.12em] uppercase">Core Business Performance Audits</span>
              <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(0,198,255,0.3), transparent)' }}></span>
              <span className="text-[#8899AA] text-xs font-medium">6 Audits</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ADD_ON_PACKAGES.slice(0, 6).map((pkg, i) => (
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
                      {pkg.tagline && <div className="text-[#00C6FF] text-xs font-medium mt-2 leading-snug">{pkg.tagline}</div>}
                  </div>
                  <div className="mb-3">
                    <div className="text-[#FF4444] text-xs font-semibold mb-1">Problem:</div>
                    <p className="text-[#8899AA] text-sm">{pkg.problem}</p>
                  </div>
                  <div>
                    <div className="text-[#00E676] text-xs font-semibold mb-1">Our Promise:</div>
                    <p className="text-[#F0F4F8] text-sm leading-relaxed"><PromiseText text={pkg.promise} /></p>
                  </div>
                  <div className="flex items-stretch gap-2 mt-4">
                    <a href={`/book?package=${pkg.route.replace('/', '')}`} className="addon-book-btn flex-1 items-center">
                      {pkg.cta ? `${pkg.cta} →` : `Book the ${pkg.name} →`}
                    </a>
                    <a href={`${basePath}${pkg.route}`} target="_blank" rel="noopener noreferrer" className="btn-press px-4 py-2.5 rounded-md text-xs font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center justify-center gap-1.5 cursor-pointer no-underline whitespace-nowrap self-stretch">
                      <ExternalLink size={12} /> View Details
                    </a>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Category 2: Channel & Measurement Reviews ── */}
          <div className="reveal-stagger">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#F5A623] text-xs font-bold tracking-[0.12em] uppercase">Channel &amp; Measurement Reviews</span>
              <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(245,166,35,0.3), transparent)' }}></span>
              <span className="text-[#8899AA] text-xs font-medium">2 Reviews</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ADD_ON_PACKAGES.slice(6, 8).map((pkg, i) => (
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
                      {pkg.tagline && <div className="text-[#00C6FF] text-xs font-medium mt-2 leading-snug">{pkg.tagline}</div>}
                  </div>
                  <div className="mb-3">
                    <div className="text-[#FF4444] text-xs font-semibold mb-1">Problem:</div>
                    <p className="text-[#8899AA] text-sm">{pkg.problem}</p>
                  </div>
                  <div>
                    <div className="text-[#00E676] text-xs font-semibold mb-1">Our Promise:</div>
                    <p className="text-[#F0F4F8] text-sm leading-relaxed"><PromiseText text={pkg.promise} /></p>
                  </div>
                  <div className="flex items-stretch gap-2 mt-4">
                    <a href={`/book?package=${pkg.route.replace('/', '')}`} className="addon-book-btn flex-1 items-center">
                      {pkg.cta ? `${pkg.cta} →` : `Book the ${pkg.name} →`}
                    </a>
                    <a href={`${basePath}${pkg.route}`} target="_blank" rel="noopener noreferrer" className="btn-press px-4 py-2.5 rounded-md text-xs font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.1)] hover:shadow-[0_0_20px_rgba(0,198,255,0.15)] inline-flex items-center justify-center gap-1.5 cursor-pointer no-underline whitespace-nowrap self-stretch">
                      <ExternalLink size={12} /> View Details
                    </a>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Part 3: Data & Intelligence Services */}
        <div id="part-3">
          <h3 className="text-white text-3xl sm:text-4xl font-extrabold mb-3 uppercase tracking-tight part-gold-heading sg-sk-text" ref={(el) => { if (el && !el.dataset.split) { el.dataset.split = '1'; const words = el.textContent.trim().split(/\s+/); el.innerHTML = words.map((w,i) => `<span class="sgw" style="transition-delay:${i*0.08}s">${w}</span>`).join(' '); } }}>Data Infrastructure &amp; Intelligence Systems</h3>
          <div className="h-0.5 w-24 mb-4" style={{ background: 'linear-gradient(90deg, #00C6FF 0%, #0072FF 50%, transparent 100%)', borderRadius: '2px' }}></div>
          <p className="text-white text-lg sm:text-xl font-semibold mb-3">Two Separate Ways to Strengthen Your E-Commerce Decision-Making</p>
          <p className="text-[#8899AA] text-sm leading-relaxed mb-10 pl-4 max-w-3xl" style={{ borderLeft: '3px solid rgba(148,163,184,0.4)' }}>
            Prepare the data for a specific analysis, or build a connected dashboard and intelligence system for ongoing visibility.
          </p>

          {/* ════════ SECTION 01: Data Preparation & Integration ════════ */}
          <div className="addon-card-wrapper marketing reveal-stagger mb-10">
            <div className="addon-card-inner">
            {/* Top accent bar */}
            <div className="h-1 mb-6 rounded-full" style={{ background: 'linear-gradient(90deg, #00C6FF 0%, #0072FF 60%, rgba(0,198,255,0.3) 100%)' }}></div>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', color: '#FFF', boxShadow: '0 4px 14px rgba(0,198,255,0.3)' }}>01</span>
                <div>
                  <div className="text-[#00C6FF] text-[11px] font-bold tracking-[0.12em] uppercase mb-0.5">Section 01</div>
                  <h4 className="text-white font-bold text-xl sm:text-2xl tracking-tight">Data Preparation &amp; Integration</h4>
                </div>
              </div>
              <p className="text-[#00C6FF] text-sm font-semibold mb-2">Prepare the Data Behind Better E-Commerce Decisions</p>
              <p className="text-[#A0B0C0] text-sm leading-relaxed mb-4 max-w-3xl">Before an audit or custom analysis can begin, the required business data needs to be collected, organized, cleaned, and validated. This service prepares the data required for a selected audit, Health Check, or custom analysis. We work with your existing platform data, files, and reports so the final dataset is ready for reliable analysis.</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                {/* Left column: Best for + Pricing */}
                <div className="lg:col-span-1">
                  {/* Best for */}
                  <div className="mb-6">
                    <div className="text-[#8899AA] text-xs uppercase tracking-wider font-semibold mb-3">Best For</div>
                    <ul className="space-y-2">
                      {['A selected specialist audit','E-Commerce Health Check','Custom business analysis','Businesses with scattered data','Businesses using multiple spreadsheets or exports','Clients who need analysis-ready data before starting a project'].map((item, ii) => (
                        <li key={ii} className="flex items-start gap-2 text-[#A0B0C0] text-xs leading-relaxed">
                          <span className="text-[#00C6FF] mt-0.5 shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Available options */}
                  <div>
                    <div className="text-[#8899AA] text-xs uppercase tracking-wider font-semibold mb-3">Available Options</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between px-3.5 py-3 rounded-lg transition-all duration-300 hover:translate-x-1 hover:border-[rgba(0,198,255,0.4)] hover:bg-[rgba(0,198,255,0.05)]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,198,255,0.15)', borderLeft: '2px solid rgba(0,198,255,0.4)' }}>
                        <span className="text-[#A0B0C0] text-xs font-medium">Specialist Audit Data Preparation</span>
                        <span className="gradient-text-gold text-xs font-bold">$99&ndash;$199</span>
                      </div>
                      <div className="flex items-center justify-between px-3.5 py-3 rounded-lg transition-all duration-300 hover:translate-x-1 hover:border-[rgba(0,198,255,0.4)] hover:bg-[rgba(0,198,255,0.05)]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,198,255,0.15)', borderLeft: '2px solid rgba(0,198,255,0.4)' }}>
                        <span className="text-[#A0B0C0] text-xs font-medium">Health Check Data Preparation</span>
                        <span className="gradient-text-gold text-xs font-bold">$299&ndash;$599</span>
                      </div>
                      <div className="flex items-center justify-between px-3.5 py-3 rounded-lg transition-all duration-300 hover:translate-x-1 hover:border-[rgba(0,198,255,0.4)] hover:bg-[rgba(0,198,255,0.05)]" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,198,255,0.15)', borderLeft: '2px solid rgba(0,198,255,0.4)' }}>
                        <span className="text-[#A0B0C0] text-xs font-medium">Custom Analysis Data Preparation</span>
                        <span className="gradient-text-gold text-xs font-bold">From $99</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column: Includes list */}
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] bg-[rgba(0,198,255,0.05)]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                      Up to 5 standard platforms or data sources
                    </span>
                  </div>
                  <div className="text-[#8899AA] text-xs uppercase tracking-wider font-semibold mb-3">Includes</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {['Data collection or connection','Required file and platform review','Basic data cleaning','Field mapping','Date and format standardization','Missing-data review','Duplicate-data review','Audit-ready data preparation','Data-quality notes'].map((item, ii) => (
                      <div key={ii} className="flex items-start gap-2 text-[#A0B0C0]">
                        <span className="text-[#00E676] mt-0.5 shrink-0">{FeatureCheckIcon}</span>
                        <span className="text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA + footer */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6 pt-6" style={{ borderTop: '1px solid rgba(0,198,255,0.12)' }}>
                <a href="/book?package=data-preparation-integration" className="btn-press inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-[#000000] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(0,198,255,0.5)] no-underline" style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 0 20px rgba(0,198,255,0.3)' }}>
                  Prepare My Data →
                </a>
                <a href={`${basePath}/data-preparation-integration`} target="_blank" rel="noopener noreferrer" className="btn-press inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-[#00C6FF] border border-[rgba(0,198,255,0.35)] bg-[rgba(0,198,255,0.04)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.12)] no-underline">
                  <ExternalLink size={14} /> View Details
                </a>
                <p className="text-[#6B7C8E] text-[11px] leading-relaxed sm:ml-auto sm:text-right sm:max-w-xs">One-time data preparation service. Audits, dashboards, recommendations, and automation are separate services.</p>
              </div>
            </div>
          </div>

          {/* ════════ Divider ════════ */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.3), transparent)' }}></div>
            <span className="text-[#8899AA] text-xs font-bold tracking-[0.15em] uppercase">Then</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.3), transparent)' }}></div>
          </div>

          {/* ════════ SECTION 02: E-Commerce Intelligence & Audit Automation ════════ */}
          <div className="addon-card-wrapper cro reveal-stagger">
            <div className="addon-card-inner">
            {/* Top accent bar */}
            <div className="h-1 mb-6 rounded-full" style={{ background: 'linear-gradient(90deg, #00E676 0%, #00C6FF 50%, #F5A623 100%)' }}></div>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, #00E676, #00B853)', color: '#FFF', boxShadow: '0 4px 14px rgba(0,230,118,0.3)' }}>02</span>
                <div>
                  <div className="text-[#00E676] text-[11px] font-bold tracking-[0.12em] uppercase mb-0.5">Section 02</div>
                  <h4 className="text-white font-bold text-xl sm:text-2xl tracking-tight">E-Commerce Intelligence &amp; Audit Automation</h4>
                </div>
              </div>
              <p className="text-[#00C6FF] text-sm font-semibold mb-2">Connect Your Data. Build a Clearer View of Your Business.</p>
              <p className="text-[#A0B0C0] text-sm leading-relaxed mb-4 max-w-3xl">This is a separate system-building service for businesses that want their data connected into a custom dashboard and may later add deeper business intelligence and automated monitoring. We connect the relevant data sources, organize the information, build the dashboard, and configure optional intelligence and automation layers according to your requirements.</p>

              {/* Best for + Timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                {/* Best for */}
                <div className="lg:col-span-1">
                  <div className="mb-6">
                    <div className="text-[#8899AA] text-xs uppercase tracking-wider font-semibold mb-3">Best For</div>
                    <ul className="space-y-2">
                      {['Businesses that want one connected view of their performance','Teams monitoring sales, marketing, customers, products, or profitability','Businesses tired of manually combining reports','Brands using multiple data platforms','Businesses that want deeper automated business signals','Clients who need recurring dashboard refreshes and technical alerts'].map((item, ii) => (
                        <li key={ii} className="flex items-start gap-2 text-[#A0B0C0] text-xs leading-relaxed">
                          <span className="text-[#00E676] mt-0.5 shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-[#00C6FF] border border-[rgba(0,198,255,0.3)] bg-[rgba(0,198,255,0.05)]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Timeline: 7&ndash;10 days
                  </div>
                </div>

                {/* 3 layers */}
                <div className="lg:col-span-2 space-y-3">
                  {/* Layer 1: Dashboard */}
                  <div className="rounded-xl p-4 transition-all duration-300 hover:translate-x-1 hover:shadow-lg" style={{ background: 'linear-gradient(145deg, rgba(0,198,255,0.06) 0%, rgba(0,198,255,0.02) 100%)', border: '1px solid rgba(0,198,255,0.20)', borderLeft: '3px solid #00C6FF', boxShadow: 'inset 0 1px 0 rgba(0,198,255,0.06)' }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,198,255,0.15)', color: '#00C6FF' }}>Layer 1</span>
                        <span className="text-white font-bold text-sm">Intelligence Dashboard</span>
                      </div>
                      <span className="gradient-text-gold text-sm font-bold">From $850</span>
                    </div>
                    <p className="text-[#8899AA] text-xs leading-relaxed ml-1">One connected custom dashboard with up to 5 standard data sources, data pipeline, KPI views, and technical handover.</p>
                  </div>
                  {/* Layer 2: Audit Intelligence */}
                  <div className="rounded-xl p-4 transition-all duration-300 hover:translate-x-1 hover:shadow-lg" style={{ background: 'linear-gradient(145deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.20)', borderLeft: '3px solid #00E676', boxShadow: 'inset 0 1px 0 rgba(0,230,118,0.06)' }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,230,118,0.15)', color: '#00E676' }}>Layer 2 &middot; Optional</span>
                        <span className="text-white font-bold text-sm">Audit Intelligence</span>
                      </div>
                      <span className="gradient-text-gold text-sm font-bold">From $650/module</span>
                    </div>
                    <p className="text-[#8899AA] text-xs leading-relaxed ml-1">Deeper calculations, classifications, insight summaries, and basic recommendations for marketing, retention, product, profitability, or operations.</p>
                  </div>
                  {/* Layer 3: Automation */}
                  <div className="rounded-xl p-4 transition-all duration-300 hover:translate-x-1 hover:shadow-lg" style={{ background: 'linear-gradient(145deg, rgba(245,166,35,0.06) 0%, rgba(245,166,35,0.02) 100%)', border: '1px solid rgba(245,166,35,0.20)', borderLeft: '3px solid #F5A623', boxShadow: 'inset 0 1px 0 rgba(245,166,35,0.06)' }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623' }}>Layer 3 &middot; Optional</span>
                        <span className="text-white font-bold text-sm">Automated Scheduling &amp; Alerts</span>
                      </div>
                      <span className="gradient-text-gold text-sm font-bold">From $200</span>
                    </div>
                    <p className="text-[#8899AA] text-xs leading-relaxed ml-1">Recurring refresh schedule, refresh monitoring, failed-refresh alerts, missing-data alerts, error notifications, and automated data validation.</p>
                  </div>
                </div>
              </div>

              {/* CTA + footer */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6 pt-6" style={{ borderTop: '1px solid rgba(0,198,255,0.12)' }}>
                <a href={`${basePath}/data-pipeline-dashboard-setup`} target="_blank" rel="noopener noreferrer" className="btn-press inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-[#000000] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(0,198,255,0.5)] no-underline" style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 0 20px rgba(0,198,255,0.3)' }}>
                  Explore Intelligence &amp; Automation →
                </a>
                <a href={`${basePath}/data-pipeline-dashboard-setup`} target="_blank" rel="noopener noreferrer" className="btn-press inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-[#00C6FF] border border-[rgba(0,198,255,0.35)] bg-[rgba(0,198,255,0.04)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.12)] no-underline">
                  <ExternalLink size={14} /> View Details
                </a>
                <p className="text-[#6B7C8E] text-[11px] leading-relaxed sm:ml-auto sm:text-right sm:max-w-xs">Dashboard setup, audit intelligence, and automated refresh are scoped as separate components within the same system.</p>
              </div>
            </div>
          </div>

        </div>

        {/* ── Custom Analytics & Insights (single card + CTA) ── */}
        <div id="part-4" className="mb-20 mt-20">
          <h3 className="text-white text-3xl sm:text-4xl font-extrabold mb-3 uppercase tracking-tight part-gold-heading sg-sk-text" ref={(el) => { if (el && !el.dataset.split) { el.dataset.split = '1'; const words = el.textContent.trim().split(/\s+/); el.innerHTML = words.map((w,i) => `<span class="sgw" style="transition-delay:${i*0.08}s">${w}</span>`).join(' '); } }}>Custom Analytics &amp; Decision Support</h3>
          <div className="h-0.5 w-24 mb-4" style={{ background: 'linear-gradient(90deg, #00C6FF 0%, #0072FF 50%, transparent 100%)', borderRadius: '2px' }}></div>
          <p className="text-white text-lg sm:text-xl font-semibold mb-3">Built Around Your Business Questions</p>
          <p className="text-[#8899AA] text-sm leading-relaxed mb-12 pl-4 max-w-3xl" style={{ borderLeft: '3px solid rgba(148,163,184,0.4)' }}>Not every business problem fits into a standard audit or dashboard. We build custom analyses, KPI systems, dashboards, and reporting solutions around your specific business question, data, and goals.</p>

          <div className="rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,198,255,0.20)] relative" style={{ background: 'linear-gradient(145deg, rgba(10,16,26,0.98) 0%, rgba(0,28,48,0.95) 40%, rgba(5,12,22,0.98) 100%)', border: '1px solid rgba(0,198,255,0.25)', boxShadow: '0 0 50px rgba(0,198,255,0.08), 0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,198,255,0.08)' }}>

            {/* Decorative glow orbs */}
            <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(0,198,255,0.12) 0%, transparent 60%)' }}></div>
            <div className="absolute bottom-0 left-0 w-56 h-56 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 80%, rgba(0,230,118,0.08) 0%, transparent 60%)' }}></div>

            {/* Top accent bar — tri-color gradient */}
            <div className="h-1 relative z-10" style={{ background: 'linear-gradient(90deg, #00C6FF 0%, #00E676 50%, #F5A623 100%)' }}></div>

            <div className="p-8 sm:p-10 relative z-10">

              {/* 6 services preview — 3 column grid with icons */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-7">
                {[
                  { n: '01', t: 'Custom Business Analysis', c: '#00C6FF', bg: 'rgba(0,198,255,0.10)', icon: 'M9 21h6m-3-3v3M5 3h14a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1zm3 5h8M8 11h8M8 15h5' },
                  { n: '02', t: 'Custom E-Commerce Analysis', c: '#00E676', bg: 'rgba(0,230,118,0.10)', icon: 'M3 3h18v6H3V3zm0 10h18v8H3v-8zm4 4h2m4 0h6' },
                  { n: '03', t: 'Custom Dashboard', c: '#F5A623', bg: 'rgba(245,166,35,0.10)', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm1 1v5h12V6H5zm0 7v6h5v-6H5zm7 0v6h5v-6h-5z' },
                  { n: '04', t: 'Custom KPI & Reporting System', c: '#00C6FF', bg: 'rgba(0,198,255,0.10)', icon: 'M9 17v-6m3 6V7m3 10v-4M5 21h14a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v16a1 1 0 001 1z' },
                  { n: '05', t: 'Custom Data Analysis', c: '#00E676', bg: 'rgba(0,230,118,0.10)', icon: 'M4 7l4-4 4 4M4 17l4 4 4-4M20 7l-4-4-4 4m8 14l-4 4-4-4M12 3v18' },
                  { n: '06', t: 'Conversion & Experiment Analysis', c: '#F5A623', bg: 'rgba(245,166,35,0.10)', icon: 'M7 4l5 5 5-5M7 20l5-5 5 5M12 9v6' },
                ].map((s, si) => (
                  <div key={si} className="group flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 hover:translate-x-1 hover:shadow-lg cursor-default" style={{ background: s.bg, border: '1px solid rgba(255,255,255,0.06)', borderLeft: `3px solid ${s.c}` }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110" style={{ background: s.c === '#00C6FF' ? 'rgba(0,198,255,0.12)' : s.c === '#00E676' ? 'rgba(0,230,118,0.12)' : 'rgba(245,166,35,0.12)', border: `1px solid ${s.c}40` }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={s.c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold tracking-wider mb-0.5" style={{ color: s.c }}>SERVICE {s.n}</div>
                      <div className="text-[#D0DCE8] text-[12.5px] font-semibold leading-tight">{s.t}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stat strip + CTA side by side */}
              <div className="flex flex-col lg:flex-row items-stretch gap-6 pt-6" style={{ borderTop: '1px solid rgba(0,198,255,0.12)' }}>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:gap-x-8 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-[#00C6FF]" style={{ fontFamily: 'Manrope, sans-serif' }}>6</span>
                    <span className="text-[#8899AA] text-xs leading-tight">Custom<br/>Services</span>
                  </div>
                  <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.08)' }}></div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-[#00E676]" style={{ fontFamily: 'Manrope, sans-serif' }}>4</span>
                    <span className="text-[#8899AA] text-xs leading-tight">Simple<br/>Steps</span>
                  </div>
                  <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.08)' }}></div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-[#F5A623]" style={{ fontFamily: 'Manrope, sans-serif' }}>100%</span>
                    <span className="text-[#8899AA] text-xs leading-tight">Tailored<br/>to You</span>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a href="#contact" className="btn-press inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-[#000000] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,198,255,0.5)] no-underline" style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 0 24px rgba(0,198,255,0.35)' }}>
                    Get Custom Analytics <ArrowRight size={16} />
                  </a>
                  <a href={`${basePath}/custom-analytics-insights`} target="_blank" rel="noopener noreferrer" className="btn-press inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#00C6FF] border border-[rgba(0,198,255,0.35)] bg-[rgba(0,198,255,0.04)] transition-all duration-300 hover:bg-[rgba(0,198,255,0.12)] hover:border-[rgba(0,198,255,0.5)] no-underline">
                    <ExternalLink size={16} /> View Details
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* CaseStudies2Section removed — all 6 case studies now render in the
   single #case-studies section in a 3-column compact grid. */
const processSectionData = {
  kicker: "The Engagement Flow",
  title: "How We Work Together",
  description:
    "From the first discovery call to ongoing monitoring — five steps, zero code on your side.",
  steps: [
    {
      number: "1",
      title: "Discovery & Strategy",
      description:
        "You book a call, we assess your business needs, and you select the analytics package that fits your store (Starter, Growth, or Advanced). No guessing, we map exactly which platforms hold your data.",
      image: `${basePath}/images/process-2.jpg`,
    },
    {
      number: "2",
      title: "The Engineering Foundation",
      description:
        "This is the behind-the-scenes engineering most analysts skip. We build your cloud infrastructure and connect your APIs. EXTRACT: We securely pull raw data from Shopify, GA4, Meta Ads, Google Ads, and Klaviyo. CLEAN: We align currencies, date formats, and timezones so everything speaks the same language. MERGE: We combine all platforms into one clean master table, your single source of truth. CONNECT: We pipe the unified data directly into the dashboard. You don't touch a single line of code.",
      image: `${basePath}/images/process-4b.jpg`,
    },
    {
      number: "3",
      title: "The Deep Analysis",
      description:
        "With clean, reliable data flowing into our systems, the detective work begins. We run the RFM segmentation models, cohort analyses, funnel audits, true profit margin deep-dives, and churn predictions ETC. We don't just look at what happened, we uncover why it happened.",
      image: `${basePath}/images/process-4.jpg`,
    },
    {
      number: "4",
      title: "The Delivery & Strategy Call",
      description:
        "You don't receive a data dump. You receive a plain-language Executive PDF, a visual dashboard, and a prioritized action plan. We hop on a strategy call (30 to 90 minutes, depending on your package) where I explain every finding and tell you exactly what to fix first.",
      image: `${basePath}/images/process-5.jpg`,
    },
    {
      number: "5",
      title: "Execution & Monitoring (Ongoing)",
      description:
        "You implement the fixes, like pausing losing ads, flipping budgets, or sending win-back emails. If you partner with us on an ongoing basis, we monitor your live dashboard and send proactive anomaly alerts so today's insights never go stale.",
      image: `${basePath}/images/process-6b.jpg`,
    },
  ],
  quote: {
    text: "The Health Check showed me something that destroyed and rebuilt me at the same time: I wasn't failing because of bad products. I was failing because I had no idea what was actually happening in my own business.",
    author: "Marcus T., NOIRE Collective",
  },
};

function ProcessSection() {
  const sectionRef = useScrollReveal();
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-white py-16 sm:py-20"
      ref={sectionRef}
    >
      <div className="container-site">
        {/* Section heading */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ background: '#f2f0fe', color: '#6f3ede' }}
          >
            {processSectionData.kicker}
          </span>
          <h2
            id="process-heading"
            className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl"
            style={{ color: '#1f1f1f' }}
          >
            {processSectionData.title}
          </h2>
          <p
            className="mx-auto max-w-2xl text-base leading-relaxed"
            style={{ color: '#4d4d4d' }}
          >
            {processSectionData.description}
          </p>
        </div>

        {/* 5 steps: alternating image/text rows + purple number badge */}
        <div className="mt-14 flex flex-col gap-14 sm:mt-20 sm:gap-20">
          {processSectionData.steps.map((step, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={step.number}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                {/* Image side */}
                <div className={flip ? 'relative lg:order-2' : 'relative'}>
                  <div
                    className="relative overflow-hidden rounded-[5px]"
                    style={{ boxShadow: '0 18px 44px rgba(111,62,222,0.14)' }}
                  >
                    <Image
                      src={step.image}
                      alt=""
                      width={640}
                      height={420}
                      className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                    />
                  </div>
                  {/* Purple floating number badge */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-6 left-6 inline-flex h-14 w-14 items-center justify-center rounded-full text-xl font-semibold text-white"
                    style={{
                      background: '#6f3ede',
                      boxShadow: '0 10px 24px rgba(111,62,222,0.4)',
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Text side */}
                <div className={flip ? 'lg:order-1' : undefined}>
                  <span
                    className="text-sm font-semibold uppercase tracking-[0.18em]"
                    style={{ color: '#6f3ede' }}
                  >
                    Step {step.number}
                  </span>
                  <h3
                    className="mt-2 text-2xl font-semibold sm:text-[28px]"
                    style={{ color: '#1f1f1f' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-4 text-base leading-relaxed"
                    style={{ color: '#4d4d4d' }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Founder quote block */}
        <figure
          className="mx-auto mt-14 max-w-3xl rounded-[5px] p-8 text-center sm:mt-20 sm:p-10"
          style={{ background: '#f2f0fe' }}
        >
          <Quote className="mx-auto h-8 w-8" style={{ color: '#6f3ede' }} aria-hidden="true" />
          <blockquote
            className="mt-4 text-lg font-medium leading-relaxed"
            style={{ color: '#1f1f1f' }}
          >
            &ldquo;{processSectionData.quote.text}&rdquo;
          </blockquote>
          <figcaption
            className="mt-4 text-sm font-semibold"
            style={{ color: '#6f3ede' }}
          >
            &mdash; {processSectionData.quote.author}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] lg:hidden"
      style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 -4px 20px rgba(0,198,255,0.30)' }}>
      <a href="#contact" className="btn-press flex items-center justify-center h-14 text-[#000000] font-bold text-sm gap-2">
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

  const scrollToFooter = useCallback(() => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback: scroll to the very bottom of the page
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Scroll Progress */}
      <div id="scroll-progress" style={{ width: `${progress}%` }} />

      <Navbar />
      <HeroSection />
      <WhyDataSection />
      <PlatformsShowcaseSection />
      <QuickProofSection />
      <DashboardShowcaseSection />
      <WhatWeDoSection />
      <PrinciplesSection />
      <WhyDifferentSection />
      <ServicesSection />
      <CaseStudiesSection />
      {/* CaseStudies2Section removed — all 6 cards now in #case-studies */}
      <TechnicalPortfolioSection />
      <TestimonialsSection />
      <ProcessSection />
      <TechStackSection />
      <FaqSection />
      <CtaBanner />
      <SiteFooter />
      <MobileStickyBar />

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        aria-label="Back to top"
      >
        <ChevronDown size={20} style={{ transform: 'rotate(180deg)' }} />
      </button>

      {/* Back to Footer — matching floating button below Back-to-Top */}
      <button
        onClick={scrollToFooter}
        className={`back-to-footer ${showBackToTop ? 'visible' : ''}`}
        aria-label="Back to footer"
      >
        <ChevronDown size={20} />
      </button>

      {/* MozIntelligence AI Chatbot */}
      <ChatbotWidget />
    </main>
  );
}
