'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { ShoppingBag, MapPin, ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useAuth } from '@/hooks/useAuth'
import { formatPrice } from '@/lib/utils'
import StripeCheckoutForm from '@/components/cart/StripeCheckoutForm'
import toast from 'react-hot-toast'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type Step = 'details' | 'payment'

export default function CheckoutPage() {
  const [step, setStep]             = useState<Step>('details')
  const [clientSecret, setClientSecret] = useState('')
  const [loadingIntent, setLoadingIntent] = useState(false)
  const { items, total } = useCartStore()
  const { user } = useAuth()
  const router = useRouter()

  const cartTotal  = total()
  const tax        = cartTotal * 0.08875
  const orderTotal = cartTotal + tax

  const [details, setDetails] = useState({
    name:    user?.displayName || '',
    email:   user?.email       || '',
    phone:   '',
    address: '',
    city:    '',
    zip:     '',
  })

  // Sync user data when auth loads
  useEffect(() => {
    if (user) {
      setDetails((d) => ({
        ...d,
        name:  d.name  || user.displayName || '',
        email: d.email || user.email       || '',
      }))
    }
  }, [user])

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-6 text-center">
        <ShoppingBag size={48} className="text-cream-400 mb-4" />
        <h2 className="font-display text-3xl text-espresso-900 dark:text-cream-100">Your cart is empty</h2>
        <p className="font-body text-espresso-500 dark:text-cream-400 mt-2 mb-6">Add some drinks first!</p>
        <Link href="/menu" className="btn-primary">Browse Menu</Link>
      </div>
    )
  }

  const handleContinueToPayment = async () => {
    if (!details.name || !details.email || !details.address || !details.city || !details.zip) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoadingIntent(true)
    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: orderTotal,
          metadata: {
            customerName:  details.name,
            customerEmail: details.email,
            itemCount:     String(items.length),
          },
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setClientSecret(data.clientSecret)
      setStep('payment')
    } catch (err: any) {
      toast.error(err.message || 'Failed to initialise payment')
    } finally {
      setLoadingIntent(false)
    }
  }

  const stripeOptions = clientSecret
    ? {
        clientSecret,
        appearance: {
          theme: 'stripe' as const,
          variables: {
            colorPrimary:    '#e2b455',
            colorBackground: '#fefdf8',
            colorText:       '#1e100a',
            borderRadius:    '12px',
            fontFamily:      'DM Sans, system-ui, sans-serif',
          },
        },
      }
    : undefined

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto pt-28">
        <h1 className="font-display text-4xl md:text-5xl text-espresso-900 dark:text-cream-100 font-light mb-8">
          Checkout
        </h1>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10">
          {(['details', 'payment'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                s === step
                  ? 'bg-espresso-800 dark:bg-cream-200 text-cream-100 dark:text-espresso-900'
                  : s === 'details' && step === 'payment'
                  ? 'bg-green-500 text-white'
                  : 'bg-cream-200 dark:bg-espresso-700 text-espresso-500 dark:text-cream-400'
              }`}>
                {s === 'details' && step === 'payment' ? <Check size={14} /> : i + 1}
              </div>
              <span className={`font-body text-sm ${s === step ? 'text-espresso-900 dark:text-cream-100 font-medium' : 'text-espresso-400 dark:text-cream-500'}`}>
                {s === 'details' ? 'Your Details' : 'Payment'}
              </span>
              {i < 1 && <div className="w-12 h-px bg-espresso-200 dark:bg-espresso-700" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* ── Left: Form ── */}
          <div className="lg:col-span-2">
            {step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-espresso-900 rounded-2xl p-6 border border-espresso-900/10 dark:border-cream-100/10"
              >
                <h2 className="font-display text-2xl text-espresso-900 dark:text-cream-100 flex items-center gap-2 mb-6">
                  <MapPin size={20} className="text-cream-500" /> Delivery Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Full name *',       key: 'name',    placeholder: 'Jane Doe',             type: 'text',  colSpan: 1 },
                    { label: 'Email address *',   key: 'email',   placeholder: 'jane@example.com',     type: 'email', colSpan: 1 },
                    { label: 'Phone number',      key: 'phone',   placeholder: '+1 (555) 000-0000',    type: 'tel',   colSpan: 2 },
                    { label: 'Street address *',  key: 'address', placeholder: '123 Main Street',      type: 'text',  colSpan: 2 },
                    { label: 'City *',            key: 'city',    placeholder: 'New York',             type: 'text',  colSpan: 1 },
                    { label: 'ZIP code *',        key: 'zip',     placeholder: '10001',                type: 'text',  colSpan: 1 },
                  ].map((field) => (
                    <div
                      key={field.key}
                      className={field.colSpan === 2 ? 'sm:col-span-2' : ''}
                    >
                      <label className="font-body text-sm text-espresso-700 dark:text-cream-300 mb-1.5 block">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={details[field.key as keyof typeof details]}
                        onChange={(e) => setDetails({ ...details, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="input-field"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleContinueToPayment}
                    disabled={loadingIntent}
                    className="btn-primary disabled:opacity-60"
                  >
                    {loadingIntent ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Preparing payment…
                      </span>
                    ) : (
                      <>Continue to Payment <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'payment' && clientSecret && stripeOptions && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-espresso-900 rounded-2xl p-6 border border-espresso-900/10 dark:border-cream-100/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl text-espresso-900 dark:text-cream-100">
                    Payment
                  </h2>
                  <button
                    onClick={() => setStep('details')}
                    className="font-body text-sm text-espresso-400 dark:text-cream-500 hover:text-espresso-700 dark:hover:text-cream-300 transition-colors"
                  >
                    ← Edit details
                  </button>
                </div>

                <Elements stripe={stripePromise} options={stripeOptions}>
                  <StripeCheckoutForm
                    orderTotal={orderTotal}
                    clientSecret={clientSecret}
                    customerDetails={{
                      name:    details.name,
                      email:   details.email,
                      address: `${details.address}, ${details.city} ${details.zip}`,
                    }}
                  />
                </Elements>
              </motion.div>
            )}
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-espresso-900 rounded-2xl p-6 border border-espresso-900/10 dark:border-cream-100/10 sticky top-24">
              <h3 className="font-display text-xl text-espresso-900 dark:text-cream-100 mb-5">
                Order Summary
              </h3>

              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-espresso-800 dark:text-cream-200 truncate font-medium">
                        {item.name}
                      </p>
                      <p className="font-body text-xs text-espresso-400 dark:text-cream-500">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono text-sm text-espresso-700 dark:text-cream-300 flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-espresso-900/10 dark:border-cream-100/10 mb-4" />

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between font-body text-espresso-500 dark:text-cream-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between font-body text-espresso-500 dark:text-cream-400">
                  <span>Tax (8.875%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-body text-espresso-500 dark:text-cream-400">
                  <span>Delivery</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
              </div>

              <hr className="border-espresso-900/10 dark:border-cream-100/10 my-4" />

              <div className="flex justify-between font-semibold text-espresso-900 dark:text-cream-100 text-base">
                <span className="font-body">Total</span>
                <span className="font-mono">{formatPrice(orderTotal)}</span>
              </div>

              {/* Trust signals */}
              <div className="mt-5 space-y-2 pt-4 border-t border-espresso-900/10 dark:border-cream-100/10">
                {[
                  '🔒 Payments secured by Stripe',
                  '🚚 Free delivery on all orders',
                  '✓  Easy cancellation policy',
                ].map((badge) => (
                  <p key={badge} className="font-body text-xs text-espresso-400 dark:text-cream-500">
                    {badge}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
