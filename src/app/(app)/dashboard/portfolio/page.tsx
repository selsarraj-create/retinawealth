'use client';

import { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, PieChart, TrendingUp } from 'lucide-react';

type Position = {
    ticker: string;
    direction: 'LONG' | 'SHORT';
    shares: number;
    entryPrice: number;
    currentPrice: number;
    pnl: number;
    pnlPercent: number;
    allocation: number;
    confidence: number;
    ensemble: '3/3' | '2/3';
    entryDate: string;
    holdDays: number;
};

function generatePositions(): Position[] {
    const tickers = [
        { t: 'AAPL', base: 185, dir: 'LONG' as const },
        { t: 'NVDA', base: 142, dir: 'LONG' as const },
        { t: 'MSFT', base: 425, dir: 'LONG' as const },
        { t: 'META', base: 520, dir: 'LONG' as const },
        { t: 'GOOGL', base: 172, dir: 'LONG' as const },
        { t: 'JPM', base: 198, dir: 'LONG' as const },
        { t: 'AMZN', base: 192, dir: 'SHORT' as const },
        { t: 'TSLA', base: 168, dir: 'SHORT' as const },
    ];
    
    const positions: Position[] = [];
    const totalVal = 100000; // Portfolio value
    
    tickers.forEach(({ t, base, dir }) => {
        const entry = base * (0.96 + Math.random() * 0.08);
        const move = (Math.random() * 0.06 - 0.015);
        const current = entry * (1 + (dir === 'LONG' ? move : -move));
        const pnlPct = ((current - entry) / entry) * 100 * (dir === 'LONG' ? 1 : -1);
        const alloc = 8 + Math.random() * 12;
        const posValue = totalVal * (alloc / 100);
        const shares = Math.floor(posValue / entry);
        
        positions.push({
            ticker: t,
            direction: dir,
            shares,
            entryPrice: Math.round(entry * 100) / 100,
            currentPrice: Math.round(current * 100) / 100,
            pnl: Math.round(shares * (current - entry) * (dir === 'LONG' ? 1 : -1) * 100) / 100,
            pnlPercent: Math.round(pnlPct * 100) / 100,
            allocation: Math.round(alloc * 10) / 10,
            confidence: Math.round((0.55 + Math.random() * 0.25) * 1000) / 1000,
            ensemble: Math.random() > 0.35 ? '3/3' : '2/3',
            entryDate: new Date(Date.now() - (1 + Math.floor(Math.random() * 14)) * 86400000).toISOString().split('T')[0],
            holdDays: 1 + Math.floor(Math.random() * 14),
        });
    });
    
    // Normalize allocations
    const totalAlloc = positions.reduce((s, p) => s + p.allocation, 0);
    const cashAlloc = 100 - totalAlloc;
    positions.forEach(p => p.allocation = Math.round(p.allocation / totalAlloc * (100 - Math.max(0, cashAlloc)) * 10) / 10);
    
    return positions.sort((a, b) => b.allocation - a.allocation);
}

