import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import TextoGlitch from "@/components/texto-glitch"
import FormularioCheckout from "@/components/formulario-checkout"

export const metadata: Metadata = {
  title: "Checkout | PSICO01CLOTHING",
  description: "Completa tu compra de forma segura.",
}

export default function PaginaCheckout() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-6">
          <Link href="/carrito" className="flex items-center text-gray-400 hover:text-[#39FF14]">
            <ArrowLeft size={16} className="mr-2" />
            Volver al Carrito
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <TextoGlitch text="CHECKOUT" />
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Completa tu pedido de forma segura.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FormularioCheckout />
          </div>

          <div>
            <div className="bg-zinc-900 rounded-lg overflow-hidden sticky top-4">
              <div className="p-6 border-b border-zinc-800">
                <h2 className="text-xl font-bold">Resumen del Pedido</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>$11.997</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Envío</span>
                    <span>$499</span>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-[#39FF14] font-mono">$12.496</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-md">
                    <div>
                      <p className="font-bold">Sudadera Glitch</p>
                      <p className="text-sm text-gray-400">Negro, Talla L</p>
                    </div>
                    <p className="font-mono">$8.999</p>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-md">
                    <div>
                      <p className="font-bold">Gorra Digital</p>
                      <p className="text-sm text-gray-400">Verde Neón, Talla Única</p>
                      <p className="text-sm text-gray-400">Cant: 2</p>
                    </div>
                    <p className="font-mono">$2.998</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

