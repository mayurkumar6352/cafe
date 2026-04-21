'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="bg-espresso-900 dark:bg-espresso-950 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-12 bg-cream-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <Mail size={20} className="text-cream-400" />
          </div>
          <h2 className="font-display text-4xl text-cream-50 font-light mb-3">
            Get the weekly brew notes
          </h2>
          <p className="font-body text-cream-400 mb-8 leading-relaxed">
            New seasonal drinks, limited specials, and behind-the-scenes stories — delivered to your inbox every Friday.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-green-400"
            >
              <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                <Check size={16} />
              </div>
              <span className="font-body text-sm">You're on the list. See you Friday!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full bg-espresso-800 border border-cream-100/10 text-cream-100 placeholder:text-cream-600 font-body text-sm focus:outline-none focus:border-cream-500/40 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-accent px-6 py-3 disabled:opacity-60"
              >
                {loading ? 'Subscribing…' : (
                  <>Subscribe <ArrowRight size={15} /></>
                )}
              </button>
            </form>
          )}

          <p className="font-body text-xs text-cream-600 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
