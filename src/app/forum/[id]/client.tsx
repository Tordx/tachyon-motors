'use client'

import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { FC } from 'react'
import { ForumContentResponse } from '@/types'

const ForumItem: FC<{ forumDetails: ForumContentResponse }> = ({ forumDetails }) => {
  if (!forumDetails) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-gray-400 font-montserrat">
        <p>No forum content found.</p>
      </div>
    )
  }

  const timeAgo = forumDetails.edited_at
    ? formatDistanceToNow(new Date(forumDetails.edited_at), { addSuffix: true })
    : null

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 font-montserrat text-gray-100">
      {/* Author Section */}
      <div className="flex items-center gap-3 mb-6">
        {forumDetails.user?.image_name ? (
          <Image
            src={forumDetails.user.image_name}
            alt={forumDetails.user.username}
            width={48}
            height={48}
            className="rounded-full object-cover border border-gray-700"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-semibold text-gray-300">
            {forumDetails.user?.username?.[0]?.toUpperCase() ?? '?'}
          </div>
        )}

        <div>
          <h2 className="font-semibold text-lg">{forumDetails.user?.username}</h2>
          <p className="text-sm text-gray-400">
            {timeAgo ? `Edited ${timeAgo}` : 'Recently edited'}
          </p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
        {forumDetails.title}
      </h1>

      {/* Content */}
      <div className="bg-[#1a1a1a] text-gray-200 rounded-2xl p-6 leading-relaxed shadow-md border border-gray-800">
        {forumDetails.content?.split('\n').map((line, i) => (
          <p key={i} className="mb-3 last:mb-0">
            {line}
          </p>
        ))}
      </div>

      {/* Interaction Counter */}
      {forumDetails.interaction_counter && (
        <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-gray-400">
          <span>👍 {forumDetails.interaction_counter.like_count}</span>
          <span>💬 {forumDetails.interaction_counter.comment_count}</span>
          <span>↗️ {forumDetails.interaction_counter.share_count}</span>
          <span>🚩 {forumDetails.interaction_counter.report_count}</span>
        </div>
      )}
    </div>
  )
}

export default ForumItem;