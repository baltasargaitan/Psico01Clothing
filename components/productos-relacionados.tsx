"use client"
import TarjetaProducto from "@/components/tarjeta-producto"
import type { Producto } from "@/tipos/producto"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useMobile } from "@/hooks/use-mobile"

interface ProductosRelacionadosProps {
  productos: Producto[]
}

export default function ProductosRelacionados({ productos }: ProductosRelacionadosProps) {
  const esMobil = useMobile()

  if (productos.length === 0) {
    return null
  }

  return (
    <div>
      {esMobil ? (
        <ScrollArea className="w-full pb-4">
          <div className="flex space-x-4 w-max">
            {productos.map((producto) => (
              <div key={producto.id} className="w-[200px]">
                <TarjetaProducto
                  id={producto.id}
                  nombre={producto.nombre}
                  precio={producto.precio}
                  imagen={producto.imagenes[0]}
                  categoria={producto.categoria}
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              id={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              imagen={producto.imagenes[0]}
              categoria={producto.categoria}
            />
          ))}
        </div>
      )}
    </div>
  )
}

