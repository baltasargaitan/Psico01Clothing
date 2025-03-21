"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { formatearPrecio } from "@/lib/utils"

interface TarjetaProductoProps {
  id: string
  nombre: string
  precio: number
  imagen: string
  categoria: string
}

export default function TarjetaProducto({ id, nombre, precio, imagen, categoria }: TarjetaProductoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { toast } = useToast()
  const esMobil = useMobile()

  const handleAgregarAlCarrito = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    toast({
      title: "Agregado al carrito",
      description: `${nombre} ha sido agregado a tu carrito.`,
    })
  }

  const handleVistaRapida = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Funcionalidad de vista rápida iría aquí
  }

  return (
    <Link href={`/productos/${id}`}>
      <motion.div
        className="group relative bg-zinc-900 rounded-lg overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={imagen || "/placeholder.svg"}
            alt={nombre}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority
          />

          {/* Etiqueta de categoría */}
          <div className="absolute top-3 left-3 bg-[#39FF14] px-2 py-1 text-xs font-semibold text-black rounded">
            {categoria}
          </div>

          {/* Acciones rápidas - siempre visibles en móvil */}
          <div
            className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-3 transition-opacity duration-300 ${
              esMobil ? "opacity-100" : isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button size="icon" variant="secondary" className="rounded-full w-12 h-12" onClick={handleVistaRapida}>
              <Eye size={20} />
            </Button>
            <Button
              size="icon"
              className="rounded-full bg-[#39FF14] hover:bg-[#39FF14]/90 text-black w-12 h-12"
              onClick={handleAgregarAlCarrito}
            >
              <ShoppingCart size={20} />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{nombre}</h3>
          <div className="flex justify-between items-center">
            <p className="text-[#39FF14] font-mono text-lg">{formatearPrecio(precio)}</p>
            <div className="text-xs text-gray-400">{Math.floor(Math.random() * 20) + 5} en stock</div>
          </div>
        </div>

        {/* Efecto glitch en hover */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-10" : "opacity-0"}`}
        >
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=50&width=50')] bg-repeat mix-blend-overlay"></div>
        </div>
      </motion.div>
    </Link>
  )
}

