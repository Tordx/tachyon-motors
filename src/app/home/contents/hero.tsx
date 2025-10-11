'use client'

import ConsultButton from './button'
import VideoBackground from './video-background'

const Hero = () => {
  return (
    <div className='w-full h-screen'>
      <VideoBackground src='/assets/motorcycle-wheel.mp4'>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-4">Reliability Performance Beauty</h1>
          <p className="text-[14px] sm:text-lg md:text-lg font-montserrat">Elevating your ride through expert consulting in performance, reliability, and design.</p>
          <ConsultButton onClick={() => { alert('Consultation button clicked!') }} />

        </div></VideoBackground>
    </div>
  )
}

export default Hero