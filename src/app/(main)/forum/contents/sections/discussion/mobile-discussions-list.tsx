'use client'

import { Discussion } from '@/types'
import { redirect } from 'next/navigation'
import DiscussionButton from './components/button'
import BackButton from './components/go-back-button'
import { motion } from 'framer-motion'

type Props = {
  item: Discussion[]
  onClick(): void
}

const MobileDiscussionLists = ({ item, onClick }: Props) => {
  return (
    <motion.div
      key="mobile-discussion"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="
        fixed inset-0 z-50
        flex flex-col md:hidden
        bg-[#171717]
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="flex flex-row justify-between items-center px-4 py-5 gap-4 flex-shrink-0">
        <BackButton onClick={onClick} />
        <h1 className="font-bold font-montserrat text-lg text-white">Select a Topic</h1>
        <div className="w-6" />
      </div>

      {/* Scrollable list */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.05 },
          },
        }}
        className="
          flex flex-col flex-1 
          w-full overflow-y-auto px-2 pb-10
          scrollbar-none
        "
      >
        {item.map((dis) => (
          <motion.div
            key={dis.id}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <DiscussionButton
              onClick={() => redirect(`/forum/discussion/${dis.slug}`)}
              item={dis}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default MobileDiscussionLists
