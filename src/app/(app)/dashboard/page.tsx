'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Target, Clock, Zap, AlertTriangle, Lock, PlayCircle, TrendingUp, DollarSign } from 'lucide-react';
import EquityCurve from '@/components/EquityCurve';

type Signal = {
    id: string;
    ticker: string;
    direction: 'LONG' | 'SHORT';
    confidence: number;
    tier: 'HIGH' | 'CORE' | 'SPECULATIVE';
    horizon: string;
    timestamp: Date;
    price: string;
}

const TICKERS = ['AAPL', 'TSLA', 'MSFT', 'NVDA', 'AMD', 'META', 'AMZN', 'GOOGL', 'COIN', 'MSTR'];
const HORIZONS = ['5D', '10D', '21D'];

function generateSignal(): Signal {
    const isLong = Math.random() > 0.5;
    
    // Weighted probabilities for tiers to mimic reality
    const rand = Math.random();
    let conf = 0;
    let tier: 'HIGH' | 'CORE' | 'SPECULATIVE' = 'SPECULATIVE';

    if (rand > 0.9) {
        conf = 0.70 + Math.random() * 0.15; // >0.70
        tier = 'HIGH';
    } else if (rand > 0.5) {
        conf = 0.55 + Math.random() * 0.14; // 0.55 - 0.69
        tier = 'CORE';
    } else {
        conf = 0.50 + Math.random() * 0.04; // 0.50 - 0.54
        tier = 'SPECULATIVE';
    }
    
    return {
        id: Math.random().toString(36).substring(7),
        ticker: TICKERS[Math.floor(Math.random() * TICKERS.length)],
        direction: isLong ? 'LONG' : 'SHORT',
        confidence: parseFloat(conf.toFixed(3)),
        tier: tier,
        horizon: HORIZONS[Math.floor(Math.random() * HORIZONS.length)],
        timestamp: new Date(),
        price: (100 + Math.random() * 400).toFixed(2),
    }
}

