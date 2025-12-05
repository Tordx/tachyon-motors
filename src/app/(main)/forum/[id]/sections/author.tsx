/* eslint-disable @next/next/no-img-element */
import { ForumContentResponse } from '@/types'
import { formatDistanceToNow } from 'date-fns';
import React from 'react'

type Props = {
  forumDetails: ForumContentResponse | null
  bucket_url: string | undefined;
}

const AuthorSection = (props: Props) => {
  const { forumDetails, bucket_url } = props;
  if (!forumDetails) return;

  const timeAgo = forumDetails.edited_at
    ? formatDistanceToNow(new Date(forumDetails.edited_at), { addSuffix: true })
    : null

  return (
    <div className="flex items-center gap-3 mb-6">
      {forumDetails.user?.image_name ? (
        <img
          src={`${bucket_url}/${forumDetails.user.image_name}`}
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
          {timeAgo ? `${timeAgo}` : 'Recently edited'}
        </p>
      </div>
    </div>

  )
}

export default AuthorSection;