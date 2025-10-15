'use client'
import React from 'react'
import ProductCardButton from '../../components/product-card-button'

const ProductList = () => {
  const mockData = [
    {
      id: 1,
      image: '/cars/toyota-vios.jpg',
      make: 'Toyota',
      model: 'Vios',
      year: 2019,
      price: 650000,
      km: 35000,
    },
    {
      id: 2,
      image: '/cars/honda-civic.jpg',
      make: 'Honda',
      model: 'Civic',
      year: 2018,
      price: 820000,
      km: 42000,
    },
    {
      id: 3,
      image: '/motorcycles/yamaha-mio.jpg',
      make: 'Yamaha',
      model: 'Mio i125',
      year: 2020,
      price: 68000,
      km: 12000,
    },
    {
      id: 4,
      image: '/motorcycles/kawasaki-z400.jpg',
      make: 'Kawasaki',
      model: 'Z400',
      year: 2021,
      price: 265000,
      km: 8000,
    },
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-4'>
      {mockData.map((item) => (
        <ProductCardButton key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ProductList
