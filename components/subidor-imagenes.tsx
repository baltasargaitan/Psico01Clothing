"use client"

import type React from "react"

import { useState } from "react"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { subirImagen } from "@/lib/cloudinary"
import { useToast } from "@/components/ui/use-toast"

interface SubidorImagenesProps {
  imagenes: string[]
  onImagenesActualizadas: (nuevasImagenes: string[]) => void
  multiple?: boolean
}

export default function SubidorImagenes({ imagenes, onImagenesActualizadas, multiple = true }: SubidorImagenesProps) {
  const [cargando, setCargando] = useState(false)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setCargando(true)

    try {
      const archivos = Array.from(e.target.files)
      const nuevasUrls: string[] = []

      for (const archivo of archivos) {
        if (!archivo.type.startsWith("image/")) {
          toast({
            title: "Tipo de archivo no válido",
            description: "Solo se permiten imágenes",
            variant: "destructive",
          })
          continue
        }

        const url = await subirImagen(archivo)
        nuevasUrls.push(url)
      }

      if (multiple) {
        onImagenesActualizadas([...imagenes, ...nuevasUrls])
      } else {
        onImagenesActualizadas([nuevasUrls[0]])
      }

      toast({
        title: "Imágenes subidas correctamente",
        description: `Se han subido ${nuevasUrls.length} imágenes`,
      })
    } catch (error) {
      console.error("Error al subir imágenes:", error)
      toast({
        title: "Error al subir imágenes",
        description: "Ocurrió un error al subir las imágenes. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setCargando(false)
      // Limpiar el input para permitir subir el mismo archivo nuevamente
      e.target.value = ""
    }
  }

  const eliminarImagen = (index: number) => {
    const nuevasImagenes = [...imagenes]
    nuevasImagenes.splice(index, 1)
    onImagenesActualizadas(nuevasImagenes)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {imagenes.map((imagen, index) => (
          <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-zinc-800">
            <Image src={imagen || "/placeholder.svg"} alt={`Imagen ${index + 1}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => eliminarImagen(index)}
              className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {(multiple || imagenes.length === 0) && (
          <label className="aspect-square flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-md hover:border-[#39FF14] transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple={multiple}
              className="sr-only"
              onChange={handleFileChange}
              disabled={cargando}
            />
            <ImagePlus size={24} className="mb-2 text-gray-400" />
            <span className="text-sm text-gray-400">{cargando ? "Subiendo..." : "Agregar imagen"}</span>
          </label>
        )}
      </div>
    </div>
  )
}

