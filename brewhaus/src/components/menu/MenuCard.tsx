'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, Flame, Snowflake, Wind, Star } from 'lucide-react'
import { MenuItem } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { formatPrice, cn } from '@/lib/utils'
import DrinkDetail from './DrinkDetail'
import toast from 'react-hot-toast'

const categoryIcon: Record<string, React.ReactNode> = {
  hot:      <Flame size={11} className="text-orange-400" />,
  cold:     <Snowflake size={11} className="text-blue-400" />,
  shakes:   <Wind size={11} className="text-purple-400" />,
  specials: <Star size={11} className="text-yellow-400 fill-yellow-400" />,
}

export default function MenuCard({ item }: { item: MenuItem }) {
  const [added, setAdded]   = useState(false)
  const [detail, setDetail] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(item)
    setAdded(true)
    toast.success(`${item.name} added to cart`)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onClick={() => setDetail(true)}
        className="group card flex flex-col overflow-hidden bg-white dark:bg-espresso-900 cursor-pointer"
      >
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {item.popular && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-cream-500 text-espresso-900 text-xs font-semibold font-body rounded-full">Popular</div>
          )}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 dark:bg-espresso-800/90 backdrop-blur-sm rounded-full">
            {categoryIcon[item.category]}
            <span className="font-body text-xs capitalize text-espresso-700 dark:text-cream-300">{item.category}</span>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-4">
          <h3 className="font-display text-lg font-medium text-espresso-900 dark:text-cream-100 leading-tight mb-1">{item.name}</h3>
          <p className="font-body text-xs text-espresso-400 dark:text-cream-500 leading-relaxed flex-1 line-clamp-2 mb-4">{item.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-cream-100 dark:bg-espresso-800 text-espresso-500 dark:text-cream-400 text-xs font-body rounded-full">{tag}</span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-lg font-semibold text-espresso-900 dark:text-cream-100">{formatPrice(item.price)}</span>
              {item.calories && <span className="font-body text-xs text-espresso-400 dark:text-cream-500 ml-2">{item.calories} cal</span>}
            </div>
            <motion.button
              onClick={handleQuickAdd}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300',
                added ? 'bg-green-500 text-white' : 'bg-espresso-800 dark:bg-cream-200 text-cream-100 dark:text-espresso-900 hover:bg-espresso-700 dark:hover:bg-cream-100'
              )}
            >
              {added ? <Check size={14} /> : <Plus size={14} />}
              {added ? 'Added' : 'Add'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {detail && <DrinkDetail item={item} onClose={() => setDetail(false)} />}
      </AnimatePresence>
    </>
  )
}
