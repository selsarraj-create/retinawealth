import Link from 'next/link';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* Navigation */}
      <header className="absolute top-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                 <div className="w-4 h-4 text-emerald-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                 </div>
             </div>
             <span className="font-bold text-xl tracking-tight text-slate-900">RETINA. Wealth</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
             <Link href="#logic" className="hover:text-slate-900 transition-colors">How it Works</Link>
             <Link href="#performance" className="hover:text-slate-900 transition-colors">Performance</Link>
             <Link href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Log in</Link>
            <Link href="/dashboard" className="text-sm font-bold bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-colors shadow-sm">
              Get Access
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <span className="font-bold tracking-tight text-slate-900">RETINA. Wealth</span>
                <span className="text-slate-500 text-sm">© 2026</span>
            </div>
            <div className="text-sm text-slate-500 max-w-xl text-center md:text-right">
                Historical results from out-of-sample tests. Past performance does not guarantee future results. This is not financial advice.
            </div>
        </div>
      </footer>
    </div>
  );
}
