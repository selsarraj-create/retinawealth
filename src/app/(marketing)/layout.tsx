'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../globals.css';
import { RetinaLogo } from '@/components/Logo';
import { useEffect, useState } from 'react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Only do transparent→solid transition on homepage
  const solid = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* Navigation — transparent on homepage hero, solid everywhere else */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${solid ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm' : 'bg-transparent border-b border-white/10'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
             <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${solid ? 'bg-slate-100 text-slate-900' : 'bg-white/10 text-white'}`}>
                <RetinaLogo className="w-5 h-5" />
             </div>
             <span className={`font-bold text-xl tracking-tight transition-colors ${solid ? 'text-slate-900' : 'text-white'}`}>RETINA. Wealth</span>
          </Link>

          <nav className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors ${solid ? 'text-slate-500' : 'text-slate-300'}`}>
             <Link href="/#logic" className={`transition-colors ${solid ? 'hover:text-slate-900' : 'hover:text-white'}`}>How it Works</Link>
             <Link href="/#performance" className={`transition-colors ${solid ? 'hover:text-slate-900' : 'hover:text-white'}`}>Performance</Link>
             <Link href="/#pricing" className={`transition-colors ${solid ? 'hover:text-slate-900' : 'hover:text-white'}`}>Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className={`text-sm font-medium transition-colors ${solid ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`}>Log in</Link>
            <Link href="/dashboard" className={`text-sm font-bold px-5 py-2.5 rounded-full transition-colors shadow-sm ${solid ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}>
              Get Access
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 relative z-10 ${!isHome ? 'pt-20' : ''}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 py-16 z-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div className="md:col-span-2 text-center md:text-left">
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-white">
                  <RetinaLogo className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg tracking-tight text-white">RETINA. Wealth</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto md:mx-0">
                Institutional-grade alpha delivered autonomously to your brokerage account. Powered by proprietary physics-based market models.
              </p>
            </div>

            {/* Product + Legal side by side on mobile */}
            <div className="grid grid-cols-2 gap-8 text-center md:text-left md:col-span-2">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Product</h4>
                <ul className="space-y-2.5 text-sm text-slate-400">
                  <li><Link href="/#logic" className="hover:text-white transition-colors">How it Works</Link></li>
                  <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Legal</h4>
                <ul className="space-y-2.5 text-sm text-slate-400">
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/risk" className="hover:text-white transition-colors">Risk Disclosure</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} Retina Wealth Ltd. All rights reserved.
            </div>
            <div className="text-[11px] text-slate-500 max-w-2xl text-center md:text-right leading-relaxed">
              <strong className="text-slate-400">Risk Warning:</strong> Trading involves significant risk of loss. Past performance, including out-of-sample test results, does not guarantee future results. This is not financial advice. Retina Wealth does not hold your funds — all trades are executed through your connected brokerage account.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
