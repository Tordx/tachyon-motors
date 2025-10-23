import api from '@/lib/axios'
import { FilterProps } from '@/types'
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
  static async getAll(filters: FilterProps | null): Promise<(Product & { seller_name: string })[]> {
    const response = await api.get(`products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      params: filters || {}
    })
    const data = response.data as (Product & { seller_name: string; sellers?: Seller | Seller[] })[]
    return data.map((item: Product & { seller_name: string; sellers?: Seller | Seller[] }) => ({
      ...item,
      seller_name: Array.isArray(item.sellers) ? item.sellers[0]?.name || 'Unknown' : item.sellers?.name || 'Unknown',
    }))
  }


  /**
   * Fetch product by ID
   */
  static async getById(
    id: number
  ): Promise<ProductWithSeller | null> {
    const response = await api.get(`products/getById`, {
      params: {
        id
      }
    });
    const data = response.data as ProductWithSeller | null;
    return data || null;
  }

  static async getAllByType(
    classification: string,
    id?: number,
  ): Promise<(Product & { seller_name: string })[]> {
    const response = await api.get(`products/related`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      params: {
        classification,
        id,
      }
    });
    const data = response.data as (Product & { seller_name: string; })[];
    return data || [];
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
