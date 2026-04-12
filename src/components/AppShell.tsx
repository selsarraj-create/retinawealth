'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Activity, LayoutDashboard, Settings, User } from 'lucide-react';

export default function AppShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="rd-app flex h-screen w-full overflow-hidden antialiased bg-slate-50">
            {/* 1. Sidebar (Desktop) */}
            <aside className="rd-sidebar hidden md:flex w-64 border-r border-slate-200 flex-col pt-6 z-20 bg-white">
                <div className="px-6 mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">RETINA<span className="text-slate-500 font-light">. Wealth</span></span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link href="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === '/' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
                        <LayoutDashboard className="w-4 h-4" />
                        Live Signals
                    </Link>
                    <Link href="/performance" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === '/performance' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
                        <Activity className="w-4 h-4" />
                        Portfolio Identity
                    </Link>
                    <Link href="/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === '/settings' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
                        <Settings className="w-4 h-4" />
                        Statements
                    </Link>
                </nav>

                <div className="rd-sidebar-footer mt-auto p-4 border-t border-slate-200">
                    <div className="flex justify-between items-center bg-white px-3 py-2.5 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                               <User className="w-3 h-3 text-slate-500" />
                           </div>
                           <div className="flex flex-col">
                               <span className="text-xs font-semibold text-slate-800">Private Client</span>
                           </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    </div>
                </div>
            </aside>

            {/* 2. Main Wrapper */}
            <div className="rd-main flex-1 flex flex-col min-w-0 bg-slate-50">
                {/* 3. Top Bar */}
                <header className="rd-topbar h-16 border-b border-slate-200 bg-white flex justify-between items-center px-4 md:px-8 z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-slate-900 tracking-tight flex items-center gap-2">
                           RETINA
                           <span className="text-[10px] sm:text-xs text-slate-500 font-serif hidden sm:inline-block">Wealth Management</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium text-emerald-700 bg-emerald-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-200">
                            <span className="relative flex h-1.5 sm:h-2 w-1.5 sm:w-2">
                              <span className="relative inline-flex rounded-full h-1.5 sm:h-2 w-1.5 sm:w-2 bg-emerald-500"></span>
                            </span>
                            SECURE
                        </div>
                    </div>
                </header>

                {/* 4. Workspace Content Area */}
                <main className="rd-content flex-1 overflow-y-auto w-full p-4 md:p-8 relative pb-24 md:pb-8">
                    {/* Clean canvas, no background glow needed for Modern Institutional */}
                    {children}
                </main>
            </div>
            
            {/* 5. Mobile Tab Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-white/90 backdrop-blur-xl border-t border-slate-200 z-50 flex items-center justify-around px-6 pb-safe text-slate-500 shrink-0">
                <Link href="/" className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === '/' ? 'text-slate-900' : 'hover:text-slate-700'}`}>
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Signals</span>
                </Link>
                <Link href="/performance" className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === '/performance' ? 'text-slate-900' : 'hover:text-slate-700'}`}>
                    <Activity className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Portfolio</span>
                </Link>
                <Link href="/settings" className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === '/settings' ? 'text-slate-900' : 'hover:text-slate-700'}`}>
                    <Settings className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Statements</span>
                </Link>
            </nav>
        </div>
    );
}
