import Link from 'next/link';
import { ShieldCheck, Zap, TrendingUp, CheckCircle, Lock, BarChart3 } from 'lucide-react';
import FAQ from '@/components/FAQ';

const socialProof = [
  "Blind OOS Validated",
  "Model Frozen Pre-2025",
  "32,000+ Verified Trades",
  "Proprietary Physics Engine",
];

export default function MarketingPage() {
  return (
    <div className="w-full relative">
      {/* 1. HERO SECTION — tightened vertical rhythm */}
      <section className="relative pt-24 pb-12 md:pt-36 md:pb-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6 z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              RETINA Q1R5 MODEL ENGINE LIVE
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              The hedge fund&nbsp;edge,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800">democratised.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 max-w-xl font-light leading-relaxed">
              Institutional-grade alpha generating a <strong className="text-emerald-700">41.7% Annual CAGR</strong> via a verified 52.9% win rate on stocks like Apple, Microsoft, and Google. We process the quantum mathematics in the background, so your broker executes the trades autonomously while you sleep.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center md:justify-start">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 hover:shadow-emerald-600/40 hover:scale-[1.02] active:scale-[0.98]">
                Start 30-Day Free Trial <TrendingUp className="w-5 h-5" />
              </Link>
              <div className="text-sm text-slate-500 font-medium">
                $99/mo afterwards. Cancel anytime.
              </div>
            </div>
          </div>

          {/* Terminal Visual */}
          <div className="flex-1 relative w-full aspect-square max-w-lg">
             <div className="w-full h-full border border-slate-200 bg-white rounded-2xl relative overflow-hidden flex flex-col shadow-2xl shadow-slate-900/10 hover:shadow-slate-900/20 transition-shadow duration-500">
                <div className="h-10 border-b border-slate-200 flex items-center px-4 gap-2 bg-slate-50">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                    <span className="ml-2 text-xs font-mono text-slate-400">secure_institutional_portal.log</span>
                </div>
                <div className="p-6 space-y-4">
                    {[
                        { t: 'AAPL', d: 'LONG', p: '+3.2%', conf: '0.68', isStrong: true },
                        { t: 'MSFT', d: 'LONG', p: '+2.7%', conf: '0.65', isStrong: true },
                        { t: 'GOOGL', d: 'LONG', p: '+1.9%', conf: '0.59', isStrong: false },
                        { t: 'AMZN', d: 'SHORT', p: '+1.4%', conf: '0.57', isStrong: false },
                    ].map((s, i) => (
                        <div key={i} className={`flex justify-between items-center p-3.5 rounded-xl border transition-all ${s.isStrong ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-100 bg-slate-50/50'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-14 h-8 rounded-md flex items-center justify-center font-bold text-xs ${s.d === 'LONG' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                                    {s.d}
                                </div>
                                <div className="font-bold text-slate-800 text-lg">{s.t}</div>
                            </div>
                            <div className="text-right">
                                <div className={`font-bold ${s.isStrong ? 'text-emerald-700' : 'text-slate-600'}`}>{s.p}</div>
                                <div className="text-xs text-slate-400 font-mono">conf: {s.conf}</div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 1.5 SOCIAL PROOF STRIP */}
      <section className="py-4 px-6 border-y border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2">
          {socialProof.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* 2. TICKER TAPE — more prominent */}
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

      {/* 3. THE PROOF SECTION — physics-themed icons */}
      <section id="logic" className="py-24 px-6 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold font-mono tracking-wider">
              THE SCIENCE
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">Physics-Based Alpha.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                <strong className="text-slate-700">You don&apos;t need a PhD to invest like one.</strong> Our core engine handles the proprietary quantum computations in the background, translating complex market physics into automated, hands-free execution directly in your brokerage account.
            </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="group p-8 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                {/* Physics icon: wavefunction */}
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Thermodynamic Volume</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                    Behind the scenes, the engine processes 204 continuous market features derived from liquidity and volatility physics. You simply connect your broker and let the engine execute the mathematics autonomously.
                </p>
            </div>
            <div className="group p-8 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-700 transition-colors duration-300">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">The +2.9% Edge</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                    A guaranteed coin flip is 50%. Our blind tests hit 52.9% win rates. That 2.9% mathematical edge compounded over time is the secret to institutional wealth, now available to your personal account.
                </p>
            </div>
            <div className="group p-8 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Blind OOS Validated</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                    Our performance is certified mathematically. The core model was frozen before 2025, meaning its 52.9% win rate comes from entirely unseen future data, guaranteeing unbiased accuracy you can trust.
                </p>
            </div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
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

      {/* 5. PERFORMANCE & CTA — visual weight on stats */}
      <section id="pricing" className="py-24 px-6 bg-white border-t border-slate-200">
         <div className="max-w-5xl mx-auto bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-3xl p-8 md:p-16 text-center shadow-xl relative overflow-hidden">
             {/* Subtle gradient accent */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60"></div>
             
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-10">Join the inner circle today.</h2>
             
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
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Standard Access</h3>
                 <p className="text-slate-500 mb-6 text-sm">Full access to automated portfolio execution. From the S&P 500 to global equities, the engine handles the trading entirely for you.</p>
                 <div className="text-5xl font-black text-slate-900 mb-8">$99<span className="text-xl text-slate-500 font-medium">/mo</span></div>
                 
                 <Link href="/signup" className="block w-full py-4 text-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg transition-all shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40">
                     Start 30-Day Free Trial
                 </Link>
                 <p className="text-xs text-slate-500 mt-4">Zero technical knowledge required. $99/mo after. Cancel anytime.</p>
             </div>

             {/* Trust badges */}
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

    </div>
  );
}
