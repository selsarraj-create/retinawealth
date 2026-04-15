'use client';

import { ArrowRight, ShieldCheck, Zap, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { RetinaLogo } from '@/components/Logo';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== passwordConfirm) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) throw signUpError;
            
            // Hard redirection
            window.location.href = '/dashboard';
        } catch (err: any) {
            setError(err.message || "Failed to create account");
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Left Column: Marketing Info */}
            <div className="flex-1 space-y-8 hidden md:block">
                <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center mb-6 text-slate-900">
                        <RetinaLogo className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                        Automate the <br/><span className="text-emerald-700">Thermodynamic Edge.</span>
                    </h1>
                    <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                        Institutional-grade quantitative intelligence, directly piped into your brokerage account without human interference.
                    </p>
                </div>

                <div className="space-y-6 pt-4 border-t border-slate-200 max-w-md">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                            <Zap className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 font-bold mb-1">52.9% Win Rate</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Mathematical portfolio compounding executed via sub-millisecond execution vectors.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200">
                            <ShieldCheck className="w-5 h-5 text-slate-700" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 font-bold mb-1">Crash Shield™</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">The core physics engine actively monitors cross-market risk signals and automatically shields your capital.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Signup Form */}
            <div className="w-full max-w-md shrink-0">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                    <div className="mb-8 md:hidden flex flex-col items-center">
                        <RetinaLogo className="w-8 h-8 text-slate-900 mb-2" />
                        <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-5 relative z-10">
                        {error && (
                            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
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
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                placeholder="user@firm.com"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-slate-900 font-medium focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
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

                        <div className="space-y-2">
                            <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Confirm Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    required
                                    value={passwordConfirm}
                                    onChange={e => setPasswordConfirm(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-slate-900 font-medium focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
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
                            className="w-full mt-2 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-sm flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? 'DEPLOYING PROFILE...' : 'Create Account'}
                            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                        
                        <p className="text-slate-500 text-[10px] text-center mt-6 leading-relaxed">
                            By continuing, you agree to the Terms of Service. RETINA provides mathematical routing software and is NOT a Registered Investment Advisor.
                        </p>
                    </form>
                </div>
                
                <p className="text-center text-slate-500 text-sm mt-8">
                    Already have access?{' '}
                    <Link href="/login" className="text-slate-900 font-bold hover:underline">Log in securely</Link>
                </p>
            </div>
            
        </div>
    );
}
