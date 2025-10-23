'use client'

import React from 'react'
import { Product, ProductWithSeller } from '@/services/products'
import InquiryModal from '../contents/form'
import ProductDetails from './section/product-details'
import SuggestedProducts from './section/suggested-products'
import { useRouter } from 'next/navigation'
import SuccessForm from '../contents/success'

type Props = {
  product: ProductWithSeller | null;
  suggested: (Product & { seller_name: string })[] | null;
}

const ProductPageClient: React.FC<Props> = ({ product, suggested }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedVehicle, setSelectedVehicle] = React.useState<ProductWithSeller | null>(null);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  
  const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL as string
  if (!product) return null

  const handleInquireClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedVehicle(() => {
      const addURL = {
        ...product,
        image_name: `${STORAGE_BASE_URL}${product.image_name}`
      }
      return addURL
    });
    setOpenModal(true);
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-white font-montserrat">
      <ProductDetails onClick={(e) => handleInquireClick(e)} product={product} />
      <SuggestedProducts data={suggested} selectedItem={(item) => router.push(`/products/vehicles/${item.id}`)} onClick={() => setOpenModal(true)} />
      <SuccessForm open={openSuccess} onClose={() => setOpenSuccess(false)} />

      <InquiryModal open={openModal} onClose={() => { setOpenModal(!openModal) }} vehicleDetails={selectedVehicle} openSuccess={() => setOpenSuccess(true)} />

    </div>
  )
}

export default ProductPageClient