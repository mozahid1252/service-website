'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, Shield, Zap, Lock, Check, TrendingUp, DollarSign, Users, Target } from 'lucide-react';

const SERVICE_PACKAGES = [
  { label: '─ Part 1: Core E-Commerce Packages ─', options: ['E-Commerce Health Check', 'Revenue Growth Accelerator', 'Data-Driven Growth System', 'Analytics Partner Retainer'] },
  { label: '─ Part 2: Specialized Add-On Packages ─', options: ['Marketing Spend Audit', 'Customer Retention Audit', 'Product Portfolio Audit', 'CRO Audit', 'Profitability Audit', 'Operations Efficiency Audit', 'Meta Ads Performance Audit'] },
  { label: '─ Part 3: Data Setup & Infrastructure ─', options: ['Basic Setup', 'Full Pipeline Setup', 'Full Pipeline + Automation'] },
  { label: '─ Other ─', options: ['Custom Analytics Setup', 'Not sure yet (Need advice)'] },
];

const REVENUE_RANGES = ['Below $1k / Mo', '$1k – $10k / Mo', '$10k – $20k / Mo', '$20k – $40k / Mo', '$40k – $60k / Mo', '$60k – $100k / Mo', '$100k+ / Mo'];

const PACKAGE_MAP: Record<string, string> = {
  'marketing-spend-audit': 'Marketing Spend Audit',
};

interface FormData { full_name: string; email: string; phone: string; website_url: string; service_package: string; monthly_revenue: string; preferred_time: string; additional_notes: string; }
interface FormErrors { [key: string]: string }
const INITIAL_FORM: FormData = { full_name: '', email: '', phone: '', website_url: '', service_package: '', monthly_revenue: '', preferred_time: '', additional_notes: '' };

// ── Floating Analytics Card data (decorative) ──
const FLOAT_CARDS = [
  { icon: TrendingUp, label: 'Revenue Growth', value: '+23%', color: '#22C55E', top: '8%', side: 'left', delay: '0s' },
  { icon: Target, label: 'ROAS', value: '4.8×', color: '#0EA5FF', top: '28%', side: 'left', delay: '0.5s' },
  { icon: Users, label: 'Customer LTV', value: '+$126', color: '#8B5CF6', top: '52%', side: 'left', delay: '1s' },
  { icon: DollarSign, label: 'CAC', value: '↓18%', color: '#F59E0B', top: '72%', side: 'left', delay: '1.5s' },
  { icon: CheckCircle2, label: 'Forecast Accuracy', value: '94%', color: '#22C55E', top: '12%', side: 'right', delay: '0.3s' },
  { icon: Zap, label: 'Auto Reports', value: '24/7', color: '#0EA5FF', top: '36%', side: 'right', delay: '0.8s' },
  { icon: Shield, label: 'Data Privacy', value: '100%', color: '#8B5CF6', top: '60%', side: 'right', delay: '1.3s' },
];

// ── Input style helper ──
const inputClass = "w-full bg-white border rounded-2xl px-5 h-[58px] text-[16px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0EA5FF] focus:ring-4 focus:ring-[#0EA5FF]/10 transition-all duration-300 hover:shadow-md";
const labelClass = "block text-[14px] font-medium text-[#334155] mb-2";

