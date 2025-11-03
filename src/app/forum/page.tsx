// app/forum/page.tsx (Server Component)
import { DiscussionService } from '@/services/discussion'
import { createClient } from '@/utils/supabase/server'
import ForumClient from './client'

export default async function Forum() {
  const supabase = await createClient()
  const discussionList = await DiscussionService.getAll(supabase)

  return <ForumClient  discussionList={discussionList} />

}
