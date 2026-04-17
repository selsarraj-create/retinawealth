"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Do I have to actively trade or monitor the markets?",
    answer: "No. Our automated execution engine plugs directly into your brokerage account via API. It monitors the global markets 24/7 and executes the proprietary signals autonomously. You never have to manually click 'Buy' or 'Sell'."
  },
  {
    question: "Do I need a background in finance or technical analysis?",
    answer: "Absolutely not. We engineered this system specifically so that everyday retail investors can access institutional-grade mathematics. You simply connect your broker, set your risk limit, and the engine handles the complex physics."
  },
  {
    question: "Is there a minimum or maximum investment?",
    answer: "There is no minimum investment — you can start with any amount in your brokerage account. We do enforce a $500,000 maximum per account. This is a deliberate choice: RETINA was built for everyday retail investors, not Wall Street. Capping account sizes protects our signal quality and ensures the edge remains accessible to the people who need it most."
  },
  {
    question: "How does the system protect my capital during a downturn?",
    answer: "The core physics engine continuously tracks covariance anomalies across global equities. If it detects severe structural instability pointing to a market downturn, the engine automatically halts high-risk trades or rotates into safe-haven assets to limit your drawdown."
  },
  {
    question: "Is my money held by RETINA?",
    answer: "No. Your funds remain entirely within your secure, personal brokerage account (e.g., Interactive Brokers, TD Ameritrade). We never hold your capital; we simply provide the highly-secure automated execution instructions to your broker."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-2xl transition-all"
        >
          <button 
            onClick={() => toggle(index)}
            className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
          >
            <span className="font-bold text-slate-900 text-lg">{faq.question}</span>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
          </button>
          
          <div 
            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
