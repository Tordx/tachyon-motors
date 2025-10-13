'use client'
import AuthButton from '@/components/molecules/auth-buttons'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const { signIn, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await signIn(email, password)
    if (error) setError(error)
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side: video section */}
      <div className="w-3/5 relative overflow-hidden hidden xl:block">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/login.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 h-full flex flex-col justify-center px-10 bg-black/50 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg max-w-md font-montserrat">
            {`Looking for a new ride, a modded machine, or just the right gear?
            We've got the bikes, the parts, and the community to back it up.`}
          </p>
        </div>
      </div>

      {/* Right side: login form */}
      <div className="w-full xl:w-2/5 flex flex-col items-center justify-center p-10 bg-[#171717] font-montserrat">
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="p-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="p-2 border rounded"
          />
          <AuthButton
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </AuthButton>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button onClick={() => {router.push('/auth/forgot-password')}} className='text-white cursor-pointer'>Forgot Password?</button>
        </form>
        <p className='text-white mt-6'>No Account yet? <button className='text-blue-500 cursor-pointer' onClick={() => router.push('/auth/sign-up')}>Sign up Now</button></p>
      </div>
    </div>
  )
}
