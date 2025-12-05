import React from 'react'
import { ProductCardButtonSkeleton, ProductFiltersSkeleton } from './skeleton'

const Loading = () => {
  return (
    <div className='w-full flex flex-col items-start justify-start px-8 py-15'>
      <ProductFiltersSkeleton />
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8 p-4'>
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductCardButtonSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

export default Loading