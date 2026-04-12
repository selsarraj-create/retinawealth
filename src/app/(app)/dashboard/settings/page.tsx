'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, CreditCard, Key, Shield, ArrowRight } from 'lucide-react';

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    
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
                phone_number: phone
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

                        <div className="bg-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                            <div className="flex items-center gap-3 mb-4 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                                    <Key className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Execution Broker</h3>
                                    <p className="text-xs text-slate-400">IBKR / TradeStation</p>
                                </div>
                            </div>
                            
                            {brokerConnected ? (
                                <div className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold text-center">
                                    BROKER CONNECTED
                                </div>
                            ) : (
                                <button className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-sm font-bold transition-all flex justify-center items-center gap-2">
                                    CONNECT API <ArrowRight className="w-4 h-4"/>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
