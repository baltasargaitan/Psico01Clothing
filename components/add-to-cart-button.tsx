"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/types/product"

interface AddToCartButtonProps {
  product: Product
  children: React.ReactNode
  className?: string
}

export default function AddToCartButton({ product, children, className }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = async () => {
    setIsAdding(true)

    try {
      // In a real implementation, you would add the product to the cart
      // This could be a local state, context, or API call

      // Simulate a delay for the API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not add product to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Button className={className} onClick={handleAddToCart} disabled={isAdding}>
      {isAdding ? "Adding..." : children}
    </Button>
  )
}

