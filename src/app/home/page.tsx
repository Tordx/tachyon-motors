import PageOverlay from '@/components/animations/page-overlay'
import { Suspense } from 'react'
import HomeClient from './client'

const Home = async () => {
  return (
    <>
      <Suspense fallback={<PageOverlay />}>
      <HomeClient />
      </Suspense>
    </>
  )
}

export default Home