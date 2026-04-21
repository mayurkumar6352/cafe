'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Mail, Send, Check } from 'lucide-react'
import Footer from '@/components/layout/Footer'

const locations = [
  { name: 'Brewhaus Downtown', address: '124 West 23rd Street, New York, NY 10011', hours: 'Mon–Fri 7am–9pm · Sat–Sun 8am–10pm', phone: '+1 (212) 555-0124' },
  { name: 'Brewhaus Williamsburg', address: '87 Bedford Avenue, Brooklyn, NY 11211', hours: 'Daily 7am–10pm', phone: '+1 (718) 555-0187' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSent(true)
    setLoading(false)
  }

  return (
    <div>
      {/* Header */}
      <div className="relative pt-32 pb-16 bg-espresso-900 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1400&q=60')] bg-cover bg-center opacity-15" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-7xl text-cream-50 font-light"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-body text-cream-400 text-lg mt-4 max-w-lg"
          >
            We'd love to hear from you. Stop by, call, or drop us a message.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl text-espresso-900 dark:text-cream-100 mb-8">Send us a message</h2>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <Check size={28} className="text-green-500" />
                </div>
                <h3 className="font-display text-2xl text-espresso-900 dark:text-cream-100">Message sent!</h3>
                <p className="font-body text-espresso-500 dark:text-cream-400 mt-2">We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }} className="btn-outline mt-6 text-sm">
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-body text-sm text-espresso-700 dark:text-cream-300 mb-1.5 block">Your name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-espresso-700 dark:text-cream-300 mb-1.5 block">Email address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-espresso-700 dark:text-cream-300 mb-1.5 block">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-field resize-none"
                    placeholder="Tell us anything — feedback, orders, collaborations..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display text-3xl text-espresso-900 dark:text-cream-100 mb-8">Our locations</h2>
              {locations.map((loc) => (
                <div key={loc.name} className="bg-white dark:bg-espresso-900 rounded-2xl p-6 mb-4 border border-espresso-900/10 dark:border-cream-100/10">
                  <h3 className="font-display text-xl text-espresso-900 dark:text-cream-100 font-medium mb-4">{loc.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-cream-500 flex-shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-espresso-600 dark:text-cream-400">{loc.address}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={16} className="text-cream-500 flex-shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-espresso-600 dark:text-cream-400">{loc.hours}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-cream-500" />
                      <a href={`tel:${loc.phone}`} className="font-body text-sm text-espresso-600 dark:text-cream-400 hover:text-cream-600 transition-colors">{loc.phone}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-espresso-900 rounded-2xl p-6 border border-espresso-900/10 dark:border-cream-100/10">
              <div className="flex items-center gap-3 mb-3">
                <Mail size={16} className="text-cream-500" />
                <span className="font-body text-sm font-medium text-espresso-700 dark:text-cream-300">General inquiries</span>
              </div>
              <a href="mailto:hello@brewhaus.coffee" className="font-body text-cream-600 hover:text-cream-500 transition-colors">
                hello@brewhaus.coffee
              </a>
            </div>

            {/* Fake map placeholder */}
            <div className="h-48 rounded-2xl overflow-hidden bg-espresso-100 dark:bg-espresso-800 relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=900&q=60')] bg-cover bg-center opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-espresso-800/90 backdrop-blur-sm px-4 py-2 rounded-full font-body text-sm text-espresso-700 dark:text-cream-300 flex items-center gap-2">
                  <MapPin size={14} className="text-cream-500" />
                  View on Google Maps
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
