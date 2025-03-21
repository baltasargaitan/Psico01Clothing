"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

interface SeccionFiltro {
  titulo: string
  abierto: boolean
}

export default function FiltrosProductos() {
  const [rangoPrecio, setRangoPrecio] = useState([0, 20000])
  const [secciones, setSecciones] = useState<SeccionFiltro[]>([
    { titulo: "Categorías", abierto: true },
    { titulo: "Precio", abierto: true },
    { titulo: "Talla", abierto: false },
    { titulo: "Color", abierto: false },
  ])
  const esMobil = useMobile()

  const toggleSeccion = (index: number) => {
    setSecciones(secciones.map((seccion, i) => (i === index ? { ...seccion, abierto: !seccion.abierto } : seccion)))
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Filtros</h2>
        <Button variant="outline" size="sm" className="w-full h-10">
          Restablecer Todo
        </Button>
      </div>

      {/* Categorías */}
      <div className="mb-6 border-b border-zinc-800 pb-4">
        <div className="flex justify-between items-center mb-4 cursor-pointer py-2" onClick={() => toggleSeccion(0)}>
          <h3 className="font-semibold">Categorías</h3>
          {secciones[0].abierto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {secciones[0].abierto && (
          <div className="space-y-3">
            {["Sudaderas", "Camisetas", "Pantalones", "Abrigos", "Accesorios", "Calzado", "Skate"].map((categoria) => (
              <div key={categoria} className="flex items-center space-x-3">
                <Checkbox id={`categoria-${categoria}`} className="h-5 w-5" />
                <label htmlFor={`categoria-${categoria}`} className="text-sm text-gray-300 cursor-pointer">
                  {categoria}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rango de Precio */}
      <div className="mb-6 border-b border-zinc-800 pb-4">
        <div className="flex justify-between items-center mb-4 cursor-pointer py-2" onClick={() => toggleSeccion(1)}>
          <h3 className="font-semibold">Precio</h3>
          {secciones[1].abierto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {secciones[1].abierto && (
          <div>
            <Slider
              defaultValue={[0, 20000]}
              max={20000}
              step={100}
              value={rangoPrecio}
              onValueChange={setRangoPrecio}
              className="mb-4"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">${rangoPrecio[0]}</span>
              <span className="text-sm text-gray-300">${rangoPrecio[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Talla */}
      <div className="mb-6 border-b border-zinc-800 pb-4">
        <div className="flex justify-between items-center mb-4 cursor-pointer py-2" onClick={() => toggleSeccion(2)}>
          <h3 className="font-semibold">Talla</h3>
          {secciones[2].abierto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {secciones[2].abierto && (
          <div className="grid grid-cols-3 gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((talla) => (
              <div
                key={talla}
                className="border border-zinc-800 rounded text-center py-3 cursor-pointer hover:border-[#39FF14] hover:text-[#39FF14] transition-colors"
              >
                {talla}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Color */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer py-2" onClick={() => toggleSeccion(3)}>
          <h3 className="font-semibold">Color</h3>
          {secciones[3].abierto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {secciones[3].abierto && (
          <div className="flex flex-wrap gap-3">
            {[
              { nombre: "Negro", color: "bg-black" },
              { nombre: "Blanco", color: "bg-white" },
              { nombre: "Rojo", color: "bg-red-500" },
              { nombre: "Azul", color: "bg-blue-500" },
              { nombre: "Verde", color: "bg-green-500" },
              { nombre: "Gris", color: "bg-gray-500" },
            ].map((color) => (
              <div
                key={color.nombre}
                className="w-8 h-8 rounded-full cursor-pointer border border-zinc-700"
                style={{ backgroundColor: color.nombre.toLowerCase() }}
                title={color.nombre}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

