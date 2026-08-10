'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, ChevronLeft } from 'lucide-react';

const SERVICE_PACKAGES = [
  { label: '─ Part 1: Core E-Commerce Packages ─', options: ['E-Commerce Health Check', 'Revenue Growth Accelerator', 'Data-Driven Growth System', 'Analytics Partner Retainer'] },
  { label: '─ Part 2: Specialized Add-On Packages ─', options: ['Marketing Spend Audit', 'Customer Retention Audit', 'Product Portfolio Audit', 'CRO Audit', 'Profitability Audit', 'Operations Efficiency Audit', 'Meta Ads Performance Audit'] },
  { label: '─ Part 3: Data Setup & Infrastructure ─', options: ['Basic Setup', 'Full Pipeline Setup', 'Full Pipeline + Automation'] },
  { label: '─ Other ─', options: ['Custom Analytics Setup', 'Not sure yet (Need advice)'] },
];

const REVENUE_RANGES = ['Below $1k / Mo', '$1k – $10k / Mo', '$10k – $20k / Mo', '$20k – $40k / Mo', '$40k – $60k / Mo', '$60k – $100k / Mo', '$100k+ / Mo'];

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Armenia','Australia','Austria','Azerbaijan',
  'Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia',
  'Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Canada',
  'Cape Verde','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica','Croatia',
  'Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador',
  'Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia',
  'Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti',
  'Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy',
  'Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia',
  'Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia',
  'Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco',
  'Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand',
  'Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Panama',
  'Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda',
  'Saint Kitts and Nevis','Saint Lucia','Samoa','San Marino','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore',
  'Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan',
  'Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo',
  'Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom',
  'United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
];

const PACKAGE_MAP: Record<string, string> = {
  'e-commerce-health-check': 'E-Commerce Health Check',
  'health-check': 'E-Commerce Health Check',
  'revenue-growth-accelerator': 'Revenue Growth Accelerator',
  'data-driven-growth-system': 'Data-Driven Growth System',
  'analytics-partner-retainer': 'Analytics Partner Retainer',
  'marketing-spend-audit': 'Marketing Spend Audit',
  'customer-retention-audit': 'Customer Retention Audit',
  'product-portfolio-audit': 'Product Portfolio Audit',
  'cro-audit': 'CRO Audit',
  'profitability-audit': 'Profitability Audit',
  'operations-efficiency-audit': 'Operations Efficiency Audit',
  'meta-ads-performance-audit': 'Meta Ads Performance Audit',
  'basic-setup': 'Basic Setup',
  'full-pipeline-setup': 'Full Pipeline Setup',
  'full-pipeline-automation': 'Full Pipeline + Automation',
};

interface FormData { full_name: string; email: string; phone: string; website_url: string; service_package: string; monthly_revenue: string; country: string; city: string; preferred_time: string; additional_notes: string; }
interface FormErrors { [key: string]: string }
const INITIAL_FORM: FormData = { full_name: '', email: '', phone: '', website_url: '', service_package: '', monthly_revenue: '', country: '', city: '', preferred_time: '', additional_notes: '' };

