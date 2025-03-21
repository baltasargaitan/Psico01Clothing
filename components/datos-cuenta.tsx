"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { signOut } from "next-auth/react"

interface DatosCuentaProps {
  usuario: any
}

export default function DatosCuenta({ usuario }: DatosCuentaProps) {
  const [nombre, setNombre] = useState(usuario?.nombre || "")
  const [apellido, setApellido] = useState(usuario?.apellido || "")
  const [telefono, setTelefono] = useState(usuario?.telefono || "")
  const [recibirEmails, setRecibirEmails] = useState(usuario?.preferencias?.recibirEmails || false)
  const [cargando, setCargando] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)

    try {
      const { error } = await supabase
        .from("usuarios")
        .update({
          nombre,
          apellido,
          telefono,
          preferencias: {
            ...usuario?.preferencias,
            recibirEmails,
          },
          fecha_actualizacion: new Date().toISOString(),
        })
        .eq("id", usuario.id)

      if (error) throw error

      toast({
        title: "Datos actualizados",
        description: "Tus datos han sido actualizados correctamente.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al actualizar tus datos.",
        variant: "destructive",
      })
    } finally {
      setCargando(false)
    }
  }

  const handleCerrarSesion = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Mis Datos Personales</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={usuario?.email} disabled className="bg-zinc-800 border-zinc-700 opacity-70" />
          <p className="text-xs text-gray-400">El email no se puede modificar.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="bg-zinc-800 border-zinc-700"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="recibirEmails" checked={recibirEmails} onCheckedChange={setRecibirEmails} />
          <Label htmlFor="recibirEmails">Recibir emails con ofertas y novedades</Label>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button type="submit" className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black" disabled={cargando}>
            {cargando ? "Guardando..." : "Guardar Cambios"}
          </Button>

          <Button type="button" variant="outline" className="border-zinc-700" onClick={handleCerrarSesion}>
            Cerrar Sesión
          </Button>
        </div>
      </form>

      <div className="mt-12 pt-6 border-t border-zinc-800">
        <h3 className="text-lg font-bold mb-4">Cambiar Contraseña</h3>
        <Button variant="outline" className="border-zinc-700">
          Solicitar Cambio de Contraseña
        </Button>
      </div>
    </div>
  )
}

