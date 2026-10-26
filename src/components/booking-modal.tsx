'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
}

// All service packages organized by category
const SERVICE_PACKAGES = [
  { label: '─ Part 1: Core E-Commerce Packages ─', options: [
    'E-Commerce Health Check',
    'Revenue Growth Accelerator',
    'Data-Driven Growth System',
    'Analytics Partner Retainer',
  ]},
  { label: '─ Part 2: Specialized Add-On Packages ─', options: [
    'Marketing Spend Audit',
    'Customer Retention Audit',
    'Product Portfolio Audit',
    'CRO/Website Audit',
    'Profitability Audit',
    'Operations Efficiency Audit',
    'Meta Ads Performance Audit',
  ]},
  { label: '─ Part 3: Data Setup & Infrastructure ─', options: [
    'Basic Setup',
    'Full Pipeline Setup',
    'Full Pipeline + Automation',
  ]},
  { label: '─ Other ─', options: [
    'Custom Analytics Setup',
    'Not sure yet (Need advice)',
  ]},
];

const REVENUE_RANGES = [
  'Below $1k / Mo',
  '$1k – $10k / Mo',
  '$10k – $20k / Mo',
  '$20k – $40k / Mo',
  '$40k – $60k / Mo',
  '$60k – $100k / Mo',
  '$100k+ / Mo',
];

interface FormData {
  full_name: string;
  email: string;
  phone_whatsapp: string;
  website_url: string;
  service_package: string;
  monthly_revenue: string;
  preferred_call_time: string;
  additional_notes: string;
}

interface FormErrors {
  [key: string]: string;
}

const INITIAL_FORM: FormData = {
  full_name: '',
  email: '',
  phone_whatsapp: '',
  website_url: '',
  service_package: '',
  monthly_revenue: '',
  preferred_call_time: '',
  additional_notes: '',
};

