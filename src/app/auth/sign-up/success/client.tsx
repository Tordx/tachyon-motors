'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthButton from '@/components/molecules/auth-buttons'
import { useWindowWidth } from '@/utils/use-window-width'
import MailBox from '@/components/illustrations/mailbox'

export default function SignUpSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [isValid, setIsValid] = useState(false)
  const width = useWindowWidth();

  useEffect(() => {
    const timer = setTimeout(() => {
      const cameFromSignup = sessionStorage.getItem('signupSuccess')
      if (cameFromSignup === 'true') {
        setIsValid(true)
        sessionStorage.removeItem('signupSuccess')
      } else {
        router.replace('/auth/login')
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [router])

  if (!isValid) return null

  return (
    <Suspense>
      <div className="text-center p-10 font-montserrat">
        <MailBox size={width <= 768 ? "" : "350"} />
        <h2 className="text-3xl font-semibold text-green-600 mt-4">🎉 Account Created!</h2>
        <p className="mt-2 text-gray-400">
          We’ve sent a verification link to <span className="text-white">{email}</span>.<br />
          Please check your inbox to verify your account before logging in.
        </p>
        <div className="mt-6">
          <AuthButton onClick={() => router.push('/login')}>Go to Login</AuthButton>
        </div>
      </div>
    </Suspense>
  )
}
