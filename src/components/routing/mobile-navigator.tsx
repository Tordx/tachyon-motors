import { NavigationProps } from '@/types'
import { redirect } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import Locale from '../images/locale';

type Props = {
  item: NavigationProps[];
  isOpen: boolean;
  setIsOpen(e: boolean): void;
}

const MobileNavigator = (props: Props) => {
  const { item, isOpen, setIsOpen } = props;

  const handleNavigationPressed = (href: string) => {
    setIsOpen(false);
    redirect(href);
  }
  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <div className='flex md:hidden fixed inset-0 w-screen h-screen backdrop-blur-lg items-center justify-center z-20'>

          <motion.nav
            initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 40, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='w-full h-full items-center justify-start flex flex-col gap-2 mt-60'>
            {item.map((nav, index) => (
              <button onClick={() => handleNavigationPressed(nav.href)} key={index} className='px-3 py-1 text-white text-xl font-montserrat hover:underline hover:underline-offset-4 transition-all cursor-pointer'>
                {nav.name}
              </button>
            ))}

          </motion.nav>
          <div className='absolute bottom-5 right-5'>
            <Locale />
          </div>
        </div>)}
    </AnimatePresence>
  )
}

export default MobileNavigator