import React from 'react'
import ProductDetailsSkeleton from './skeleton'

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-white font-montserrat">
      <ProductDetailsSkeleton />
    </div>
  )
}

export default Loading