import React from 'react'
import { DiscussionSkeleton, ForumSkeleton } from './skeleton'

const Loading = () => {
  return (
    <div className="w-screen h-auto px-6 sm:px-12 flex flex-col-reverse md:flex-row justify-between items-start py-15 xl:py-30 gap-8">
      <div className='w-full md:w-3/4'>
        {Array.from({length: 5}).map((_, index) => (
          <ForumSkeleton key={index} />
        ))}
      </div>
      <DiscussionSkeleton />
    </div>
  )
}

export default Loading