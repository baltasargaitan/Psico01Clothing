"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function FormularioRegistro() {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const [cargando, setCargando] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    if (!aceptaTerminos) {
      toast({
        title: "Error",
        description: "Debes aceptar los términos y condiciones",
        variant: "destructive",
      })
      return
    }

    setCargando(true)

    try {
      // Registrar usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      if (authData.user) {
        // Crear perfil de usuario en la tabla usuarios
        const { error: profileError } = await supabase.from("usuarios").insert({
          id: authData.user.id,
          email,
          nombre,
          apellido,
          fecha_registro: new Date().toISOString(),
          direcciones: [],
          preferencias: {
            recibirEmails: true,
            temaOscuro: true,
          },
        })

        if (profileError) throw profileError

        toast({
          title: "¡Registro exitoso!",
          description: "Tu cuenta ha sido creada. Por favor, verifica tu correo electrónico.",
        })

        // Redirigir a la página de inicio de sesión
        router.push("/iniciar-sesion")
      }
    } catch (error: any) {
      console.error("Error al registrar usuario:", error)
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al crear tu cuenta. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setCargando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="bg-zinc-800 border-zinc-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apellido">Apellido</Label>
          <Input
            id="apellido"
            placeholder="Tu apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            className="bg-zinc-800 border-zinc-700"
          />
        </div>
      </div>

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
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="bg-zinc-800 border-zinc-700"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="bg-zinc-800 border-zinc-700"
        />
      </div>

      <div className="flex items-start space-x-2 pt-2">
        <Checkbox
          id="terms"
          checked={aceptaTerminos}
          onCheckedChange={(checked) => setAceptaTerminos(checked as boolean)}
        />
        <label
          htmlFor="terms"
          className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Acepto los{" "}
          <Link href="/terminos" className="text-[#39FF14] hover:underline">
            Términos y Condiciones
          </Link>{" "}
          y la{" "}
          <Link href="/privacidad" className="text-[#39FF14] hover:underline">
            Política de Privacidad
          </Link>
        </label>
      </div>

      <Button type="submit" className="w-full bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-12" disabled={cargando}>
        {cargando ? "Creando cuenta..." : "Crear Cuenta"}
      </Button>
    </form>
  )
}

