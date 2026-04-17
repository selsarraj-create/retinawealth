import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | RETINA Wealth',
};

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Cookie Policy</h1>
      <p className="text-sm text-slate-500 mb-12">Last updated: April 2026</p>

      <div className="prose prose-slate prose-sm max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">1. What Are Cookies</h2>
          <p className="text-slate-600 leading-relaxed">Cookies are small text files placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, keeping you logged in, and understanding how you use the platform.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">2. Essential Cookies</h2>
          <p className="text-slate-600 leading-relaxed">These cookies are required for the platform to function properly. They include session cookies for authentication, security tokens, and preferences such as your theme setting. You cannot opt out of essential cookies as the Service will not work without them.</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-3 font-bold text-slate-900 border-b border-slate-200">Cookie</th>
                  <th className="text-left p-3 font-bold text-slate-900 border-b border-slate-200">Purpose</th>
                  <th className="text-left p-3 font-bold text-slate-900 border-b border-slate-200">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-3 font-mono text-xs">sb-auth-token</td>
                  <td className="p-3">Authentication session</td>
                  <td className="p-3">7 days</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3 font-mono text-xs">sb-refresh-token</td>
                  <td className="p-3">Session refresh</td>
                  <td className="p-3">30 days</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">cookie-consent</td>
                  <td className="p-3">Stores your cookie preference</td>
                  <td className="p-3">1 year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">3. Analytics Cookies</h2>
          <p className="text-slate-600 leading-relaxed">We use analytics cookies to understand how visitors interact with our website. This helps us improve the user experience. Analytics data is aggregated and anonymised. We use Vercel Analytics for this purpose.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">4. Marketing Cookies</h2>
          <p className="text-slate-600 leading-relaxed">We may use marketing cookies to deliver relevant advertisements and track the effectiveness of our campaigns. These are only set with your explicit consent.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">5. Managing Your Preferences</h2>
          <p className="text-slate-600 leading-relaxed">You can manage cookie preferences through your browser settings. Most browsers allow you to block or delete cookies. Please note that blocking essential cookies may prevent the Service from functioning correctly.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">6. Contact</h2>
          <p className="text-slate-600 leading-relaxed">For questions about our use of cookies, please contact us at <a href="mailto:privacy@retinawealth.com" className="text-emerald-600 hover:underline">privacy@retinawealth.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
