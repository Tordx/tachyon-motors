/* eslint-disable @next/next/no-img-element */
'use client'

import { Product, ProductWithSeller } from '@/services/products'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CloseButton from '@/components/icons/close'
import formatCurrency from '@/utils/currency-format'
import FinancingBadge from '../[id]/components/financing-options'

type InquiryModalProps = {
  open: boolean
  onClose: () => void
  vehicleDetails: (Product & { seller_name: string }) | ProductWithSeller | null
}

const InquiryModal: React.FC<InquiryModalProps> = ({
  open,
  onClose,
  vehicleDetails,
}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  if (!vehicleDetails) return null

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
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl cursor-pointer hover:bg-white/30 rounded-full p-2 transition"
            >
              <CloseButton />
            </button>

            {/* LEFT: Vehicle Preview */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              <img
                src={vehicleDetails.image_name}
                alt={`${vehicleDetails.brand} ${vehicleDetails.model}`}
                className="object-cover w-full h-full"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-xl font-semibold">
                  {vehicleDetails.brand} {vehicleDetails.model}
                </h3>
                <p className="text-sm text-gray-300">{vehicleDetails.year}</p>
                <p className="text-amber-400 font-bold text-lg mt-1">
                  {formatCurrency(vehicleDetails.price)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <FinancingBadge type={vehicleDetails.financing_option} className="text-xs rounded-md" />
                  <p className="text-xs text-gray-400">
                    <span className="text-white">{(vehicleDetails as ProductWithSeller).seller?.name ?? (vehicleDetails as Product & { seller_name: string }).seller_name}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Inquiry Form */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4">Inquiry Form</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  console.log('Inquiry submitted:', { ...form, vehicleDetails })
                  onClose()
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full p-2 rounded-md bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:border-amber-500"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full p-2 rounded-md bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:border-amber-500"
                />

                <input
                  type="tel"
                  placeholder="Your Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full p-2 rounded-md bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:border-amber-500"
                />

                <textarea
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full p-2 rounded-md bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:border-amber-500"
                />

                <button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold py-3 rounded-lg hover:opacity-90 transition">
                  Inquire Now
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InquiryModal
