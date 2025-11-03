import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const supabase = await createClient()
  
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Sign-in error:', error)
      return NextResponse.json({ status: false, message: error.message }, { status: 401 })
    }

    return NextResponse.json({ status: true, message: 'Login Success', user: data.user }, { status: 200 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ status: false,  message: 'Something went wrong'}, { status: 500 })
  }
}
