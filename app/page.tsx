import Link from "next/link"
import { ArrowRight, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import TextoGlitch from "@/components/texto-glitch"
import SeccionHero from "@/components/seccion-hero"
import ProductosDestacados from "@/components/productos-destacados"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <SeccionHero />

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            <TextoGlitch text="DISTORSIÓN DIGITAL" />
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Nuestra ropa no es solo moda—es un glitch en el sistema, un hack visual para el rebelde moderno.
          </p>
        </div>

        <ProductosDestacados />

        <div className="mt-12 text-center">
          <Button asChild className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black">
            <Link href="/productos" className="flex items-center gap-2">
              Ver Todos los Productos <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-zinc-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <TextoGlitch text="POR QUÉ ELEGIRNOS" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black p-6 rounded-lg border border-zinc-800 hover:border-[#39FF14] transition-all">
              <div className="mb-4 text-[#39FF14]">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Calidad Digital</h3>
              <p className="text-gray-400">Materiales premium y artesanía diseñada para romper con lo convencional.</p>
            </div>

            <div className="bg-black p-6 rounded-lg border border-zinc-800 hover:border-[#39FF14] transition-all">
              <div className="mb-4 text-[#39FF14]">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Transacciones Seguras</h3>
              <p className="text-gray-400">Múltiples opciones de pago con protección encriptada para tus datos.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#39FF14]/20 to-black p-8 rounded-lg border border-zinc-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Únete al Movimiento</h2>
              <p className="text-gray-400">Suscríbete para recibir lanzamientos exclusivos y experiencias digitales.</p>
            </div>

            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="bg-black border border-zinc-800 rounded-l-md px-4 py-2 w-full md:w-auto focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
              />
              <Button className="rounded-l-none bg-[#39FF14] hover:bg-[#39FF14]/90 text-black">Suscribirse</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

