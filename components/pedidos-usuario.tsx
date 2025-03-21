"use client"

import { useState } from "react"
import Link from "next/link"
import { formatearFecha, formatearPrecio } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

interface PedidosUsuarioProps {
  pedidos: any[]
}

export default function PedidosUsuario({ pedidos }: PedidosUsuarioProps) {
  const [filtro, setFiltro] = useState("todos")

  const pedidosFiltrados = filtro === "todos" ? pedidos : pedidos.filter((pedido) => pedido.estado === filtro)

  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "bg-yellow-500 text-black"
      case "procesando":
        return "bg-blue-500 text-white"
      case "enviado":
        return "bg-[#39FF14] text-black"
      case "entregado":
        return "bg-green-500 text-white"
      case "cancelado":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Mis Pedidos</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={filtro === "todos" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltro("todos")}
          className={filtro === "todos" ? "bg-[#39FF14] text-black" : "border-zinc-700"}
        >
          Todos
        </Button>
        <Button
          variant={filtro === "pendiente" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltro("pendiente")}
          className={filtro === "pendiente" ? "bg-yellow-500 text-black" : "border-zinc-700"}
        >
          Pendientes
        </Button>
        <Button
          variant={filtro === "procesando" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltro("procesando")}
          className={filtro === "procesando" ? "bg-blue-500 text-white" : "border-zinc-700"}
        >
          En Proceso
        </Button>
        <Button
          variant={filtro === "enviado" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltro("enviado")}
          className={filtro === "enviado" ? "bg-[#39FF14] text-black" : "border-zinc-700"}
        >
          Enviados
        </Button>
        <Button
          variant={filtro === "entregado" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltro("entregado")}
          className={filtro === "entregado" ? "bg-green-500 text-white" : "border-zinc-700"}
        >
          Entregados
        </Button>
        <Button
          variant={filtro === "cancelado" ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltro("cancelado")}
          className={filtro === "cancelado" ? "bg-red-500 text-white" : "border-zinc-700"}
        >
          Cancelados
        </Button>
      </div>

      {pedidosFiltrados.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No tienes pedidos {filtro !== "todos" ? `con estado "${filtro}"` : ""}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidosFiltrados.map((pedido) => (
            <div key={pedido.id} className="border border-zinc-800 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <p className="text-sm text-gray-400">Pedido #{pedido.id}</p>
                  <p className="text-sm text-gray-400">{formatearFecha(new Date(pedido.fecha_creacion))}</p>
                </div>
                <Badge className={getBadgeVariant(pedido.estado)}>
                  {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                </Badge>
              </div>

              <div className="mb-4">
                <p className="font-bold">Productos: {pedido.items.length}</p>
                <p className="font-mono text-[#39FF14]">{formatearPrecio(pedido.total)}</p>
              </div>

              <Button asChild variant="outline" size="sm" className="border-zinc-700">
                <Link href={`/cuenta/pedidos/${pedido.id}`}>
                  <Eye size={16} className="mr-2" />
                  Ver Detalles
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

