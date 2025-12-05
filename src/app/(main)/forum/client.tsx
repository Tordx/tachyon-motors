// app/forum/forum-client.tsx
'use client'

import { useEffect, useState } from 'react'
import Thread from './contents/sections/thread/thread'
import DiscussionTab from './contents/sections/discussion/discussions-tab'
import { Discussion, ForumContent } from '@/types'
import MobileDiscussionLists from './contents/sections/discussion/mobile-discussions-list'
import { AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/auth-context'
import { InteractionsServices } from '@/services/interactions'
import axios from 'axios'
import { ForumService } from '@/services/forum'
import { ForumSkeleton } from './skeleton'
import { useRouter } from 'next/navigation'
import ShareAction from './contents/sections/thread/components/share-actions'

export default function ForumClient({ discussionList }: { discussionList: Discussion[] }) {
  const [mobileDiscussionOpen, setMobileDiscussionOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [forumId, setForumId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [forum, setForum] = useState<ForumContent[]>([]);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchForum = async () => {
      try {
        setLoading(true)
        const response = await ForumService.getAllCurrent();
        if (response) {
          setForum(response)
        }


      } catch { } finally {
        setLoading(false)
      }
    }

    fetchForum();
  }, [])

  const openMobileDiscussion = () => { setMobileDiscussionOpen(prev => !prev) }

  const handleInteractionPressed = async (item: string, id: number) => {

    if(item === 'share') {
      setShareOpen(!shareOpen);
      setForumId(id);
      return;
    }

    if (item === 'comments') {
      router.push(`forum/${id}`)
    }
    if (item === 'cookie') {
      if (!isAuthenticated) {
        router.replace('?modal=login')
        return;
      }
      try {

        await InteractionsServices.cookie(id)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          // Handle 401 separately
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
  const contentLoading = () => {
    if (loading) {
      return (<div className='w-full md:w-3/4'>
        {Array.from({ length: 5 }).map((_, index) => (
          <ForumSkeleton key={index} />
        ))}
      </div>); // <-- use your skeleton instead
    }

    if (forum.length > 0) {
      return <Thread onClick={handleInteractionPressed} item={forum} />;
    }

    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-gray-400 font-montserrat">
        <p>No forum content found.</p>
      </div>
    );
  }


  return (
    <div className="w-screen h-auto px-6 sm:px-12 flex flex-col-reverse md:flex-row justify-between items-start py-15 xl:py-30">
      {contentLoading()}
      <DiscussionTab
        item={discussionList}
        openMobileDiscussions={openMobileDiscussion}
      />
      <AnimatePresence mode="wait">
        {mobileDiscussionOpen && (
          <MobileDiscussionLists
            key="mobile-list"
            item={discussionList}
            onClick={openMobileDiscussion}
          />
        )}
      </AnimatePresence>
      <ShareAction forumId={forumId} shareUrl={window.location.href} onClose={() => setShareOpen(!shareOpen)} open={shareOpen} description='Choose a platform to share discussion' />

    </div>
  )
}