function BookingPageContent() {
  const searchParams = useSearchParams();
  const packageSlug = searchParams.get('package') || '';
  const defaultPackage = PACKAGE_MAP[packageSlug] || '';

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => { if (defaultPackage) setFormData(prev => ({ ...prev, service_package: defaultPackage })); }, [defaultPackage]);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.full_name.trim()) e.full_name = 'Full name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) e.email = 'Please enter a valid email';
    if (!formData.website_url.trim()) e.website_url = 'Website URL is required';
    else if (!/^https?:\/\/.+\..+/.test(formData.website_url.trim())) e.website_url = 'Please enter a valid URL';
    if (!formData.service_package) e.service_package = 'Please select a service package';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => { setFormData(prev => ({ ...prev, [field]: value })); if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' })); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (isSubmitting) return; if (!validate()) return;
    setIsSubmitting(true); setSubmitStatus('idle');
    try {
      const response = await fetch('/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, source_package: defaultPackage }) });
      const data = await response.json();
      if (data.success) setSubmitStatus('success'); else throw new Error(data.error || 'Submission failed');
    } catch (error) { console.error('Booking error:', error); setSubmitStatus('error'); } finally { setIsSubmitting(false); }
  };

  // ── Success state (same logic, premium UI) ──
  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)' }}>
        {/* Background blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: '#0EA5FF' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: '#2563EB' }} />
        <div className="relative max-w-lg w-full bg-white rounded-3xl p-8 sm:p-12 text-center" style={{ border: '1px solid #E2E8F0', boxShadow: '0 25px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5)' }}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)' }}>
            <CheckCircle2 size={40} className="text-[#22C55E]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-3">Booking Request Received</h1>
          <p className="text-[#64748B] text-base mb-2">Thank you! We've successfully received your booking request.</p>
          <p className="text-[#64748B] text-sm mb-8">Mozahidul will personally review your submission and contact you within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/" className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #0EA5FF, #2563EB)', boxShadow: '0 4px 15px rgba(37,99,235,0.3)' }}>Return to Home</a>
            <button onClick={() => { setSubmitStatus('idle'); setFormData(INITIAL_FORM); if (defaultPackage) setFormData(prev => ({ ...prev, service_package: defaultPackage })); }} className="px-6 py-3 rounded-xl text-sm font-semibold text-[#2563EB] transition-all hover:bg-[#EFF6FF]" style={{ border: '1px solid #BFDBFE' }}>Book Another Service</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 50%, #EFF6FF 100%)' }}>
      {/* ── Background decorations ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-8 blur-3xl" style={{ background: 'radial-gradient(circle, #0EA5FF, transparent 70%)' }} />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full opacity-6 blur-3xl" style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full opacity-5 blur-3xl" style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      {/* ── Floating analytics cards (decorative, hidden on mobile) ── */}
      <div className="hidden xl:block fixed inset-0 pointer-events-none z-0">
        {FLOAT_CARDS.map((card, i) => {
          const Icon = card.icon;
          const sideStyle = card.side === 'left' ? { left: '3%' } : { right: '3%' };
          return (
            <div key={i} className="absolute w-44 animate-float" style={{ ...sideStyle, top: card.top, animationDelay: card.delay }}>
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4" style={{ border: '1px solid rgba(226,232,240,0.6)', boxShadow: '0 8px 25px rgba(0,0,0,0.04)', opacity: 0.85 }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${card.color}15` }}>
                    <Icon size={14} style={{ color: card.color }} />
                  </div>
                  <span className="text-[11px] font-medium text-[#64748B]">{card.label}</span>
                </div>
                <div className="text-xl font-bold" style={{ color: card.color }}>{card.value}</div>
                {/* Mini bar chart decoration */}
                <div className="flex items-end gap-1 mt-2 h-6">
                  {[40, 60, 35, 75, 55, 85, 65].map((h, j) => (
                    <div key={j} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: `${card.color}30` }} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Navigation (sticky, white, blurred) ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0]" style={{ height: '68px' }}>
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            <Image src="/images/logo.png" alt="MozIntelligence Logo" width={38} height={38} className="rounded-xl" />
            <span className="text-lg font-bold text-[#0F172A] tracking-tight">MozIntelligence</span>
          </a>
          <a href="/" className="text-sm font-medium text-[#64748B] hover:text-[#2563EB] transition-colors flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-[#F1F5F9]">
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-6 pt-12 pb-16">
        {/* ── Hero section ── */}
        <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-in">
          <h1 className="text-[36px] sm:text-[42px] font-bold text-[#0F172A] mb-3 leading-tight tracking-tight">
            Book Your Free Strategy Call
          </h1>
          <p className="text-[17px] sm:text-[18px] text-[#64748B] leading-relaxed">
            Fill in a few details and we'll review your business goals, identify opportunities, and get back to you within 24 hours.
          </p>
          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6">
            {[
              { icon: Check, text: 'Response within 24 Hours' },
              { icon: Shield, text: 'No Sales Pressure' },
              { icon: Lock, text: '100% Confidential' },
              { icon: CheckCircle2, text: 'Secure Submission' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-1.5 text-[13px] font-medium text-[#475569]">
                  <Icon size={14} className="text-[#22C55E]" />
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Booking Card ── */}
        <div className="w-full max-w-[760px]">
          <div
            className="bg-white rounded-3xl p-8 sm:p-12 animate-slide-up"
            style={{
              border: '1px solid #E2E8F0',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5), 0 0 40px rgba(14,165,255,0.04)',
            }}
          >
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm bg-[#FEF2F2] animate-fade-in" style={{ border: '1px solid #FECACA' }}>
                <AlertCircle size={18} className="text-[#EF4444] flex-shrink-0" />
                <span className="text-[#EF4444] font-medium">Something went wrong while submitting your request. Please try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Full Name <span className="text-[#EF4444]">*</span></label>
                  <input type="text" value={formData.full_name} onChange={e => handleChange('full_name', e.target.value)} placeholder="e.g., John Smith"
                    className={inputClass} style={{ borderColor: errors.full_name ? '#EF4444' : '#E2E8F0' }} />
                  {errors.full_name && <p className="text-[#EF4444] text-xs mt-1.5 ml-1">{errors.full_name}</p>}
                </div>
                <div>
                  <label className={labelClass}>Email Address <span className="text-[#EF4444]">*</span></label>
                  <input type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="e.g., john@company.com"
                    className={inputClass} style={{ borderColor: errors.email ? '#EF4444' : '#E2E8F0' }} />
                  {errors.email && <p className="text-[#EF4444] text-xs mt-1.5 ml-1">{errors.email}</p>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Phone / WhatsApp</label>
                  <input type="tel" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="e.g., +1 234 567 890"
                    className={inputClass} style={{ borderColor: '#E2E8F0' }} />
                </div>
                <div>
                  <label className={labelClass}>Website / Store URL <span className="text-[#EF4444]">*</span></label>
                  <input type="url" value={formData.website_url} onChange={e => handleChange('website_url', e.target.value)} placeholder="e.g., https://yourstore.com"
                    className={inputClass} style={{ borderColor: errors.website_url ? '#EF4444' : '#E2E8F0' }} />
                  {errors.website_url && <p className="text-[#EF4444] text-xs mt-1.5 ml-1">{errors.website_url}</p>}
                </div>
              </div>

              {/* Service Package */}
              <div>
                <label className={labelClass}>Service Package <span className="text-[#EF4444]">*</span></label>
                <select value={formData.service_package} onChange={e => handleChange('service_package', e.target.value)}
                  className={`${inputClass} cursor-pointer appearance-none bg-no-repeat`}
                  style={{
                    borderColor: errors.service_package ? '#EF4444' : '#E2E8F0',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 20px center',
                    paddingRight: '48px',
                  }}>
                  <option value="">Select a service package...</option>
                  {SERVICE_PACKAGES.map((g, i) => (
                    <optgroup key={i} label={g.label}>
                      {g.options.map(p => <option key={p} value={p}>{p}</option>)}
                    </optgroup>
                  ))}
                </select>
                {errors.service_package && <p className="text-[#EF4444] text-xs mt-1.5 ml-1">{errors.service_package}</p>}
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Estimated Monthly Revenue</label>
                  <select value={formData.monthly_revenue} onChange={e => handleChange('monthly_revenue', e.target.value)}
                    className={`${inputClass} cursor-pointer appearance-none`}
                    style={{
                      borderColor: '#E2E8F0',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 20px center',
                      paddingRight: '48px',
                    }}>
                    <option value="">Select range...</option>
                    {REVENUE_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Preferred Time for Call</label>
                  <input type="text" value={formData.preferred_time} onChange={e => handleChange('preferred_time', e.target.value)} placeholder="e.g., Weekdays afternoon"
                    className={inputClass} style={{ borderColor: '#E2E8F0' }} />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className={labelClass}>Additional Notes / Anything else</label>
                <textarea value={formData.additional_notes} onChange={e => handleChange('additional_notes', e.target.value)} placeholder="Tell us about your specific needs or questions..." rows={5}
                  className="w-full bg-white border rounded-2xl px-5 py-4 text-[16px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0EA5FF] focus:ring-4 focus:ring-[#0EA5FF]/10 transition-all duration-300 hover:shadow-md resize-y"
                  style={{ borderColor: '#E2E8F0', minHeight: '120px' }} />
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 h-[60px] rounded-2xl text-[17px] font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-60 disabled:hover:scale-100"
                style={{ background: 'linear-gradient(135deg, #0EA5FF, #2563EB)', boxShadow: '0 8px 25px rgba(37,99,235,0.25)' }}>
                {isSubmitting ? (<><Loader2 size={20} className="animate-spin" /> Submitting...</>) : (<>Submit Booking Request <ArrowRight size={18} /></>)}
              </button>
            </form>
          </div>

          {/* ── Bottom trust strip ── */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: Lock, text: 'Secure Submission' },
              { icon: Zap, text: 'Response within 24 Hours' },
              { icon: Check, text: 'GDPR Friendly' },
              { icon: Shield, text: 'We Never Share Your Data' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2 text-[13px] font-medium text-[#64748B]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#EFF6FF' }}>
                    <Icon size={12} className="text-[#2563EB]" />
                  </div>
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #F8FAFC, #EFF6FF)' }}><Loader2 className="animate-spin text-[#2563EB]" size={32} /></div>}>
      <BookingPageContent />
    </Suspense>
  );
}
