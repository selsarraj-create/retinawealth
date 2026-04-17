import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Risk Disclosure | RETINA Wealth',
};

export default function RiskPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Risk Disclosure</h1>
      <p className="text-sm text-slate-500 mb-12">Last updated: April 2026</p>

      <div className="prose prose-slate prose-sm max-w-none space-y-8">
        <section className="p-6 rounded-2xl bg-red-50 border border-red-100">
          <h2 className="text-xl font-bold text-red-900 mb-3">⚠️ Important Warning</h2>
          <p className="text-red-800 leading-relaxed font-medium">Trading in financial instruments involves a high degree of risk and may not be suitable for all investors. You should carefully consider your investment objectives, level of experience, and risk appetite before using the Retina Wealth platform. You could sustain a loss of some or all of your invested capital.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">1. Market Risk</h2>
          <p className="text-slate-600 leading-relaxed">Financial markets are inherently volatile. Stock prices can decline rapidly and without warning due to market conditions, economic events, geopolitical developments, or other factors beyond the control of any trading system. No algorithm, model, or strategy can eliminate market risk.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">2. Past Performance</h2>
          <p className="text-slate-600 leading-relaxed">All performance figures presented on the Retina Wealth platform, including backtest results and out-of-sample test metrics, are historical in nature. <strong>Past performance does not guarantee or indicate future results.</strong> The statistical edge demonstrated in testing may not persist in live trading conditions.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">3. Algorithmic Trading Risks</h2>
          <p className="text-slate-600 leading-relaxed">Automated trading systems carry unique risks including: software errors or bugs; connectivity failures between the platform and your broker; latency in order execution; model degradation over time as market conditions evolve; and the possibility of rapid, significant losses during extreme market events (e.g., flash crashes).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">4. Drawdown Protection Limitations</h2>
          <p className="text-slate-600 leading-relaxed">The Drawdown Protection feature is designed to reduce exposure during periods of elevated market risk. However, it is not a guarantee against losses. The system may not react quickly enough during sudden market dislocations, may produce false signals, or may reduce exposure prematurely during normal market fluctuations.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">5. Liquidity Risk</h2>
          <p className="text-slate-600 leading-relaxed">In certain market conditions, it may be difficult or impossible to execute trades at desired prices. This is particularly relevant during market stress events when liquidity can evaporate rapidly, potentially resulting in executions at prices significantly different from those anticipated by the model.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">6. Not Financial Advice</h2>
          <p className="text-slate-600 leading-relaxed">Retina Wealth does not provide financial advice, investment advice, tax advice, or legal advice. The Service is a technology platform that executes algorithmically generated trading signals. You should consult with qualified professionals before making any investment decisions.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">7. Regulatory Status</h2>
          <p className="text-slate-600 leading-relaxed">Retina Wealth Ltd is a technology company. We are not a registered broker-dealer, investment adviser, or any other type of regulated financial entity. We do not hold, custody, or manage client funds. All trading is executed through your existing brokerage account.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">8. Your Responsibility</h2>
          <p className="text-slate-600 leading-relaxed">By using Retina Wealth, you acknowledge that you understand and accept all risks associated with automated trading. You are solely responsible for your investment decisions and should only use capital you can afford to lose entirely.</p>
        </section>
      </div>
    </div>
  );
}
