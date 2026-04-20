'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Coffee, Heart, Leaf, Award } from 'lucide-react'
import Footer from '@/components/layout/Footer'

const values = [
  { icon: Coffee, title: 'Craft First', desc: 'We treat coffee-making as a culinary art, not a commodity. Every variable matters.' },
  { icon: Leaf, title: 'Sustainably Sourced', desc: 'Direct trade with 12+ farms. Fair wages, regenerative farming, and traceable origins.' },
  { icon: Heart, title: 'Community Rooted', desc: 'We give 2% of all revenue to local food insecurity programs in our neighborhood.' },
  { icon: Award, title: 'Award Winning', desc: 'Best Independent Café 2022, 2023. Specialty Coffee Association certified baristas.' },
]

const team = [
  { name: 'Soren Halverson', role: 'Co-founder & Head Roaster', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Maya Chen', role: 'Co-founder & Creative Director', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Rafael Torres', role: 'Head Barista', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-0 bg-espresso-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&q=80"
            alt="Café interior"
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso-950/40 via-espresso-950/60 to-espresso-950" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pb-24">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-body text-xs text-cream-500 tracking-widest uppercase"
          >
            Our story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-6xl md:text-8xl text-cream-50 font-light mt-4 mb-6 leading-tight"
          >
            A Café Born from<br />
            <span className="italic text-cream-400">Pure Obsession</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-body text-cream-400 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Two friends, one shared belief: that every person deserves an extraordinary coffee experience, not just the occasional lucky cup.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative h-[500px] rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80"
              alt="Café interior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-cream-500 rounded-2xl flex flex-col items-center justify-center shadow-xl">
            <p className="font-display text-4xl font-bold text-espresso-900">9+</p>
            <p className="font-body text-xs text-espresso-700 text-center">Years of craft</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-espresso-900 dark:text-cream-100 font-light leading-tight mb-6">
            From a garage roastery to<br />
            <span className="italic text-espresso-500 dark:text-cream-400">three city locations.</span>
          </h2>
          <div className="space-y-4 font-body text-espresso-600 dark:text-cream-400 leading-relaxed">
            <p>
              In 2015, Soren and Maya were roommates spending every weekend obsessing over espresso. Armed with a secondhand roaster and a notebook full of recipes, they started selling bags of coffee at the local farmers market.
            </p>
            <p>
              Word spread. Demand grew. By 2017 they'd opened their first café in a converted warehouse space — intentionally rough, deliberately warm. The aesthetic reflected the philosophy: honest materials, extraordinary attention to what's in the cup.
            </p>
            <p>
              Today we roast 2,000 kg of coffee per week, employ 47 people, and serve over 1,000 customers daily. But we still taste every batch. We still call our farmers by name. We still believe the details matter most.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="bg-cream-100 dark:bg-espresso-900 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="section-title text-espresso-900 dark:text-cream-100">What we stand for</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="bg-white dark:bg-espresso-800 rounded-2xl p-6 border border-espresso-900/6 dark:border-cream-100/6"
              >
                <div className="w-12 h-12 bg-cream-100 dark:bg-espresso-700 rounded-xl flex items-center justify-center mb-5">
                  <val.icon size={22} className="text-cream-600" />
                </div>
                <h3 className="font-display text-xl text-espresso-900 dark:text-cream-100 font-medium mb-2">{val.title}</h3>
                <p className="font-body text-sm text-espresso-500 dark:text-cream-400 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="section-title text-espresso-900 dark:text-cream-100">The people behind the cup</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="160px"
                />
              </div>
              <h3 className="font-display text-xl text-espresso-900 dark:text-cream-100 font-medium">{member.name}</h3>
              <p className="font-body text-sm text-cream-600 mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl text-espresso-900 dark:text-cream-100 mb-6">Come visit us</h2>
          <Link href="/contact" className="btn-primary">
            Find our locations
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
