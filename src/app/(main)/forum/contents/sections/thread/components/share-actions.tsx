'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CloseButton from '@/components/icons/close'
import FaceBookIcon from '@/components/icons/facebook'
import MessengerIcon from '@/components/icons/messenger'
import TwitterIcon from '@/components/icons/twitter'
import WhatsappIcon from '@/components/icons/whatsapp'
import LinkIcon from '@/components/icons/link'

type Props = {
  open: boolean
  onClose: () => void
  shareUrl: string
  title?: string
  description?: string
  forumId?: number | null
}

const ShareAction = ({ open, onClose, shareUrl, title, description, forumId }: Props) => {
  const encodedTitle = encodeURIComponent(title || '')

const baseUrl = shareUrl.replace(/\/$/, '')
const sanitizedUrl = baseUrl.replace(/\/\d+$/, '')
const finalShareUrl = `${sanitizedUrl}/${forumId}`
  const shareOptions = [
    {
      name: 'Facebook',
      icon: <FaceBookIcon/>,
      url: `https://www.facebook.com/sharer/sharer.php?u=${finalShareUrl}`,
    },
    {
      name: 'Messenger',
      icon: <MessengerIcon/>,
      url: `fb-messenger://share/?link=${finalShareUrl}`,
    },
    {
      name: 'Twitter',
      icon: <TwitterIcon/>,
      url: `https://twitter.com/intent/tweet?url=${finalShareUrl}&text=${encodedTitle}`,
    },
    {
      name: 'WhatsApp',
      icon: <WhatsappIcon />,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${finalShareUrl}`,
    },
  ]

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${finalShareUrl}`);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 font-montserrat px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="bg-[#1c1c1c] w-full max-w-md rounded-2xl overflow-hidden border border-gray-800 text-white relative shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl cursor-pointer hover:bg-white/20 rounded-full p-2 transition"
            >
              <CloseButton />
            </button>

            <div className="p-6 flex flex-col items-center gap-4">
              <h2 className="text-2xl font-semibold mb-2">Share this post</h2>
              <p className="text-gray-400 text-sm mb-4 text-center">
                {description}
              </p>

              <div className="grid grid-cols-3 gap-4 w-full justify-items-center">
                {shareOptions.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleShare(item.url)}
                    className="flex flex-col items-center gap-2 hover:bg-white/10 p-3 rounded-xl transition w-full cursor-pointer"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <span className="text-sm text-gray-300">{item.name}</span>
                  </button>
                ))}
                <button
                  onClick={handleCopy}
                  className="flex flex-col items-center gap-2 hover:bg-white/10 p-3 rounded-xl transition w-full cursor-pointer"
                >
                  <div className="text-2xl">
                    <LinkIcon />
                  </div>
                  <span className="text-sm text-gray-300">Copy Link</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ShareAction
