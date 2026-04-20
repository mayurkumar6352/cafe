import Footer from '@/components/layout/Footer'

export default function PrivacyPage() {
  return (
    <div>
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="font-display text-5xl text-espresso-900 dark:text-cream-100 font-light mb-3">Privacy Policy</h1>
        <p className="font-body text-sm text-espresso-400 dark:text-cream-500 mb-12">Last updated: January 1, 2025</p>

        <div className="space-y-8 font-body text-espresso-700 dark:text-cream-300 leading-relaxed">
          <p className="text-lg text-espresso-600 dark:text-cream-400">
            At Brewhaus, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
          </p>

          {[
            {
              title: '1. Information We Collect',
              content: 'We collect information you provide directly: name, email address, phone number, delivery address, and payment information when you create an account or place an order. We also collect usage data including browsing patterns, device information, IP address, and order history to improve our services.'
            },
            {
              title: '2. How We Use Your Information',
              content: 'We use your information to: process and fulfill your orders, communicate order status updates, improve our menu and services, send promotional offers (with your consent), prevent fraud and ensure security, and comply with legal obligations. We do not sell your personal information to third parties.'
            },
            {
              title: '3. Data Storage & Security',
              content: 'Your data is stored securely using Firebase (Google Cloud Platform) with industry-standard encryption. Payment information is processed via Stripe and we never store full card numbers on our servers. We implement appropriate technical and organizational measures to protect your data.'
            },
            {
              title: '4. Cookies',
              content: 'We use cookies and similar technologies to maintain your session, remember your preferences, and analyze site usage. You can control cookie settings through your browser, though disabling cookies may affect site functionality.'
            },
            {
              title: '5. Third-Party Services',
              content: 'We use third-party services including Firebase (authentication and database), Stripe (payment processing), and Google Analytics (usage analytics). Each has their own privacy policy governing their use of your information.'
            },
            {
              title: '6. Your Rights',
              content: 'You have the right to: access your personal data, correct inaccurate data, request deletion of your data, opt out of marketing communications, and data portability. To exercise these rights, contact us at privacy@brewhaus.coffee.'
            },
            {
              title: '7. Children\'s Privacy',
              content: 'Our services are not directed at children under 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.'
            },
            {
              title: '8. Changes to This Policy',
              content: 'We may update this policy periodically. We will notify you of significant changes via email or a prominent notice on our website. Your continued use of our services after changes constitutes acceptance of the updated policy.'
            },
            {
              title: '9. Contact Us',
              content: 'For privacy-related questions or concerns, contact our Privacy Officer at privacy@brewhaus.coffee or write to us at Brewhaus Privacy, 124 West 23rd Street, New York, NY 10011.'
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-2xl text-espresso-900 dark:text-cream-100 font-medium mb-3">{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
