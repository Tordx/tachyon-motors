'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const PageOverlay = () => {
  
  const controls = useAnimation()
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start({ opacity: 0, pointerEvents: 'none', transition: { duration: 0.8 } })
    }, 750)
    return () => clearTimeout(timer)
  }, [controls])

  return (
    <motion.div
    ref={overlayRef}
      animate={controls}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className='absolute w-screen h-screen flex justify-center items-center gap-4 bg-black bg-opacity-50 backdrop-blur-sm z-50 select-none cursor-wait'>
      <Image src="/assets/tachyon.png" width={50} height={50} alt="Tachyon Logo" className='filter invert' />
      <div className='text-2xl'>
        Tachyon
      </div>
    </motion.div>
  )
}

export default PageOverlay