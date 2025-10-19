'use client'
import React from 'react'
import ProductList from './contents/sections/product-list/product-list'
import { Product } from '@/services/products';
import ProductFilters from '@/components/molecules/search-input';
import InquiryModal from './contents/modal';

const ProductClient = (props: { data: (Product & { seller_name: string })[] }) => {
  const { data } = props;

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedVehicle, setSelectedVehicle] = React.useState<Product & { seller_name: string } | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (filters: any) => {
    console.log('Selected filters:', filters)
  }
  return (
    <div className='w-full flex flex-col items-start justify-start md:px-8 py-15'>
      <ProductFilters onFiltersChange={handleFilterChange} />
      <ProductList data={data} selectedItem={(item) => setSelectedVehicle(item)} onClick={() => setOpenModal(true)} />
      <InquiryModal open={openModal} onClose={() => {setOpenModal(!openModal)}} vehicleDetails={selectedVehicle} />
    </div>
  )
}

export default ProductClient