import { NavigationProps } from '@/types'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  item: NavigationProps[]
  
}

const Navigator = (props: Props) => {
  const { item } = props;
  return (
    <nav className='flex gap-4'>
      {item.map((nav, index) => (
        <button onClick={() => {redirect(nav.href)}} key={index} className='px-3 py-2 text-white font-montserrat hover:underline hover:underline-offset-4 transition-all cursor-pointer'>
          {nav.name}
        </button>
      ))}
    </nav>
  )
}

export default Navigator