'use client'

import React, { useEffect, useState } from 'react'
import ProductCardButton from '../../components/product-card-button'
import { Product } from '@/services/products'

type Props = {
  data: (Product & { seller_name: string })[];
}

const ProductList = (props: Props) => {
  const { data } = props;
  const [products, setProducts] = useState<(Product & { seller_name: string })[]>([])
  const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL as string

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const formatted = data.map((item: (Product & { seller_name: string })) => ({
          ...item,
          image_name: `${STORAGE_BASE_URL}${item.image_name}`,
        }))

        setProducts(formatted)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [STORAGE_BASE_URL, data])

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8 p-4'>
      {products.map((item) => (
        <ProductCardButton key={item.id} item={item} onClick={(e) => {e.stopPropagation(); e.preventDefault(); alert('Inquire button clicked')}} />
      ))}
    </div>
  )
}

export default ProductList
