import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      vehicle_type,
      classification,
      brand,
      model,
      description,
      year,
      price,
      mileage,
      image_name,
      financing_option,
      downpayment,
      created_at,
      sellers:seller_id (
        id,
        name,
        contact_number,
        email,
        address
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) return NextResponse.json(null)

  const product = {
    ...data,
    seller: Array.isArray(data.sellers) ? data.sellers[0] : data.sellers,
  }

  // No need to delete 'sellers' as it does not exist on ProductWithSeller

  return NextResponse.json(product)
}
