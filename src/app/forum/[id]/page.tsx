import { ForumService } from '@/services/forum';
import { createClient } from '@/utils/supabase/server';

export default async function ForumItem({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ await params first
  const supabase = await createClient();
  const forum_details = await ForumService.getByForumId(supabase, Number(id));
  return (
    <div>
      <h1>Forum ID: {id}</h1>
      <pre>{JSON.stringify(forum_details, null, 2)}</pre>
    </div>
  );
}
