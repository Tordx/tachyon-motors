import React from 'react'

const ProductCardButtonSkeleton = () => {
  return (
    <div
      className='bg-gray-800 bg-gradient-to-t from-black via-transparent to-transparent animate-pulse w-full flex flex-col rounded-lg overflow-hidden'
    >
      {/* TOP: Image */}
      <div className='relative w-full h-80 sm:h-88 md:h-94 lg:h-104'>

      </div>
      </div>
  )
}

const ProductFiltersSkeleton = () => {
  return (
    <div className="w-full bg-[#171717] text-white px-4 py-3 rounded-xl shadow-md flex flex-col gap-3 lg:flex-row md:items-center md:justify-between font-montserrat animate-pulse">
      {/* LEFT: Vehicle Type Skeleton */}
      <div className="flex items-center gap-2">
        <div className="w-16 h-9 bg-gray-700 rounded-lg" />
        <div className="w-16 h-9 bg-gray-700 rounded-lg" />
        <div className="w-24 h-9 bg-gray-700 rounded-lg" />
      </div>

      {/* CENTER: Search Bar Skeleton */}
      <div className="flex-grow max-w-md mx-auto w-full relative">
        <div className="w-full h-10 bg-gray-700 rounded-lg" />
      </div>

      {/* RIGHT: Filters Skeleton */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Finance Type Skeleton */}
        <div className="flex gap-2">
          <div className="w-12 h-9 bg-gray-700 rounded-lg" />
          <div className="w-12 h-9 bg-gray-700 rounded-lg" />
          <div className="w-16 h-9 bg-gray-700 rounded-lg" />
        </div>

        {/* Year Range Skeleton */}
        <div className="relative">
          <div className="w-24 h-9 bg-gray-700 rounded-lg" />
        </div>

        {/* Price Range Skeleton */}
        <div className="relative">
          <div className="w-32 h-9 bg-gray-700 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export { ProductCardButtonSkeleton, ProductFiltersSkeleton }