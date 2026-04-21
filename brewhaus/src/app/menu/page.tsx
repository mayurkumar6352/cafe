'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import { menuItems, categories } from '@/lib/menuData'
import MenuCard from '@/components/menu/MenuCard'
import Footer from '@/components/layout/Footer'

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory
      const matchSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  return (
    <div>
      {/* Hero */}
      <div className="relative pt-32 pb-16 px-6 bg-espresso-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1400&q=70')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-body text-xs text-cream-500 tracking-widest uppercase"
          >
            Our offerings
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-5xl md:text-7xl text-cream-50 font-light leading-tight mt-2"
          >
            The Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-cream-400 mt-4 max-w-lg text-lg"
          >
            Handcrafted beverages made to order. Every drink is a small work of art.
          </motion.p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="sticky top-[64px] z-30 bg-cream-50/95 dark:bg-espresso-950/95 backdrop-blur-xl border-b border-espresso-900/10 dark:border-cream-100/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-full font-body text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'text-espresso-900 dark:text-espresso-900'
                    : 'text-espresso-500 dark:text-cream-400 hover:text-espresso-700 dark:hover:text-cream-200'
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.span
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-cream-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-400 dark:text-cream-500" />
            <input
              type="text"
              placeholder="Search drinks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10 py-2.5"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Result count */}
        <div className="flex items-center gap-2 mb-8">
          <SlidersHorizontal size={15} className="text-espresso-400 dark:text-cream-500" />
          <span className="font-body text-sm text-espresso-400 dark:text-cream-500">
            {filtered.length} {filtered.length === 1 ? 'drink' : 'drinks'} found
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <p className="font-display text-3xl text-espresso-400 dark:text-cream-500">No drinks found</p>
              <p className="font-body text-sm text-espresso-400 dark:text-cream-500 mt-2">
                Try a different search or category
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  )
}
