import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {


  const supabase = await createClient()
  try {
    const { email, password, username } = await req.json()

    if (!email || !password || !username) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      console.error('Auth sign-up error:', signUpError)
      return NextResponse.json({ error: signUpError.message }, { status: 400 })
    }

    // 2️⃣ Extract the newly created user’s ID
    const authUser = signUpData?.user
    if (!authUser) {
      return NextResponse.json({ error: 'User not created' }, { status: 400 })
    }

    // 3️⃣ Insert additional data into your `public.users` table
    const { error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: authUser.id, // keep it consistent with Supabase auth
          username,
          email,
        },
      ])

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ status: false, message: insertError.message }, { status: 400 })
    }

    return NextResponse.json({ status: true, message: 'Sign-up successful', user: authUser }, { status: 201 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
