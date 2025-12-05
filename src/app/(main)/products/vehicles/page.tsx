export const dynamic = 'force-dynamic'

import React from 'react'
import ProductClient from './client'
import { ProductService } from '@/services/products'

export default async function Products() {
  const data = await ProductService.getAll(null)

  return <ProductClient  initialData={data}
  />
}
