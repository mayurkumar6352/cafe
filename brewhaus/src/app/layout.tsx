import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/hooks/useAuth'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/cart/CartDrawer'
import ScrollToTop from '@/components/ui/ScrollToTop'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
})

export const metadata: Metadata = {
  title: 'Brewhaus — Artisan Coffee & Beverages',
  description: 'Premium artisan café offering handcrafted coffees, cold brews, and signature shakes. Experience the art of the perfect brew.',
  keywords: 'coffee, cafe, cold brew, artisan, specialty coffee, shakes',
  openGraph: {
    title: 'Brewhaus — Artisan Coffee & Beverages',
    description: 'Premium artisan café offering handcrafted coffees, cold brews, and signature shakes.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} font-body bg-cream-50 dark:bg-espresso-950 text-espresso-900 dark:text-cream-100 antialiased`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <CartDrawer />
          <ScrollToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1e100a',
                color: '#fdf8ed',
                fontFamily: 'var(--font-dm-sans)',
                borderRadius: '12px',
                border: '1px solid rgba(243,224,176,0.15)',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
