'use client'
import { useAuth } from '@/context/auth-context'
import { useState } from 'react'
import TextInput from '@/components/molecules/auth-input'
import AuthButton from '@/components/molecules/auth-buttons'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await resetPassword(email)
      if (error) setError(error)
      else setMessage('Password reset email sent! Check your inbox.')
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleRoute = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    router.push(path)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 font-montserrat">
      <form
        onSubmit={handleReset}
        className="flex flex-col gap-4 w-full max-w-sm bg-[#171717] p-8"
      >
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>

        <TextInput
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />
        <AuthButton
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Reset Password'}
        </AuthButton>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className='text-green-500 text-sm'>{message}</p>}
      </form>
      <p className='text-white'>Remembered Password? <button className='text-blue-500 cursor-pointer' onClick={(e) => handleRoute(e, '/auth/login')}>Back to Login</button></p>

    </div>
  )
}
