import { Product } from '@/services/products'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const supabase = await createClient()

  // Parse filters from query params
  const { searchParams } = new URL(req.url)

  const vehicleType = searchParams.get('vehicleType') || 'all'
  const financeType = searchParams.get('financeType') || 'all'
  const yearMin = Number(searchParams.get('yearRange[0]')) || 0
  const yearMax = Number(searchParams.get('yearRange[1]')) || 9999
  const priceMin = Number(searchParams.get('priceRange[0]')) || 0
  const priceMax = Number(searchParams.get('priceRange[1]')) || 999999999
  const searchValue = searchParams.get('searchValue') || ''

  // Build base query
  let query = supabase
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
      sellers:seller_id ( name )
    `)
    .order('created_at', { ascending: false })

  // Apply filters dynamically
  if (vehicleType !== 'all') query = query.eq('vehicle_type', vehicleType)
  if (financeType !== 'all') query = query.eq('financing_option', financeType)
  if (yearMin > 0) query = query.gte('year', yearMin)
  if (yearMax < 9999) query = query.lte('year', yearMax)
  if (priceMin > 0) query = query.gte('price', priceMin)
  if (priceMax < 999999999) query = query.lte('price', priceMax)
  if (searchValue)
    query = query.or(
      `name.ilike.%${searchValue}%,brand.ilike.%${searchValue}%,model.ilike.%${searchValue}%`
    )

  // Execute query
  const { data, error } = await query

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Map sellers
  const products = (data || []).map((item: Product & { sellers: { name: string }[] }) => ({
    ...item,
    seller_name: Array.isArray(item.sellers) && item.sellers.length > 0
      ? item.sellers[0].name
      : null,
  }))

  return NextResponse.json(products)
}
