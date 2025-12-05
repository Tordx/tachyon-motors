'use client'

import React, { useEffect, useState } from 'react'
import { Product } from '@/services/products'
import ProductCardButton from '../../contents/components/product-card-button';

type Props = {
  data: (Product & { seller_name: string })[] | null;
  selectedItem(item: Product & { seller_name: string }): void;
  onClick(): void;
}

const ProductList = (props: Props) => {
  const { data, selectedItem, onClick } = props;
  const [products, setProducts] = useState<(Product & { seller_name: string })[]>([])
  const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL as string

  useEffect(() => {
    const fetchProducts = async () => {
      if (!data) return;
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

  const handleSelectedItem = (e: React.MouseEvent<HTMLButtonElement>, item: Product & { seller_name: string }) => {
    e.stopPropagation()
    e.preventDefault()
    selectedItem(item)
    onClick();
  }

  if(!data || data.length === 0) 
    return (
      <section className='py-4 w-full px-12'>
        </section>
    );

  return (
    <section className='py-4 w-full px-12'>
      <div className='py-4 text-2xl font-bold'>You may Also Like </div>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8 p-4'>
        {products.map((item) => (
          <ProductCardButton key={item.id} item={item} onClick={handleSelectedItem} />
        ))}
      </div>
    </section>
  )
}

export default ProductList
