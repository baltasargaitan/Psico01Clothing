export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  stock: number
  featured?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  product: Product
  quantity: number
  size?: string
  color?: string
}

export interface Order {
  id: string
  items: CartItem[]
  customer: {
    name: string
    email: string
    address: string
    city: string
    postalCode: string
    province: string
  }
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  paymentMethod: string
  shippingMethod: string
  createdAt: Date
}