const inputClass = "w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-[16px] text-[#0F172A] placeholder:text-[15px] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0072FF] focus:bg-white transition-all";
const labelClass = "block text-[15px] font-semibold text-[#475569] mb-1.5";

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
    if (!formData.full_name.trim()) e.full_name = 'Full Name is required.';
    if (!formData.email.trim()) e.email = 'Email Address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) e.email = 'Please enter a valid email address.';
    if (!formData.website_url.trim()) e.website_url = 'Please enter your website URL.';
    else if (!/^https?:\/\/.+\..+/.test(formData.website_url.trim())) e.website_url = 'Please enter a valid URL.';
    if (!formData.service_package) e.service_package = 'Please select a service package.';
    if (!formData.monthly_revenue) e.monthly_revenue = 'Please select your estimated monthly revenue.';
    if (!formData.country) e.country = 'Please select your country.';
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

  // Success state
  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center" style={{ border: '1px solid #E2E8F0' }}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: '#F0FDF4' }}>
            <CheckCircle2 size={40} className="text-[#22C55E]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-3">Booking Request Received</h1>
          <p className="text-[#64748B] text-base mb-2">Thank you! We've successfully received your booking request.</p>
          <p className="text-[#64748B] text-sm mb-8">Mozahidul will personally review your submission and contact you within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/" className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)' }}>Return to Home</a>
            <button onClick={() => { setSubmitStatus('idle'); setFormData(INITIAL_FORM); if (defaultPackage) setFormData(prev => ({ ...prev, service_package: defaultPackage })); }} className="px-6 py-3 rounded-xl text-sm font-semibold text-[#0072FF] transition-all hover:bg-[#F0F7FF]" style={{ border: '1px solid #BFDBFE' }}>Book Another Service</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]" style={{ height: '72px' }}>
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="MozIntelligence Logo" width={38} height={38} className="rounded-lg" />
            <span className="text-xl font-bold text-[#0F172A] tracking-tight">MozIntelligence</span>
          </a>
          <a href="/" className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-[#475569] bg-white transition-all hover:bg-[#F8FAFC] hover:shadow-sm" style={{ border: '1px solid #E2E8F0' }}>
            <ChevronLeft size={16} />
            Back to Home
          </a>
        </div>
      </div>

      {/* Centered booking form */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 sm:py-12">
        <div className="w-full max-w-3xl">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-[31px] font-bold text-[#0F172A] mb-2 tracking-tight">Book Your Free Strategy Call</h1>
            <p className="text-[15px] text-[#64748B]">Fill in your details and we'll get back to you within 24 hours.</p>
          </div>

          {/* Form Card — slightly wider for new fields */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg" style={{ border: '1px solid #E2E8F0' }}>
            {submitStatus === 'error' && (
              <div className="mb-4 p-3 rounded-lg flex items-center gap-2 text-sm bg-[#FEF2F2]" style={{ border: '1px solid #FECACA' }}>
                <AlertCircle size={16} className="text-[#EF4444] flex-shrink-0" />
                <span className="text-[#EF4444]">Something went wrong while submitting your request. Please try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Full Name | Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Full Name <span className="text-[#EF4444]">*</span></label>
                  <input type="text" value={formData.full_name} onChange={e => handleChange('full_name', e.target.value)} placeholder="John Smith"
                    className={inputClass} style={{ borderColor: errors.full_name ? '#EF4444' : '#E2E8F0' }} />
                  {errors.full_name && <p className="text-[#EF4444] text-xs mt-1">{errors.full_name}</p>}
                </div>
                <div>
                  <label className={labelClass}>Email Address <span className="text-[#EF4444]">*</span></label>
                  <input type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="john@company.com"
                    className={inputClass} style={{ borderColor: errors.email ? '#EF4444' : '#E2E8F0' }} />
                  {errors.email && <p className="text-[#EF4444] text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Row 2: Phone | Website URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Phone / WhatsApp</label>
                  <input type="tel" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+1 234 567 890"
                    className={inputClass} style={{ borderColor: '#E2E8F0' }} />
                </div>
                <div>
                  <label className={labelClass}>Website / Store URL <span className="text-[#EF4444]">*</span></label>
                  <input type="url" value={formData.website_url} onChange={e => handleChange('website_url', e.target.value)} placeholder="https://yourstore.com"
                    className={inputClass} style={{ borderColor: errors.website_url ? '#EF4444' : '#E2E8F0' }} />
                  {errors.website_url && <p className="text-[#EF4444] text-xs mt-1">{errors.website_url}</p>}
                </div>
              </div>

              {/* Service Package */}
              <div>
                <label className={labelClass}>Service Package <span className="text-[#EF4444]">*</span></label>
                <select value={formData.service_package} onChange={e => handleChange('service_package', e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                  style={{ borderColor: errors.service_package ? '#EF4444' : '#E2E8F0' }}>
                  <option value="">Select a service package...</option>
                  {SERVICE_PACKAGES.map((g, i) => (
                    <optgroup key={i} label={g.label}>
                      {g.options.map(p => <option key={p} value={p}>{p}</option>)}
                    </optgroup>
                  ))}
                </select>
                {errors.service_package && <p className="text-[#EF4444] text-xs mt-1">{errors.service_package}</p>}
              </div>

              {/* Row 3: Revenue | Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Estimated Monthly Revenue <span className="text-[#EF4444]">*</span></label>
                  <select value={formData.monthly_revenue} onChange={e => handleChange('monthly_revenue', e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                    style={{ borderColor: errors.monthly_revenue ? '#EF4444' : '#E2E8F0' }}>
                    <option value="">Select range...</option>
                    {REVENUE_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {errors.monthly_revenue && <p className="text-[#EF4444] text-xs mt-1">{errors.monthly_revenue}</p>}
                </div>
                <div>
                  <label className={labelClass}>Preferred Time for Call</label>
                  <input type="text" value={formData.preferred_time} onChange={e => handleChange('preferred_time', e.target.value)} placeholder="Weekdays afternoon"
                    className={inputClass} style={{ borderColor: '#E2E8F0' }} />
                </div>
              </div>

              {/* Row 4: Country | City (NEW) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Country <span className="text-[#EF4444]">*</span></label>
                  <select value={formData.country} onChange={e => handleChange('country', e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                    style={{ borderColor: errors.country ? '#EF4444' : '#E2E8F0' }}>
                    <option value="">Select Country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.country && <p className="text-[#EF4444] text-xs mt-1">{errors.country}</p>}
                </div>
                <div>
                  <label className={labelClass}>City / State</label>
                  <input type="text" value={formData.city} onChange={e => handleChange('city', e.target.value)} placeholder="City / State"
                    className={inputClass} style={{ borderColor: '#E2E8F0' }} />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className={labelClass}>Additional Notes / Anything else</label>
                <textarea value={formData.additional_notes} onChange={e => handleChange('additional_notes', e.target.value)} placeholder="Tell us about your specific needs or questions..." rows={3}
                  className="w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-[16px] text-[#0F172A] placeholder:text-[15px] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0072FF] focus:bg-white transition-all resize-none"
                  style={{ borderColor: '#E2E8F0' }} />
              </div>

              {/* Submit */}
              <button type="submit" disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-[16px] font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 4px 15px rgba(0,114,255,0.3)' }}>
                {isSubmitting ? (<><Loader2 size={18} className="animate-spin" /> Submitting...</>) : (<>Submit Booking Request <ArrowRight size={16} /></>)}
              </button>
              <p className="text-center text-xs text-[#94A3B8]">🔒 Your information is secure and will never be shared.</p>
            </form>
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
