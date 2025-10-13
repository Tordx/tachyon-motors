import { Suspense } from 'react'
import SignUpSuccess from './client'

export default function SignUpSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpSuccess />
    </Suspense>
  )
}
