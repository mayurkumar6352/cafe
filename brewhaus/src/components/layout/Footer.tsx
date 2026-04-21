import Link from 'next/link'
import { Instagram, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-espresso-900 dark:bg-espresso-950 text-cream-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-espresso-900">
                  <path d="M3 6h18M3 6c0 8 6 14 9 14s9-6 9-14M3 6V4h18v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M19 6c0 2 1 3 2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-display text-2xl font-semibold text-cream-100">Brewhaus</span>
            </div>
            <p className="font-body text-sm text-cream-400 leading-relaxed max-w-sm">
              Artisan café crafting exceptional beverages from ethically sourced beans and seasonal ingredients. Every cup tells a story.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 rounded-full bg-espresso-800 hover:bg-cream-500 hover:text-espresso-900 text-cream-400 transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-medium text-cream-100 mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {['Menu', 'About', 'Contact', 'Careers'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="font-body text-sm text-cream-400 hover:text-cream-200 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium text-cream-100 mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Terms & Conditions', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-cream-400 hover:text-cream-200 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="font-body text-xs text-cream-500">Open daily</p>
              <p className="font-mono text-sm text-cream-300 mt-1">07:00 — 22:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream-100/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream-500">
            © {new Date().getFullYear()} Brewhaus. All rights reserved.
          </p>
          <p className="font-body text-xs text-cream-600">
            Crafted with care & caffeine
          </p>
        </div>
      </div>
    </footer>
  )
}
