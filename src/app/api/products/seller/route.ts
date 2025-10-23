import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url);
  const sellerId = Number(searchParams.get("sellerId"));

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      vehicle_type,
      classification,
      brand,
      model,
      year,
      price,
      mileage,
      image_name,
      financing_option,
      downpayment,
      seller_id,
      created_at
    `)
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
