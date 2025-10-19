/* eslint-disable @next/next/no-img-element */
import React from 'react'
import InfoItem from '../components/info-item'
import { ProductWithSeller } from '@/services/products'
import FinancingBadge from '../components/financing-options'
import formatCurrency from '@/utils/currency-format'

type Props = {
  product: ProductWithSeller | null
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProductDetails = (props: Props) => {
  const { product, onClick } = props;
  const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL as string

  if (product === null) return null;

  return (
    <section className='bg-[#0f0f0f] w-full lg:max-w-3/4 xl:max-w-3/5 mx-auto'>
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
              <InfoItem label="Type" value={product.classification} />
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
            <button onClick={onClick} className="w-full mt-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold py-3 cursor-pointer rounded-lg hover:opacity-90 transition">
              Inquire Now
            </button>

            <button className="w-full mt-3 border border-gray-600 py-3 rounded-lg hover:bg-gray-800 transition">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails