'use client'
import React from 'react'
import Hero from './contents/hero'
import { useRouter } from 'next/navigation'
import PageOverlay from '@/components/animations/page-overlay';


const HomeClient = () => {
  const router = useRouter();
  return (
    <>
      <PageOverlay />
      <Hero onClick={() => router.push('/products')} />
    </>
  )
}

export default HomeClient;