import { ForumContentResponse } from '@/types'
import React from 'react'
import Interaction from '../../contents/sections/thread/components/interactions'
import Cookie from '@/components/icons/cookie'

type Props = {
  forumDetails: ForumContentResponse | null
  iLiked: boolean;
  handleInteractionPressed(e: string): void
}

const ContentSection = (props: Props) => {
  const { forumDetails, iLiked, handleInteractionPressed } = props;
  if (!forumDetails) return;
  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
        {forumDetails.title}
      </h1>
      <div className="bg-[#1a1a1a] text-gray-200 rounded-2xl p-6 leading-relaxed shadow-md border border-gray-800">
        {forumDetails.content?.split('\n').map((line, i) => (
          <p key={i} className="mb-3 last:mb-0">
            {line}
          </p>
        ))}
      </div>
      <div className='w-full flex flex-row justify-between items-center  mt-3'>
        <h1 className='font-semibold flex flex-nowrap gap-2 pl-2'>{forumDetails.interaction_counter?.like_count} <Cookie /> Received</h1>
        {/* Interactions */}
        {forumDetails.interaction_counter && (
          <div className="flex flex-wrap items-center gap-6text-sm text-gray-400">
            <Interaction
              liked={iLiked}
              handleOpenMore={() => { }}
              isMoreOpen={false}
              onClick={handleInteractionPressed}
              counters={forumDetails.interaction_counter}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ContentSection