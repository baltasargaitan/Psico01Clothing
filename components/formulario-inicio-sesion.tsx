"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function FormularioInicioSesion() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cargando, setCargando] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        toast({
          title: "Error al iniciar sesión",
          description: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "¡Inicio de sesión exitoso!",
          description: "Bienvenido de nuevo a PSICO01CLOTHING.",
        })
        router.push("/cuenta")
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setCargando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-zinc-800 border-zinc-700"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Contraseña</Label>
          <Link href="/recuperar-contrasena" className="text-xs text-[#39FF14] hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-zinc-800 border-zinc-700"
        />
      </div>

      <Button type="submit" className="w-full bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-12" disabled={cargando}>
        {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>
    </form>
  )
}

