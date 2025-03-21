"use client"

import { useState, useRef, useEffect } from "react"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ExperienciaAR() {
  const [camaraActiva, setCamaraActiva] = useState(false)
  const [modeloSeleccionado, setModeloSeleccionado] = useState<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Modelos 3D de ejemplo
  const modelos = [
    { id: 1, nombre: "Gorra Digital", url: "/modelos/gorra.glb", escala: 0.5 },
    { id: 2, nombre: "Sudadera Glitch", url: "/modelos/sudadera.glb", escala: 0.5 },
    { id: 3, nombre: "Zapatillas Glitch", url: "/modelos/zapatillas.glb", escala: 0.5 },
  ]

  useEffect(() => {
    if (camaraActiva && videoRef.current) {
      // Inicializar la cámara
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => {
          console.error("Error al acceder a la cámara:", err)
          setCamaraActiva(false)
        })

      return () => {
        // Limpiar al desmontar
        if (videoRef.current?.srcObject) {
          const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
          tracks.forEach((track) => track.stop())
        }
      }
    }
  }, [camaraActiva])

  // Función para simular la experiencia AR
  // En una implementación real, usarías bibliotecas como Three.js, AR.js o MediaPipe
  const simularAR = () => {
    if (!camaraActiva || !modeloSeleccionado) return

    // Aquí iría la lógica para renderizar el modelo 3D sobre el video
    // Por ahora, solo mostramos un mensaje
    alert(`Simulando AR con el modelo: ${modeloSeleccionado.nombre}`)
  }

  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden">
      <div className="aspect-video bg-black relative">
        {camaraActiva ? (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />

            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {modeloSeleccionado && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 p-3 rounded-md text-center">
                <p className="text-[#39FF14] mb-2">Probando: {modeloSeleccionado.nombre}</p>
                <Button size="sm" className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black" onClick={simularAR}>
                  Simular AR
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <Camera size={48} className="text-gray-400 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Experiencia de Prueba AR</h2>
            <p className="text-gray-400 text-center mb-6 max-w-md">
              Usa tu cámara para ver cómo se ven nuestros productos en ti con realidad aumentada.
            </p>
            <Button
              className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-14 px-6 text-base"
              onClick={() => setCamaraActiva(true)}
            >
              Iniciar Cámara
            </Button>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-bold mb-4">Selecciona un Producto para Probar</h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {modelos.map((modelo) => (
            <div
              key={modelo.id}
              className={`aspect-square bg-zinc-800 rounded-md flex items-center justify-center cursor-pointer hover:border hover:border-[#39FF14] transition-all ${
                modeloSeleccionado?.id === modelo.id ? "border-2 border-[#39FF14]" : ""
              }`}
              onClick={() => setModeloSeleccionado(modelo)}
            >
              <div className="text-center p-2">
                <div className="text-xs text-gray-400">{modelo.nombre}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

