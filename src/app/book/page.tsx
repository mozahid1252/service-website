'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, Shield, Clock, DollarSign, Star } from 'lucide-react';

const SERVICE_PACKAGES = [
  { label: '─ Part 1: Core E-Commerce Packages ─', options: ['E-Commerce Health Check', 'Revenue Growth Accelerator', 'Data-Driven Growth System', 'Analytics Partner Retainer'] },
  { label: '─ Part 2: Specialized Add-On Packages ─', options: ['Marketing Spend Audit', 'Customer Retention Audit', 'Product Portfolio Audit', 'CRO Audit', 'Profitability Audit', 'Operations Efficiency Audit', 'Meta Ads Performance Audit'] },
  { label: '─ Part 3: Data Setup & Infrastructure ─', options: ['Basic Setup', 'Full Pipeline Setup', 'Full Pipeline + Automation'] },
  { label: '─ Other ─', options: ['Custom Analytics Setup', 'Not sure yet (Need advice)'] },
];

const REVENUE_RANGES = ['Below $1k / Mo', '$1k – $10k / Mo', '$10k – $20k / Mo', '$20k – $40k / Mo', '$40k – $60k / Mo', '$60k – $100k / Mo', '$100k+ / Mo'];

const PACKAGE_MAP: Record<string, { name: string; price: string; timeline: string; desc: string }> = {
  'marketing-spend-audit': { name: 'Marketing Spend Audit', price: '$300–$600', timeline: '7–10 Days', desc: 'Find wasted ad spend, identify true ROAS, and reallocate your budget for maximum profit.' },
};

interface FormData { full_name: string; email: string; phone: string; website_url: string; service_package: string; monthly_revenue: string; preferred_time: string; additional_notes: string; }
interface FormErrors { [key: string]: string }
const INITIAL_FORM: FormData = { full_name: '', email: '', phone: '', website_url: '', service_package: '', monthly_revenue: '', preferred_time: '', additional_notes: '' };

