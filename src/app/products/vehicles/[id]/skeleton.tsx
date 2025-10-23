'use client'
import React from 'react'

export default function ProductDetailsSkeleton() {
  return (
    <section className="bg-[#0f0f0f] w-full lg:max-w-3/4 xl:max-w-3/5 mx-auto animate-pulse">
      {/* Banner Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-gray-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 md:left-12 space-y-3">
          <div className="h-10 w-64 bg-gray-700 rounded"></div>
          <div className="h-4 w-48 bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
        {/* Left Column - Info */}
        <div className="flex-1 space-y-10">
          {/* Vehicle Info */}
          <section>
            <div className="h-6 w-48 bg-gray-700 rounded mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-24 bg-gray-700 rounded"></div>
                  <div className="h-4 w-32 bg-gray-600 rounded"></div>
                </div>
              ))}
            </div>
          </section>

          {/* Description */}
          <section>
            <div className="h-6 w-40 bg-gray-700 rounded mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-3 w-full bg-gray-700 rounded"></div>
              ))}
            </div>
          </section>

          {/* Financing Requirements */}
          <section>
            <div className="h-6 w-60 bg-gray-700 rounded mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-24 bg-gray-700 rounded"></div>
                  <div className="h-4 w-32 bg-gray-600 rounded"></div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Seller/Price Card */}
        <div className="w-full lg:w-96">
          <div className="bg-[#1c1c1c] rounded-2xl p-6 border border-gray-800 shadow-xl sticky top-24 space-y-5">
            <div className="h-8 w-40 bg-gray-700 rounded"></div>
            <div className="h-5 w-56 bg-gray-700 rounded"></div>
            <div className="h-10 w-full bg-gray-600 rounded-lg"></div>
            <div className="h-10 w-full bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
