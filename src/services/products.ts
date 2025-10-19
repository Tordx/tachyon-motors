import type { SupabaseClient } from '@supabase/supabase-js'

export type Product = {
  id: number
  name: string
  vehicle_type: string
  classification: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  image_name: string
  financing_option: 'cash' | 'finance' | 'both'
  downpayment: number
  created_at: string
  description?: string
}

export type Seller = {
  id: number
  name: string
  contact_number: string
  email: string
  address: string
}

export type ProductWithSeller = Product & {
  seller: Seller
}

export class ProductService {
  /**
   * Fetch all products with seller info
   */
  static async getAll(supabase: SupabaseClient): Promise<(Product & { seller_name: string })[]> {
  const { data, error } = await supabase
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
      sellers:seller_id (
        name
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (!data) return [];

  // Map the result to include seller_name directly
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((item: any) => ({
    ...item,
    seller_name: Array.isArray(item.sellers) ? item.sellers[0]?.name || null : item.sellers?.name || null,
  }));
}


  /**
   * Fetch product by ID
   */
  static async getById(
    supabase: SupabaseClient,
    id: number
  ): Promise<ProductWithSeller | null> {
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
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data) return null;

    type SupabaseResponse = Product & { sellers: Seller | Seller[] };
    const productData = data as unknown as SupabaseResponse;

    const product: ProductWithSeller = {
      ...productData,
      seller: Array.isArray(productData.sellers)
        ? productData.sellers[0]
        : productData.sellers,
    };

    delete (product as unknown as { sellers?: unknown }).sellers;

    return product;
  }

static async getAllByType(
  supabase: SupabaseClient,
  classification: string,
  id: number,
  vehicle_type?: string,
  seller_id?: number
): Promise<(Product & { seller_name: string })[]> {
  // eslint-disable-next-line prefer-const
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
      sellers:seller_id (
        name
      )
    `)
    .not('id', 'eq', id)
    .eq('classification', classification)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Step 2: Fallback if no classification match
  if (!data || data.length === 0) {
    if (!vehicle_type) {
      const { data: currentProduct } = await supabase
        .from('products')
        .select('vehicle_type, seller_id')
        .eq('id', id)
        .single();

      vehicle_type = currentProduct?.vehicle_type;
      seller_id = currentProduct?.seller_id;
    }

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
        sellers:seller_id (
          name
        )
      `)
      .not('id', 'eq', id)
      .eq('vehicle_type', vehicle_type)
      .order('created_at', { ascending: false });

    if (fallbackError) throw fallbackError;
    data = fallbackData;
  }

  // Step 3: Prioritize items from the same seller_id
  if (seller_id) {
    data.sort((a, b) => {
      if (a.seller_id === seller_id && b.seller_id !== seller_id) return -1;
      if (a.seller_id !== seller_id && b.seller_id === seller_id) return 1;
      return 0;
    });
  }

  // Step 4: Map seller_name for easier access
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((item: any) => ({
    ...item,
    seller_name: Array.isArray(item.sellers)
      ? item.sellers[0]?.name || null
      : item.sellers?.name || null,
  }));
}




  /**
   * Fetch products by seller
   */
  static async getBySeller(
    supabase: SupabaseClient,
    sellerId: number
  ): Promise<Product[]> {
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

    if (error) throw error
    return data as Product[]
  }
}
