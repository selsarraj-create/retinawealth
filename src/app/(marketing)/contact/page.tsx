'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Get in Touch</h1>
        <p className="text-slate-500 max-w-lg mx-auto">Have a question about the platform, pricing, or partnerships? We typically respond within 24 hours.</p>
      </div>

      {submitted ? (
        <div className="text-center py-16 px-6 rounded-2xl bg-emerald-50 border border-emerald-100">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <Send className="w-7 h-7 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent</h2>
          <p className="text-slate-500">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input 
                type="text" 
                name="name" 
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                name="email" 
                required
                placeholder="you@email.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
            <select 
              name="subject" 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            >
              <option value="">Select a topic</option>
              <option value="general">General Enquiry</option>
              <option value="pricing">Pricing & Billing</option>
              <option value="technical">Technical Support</option>
              <option value="partnerships">Partnerships & Press</option>
              <option value="legal">Legal & Compliance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
            <textarea 
              name="message" 
              required
              rows={5}
              placeholder="Tell us how we can help..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md"
          >
            Send Message
          </button>
        </form>
      )}

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Email</h3>
            <a href="mailto:hello@retinawealth.com" className="text-sm text-emerald-600 hover:underline">hello@retinawealth.com</a>
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Response Time</h3>
            <p className="text-sm text-slate-500">We aim to reply within 24 hours on business days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
