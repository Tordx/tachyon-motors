'use client'
import Image from 'next/image'
import React from 'react'

type Product = {
  image: string
  make: string
  model: string
  year: number
  price: number
  km: number
}

type Props = {
  item: Product
  onClick?: () => void
}

const ProductCardButton = ({ item, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className='w-full w-sm max-w-md flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 font-montserrat'
    >
      {/* TOP: Image */}
      <div className='relative w-full h-48'>
        <Image
          src={item.image}
          alt={`${item.make} ${item.model}`}
          fill
          className='object-cover'
        />
        <div className='absolute bottom-0 left-0 bg-black/60 text-white px-3 py-1 text-sm rounded-tr-lg'>
          ₱{item.price.toLocaleString()}
        </div>
      </div>

      {/* BOTTOM: Info */}
      <div className='p-4 flex flex-col justify-between text-left flex-1'>
        <div>
          <h2 className='text-lg font-semibold text-gray-800'>
            {item.make} {item.model}
          </h2>
          <p className='text-sm text-gray-500'>{item.year}</p>
        </div>

        <div className='text-sm text-gray-600 mt-3'>
          <p className='font-medium'>{item.km.toLocaleString()} km</p>
        </div>

        <div className='mt-4'>
          <span className='inline-block bg-gray-800 text-white text-sm px-3 py-1 rounded-full'>
            View Details
          </span>
        </div>
      </div>
    </button>
  )
}

export default ProductCardButton
