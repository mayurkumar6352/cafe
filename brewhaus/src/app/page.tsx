'use client'
import { useRef, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, ChevronDown } from 'lucide-react'
import { menuItems } from '@/lib/menuData'
import MenuCard from '@/components/menu/MenuCard'
import Footer from '@/components/layout/Footer'
import Testimonials from '@/components/home/Testimonials'
import Newsletter from '@/components/home/Newsletter'

// Lazy load 3D component — avoids SSR issues with Three.js
const CoffeeCup3D = lazy(() => import('@/components/ui/CoffeeCup3D'))

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const featured = menuItems.filter((i) => i.popular).slice(0, 4)

  return (
    <div className="overflow-x-hidden">

      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-espresso-950">
        {/* Parallax bg */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=85"
            alt="Coffee shop"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso-950/70 via-espresso-950/40 to-espresso-950/90" />
        </motion.div>

        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-cream-500/10 blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-cream-400/10 blur-3xl animate-float pointer-events-none" style={{ animationDelay: '-3s' }} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen py-28">

            {/* ── Left: text ── */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cream-500/30 bg-cream-500/10 backdrop-blur-sm mb-6"
              >
                <Star size={12} className="text-cream-400 fill-cream-400" />
                <span className="font-body text-xs tracking-widest text-cream-300 uppercase">
                  Artisan Café & Beverages
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-light text-cream-50 leading-[0.92] tracking-tight mb-5"
              >
                Brewed<br />
                <span className="text-shimmer italic">for you.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-body text-base md:text-lg text-cream-300/80 max-w-md leading-relaxed mb-8"
              >
                Every cup crafted with intention. Single-origin beans, seasonal ingredients, obsessive attention to detail.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 items-center"
              >
                <Link href="/menu" className="btn-accent text-base px-8 py-4 shadow-lg shadow-cream-500/20 w-full sm:w-auto justify-center">
                  Order Now
                  <ArrowRight size={18} />
                </Link>
                <Link href="/menu" className="font-body text-sm font-medium text-cream-300 hover:text-cream-100 transition-colors flex items-center gap-2">
                  View full menu <ArrowRight size={14} />
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-10 flex gap-8 justify-center lg:justify-start"
              >
                {[
                  { value: '18+', label: 'Drinks' },
                  { value: '4.9★', label: 'Rating' },
                  { value: '10K+', label: 'Customers' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-2xl font-semibold text-cream-200">{stat.value}</div>
                    <div className="font-body text-xs text-cream-500 mt-0.5 tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: 3D cup ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:flex items-center justify-center h-[520px] w-full"
            >
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-cream-500/30 border-t-cream-500 rounded-full animate-spin" />
                </div>
              }>
                <CoffeeCup3D className="w-full h-full" />
              </Suspense>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue — desktop only */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ChevronDown size={20} className="text-cream-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Marquee ─── */}
      <div className="bg-cream-500 py-3 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-10 whitespace-nowrap"
        >
          {Array(8).fill(['Cold Brew', '·', 'Espresso', '·', 'Shakes', '·', 'Matcha', '·', 'Nitro', '·']).flat().map((item, i) => (
            <span key={i} className="font-display text-base text-espresso-900 font-light tracking-wide">{item}</span>
          ))}
        </motion.div>
      </div>

      {/* ─── Featured Drinks ─── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="font-body text-xs text-cream-600 tracking-widest uppercase font-medium">Customer favourites</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mt-2 text-espresso-900 dark:text-cream-100">
              Most Loved<br />
              <span className="italic font-light text-espresso-500 dark:text-cream-400">Beverages</span>
            </h2>
          </div>
          <Link href="/menu" className="btn-outline self-start sm:self-auto">
            See all drinks <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {featured.map((item, i) => (
            <motion.div key={item.id} variants={fadeUp} transition={{ delay: i * 0.1 }}>
              <MenuCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Brand story ─── */}
      <section className="relative overflow-hidden bg-espresso-900 py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-body text-xs text-cream-500 tracking-widest uppercase">Our story</span>
            <h2 className="font-display text-4xl md:text-5xl text-cream-100 font-light leading-tight mt-3 mb-6">
              Coffee is our<br /><span className="italic text-cream-400">obsession.</span>
            </h2>
            <p className="font-body text-cream-400 leading-relaxed mb-4 text-sm md:text-base">
              Born from a small roastery in 2015, Brewhaus started as a passion project between two friends who believed great coffee deserved a beautiful space.
            </p>
            <p className="font-body text-cream-500 leading-relaxed mb-8 text-sm md:text-base">
              Every recipe is developed over months of testing. Every ingredient chosen with intention.
            </p>
            <Link href="/about" className="btn-outline border-cream-400/30 text-cream-300 hover:bg-cream-100/5">
              Read our story <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-72 md:h-96 rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&q=80"
              alt="Coffee roasting"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/100 to-transparent" />
            <div className="absolute bottom-5 left-5 bg-cream-500/90 backdrop-blur-sm rounded-xl px-4 py-3">
              <p className="font-display text-2xl font-semibold text-espresso-900">12+</p>
              <p className="font-body text-xs text-espresso-700">Origin countries</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="font-body text-xs text-cream-600 tracking-widest uppercase font-medium">Our craft</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mt-2 text-espresso-900 dark:text-cream-100">
            From bean to cup,<br /><span className="italic font-light text-espresso-400 dark:text-cream-400">with love.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '01', title: 'Sourced Ethically',   desc: 'We partner directly with family farms committed to sustainable practices.',                              img: 'https://images.unsplash.com/photo-1611174745714-8b4cd7f9c88d?w=600&q=80' },
            { number: '02', title: 'Roasted Fresh',       desc: 'Small-batch roasting every Tuesday and Friday. Never more than 7 days old.',                            img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
            { number: '03', title: 'Crafted With Skill',  desc: 'Our baristas train for 3 months before their first solo shift. Precision in every variable.',           img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80' },
          ].map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group"
            >
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden mb-5">
                <Image src={step.img} alt={step.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                <div className="absolute top-4 left-4 font-mono text-4xl font-bold text-white/20">{step.number}</div>
              </div>
              <h3 className="font-display text-xl text-espresso-900 dark:text-cream-100 font-medium mb-2">{step.title}</h3>
              <p className="font-body text-sm text-espresso-500 dark:text-cream-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA banner ─── */}
      <section className="mx-4 sm:mx-6 mb-20 rounded-3xl overflow-hidden relative bg-cream-500">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&q=70" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative z-10 py-16 px-6 sm:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl sm:text-5xl text-espresso-950 font-semibold mb-4 leading-tight">Ready to order?</h2>
            <p className="font-body text-espresso-800/80 text-base sm:text-lg mb-8 max-w-md mx-auto">
              Browse our full menu of handcrafted beverages.
            </p>
            <Link href="/menu" className="btn-primary text-base px-8 py-4 bg-espresso-900 text-cream-100 shadow-lg">
              Explore the menu <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  )
}
