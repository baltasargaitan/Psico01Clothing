import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import TextoGlitch from "@/components/texto-glitch"
import type { Metadata } from "next"
import { formatearFecha } from "@/lib/utils"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Pedido Confirmado | PSICO01CLOTHING",
  description: "Tu pedido ha sido realizado con éxito.",
}

export default function PaginaExitoCheckout() {
  // En una app real, obtendrías los detalles del pedido desde la base de datos
  const numeroPedido = `PED-${Math.floor(Math.random() * 10000)}`
  const fechaEntregaEstimada = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)

  return (
    <Suspense>
      <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#39FF14]/20 mb-6">
            <CheckCircle size={40} className="text-[#39FF14]" />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            <TextoGlitch text="PEDIDO CONFIRMADO" />
          </h1>

          <p className="text-gray-400 mb-6">
            ¡Gracias por tu compra! Tu pedido ha sido realizado con éxito y está siendo procesado.
          </p>

          <div className="bg-zinc-900 rounded-lg p-6 mb-8">
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Número de Pedido:</span>
              <span className="font-mono">{numeroPedido}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Entrega Estimada:</span>
              <span>{formatearFecha(fechaEntregaEstimada)}</span>
            </div>
          </div>

          <p className="text-gray-400 mb-8">
            Hemos enviado un correo de confirmación a tu dirección de email con todos los detalles de tu pedido. También
            puedes seguir el estado de tu pedido en tu cuenta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black">
              <Link href="/cuenta/pedidos">Seguir Pedido</Link>
            </Button>

            <Button asChild variant="outline" className="border-zinc-800">
              <Link href="/productos">Continuar Comprando</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
    
    </Suspense>
    
  )
}

