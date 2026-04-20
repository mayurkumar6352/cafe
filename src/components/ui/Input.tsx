import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="font-body text-sm text-espresso-700 dark:text-cream-300 mb-1.5 block">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-400 dark:text-cream-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'input-field',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-400 focus:ring-red-400/30',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso-400 dark:text-cream-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="font-body text-xs text-red-500 mt-1.5">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
