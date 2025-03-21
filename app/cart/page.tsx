import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlitchText from "@/components/glitch-text"
import { formatearPrecio } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Cart | PSICO01CLOTHING",
  description: "Review your items before proceeding to checkout.",
}

// Mock cart data - in a real app, this would come from a database or state management
const cartItems = [
  {
    id: "1",
    name: "Glitch Hoodie",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 1,
    size: "L",
    color: "Black",
  },
  {
    id: "3",
    name: "Digital Cap",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 2,
    size: "One Size",
    color: "Neon Green",
  },
]

export default function CartPage() {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 4.99
  const total = subtotal + shipping

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <GlitchText text="YOUR CART" />
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Review your items before proceeding to checkout.</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-zinc-800">
                  <h2 className="text-xl font-bold">Cart Items ({cartItems.length})</h2>
                </div>

                <div>
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 sm:p-6 border-b border-zinc-800 flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-24 h-24 relative rounded-md overflow-hidden shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 96px"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-bold">{item.name}</h3>
                          <p className="font-mono text-[#39FF14]">{formatearPrecio(item.price * item.quantity)}</p>
                        </div>

                        <div className="text-sm text-gray-400 mb-4">
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex border border-zinc-800 rounded-md">
                            <button className="px-3 py-2 text-sm font-bold min-w-[44px]">-</button>
                            <div className="px-3 py-2 border-l border-r border-zinc-800 text-sm min-w-[44px] text-center">
                              {item.quantity}
                            </div>
                            <button className="px-3 py-2 text-sm font-bold min-w-[44px]">+</button>
                          </div>

                          <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-4">
                  <Link
                    href="/products"
                    className="flex items-center justify-center text-gray-400 hover:text-[#39FF14] border border-zinc-800 rounded-md py-3 px-4"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Continue Shopping
                  </Link>

                  <Button variant="outline" className="border-zinc-800 py-3">
                    Update Cart
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-zinc-900 rounded-lg overflow-hidden sticky top-4">
                <div className="p-6 border-b border-zinc-800">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>{formatearPrecio(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span>{formatearPrecio(shipping)}</span>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-[#39FF14] font-mono">{formatearPrecio(total)}</span>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-14 text-lg" asChild>
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </div>

                  <div className="text-xs text-gray-400 text-center mt-4">
                    Taxes calculated at checkout. Shipping costs calculated based on delivery location.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-zinc-900 mb-6">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-14 px-8">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

