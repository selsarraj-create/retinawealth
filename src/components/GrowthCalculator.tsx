"use client";

import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';

const RETINA_CAGR = 0.417;
const SP500_CAGR = 0.10;

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

const DEPOSITS = [5000, 10000, 25000, 50000, 100000, 250000];
const YEARS = [1, 2, 3, 4, 5];

export default function GrowthCalculator() {
  const [deposit, setDeposit] = useState(25000);
  const [years, setYears] = useState(3);

  const retina = useMemo(() => deposit * Math.pow(1 + RETINA_CAGR, years), [deposit, years]);
  const sp500 = useMemo(() => deposit * Math.pow(1 + SP500_CAGR, years), [deposit, years]);
  const advantage = retina - sp500;

  // Generate chart bars (year by year)
  const chartData = useMemo(() => {
    const data = [];
    for (let y = 0; y <= years; y++) {
      data.push({
        year: y,
        retina: deposit * Math.pow(1 + RETINA_CAGR, y),
        sp500: deposit * Math.pow(1 + SP500_CAGR, y),
      });
    }
    return data;
  }, [deposit, years]);

  const maxVal = chartData[chartData.length - 1].retina;

  return (
    <section className="py-24 px-6 bg-white border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold font-mono tracking-wider">
            GROWTH CALCULATOR
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            See your edge compound.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A 2.9% win rate edge doesn&apos;t sound like much — until you see what compounding does over time.
          </p>
        </div>

        <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-lg">
          {/* Controls */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Deposit selector */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Starting Investment
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DEPOSITS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDeposit(d)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-bold transition-all ${
                      deposit === d
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {formatCurrency(d)}
                  </button>
                ))}
              </div>
            </div>

            {/* Years selector */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Time Horizon
              </label>
              <div className="grid grid-cols-5 gap-2">
                {YEARS.map((y) => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-bold transition-all ${
                      years === y
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {y}yr
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-8">
            <div className="flex items-end gap-1 md:gap-2 h-48 md:h-64">
              {chartData.map((d, i) => (
                <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-0.5 items-end" style={{ height: '100%' }}>
                    {/* Retina bar */}
                    <div className="flex-1 flex flex-col items-center justify-end h-full">
                      <div className="text-[10px] md:text-xs font-bold text-emerald-700 mb-1 whitespace-nowrap">
                        {i === chartData.length - 1 ? formatCurrency(d.retina) : ''}
                      </div>
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all duration-500 min-h-[4px]"
                        style={{ height: `${(d.retina / maxVal) * 100}%` }}
                      />
                    </div>
                    {/* S&P bar */}
                    <div className="flex-1 flex flex-col items-center justify-end h-full">
                      <div className="text-[10px] md:text-xs font-medium text-slate-400 mb-1 whitespace-nowrap">
                        {i === chartData.length - 1 ? formatCurrency(d.sp500) : ''}
                      </div>
                      <div
                        className="w-full bg-slate-200 rounded-t-md transition-all duration-500 min-h-[4px]"
                        style={{ height: `${(d.sp500 / maxVal) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">
                    {d.year === 0 ? 'Start' : `Yr ${d.year}`}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-emerald-600 to-emerald-400" />
                <span className="font-bold text-slate-700">RETINA</span>
                <span className="text-slate-400">(41.7% CAGR)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-sm bg-slate-200" />
                <span className="font-medium text-slate-500">S&P 500</span>
                <span className="text-slate-400">(10% CAGR)</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
              <div className="text-sm font-medium text-emerald-600/70 mb-1">RETINA Portfolio</div>
              <div className="text-3xl font-black text-emerald-700">{formatCurrency(retina)}</div>
              <div className="text-xs text-emerald-600/60 mt-1">
                +{((retina / deposit - 1) * 100).toFixed(0)}% total return
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-sm font-medium text-slate-500 mb-1">S&P 500</div>
              <div className="text-3xl font-black text-slate-600">{formatCurrency(sp500)}</div>
              <div className="text-xs text-slate-400 mt-1">
                +{((sp500 / deposit - 1) * 100).toFixed(0)}% total return
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white border-2 border-emerald-200 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600" />
              <div className="text-sm font-medium text-emerald-600 mb-1 flex items-center justify-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Your Edge
              </div>
              <div className="text-3xl font-black text-emerald-700">+{formatCurrency(advantage)}</div>
              <div className="text-xs text-emerald-600/60 mt-1">
                extra vs passive indexing
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-slate-400 text-center mt-6 max-w-lg mx-auto leading-relaxed">
            Based on historical 41.7% annualised CAGR from out-of-sample backtests. Past performance does not guarantee future results. This is not financial advice. Capital is at risk.
          </p>
        </div>
      </div>
    </section>
  );
}
