import { Product, ProductService } from '@/services/products'
import React from 'react'
import ProductPageClient from './client';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product_details = await ProductService.getById(Number(id))

  let suggested_products: (Product & { seller_name: string })[] | null = null

  if (product_details) {
    suggested_products = await ProductService.getAllByType(product_details.classification, product_details.id)
  }
  return (
      <ProductPageClient product={product_details} suggested={suggested_products} />
  )
}