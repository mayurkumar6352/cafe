import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-cream-100 dark:bg-espresso-800 text-espresso-600 dark:text-cream-400',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  error:   'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  info:    'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  accent:  'bg-cream-200 dark:bg-cream-800/30 text-cream-700 dark:text-cream-300',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
