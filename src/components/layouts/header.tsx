'use client'
import React from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import Locale from '../images/locale'
import AppLogo from '../images/app-logo'
import { usePathname, useRouter } from 'next/navigation'
import Navigator from '../routing/navigator'
import { NAVIGATION_LINKS } from '@/constants'
import ChevronIcon from '../icons/chevron'
import MobileNavigator from '../routing/mobile-navigator'
import AccountCircle from '../icons/account-circle'
import ArrowBack from '../icons/arrow-back'
import { useAuth } from '@/context/auth-context'

const Header = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const router = useRouter();
  const pathname = usePathname();
  const isVehiclePage = /^\/products\/vehicles\/\d+$/.test(pathname)
  const controls = useAnimation();
  const {isAuthenticated} = useAuth();

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

  const handleNavigationPressed = () => {
    if(isAuthenticated) {
      router.push('/profile')
    } else {
      router.push('/auth/login')
    }
  }

  return (
    <motion.header
      animate={controls}
      className="w-full fixed top-0 left-0 z-30"
      style={{ WebkitBackdropFilter: 'blur(0px)' }} // for Safari
    >
      <div className={`w-full h-16 px-4 md:px-10 2xl:px-auto text-white flex items-center justify-center sm:justify-between ${isVehiclePage ? 'bg-black/30 lg:bg-black/0' : ''}`}>
        <div className="z-30 w-full md:w-auto flex flex-row items-center justify-between cursor-pointer gap-2  sm:mt-0">
          <AnimatePresence>
          {isVehiclePage &&
            <motion.button
              onClick={() => router.back()}
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ type: 'spring', duration: 0.2 }}
              className=' cursor-pointer z-50 hover:bg-white/30 p-2 rounded-full transition'>
              <ArrowBack />
            </motion.button>
          }
          </AnimatePresence>
          <AppLogo onClick={() => router.push('/home')} />
          <button
            style={{ WebkitBackdropFilter: 'blur(0px)' }} // for Safari
            className={`flex md:hidden transition-transform ${isNavOpen ? 'rotate-180' : 'rotate-0'
              }`}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <ChevronIcon />
          </button>
        </div>
        <div className="hidden md:flex flex-row items-center gap-6">
          <Navigator item={NAVIGATION_LINKS} />
          <Locale />
          <button className='cursor-pointer' onClick={handleNavigationPressed}>
            <AccountCircle />
          </button>
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
