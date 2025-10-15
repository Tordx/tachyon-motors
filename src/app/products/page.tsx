import React, { Suspense } from 'react'
import ProductClient from './client'

const Products = () => {
  return (
    <Suspense>
      <ProductClient />
    </Suspense>
  )
}

export default Products