// app/forum/page.tsx (Server Component)
import { ForumService } from '@/services/forum'
import { DiscussionService } from '@/services/discussion'
import { createClient } from '@/utils/supabase/server'
import ForumClient from './client'

export default async function Forum() {
  const supabase = await createClient()
  const forum = await ForumService.getAllCurrent(supabase)
  const discussionList = await DiscussionService.getAll(supabase)

  return <ForumClient forum={forum} discussionList={discussionList} />

}
