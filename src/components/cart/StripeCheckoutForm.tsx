'use client'
import { useState, useEffect } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useCartStore } from '@/store/cartStore'
import { useAuth } from '@/hooks/useAuth'
import { formatPrice } from '@/lib/utils'
import { Lock, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

interface StripeCheckoutFormProps {
  orderTotal: number
  clientSecret: string
  customerDetails: {
    name: string
    email: string
    address: string
  }
}

export default function StripeCheckoutForm({
  orderTotal,
  clientSecret,
  customerDetails,
}: StripeCheckoutFormProps) {
  const stripe   = useStripe()
  const elements = useElements()
  const router   = useRouter()
  const { items, clearCart } = useCartStore()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setErrorMsg(null)

    try {
      // Save order to Firestore first (status = pending)
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId:          user?.uid || 'guest',
        customerName:    customerDetails.name,
        customerEmail:   customerDetails.email,
        deliveryAddress: customerDetails.address,
        items: items.map((i) => ({
          id:       i.id,
          name:     i.name,
          price:    i.price,
          quantity: i.quantity,
          image:    i.image,
        })),
        total:     orderTotal,
        status:    'pending',
        createdAt: serverTimestamp(),
      })

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success?order=${orderRef.id}`,
          receipt_email: customerDetails.email,
        },
        redirect: 'if_required',
      })

      if (error) {
        setErrorMsg(error.message || 'Payment failed. Please try again.')
        setLoading(false)
        return
      }

      // Payment succeeded — update order
      clearCart()
      router.push(`/checkout/success?order=${orderRef.id}`)
    } catch (err: any) {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-cream-50 dark:bg-espresso-800 border border-espresso-900/8 dark:border-cream-100/8 rounded-2xl">
        <PaymentElement
          options={{
            layout: 'tabs',
            defaultValues: {
              billingDetails: {
                name:  customerDetails.name,
                email: customerDetails.email,
              },
            },
          }}
        />
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-xl">
          <p className="font-body text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-espresso-400 dark:text-cream-500">
        <Lock size={12} className="text-green-500" />
        <span>Secured by Stripe. Card data never touches our servers.</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="btn-accent w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-cream-500/20"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Processing payment…
          </span>
        ) : (
          <>
            Pay {formatPrice(orderTotal)}
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  )
}
