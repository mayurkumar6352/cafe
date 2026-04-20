'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body className="bg-cream-50 dark:bg-espresso-950 min-h-screen flex flex-col items-center justify-center text-center px-6 font-sans">
        <p className="font-mono text-5xl font-bold text-cream-300 mb-4">500</p>
        <h1 className="text-3xl font-semibold text-espresso-900 dark:text-cream-100 mb-3">
          Something went wrong
        </h1>
        <p className="text-espresso-500 dark:text-cream-400 mb-8 max-w-sm">
          An unexpected error occurred. We've been notified and are working on a fix.
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-espresso-800 text-cream-100 rounded-full text-sm font-medium hover:bg-espresso-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-espresso-800/30 text-espresso-700 rounded-full text-sm font-medium hover:bg-espresso-800/5 transition-colors"
          >
            Go home
          </Link>
        </div>
      </body>
    </html>
  )
}
