import Footer from '@/components/layout/Footer'

export default function TermsPage() {
  return (
    <div>
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="font-display text-5xl text-espresso-900 dark:text-cream-100 font-light mb-3">Terms & Conditions</h1>
        <p className="font-body text-sm text-espresso-400 dark:text-cream-500 mb-12">Last updated: January 1, 2025</p>

        <div className="prose prose-espresso dark:prose-invert max-w-none space-y-8 font-body text-espresso-700 dark:text-cream-300 leading-relaxed">
          {[
            {
              title: '1. Acceptance of Terms',
              content: 'By accessing and using the Brewhaus website and ordering services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.'
            },
            {
              title: '2. Ordering & Payment',
              content: 'All orders placed through our website are subject to availability. We reserve the right to refuse any order. Payment must be completed before your order is prepared. We accept major credit cards and digital payment methods. Prices are displayed in USD and include applicable taxes.'
            },
            {
              title: '3. Delivery & Pickup',
              content: 'Delivery times are estimates and may vary based on demand, weather, and other factors. We are not responsible for delays beyond our control. Pickup orders must be claimed within 30 minutes of the estimated ready time. Unclaimed orders will not be refunded.'
            },
            {
              title: '4. Refund Policy',
              content: 'If your order is incorrect or unsatisfactory, please contact us immediately. We will remake your order or issue a credit at our discretion. We do not issue cash refunds for beverages that have been consumed or for orders where preferences were not specified at time of ordering.'
            },
            {
              title: '5. Allergens & Dietary',
              content: 'Our products may contain or come into contact with common allergens including dairy, tree nuts, gluten, and soy. We cannot guarantee that any item is completely free from allergens. Customers with severe allergies should exercise caution and contact us directly before ordering.'
            },
            {
              title: '6. Account Responsibility',
              content: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss resulting from unauthorized use of your account.'
            },
            {
              title: '7. Intellectual Property',
              content: 'All content on this website, including text, graphics, logos, and images, is the property of Brewhaus and protected by applicable copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.'
            },
            {
              title: '8. Limitation of Liability',
              content: 'Brewhaus shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability for any claim arising from these terms shall not exceed the amount you paid for the specific order giving rise to the claim.'
            },
            {
              title: '9. Changes to Terms',
              content: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after any changes constitutes acceptance of the new terms.'
            },
            {
              title: '10. Contact',
              content: 'If you have any questions about these Terms, please contact us at legal@brewhaus.coffee or by mail at Brewhaus, 124 West 23rd Street, New York, NY 10011.'
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
