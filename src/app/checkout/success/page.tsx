'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Package, ArrowRight, Coffee } from 'lucide-react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { formatPrice } from '@/lib/utils'
import OrderStatusTracker from '@/components/ui/OrderStatusTracker'

interface OrderData {
  customerName: string
  total: number
  status: string
  items: Array<{ name: string; quantity: number; price: number }>
}

function SuccessContent() {
  const params   = useSearchParams()
  const orderId  = params.get('order')
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) { setLoading(false); return }
    getDoc(doc(db, 'orders', orderId))
      .then((snap) => {
        if (snap.exists()) setOrder(snap.data() as OrderData)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [orderId])

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-6">
      <div className="max-w-lg w-full">
        {/* Animated checkmark */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Check size={44} className="text-green-500" strokeWidth={2.5} />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 w-8 h-8 bg-cream-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <Coffee size={14} className="text-espresso-900" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-5xl text-espresso-900 dark:text-cream-100 font-light mb-3">
            Order Confirmed!
          </h1>
          <p className="font-body text-espresso-500 dark:text-cream-400 leading-relaxed">
            {order
              ? `Thank you, ${order.customerName?.split(' ')[0]}! We're crafting your drinks with care.`
              : "Thank you! We're crafting your drinks with care."}
          </p>
          {orderId && (
            <p className="font-mono text-xs text-espresso-400 dark:text-cream-500 mt-2">
              Order #{orderId.slice(0, 8).toUpperCase()}
            </p>
          )}
        </motion.div>

        {/* Order status tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-espresso-900 rounded-2xl p-6 border border-espresso-900/8 dark:border-cream-100/8 mb-5"
        >
          <h3 className="font-display text-lg text-espresso-900 dark:text-cream-100 mb-5">
            Order Status
          </h3>
          <OrderStatusTracker status={(order?.status as any) || 'confirmed'} />
        </motion.div>

        {/* Order summary */}
        {order && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-white dark:bg-espresso-900 rounded-2xl p-6 border border-espresso-900/8 dark:border-cream-100/8 mb-6"
          >
            <h3 className="font-display text-lg text-espresso-900 dark:text-cream-100 mb-4">What you ordered</h3>
            <div className="space-y-2 mb-4">
              {order.items?.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="font-body text-sm text-espresso-700 dark:text-cream-300">
                    {item.name} <span className="text-espresso-400 dark:text-cream-500">×{item.quantity}</span>
                  </span>
                  <span className="font-mono text-sm text-espresso-600 dark:text-cream-400">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-espresso-900/8 dark:border-cream-100/8 flex justify-between">
              <span className="font-body text-sm font-semibold text-espresso-900 dark:text-cream-100">Total paid</span>
              <span className="font-mono font-semibold text-espresso-900 dark:text-cream-100">
                {formatPrice(order.total)}
              </span>
            </div>
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link href="/" className="btn-primary flex-1 justify-center">
            Back to Home
          </Link>
          <Link href="/orders" className="btn-outline flex-1 justify-center">
            <Package size={16} />
            View all orders
          </Link>
        </motion.div>

        {/* Estimated time badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream-100 dark:bg-espresso-800 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-body text-xs text-espresso-600 dark:text-cream-400">
              Estimated ready in <strong>10–15 minutes</strong>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cream-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
