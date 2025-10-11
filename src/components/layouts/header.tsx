'use client'
import React from 'react'
import Locale from '../images/locale'
import AppLogo from '../images/app-logo'
import { redirect, usePathname } from 'next/navigation'
import Navigator from '../routing/navigator'
import { NAVIGATION_LINKS } from '@/constants'
import ChevronIcon from '../icons/chevron'
import MobileNavigator from '../routing/mobile-navigator'

const Header = () => {
  const currentPath = usePathname();
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  return (
    <header className={`w-full fixed top-0 left-0 z-50 ${currentPath === 'home' ? '' : 'backdrop-blur-md'}`}>
      <div className='w-full h-16 px-10 2xl:px-auto bg-transparent text-white flex items-center justify-center sm:justify-between'>

        <div className='z-50 flex flex-col items-center cursor-pointer gap-4 mt-15 sm:mt-0'>
          <AppLogo onClick={() => { redirect('/home') }} />
          <button className={`flex sm:hidden ${isNavOpen ? "transition rotate-180": "transition rotate-0"}`} onClick={() => setIsNavOpen(!isNavOpen)}>
            <ChevronIcon />
            </button>
        </div>
        <div className='hidden sm:flex flex-row items-center gap-10'>
          <Navigator item={NAVIGATION_LINKS} />
          <Locale />
        </div>
      </div>
        <MobileNavigator setIsOpen={setIsNavOpen} isOpen={isNavOpen} item={NAVIGATION_LINKS} />
    </header>
  )
}

export default Header