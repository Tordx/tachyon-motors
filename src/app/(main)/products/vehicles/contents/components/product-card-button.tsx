/* eslint-disable @next/next/no-img-element */
'use client'

import { Product } from '@/services/products'
import formatCurrency from '@/utils/currency-format'
import Link from 'next/link'
import React from 'react'
import FinancingBadge from '../../[id]/components/financing-options'
import Share from '@/components/icons/share'
import InteractionButton from '@/app/(main)/forum/contents/sections/thread/components/button'

type Props = {
  item: (Product & { seller_name: string });
  onClick(
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product & { seller_name: string }
  ): void;
  onShare(e?: React.MouseEvent<HTMLButtonElement>): void;
}

const ProductCardButton = ({ item, onClick, onShare }: Props) => {
  return (
    <Link
      href={`/products/vehicles/${item.id}`}
      className='w-full flex flex-col bg-[#171717] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all 
        duration-300 
        font-montserrat 
        mx-auto
        cursor-pointer
        hover:scale-103
      '
    >
      {/* TOP: Image */}
      <div className='relative w-full h-40 sm:h-48 md:h-56 lg:h-64'>
        <img
          src={item.image_name}
          alt={`${item.model} ${item.brand}`}
          className='object-cover w-full h-full'
          draggable={false}
        />
        <div className='absolute bottom-0 left-0 bg-black/60 text-white px-3 py-1 text-sm rounded-tr-lg capitalize'>
          {formatCurrency(item.price)}
        </div>
        <div className='absolute bottom-0 right-0'>

          <FinancingBadge className='rounded-tl-md text-sm ' type={item.financing_option} />
        </div>
      </div>

      {/* BOTTOM: Info */}
      <div className='p-3 sm:p-4 flex flex-col justify-between text-left flex-1 border-1 border-gray-700 rounded-b-lg'>
        <div>
          <div className='flex w-full justify-between items-center'>
            <div>
              <h2 className='text-base sm:text-lg font-semibold text-white line-clamp-1'>
                {item.brand} {item.model}
              </h2>
              <h3 className='text-base text-xs font-normal text-white line-clamp-1'>{item.seller_name}</h3>
            </div>
            <div>
              <InteractionButton onClick={onShare}> <Share /></InteractionButton>
            </div>
          </div>
          <p className='text-xs sm:text-sm text-white/50'>{item.year}</p>
        </div>
        <div className='text-xs sm:text-sm text-gray-600 mt-3'>
          <p className='font-medium'>{item.mileage.toLocaleString()} km</p>
        </div>

        <button onClick={(e) => onClick(e, item)} className='mt-4 self-start cursor-pointer border-1 border-gray-600 rounded-lg hover:bg-gray-800 transition'>
          <span className='inline-block text-white text-sm px-3 py-1 rounded-md hover:bg-gray-700'>
            Inquire
          </span>
        </button>
      </div>
    </Link>
  )
}

export default ProductCardButton
