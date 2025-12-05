'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabaseBrowser } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import api from '@/lib/axios'
import { AxiosResponse } from 'axios'

type AdminUser = {
  id: string
  email: string
  role: 'admin' | 'staff'
} | null

interface AdminAuthContextType {
  admin: AdminUser
  loading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<AxiosResponse<unknown>>
  signOut: () => Promise<void>
  getSession: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<AdminUser>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // ✅ Fetch admin session from cookie or API
  const getSession = async () => {
    try {
      const res = await api.get('/admin/session') // your backend endpoint
      if (res.data?.user) {
        setAdmin({
          id: res.data.user.id,
          email: res.data.user.email,
          role: res.data.user.role,
        })
      } else {
        setAdmin(null)
      }
    } catch {
      setAdmin(null)
    }
  }

  useEffect(() => {
    const init = async () => {
      await getSession()
      setLoading(false)
    }
    init()
  }, [])

  const signIn = async (email: string, password: string) => {
    return await api.post('/admin/login', { email, password })
  }

  const signOut = async () => {
    await api.post('/admin/logout') // remove admin cookie on server
    setAdmin(null)
    router.push('/admin/login')
  }

  const isAuthenticated = !!admin

  return (
    <AdminAuthContext.Provider
      value={{ admin, loading, isAuthenticated, signIn, signOut, getSession }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  return context
}
