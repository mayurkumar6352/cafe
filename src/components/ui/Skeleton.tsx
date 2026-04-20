import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-cream-200 dark:bg-espresso-800',
        className
      )}
    />
  )
}

export function MenuCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-espresso-900 border border-espresso-900/6 dark:border-cream-100/6">
      <Skeleton className="h-52 rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function OrderSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-espresso-900 border border-espresso-900/6 dark:border-cream-100/6 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  )
}
