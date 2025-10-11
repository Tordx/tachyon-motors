import { AppLogoProps } from '@/types'
import Image from 'next/image'
import React from 'react'



const AppLogo = (props: AppLogoProps) => {
  const { onClick } = props;
  return (
    <button onClick={onClick} className={`flex flex-row items-center gap-4 font-bold text-xl text-white cursor-pointer select-none`}>
      <Image src="/assets/tachyon.png" width={25} height={25} alt="Tachyon Logo" className='filter invert'/>
      <div>
          Tachyon
        </div>
    </button>
  )
}

export default AppLogo