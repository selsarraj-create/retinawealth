'use client';

import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { RetinaLogo } from '@/components/Logo';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;
            
            // Force hard browser reload to update the SSR middleware cookie scope
            window.location.href = '/dashboard';
        } catch (err: any) {
            setError(err.message || "Failed to authenticate");
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col items-center justify-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center mb-4 text-slate-900">
                    <RetinaLogo className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">RETINA<span className="text-slate-500 font-light">. Wealth</span></h1>
                <p className="text-slate-500 text-sm mt-2 text-center">Automated Thermodynamic Execution</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                    {error && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                            <Lock className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Email Address</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 font-medium focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                            placeholder="user@firm.com"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Password</label>
                            <Link href="#" className="text-slate-500 text-xs font-medium hover:text-slate-900">Recovery</Link>
                        </div>
                        <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pr-12 text-slate-900 font-medium focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                placeholder="••••••••"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-sm flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        <span className="relative z-10">{loading ? 'AUTHENTICATING...' : 'SECURE LOGIN'}</span>
                        {!loading && <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />}
                    </button>
                    
                    <p className="text-slate-500 text-xs text-center mt-6">
                        Secure API Portal Access.<br/>Unauthorised routing attempts are actively blocked.
                    </p>
                </form>
            </div>
            
            <p className="text-center text-slate-500 text-sm mt-8">
                Don't have a secure profile?{' '}
                <Link href="/signup" className="text-slate-900 font-bold hover:underline">Apply for Access</Link>
            </p>
        </div>
    );
}
