'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShieldCheck, Zap, TrendingUp, CheckCircle, Lock, BarChart3, AlertTriangle, Activity, ChevronDown } from 'lucide-react';
import FAQ from '@/components/FAQ';
import GrowthCalculator from '@/components/GrowthCalculator';
import TopologicalMesh from '@/components/TopologicalMesh';

const socialProof = [
  "Blind-Tested Accuracy",
  "Model Frozen Pre-2025",
  "32,000+ Verified Trades",
  "Proprietary Physics Engine",
  "Crash Shield Included",
];

export default function MarketingPage() {
  const [openShield, setOpenShield] = useState<number | null>(null);
  const [openScience, setOpenScience] = useState<number | null>(null);

  const shieldCards = [
    {
      icon: <Activity className="w-5 h-5 text-red-400" />,
      iconBg: 'bg-red-500/10',
      title: 'Always-On Scanning',
      text: 'The shield continuously monitors cross-market risk signals around the clock — the same warning patterns that preceded COVID, SVB, and every major downturn since 2008.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      iconBg: 'bg-amber-500/10',
      title: 'Automatic Protection',
      text: 'When elevated risk is detected, the shield automatically scales down your positions. No alerts to check, no panic selling, no decisions to make. It just protects you.',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
      iconBg: 'bg-emerald-500/10',
      title: 'Smart Re-Entry',
      text: 'After a downturn, the shield detects when conditions normalise and automatically re-enters positions — capturing the recovery that most retail investors miss.',
    },
  ];
  return (
    <div className="w-full relative">

      {/* 1. HERO SECTION — Dark Animated Mesh */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#020610]">
        
        {/* The animated topological mesh canvas */}
        <TopologicalMesh />
        
        <div className="relative z-20 max-w-6xl mx-auto flex flex-col items-center text-center px-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            RETINA V1.0 ENGINE LIVE
          </div>
          
          <h1 className="mt-10 text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.05]">
            Institutional alpha.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Now in your brokerage.</span>
          </h1>
          
          <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed backdrop-blur-sm bg-black/20 p-5 rounded-2xl border border-white/5">
            Institutional-grade alpha generating a <strong className="text-emerald-400">41.7% Annual CAGR</strong> via a verified 52.9% win rate on stocks like Apple, Microsoft, and Google. We process the physics in the background, so your broker executes the trades autonomously while you sleep.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98]">
              Get Early Access <TrendingUp className="w-5 h-5" />
            </Link>
            <div className="text-sm text-slate-400 font-medium">
              Free paper trading with live signals. No card required.
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 SOCIAL PROOF STRIP */}
      <section className="py-4 px-6 border-y border-white/10 bg-[#020610]">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2">
          {socialProof.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-400 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* 2. TICKER TAPE */}
      <div className="w-full bg-slate-900 py-3.5 overflow-hidden flex relative">
         <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
         <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
         
         <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
            {[1, 2].map((group) => (
                <div key={group} className="flex items-center space-x-8 px-4">
                    <span className="text-emerald-400 font-mono font-bold text-sm">AAPL LONG +3.2%</span><span className="text-slate-600">•</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm">MSFT LONG +2.7%</span><span className="text-slate-600">•</span>
                    <span className="text-slate-400 font-mono text-sm">GOOGL LONG +1.9%</span><span className="text-slate-600">•</span>
                    <span className="text-slate-400 font-mono text-sm">NVDA LONG +2.1%</span><span className="text-slate-600">•</span>
                    <span className="text-amber-400 font-mono text-sm">AMZN SHORT +1.4%</span><span className="text-slate-600">•</span>
                    <span className="text-slate-400 font-mono text-sm">JPM LONG +1.8%</span><span className="text-slate-600">•</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm">META LONG +2.5%</span><span className="text-slate-600">•</span>
                    <span className="text-slate-400 font-mono text-sm">TSLA SHORT +0.9%</span><span className="text-slate-600">•</span>
                </div>
            ))}
         </div>
      </div>

      {/* 3. THE PROOF SECTION */}
      <section id="logic" className="py-24 px-6 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold font-mono tracking-wider">
              THE SCIENCE
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">Physics-Based Alpha.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                <strong className="text-slate-700">You don&apos;t need a PhD to invest like one.</strong> Our core engine handles the proprietary physics computations in the background, translating complex market dynamics into automated, hands-free execution directly in your brokerage account.
            </p>
        </div>

        {/* Desktop: grid */}
        <div className="max-w-6xl mx-auto hidden md:grid md:grid-cols-3 gap-6">
            <div className="group p-8 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors duration-300">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Market Physics</h3>
                </div>
                <p className="text-slate-500 leading-relaxed text-sm">
                    Behind the scenes, the engine compresses 1,060 market signals into 85 physics-grade features derived from liquidity and volatility dynamics. You simply connect your broker and let the engine execute the mathematics autonomously.
                </p>
            </div>
            <div className="group p-8 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 transition-colors duration-300">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">The +2.9% Edge</h3>
                </div>
                <p className="text-slate-500 leading-relaxed text-sm">
                    A fair coin flip is 50%. Our blind tests hit 52.9% win rates. That 2.9% mathematical edge compounded over time is the secret to institutional wealth, now available to your personal account.
                </p>
            </div>
            <div className="group p-8 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors duration-300">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Blind-Tested Accuracy</h3>
                </div>
                <p className="text-slate-500 leading-relaxed text-sm">
                    Our performance is certified mathematically. The core model was frozen before 2025, meaning its 52.9% win rate comes from entirely unseen future data, demonstrating unbiased accuracy you can trust.
                </p>
            </div>
        </div>

        {/* Mobile: accordion */}
        <div className="max-w-6xl mx-auto md:hidden space-y-3">
          {[
            { icon: <Zap className="w-5 h-5 text-white" />, iconBg: 'bg-slate-900', title: 'Market Physics', text: 'Behind the scenes, the engine compresses 1,060 market signals into 85 physics-grade features derived from liquidity and volatility dynamics. You simply connect your broker and let the engine execute the mathematics autonomously.' },
            { icon: <BarChart3 className="w-5 h-5 text-white" />, iconBg: 'bg-emerald-600', title: 'The +2.9% Edge', text: 'A fair coin flip is 50%. Our blind tests hit 52.9% win rates. That 2.9% mathematical edge compounded over time is the secret to institutional wealth, now available to your personal account.' },
            { icon: <ShieldCheck className="w-5 h-5 text-white" />, iconBg: 'bg-slate-900', title: 'Blind-Tested Accuracy', text: 'Our performance is certified mathematically. The core model was frozen before 2025, meaning its 52.9% win rate comes from entirely unseen future data, demonstrating unbiased accuracy you can trust.' },
          ].map((card, i) => (
            <div key={i} className="rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenScience(openScience === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                    {card.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openScience === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openScience === i ? 'max-h-40 pb-5 px-5' : 'max-h-0'}`}>
                <p className="text-sm text-slate-500 leading-relaxed">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3.5 CRASH SHIELD SECTION */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-emerald-400 animate-ping" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-emerald-400 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-emerald-400 animate-ping" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold font-mono tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5" />
              CRASH SHIELD INCLUDED FREE
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Sleep through<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">market crashes.</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Every account includes our proprietary Crash Shield — a built-in early warning system that monitors hundreds of risk indicators in real-time and automatically reduces your exposure when danger is elevated. No manual intervention required.
            </p>
          </div>

          {/* Desktop: grid, Mobile: accordion */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {shieldCards.map((card, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>

          {/* Mobile: accordion */}
          <div className="md:hidden space-y-3">
            {shieldCards.map((card, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden">
                <button
                  onClick={() => setOpenShield(openShield === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                      {card.icon}
                    </div>
                    <h3 className="text-base font-bold text-white">{card.title}</h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openShield === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openShield === i ? 'max-h-40 pb-5 px-5' : 'max-h-0'}`}>
                  <p className="text-sm text-slate-400 leading-relaxed">{card.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-bold text-sm">Included free with every account — no minimum balance required</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GROWTH CALCULATOR — moved above FAQ */}
      <GrowthCalculator />

      {/* 5. FAQ SECTION */}
      <section id="faq" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold font-mono tracking-wider">
              HOW IT WORKS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">Hands-Free Wealth Generation.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                No trading experience required. Here is exactly how our automated architecture works.
            </p>
        </div>
        <FAQ />
      </section>

      {/* 6. PERFORMANCE & CTA */}
      <section id="pricing" className="py-24 px-6 bg-white border-t border-slate-200">
         <div className="max-w-5xl mx-auto bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-3xl p-8 md:p-16 text-center shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60"></div>
             
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-10">The Numbers.</h2>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                 <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                     <div className="text-3xl md:text-4xl font-black text-emerald-700">+41.7%</div>
                     <div className="text-sm font-medium text-emerald-600/70 mt-1">Annualised CAGR</div>
                 </div>
                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                     <div className="text-3xl md:text-4xl font-black text-slate-900">0.91</div>
                     <div className="text-sm font-medium text-slate-500 mt-1">Raw Signal Sharpe</div>
                 </div>
                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                     <div className="text-3xl md:text-4xl font-black text-slate-900">52.9%</div>
                     <div className="text-sm font-medium text-slate-500 mt-1">Model Win Rate</div>
                 </div>
                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                     <div className="text-3xl md:text-4xl font-black text-slate-900">32k+</div>
                     <div className="text-sm font-medium text-slate-500 mt-1">Verified Trades</div>
                 </div>
             </div>

             <div className="bg-white border border-slate-200 p-8 rounded-2xl max-w-lg mx-auto shadow-sm">
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Fair-Share Pricing</h3>
                 <p className="text-slate-500 mb-6 text-sm">We only win when you grow. Start trading with institutional physics completely free. Upgrade only when your portfolio scales.</p>

                 <div className="flex items-center gap-2 px-4 py-2.5 mb-6 rounded-xl bg-emerald-50 border border-emerald-100">
                   <Zap className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                   <span className="text-xs font-bold text-emerald-700">Accounts under $10,000 trade FREE forever</span>
                 </div>
                 
                 <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-4">
                     <div>
                         <div className="text-sm font-bold text-slate-900">Up to $10,000</div>
                         <div className="text-xs text-slate-500">Perfect for getting started</div>
                     </div>
                     <div className="text-xl font-black text-emerald-600">$0<span className="text-xs text-emerald-500/70 font-medium">/mo</span></div>
                 </div>

                 <div className="flex justify-between items-end pb-3 mb-2">
                     <div>
                         <div className="text-sm font-bold text-slate-900">$10,000 — $25,000</div>
                         <div className="text-xs text-slate-500">+$99 per additional $10k tier</div>
                     </div>
                     <div className="text-xl font-black text-slate-900">$99<span className="text-xs text-slate-500 font-medium">/mo</span></div>
                 </div>
                 
                 <div className="flex items-center gap-2 px-3 py-2 mb-6 rounded-lg bg-blue-50 border border-blue-100/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 animate-pulse"></div>
                    <span className="text-[11px] font-medium text-blue-800 leading-tight">
                        <strong>60-Day Upgrade Grace Period:</strong> Cross $10k? Your next 60 days are on us to ensure the scaling edge pays for itself before you are ever billed.
                    </span>
                 </div>

                 <Link href="/signup" className="block w-full py-4 text-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg transition-all shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40">
                     Start Free Tier
                 </Link>
                 <p className="text-xs text-slate-500 mt-4">Free paper trading with live signals. Connect your broker anytime.</p>
             </div>

             <div className="flex flex-wrap justify-center gap-6 mt-10">
               <div className="flex items-center gap-2 text-xs text-slate-400">
                 <Lock className="w-3.5 h-3.5" /> Bank-grade encryption
               </div>
               <div className="flex items-center gap-2 text-xs text-slate-400">
                 <ShieldCheck className="w-3.5 h-3.5" /> Funds never leave your broker
               </div>
               <div className="flex items-center gap-2 text-xs text-slate-400">
                 <CheckCircle className="w-3.5 h-3.5" /> Cancel anytime, no lock-in
               </div>
             </div>
         </div>
      </section>

      {/* 7. EMAIL CAPTURE — Final Soft CTA */}
      <section className="py-20 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Not ready yet? Stay in the loop.</h3>
          <p className="text-slate-400 text-sm mb-8">Get notified when new features drop and receive occasional market insights from the engine. No spam, ever.</p>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const email = (form.elements.namedItem('email') as HTMLInputElement).value;
              if (email) {
                alert('Thanks! We\'ll be in touch.');
                form.reset();
              }
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input 
              type="email" 
              name="email"
              required
              placeholder="your@email.com" 
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            />
            <button 
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>
          
          <p className="text-[11px] text-slate-600 mt-4">Unsubscribe anytime. We respect your inbox.</p>
        </div>
      </section>

    </div>
  );
}
