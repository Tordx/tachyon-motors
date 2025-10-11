
import React from 'react'
import { ForumService } from '@/services/forum';
import { createClient } from '@/utils/supabase/server'
import Thread from './contents/sections/thread/thread'
import { DiscussionService } from '@/services/discussion';
import DiscussionTab from './contents/sections/discussion/discussions-tab';

const Forum = async () => {
  const supabase = await createClient()
  const forum = await ForumService.getAllCurrent(supabase);
  const dicussionList = await DiscussionService.getAll(supabase)
  return (
    <div className='w-screen h-auto px-6 sm:px-12 flex flex-col-reverse md:flex-row justify-between items-start py-30'>
      <Thread item={forum} />
      <DiscussionTab item={dicussionList}  />
    </div>
  )
}

export default Forum