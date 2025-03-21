"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProducts } from "@/lib/products"
import type { Product } from "@/types/product"

export default function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("latest")

  useEffect(() => {
    async function loadProducts() {
      try {
        const allProducts = await getProducts()
        setProducts(sortProducts(allProducts, sortBy))
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [sortBy])

  const sortProducts = (productsToSort: Product[], sortOption: string) => {
    const sortedProducts = [...productsToSort]

    switch (sortOption) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price)
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price)
      case "name-az":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
      case "latest":
      default:
        return sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setProducts(sortProducts(products, value))
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="bg-zinc-900 rounded-lg overflow-hidden">
              <div className="aspect-square bg-zinc-800 animate-pulse" />
              <div className="p-4">
                <div className="h-5 bg-zinc-800 rounded animate-pulse mb-2" />
                <div className="h-4 bg-zinc-800 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-400 text-sm">Showing {products.length} products</p>
        <Select defaultValue={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-800">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name-az">Name: A to Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.images[0]}
            category={product.category}
          />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <div className="flex">
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-l-md hover:bg-zinc-800 min-w-[44px] min-h-[44px]">
            Previous
          </button>
          <button className="px-4 py-2 bg-[#39FF14] text-black border border-[#39FF14] min-w-[44px] min-h-[44px]">
            1
          </button>
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 min-w-[44px] min-h-[44px]">
            2
          </button>
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 min-w-[44px] min-h-[44px]">
            3
          </button>
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-r-md hover:bg-zinc-800 min-w-[44px] min-h-[44px]">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

