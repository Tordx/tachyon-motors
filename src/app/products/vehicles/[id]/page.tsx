import { Product, ProductService } from '@/services/products'
import ProductPageClient from './client'
import type { Metadata } from 'next'

// 🧠 1️⃣ Generate metadata dynamically based on the product
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params
  const product = await ProductService.getById(Number(id))
  const BUCKET_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

  if (!product) {
    return {
      title: 'Product Not Found | Tachyon',
      description: 'The product you’re looking for could not be found.',
    }
  }

  const title = `${product.brand} ${product.model} ${product.year} | ${product.vehicle_type}`
  const description =
    product.description?.slice(0, 150) ||
    `Buy this ${product.year} ${product.brand} ${product.model} for only ₱${product.price.toLocaleString()}.`
  const imageUrl = `${BUCKET_URL}/${product.image_name}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://tacyhon-motors.vercel.app/products/${id}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${product.brand} ${product.model}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const product_details = await ProductService.getById(Number(id))

  let suggested_products: (Product & { seller_name: string })[] | null = null

  if (product_details) {
    suggested_products = await ProductService.getAllByType(
      product_details.classification,
      product_details.id
    )
  }

  return <ProductPageClient product={product_details} suggested={suggested_products} />
}
