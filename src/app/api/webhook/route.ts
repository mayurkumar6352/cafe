import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      // Update order status to confirmed
      try {
        const q = query(
          collection(db, 'orders'),
          where('paymentIntentId', '==', paymentIntent.id)
        )
        const snap = await getDocs(q)
        snap.forEach(async (doc) => {
          await updateDoc(doc.ref, { status: 'confirmed' })
        })
      } catch (err) {
        console.error('Error updating order:', err)
      }
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      try {
        const q = query(
          collection(db, 'orders'),
          where('paymentIntentId', '==', paymentIntent.id)
        )
        const snap = await getDocs(q)
        snap.forEach(async (doc) => {
          await updateDoc(doc.ref, { status: 'cancelled' })
        })
      } catch (err) {
        console.error('Error updating order:', err)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
