'use client'
import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import Locale from '../images/locale'
import AppLogo from '../images/app-logo'
import { redirect } from 'next/navigation'
import Navigator from '../routing/navigator'
import { NAVIGATION_LINKS } from '@/constants'
import ChevronIcon from '../icons/chevron'
import MobileNavigator from '../routing/mobile-navigator'

const Header = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const controls = useAnimation()

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    controls.start({
      backdropFilter: isScrolled && !isNavOpen ? 'blur(16px)' : '',
      backgroundColor:
        isScrolled && !isNavOpen
          ? 'rgba(0, 0, 0, 0.3)'
          : 'rgba(0, 0, 0, 0)',
      transition: { duration: 0.6, ease: 'easeOut' },
    })
  }, [isScrolled, isNavOpen, controls])

  return (
    <motion.header
      animate={controls}
      className="w-full fixed top-0 left-0 z-50"
      style={{ WebkitBackdropFilter: 'blur(0px)' }} // for Safari
    >
      <div className="w-full h-16 px-10 2xl:px-auto text-white flex items-center justify-center sm:justify-between">
        <div className="z-50 flex flex-row items-center cursor-pointer gap-4  sm:mt-0">
          <AppLogo onClick={() => redirect('/home')} />
          <button
            style={{ WebkitBackdropFilter: 'blur(0px)' }} // for Safari
            className={`flex md:hidden transition-transform ${
              isNavOpen ? 'rotate-180' : 'rotate-0'
            }`}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <ChevronIcon />
          </button>
        </div>
        <div className="hidden md:flex flex-row items-center gap-10">
          <Navigator item={NAVIGATION_LINKS} />
          <Locale />
        </div>
      </div>
      <MobileNavigator
        setIsOpen={setIsNavOpen}
        isOpen={isNavOpen}
        item={NAVIGATION_LINKS}
      />
    </motion.header>
  )
}

export default Header
