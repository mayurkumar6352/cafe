// Type augmentation for Stripe in API routes
declare module 'stripe' {
  // Already fully typed via @stripe/stripe-js — this file is intentionally minimal
}

// Extend process.env with our custom vars
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_FIREBASE_API_KEY: string
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string
    NEXT_PUBLIC_FIREBASE_APP_ID: string
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
    STRIPE_SECRET_KEY: string
    STRIPE_WEBHOOK_SECRET: string
    NEXT_PUBLIC_APP_URL: string
  }
}
