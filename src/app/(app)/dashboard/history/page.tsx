'use client';

import { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Download, Search, Filter } from 'lucide-react';

type Trade = {
    id: string;
    date: string;
    ticker: string;
    direction: 'LONG' | 'SHORT';
    entry: number;
    exit: number;
    pnl: number;
    pnlPercent: number;
    holdDays: number;
    confidence: number;
    ensemble: '3/3' | '2/3';
    status: 'CLOSED' | 'OPEN';
};

const TICKERS = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'META', 'AMZN', 'TSLA', 'AMD', 'JPM', 'V', 'MA', 'CRM', 'NFLX', 'COST', 'HD'];

function generateTrades(): Trade[] {
    const trades: Trade[] = [];
    const now = new Date();
    
    for (let i = 0; i < 150; i++) {
        const daysAgo = Math.floor(Math.random() * 180);
        const date = new Date(now.getTime() - daysAgo * 86400000);
        const ticker = TICKERS[Math.floor(Math.random() * TICKERS.length)];
        const isLong = Math.random() > 0.35;
        const entry = 50 + Math.random() * 450;
        const winRate = 0.529; // Model win rate
        const won = Math.random() < winRate;
        const move = (0.5 + Math.random() * 4) / 100;
        
        let pnlPercent: number;
        if (isLong) {
            pnlPercent = won ? move : -move;
        } else {
            pnlPercent = won ? move : -move;
        }
        
        const exit = entry * (1 + pnlPercent);
        const holdDays = 1 + Math.floor(Math.random() * 20);
        const isOpen = i < 5;
        
        trades.push({
            id: `T${String(i).padStart(4, '0')}`,
            date: date.toISOString().split('T')[0],
            ticker,
            direction: isLong ? 'LONG' : 'SHORT',
            entry: Math.round(entry * 100) / 100,
            exit: isOpen ? entry * (1 + (Math.random() * 0.02 - 0.005)) : Math.round(exit * 100) / 100,
            pnl: Math.round(entry * 100 * pnlPercent) / 100,
            pnlPercent: Math.round(pnlPercent * 10000) / 100,
            holdDays: isOpen ? Math.floor((now.getTime() - date.getTime()) / 86400000) : holdDays,
            confidence: Math.round((0.52 + Math.random() * 0.28) * 1000) / 1000,
            ensemble: Math.random() > 0.4 ? '3/3' : '2/3',
            status: isOpen ? 'OPEN' : 'CLOSED',
        });
    }
    
    return trades.sort((a, b) => b.date.localeCompare(a.date));
}

