import type { Metadata } from "next"
import FormularioRegistro from "@/components/formulario-registro"
import TextoGlitch from "@/components/texto-glitch"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Registro | PSICO01CLOTHING",
  description: "Crea una cuenta para comprar productos y acceder a experiencias exclusivas.",
}

export default function PaginaRegistro() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center py-16">
      <div className="container max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-bold font-mono mb-6">
            PSICO<span className="text-[#39FF14]">01</span>
          </Link>
          <h1 className="text-3xl font-bold mb-4">
            <TextoGlitch text="CREAR CUENTA" />
          </h1>
          <p className="text-gray-400">
            Únete a PSICO01CLOTHING para acceder a productos exclusivos y experiencias digitales.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6">
          <FormularioRegistro />

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/iniciar-sesion" className="text-[#39FF14] hover:underline">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

