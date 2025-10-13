'use client'
import { useAuth } from '@/context/auth-context'
import { useState } from 'react'

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await resetPassword(email)
    if (error) setError(error)
    else setMessage('Password reset email sent! Check your inbox.')
  }

  return (
    <form onSubmit={handleReset} className="flex flex-col gap-3 w-80 mx-auto mt-20">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <button type="submit">Reset Password</button>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
    </form>
  )
}
