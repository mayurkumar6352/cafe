'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, LogOut, Package, Edit2, Check } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
    if (user) setDisplayName(user.displayName || '')
  }, [user, loading, router])

  if (loading || !user) return null

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateProfile(auth.currentUser!, { displayName })
      toast.success('Profile updated')
      setEditing(false)
    } catch {
      toast.error('Update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
    toast.success('Signed out')
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-5xl text-espresso-900 dark:text-cream-100 font-light mb-10">My Account</h1>

          {/* Avatar */}
          <div className="flex items-center gap-5 mb-10">
            <div className="w-20 h-20 rounded-full bg-cream-200 dark:bg-espresso-700 flex items-center justify-center overflow-hidden">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                <User size={32} className="text-cream-600" />
              )}
            </div>
            <div>
              <p className="font-display text-2xl text-espresso-900 dark:text-cream-100">{user.displayName || 'Brewhaus Member'}</p>
              <p className="font-body text-sm text-espresso-400 dark:text-cream-500">{user.email}</p>
            </div>
          </div>

          {/* Profile card */}
          <div className="bg-white dark:bg-espresso-900 rounded-2xl p-6 border border-espresso-900/10 dark:border-cream-100/10 mb-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl text-espresso-900 dark:text-cream-100">Profile Details</h2>
              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className="flex items-center gap-1.5 font-body text-sm text-cream-600 hover:text-cream-500 transition-colors"
              >
                {editing ? <><Check size={14} /> {saving ? 'Saving…' : 'Save'}</> : <><Edit2 size={14} /> Edit</>}
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-body text-xs text-espresso-400 dark:text-cream-500 uppercase tracking-wide mb-1.5 block">Display name</label>
                {editing ? (
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="input-field"
                    autoFocus
                  />
                ) : (
                  <div className="flex items-center gap-2 font-body text-espresso-800 dark:text-cream-200">
                    <User size={15} className="text-espresso-400" />
                    {user.displayName || 'Not set'}
                  </div>
                )}
              </div>
              <div>
                <label className="font-body text-xs text-espresso-400 dark:text-cream-500 uppercase tracking-wide mb-1.5 block">Email</label>
                <div className="flex items-center gap-2 font-body text-espresso-800 dark:text-cream-200">
                  <Mail size={15} className="text-espresso-400" />
                  {user.email}
                </div>
              </div>
              <div>
                <label className="font-body text-xs text-espresso-400 dark:text-cream-500 uppercase tracking-wide mb-1.5 block">Account type</label>
                <div className="font-body text-espresso-800 dark:text-cream-200 capitalize">
                  {user.providerData[0]?.providerId === 'google.com' ? 'Google Account' : 'Email & Password'}
                </div>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Link href="/orders" className="bg-white dark:bg-espresso-900 rounded-2xl p-5 border border-espresso-900/10 dark:border-cream-100/10 flex items-center gap-4 hover:border-cream-400/40 transition-colors group">
              <div className="w-10 h-10 bg-cream-100 dark:bg-espresso-800 rounded-xl flex items-center justify-center group-hover:bg-cream-200 dark:group-hover:bg-espresso-700 transition-colors">
                <Package size={18} className="text-cream-600" />
              </div>
              <div>
                <p className="font-body text-sm font-medium text-espresso-900 dark:text-cream-100">Order History</p>
                <p className="font-body text-xs text-espresso-400 dark:text-cream-500">View past orders</p>
              </div>
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-body text-sm text-red-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </motion.div>
      </div>
    </div>
  )
}
