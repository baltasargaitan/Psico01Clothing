import type { Metadata } from "next"
import FormularioInicioSesion from "@/components/formulario-inicio-sesion"
import TextoGlitch from "@/components/texto-glitch"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Iniciar Sesión | PSICO01CLOTHING",
  description: "Accede a tu cuenta para gestionar tus pedidos y preferencias.",
}

export default function PaginaInicioSesion() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center py-16">
      <div className="container max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-bold font-mono mb-6">
            PSICO<span className="text-[#39FF14]">01</span>
          </Link>
          <h1 className="text-3xl font-bold mb-4">
            <TextoGlitch text="INICIAR SESIÓN" />
          </h1>
          <p className="text-gray-400">Accede a tu cuenta para gestionar tus pedidos y preferencias.</p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6">
          <FormularioInicioSesion />

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link href="/registro" className="text-[#39FF14] hover:underline">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

