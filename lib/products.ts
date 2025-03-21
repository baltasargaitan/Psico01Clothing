import type { Product } from "@/types/product"

// Mock products for development - replace with actual DB calls in production
const mockProducts: Product[] = Array(24)
  .fill(0)
  .map((_, i) => ({
    id: (i + 1).toString(),
    name: [
      "Glitch Hoodie",
      "Error Tee",
      "Digital Cap",
      "Neon Cargo Pants",
      "Static Jacket",
      "Hack Skate Deck",
      "System Beanie",
      "Void Backpack",
      "Glitch Sneakers",
      "Binary Socks",
      "Neon Bomber",
      "Psico Gloves",
    ][i % 12],
    description:
      "Embrace the digital rebellion with our signature design. Made from premium materials with a futuristic aesthetic, featuring hidden pockets and glitch effect prints that symbolize the distortion of reality.",
    price: Math.floor(Math.random() * 100) + 19.99,
    images: [`/placeholder.svg?height=500&width=500&text=Product${i + 1}`],
    category: [
      "Hoodies",
      "T-Shirts",
      "Accessories",
      "Pants",
      "Outerwear",
      "Skate",
      "Accessories",
      "Accessories",
      "Footwear",
      "Accessories",
      "Outerwear",
      "Accessories",
    ][i % 12],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Neon Green"],
    stock: Math.floor(Math.random() * 50) + 5,
    featured: i < 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

export async function getProducts(): Promise<Product[]> {
  // In production, use Supabase or your database of choice
  // const { data, error } = await supabase.from('products').select('*')
  // if (error) {
  //   console.error('Error fetching products:', error)
  //   return []
  // }
  // return data as Product[]

  // For now, return mock data
  return mockProducts
}

export async function getProductById(id: string): Promise<Product | null> {
  // In production, use Supabase or your database of choice
  // const { data, error } = await supabase
  //   .from('products')
  //   .select('*')
  //   .eq('id', id)
  //   .single()
  // if (error) {
  //   console.error(`Error fetching product ${id}:`, error)
  //   return null
  // }
  // return data as Product

  // For now, return mock data
  const product = mockProducts.find((p) => p.id === id)
  return product || null
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // In production, use Supabase or your database of choice
  // const { data, error } = await supabase
  //   .from('products')
  //   .select('*')
  //   .eq('category', category)
  // if (error) {
  //   console.error(`Error fetching products in category ${category}:`, error)
  //   return []
  // }
  // return data as Product

  // For now, filter mock data
  return mockProducts.filter((p) => p.category === category)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // In production, use Supabase or your database of choice
  // const { data, error } = await supabase
  //   .from('products')
  //   .select('*')
  //   .eq('featured', true)
  // if (error) {
  //   console.error('Error fetching featured products:', error)
  //   return []
  // }
  // return data as Product

  // For now, filter mock data
  return mockProducts.filter((p) => p.featured)
}

