import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-espresso-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80"
          alt="Coffee"
          fill
          className="object-cover opacity-50"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-espresso-950/80 to-espresso-900/40" />
        <div className="relative z-10 flex flex-col justify-between p-12 h-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-espresso-900">
                <path d="M3 6h18M3 6c0 8 6 14 9 14s9-6 9-14M3 6V4h18v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-display text-2xl text-cream-100 font-semibold">Brewhaus</span>
          </div>
          <div>
            <blockquote className="font-display text-3xl text-cream-100 font-light italic leading-relaxed mb-4">
              "The perfect cup is never an accident. It's a thousand tiny decisions made right."
            </blockquote>
            <cite className="font-body text-sm text-cream-400">— Soren Halverson, Co-founder</cite>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-20 bg-cream-50 dark:bg-espresso-950">
        {children}
      </div>
    </div>
  )
}