export function BookingModal({ isOpen, onClose, defaultPackage }: BookingModalProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Set default package when modal opens
  useEffect(() => {
    if (isOpen && defaultPackage) {
      setFormData(prev => ({ ...prev, service_package: defaultPackage }));
      setSubmitStatus('idle');
      setErrors({});
    }
  }, [isOpen, defaultPackage]);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, isSubmitting]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  }, [onClose, isSubmitting]);

  // Validate form
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.website_url.trim()) {
      newErrors.website_url = 'Website URL is required';
    } else if (!/^https?:\/\/.+\..+/.test(formData.website_url.trim())) {
      newErrors.website_url = 'Please enter a valid URL (e.g., https://yourstore.com)';
    }

    if (!formData.service_package) {
      newErrors.service_package = 'Please select a service package';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://preview-chat-896fc7f7-9316-4e75-a15e-cb944bad21fe.space-z.ai/api/booking?XTransformPort=3003', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source_package: defaultPackage || 'Marketing Spend Audit',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset and close
  const handleClose = () => {
    if (isSubmitting) return;
    setFormData(INITIAL_FORM);
    setErrors({});
    setSubmitStatus('idle');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: 'linear-gradient(180deg, #0a0f1a 0%, #020408 100%)',
          border: '1px solid rgba(0,198,255,0.2)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,198,255,0.1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg text-[#8899AA] hover:text-white hover:bg-[rgba(255,255,255,0.08)] transition-colors disabled:opacity-30"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Success state */}
        {submitStatus === 'success' ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(0,230,118,0.1)' }}>
              <CheckCircle2 size={32} className="text-[#00E676]" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Thank you! We have received your request and will contact you within 24 hours.</h3>
            <p className="text-[#8899AA] text-sm mb-8">We'll review your information and follow up with the next steps.</p>
            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-lg text-sm font-semibold text-[#020408] transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 4px 15px rgba(0,198,255,0.3)' }}
            >
              Close
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <h2 className="text-white text-xl font-bold mb-1">Book Your Audit</h2>
            <p className="text-[#8899AA] text-sm mb-6">Fill in your details and we'll get back to you within 24 hours.</p>

            {/* Error banner */}
            {submitStatus === 'error' && (
              <div className="mb-4 p-3 rounded-lg flex items-center gap-2 text-sm" style={{ background: 'rgba(234,67,53,0.1)', border: '1px solid rgba(234,67,53,0.3)' }}>
                <AlertCircle size={16} className="text-[#EA4335] flex-shrink-0" />
                <span className="text-[#EA4335]">Something went wrong while submitting your request. Please try again.</span>
              </div>
            )}

            {/* Row 1: Full Name | Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[#8899AA] text-xs font-medium mb-1.5">Full Name <span className="text-[#EA4335]">*</span></label>
                <input
                  ref={firstInputRef}
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => handleChange('full_name', e.target.value)}
                  placeholder="e.g., John Smith"
                  className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#556677] focus:outline-none focus:border-[rgba(0,198,255,0.4)] focus:bg-[rgba(255,255,255,0.08)] transition-all"
                  style={errors.full_name ? { borderColor: 'rgba(234,67,53,0.5)' } : {}}
                />
                {errors.full_name && <p className="text-[#EA4335] text-xs mt-1">{errors.full_name}</p>}
              </div>
              <div>
                <label className="block text-[#8899AA] text-xs font-medium mb-1.5">Email Address <span className="text-[#EA4335]">*</span></label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="e.g., john@company.com"
                  className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#556677] focus:outline-none focus:border-[rgba(0,198,255,0.4)] focus:bg-[rgba(255,255,255,0.08)] transition-all"
                  style={errors.email ? { borderColor: 'rgba(234,67,53,0.5)' } : {}}
                />
                {errors.email && <p className="text-[#EA4335] text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Row 2: Phone | Website */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[#8899AA] text-xs font-medium mb-1.5">Phone / WhatsApp</label>
                <input
                  type="tel"
                  value={formData.phone_whatsapp}
                  onChange={(e) => handleChange('phone_whatsapp', e.target.value)}
                  placeholder="e.g., +1 234 567 890"
                  className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#556677] focus:outline-none focus:border-[rgba(0,198,255,0.4)] focus:bg-[rgba(255,255,255,0.08)] transition-all"
                />
              </div>
              <div>
                <label className="block text-[#8899AA] text-xs font-medium mb-1.5">Website / Store URL <span className="text-[#EA4335]">*</span></label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => handleChange('website_url', e.target.value)}
                  placeholder="e.g., https://yourstore.com"
                  className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#556677] focus:outline-none focus:border-[rgba(0,198,255,0.4)] focus:bg-[rgba(255,255,255,0.08)] transition-all"
                  style={errors.website_url ? { borderColor: 'rgba(234,67,53,0.5)' } : {}}
                />
                {errors.website_url && <p className="text-[#EA4335] text-xs mt-1">{errors.website_url}</p>}
              </div>
            </div>

            {/* Service Package (full width) */}
            <div className="mb-4">
              <label className="block text-[#8899AA] text-xs font-medium mb-1.5">Service Package <span className="text-[#EA4335]">*</span></label>
              <select
                value={formData.service_package}
                onChange={(e) => handleChange('service_package', e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[rgba(0,198,255,0.4)] transition-all"
                style={errors.service_package ? { borderColor: 'rgba(234,67,53,0.5)' } : {}}
              >
                <option value="">Select a service package...</option>
                {SERVICE_PACKAGES.map((group, gi) => (
                  <optgroup key={gi} label={group.label}>
                    {group.options.map((pkg) => (
                      <option key={pkg} value={pkg} style={{ background: '#0a0f1a' }}>{pkg}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errors.service_package && <p className="text-[#EA4335] text-xs mt-1">{errors.service_package}</p>}
            </div>

            {/* Row 3: Revenue | Preferred Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[#8899AA] text-xs font-medium mb-1.5">Estimated Monthly Revenue</label>
                <select
                  value={formData.monthly_revenue}
                  onChange={(e) => handleChange('monthly_revenue', e.target.value)}
                  className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[rgba(0,198,255,0.4)] transition-all"
                >
                  <option value="">Select range...</option>
                  {REVENUE_RANGES.map(r => <option key={r} value={r} style={{ background: '#0a0f1a' }}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[#8899AA] text-xs font-medium mb-1.5">Preferred Time for Call</label>
                <input
                  type="text"
                  value={formData.preferred_call_time}
                  onChange={(e) => handleChange('preferred_call_time', e.target.value)}
                  placeholder="e.g., Weekdays afternoon"
                  className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#556677] focus:outline-none focus:border-[rgba(0,198,255,0.4)] focus:bg-[rgba(255,255,255,0.08)] transition-all"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <label className="block text-[#8899AA] text-xs font-medium mb-1.5">Additional Notes / Anything else</label>
              <textarea
                value={formData.additional_notes}
                onChange={(e) => handleChange('additional_notes', e.target.value)}
                placeholder="Tell us about your specific needs or questions..."
                rows={3}
                className="w-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#556677] focus:outline-none focus:border-[rgba(0,198,255,0.4)] focus:bg-[rgba(255,255,255,0.08)] transition-all resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-[#020408] transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', boxShadow: '0 4px 15px rgba(0,198,255,0.3)' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Booking Request →'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
