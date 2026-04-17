import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | RETINA Wealth',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-12">Last updated: April 2026</p>

      <div className="prose prose-slate prose-sm max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed">We collect information you provide directly, including your name, email address, and brokerage connection credentials (processed via secure third-party APIs). We also collect usage data such as pages visited, features used, and device information through standard web analytics.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
          <p className="text-slate-600 leading-relaxed">We use your information to: provide and maintain the Service; execute automated trades via your connected brokerage; communicate important updates about your account; improve and optimise the platform; and comply with legal obligations. We do not sell your personal data to third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data Security</h2>
          <p className="text-slate-600 leading-relaxed">We employ industry-standard security measures including encryption in transit (TLS 1.3) and at rest (AES-256), secure authentication protocols, and regular security audits. Brokerage credentials are never stored directly — all connections are managed through encrypted OAuth tokens with your broker.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">4. Third-Party Services</h2>
          <p className="text-slate-600 leading-relaxed">We use third-party services for hosting (Vercel), authentication (Supabase), analytics, and brokerage connectivity. These providers process data on our behalf and are bound by their own privacy policies and our data processing agreements.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Retention</h2>
          <p className="text-slate-600 leading-relaxed">We retain your account data for as long as your account is active. Upon account deletion, we will remove your personal data within 30 days, except where retention is required by law (e.g., financial transaction records, which may be retained for up to 7 years).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">6. Your Rights (GDPR)</h2>
          <p className="text-slate-600 leading-relaxed">If you are located in the EEA or UK, you have the right to: access your personal data; rectify inaccurate data; request deletion of your data; restrict processing; data portability; and object to processing. To exercise these rights, contact us at <a href="mailto:privacy@retinawealth.com" className="text-emerald-600 hover:underline">privacy@retinawealth.com</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">7. International Transfers</h2>
          <p className="text-slate-600 leading-relaxed">Your data may be transferred to and processed in countries outside of your country of residence, including the United States and the United Kingdom. We ensure appropriate safeguards are in place for such transfers in accordance with applicable data protection laws.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">8. Changes to This Policy</h2>
          <p className="text-slate-600 leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website and, where appropriate, by email. Your continued use of the Service after changes constitutes acceptance of the updated policy.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">9. Contact</h2>
          <p className="text-slate-600 leading-relaxed">For privacy-related enquiries, contact our Data Protection Officer at <a href="mailto:privacy@retinawealth.com" className="text-emerald-600 hover:underline">privacy@retinawealth.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