function BookingPageContent() {
  const searchParams = useSearchParams();
  const packageSlug = searchParams.get('package') || '';
  const packageInfo = PACKAGE_MAP[packageSlug] || PACKAGE_MAP['marketing-spend-audit'];

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => { if (packageInfo.name) setFormData(prev => ({ ...prev, service_package: packageInfo.name })); }, [packageInfo.name]);

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
      const response = await fetch('/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, source_package: packageInfo.name }) });
      const data = await response.json();
      if (data.success) setSubmitStatus('success'); else throw new Error(data.error || 'Submission failed');
    } catch (error) { console.error('Booking error:', error); setSubmitStatus('error'); } finally { setIsSubmitting(false); }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center" style={{ border: '1px solid #E2E8F0' }}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: '#F0FDF4' }}>
            <CheckCircle2 size={40} className="text-[#22C55E]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-3">Booking Request Received</h1>
          <p className="text-[#64748B] text-base mb-2">Thank you! We've successfully received your {packageInfo.name} request.</p>
          <p className="text-[#64748B] text-sm mb-8">Mozahidul will personally review your submission and contact you within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/" className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)' }}>Return to Home</a>
            <button onClick={() => { setSubmitStatus('idle'); setFormData(INITIAL_FORM); setFormData(prev => ({ ...prev, service_package: packageInfo.name })); }} className="px-6 py-3 rounded-xl text-sm font-semibold text-[#0072FF] transition-all hover:bg-[#F0F7FF]" style={{ border: '1px solid #BFDBFE' }}>Book Another Service</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2"><span className="text-lg font-bold text-[#0F172A]">MozIntelligence</span></a>
          <a href="/" className="text-sm text-[#64748B] hover:text-[#0072FF] transition-colors">← Back to Home</a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#0072FF] bg-[#EFF6FF] mb-4">{packageInfo.name}</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4 leading-tight">{packageInfo.desc}</h1>
            <p className="text-[#64748B] text-base mb-8 leading-relaxed">Get a deep-dive analysis that reveals exactly where your ad spend is working—and where it's quietly draining your profit.</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #E2E8F0' }}>
                <div className="flex items-center gap-2 mb-2"><DollarSign size={16} className="text-[#0072FF]" /><span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Price</span></div>
                <div className="text-2xl font-bold text-[#0F172A]">{packageInfo.price}</div>
              </div>
              <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #E2E8F0' }}>
                <div className="flex items-center gap-2 mb-2"><Clock size={16} className="text-[#0072FF]" /><span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Timeline</span></div>
                <div className="text-2xl font-bold text-[#0F172A]">{packageInfo.timeline}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 mb-6" style={{ border: '1px solid #E2E8F0' }}>
              <h3 className="text-sm font-bold text-[#0F172A] mb-4">What's Included</h3>
              <ul className="space-y-3">
                {['5 Performance Analyses', 'True ROAS vs Reported', 'Budget Reallocation Plan', 'Campaign Scorecard', '45-min Strategy Call', '2 Weeks Email Support'].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#475569]"><CheckCircle2 size={16} className="text-[#22C55E] flex-shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#64748B]"><Shield size={16} className="text-[#0072FF]" />100% Data Privacy — Read-only API access</div>
              <div className="flex items-center gap-3 text-sm text-[#64748B]"><Star size={16} className="text-[#0072FF]" />4.9/5 rating from 100+ projects delivered</div>
            </div>
            <div className="mt-6 bg-white rounded-xl p-5" style={{ border: '1px solid #E2E8F0' }}>
              <p className="text-sm text-[#475569] italic leading-relaxed mb-3">"The Health Check showed me something that destroyed and rebuilt me at the same time: I wasn't failing because of bad products. I was failing because I had no idea what was actually happening in my own business."</p>
              <p className="text-xs font-medium text-[#64748B]">— Marcus T., NOIRE Collective</p>
            </div>
          </div>

          {/* RIGHT COLUMN — Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg" style={{ border: '1px solid #E2E8F0' }}>
              <h2 className="text-xl font-bold text-[#0F172A] mb-1">Book Your Audit</h2>
              <p className="text-sm text-[#64748B] mb-6">Fill in your details and we'll get back to you within 24 hours.</p>
              {submitStatus === 'error' && (
                <div className="mb-4 p-3 rounded-lg flex items-center gap-2 text-sm bg-[#FEF2F2]" style={{ border: '1px solid #FECACA' }}>
                  <AlertCircle size={16} className="text-[#EF4444] flex-shrink-0" /><span className="text-[#EF4444]">Something went wrong while submitting your request. Please try again.</span>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">Full Name <span className="text-[#EF4444]">*</span></label>
                    <input type="text" value={formData.full_name} onChange={e => handleChange('full_name', e.target.value)} placeholder="e.g., John Smith" className="w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0072FF] focus:bg-white transition-all" style={{ borderColor: errors.full_name ? '#EF4444' : '#E2E8F0' }} />
                    {errors.full_name && <p className="text-[#EF4444] text-xs mt-1">{errors.full_name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">Email Address <span className="text-[#EF4444]">*</span></label>
                    <input type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="e.g., john@company.com" className="w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0072FF] focus:bg-white transition-all" style={{ borderColor: errors.email ? '#EF4444' : '#E2E8F0' }} />
                    {errors.email && <p className="text-[#EF4444] text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">Phone / WhatsApp</label>
                    <input type="tel" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="e.g., +1 234 567 890" className="w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0072FF] focus:bg-white transition-all" style={{ border: '1px solid #E2E8F0' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">Website / Store URL <span className="text-[#EF4444]">*</span></label>
                    <input type="url" value={formData.website_url} onChange={e => handleChange('website_url', e.target.value)} placeholder="e.g., https://yourstore.com" className="w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0072FF] focus:bg-white transition-all" style={{ borderColor: errors.website_url ? '#EF4444' : '#E2E8F0' }} />
                    {errors.website_url && <p className="text-[#EF4444] text-xs mt-1">{errors.website_url}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1.5">Service Package <span className="text-[#EF4444]">*</span></label>
                  <select value={formData.service_package} onChange={e => handleChange('service_package', e.target.value)} className="w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:border-[#0072FF] transition-all" style={{ borderColor: errors.service_package ? '#EF4444' : '#E2E8F0' }}>
                    <option value="">Select a service package...</option>
                    {SERVICE_PACKAGES.map((g, i) => (<optgroup key={i} label={g.label}>{g.options.map(p => <option key={p} value={p}>{p}</option>)}</optgroup>))}
                  </select>
                  {errors.service_package && <p className="text-[#EF4444] text-xs mt-1">{errors.service_package}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">Estimated Monthly Revenue</label>
                    <select value={formData.monthly_revenue} onChange={e => handleChange('monthly_revenue', e.target.value)} className="w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:border-[#0072FF] transition-all" style={{ border: '1px solid #E2E8F0' }}>
                      <option value="">Select range...</option>
                      {REVENUE_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1.5">Preferred Time for Call</label>
                    <input type="text" value={formData.preferred_time} onChange={e => handleChange('preferred_time', e.target.value)} placeholder="e.g., Weekdays afternoon" className="w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0072FF] focus:bg-white transition-all" style={{ border: '1px solid #E2E8F0' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1.5">Additional Notes / Anything else</label>
                  <textarea value={formData.additional_notes} onChange={e => handleChange('additional_notes', e.target.value)} placeholder="Tell us about your specific needs or questions..." rows={3} className="w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0072FF] focus:bg-white transition-all resize-none" style={{ border: '1px solid #E2E8F0' }} />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100" style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 4px 15px rgba(0,114,255,0.3)' }}>
                  {isSubmitting ? (<><Loader2 size={18} className="animate-spin" /> Submitting...</>) : (<>Submit Booking Request <ArrowRight size={16} /></>)}
                </button>
                <p className="text-center text-xs text-[#94A3B8]">🔒 Your information is secure and will never be shared.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"><Loader2 className="animate-spin text-[#0072FF]" size={32} /></div>}>
      <BookingPageContent />
    </Suspense>
  );
}
