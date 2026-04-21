'use client';

import { useState, useEffect, useRef } from 'react';
import { Activity, ShieldAlert, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

const ASSETS = ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'TSLA', 'AMZN', 'META', 'BTC', 'ETH'];

function generateRandomHash() {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

type Trade = {
  id: string;
  time: string;
  action: string;
  asset: string;
  confidence: number;
  hash: string;
  isShield: boolean;
  profitAmount?: number;
};

function generateTrade(): Trade {
  const isShield = Math.random() > 0.90;
  let action = '';
  
  if (isShield) {
      action = 'SHIELD: SAFE HARBOR';
  } else {
      const rand = Math.random();
      if (rand > 0.6) action = 'PROFIT SECURED';
      else if (rand > 0.3) action = 'BOUGHT';
      else action = 'SOLD';
  }
  
  const asset = ASSETS[Math.floor(Math.random() * ASSETS.length)];
  const confidence = isShield ? 100 : Math.floor(Math.random() * 15 + 85); 
  
  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  return {
    id: Math.random().toString(36).substring(7),
    time: timeString,
    action,
    asset: isShield ? '' : asset,
    confidence,
    hash: generateRandomHash(),
    isShield,
    profitAmount: action === 'PROFIT SECURED' ? (Math.random() * 18 + 4.5) : undefined
  };
}

export default function LivePaperTrades() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [balance, setBalance] = useState<number>(10000); 
  const [day, setDay] = useState(1);
  const tickCount = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTrades([generateTrade(), generateTrade(), generateTrade()]);

    const interval = setInterval(() => {
      const newTrade = generateTrade();
      tickCount.current += 1;
      
      // Simulate days passing
      if (tickCount.current % 6 === 0) {
          setDay(d => d + 1);
      }
      
      // Simulate real-time compounding visual tick up
      if (newTrade.profitAmount) {
         setBalance(prev => prev + newTrade.profitAmount!); 
      }

      setTrades(prev => [newTrade, ...prev].slice(0, 4)); 
    }, ircTimer());

    return () => clearInterval(interval);
  }, []);

  // Vary timer slightly for realism
  function ircTimer() {
      return Math.floor(Math.random() * 1500) + 2500; // 2.5s to 4s
  }

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
          
          <div className="bg-black/30 rounded-xl p-4 border border-white/5 relative overflow-hidden flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full translate-x-10 -translate-y-10"></div>
            <div className="relative z-10">
                <div className="text-xs font-medium text-slate-400 mb-1 tracking-wider uppercase">Your Potential Balance</div>
                <div className="text-3xl font-black text-white font-mono tracking-tight">
                ${mounted ? balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '10,000.00'}
                </div>
            </div>
            <div className="relative z-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5 flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400">Day {day}</span>
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
                       trade.action.includes('BOUGHT') ? 'text-blue-400' 
                       : trade.action.includes('PROFIT') ? 'text-emerald-400' 
                       : 'text-rose-400'
                     }`}>
                       {trade.action.includes('BOUGHT') ? <TrendingUp className="w-3.5 h-3.5" /> : trade.action.includes('PROFIT') ? <Activity className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />} 
                       {trade.action} {trade.asset}
                     </span>
                  )}
                </div>
                {!trade.isShield && (
                    <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {trade.profitAmount ? `+$${trade.profitAmount.toFixed(2)}` : `AI Conviction: ${trade.confidence}%`}
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
            <span className="text-[11px] text-slate-500 font-medium">Simulating live $10k subscription tier...</span>
        </div>
      </div>
    </div>
  );
}
