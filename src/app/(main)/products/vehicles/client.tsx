/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React from 'react'
import ProductList from './contents/sections/product-list/product-list'
import { Product, ProductService } from '@/services/products';
import ProductFilters from '@/components/molecules/search-input';
import InquiryModal from './contents/form';
import SuccessForm from './contents/success';
import { FilterProps } from '@/types';
import ShareAction from '@/app/(main)/forum/contents/sections/thread/components/share-actions';

const ProductClient = (props: { initialData: (Product & { seller_name: string })[] }) => {
  const { initialData } = props;

  const [data, setData] = React.useState<(Product & { seller_name: string })[]>(initialData);
  const [productFilters, setProductFilters] = React.useState<FilterProps>({
    vehicleType: 'all',
    financeType: 'all',
    yearRange: [2000, 2025],
    priceRange: [0, 10000000],
    searchValue: ''
  });
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedVehicle, setSelectedVehicle] = React.useState<Product & { seller_name: string } | null>(null);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [vehicleId, setVehicleId] = React.useState<number | null>(null);
  const [shareOpen, setShareOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const data = await ProductService.getAll(productFilters)
      setData(data)
    }, 150)
    return () => clearTimeout(delayDebounce)
  }, [productFilters.searchValue])

  React.useEffect(() => {
    const fetchFilteredData = async () => {
      const data = await ProductService.getAll(productFilters)
      setData(data)
    }
    fetchFilteredData()
  }, [productFilters.vehicleType, productFilters.financeType, productFilters.yearRange, productFilters.priceRange])

  const handleFilterChange = (item: FilterProps) => {
    setProductFilters(item)
  }
  return (
    <div className='w-full h-full min-h-screen flex flex-col items-start justify-start md:px-8 py-15'>
      <ProductFilters onFiltersChange={(item) => handleFilterChange(item)} filters={productFilters} />
      <ProductList data={data} selectedItem={(item) => setSelectedVehicle(item)} onClick={() => setOpenModal(true)} onShare={(id, e) => { setVehicleId(id); console.log(id); setShareOpen(true); e?.preventDefault() }} />
      <SuccessForm open={openSuccess} onClose={() => setOpenSuccess(false)} />
      <InquiryModal open={openModal} onClose={() => { setOpenModal(!openModal) }} vehicleDetails={selectedVehicle} openSuccess={() => setOpenSuccess(true)} />
      <ShareAction forumId={vehicleId} shareUrl={window.location.href} onClose={() => setShareOpen(!shareOpen)} open={shareOpen} description='Choose a platform to share discussion' />
    </div>
  )
}

export default ProductClient