export default function PortfolioPage() {
    const positions = useMemo(() => generatePositions(), []);
    
    const totalInvested = positions.reduce((s, p) => s + p.shares * p.entryPrice, 0);
    const totalCurrent = positions.reduce((s, p) => s + p.shares * p.currentPrice, 0);
    const totalPnl = positions.reduce((s, p) => s + p.pnl, 0);
    const totalPnlPct = (totalPnl / totalInvested) * 100;
    const openLongs = positions.filter(p => p.direction === 'LONG').length;
    const openShorts = positions.filter(p => p.direction === 'SHORT').length;
    const cashPercent = Math.max(0, 100 - positions.reduce((s, p) => s + p.allocation, 0));
    
    // Pie chart segments
    const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#f43f5e', '#6366f1'];
    let cumulativeAngle = 0;
    const pieSegments = positions.map((p, i) => {
        const angle = (p.allocation / 100) * 360;
        const startAngle = cumulativeAngle;
        cumulativeAngle += angle;
        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (startAngle + angle - 90) * Math.PI / 180;
        const r = 80;
        const cx = 100, cy = 100;
        const x1 = cx + r * Math.cos(startRad);
        const y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad);
        const y2 = cy + r * Math.sin(endRad);
        const largeArc = angle > 180 ? 1 : 0;
        const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
        return { path, color: colors[i % colors.length], ticker: p.ticker, alloc: p.allocation };
    });
    
    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Portfolio</h1>
                <p className="text-sm text-slate-500 mt-1">Active positions and allocation breakdown</p>
            </div>
            
            {/* Portfolio Summary */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Allocation Chart */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col items-center">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 self-start">Allocation</h3>
                    <svg viewBox="0 0 200 200" className="w-48 h-48">
                        {pieSegments.map((seg, i) => (
                            <path key={i} d={seg.path} fill={seg.color} stroke="white" strokeWidth="2" opacity="0.85" />
                        ))}
                        <circle cx="100" cy="100" r="45" fill="white" />
                        <text x="100" y="96" textAnchor="middle" className="fill-slate-900 text-[14px] font-bold">{positions.length}</text>
                        <text x="100" y="112" textAnchor="middle" className="fill-slate-500 text-[9px]">positions</text>
                    </svg>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-4 w-full">
                        {positions.map((p, i) => (
                            <div key={p.ticker} className="flex items-center gap-2 text-xs">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
                                <span className="font-bold text-slate-700">{p.ticker}</span>
                                <span className="text-slate-400 ml-auto">{p.allocation}%</span>
                            </div>
                        ))}
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                            <span className="font-bold text-slate-400">Cash</span>
                            <span className="text-slate-400 ml-auto">{cashPercent.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
                
                {/* Stats */}
                <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Portfolio Value</div>
                        <div className="text-2xl font-black text-slate-900 mt-2">${totalCurrent.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unrealised P&L</div>
                        <div className={`text-2xl font-black mt-2 ${totalPnl >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(0)}
                        </div>
                        <div className={`text-sm font-bold ${totalPnlPct >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {totalPnlPct >= 0 ? '+' : ''}{totalPnlPct.toFixed(2)}%
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Long / Short</div>
                        <div className="text-2xl font-black text-slate-900 mt-2">{openLongs} / {openShorts}</div>
                        <div className="text-sm text-slate-500">active positions</div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cash Reserve</div>
                        <div className="text-2xl font-black text-slate-900 mt-2">{cashPercent.toFixed(1)}%</div>
                        <div className="text-sm text-slate-500">undeployed</div>
                    </div>
                </div>
            </div>
            
            {/* Positions Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="font-bold text-slate-900 text-sm">Open Positions</h3>
                </div>
                <div className="grid grid-cols-8 gap-2 px-6 py-3 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    <div>Ticker</div>
                    <div className="text-center">Direction</div>
                    <div className="text-right">Entry</div>
                    <div className="text-right">Current</div>
                    <div className="text-right">P&L</div>
                    <div className="text-center">Alloc</div>
                    <div className="text-center">Ensemble</div>
                    <div className="text-center">Hold</div>
                </div>
                <div className="divide-y divide-slate-100">
                    {positions.map(pos => (
                        <div key={pos.ticker} className="grid grid-cols-8 gap-2 px-6 py-4 items-center hover:bg-slate-50 transition-colors">
                            <div className="font-bold text-lg text-slate-900">{pos.ticker}</div>
                            <div className="flex justify-center">
                                {pos.direction === 'LONG' ? (
                                    <div className="flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 text-blue-700 text-[11px] font-bold">
                                        <ArrowUpRight className="w-3 h-3" />LONG
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 text-purple-700 text-[11px] font-bold">
                                        <ArrowDownRight className="w-3 h-3" />SHORT
                                    </div>
                                )}
                            </div>
                            <div className="text-right font-mono text-sm text-slate-600">${pos.entryPrice.toFixed(2)}</div>
                            <div className="text-right font-mono text-sm text-slate-900 font-bold">${pos.currentPrice.toFixed(2)}</div>
                            <div className="text-right">
                                <div className={`font-bold font-mono text-sm ${pos.pnlPercent > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                                    {pos.pnlPercent > 0 ? '+' : ''}{pos.pnlPercent.toFixed(2)}%
                                </div>
                                <div className={`text-[11px] font-mono ${pos.pnl > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                                    {pos.pnl > 0 ? '+' : ''}${pos.pnl.toFixed(0)}
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-full max-w-[60px]">
                                    <div className="text-center text-xs font-bold text-slate-700 mb-1">{pos.allocation}%</div>
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-400 rounded-full" style={{ width: `${pos.allocation * 3}%` }} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded ${
                                    pos.ensemble === '3/3' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                    {pos.ensemble}
                                </span>
                            </div>
                            <div className="text-center text-sm text-slate-500 font-mono">{pos.holdDays}d</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
