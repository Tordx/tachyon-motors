import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { comment_id, content } = await req.json()

  if (!comment_id || !content) {
    return NextResponse.json(
      { error: 'Missing comment_id or content' },
      { status: 400 }
    )
  }

  // 🔐 Get authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
  }

  // 🧩 Step 1: Get forum_id from parent comment
  const { data: parentComment, error: fetchError } = await supabase
    .from('forum_comments')
    .select('forum_id')
    .eq('id', comment_id)
    .single()

  if (fetchError || !parentComment) {
    return NextResponse.json(
      { error: 'Parent comment not found' },
      { status: 404 }
    )
  }

  const forumId = parentComment.forum_id

  // 💬 Step 2: Insert the reply
  const { data: reply, error: insertError } = await supabase
    .from('forum_comment_replies')
    .insert({
      comment_id,
      content,
      user_id: user.id,
    })
    .select()
    .single()

  if (insertError) {
    console.error('Reply insert error:', insertError)
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  // 📈 Step 3: Increment the forum’s comment count
  const { error: rpcError } = await supabase.rpc('increment_interaction_count', {
    fid: forumId,
    counter: 'comment',
  })

  if (rpcError) {
    console.error('Interaction counter error:', rpcError)
    // Reply is still considered successful even if counter update fails
  }

  return NextResponse.json(
    { status: true, message: 'Reply added', reply },
    { status: 200 }
  )
}
