import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import TextoGlitch from "@/components/texto-glitch"
import { formatearPrecio } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tu Carrito | PSICO01CLOTHING",
  description: "Revisa tus artículos antes de proceder al pago.",
}

// Datos de carrito de ejemplo - en una app real, esto vendría de una base de datos o gestión de estado
const itemsCarrito = [
  {
    id: "1",
    nombre: "Sudadera Glitch",
    precio: 8999,
    imagen: "/placeholder.svg?height=200&width=200",
    cantidad: 1,
    talla: "L",
    color: "Negro",
  },
  {
    id: "3",
    nombre: "Gorra Digital",
    precio: 2999,
    imagen: "/placeholder.svg?height=200&width=200",
    cantidad: 2,
    talla: "Talla Única",
    color: "Verde Neón",
  },
]

export default function PaginaCarrito() {
  const subtotal = itemsCarrito.reduce((total, item) => total + item.precio * item.cantidad, 0)
  const envio = 499
  const total = subtotal + envio

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <TextoGlitch text="TU CARRITO" />
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Revisa tus artículos antes de proceder al pago.</p>
        </div>

        {itemsCarrito.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items del Carrito */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-zinc-800">
                  <h2 className="text-xl font-bold">Artículos en el Carrito ({itemsCarrito.length})</h2>
                </div>

                <div>
                  {itemsCarrito.map((item) => (
                    <div key={item.id} className="p-4 sm:p-6 border-b border-zinc-800 flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-24 h-24 relative rounded-md overflow-hidden shrink-0">
                        <Image
                          src={item.imagen || "/placeholder.svg"}
                          alt={item.nombre}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 96px"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-bold">{item.nombre}</h3>
                          <p className="font-mono text-[#39FF14]">{formatearPrecio(item.precio * item.cantidad)}</p>
                        </div>

                        <div className="text-sm text-gray-400 mb-4">
                          <p>Talla: {item.talla}</p>
                          <p>Color: {item.color}</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex border border-zinc-800 rounded-md">
                            <button className="px-3 py-2 text-sm font-bold min-w-[44px]">-</button>
                            <div className="px-3 py-2 border-l border-r border-zinc-800 text-sm min-w-[44px] text-center">
                              {item.cantidad}
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
                    href="/productos"
                    className="flex items-center justify-center text-gray-400 hover:text-[#39FF14] border border-zinc-800 rounded-md py-3 px-4"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Continuar Comprando
                  </Link>

                  <Button variant="outline" className="border-zinc-800 py-3">
                    Actualizar Carrito
                  </Button>
                </div>
              </div>
            </div>

            {/* Resumen del Pedido */}
            <div>
              <div className="bg-zinc-900 rounded-lg overflow-hidden sticky top-4">
                <div className="p-6 border-b border-zinc-800">
                  <h2 className="text-xl font-bold">Resumen del Pedido</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>{formatearPrecio(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Envío</span>
                    <span>{formatearPrecio(envio)}</span>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-[#39FF14] font-mono">{formatearPrecio(total)}</span>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-14 text-lg" asChild>
                      <Link href="/checkout">Proceder al Pago</Link>
                    </Button>
                  </div>

                  <div className="text-xs text-gray-400 text-center mt-4">
                    Impuestos calculados en el checkout. Costos de envío calculados según la ubicación de entrega.
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
            <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-400 mb-8">Parece que aún no has agregado ningún artículo a tu carrito.</p>
            <Button asChild className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-14 px-8">
              <Link href="/productos">Comenzar a Comprar</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

