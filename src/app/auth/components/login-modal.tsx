'use client'

import { AnimatePresence, motion } from 'framer-motion'
import CloseButton from '@/components/icons/close'
import React, { useEffect, useState } from 'react'
import TextInput from '@/components/molecules/auth-input'
import AuthButton from '@/components/molecules/auth-buttons'
import { useRouter, useSearchParams } from 'next/navigation'

const LoginModal = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const params = useSearchParams()
  const modal = params.get('modal')

  useEffect(() => {
    setOpen(modal === 'login')
  }, [modal])

  const cleanUrl = () => {
    router.replace(window.location.pathname, { scroll: false })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)

    try {
      // simulate login
      await new Promise((res) => setTimeout(res, 800))
    } finally {
      setLoading(false)
      cleanUrl()
      setOpen(false)
    }
  }

  const handleClose = () => {
    cleanUrl()
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 font-montserrat px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="bg-[#1c1c1c] w-full max-w-md rounded-2xl overflow-hidden border border-gray-800 text-white relative shadow-2xl p-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl cursor-pointer hover:bg-white/30 rounded-full p-2 transition"
            >
              <CloseButton />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
              <p className="text-gray-400 text-sm mb-4">Please log in to join forums and post topics!</p>

              <form onSubmit={handleSubmit} className="w-full flex flex-col justify-start gap-4 mt-2">
                <TextInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                />
                <TextInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <AuthButton type="submit" disabled={loading}>
                  {loading ? 'Loading...' : 'Sign In'}
                </AuthButton>
              </form>
              <button onClick={(e) => {e.preventDefault(); router.push('/auth/forgot-password') }} className='text-white cursor-pointer'>Forgot Password?</button>
              <div className="text-gray-500 text-sm mt-3">
                Don’t have an account?{' '}
                <span onClick={() => router.push('/auth/sign-up')} className="text-white hover:underline cursor-pointer">Sign up</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoginModal
