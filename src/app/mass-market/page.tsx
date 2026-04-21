import Link from 'next/link';
import { Shield, Lock, TrendingUp, Actvity, ChevronRight, Check } from 'lucide-react';

export default function MassMarketPage() {
  return (
    // Resetting root layout's dark mode with a forced light background
    <div className="min-h-screen w-full bg-[#FAFBFF] text-slate-900 relative overflow-hidden font-sans pb-32">
      
      {/* --- BACKGROUND MESH GRADIENTS (Stripe vibe) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/60 blur-[120px] mix-blend-multiply pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-emerald-50/60 blur-[120px] mix-blend-multiply pointer-events-none" />

      {/* --- NAVBAR --- */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <span className="text-white font-bold text-lg leading-none">R</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Retina</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#" className="hover:text-slate-900 transition-colors">How it works</Link>
          <Link href="#" className="hover:text-slate-900 transition-colors">Security</Link>
          <Link href="#" className="hover:text-slate-900 transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">Sign in</Link>
          <Link href="/signup" className="text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-xl">
            Get started
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-20 pb-24 px-6 md:pt-32 md:pb-32">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-700 text-sm font-semibold mx-auto lg:mx-0 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              The next generation of wealth building
            </div>
            
            <h1 className="text-5xl md:text-[5.5rem] font-bold tracking-[-0.04em] text-slate-900 leading-[1.05]">
              Generational wealth,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800">automated.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              The precision of an institutional hedge fund, beautifully packaged for your personal portfolio. Connect your broker securely and let our engine build your wealth while you sleep.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition-all shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98]">
                Start building wealth <ChevronRight className="w-5 h-5" />
              </Link>
              <span className="text-sm font-medium text-slate-500">Free under $10,000. No credit card required.</span>
            </div>
          </div>

          {/* Glassmorphic App Visualization (Replaces the Terminal) */}
          <div className="flex-1 w-full max-w-lg relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 blur-3xl rounded-[3rem]" />
            <div className="relative w-full aspect-[4/5] md:aspect-square bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] rounded-[2.5rem] overflow-hidden flex flex-col p-8">
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 mb-1">Total Balance</h3>
                  <div className="text-4xl font-bold text-slate-900 tracking-tight">$124,592.80</div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +41.7%
                </div>
              </div>

              {/* Mock Abstract Chart area */}
              <div className="flex-1 relative mb-8 rounded-2xl bg-gradient-to-t from-slate-50 to-white border border-slate-100 overflow-hidden flex items-end px-4 pb-4">
                 {/* Soft chart bars mimicking growth */}
                 <div className="flex items-end justify-between w-full h-3/4 gap-2">
                    {[30, 42, 38, 55, 48, 62, 59, 78, 71, 85, 92, 100].map((h, i) => (
                      <div key={i} className="w-full bg-indigo-500 rounded-t-sm" style={{ height: `${h}%`, opacity: 0.1 + (i / 12) * 0.9 }}></div>
                    ))}
                 </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-4 px-1">Recent Activity</h4>
                <div className="space-y-3">
                  {[
                    { t: 'Apple (AAPL)', d: 'Engine initiated Long', a: '+$312.40' },
                    { t: 'Crash Shield', d: 'Automated protection active', a: 'Secured' },
                  ].map((act, i) => (
                    <div key={i} className="flex justify-between items-center bg-white border border-slate-100 p-3.5 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i === 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          {i === 0 ? <TrendingUp className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{act.t}</div>
                          <div className="text-xs text-slate-500 font-medium">{act.d}</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-slate-700">{act.a}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST & INTEGRATION STRIP --- */}
      <section className="py-12 px-6 border-y border-slate-200/60 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-sm font-semibold text-slate-500 text-center md:text-left flex items-center gap-2">
            <Lock className="w-4 h-4" /> Bank-grade connection. Funds stay in your broker.
          </div>
          <div className="flex items-center gap-8 md:gap-12 opacity-50 grayscale">
            {/* Fake broker logos represented as text for now */}
            <div className="text-xl font-bold font-serif">Fidelity</div>
            <div className="text-xl font-bold font-sans tracking-tighter">charles SCHWAB</div>
            <div className="text-xl font-bold">Interactive Brokers</div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 px-6 md:py-32">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              A smarter way to grow.<br />Zero effort required.
            </h2>
            <p className="text-lg text-slate-500">
              We abstracted away the complex mathematics of quantitative trading so you can focus on what matters. Seamless, secure, and fully automated.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-200/40 transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Predictive Engine</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Powered by a proven architectural model that hits a 52.9% win rate on global equities. The returns of Wall Street, right in your pocket.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-200/40 transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Automated Crash Shield</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Market conditions change constantly. Our system automatically detects macro downturns and secures your assets, keeping you safe while you sleep.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-200/40 transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                <Lock className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Non-Custodial Security</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Your money never leaves your bank. We simply connect to your existing broker to execute trades autonomously using bank-grade 256-bit encryption.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
