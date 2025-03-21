"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { MapPin, Edit, Trash, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"

interface DireccionUsuario {
  id: string
  nombre: string
  direccion: string
  ciudad: string
  codigoPostal: string
  provincia: string
  pais: string
  predeterminada: boolean
  telefono?: string
  instrucciones?: string
}

interface DireccionesUsuarioProps {
  direcciones: DireccionUsuario[]
  usuarioId: string
}

export default function DireccionesUsuario({ direcciones, usuarioId }: DireccionesUsuarioProps) {
  const [direccionesUsuario, setDireccionesUsuario] = useState<DireccionUsuario[]>(direcciones)
  const [direccionActual, setDireccionActual] = useState<DireccionUsuario | null>(null)
  const [cargando, setCargando] = useState(false)
  const { toast } = useToast()

  const nuevaDireccion = {
    id: `dir_${Date.now()}`,
    nombre: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    provincia: "",
    pais: "Argentina",
    predeterminada: direccionesUsuario.length === 0,
    telefono: "",
    instrucciones: "",
  }

  const handleEditarDireccion = (direccion: DireccionUsuario) => {
    setDireccionActual(direccion)
  }

  const handleNuevaDireccion = () => {
    setDireccionActual(nuevaDireccion)
  }

  const handleEliminarDireccion = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta dirección?")) return

    setCargando(true)

    try {
      const nuevasDirecciones = direccionesUsuario.filter((dir) => dir.id !== id)

      const { error } = await supabase.from("usuarios").update({ direcciones: nuevasDirecciones }).eq("id", usuarioId)

      if (error) throw error

      setDireccionesUsuario(nuevasDirecciones)

      toast({
        title: "Dirección eliminada",
        description: "La dirección ha sido eliminada correctamente.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al eliminar la dirección.",
        variant: "destructive",
      })
    } finally {
      setCargando(false)
    }
  }

  const handleGuardarDireccion = async (e: React.FormEvent, direccion: DireccionUsuario) => {
    e.preventDefault()
    setCargando(true)

    try {
      let nuevasDirecciones: DireccionUsuario[]

      // Si es predeterminada, quitar predeterminada de las demás
      if (direccion.predeterminada) {
        nuevasDirecciones = direccionesUsuario.map((dir) => ({
          ...dir,
          predeterminada: false,
        }))
      } else {
        nuevasDirecciones = [...direccionesUsuario]
      }

      // Si es una dirección existente, actualizarla
      const index = nuevasDirecciones.findIndex((dir) => dir.id === direccion.id)

      if (index >= 0) {
        nuevasDirecciones[index] = direccion
      } else {
        nuevasDirecciones.push(direccion)
      }

      const { error } = await supabase.from("usuarios").update({ direcciones: nuevasDirecciones }).eq("id", usuarioId)

      if (error) throw error

      setDireccionesUsuario(nuevasDirecciones)
      setDireccionActual(null)

      toast({
        title: "Dirección guardada",
        description: "La dirección ha sido guardada correctamente.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al guardar la dirección.",
        variant: "destructive",
      })
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Mis Direcciones</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleNuevaDireccion} className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black">
              <Plus size={16} className="mr-2" />
              Agregar Dirección
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <DialogTitle>
                {direccionActual?.id.startsWith("dir_") ? "Agregar Dirección" : "Editar Dirección"}
              </DialogTitle>
            </DialogHeader>

            {direccionActual && (
              <form onSubmit={(e) => handleGuardarDireccion(e, direccionActual)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre de la dirección</Label>
                  <Input
                    id="nombre"
                    placeholder="Ej: Casa, Trabajo, etc."
                    value={direccionActual.nombre}
                    onChange={(e) => setDireccionActual({ ...direccionActual, nombre: e.target.value })}
                    required
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    placeholder="Calle y número"
                    value={direccionActual.direccion}
                    onChange={(e) => setDireccionActual({ ...direccionActual, direccion: e.target.value })}
                    required
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ciudad">Ciudad</Label>
                    <Input
                      id="ciudad"
                      value={direccionActual.ciudad}
                      onChange={(e) => setDireccionActual({ ...direccionActual, ciudad: e.target.value })}
                      required
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="codigoPostal">Código Postal</Label>
                    <Input
                      id="codigoPostal"
                      value={direccionActual.codigoPostal}
                      onChange={(e) => setDireccionActual({ ...direccionActual, codigoPostal: e.target.value })}
                      required
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="provincia">Provincia</Label>
                    <Input
                      id="provincia"
                      value={direccionActual.provincia}
                      onChange={(e) => setDireccionActual({ ...direccionActual, provincia: e.target.value })}
                      required
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pais">País</Label>
                    <Input
                      id="pais"
                      value={direccionActual.pais}
                      onChange={(e) => setDireccionActual({ ...direccionActual, pais: e.target.value })}
                      required
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono de contacto</Label>
                  <Input
                    id="telefono"
                    value={direccionActual.telefono || ""}
                    onChange={(e) => setDireccionActual({ ...direccionActual, telefono: e.target.value })}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instrucciones">Instrucciones de entrega (opcional)</Label>
                  <Input
                    id="instrucciones"
                    value={direccionActual.instrucciones || ""}
                    onChange={(e) => setDireccionActual({ ...direccionActual, instrucciones: e.target.value })}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="predeterminada"
                    checked={direccionActual.predeterminada}
                    onChange={(e) => setDireccionActual({ ...direccionActual, predeterminada: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="predeterminada">Establecer como dirección predeterminada</Label>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="border-zinc-700">
                      Cancelar
                    </Button>
                  </DialogClose>

                  <Button type="submit" className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black" disabled={cargando}>
                    {cargando ? "Guardando..." : "Guardar Dirección"}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {direccionesUsuario.length === 0 ? (
        <div className="text-center py-8">
          <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400">No tienes direcciones guardadas</p>
          <p className="text-gray-400 text-sm mb-4">Agrega una dirección para agilizar el proceso de compra</p>
        </div>
      ) : (
        <div className="space-y-4">
          {direccionesUsuario.map((direccion) => (
            <div key={direccion.id} className="border border-zinc-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{direccion.nombre}</h3>
                  {direccion.predeterminada && <span className="text-xs text-[#39FF14]">Dirección predeterminada</span>}
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-zinc-700"
                        onClick={() => handleEditarDireccion(direccion)}
                      >
                        <Edit size={16} />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-zinc-900 border-zinc-800">
                      <DialogHeader>
                        <DialogTitle>Editar Dirección</DialogTitle>
                      </DialogHeader>

                      {direccionActual && (
                        <form onSubmit={(e) => handleGuardarDireccion(e, direccionActual)} className="space-y-4">
                          {/* Mismo formulario que arriba */}
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-zinc-700 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500"
                    onClick={() => handleEliminarDireccion(direccion.id)}
                    disabled={cargando}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </div>

              <div className="text-sm text-gray-400">
                <p>{direccion.direccion}</p>
                <p>
                  {direccion.codigoPostal}, {direccion.ciudad}
                </p>
                <p>
                  {direccion.provincia}, {direccion.pais}
                </p>
                {direccion.telefono && <p>Tel: {direccion.telefono}</p>}
                {direccion.instrucciones && <p className="mt-2 italic">Instrucciones: {direccion.instrucciones}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

