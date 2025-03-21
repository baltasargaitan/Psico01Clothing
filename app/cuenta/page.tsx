import type { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TextoGlitch from "@/components/texto-glitch"
import { supabase } from "@/lib/supabase"
import DatosCuenta from "@/components/datos-cuenta"
import PedidosUsuario from "@/components/pedidos-usuario"
import DireccionesUsuario from "@/components/direcciones-usuario"

export const metadata: Metadata = {
  title: "Mi Cuenta | PSICO01CLOTHING",
  description: "Gestiona tu cuenta, pedidos y preferencias.",
}

export default async function PaginaCuenta() {
  const session = await getServerSession()

  if (!session?.user) {
    redirect("/iniciar-sesion")
  }

  // Obtener datos del usuario desde Supabase
  const { data: usuario } = await supabase.from("usuarios").select("*").eq("id", session.user.id).single()

  // Obtener pedidos del usuario
  const { data: pedidos } = await supabase
    .from("pedidos")
    .select("*")
    .eq("usuario_id", session.user.id)
    .order("fecha_creacion", { ascending: false })

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <TextoGlitch text="MI CUENTA" />
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Gestiona tu cuenta, pedidos y preferencias.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="datos" className="w-full">
            <TabsList className="w-full bg-zinc-900 h-14 mb-8">
              <TabsTrigger value="datos" className="flex-1 h-full">
                Mis Datos
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex-1 h-full">
                Mis Pedidos
              </TabsTrigger>
              <TabsTrigger value="direcciones" className="flex-1 h-full">
                Mis Direcciones
              </TabsTrigger>
            </TabsList>

            <TabsContent value="datos" className="bg-zinc-900 rounded-lg p-6">
              <DatosCuenta usuario={usuario} />
            </TabsContent>

            <TabsContent value="pedidos" className="bg-zinc-900 rounded-lg p-6">
              <PedidosUsuario pedidos={pedidos || []} />
            </TabsContent>

            <TabsContent value="direcciones" className="bg-zinc-900 rounded-lg p-6">
              <DireccionesUsuario direcciones={usuario?.direcciones || []} usuarioId={session.user.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

