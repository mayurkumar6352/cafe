'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const { signUp, signInWithGoogle } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await signUp(form.email, form.password, form.name)
      toast.success('Account created! Welcome to Brewhaus.')
      router.push('/')
    } catch (err: any) {
      toast.error(err.message.includes('email-already-in-use') ? 'Email already in use' : 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    try {
      await signInWithGoogle()
      toast.success('Welcome to Brewhaus!')
      router.push('/')
    } catch {
      toast.error('Google sign-in failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-sm"
    >
      <h1 className="font-display text-4xl text-espresso-900 dark:text-cream-100 font-light mb-2">
        Create account
      </h1>
      <p className="font-body text-sm text-espresso-500 dark:text-cream-400 mb-8">
        Join Brewhaus and start your order
      </p>

      <button
        onClick={handleGoogle}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-espresso-800 border border-espresso-900/15 dark:border-cream-100/15 rounded-xl font-body text-sm text-espresso-800 dark:text-cream-200 hover:bg-cream-50 dark:hover:bg-espresso-700 transition-colors mb-5 disabled:opacity-60"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        {googleLoading ? 'Connecting…' : 'Continue with Google'}
      </button>

      <div className="flex items-center gap-4 mb-5">
        <hr className="flex-1 border-espresso-900/10 dark:border-cream-100/10" />
        <span className="font-body text-xs text-espresso-400 dark:text-cream-500">or</span>
        <hr className="flex-1 border-espresso-900/10 dark:border-cream-100/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-400 dark:text-cream-500" />
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            className="input-field pl-10"
          />
        </div>
        <div className="relative">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-400 dark:text-cream-500" />
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email address"
            className="input-field pl-10"
          />
        </div>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-400 dark:text-cream-500" />
          <input
            type={showPass ? 'text' : 'password'}
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password (min. 6 characters)"
            className="input-field pl-10 pr-10"
          />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso-400">
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <div className="relative">
          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-400 dark:text-cream-500" />
          <input
            type={showPass ? 'text' : 'password'}
            required
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            placeholder="Confirm password"
            className="input-field pl-10"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="font-body text-sm text-espresso-500 dark:text-cream-400 text-center mt-6">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-cream-600 hover:text-cream-500 font-medium transition-colors">
          Sign in
        </Link>
      </p>

      <p className="font-body text-xs text-espresso-400 dark:text-cream-600 text-center mt-4">
        By signing up you agree to our{' '}
        <Link href="/terms" className="underline hover:text-cream-600">Terms</Link>
        {' '}and{' '}
        <Link href="/privacy" className="underline hover:text-cream-600">Privacy Policy</Link>
      </p>
    </motion.div>
  )
}
