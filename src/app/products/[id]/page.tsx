import { ProductService } from '@/services/products'
import { createClient } from '@/utils/supabase/server';
import React, { Suspense } from 'react'
import ProductPageClient from './client';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const {id}  = await params;
  const supabase = await createClient();
  const product_details = await ProductService.getById(supabase, Number(id))
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductPageClient product={product_details} />
    </Suspense>
  )
}