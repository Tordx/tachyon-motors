import { ForumService } from '@/services/forum';
import { createClient } from '@/utils/supabase/server';

export default async function ForumItem({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ await params first
  const supabase = await createClient();
    const res = await ForumService.getByForumId(supabase, Number(id));
  console.log(id)
  console.log(res)
  return (
    <div>
      <h1>Forum ID: {id}</h1>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </div>
  );
}
