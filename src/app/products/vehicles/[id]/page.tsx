import { Product, ProductService } from '@/services/products'
import { createClient } from '@/utils/supabase/server';
import React, { Suspense } from 'react'
import ProductPageClient from './client';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const product_details = await ProductService.getById(supabase, Number(id))

  let suggested_products: (Product & { seller_name: string })[] | null = null

  if (product_details) {
    suggested_products = await ProductService.getAllByType(supabase, product_details.classification, product_details.id)
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductPageClient product={product_details} suggested={suggested_products} />
    </Suspense>
  )
}