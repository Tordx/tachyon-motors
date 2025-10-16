'use client'

import { VIDEO_SRCS } from '@/constants'
import ConsultButton from './components/button'
import VideoBackground from './components/video-background'

type Props = {
  onClick(): void;
}
const Hero = (props: Props) => {
  const {onClick} = props;
  return (
    <div className='w-full h-screen'>
      <VideoBackground videosrc={VIDEO_SRCS}>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-4">Performance Reliability Confidence</h1>
          <p className="text-[14px] sm:text-lg md:text-lg font-montserrat">Handpicked pre-owned vehicles for everyone who value performance and trust.</p>
          <ConsultButton onClick={onClick} />

        </div></VideoBackground>
    </div>
  )
}

export default Hero