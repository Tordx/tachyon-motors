import type { SupabaseClient } from '@supabase/supabase-js'

export type Product = {
  id: number
  name: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  image_name: string
  financing_option: 'cash' | 'finance' | 'both'
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
      price,
      mileage,
      image_name,
      financing_option,
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
      brand,
      model,
      description,
      year,
      price,
      mileage,
      image_name,
      financing_option,
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
        brand,
        model,
        year,
        price,
        mileage,
        image_name,
        financing_option,
        seller_id,
        created_at
      `)
      .eq('seller_id', sellerId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Product[]
  }
}
