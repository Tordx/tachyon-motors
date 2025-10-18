'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Slider } from './slider'
import ActionIconButton from './action-icon-button'

type VehicleType = 'all' | 'cars' | 'motorcycles'
type FinanceType = 'all' | 'cash' | 'finance'

export interface ProductFilterProps {
  onFiltersChange?: (filters: {
    vehicleType: VehicleType
    financeType: FinanceType
    yearRange: number[]
    priceRange: number[]
  }) => void
}

export default function ProductFilters({ onFiltersChange }: ProductFilterProps) {
  const [vehicleType, setVehicleType] = useState<VehicleType>('all')
  const [financeType, setFinanceType] = useState<FinanceType>('all')
  const [yearRange, setYearRange] = useState<number[]>([2000, 2025])
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000000])

  const [activeAction, setActiveAction] = useState<string>("");
  
  const handleActiveAction = (action: string) => {
    setActiveAction(prev => prev === action ? "" : action);
  }
  const triggerChange = () => {
    onFiltersChange?.({
      vehicleType,
      financeType,
      yearRange,
      priceRange,
    })
  }

  return (
    <div className="w-full bg-[#171717] text-white px-4 py-3 rounded-xl shadow-md flex flex-col gap-3 lg:flex-row md:items-center md:justify-between font-montserrat">
      {/* LEFT: Vehicle Type */}
      <div className="flex items-center gap-2">
        {(['all', 'cars', 'motorcycles'] as VehicleType[]).map((type) => (
          <button
            key={type}
            onClick={() => {
              setVehicleType(type)
              triggerChange()
            }}
            className={`px-4 py-2 rounded-lg border ${vehicleType === type
                ? 'bg-white text-[#171717]'
                : 'border-gray-600 text-white hover:bg-gray-700'
              } transition`}
          >
            {type === 'all'
              ? 'All'
              : type === 'cars'
                ? 'Cars'
                : 'Motorcycles'}
          </button>
        ))}
      </div>

      {/* CENTER: Search bar */}
      <div className="flex-grow max-w-md mx-auto w-full relative">
        <input
          type="text"
          placeholder="Search vehicles..."
          className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none text-white placeholder-gray-400"
        />
        <Icon
          icon="material-symbols:search-rounded"
          className="absolute right-3 top-2.5 text-gray-400 text-2xl"
        />
      </div>

      {/* RIGHT: Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Finance Type */}
        <div className="flex gap-2">
          {(['all', 'cash', 'finance'] as FinanceType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setFinanceType(type)
                triggerChange()
              }}
              className={`px-3 py-2 rounded-lg border ${financeType === type
                  ? 'bg-white text-[#171717]'
                  : 'border-gray-600 text-white hover:bg-gray-700'
                } transition`}
            >
              {type === 'all'
                ? 'All'
                : type === 'cash'
                  ? 'Cash'
                  : 'Finance'}
            </button>
          ))}
        </div>

        {/* Year Range */}
        <div className='relative'>
          <ActionIconButton title='Year' active={yearRange[0] !== 2000 || yearRange[1] !== 2025} onClick={() => handleActiveAction('year')} />
          {activeAction === 'year' &&
          <div className="w-40 absolute top-12 right-0 bg-[#171717] p-4 rounded-lg shadow-lg z-10">
            <label className="text-sm text-gray-300 mb-1 block">Year</label>
            <Slider
              value={yearRange}
              onValueChange={(val) => {
                setYearRange(val)
                triggerChange()
              }}
              min={2000}
              max={2025}
              step={1}
            />
            <div className="text-xs text-gray-400 mt-1">
              {yearRange[0]} - {yearRange[1]}
            </div>
          </div>}
        </div>
        {/* Price Range */}
        <div className='relative'>
          <ActionIconButton title='Price Range' active={priceRange[0] !== 0 || priceRange[1] !== 10000000} onClick={() => handleActiveAction('price')} />
        {activeAction === 'price' && <div className="min-w-120 w-auto absolute top-12 right-0 bg-[#171717] p-4 rounded-lg shadow-lg z-10">
          <label className="text-sm text-gray-300 mb-1 block">Price</label>
          <Slider
            value={priceRange}
            onValueChange={(val) => {
              setPriceRange(val)
              triggerChange()
            }}
            min={0}
            max={10000000}
            step={50000}
          />
          <div className="text-xs text-gray-400 mt-1">
            ₱{priceRange[0].toLocaleString()} - ₱
            {priceRange[1].toLocaleString()}
          </div>
        </div>}
        </div>
      </div>
    </div>
  )
}
