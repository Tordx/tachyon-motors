import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ forum_id: string }> }
) {
  const { forum_id } = await context.params
  const supabase = await createClient()
  const forumId = Number(forum_id)

  const { comment_id } = await request.json()

  if (!forumId || !comment_id) {
    return NextResponse.json(
      { error: 'Missing forum_id or comment_id' },
      { status: 400 }
    )
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json(
      { error: 'User not authenticated' },
      { status: 401 }
    )
  }

  const { error: deleteError } = await supabase
    .from('forum_comments')
    .delete()
    .eq('id', comment_id)
    .eq('user_id', user.id)

  if (deleteError) {
    console.error('Delete comment error:', deleteError)
    return NextResponse.json({ error: deleteError.message }, { status: 500 })
  }

  const { error: counterError } = await supabase.rpc(
    'decrement_comment_count',
    { forum_id_param: forumId }
  )

  if (counterError) {
    console.error('Decrement comment count error:', counterError)
    return NextResponse.json(
      { error: 'Comment deleted but counter update failed' },
      { status: 200 }
    )
  }

  return NextResponse.json(
    { status: true, message: 'Comment deleted successfully' },
    { status: 200 }
  )
}
