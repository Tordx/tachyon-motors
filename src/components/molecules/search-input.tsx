'use client'

import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { Slider } from './slider'
import ActionIconButton from './action-icon-button'
import { FilterProps } from '@/types'

type VehicleType = 'all' | 'car' | 'motorcycle'
type FinanceType = 'all' | 'cash' | 'finance'


export interface ProductFilterProps {
  filters: FilterProps,
  onFiltersChange?: (filters: FilterProps) => void
}

export default function ProductFilters(props: ProductFilterProps) {
  const { onFiltersChange, filters } = props;
  const [activeAction, setActiveAction] = useState<string>("");

  const handleActiveAction = (action: string) => {
    setActiveAction(prev => prev === action ? "" : action);
  }

  const handleOnFilterChange = ({ key, value }: { key: keyof FilterProps, value: string | number[] }) => {
    onFiltersChange?.({
      ...filters,
      [key]: value
    })
  }

  return (
    <div className="w-full bg-[#171717] text-white px-4 py-3 rounded-xl shadow-md flex flex-col gap-3 lg:flex-row md:items-center md:justify-between font-montserrat">
      {/* LEFT: Vehicle Type */}
      <div className="flex items-center gap-2">
        {(['all', 'car', 'motorcycle'] as VehicleType[]).map((type) => (
          <button
            key={type}
            onClick={() => {
              handleOnFilterChange({ key: 'vehicleType', value: type })
            }}
            className={`px-4 py-2 rounded-lg border cursor-pointer ${filters.vehicleType === type
              ? 'bg-white text-[#171717]'
              : 'border-gray-600 text-white hover:bg-gray-700'
              } transition`}
          >
            {type === 'all'
              ? 'All'
              : type === 'car'
                ? 'Cars'
                : 'Motorcycles'}
          </button>
        ))}
      </div>

      {/* CENTER: Search bar */}
      <div className="flex-grow max-w-4xl mx-auto w-full relative">
        <input
          value={filters.searchValue}
          onChange={(e) => handleOnFilterChange({ key: 'searchValue', value: e.target.value })}
          type="text"
          placeholder="Search vehicles..."
          className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none text-white placeholder-gray-400"
        />
        <Icon
          icon="material-symbols:search-rounded"
          className="absolute right-3 top-3 text-gray-400 text-2xl"
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
                handleOnFilterChange({ key: 'financeType', value: type })
              }}
              className={`px-3 py-2 rounded-lg border cursor-pointer ${filters.financeType === type
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
          <ActionIconButton title='Year' active={filters.yearRange[0] !== 2000 || filters.yearRange[1] !== 2025} onClick={() => handleActiveAction('year')} />
          {activeAction === 'year' &&
            <div className="w-40 absolute top-12 right-0 bg-[#171717] p-4 rounded-lg shadow-lg z-10">
              <label className="text-sm text-gray-300 mb-1 block">Year</label>
              <Slider
                value={filters.yearRange}
                onValueChange={(val) => {
                  handleOnFilterChange({ key: 'yearRange', value: val })
                }}
                min={1985}
                max={2025}
                step={1}
                className='hover:cursor-grab active:cursor-grabbing'
              />
              <div className="text-xs text-gray-400 mt-1">
                {filters.yearRange[0]} - {filters.yearRange[1]}
              </div>
              <button
                onClick={() => {
                  handleOnFilterChange({ key: 'yearRange', value: [2000, 2025] })
                }}
                className="text-sm text-gray-300 mb-1 block py-2 px-4 ring-1 ring-gray-600 rounded-sm my-4 hover:bg-gray-700 cursor-pointer">Clear
              </button>
            </div>
          }
        </div>
        {/* Price Range */}
        <div className='relative'>
          <ActionIconButton title='Price Range' active={filters.priceRange[0] !== 0 || filters.priceRange[1] !== 10000000} onClick={() => handleActiveAction('price')} />
          {activeAction === 'price' &&
            <div className="md:min-w-120 w-auto absolute top-12 right-0 bg-[#171717] p-4 rounded-lg shadow-lg z-10">
              <label className="text-sm text-gray-300 mb-1 block">Price</label>
              <Slider
                value={filters.priceRange}
                onValueChange={(val) => {
                  handleOnFilterChange({ key: 'priceRange', value: val })
                }}
                min={0}
                max={10000000}
                step={50000}
                className='hover:cursor-grab active:cursor-grabbing'
              />
              <div className="text-xs text-gray-400 mt-1">
                ₱{filters.priceRange[0].toLocaleString()} - ₱
                {filters.priceRange[1].toLocaleString()}
              </div>
              <button
                onClick={() => {
                  handleOnFilterChange({ key: 'priceRange', value: [0, 10000000] })
                }}
                className="text-sm text-gray-300 mb-1 block py-2 px-4 ring-1 ring-gray-600 rounded-sm my-4 hover:bg-gray-700 cursor-pointer">Clear
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
