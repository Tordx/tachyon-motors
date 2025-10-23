'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabaseBrowser } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import api from '@/lib/axios'
import { AxiosResponse } from 'axios'

type User = {
  id: string
  email: string
} | null

interface AuthContextType {
  user: User
  loading: boolean
  isAuthenticated: boolean
  signUp: (email: string, username: string, password: string) => Promise<AxiosResponse<unknown>>
  signIn: (email: string, password: string) => Promise<AxiosResponse<unknown>>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: string | null }>
  getSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // ✅ Core: single source of truth for auth state
  const getSession = async () => {
    const { data, error } = await supabaseBrowser.auth.getSession()
    if (error) {
      console.error('Session fetch error:', error)
      setUser(null)
      return
    }

    const session = data.session
    if (session?.user) {
      setUser({ id: session.user.id, email: session.user.email! })
    } else {
      setUser(null)
    }
  }

  // ✅ Initialize once on mount
  useEffect(() => {
    const initAuth = async () => {
      await getSession()
      setLoading(false)
    }
    initAuth()

    // ✅ Realtime listener for login/logout
    const { data: listener } = supabaseBrowser.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email! })
        } else {
          setUser(null)
        }
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  // Sign up
  const signUp = async (email: string, username: string, password: string) => {
    return await api.post('/user/create', { email, username, password })
  }

  // Sign in
  const signIn = async (email: string, password: string) => {
    return await api.post('/user/login', { email, password })
  }

  // Sign out
  const signOut = async () => {
    await supabaseBrowser.auth.signOut()
    setUser(null)
    router.push('/auth/login')
  }

  // Forgot password
  const resetPassword = async (email: string) => {
    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) return { error: error.message }
    return { error: null }
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        signUp,
        signIn,
        signOut,
        resetPassword,
        getSession,
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
