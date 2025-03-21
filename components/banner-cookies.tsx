"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BannerCookies() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Verificar si el usuario ya aceptó las cookies
    const cookiesAceptadas = localStorage.getItem("cookiesAceptadas")
    if (!cookiesAceptadas) {
      setVisible(true)
    }
  }, [])

  const aceptarCookies = () => {
    localStorage.setItem("cookiesAceptadas", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-300">
            Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra{" "}
            <Link href="/privacidad" className="text-[#39FF14] hover:underline">
              Política de Privacidad
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-zinc-700" onClick={() => setVisible(false)}>
            Rechazar
          </Button>
          <Button size="sm" className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black" onClick={aceptarCookies}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  )
}

