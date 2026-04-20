'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { db } from '@/lib/firebase'
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore'
import { formatPrice } from '@/lib/utils'
import OrderStatusTracker from '@/components/ui/OrderStatusTracker'
import { OrderSkeleton } from '@/components/ui/Skeleton'

interface OrderItem { id: string; name: string; price: number; quantity: number; image?: string }
interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  createdAt: Timestamp
  customerName: string
  deliveryAddress?: string
}

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const router            = useRouter()
  const [orders, setOrders]   = useState<Order[]>([])
  const [fetching, setFetching] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login?redirect=/orders')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    ;(async () => {
      try {
        const q    = query(collection(db, 'orders'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order)))
      } catch (e) {
        console.error(e)
      } finally {
        setFetching(false)
      }
    })()
  }, [user])

  if (loading || !user) return null

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-display text-5xl text-espresso-900 dark:text-cream-100 font-light">
                Order History
              </h1>
              <p className="font-body text-sm text-espresso-400 dark:text-cream-500 mt-1">
                {!fetching && `${orders.length} ${orders.length === 1 ? 'order' : 'orders'}`}
              </p>
            </div>
            <Link href="/menu" className="btn-outline text-sm py-2.5 px-5">
              Order again
            </Link>
          </div>

          {fetching ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <OrderSkeleton key={i} />)}
            </div>
          ) : orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 bg-cream-100 dark:bg-espresso-800 rounded-full flex items-center justify-center mx-auto mb-5">
                <ShoppingBag size={32} className="text-cream-400" />
              </div>
              <h2 className="font-display text-2xl text-espresso-700 dark:text-cream-300 mb-2">
                No orders yet
              </h2>
              <p className="font-body text-sm text-espresso-400 dark:text-cream-500 mb-6">
                Your order history will appear here once you place your first order.
              </p>
              <Link href="/menu" className="btn-primary">Browse the menu</Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {orders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white dark:bg-espresso-900 rounded-2xl border border-espresso-900/8 dark:border-cream-100/8 overflow-hidden"
                  >
                    {/* Header row */}
                    <button
                      onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                      className="w-full flex items-center justify-between p-5 hover:bg-cream-50 dark:hover:bg-espresso-800/40 transition-colors text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-cream-100 dark:bg-espresso-800 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Package size={17} className="text-cream-600" />
                        </div>
                        <div>
                          <p className="font-body text-sm font-semibold text-espresso-900 dark:text-cream-100">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="font-body text-xs text-espresso-400 dark:text-cream-500 mt-0.5">
                            {order.createdAt?.toDate?.()?.toLocaleDateString('en-US', {
                              year: 'numeric', month: 'short', day: 'numeric',
                              hour: '2-digit', minute: '2-digit',
                            }) || 'Recently'}
                            {' · '}{order.items?.length || 0} {(order.items?.length || 0) === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm font-semibold text-espresso-900 dark:text-cream-100">
                          {formatPrice(order.total)}
                        </span>
                        {expanded === order.id
                          ? <ChevronUp size={16} className="text-espresso-400 flex-shrink-0" />
                          : <ChevronDown size={16} className="text-espresso-400 flex-shrink-0" />
                        }
                      </div>
                    </button>

                    {/* Expanded detail */}
                    <AnimatePresence>
                      {expanded === order.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 border-t border-espresso-900/8 dark:border-cream-100/8 pt-5 space-y-5">
                            {/* Status tracker */}
                            <OrderStatusTracker status={order.status} />

                            {/* Items list */}
                            <div>
                              <p className="font-body text-xs text-espresso-400 dark:text-cream-500 uppercase tracking-wide mb-3">
                                Items ordered
                              </p>
                              <div className="space-y-2">
                                {order.items?.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center">
                                    <span className="font-body text-sm text-espresso-700 dark:text-cream-300">
                                      {item.name}{' '}
                                      <span className="text-espresso-400 dark:text-cream-500">×{item.quantity}</span>
                                    </span>
                                    <span className="font-mono text-sm text-espresso-600 dark:text-cream-400">
                                      {formatPrice(item.price * item.quantity)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Delivery address */}
                            {order.deliveryAddress && (
                              <div>
                                <p className="font-body text-xs text-espresso-400 dark:text-cream-500 uppercase tracking-wide mb-1">
                                  Delivered to
                                </p>
                                <p className="font-body text-sm text-espresso-700 dark:text-cream-300">
                                  {order.deliveryAddress}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
