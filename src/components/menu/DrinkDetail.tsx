'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus, Minus, X, Flame, Snowflake, Wind, Star } from 'lucide-react'
import { MenuItem } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

interface DrinkDetailProps {
  item: MenuItem
  onClose: () => void
}

const categoryIcon = {
  hot: <Flame size={14} className="text-orange-400" />,
  cold: <Snowflake size={14} className="text-blue-400" />,
  shakes: <Wind size={14} className="text-purple-400" />,
  specials: <Star size={14} className="text-yellow-400 fill-yellow-400" />,
}

export default function DrinkDetail({ item, onClose }: DrinkDetailProps) {
  const [qty, setQty] = useState(1)
  const [customization, setCustomization] = useState('')
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ ...item, customizations: customization || undefined })
    }
    toast.success(`${qty}× ${item.name} added to cart`)
    onClose()
    openCart()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-espresso-900/60 backdrop-blur-sm" />

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full sm:max-w-lg bg-cream-50 dark:bg-espresso-900 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-espresso-800/80 backdrop-blur-sm rounded-full"
        >
          <X size={16} className="text-espresso-700 dark:text-cream-200" />
        </button>

        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 512px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/40 to-transparent" />
          {item.popular && (
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-cream-500 text-espresso-900 text-xs font-semibold font-body rounded-full">
              Most Popular
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="font-display text-2xl text-espresso-900 dark:text-cream-100 font-medium leading-tight pr-4">
              {item.name}
            </h2>
            <span className="font-mono text-xl font-semibold text-cream-600 flex-shrink-0">
              {formatPrice(item.price * qty)}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            {categoryIcon[item.category]}
            <span className="font-body text-xs text-espresso-400 dark:text-cream-500 capitalize">{item.category}</span>
            {item.calories && (
              <>
                <span className="text-espresso-200 dark:text-espresso-700">·</span>
                <span className="font-body text-xs text-espresso-400 dark:text-cream-500">{item.calories} cal</span>
              </>
            )}
          </div>

          <p className="font-body text-sm text-espresso-600 dark:text-cream-400 leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-cream-100 dark:bg-espresso-800 text-espresso-500 dark:text-cream-400 text-xs font-body rounded-full capitalize">
                {tag}
              </span>
            ))}
          </div>

          {/* Special instructions */}
          <div className="mb-5">
            <label className="font-body text-xs text-espresso-500 dark:text-cream-500 uppercase tracking-wide mb-2 block">
              Special instructions (optional)
            </label>
            <textarea
              value={customization}
              onChange={(e) => setCustomization(e.target.value)}
              placeholder="e.g. oat milk, extra shot, no sugar..."
              rows={2}
              className="input-field resize-none text-xs"
            />
          </div>

          {/* Quantity + Add */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-cream-100 dark:bg-espresso-800 rounded-full px-4 py-2.5">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="text-espresso-600 dark:text-cream-300 hover:text-espresso-900 dark:hover:text-cream-100 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="font-mono text-base w-5 text-center text-espresso-900 dark:text-cream-100 font-semibold">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="text-espresso-600 dark:text-cream-300 hover:text-espresso-900 dark:hover:text-cream-100 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="btn-accent flex-1 justify-center text-base py-3"
            >
              Add to cart — {formatPrice(item.price * qty)}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
