'use client'
import { useAuth } from '@/context/auth-context'
import { useState } from 'react'
import TextInput from '@/components/molecules/auth-input'
import { redirect, useRouter } from 'next/navigation'
import AuthButton from '@/components/molecules/auth-buttons'

export default function SignUpPage() {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const { error } = await signUp(email, password)
    if (error) {
      setError(error || 'Failed to sign up')
    } else {
      sessionStorage.setItem('signupSuccess', 'true') // ✅ mark valid entry
      router.push(`/auth/sign-up/success?email=${encodeURIComponent(email)}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 font-montserrat">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-4 w-full max-w-sm bg-[#171717] p-8"
      >
        <h2 className="text-2xl font-semibold text-center">Create an Account</h2>

        <TextInput
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
        />

        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <TextInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />

        <AuthButton
          type="submit"
        >
          Sign Up
        </AuthButton>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
      <p className='text-white'>Already Have an Account? <button className='text-blue-500 cursor-pointer' onClick={() => redirect('/auth/login')}>Login Here</button></p>

    </div>
  )
}
