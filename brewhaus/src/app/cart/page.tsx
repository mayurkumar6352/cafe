'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import Footer from '@/components/layout/Footer'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore()
  const cartTotal = total()
  const tax = cartTotal * 0.08875

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="w-24 h-24 rounded-full bg-cream-100 dark:bg-espresso-800 flex items-center justify-center">
            <ShoppingBag size={36} className="text-cream-400" />
          </div>
          <h1 className="font-display text-4xl text-espresso-900 dark:text-cream-100">Your cart is empty</h1>
          <p className="font-body text-espresso-500 dark:text-cream-400 max-w-xs">
            Add some handcrafted drinks from our menu to get started.
          </p>
          <Link href="/menu" className="btn-primary mt-2">
            Browse Menu
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-5xl text-espresso-900 dark:text-cream-100 font-light">Your Cart</h1>
            <p className="font-body text-sm text-espresso-400 dark:text-cream-500 mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={clearCart}
            className="font-body text-sm text-red-400 hover:text-red-500 transition-colors flex items-center gap-1.5"
          >
            <Trash2 size={14} />
            Clear cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 p-4 bg-white dark:bg-espresso-900 rounded-2xl border border-espresso-900/10 dark:border-cream-100/10"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-display text-xl text-espresso-900 dark:text-cream-100 font-medium leading-tight">{item.name}</h3>
                        <p className="font-body text-xs text-espresso-400 dark:text-cream-500 capitalize mt-0.5">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-espresso-300 dark:text-cream-600 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-3 bg-cream-100 dark:bg-espresso-800 rounded-full px-3 py-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-espresso-600 dark:text-cream-300 hover:text-espresso-900 dark:hover:text-cream-100 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-mono text-sm w-5 text-center text-espresso-800 dark:text-cream-200 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-espresso-600 dark:text-cream-300 hover:text-espresso-900 dark:hover:text-cream-100 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-mono text-lg font-semibold text-espresso-900 dark:text-cream-100">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="font-body text-xs text-espresso-400 dark:text-cream-500">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link href="/menu" className="inline-flex items-center gap-2 font-body text-sm text-espresso-400 dark:text-cream-500 hover:text-cream-600 transition-colors mt-4">
              <ArrowLeft size={14} />
              Continue shopping
            </Link>
          </div>

          {/* Summary panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-espresso-900 rounded-2xl p-6 border border-espresso-900/10 dark:border-cream-100/10 sticky top-24"
            >
              <h2 className="font-display text-2xl text-espresso-900 dark:text-cream-100 mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between font-body text-espresso-600 dark:text-cream-400">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between font-body text-espresso-600 dark:text-cream-400">
                  <span>Tax (8.875%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-body text-espresso-600 dark:text-cream-400">
                  <span>Delivery</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
              </div>

              <hr className="border-espresso-900/10 dark:border-cream-100/10 mb-5" />

              <div className="flex justify-between font-body font-semibold text-espresso-900 dark:text-cream-100 text-lg mb-6">
                <span>Total</span>
                <span className="font-mono">{formatPrice(cartTotal + tax)}</span>
              </div>

              <Link href="/checkout" className="btn-accent w-full justify-center text-base py-3.5">
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              {/* Trust badges */}
              <div className="mt-5 space-y-2">
                {['Secure 256-bit SSL checkout', 'Free delivery on all orders', 'Easy cancellation policy'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    <span className="font-body text-xs text-espresso-400 dark:text-cream-500">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
