'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, CreditCard, Key, Shield, ArrowRight, Webhook, CheckCircle2, XCircle, Loader2, DollarSign, Percent, Scale } from 'lucide-react';

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [webhookUrl, setWebhookUrl] = useState('');
    const [webhookStatus, setWebhookStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
    const [webhookSaved, setWebhookSaved] = useState(false);
    
    // Portfolio config
    const [portfolioSize, setPortfolioSize] = useState('10000');
    const [maxPositionPct, setMaxPositionPct] = useState('10');
    const [sizingMethod, setSizingMethod] = useState<'equal' | 'confidence'>('equal');
    
    // Status metrics
    const [tier, setTier] = useState('FREE');
    const [brokerConnected, setBrokerConnected] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setEmail(user.email || '');
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                    
                if (data) {
                    setFirstName(data.first_name || '');
                    setLastName(data.last_name || '');
                    setPhone(data.phone_number || '');
                    setWebhookUrl(data.webhook_url || '');
                    setPortfolioSize(data.portfolio_size?.toString() || '10000');
                    setMaxPositionPct(data.max_position_pct?.toString() || '10');
                    setSizingMethod(data.sizing_method || 'equal');
                    setTier(data.subscription_tier || 'FREE');
                    setBrokerConnected(data.broker_connected || false);
                }
            }
            setLoading(false);
        };
        getProfile();
    }, []);

    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { error } = await supabase.from('profiles').update({
                first_name: firstName,
                last_name: lastName,
                phone_number: phone,
                webhook_url: webhookUrl || null,
                portfolio_size: parseFloat(portfolioSize) || 10000,
                max_position_pct: parseFloat(maxPositionPct) || 10,
                sizing_method: sizingMethod
            }).eq('id', user.id);
            
            if (!error) {
                // UI feedback could go here
            }
        }
        setSaving(false);
    };

    if (loading) return (
        <div className="flex-1 p-8 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 rounded-full border-4 border-slate-200 border-t-slate-900"></div>
        </div>
    );

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 relative p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl mx-auto space-y-8">
                
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your account profile and institutional access layers.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Col: Forms */}
                    <div className="md:col-span-2 space-y-6">
                        
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                                    <User className="w-5 h-5 text-slate-700" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Personal Identity</h3>
                                    <p className="text-sm text-slate-500">KYC and standard contact details.</p>
                                </div>
                            </div>
                            
                            <form onSubmit={updateProfile} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">First Name</label>
                                        <input 
                                            type="text" 
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Last Name</label>
                                        <input 
                                            type="text" 
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Phone Number (Alerts)</label>
                                    <input 
                                        type="tel" 
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Email (Auth)</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        disabled
                                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-medium outline-none cursor-not-allowed opacity-70"
                                    />
                                </div>

                                <button 
                                    disabled={saving}
                                    type="submit"
                                    className="mt-6 py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? 'UPDATING...' : 'SAVE PROFILE'}
                                </button>
                            </form>
                        </div>

                        {/* Portfolio Allocation */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                    <Scale className="w-5 h-5 text-emerald-700" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Portfolio Allocation</h3>
                                    <p className="text-xs text-slate-500">System-managed position sizing</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-slate-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                        <DollarSign className="w-3.5 h-3.5" />
                                        Total Capital Allocated
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">$</span>
                                        <input 
                                            type="number" 
                                            value={portfolioSize}
                                            onChange={e => setPortfolioSize(e.target.value)}
                                            min="1000"
                                            step="1000"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-slate-900 font-bold text-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* System-calculated sizing */}
                                <div className="p-4 rounded-xl bg-slate-900 text-white">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">SYSTEM-MANAGED SIZING</div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Method</span>
                                            <span className="font-bold">Equal Weight</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Position size</span>
                                            <span className="font-bold">Capital ÷ Signals</span>
                                        </div>
                                        <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                                            <span className="text-slate-400">Example: 8 signals</span>
                                            <span className="font-black text-emerald-400 text-lg">
                                                ${((parseFloat(portfolioSize) || 10000) / 8).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
                                    <p className="text-[11px] text-slate-500 leading-relaxed">
                                        RETINA enforces equal-weight allocation across all signals. This is not configurable — consistent sizing is mathematically required for the law of large numbers to deliver the expected edge.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Access Tier & Security */}
                    <div className="space-y-6">
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                                    <CreditCard className="w-5 h-5 text-slate-700" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Access Tier</h3>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
                                <Shield className="w-8 h-8 text-emerald-700 mb-2" />
                                <span className="text-2xl font-black text-slate-900 tracking-tight">{tier} Access</span>
                                <span className="text-xs text-slate-500 mt-1">30-Day Evaluation</span>
                            </div>
                            <button className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-900 text-sm font-bold transition-all">
                                UPGRADE TO STANDARD
                            </button>
                        </div>

                        {/* Webhook Integration */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                                    <Webhook className="w-5 h-5 text-indigo-700" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Signal Webhook</h3>
                                    <p className="text-xs text-slate-500">TradePost / Custom Endpoint</p>
                                </div>
                            </div>
                            
                            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                                Paste your webhook URL below. RETINA will fire signals directly to your TradePost or custom endpoint after each daily execution cycle.
                            </p>

                            <div className="space-y-3">
                                <div className="relative">
                                    <input 
                                        type="url" 
                                        value={webhookUrl}
                                        onChange={e => { setWebhookUrl(e.target.value); setWebhookSaved(false); }}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-slate-900 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                        placeholder="https://tradepost.io/wh/usr_..."
                                    />
                                    {webhookUrl && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {webhookStatus === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                            {webhookStatus === 'error' && <XCircle className="w-4 h-4 text-rose-500" />}
                                            {webhookStatus === 'testing' && <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex gap-2">
                                    <button
                                        onClick={async () => {
                                            if (!webhookUrl) return;
                                            setWebhookStatus('testing');
                                            try {
                                                const res = await fetch(webhookUrl, {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        test: true,
                                                        source: 'retina_wealth',
                                                        ticker: 'TEST',
                                                        action: 'buy',
                                                        confidence: 1.0,
                                                        timestamp: new Date().toISOString()
                                                    })
                                                });
                                                setWebhookStatus(res.ok ? 'success' : 'error');
                                            } catch {
                                                setWebhookStatus('error');
                                            }
                                        }}
                                        disabled={!webhookUrl || webhookStatus === 'testing'}
                                        className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                                    >
                                        {webhookStatus === 'testing' ? 'TESTING...' : 'SEND TEST SIGNAL'}
                                    </button>
                                    <button
                                        onClick={async () => {
                                            const { data: { user } } = await supabase.auth.getUser();
                                            if (user) {
                                                await supabase.from('profiles').update({ webhook_url: webhookUrl || null }).eq('id', user.id);
                                                setWebhookSaved(true);
                                                setTimeout(() => setWebhookSaved(false), 2000);
                                            }
                                        }}
                                        className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                                    >
                                        {webhookSaved ? '✓ SAVED' : 'SAVE WEBHOOK'}
                                    </button>
                                </div>

                                {webhookStatus === 'success' && (
                                    <div className="px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center">
                                        ✓ Test signal received — webhook is active
                                    </div>
                                )}
                                {webhookStatus === 'error' && (
                                    <div className="px-3 py-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
                                        ✗ Webhook unreachable — check URL and try again
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Broker Connect (Future - FCA) */}
                        <div className="bg-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                            <div className="flex items-center gap-3 mb-4 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                                    <Key className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Direct Broker Connect</h3>
                                    <p className="text-xs text-slate-400">Coming Q3 2026 — pending FCA</p>
                                </div>
                            </div>
                            
                            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-bold text-center">
                                IBKR / Robinhood / Trading 212 — Launching Soon
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
