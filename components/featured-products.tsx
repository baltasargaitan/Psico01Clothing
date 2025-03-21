"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProductCard from "@/components/product-card"
import { useMobile } from "@/hooks/use-mobile"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import type { Product } from "@/types/product"
import { getFeaturedProducts } from "@/lib/products"

// Categories for filtering
const categories = ["All", "Hoodies", "T-Shirts", "Pants", "Outerwear", "Accessories", "Skate"]

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const isMobile = useMobile()

  useEffect(() => {
    async function loadProducts() {
      try {
        const featuredProducts = await getFeaturedProducts()
        setProducts(featuredProducts)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {Array(8)
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
      {/* Category filters - scrollable on mobile */}
      {isMobile ? (
        <ScrollArea className="w-full mb-8 pb-2">
          <div className="flex space-x-2 w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-3 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-[#39FF14] text-black"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category ? "bg-[#39FF14] text-black" : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Products grid - 2 columns on mobile, 4 on desktop */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images[0]}
              category={product.category}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-400">No products found in this category.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

