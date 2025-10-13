// app/forum/forum-client.tsx
'use client'

import { useState } from 'react'
import Thread from './contents/sections/thread/thread'
import DiscussionTab from './contents/sections/discussion/discussions-tab'
import { Discussion, ForumContent } from '@/types'
import MobileDiscussionLists from './contents/sections/discussion/mobile-discussions-list'
import { AnimatePresence } from 'framer-motion'

export default function ForumClient({ forum, discussionList }: {forum: ForumContent[], discussionList: Discussion[]}) {
  const [mobileDiscussionOpen, setMobileDiscussionOpen] = useState(false)

  function openMobileDiscussion() {
    setMobileDiscussionOpen(prev => !prev)
  }

  return (
    <div className="w-screen h-auto px-6 sm:px-12 flex flex-col-reverse md:flex-row justify-between items-start py-15 xl:py-30">
      <Thread item={forum} />
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
    </div>
  )
}
