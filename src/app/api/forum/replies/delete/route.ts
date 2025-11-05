import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function DELETE(req: Request) {
  const supabase = await createClient()
  const { reply_id, forum_id } = await req.json()

  if (!reply_id || !forum_id) {
    return NextResponse.json(
      { error: 'Missing reply_id or forum_id' },
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

  // ✅ Delete only the user's own reply
  const { error: deleteError } = await supabase
    .from('forum_comment_replies')
    .delete()
    .eq('id', reply_id)
    .eq('user_id', user.id)

  if (deleteError) {
    console.error('Delete reply error:', deleteError)
    return NextResponse.json({ error: deleteError.message }, { status: 500 })
  }

  // ✅ Decrement comment_count in interaction_counter
  const { error: counterError } = await supabase.rpc('decrement_comment_count', { forum_id_param: forum_id })

  if (counterError) {
    console.error('Decrement comment count error:', counterError)
    return NextResponse.json(
      { error: 'Reply deleted but counter update failed' },
      { status: 200 }
    )
  }

  return NextResponse.json(
    { status: true, message: 'Reply deleted successfully' },
    { status: 200 }
  )
}
