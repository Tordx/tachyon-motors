/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = await createClient();
  try {
    const { name, email, phone, message } = await req.json()

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('form_inquiries')
      .insert([{ name, email, phone, message }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { message: 'Form submitted successfully!', data },
      { status: 200 }
    )
  } catch (err: any) {
    console.error('Server error:', err)
    return NextResponse.json(
      { error: 'Something went wrong while submitting the form.' },
      { status: 500 }
    )
  }
}
