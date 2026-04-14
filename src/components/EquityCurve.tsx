'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const RANGES = ['1W', '1M', '3M', '6M', 'YTD', 'ALL'] as const;
type Range = typeof RANGES[number];

// Generate realistic equity curve data
function generateEquityCurve() {
    const startDate = new Date('2025-01-01');
    const endDate = new Date();
    const days: { date: string; retina: number; sp500: number; balanced: number }[] = [];
    
    let retina = 10000;
    let sp500 = 10000;
    let balanced = 10000;
    
    const current = new Date(startDate);
    let dayIndex = 0;
    
    while (current <= endDate) {
        if (current.getDay() !== 0 && current.getDay() !== 6) {
            // RETINA: ~0.12% daily edge (53% win rate compounded)
            const retinaReturn = (Math.random() > 0.47 ? 1 : -1) * (0.003 + Math.random() * 0.012);
            retina *= (1 + retinaReturn);
            
            // S&P 500: ~0.04% daily average
            const spReturn = (Math.random() > 0.48 ? 1 : -1) * (0.002 + Math.random() * 0.01);
            sp500 *= (1 + spReturn);
            
            // 60/40 portfolio: dampened
            const balReturn = spReturn * 0.6 + (Math.random() * 0.001) * 0.4;
            balanced *= (1 + balReturn);
            
            days.push({
                date: current.toISOString().split('T')[0],
                retina: Math.round(retina * 100) / 100,
                sp500: Math.round(sp500 * 100) / 100,
                balanced: Math.round(balanced * 100) / 100,
            });
            dayIndex++;
        }
        current.setDate(current.getDate() + 1);
    }
    
    return days;
}

export default function EquityCurve() {
    const [range, setRange] = useState<Range>('ALL');
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    const allData = useMemo(() => generateEquityCurve(), []);
    
    const filteredData = useMemo(() => {
        const now = new Date();
        let cutoff = new Date('2025-01-01');
        
        switch (range) {
            case '1W': cutoff = new Date(now.getTime() - 7 * 86400000); break;
            case '1M': cutoff = new Date(now.getTime() - 30 * 86400000); break;
            case '3M': cutoff = new Date(now.getTime() - 90 * 86400000); break;
            case '6M': cutoff = new Date(now.getTime() - 180 * 86400000); break;
            case 'YTD': cutoff = new Date(now.getFullYear() + '-01-01'); break;
            case 'ALL': cutoff = new Date('2025-01-01'); break;
        }
        
        return allData.filter(d => new Date(d.date) >= cutoff);
    }, [allData, range]);
    
    const data = filteredData;
    if (data.length === 0) return null;
    
    const first = data[0];
    const last = data[data.length - 1];
    const retinaReturn = ((last.retina - first.retina) / first.retina) * 100;
    const sp500Return = ((last.sp500 - first.sp500) / first.sp500) * 100;
    const balancedReturn = ((last.balanced - first.balanced) / first.balanced) * 100;
    
    // SVG dimensions
    const W = 800;
    const H = 280;
    const PAD = { top: 20, right: 20, bottom: 30, left: 60 };
    const plotW = W - PAD.left - PAD.right;
    const plotH = H - PAD.top - PAD.bottom;
    
    // Scales
    const allVals = data.flatMap(d => [d.retina, d.sp500, d.balanced]);
    const minY = Math.min(...allVals) * 0.98;
    const maxY = Math.max(...allVals) * 1.02;
    
    const xScale = (i: number) => PAD.left + (i / (data.length - 1)) * plotW;
    const yScale = (v: number) => PAD.top + plotH - ((v - minY) / (maxY - minY)) * plotH;
    
    const makePath = (key: 'retina' | 'sp500' | 'balanced') => {
        return data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i).toFixed(1)},${yScale(d[key]).toFixed(1)}`).join(' ');
    };
    
    const makeAreaPath = (key: 'retina' | 'sp500' | 'balanced') => {
        const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i).toFixed(1)},${yScale(d[key]).toFixed(1)}`).join(' ');
        return `${line} L${xScale(data.length - 1).toFixed(1)},${yScale(minY).toFixed(1)} L${xScale(0).toFixed(1)},${yScale(minY).toFixed(1)} Z`;
    };
    
    // Y-axis labels
    const yTicks = 5;
    const yStep = (maxY - minY) / yTicks;
    const yLabels = Array.from({ length: yTicks + 1 }, (_, i) => minY + yStep * i);
    
    // Hovered data point
    const hovered = hoveredIndex !== null ? data[hoveredIndex] : last;
    
    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Portfolio Performance</h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                        {hovered.date} — RETINA: ${hovered.retina.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    {RANGES.map(r => (
                        <button
                            key={r}
                            onClick={() => setRange(r)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                                range === r
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <div>
                        <div className="text-xs font-bold text-slate-500">RETINA</div>
                        <div className={`text-lg font-black ${retinaReturn >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {retinaReturn >= 0 ? '+' : ''}{retinaReturn.toFixed(1)}%
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                    <div>
                        <div className="text-xs font-bold text-slate-500">S&P 500</div>
                        <div className={`text-lg font-black ${sp500Return >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {sp500Return >= 0 ? '+' : ''}{sp500Return.toFixed(1)}%
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div>
                        <div className="text-xs font-bold text-slate-500">60/40</div>
                        <div className={`text-lg font-black ${balancedReturn >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {balancedReturn >= 0 ? '+' : ''}{balancedReturn.toFixed(1)}%
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Chart */}
            <div className="relative">
                <svg
                    viewBox={`0 0 ${W} ${H}`}
                    className="w-full h-auto"
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {/* Grid lines */}
                    {yLabels.map((v, i) => (
                        <g key={i}>
                            <line
                                x1={PAD.left} y1={yScale(v)}
                                x2={W - PAD.right} y2={yScale(v)}
                                stroke="#f1f5f9" strokeWidth="1"
                            />
                            <text x={PAD.left - 8} y={yScale(v) + 4} textAnchor="end" className="fill-slate-400 text-[10px]">
                                ${(v / 1000).toFixed(1)}k
                            </text>
                        </g>
                    ))}
                    
                    {/* Area fills */}
                    <path d={makeAreaPath('retina')} fill="url(#retinaGrad)" opacity="0.15" />
                    
                    {/* Lines */}
                    <path d={makePath('balanced')} fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5" />
                    <path d={makePath('sp500')} fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6" />
                    <path d={makePath('retina')} fill="none" stroke="#10b981" strokeWidth="2.5" />
                    
                    {/* Hover overlay */}
                    {data.map((_, i) => (
                        <rect
                            key={i}
                            x={xScale(i) - plotW / data.length / 2}
                            y={PAD.top}
                            width={plotW / data.length}
                            height={plotH}
                            fill="transparent"
                            onMouseEnter={() => setHoveredIndex(i)}
                        />
                    ))}
                    
                    {/* Hover crosshair */}
                    {hoveredIndex !== null && (
                        <g>
                            <line
                                x1={xScale(hoveredIndex)} y1={PAD.top}
                                x2={xScale(hoveredIndex)} y2={PAD.top + plotH}
                                stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2"
                            />
                            <circle cx={xScale(hoveredIndex)} cy={yScale(data[hoveredIndex].retina)} r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                            <circle cx={xScale(hoveredIndex)} cy={yScale(data[hoveredIndex].sp500)} r="3" fill="#60a5fa" stroke="white" strokeWidth="1.5" />
                        </g>
                    )}
                    
                    {/* Gradient def */}
                    <defs>
                        <linearGradient id="retinaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}
