/* eslint-disable prefer-const */
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    const { forum_id } = await req.json()

    if (!forum_id) {
      return NextResponse.json({ error: 'Missing forum_id' }, { status: 400 })
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user_id = user.id

    let { data: icData, error: icError } = await supabase
      .from('interaction_counter')
      .select('*')
      .eq('forum_id', forum_id)
      .single()

    if (icError && icError.code !== 'PGRST116') throw icError

    if (!icData) {
      const { data: newIc, error: newIcError } = await supabase
        .from('interaction_counter')
        .insert({ forum_id })
        .select('*')
        .single()
      if (newIcError) throw newIcError
      icData = newIc
    }

    const ic_id = icData.id

    const { data: existingLike, error: existingError } = await supabase
      .from('interactions')
      .select('id')
      .eq('ic_id', ic_id)
      .eq('user_id', user_id)
      .eq('interaction_type', 1)
      .maybeSingle()

    if (existingError) throw existingError

    if (existingLike) {
      // 5️⃣ Unlike → decrement & delete
      const { error: decErr } = await supabase.rpc('decrement_like_count', { ic_id_param: ic_id })
      if (decErr) throw decErr

      const { error: delErr } = await supabase
        .from('interactions')
        .delete()
        .eq('id', existingLike.id)

      if (delErr) throw delErr

      // fetch updated count
      const { data: updatedIC } = await supabase
        .from('interaction_counter')
        .select('like_count')
        .eq('id', ic_id)
        .single()

      return NextResponse.json({
        message: 'Unliked successfully',
        liked: false,
        like_count: updatedIC?.like_count ?? 0,
      })
    } else {
      // 6️⃣ Like → increment & insert
      const { error: incErr } = await supabase.rpc('increment_like_count', { ic_id_param: ic_id })
      if (incErr) throw incErr

      const { error: insErr } = await supabase
        .from('interactions')
        .insert({
          ic_id,
          interaction_type: 1,
          user_id,
          data: 'liked',
        })

      if (insErr) throw insErr

      const { data: updatedIC } = await supabase
        .from('interaction_counter')
        .select('like_count')
        .eq('id', ic_id)
        .single()

      return NextResponse.json({
        message: 'Liked successfully',
        liked: true,
        like_count: updatedIC?.like_count ?? icData.like_count + 1,
      })
    }
  } catch (err) {
    console.error('❌ Like API Error:', err)
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
