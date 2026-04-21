'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Sun, Moon, User } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const pathname = usePathname()
  const { itemCount, openCart } = useCartStore()
  const { user } = useAuth()
  const count = itemCount()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  const toggleDark = () => {
    if (dark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    setDark(!dark)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const isHome = pathname === '/'

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled || !isHome
            ? 'bg-cream-50/90 dark:bg-espresso-950/90 backdrop-blur-xl border-b border-espresso-900/10 dark:border-cream-100/10 shadow-sm'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-espresso-800 dark:bg-cream-200 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-cream-100 dark:text-espresso-900">
                  <path d="M3 6h18M3 6c0 8 6 14 9 14s9-6 9-14M3 6V4h18v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M19 6c0 2 1 3 2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className={cn(
                'font-display text-2xl font-semibold tracking-tight',
                scrolled || !isHome ? 'text-espresso-900 dark:text-cream-100' : 'text-espresso-900 dark:text-cream-100'
              )}>
                Brewhaus
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-body text-sm font-medium tracking-wide transition-colors duration-200 relative group',
                    pathname === link.href
                      ? 'text-cream-600'
                      : 'text-espresso-600 dark:text-cream-300 hover:text-espresso-900 dark:hover:text-cream-100'
                  )}
                >
                  {link.label}
                  <span className={cn(
                    'absolute -bottom-1 left-0 h-px bg-cream-500 transition-all duration-300',
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  )} />
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDark}
                className="p-2.5 rounded-full hover:bg-espresso-900/10 dark:hover:bg-cream-100/10 transition-colors"
                aria-label="Toggle theme"
              >
                {dark ? (
                  <Sun size={18} className="text-cream-300" />
                ) : (
                  <Moon size={18} className="text-espresso-600" />
                )}
              </button>

              {user ? (
                <Link
                  href="/profile"
                  className="p-2.5 rounded-full hover:bg-espresso-900/10 dark:hover:bg-cream-100/10 transition-colors"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-5 h-5 rounded-full" />
                  ) : (
                    <User size={18} className="text-espresso-600 dark:text-cream-300" />
                  )}
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="hidden md:block font-body text-sm font-medium text-espresso-600 dark:text-cream-300 hover:text-espresso-900 dark:hover:text-cream-100 transition-colors"
                >
                  Sign in
                </Link>
              )}

              <button
                onClick={openCart}
                className="relative p-2.5 rounded-full bg-espresso-800 dark:bg-cream-200 text-cream-100 dark:text-espresso-900 hover:bg-espresso-700 dark:hover:bg-cream-100 transition-colors"
              >
                <ShoppingBag size={18} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 min-w-[18px] min-h-[18px] bg-cream-500 text-espresso-900 text-[10px] font-bold rounded-full flex items-center justify-center px-1"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2.5 rounded-full hover:bg-espresso-900/10 dark:hover:bg-cream-100/10 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? (
                  <X size={20} className="text-espresso-700 dark:text-cream-200" />
                ) : (
                  <Menu size={20} className="text-espresso-700 dark:text-cream-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-cream-50/98 dark:bg-espresso-950/98 backdrop-blur-xl border-b border-espresso-900/10 dark:border-cream-100/10 md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'font-body text-lg font-medium',
                      pathname === link.href
                        ? 'text-cream-600'
                        : 'text-espresso-700 dark:text-cream-200'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <hr className="border-espresso-900/10 dark:border-cream-100/10" />
              {user ? (
                <Link href="/profile" onClick={() => setMobileOpen(false)} className="font-body text-sm text-espresso-600 dark:text-cream-300">
                  My Account
                </Link>
              ) : (
                <div className="flex gap-4">
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="btn-outline text-sm py-2.5 px-5">
                    Sign in
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileOpen(false)} className="btn-primary text-sm py-2.5 px-5">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
