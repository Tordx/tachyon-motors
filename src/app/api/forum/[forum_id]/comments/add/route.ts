import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(
  req: Request,
  context: { params: Promise<{ forum_id: string }> }
) {
  const { forum_id } = await context.params
  const supabase = await createClient()
  const forumId = Number(forum_id)
  const { content } = await req.json()

  if (!forumId || !content) {
    return NextResponse.json(
      { error: 'Missing forum_id or content' },
      { status: 400 }
    )
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
  }

  const { data: comment, error: insertError } = await supabase
    .from('forum_comments')
    .insert({
      forum_id: forumId,
      content,
      user_id: user.id,
    })
    .select()
    .single()

  if (insertError) {
    console.error('Comment insert error:', insertError)
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  const { error: rpcError } = await supabase.rpc('increment_interaction_count', {
    fid: forumId,
    counter: 'comment',
  })

  if (rpcError) {
    console.error('Interaction counter error:', rpcError)
  }

  return NextResponse.json(
    { status: true, message: 'Comment added', comment },
    { status: 200 }
  )
}
