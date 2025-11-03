'use client'

import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { useEffect, useState } from 'react'
import { ForumContentResponse } from '@/types'
import Interaction from '../contents/sections/thread/components/interactions'
import { InteractionsServices } from '@/services/interactions'
import axios from 'axios'
import { useAuth } from '@/context/auth-context'
import { ForumService } from '@/services/forum'
import { useRouter } from 'next/navigation'
import Loading from './loading'

const ForumItem = ({ id }: { id: string }) => {
  const { isAuthenticated } = useAuth();
  const [forumDetails, setForumDetails] = useState<ForumContentResponse | null>(null)
  const [iLiked, setILiked] = useState<boolean>(false)
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ForumService.getByForumId(Number(id));
      setForumDetails(response || null);
      if (response?.liked) setILiked(response.liked);
    } catch (error) {
      console.error(error);
      setForumDetails(null);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);


  if (loading) 
    return <Loading />
  
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

  const handleInteractionPressed = async (item: string) => {
    if (!isAuthenticated) {
      router.replace('?modal=login')
      return;
    }
    if (item === 'cookie') {

      setILiked(!iLiked)
      try {
        await InteractionsServices.cookie(forumDetails.forum_id)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {

          } else {
            console.error('API Error:', err)
          }
        } else {
          console.error('Unexpected Error:', err)
        }
      }
    }
  }


  return (
    <div className="w-full h-full max-w-7xl flex flex-col justify-start mx-auto py-10 px-4 font-montserrat text-gray-100">
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
      {forumDetails.interaction_counter && (
        <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-gray-400">
          <Interaction liked={iLiked} handleOpenMore={() => { }} isMoreOpen={false} onClick={handleInteractionPressed} counters={forumDetails.interaction_counter} />
        </div>
      )}
    </div>
  )
}

export default ForumItem;