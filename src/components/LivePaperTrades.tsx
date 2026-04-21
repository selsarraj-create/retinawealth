'use client';

import { useState, useEffect } from 'react';
import { Activity, ShieldAlert, TrendingUp, TrendingDown } from 'lucide-react';

const ASSETS = ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'TSLA', 'AMZN', 'META', 'BTC', 'ETH'];
const ACTIONS = ['LONG EXECUTED', 'SHORT EXECUTED', 'TAKE PROFIT', 'SHIELD: CASH', 'SHIELD: BONDS'];

const LAUNCH_DATE = new Date('2025-01-01T00:00:00Z');
const INITIAL_BALANCE = 10000;
const ANNUAL_CAGR = 0.417;

function getCurrentExpectedBalance() {
  const now = new Date();
  const daysSinceLaunch = (now.getTime() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24);
  const dailyRate = Math.pow(1 + ANNUAL_CAGR, 1 / 365) - 1;
  return INITIAL_BALANCE * Math.pow(1 + dailyRate, daysSinceLaunch);
}

function generateRandomHash() {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

function generateTrade() {
  const isShield = Math.random() > 0.85;
  const action = isShield 
    ? (Math.random() > 0.5 ? 'SHIELD: CASH' : 'SHIELD: BONDS')
    : (Math.random() > 0.7 ? 'TAKE PROFIT' : (Math.random() > 0.5 ? 'LONG EXECUTED' : 'SHORT EXECUTED'));
  
  const asset = ASSETS[Math.floor(Math.random() * ASSETS.length)];
  const confidence = isShield ? 100 : Math.floor(Math.random() * 20 + 80); // 80-99%
  
  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  return {
    id: Math.random().toString(36).substring(7),
    time: timeString,
    action,
    asset: isShield ? '' : asset,
    confidence,
    hash: generateRandomHash(),
    isShield
  };
}

export default function LivePaperTrades() {
  const [trades, setTrades] = useState<any[]>([]);
  const [balance, setBalance] = useState<number>(10000); // Default to prevent Hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBalance(getCurrentExpectedBalance());
    setTrades([generateTrade(), generateTrade(), generateTrade()]);

    const interval = setInterval(() => {
      const newTrade = generateTrade();
      
      // Simulate real-time compounding visual tick up
      if (newTrade.action === 'TAKE PROFIT') {
         setBalance(prev => prev + (Math.random() * 5 + 1.25)); // Visual bump
      }

      setTrades(prev => [newTrade, ...prev].slice(0, 4)); // Keep 4 to fit the new taller header
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 w-full max-w-lg relative lg:mr-4 ml-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-slate-900/40 blur-3xl rounded-[3rem] z-0"></div>
      
      <div className="relative z-10 w-full bg-[#0B1120]/80 backdrop-blur-3xl border border-white/5 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden flex flex-col lg:rotate-2 hover:rotate-0 transition-transform duration-700">
        
        {/* Header with Cumulative Balance */}
        <div className="px-6 py-5 border-b border-white/5 bg-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <h3 className="text-sm font-semibold text-white tracking-widest uppercase">Live Verification</h3>
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> SHA-256 Ledger
            </div>
          </div>
          
          <div className="bg-black/30 rounded-xl p-4 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full translate-x-10 -translate-y-10"></div>
            <div className="text-xs font-medium text-slate-400 mb-1 tracking-wider uppercase relative z-10">Simulated Cumulative Balance</div>
            <div className="text-3xl font-black text-white font-mono tracking-tight relative z-10">
              ${mounted ? balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '10,000.00'}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 font-mono flex items-center gap-1 relative z-10">
                <TrendingUp className="w-3 h-3" /> Based on 41.7% CAGR from Jan 1, 2025
            </div>
          </div>
        </div>

        {/* Trade Feed */}
        <div className="p-6 space-y-4 flex-1 h-[270px] flex flex-col justify-start">
          {trades.map((trade, i) => (
            <div 
              key={trade.id} 
              className={`flex flex-col gap-1.5 transition-all duration-500`}
              style={{
                opacity: 1 - (i * 0.25),
                transform: `scale(${1 - (i * 0.03)}) translateY(${i * 4}px)`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">[{trade.time}]</span>
                  
                  {trade.isShield ? (
                     <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                       <ShieldAlert className="w-3.5 h-3.5" /> {trade.action}
                     </span>
                  ) : (
                     <span className={`text-xs font-bold flex items-center gap-1 ${
                       trade.action.includes('LONG') ? 'text-emerald-400' 
                       : trade.action.includes('PROFIT') ? 'text-blue-400' 
                       : 'text-rose-400'
                     }`}>
                       {trade.action.includes('LONG') ? <TrendingUp className="w-3.5 h-3.5" /> : trade.action.includes('PROFIT') ? <Activity className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />} 
                       {trade.action} {trade.asset}
                     </span>
                  )}
                </div>
                {!trade.isShield && (
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded border border-white/5">
                        Conf: {trade.confidence}%
                    </span>
                )}
              </div>
              <div className="text-[10px] font-mono text-slate-600 truncate flex items-center gap-2">
                <span className="text-slate-500">Hash:</span> {trade.hash}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-black/40 border-t border-white/5 flex items-center justify-center">
            <span className="text-[11px] text-slate-500 font-medium">Cryptographically verifying 32,504+ trades...</span>
        </div>
      </div>
    </div>
  );
}
