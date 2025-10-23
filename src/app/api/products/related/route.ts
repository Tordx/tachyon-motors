/* eslint-disable prefer-const */
import { Product } from '@/services/products'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)

  const classification = searchParams.get('classification') || ''
  const id = Number(searchParams.get('id')) || 0
  let vehicle_type = null
  let seller_id = null

  let { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      brand,
      model,
      year,
      vehicle_type,
      classification,
      price,
      mileage,
      image_name,
      financing_option,
      downpayment,
      created_at,
      seller_id,
      sellers:seller_id ( name )
    `)
    .not('id', 'eq', id)
    .eq('classification', classification)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (!data || data.length === 0) {
    const { data: currentProduct } = await supabase
      .from('products')
      .select('vehicle_type, seller_id')
      .eq('id', id)
      .single()

    vehicle_type = vehicle_type || currentProduct?.vehicle_type
    seller_id = seller_id || currentProduct?.seller_id

    const { data: fallbackData, error: fallbackError } = await supabase
      .from('products')
      .select(`
        id,
        name,
        brand,
        model,
        year,
        vehicle_type,
        classification,
        price,
        mileage,
        image_name,
        financing_option,
        downpayment,
        created_at,
        seller_id,
        sellers:seller_id ( name )
      `)
      .not('id', 'eq', id)
      .eq('vehicle_type', vehicle_type)
      .order('created_at', { ascending: false })

    if (fallbackError)
      return NextResponse.json({ error: fallbackError.message }, { status: 500 })

    data = fallbackData
  }

  if (seller_id) {
    data.sort((a, b) => {
      if (a.seller_id === seller_id && b.seller_id !== seller_id) return -1
      if (a.seller_id !== seller_id && b.seller_id === seller_id) return 1
      return 0
    })
  }

  const result = (data || []).map((item: Product & { sellers: { name: string }[] | { name: string } }) => ({
    ...item,
    seller_name: Array.isArray(item.sellers)
      ? item.sellers[0]?.name || null
      : (item.sellers as { name: string })?.name || null,
  }))

  return NextResponse.json(result)
}
