'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabaseBrowser } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  email: string
} | null

interface AuthContextType {
  user: User
  loading: boolean
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: string | null }>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch current user
  const fetchUser = async () => {
    const { data, error } = await supabaseBrowser.auth.getUser()
    if (!error && data?.user) {
      setUser({ id: data.user.id, email: data.user.email! })
    } else {
      setUser(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUser()

    // Listen for changes (login/logout)
    const { data: listener } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! })
      } else {
        setUser(null)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // Sign up
  const signUp = async (email: string, password: string) => {
    const { error } = await supabaseBrowser.auth.signUp({ email, password })
    if (error) return { error: error.message }
    return { error: null }
  }

  // Sign in
  const signIn = async (email: string, password: string) => {
    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }

    await fetchUser()
    router.push('/') // redirect to home/dashboard
    return { error: null }
  }

  // Sign out
  const signOut = async () => {
    await supabaseBrowser.auth.signOut()
    setUser(null)
    router.push('/login')
  }

  // Forgot password
  const resetPassword = async (email: string) => {
    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) return { error: error.message }
    return { error: null }
  }

  const refreshUser = async () => {
    await fetchUser()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