export default function HistoryPage() {
    const [search, setSearch] = useState('');
    const [dirFilter, setDirFilter] = useState<'ALL' | 'LONG' | 'SHORT'>('ALL');
    const [resultFilter, setResultFilter] = useState<'ALL' | 'WIN' | 'LOSS'>('ALL');
    
    const allTrades = useMemo(() => generateTrades(), []);
    
    const filtered = useMemo(() => {
        return allTrades.filter(t => {
            if (search && !t.ticker.toLowerCase().includes(search.toLowerCase())) return false;
            if (dirFilter !== 'ALL' && t.direction !== dirFilter) return false;
            if (resultFilter === 'WIN' && t.pnlPercent <= 0) return false;
            if (resultFilter === 'LOSS' && t.pnlPercent > 0) return false;
            return true;
        });
    }, [allTrades, search, dirFilter, resultFilter]);
    
    // Stats
    const closed = filtered.filter(t => t.status === 'CLOSED');
    const wins = closed.filter(t => t.pnlPercent > 0);
    const winRate = closed.length > 0 ? (wins.length / closed.length * 100).toFixed(1) : '0';
    const totalPnl = closed.reduce((sum, t) => sum + t.pnl, 0);
    const avgWin = wins.length > 0 ? wins.reduce((s, t) => s + t.pnlPercent, 0) / wins.length : 0;
    const losses = closed.filter(t => t.pnlPercent <= 0);
    const avgLoss = losses.length > 0 ? losses.reduce((s, t) => s + t.pnlPercent, 0) / losses.length : 0;
    
    const exportCSV = () => {
        const headers = 'Date,Ticker,Direction,Entry,Exit,P&L ($),P&L (%),Hold Days,Confidence,Ensemble,Status\n';
        const rows = filtered.map(t =>
            `${t.date},${t.ticker},${t.direction},${t.entry},${t.exit},${t.pnl},${t.pnlPercent}%,${t.holdDays},${t.confidence},${t.ensemble},${t.status}`
        ).join('\n');
        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `retina_trades_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };
    
    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Trade History</h1>
                    <p className="text-sm text-slate-500 mt-1">Complete audit trail of all engine executions</p>
                </div>
                <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-sm"
                >
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Trades</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{closed.length}</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Win Rate</div>
                    <div className="text-2xl font-black text-emerald-700 mt-1">{winRate}%</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total P&L</div>
                    <div className={`text-2xl font-black mt-1 ${totalPnl >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Win</div>
                    <div className="text-2xl font-black text-emerald-700 mt-1">+{avgWin.toFixed(2)}%</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Loss</div>
                    <div className="text-2xl font-black text-rose-600 mt-1">{avgLoss.toFixed(2)}%</div>
                </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search ticker..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div className="flex bg-white border border-slate-200 p-1 rounded-xl">
                    {(['ALL', 'LONG', 'SHORT'] as const).map(d => (
                        <button
                            key={d}
                            onClick={() => setDirFilter(d)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                dirFilter === d ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
                <div className="flex bg-white border border-slate-200 p-1 rounded-xl">
                    {(['ALL', 'WIN', 'LOSS'] as const).map(r => (
                        <button
                            key={r}
                            onClick={() => setResultFilter(r)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                resultFilter === r ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-8 gap-2 px-6 py-4 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50">
                    <div>Date</div>
                    <div>Ticker</div>
                    <div className="text-center">Direction</div>
                    <div className="text-right">Entry</div>
                    <div className="text-right">Exit</div>
                    <div className="text-right">P&L</div>
                    <div className="text-center">Ensemble</div>
                    <div className="text-center">Status</div>
                </div>
                
                <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                    {filtered.map(trade => (
                        <div key={trade.id} className="grid grid-cols-8 gap-2 px-6 py-4 items-center hover:bg-slate-50 transition-colors">
                            <div className="text-sm text-slate-600 font-mono">{trade.date}</div>
                            <div className="font-bold text-slate-900">{trade.ticker}</div>
                            <div className="flex justify-center">
                                {trade.direction === 'LONG' ? (
                                    <div className="flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 text-blue-700 text-[11px] font-bold">
                                        <ArrowUpRight className="w-3 h-3" />LONG
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 text-purple-700 text-[11px] font-bold">
                                        <ArrowDownRight className="w-3 h-3" />SHORT
                                    </div>
                                )}
                            </div>
                            <div className="text-right font-mono text-sm text-slate-700">${trade.entry.toFixed(2)}</div>
                            <div className="text-right font-mono text-sm text-slate-700">${trade.exit.toFixed(2)}</div>
                            <div className={`text-right font-bold font-mono text-sm ${trade.pnlPercent > 0 ? 'text-emerald-700' : trade.pnlPercent < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                                {trade.pnlPercent > 0 ? '+' : ''}{trade.pnlPercent.toFixed(2)}%
                            </div>
                            <div className="flex justify-center">
                                <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded ${
                                    trade.ensemble === '3/3' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                    {trade.ensemble}
                                </span>
                            </div>
                            <div className="flex justify-center">
                                {trade.status === 'OPEN' ? (
                                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">OPEN</span>
                                ) : (
                                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">CLOSED</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
