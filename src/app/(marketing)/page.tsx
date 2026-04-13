import Link from 'next/link';
import { ArrowRight, Activity, Percent, ShieldCheck, Zap } from 'lucide-react';
import FAQ from '@/components/FAQ';

export default function MarketingPage() {
  return (
    <div className="w-full relative">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-8 z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              RETINA Q1R5 MODEL ENGINE LIVE
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              The hedge fund&nbsp;edge,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">democratised.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-light leading-relaxed">
              Institutional-grade alpha generating a <strong className="text-emerald-700">41.7% Annual CAGR</strong> via a verified 52.9% win rate on stocks like Apple, Microsoft, and Google. We process the quantum mathematics in the background, so your broker executes the trades autonomously while you sleep.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2">
                Start 30-Day Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="text-sm text-slate-500 font-medium">
                $99/mo afterwards. Cancel anytime.
              </div>
            </div>
          </div>

          {/* Neural Hero Visual */}
          <div className="flex-1 relative w-full aspect-square max-w-lg perspective-1000">
             <div className="w-full h-full border border-slate-200 bg-white rounded-2xl relative overflow-hidden flex flex-col shadow-xl transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700">
                <div className="h-10 border-b border-slate-200 flex items-center px-4 gap-2 bg-slate-50">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                    <span className="ml-2 text-xs font-mono text-slate-400">secure_institutional_portal.log</span>
                </div>
                <div className="p-6 space-y-4">
                    {/* Mocked signals */}
                    {[
                        { t: 'LUNR', d: 'LONG', p: '+40.5%', conf: '0.74', color: 'emerald' },
                        { t: 'SOUN', d: 'LONG', p: '+54.2%', conf: '0.81', color: 'emerald' },
                        { t: 'AAPL', d: 'LONG', p: '+1.2%', conf: '0.52', color: 'blue' },
                        { t: 'JPM', d: 'SHORT', p: '+0.8%', conf: '0.51', color: 'blue' },
                    ].map((s, i) => (
                        <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 bg-slate-50">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded bg-${s.color}-50 flex items-center justify-center font-bold text-${s.color}-700 text-sm border border-${s.color}-200`}>
                                    {s.d}
                                </div>
                                <div className="font-bold text-slate-800 text-lg">{s.t}</div>
                            </div>
                            <div className="text-right">
                                <div className={`text-${s.color}-700 font-bold`}>{s.p}</div>
                                <div className="text-xs text-slate-500 font-mono">conf: {s.conf}</div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. TICKER TAPE */}
      <div className="w-full bg-slate-50 border-y border-slate-200 py-3 overflow-hidden flex relative shadow-sm">
         <div className="absolute left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
         <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
         
         {/* Marquee effect */}
         <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
            {/* Repeat exact same block twice for seamless scroll loop */}
            {[1, 2].map((group) => (
                <div key={group} className="flex items-center space-x-8 px-4">
                    <span className="text-emerald-700 font-mono font-bold">LUNR LONG +40.5%</span><span className="text-slate-300">•</span>
                    <span className="text-emerald-700 font-mono font-bold">SOUN LONG +54.2%</span><span className="text-slate-300">•</span>
                    <span className="text-slate-600 font-mono">AAPL LONG +1.2%</span><span className="text-slate-300">•</span>
                    <span className="text-slate-600 font-mono">MSFT LONG +0.6%</span><span className="text-slate-300">•</span>
                    <span className="text-rose-600 font-mono">NVDA SHORT -0.3%</span><span className="text-slate-300">•</span>
                    <span className="text-slate-600 font-mono">JPM SHORT +0.8%</span><span className="text-slate-300">•</span>
                    <span className="text-emerald-700 font-mono font-bold">BBAI LONG +31.0%</span><span className="text-slate-300">•</span>
                </div>
            ))}
         </div>
      </div>

      {/* 3. THE PROOF SECTION */}
      <section id="logic" className="py-24 px-6 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">Physics-Based Alpha.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                <strong>You don't need a PhD to invest like one.</strong> Our core engine handles the proprietary quantum computations in the background, translating complex market physics into automated, hands-free execution directly in your brokerage account.
            </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm transition-colors">
                <Activity className="w-10 h-10 text-slate-700 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Thermodynamic Volume</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                    Behind the scenes, the engine processes 204 continuous market features derived from liquidity and volatility physics. You simply connect your broker and let the engine execute the mathematics autonomously.
                </p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm transition-colors">
                <Percent className="w-10 h-10 text-emerald-700 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">The +2.9% Edge</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                    A guaranteed coin flip is 50%. Our blind tests hit 52.9% win rates. That 2.9% mathematical edge compounded over time is the secret to institutional wealth, now available to your personal account.
                </p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm transition-colors">
                <ShieldCheck className="w-10 h-10 text-slate-700 mb-6" />
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
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">Hands-Free Wealth Generation.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                No trading experience required. Here is exactly how our automated architecture works.
            </p>
        </div>
        <FAQ />
      </section>

      {/* 5. PERFORMANCE & CTA */}
      <section id="performance" className="py-24 px-6 bg-white border-t border-slate-200">
         <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-16 text-center shadow-lg relative overflow-hidden">
             
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Join the inner circle today.</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                 <div>
                     <div className="text-4xl font-black text-emerald-700">+41.7%</div>
                     <div className="text-sm font-medium text-slate-500 mt-1">Annualised CAGR</div>
                 </div>
                 <div>
                     <div className="text-4xl font-black text-slate-900">0.91</div>
                     <div className="text-sm font-medium text-slate-500 mt-1">Raw Signal Sharpe</div>
                 </div>
                 <div>
                     <div className="text-4xl font-black text-slate-900">52.9%</div>
                     <div className="text-sm font-medium text-slate-500 mt-1">Model Win Rate</div>
                 </div>
                 <div>
                     <div className="text-4xl font-black text-slate-900">32k+</div>
                     <div className="text-sm font-medium text-slate-500 mt-1">Verified Trades</div>
                 </div>
             </div>

             <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl max-w-lg mx-auto">
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Standard Access</h3>
                 <p className="text-slate-500 mb-6 text-sm">Full access to automated portfolio execution. From the S&P 500 to global equities, the engine handles the trading entirely for you.</p>
                 <div className="text-5xl font-black text-slate-900 mb-8">$99<span className="text-xl text-slate-500 font-medium">/mo</span></div>
                 
                 <Link href="/signup" className="block w-full py-4 text-center rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg transition-colors shadow-sm">
                     Start 30-Day Free Trial
                 </Link>
                 <p className="text-xs text-slate-500 mt-4">Zero technical knowledge required. $99/mo after. Cancel anytime.</p>
             </div>
         </div>
      </section>

    </div>
  );
}
