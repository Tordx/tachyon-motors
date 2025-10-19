/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { ProductWithSeller } from '@/services/products'
import FinancingBadge from './components/financing-options'
import formatCurrency from '@/utils/currency-format'
import InquiryModal from '../contents/modal'

type Props = {
  product: ProductWithSeller | null
}

const ProductPageClient: React.FC<Props> = ({ product }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedVehicle, setSelectedVehicle] = React.useState<ProductWithSeller | null>(null);
  const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL as string
  if (!product) return null

  const handleInquireClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedVehicle(() => {
      const addURL = {
        ...product,
        image_name: `${STORAGE_BASE_URL}${product.image_name}`
      }
      return addURL
    });
    setOpenModal(true);
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-montserrat">
      {/* Banner Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={`${STORAGE_BASE_URL}${product.image_name}`}
          alt={product.name}
          className="object-cover w-full h-full brightness-90"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 md:left-12">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            {product.name}
          </h1>
          <p className="text-gray-300 mt-1">
            {product.brand} — {product.model} ({product.year})
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
        {/* Left Column - Info */}
        <div className="flex-1 space-y-10">
          {/* Vehicle Info */}
          <section>
            <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">
              Vehicle Information
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-300 text-sm mt-4">
              <InfoItem label="Brand" value={product.brand} />
              <InfoItem label="Model" value={product.model} />
              <InfoItem label="Type" value={product.type} />
              <InfoItem label="Year" value={product.year.toString()} />
              <InfoItem
                label="Mileage"
                value={`${product.mileage.toLocaleString()} km`}
              />
              <InfoItem
                label="Financing Option"
                value={<FinancingBadge type={product.financing_option} />}
              />
              <InfoItem
                label="Posted"
                value={new Date(product.created_at).toLocaleDateString()}
              />
              <InfoItem label="Seller" value={product.seller.name} />
              {product.seller.address && (
                <InfoItem label="Address" value={product.seller.address} />
              )}
            </div>
          </section>

          {/* Description */}
          {product.description && (
            <section>
              <h3 className="text-2xl font-semibold border-b border-gray-700 pb-2 mb-3">
                Description
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
                {product.description}
              </p>
            </section>
          )}
        </div>

        {/* Right Column - Seller/Price Card */}
        <div className="w-full lg:w-96">
          <div className="bg-[#1c1c1c] rounded-2xl p-6 border border-gray-800 shadow-xl sticky top-24">
            <p className="text-3xl font-bold text-white mb-2">
              {formatCurrency(product.price)}
            </p>
            {product.downpayment !== 0 && <p className="text-md font-normal text-gray-300 mb-4">
              {formatCurrency(product.downpayment)} Downpayment
            </p>}
            <FinancingBadge type={product.financing_option} />
            <button onClick={(e) => handleInquireClick(e)} className="w-full mt-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold py-3 cursor-pointer rounded-lg hover:opacity-90 transition">
              Inquire Now
            </button>

            <button className="w-full mt-3 border border-gray-600 py-3 rounded-lg hover:bg-gray-800 transition">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
            <InquiryModal open={openModal} onClose={() => {setOpenModal(!openModal)}} vehicleDetails={selectedVehicle} />

    </div>
  )
}

export default ProductPageClient

// 🧩 Subcomponents
function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-start">
      <span className="text-gray-500 text-xs uppercase">{label}</span>
      <span className="text-white text-sm mt-1 capitalize">{value}</span>
    </div>
  )
}

