'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCartStore()
  const cartTotal = total()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-espresso-900/60 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-cream-50 dark:bg-espresso-900 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-espresso-900/10 dark:border-cream-100/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-espresso-700 dark:text-cream-200" />
                <h2 className="font-display text-xl font-medium text-espresso-900 dark:text-cream-100">
                  Your Order
                </h2>
                {items.length > 0 && (
                  <span className="px-2 py-0.5 bg-cream-200 dark:bg-espresso-700 text-espresso-700 dark:text-cream-200 text-xs font-mono rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-espresso-900/8 dark:hover:bg-cream-100/8 transition-colors"
              >
                <X size={20} className="text-espresso-600 dark:text-cream-300" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-4 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-cream-200 dark:bg-espresso-800 flex items-center justify-center">
                    <ShoppingBag size={28} className="text-cream-500" />
                  </div>
                  <div>
                    <p className="font-display text-xl text-espresso-700 dark:text-cream-200">Your cart is empty</p>
                    <p className="font-body text-sm text-espresso-400 dark:text-cream-400 mt-1">
                      Add some drinks to get started
                    </p>
                  </div>
                  <Link href="/menu" onClick={closeCart} className="btn-primary mt-2">
                    Browse Menu
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        className="flex gap-3 p-3 bg-white dark:bg-espresso-800 rounded-xl border border-espresso-900/6 dark:border-cream-100/6"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-medium text-sm text-espresso-900 dark:text-cream-100 truncate">
                            {item.name}
                          </p>
                          <p className="font-body text-xs text-espresso-400 dark:text-cream-400 capitalize mt-0.5">
                            {item.category}
                          </p>
                          <p className="font-mono text-sm font-medium text-cream-600 mt-1">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 hover:text-red-400 text-espresso-300 dark:text-cream-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="flex items-center gap-2 bg-cream-100 dark:bg-espresso-700 rounded-full px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-espresso-600 dark:text-cream-300 hover:text-espresso-900 dark:hover:text-cream-100 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-mono text-xs w-4 text-center text-espresso-800 dark:text-cream-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-espresso-600 dark:text-cream-300 hover:text-espresso-900 dark:hover:text-cream-100 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-espresso-900/10 dark:border-cream-100/10 bg-cream-50 dark:bg-espresso-900">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-sm text-espresso-500 dark:text-cream-400">Subtotal</span>
                  <span className="font-mono font-semibold text-espresso-900 dark:text-cream-100">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-body text-xs text-espresso-400 dark:text-cream-500">Tax & fees calculated at checkout</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-accent w-full justify-center"
                >
                  Checkout
                  <ArrowRight size={16} />
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full mt-3 font-body text-sm text-espresso-400 dark:text-cream-500 hover:text-espresso-600 dark:hover:text-cream-300 transition-colors"
                >
                  Continue browsing
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
