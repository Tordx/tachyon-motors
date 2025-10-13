'use client'

import { useEffect, useState } from 'react'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Startled from '@/components/illustrations/startled'
import AuthButton from '@/components/molecules/auth-buttons'
import HappyNews from '@/components/illustrations/happy-news'
import { useWindowWidth } from '@/utils/use-window-width'

export default function VerifyPage() {
  const supabase = createClientComponentClient()
  const searchParams = useSearchParams()
  const window = useWindowWidth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'null'>('loading')
  const router = useRouter();
  useEffect(() => {
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as 'signup' | 'magiclink' | 'invite' | 'recovery' | 'email_change' | null

     if(type === null) {
      setStatus('null')
      notFound()
    }
    if (!token_hash || !type) {
      setStatus('error')
      return
    }

    supabase.auth
      .verifyOtp({ token_hash, type })
      .then(({ error }) => {
        if (error) setStatus('error')
        else setStatus('success')
      })
  }, [searchParams, supabase.auth])

  if (status === 'loading')
    return <p className="text-gray-500 font-montserrat">Verifying your email...</p>

  if(status === null) {

  }

  if (status === 'success')
    return (
      <div className="text-center p-10 font-montserrat">
      <HappyNews size={window >= 768 ? '500' : ''} />
      <h2 className="text-3xl font-semibold text-green-600 mt-4">🎉 Successfully Verified!</h2>
      <p className="mt-2 text-gray-400">
        You can now participate in forums, create new topics, ask questions and more!
      </p>
      <div className="mt-6">
        <AuthButton onClick={() => router.push('/auth/login')}>Go to Login</AuthButton>
      </div>
    </div>
    )

  return (
    <div className="text-center p-10 font-montserrat">
      <Startled size={window >= 768 ? '500' : ''} />
      <h2 className="text-3xl font-semibold text-red-600 mt-4">Invalid or Expired!</h2>
      <p className="mt-2 text-gray-400">
        This verification link might be invalid or expired.
      </p>
      <div className="mt-6">
        <AuthButton onClick={() => router.push('/home')}>Go to Home Page</AuthButton>
      </div>
    </div>
  )
}
