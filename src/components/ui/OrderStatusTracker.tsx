import { Check, Clock, Coffee, Package, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'

const steps = [
  { key: 'confirmed', label: 'Confirmed',  icon: Check },
  { key: 'preparing', label: 'Preparing',  icon: Coffee },
  { key: 'ready',     label: 'Ready',      icon: Package },
  { key: 'completed', label: 'Completed',  icon: Truck },
] as const

const ORDER_RANK: Record<string, number> = {
  pending: 0, confirmed: 1, preparing: 2, ready: 3, completed: 4, cancelled: -1,
}

interface OrderStatusTrackerProps {
  status: OrderStatus
}

export default function OrderStatusTracker({ status }: OrderStatusTrackerProps) {
  const rank = ORDER_RANK[status] ?? 0
  const isCancelled = status === 'cancelled'

  if (isCancelled) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-xl">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <span className="font-body text-sm text-red-600 dark:text-red-400 font-medium">Order Cancelled</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-cream-200 dark:bg-espresso-700 mx-8">
          <div
            className="h-full bg-green-400 transition-all duration-700"
            style={{ width: `${Math.max(0, ((rank - 1) / (steps.length - 1)) * 100)}%` }}
          />
        </div>

        {steps.map((step, i) => {
          const stepRank = i + 1
          const done    = rank > stepRank
          const active  = rank === stepRank
          const Icon    = step.icon

          return (
            <div key={step.key} className="flex flex-col items-center gap-2 z-10">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500',
                done   ? 'bg-green-400 border-green-400'
                       : active ? 'bg-white dark:bg-espresso-900 border-green-400 shadow-md shadow-green-400/30'
                                : 'bg-white dark:bg-espresso-900 border-cream-300 dark:border-espresso-700'
              )}>
                {done ? (
                  <Check size={14} className="text-white" />
                ) : (
                  <Icon size={14} className={active ? 'text-green-500' : 'text-espresso-300 dark:text-cream-600'} />
                )}
              </div>
              <span className={cn(
                'font-body text-[10px] text-center leading-tight',
                done || active ? 'text-espresso-700 dark:text-cream-300 font-medium' : 'text-espresso-400 dark:text-cream-600'
              )}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Current status label */}
      <div className="flex items-center gap-2 mt-4 px-3 py-2 bg-green-50 dark:bg-green-900/15 rounded-lg">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="font-body text-xs text-green-700 dark:text-green-400 capitalize">
          {status === 'confirmed' && 'Order received — preparing soon'}
          {status === 'preparing' && 'Your drinks are being crafted'}
          {status === 'ready'     && 'Ready for pickup / out for delivery!'}
          {status === 'completed' && 'Order delivered — enjoy!'}
          {status === 'pending'   && 'Awaiting confirmation'}
        </span>
      </div>
    </div>
  )
}
