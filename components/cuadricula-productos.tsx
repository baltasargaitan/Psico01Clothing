"use client"

import { useState, useEffect } from "react"
import TarjetaProducto from "@/components/tarjeta-producto"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { obtenerProductos } from "@/lib/productos"
import type { Producto } from "@/tipos/producto"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function CuadriculaProductos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [ordenarPor, setOrdenarPor] = useState("recientes")
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [totalProductos, setTotalProductos] = useState(0)

  useEffect(() => {
    async function cargarProductos() {
      try {
        const resultado = await obtenerProductos({
          ordenarPor: ordenarPor as any,
          pagina: paginaActual,
          porPagina: 12,
        })

        setProductos(resultado.productos)
        setTotalPaginas(resultado.totalPaginas)
        setTotalProductos(resultado.total)
      } catch (error) {
        console.error("Error al cargar productos:", error)
      } finally {
        setCargando(false)
      }
    }

    cargarProductos()
  }, [ordenarPor, paginaActual])

  const cambiarOrden = (valor: string) => {
    setOrdenarPor(valor)
    setPaginaActual(1) // Volver a la primera página al cambiar el orden
  }

  const cambiarPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (cargando) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        {Array(6)
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
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-400 text-sm">
          Mostrando {productos.length} de {totalProductos} productos
        </p>
        <Select defaultValue={ordenarPor} onValueChange={cambiarOrden}>
          <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-800">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recientes">Más recientes</SelectItem>
            <SelectItem value="precio_asc">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="precio_desc">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="nombre_asc">Nombre: A a Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              id={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              imagen={producto.imagenes[0]}
              categoria={producto.categoria}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-400">No se encontraron productos.</p>
          </div>
        )}
      </div>

      {totalPaginas > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  className={paginaActual === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                <PaginationItem key={pagina}>
                  <PaginationLink
                    onClick={() => cambiarPagina(pagina)}
                    isActive={paginaActual === pagina}
                    className={paginaActual === pagina ? "bg-[#39FF14] text-black" : ""}
                  >
                    {pagina}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  className={paginaActual === totalPaginas ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

