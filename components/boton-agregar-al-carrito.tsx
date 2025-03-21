"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { Producto } from "@/tipos/producto"

interface BotonAgregarAlCarritoProps {
  producto: Producto
  children: React.ReactNode
  className?: string
}

export default function BotonAgregarAlCarrito({ producto, children, className }: BotonAgregarAlCarritoProps) {
  const [agregando, setAgregando] = useState(false)
  const { toast } = useToast()

  const handleAgregarAlCarrito = async () => {
    setAgregando(true)

    try {
      // En una implementación real, agregarías el producto al carrito
      // Esto podría ser un estado local, contexto o llamada a API

      // Simular un retraso para la llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Agregado al carrito",
        description: `${producto.nombre} ha sido agregado a tu carrito.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar el producto al carrito. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setAgregando(false)
    }
  }

  return (
    <Button className={className} onClick={handleAgregarAlCarrito} disabled={agregando}>
      {agregando ? "Agregando..." : children}
    </Button>
  )
}

