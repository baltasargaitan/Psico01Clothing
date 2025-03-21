import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlitchText from "@/components/glitch-text"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order Confirmed | PSICO01CLOTHING",
  description: "Your order has been successfully placed.",
}

export default function CheckoutSuccessPage() {
  // In a real app, you would get the order details from the database
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000)}`

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#39FF14]/20 mb-6">
            <CheckCircle size={40} className="text-[#39FF14]" />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            <GlitchText text="ORDER CONFIRMED" />
          </h1>

          <p className="text-gray-400 mb-6">
            Thank you for your purchase! Your order has been successfully placed and is being processed.
          </p>

          <div className="bg-zinc-900 rounded-lg p-6 mb-8">
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Order Number:</span>
              <span className="font-mono">{orderNumber}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Estimated Delivery:</span>
              <span>
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <p className="text-gray-400 mb-8">
            We've sent a confirmation email to your email address with all the details of your order. You can also track
            your order status in your account.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black">
              <Link href="/account/orders">Track Order</Link>
            </Button>

            <Button asChild variant="outline" className="border-zinc-800">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

