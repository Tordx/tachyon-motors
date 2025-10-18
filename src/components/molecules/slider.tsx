'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

export interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className = '',
}) => {
  return (
    <SliderPrimitive.Root
      className={`relative flex items-center w-full h-5 ${className}`}
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={onValueChange}
    >
      {/* Track */}
      <SliderPrimitive.Track className="bg-[#333] relative flex-grow rounded-full h-[4px]">
        <SliderPrimitive.Range className="absolute bg-white rounded-full h-full" />
      </SliderPrimitive.Track>

      {/* Thumbs (render dynamically based on value.length) */}
      {value.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block w-4 h-4 bg-white rounded-full shadow transition-transform duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
        />
      ))}
    </SliderPrimitive.Root>
  )
}