export default function Dashboard() {
    const [signals, setSignals] = useState<Signal[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    
    // Paper Portfolio State
    const [startCapital, setStartCapital] = useState<string>("10000");
    const [unrealisedPercentage, setUnrealisedPercentage] = useState<number>(8.47);
    
    // Derived Paper Metrics
    const capitalNumber = parseFloat(startCapital.replace(/,/g, '')) || 0;
    const profitDollar = capitalNumber * (unrealisedPercentage / 100);
    const currentValue = capitalNumber + profitDollar;

    // Initial load
    useEffect(() => {
        const initial = Array.from({ length: 15 }, generateSignal).sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime());
        setSignals(initial);
    }, []);

    // Websocket Mock Hook
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            const newSignal = generateSignal();
            setSignals(prev => [newSignal, ...prev].slice(0, 50));
            // Slight flutter in P&L for realism
            setUnrealisedPercentage(prev => prev + (Math.random() * 0.04 - 0.015)); 
        }, Math.random() * 4000 + 1500);

        return () => clearInterval(interval);
    }, [isPaused]);

    const getTierColor = (tier: string) => {
        switch(tier) {
            case 'HIGH': return 'emerald';
            case 'CORE': return 'amber';
            case 'SPECULATIVE': return 'rose';
            default: return 'slate';
        }
    }

    return (
        <div className="w-full max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
            
            {/* 1. PAPER PORTFOLIO HERO (THE HOOK) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03] flex text-slate-900 mix-blend-multiply pointer-events-none">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,80 Q25,70 50,40 T100,10" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    </svg>
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end z-10 relative gap-8 lg:gap-10">
                    <div className="space-y-6 flex-1 w-full">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                            <PlayCircle className="w-4 h-4" />
                            Live Paper Trading Mode Active
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <label className="text-slate-500 text-sm font-medium mb-2 flex items-center gap-1.5"><DollarSign className="w-4 h-4"/> Starting Capital</label>
                                <div className="relative max-w-[200px]">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input 
                                        type="text" 
                                        value={startCapital}
                                        onChange={(e) => setStartCapital(e.target.value.replace(/[^0-9.]/g, ''))}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 font-bold font-mono focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-slate-500 text-sm font-medium mb-2 flex items-center gap-1.5">Unrealised 30-Day P&L</label>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-5xl font-black text-emerald-700 tracking-tight">
                                        +${profitDollar.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                    </span>
                                    <span className="text-xl font-bold bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-lg">
                                        +{unrealisedPercentage.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-auto flex flex-col items-start lg:items-end shrink-0">
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-left lg:text-right w-full lg:min-w-[320px]">
                            <p className="text-slate-500 text-sm font-medium mb-1">Current Account Value</p>
                            <p className="text-4xl font-bold text-slate-900 tracking-tight">${currentValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                            <button className="mt-8 w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-sm flex justify-center items-center gap-2">
                                Connect Broker & Trade Live
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 1.5 EQUITY CURVE */}
            <EquityCurve />

            {/* 2. MARKET REGIME INDICATOR (Traffic Light) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                            Market Regime
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                        </h3>
                        <p className="text-sm text-slate-500 mt-0.5">Physics engine regime detection across 1,060 observables</p>
                    </div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                        Updated: {new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* GREEN — Normal */}
                    <div className="relative rounded-2xl p-5 bg-emerald-50 border-2 border-emerald-300 ring-2 ring-emerald-200/50">
                        <div className="absolute top-3 right-3">
                            <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Normal</div>
                                <div className="text-lg font-black text-emerald-800">ACTIVE</div>
                            </div>
                        </div>
                        <p className="text-xs text-emerald-700 leading-relaxed">
                            Covariance matrices within normal bounds. Full signal execution enabled. All positions active.
                        </p>
                    </div>

                    {/* AMBER — Elevated  */}
                    <div className="relative rounded-2xl p-5 bg-slate-50 border border-slate-200 opacity-60">
                        <div className="absolute top-3 right-3">
                            <div className="w-4 h-4 rounded-full bg-amber-400" />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-slate-500" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Elevated</div>
                                <div className="text-lg font-black text-slate-400">STANDBY</div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Structural stress detected. Position sizing reduced to 50%. Speculative signals paused.
                        </p>
                    </div>

                    {/* RED — Crisis */}
                    <div className="relative rounded-2xl p-5 bg-slate-50 border border-slate-200 opacity-60">
                        <div className="absolute top-3 right-3">
                            <div className="w-4 h-4 rounded-full bg-rose-500" />
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-slate-500" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Crisis</div>
                                <div className="text-lg font-black text-slate-400">STANDBY</div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Systemic anomaly detected. All positions liquidated. Capital held in cash until regime clears.
                        </p>
                    </div>
                </div>
            </div>


            {/* 3. TIERED SIGNAL STREAM */}
            <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-1">
                            Live Execution Stream
                            {!isPaused && (
                               <span className="relative flex h-2.5 w-2.5 ml-2">
                                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                               </span>
                            )}
                        </h2>
                        <span className="text-sm text-slate-500">Continuous physics-grade signal processing</span>
                    </div>
                    <div className="flex bg-white border border-slate-200 p-1 rounded-lg shrink-0 shadow-sm">
                        <div className="px-3 py-1 text-xs font-bold text-emerald-700">High (&gt;0.7)</div>
                        <div className="px-3 py-1 text-xs font-bold text-amber-600 border-l border-slate-200">Core (0.55-0.7)</div>
                        <div className="px-3 py-1 text-xs font-bold text-rose-600 border-l border-slate-200">Vol (0.5-0.55)</div>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">
                        <div className="col-span-1">Ticker / Tier</div>
                        <div className="col-span-1 text-center">Direction</div>
                        <div className="col-span-1 text-right">Extracted Price</div>
                        <div className="col-span-1 text-center">Horizon View</div>
                        <div className="col-span-1 text-center">Model Confidence</div>
                        <div className="col-span-1 text-right">Detection Time</div>
                    </div>

                    <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                        {signals.map((signal, index) => {
                            const c = getTierColor(signal.tier);
                            return (
                                <div 
                                    key={signal.id} 
                                    className={`grid grid-cols-6 gap-4 px-6 py-5 items-center hover:bg-slate-50 transition-colors relative
                                    ${index === 0 && !isPaused ? `bg-${c}-50` : ''}`}
                                >
                                    {/* Subtle left border purely for tier color hint */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${c}-500/50`}></div>

                                    {/* Ticker */}
                                    <div className="col-span-1 flex flex-col pl-4">
                                        <span className="font-bold text-lg text-slate-900">{signal.ticker}</span>
                                        <div className={`text-[10px] font-bold font-mono tracking-wider text-${c}-600`}>
                                            {signal.tier}
                                        </div>
                                    </div>

                                    {/* Direction */}
                                    <div className="col-span-1 flex justify-center">
                                        {signal.direction === 'LONG' ? (
                                            <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 text-blue-700 text-xs font-bold w-[80px] justify-center">
                                                <ArrowUpRight className="w-3 h-3" />LONG
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200 text-purple-700 text-xs font-bold w-[80px] justify-center">
                                                <ArrowDownRight className="w-3 h-3" />SHORT
                                            </div>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-1 text-right font-mono text-sm text-slate-700 border-x border-slate-100 flex items-center justify-end px-4">
                                        ${signal.price}
                                    </div>

                                    {/* Horizon */}
                                    <div className="col-span-1 flex justify-center">
                                        <div className="flex items-center justify-center gap-1.5 bg-slate-100 border border-slate-200 px-2 py-1 rounded text-slate-600 text-xs font-bold font-mono">
                                            {signal.horizon}
                                        </div>
                                    </div>

                                    {/* Confidence */}
                                    <div className="col-span-1 flex flex-col items-center gap-2">
                                        <span className={`text-sm font-bold font-mono text-${c}-700`}>{signal.confidence}</span>
                                        <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full bg-${c}-500 rounded-full`}
                                                style={{ width: `${(signal.confidence - 0.4) * 200}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Timestamp */}
                                    <div className="col-span-1 text-right flex flex-col items-end border-l border-slate-100 pl-4">
                                        <span className="text-xs font-bold text-slate-500 font-mono">
                                            {signal.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
                                        </span>
                                        <span className="text-[10px] text-slate-500 mt-1 uppercase">
                                            {index === 0 && !isPaused ? 'Active' : `${Math.floor((new Date().getTime() - signal.timestamp.getTime()) / 1000)}s ago`}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
