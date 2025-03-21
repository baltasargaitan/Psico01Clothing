"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import TarjetaProducto from "@/components/tarjeta-producto"
import { useMobile } from "@/hooks/use-mobile"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import type { Producto } from "@/tipos/producto"
import { obtenerProductosDestacados } from "@/lib/productos"

// Categorías para filtrado
const categorias = ["Todos", "Sudaderas", "Camisetas", "Pantalones", "Abrigos", "Accesorios", "Skate"]

export default function ProductosDestacados() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos")
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const esMobil = useMobile()

  useEffect(() => {
    async function cargarProductos() {
      try {
        const productosDestacados = await obtenerProductosDestacados()
        setProductos(productosDestacados)
      } catch (error) {
        console.error("Error al cargar productos:", error)
      } finally {
        setCargando(false)
      }
    }

    cargarProductos()
  }, [])

  const productosFiltrados =
    categoriaActiva === "Todos" ? productos : productos.filter((producto) => producto.categoria === categoriaActiva)

  if (cargando) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {Array(8)
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
      {/* Filtros de categoría - desplazable en móvil */}
      {esMobil ? (
        <ScrollArea className="w-full mb-8 pb-2">
          <div className="flex space-x-2 w-max">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaActiva(categoria)}
                className={`px-4 py-3 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  categoriaActiva === categoria
                    ? "bg-[#39FF14] text-black"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                categoriaActiva === categoria
                  ? "bg-[#39FF14] text-black"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      )}

      {/* Cuadrícula de productos - 2 columnas en móvil, 4 en escritorio */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
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
            <p className="text-gray-400">No se encontraron productos en esta categoría.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

