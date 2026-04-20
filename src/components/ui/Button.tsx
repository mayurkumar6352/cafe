import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'accent' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-espresso-800 dark:bg-cream-200 text-cream-100 dark:text-espresso-900 hover:bg-espresso-700 dark:hover:bg-cream-100',
      outline: 'border border-espresso-800/30 dark:border-cream-200/20 text-espresso-800 dark:text-cream-200 hover:bg-espresso-800/5 dark:hover:bg-cream-200/5',
      accent: 'bg-cream-500 text-espresso-900 hover:bg-cream-400',
      ghost: 'text-espresso-600 dark:text-cream-300 hover:bg-espresso-900/5 dark:hover:bg-cream-100/5',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    }

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3.5 text-base',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-body font-medium tracking-wide transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </>
        ) : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
