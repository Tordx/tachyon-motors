import React, { Suspense } from 'react'
import ProductClient from './client'
import { createClient } from '@/utils/supabase/server'
import Loading from './loading'
import { ProductService } from '@/services/products'

export default async function Products() {
  const supabase = await createClient()

  const data = await ProductService.getAll(supabase)

  return (
    <Suspense fallback={<Loading />}>
      <ProductClient data={data} />
    </Suspense>
  )
}