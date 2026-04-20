'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Priya Mehta',
    handle: '@priyam',
    avatar: 'PM',
    rating: 5,
    text: "The Nitro Cloud is unlike anything I've had anywhere else. Cascading foam, zero bitterness — I come back three times a week. This place has ruined all other coffee for me.",
    drink: 'Nitro Cloud',
  },
  {
    name: 'James Okafor',
    handle: '@jameswrites',
    avatar: 'JO',
    rating: 5,
    text: 'As a coffee snob, I don\'t give five stars lightly. Brewhaus earns every single one. The single-origin espresso is dialed in perfectly. The flat white is the best in the city. Full stop.',
    drink: 'Velvet Flat White',
  },
  {
    name: 'Sofia Rosenberg',
    handle: '@sofiar_nyc',
    avatar: 'SR',
    rating: 5,
    text: 'I brought my laptop and ended up staying four hours. The vibe, the drinks, the playlist — all perfect. The Dark Mocha Shake is basically dessert and I\'m not sorry about it.',
    drink: 'Dark Mocha Shake',
  },
  {
    name: 'Marcus Chen',
    handle: '@marcusdrinks',
    avatar: 'MC',
    rating: 5,
    text: "Ordered the Seasonal Saffron Latte on a whim. Absolutely stunning — floral, warm, complex. Paired with excellent service. This isn't a coffee shop, it's a destination.",
    drink: 'Saffron Latte',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array(count).fill(0).map((_, i) => (
        <Star key={i} size={13} className="text-cream-500 fill-cream-500" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-cream-100 dark:bg-espresso-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="font-body text-xs text-cream-600 tracking-widest uppercase font-medium">What people say</span>
          <h2 className="section-title mt-2 text-espresso-900 dark:text-cream-100">
            Loved by coffee people
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-espresso-900 rounded-2xl p-5 border border-espresso-900/6 dark:border-cream-100/6 flex flex-col"
            >
              <Stars count={review.rating} />
              <p className="font-body text-sm text-espresso-700 dark:text-cream-300 leading-relaxed mt-3 flex-1">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-espresso-900/6 dark:border-cream-100/6">
                <div className="w-9 h-9 rounded-full bg-cream-200 dark:bg-espresso-700 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-xs font-bold text-espresso-700 dark:text-cream-300">{review.avatar}</span>
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-espresso-900 dark:text-cream-100">{review.name}</p>
                  <p className="font-body text-xs text-cream-500">{review.handle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 p-6 bg-white dark:bg-espresso-900 rounded-2xl border border-espresso-900/6 dark:border-cream-100/6 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="flex justify-center mb-1"><Stars count={5} /></div>
            <p className="font-mono text-3xl font-bold text-espresso-900 dark:text-cream-100">4.9</p>
            <p className="font-body text-xs text-espresso-400 dark:text-cream-500">Average rating</p>
          </div>
          <div className="w-px h-12 bg-espresso-900/8 dark:bg-cream-100/8 hidden sm:block" />
          <div className="text-center">
            <p className="font-mono text-3xl font-bold text-espresso-900 dark:text-cream-100">2,400+</p>
            <p className="font-body text-xs text-espresso-400 dark:text-cream-500">Verified reviews</p>
          </div>
          <div className="w-px h-12 bg-espresso-900/8 dark:bg-cream-100/8 hidden sm:block" />
          <div className="text-center">
            <p className="font-mono text-3xl font-bold text-espresso-900 dark:text-cream-100">97%</p>
            <p className="font-body text-xs text-espresso-400 dark:text-cream-500">Would recommend</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
