import { Suspense } from "react"
import TextoGlitch from "@/components/texto-glitch"
import CuadriculaProductos from "@/components/cuadricula-productos"
import FiltrosProductos from "@/components/filtros-productos"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Productos | PSICO01CLOTHING",
  description:
    "Explora nuestra colección de ropa urbana experimental. Cada pieza está diseñada para el rebelde digital.",
}

export default function PaginaProductos() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <TextoGlitch text="PRODUCTOS" />
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explora nuestra colección de ropa urbana experimental. Cada pieza está diseñada para el rebelde digital.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Botón de Filtro Móvil */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <SlidersHorizontal size={18} />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-black border-r border-zinc-800 p-0">
                <div className="h-full overflow-auto py-6 px-4">
                  <FiltrosProductos />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Barra lateral de Escritorio */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FiltrosProductos />
          </aside>

          <div className="flex-1">
            <Suspense fallback={<EsqueletoCuadriculaProductos />}>
              <CuadriculaProductos />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

function EsqueletoCuadriculaProductos() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="bg-zinc-900 rounded-lg overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
    </div>
  )
}

