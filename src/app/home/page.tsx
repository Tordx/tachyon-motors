import PageOverlay from '@/components/animations/page-overlay'
import Hero from './contents/hero'
import { Suspense } from 'react'
import Loading from './loading'

const Home = async () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
      <PageOverlay />
      <Hero />
      </Suspense>
    </>
  )
}

export default Home