import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="font-mono text-7xl font-bold text-cream-300 dark:text-espresso-700 mb-4">404</p>
      <h1 className="font-display text-4xl text-espresso-900 dark:text-cream-100 mb-3">Page not found</h1>
      <p className="font-body text-espresso-500 dark:text-cream-400 mb-8">
        Looks like this page got lost in the roastery.
      </p>
      <Link href="/" className="btn-primary">Back to Home</Link>
    </div>
  )
}
