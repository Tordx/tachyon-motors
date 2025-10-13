import React from 'react'

export const ForumSkeleton = () => {
  return (
    <div
      className="flex border-b-none sm:border-b-1 sm:border-b-gray-50/10 flex-col items-start justify-center p-4 gap-4 rounded-lg sm:rounded-none transition-all duration-150 ring-gray-50/10 ring-2 sm:ring-0 my-4 md:my-0"
    >
      <div className="flex flex-row justify-between items-start w-full">
        <div className="w-full py-4">
          <div className="bg-gray-50/10 lg:w-150 h-10 animate-pulse" />
          <div className="mt-2 line-clamp-2 bg-gray-50/10 lg:w-175 h-5 w-3/4 animate-pulse" />
          <div className="mt-2 line-clamp-2 bg-gray-50/10 lg:w-75 w-2/4 h-5 animate-pulse" />
          <div className="flex justify-between items-center mt-3 text-xs text-white">
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DiscussionSkeleton = () => {
  return (
    <>
      <div className='flex flex-row w-full justify-between items-center flex md:hidden mb-5 mx-6'>
        <div
          className='w-full my-4 ring-2 bg-gray-50/10  rounded-lg animate-pulse'></div>
        <div className='flex justify-center items-center w-15 h-15 ring-white rounded-full'>
        </div>
      </div>
      <div className='flex flex-col gap-4 hidden md:flex w-1/6 animate-pulse'>
        <button
      className='my-4 text-black rounded-lg bg-gray-50/10  w-full h-12'></button>
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className='w-full flex flex-row items-center justify-start gap-2 cursor-pointer bg-gray-50/10 p-4 rounded-sm'>
          </div>
        ))}
        </div>
      </>
      )
}