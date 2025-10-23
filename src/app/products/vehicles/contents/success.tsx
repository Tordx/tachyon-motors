import CheckCircleIcon from '@/components/icons/check-circle'
import CloseButton from '@/components/icons/close'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

type Props = {
  open: boolean
  onClose(): void

}

const SuccessForm = (props: Props) => {
  const {open, onClose} = props;

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
            className="bg-[#1c1c1c] w-full max-w-4xl rounded-2xl overflow-hidden border border-gray-800 text-white relative shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl cursor-pointer hover:bg-white/30 rounded-full p-2 transition z-50"
            >
              <CloseButton />
            </button>
            <div className="w-full p-6 text-center items-center justify-center flex flex-col gap-4">
              <CheckCircleIcon />
              <h2 className="text-2xl font-semibold mb-2">Success!</h2>
              <p className="text-gray-300">Your inquiry has been submitted successfully.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SuccessForm