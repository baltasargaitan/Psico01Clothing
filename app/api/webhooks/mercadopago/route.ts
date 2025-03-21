import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { verificarPago } from "@/lib/mercadopago"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Verificar tipo de notificación
    if (body.type === "payment") {
      const pagoId = body.data.id

      // Verificar estado del pago
      const datosPago = await verificarPago(pagoId)

      if (datosPago.status === "approved") {
        // Actualizar estado del pedido en la base de datos
        const idPedido = datosPago.external_reference

        const { error } = await supabase
          .from("pedidos")
          .update({
            estado: "procesando",
            pago: {
              ...datosPago,
              estado: "aprobado",
              idTransaccion: pagoId,
              fechaPago: new Date().toISOString(),
            },
          })
          .eq("id", idPedido)

        if (error) {
          console.error("Error al actualizar pedido:", error)
          return NextResponse.json({ error: "Error al actualizar pedido" }, { status: 500 })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error en webhook de Mercado Pago:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

