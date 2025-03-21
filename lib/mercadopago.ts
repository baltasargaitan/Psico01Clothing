// Integración con MercadoPago para procesamiento de pagos
// Debes instalar: npm install mercadopago

import mercadopago from "mercadopago"
import type { Producto } from "@/tipos/producto"
import type { DatosPedido } from "@/tipos/pedido"

// Inicializar MercadoPago con tu token de acceso
export function inicializarMercadoPago() {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN

  if (!accessToken) {
    console.error("⚠️ La variable de entorno MERCADO_PAGO_ACCESS_TOKEN no está configurada")
    throw new Error("Configuración de MercadoPago incompleta")
  }

  mercadopago.configure({
    access_token: accessToken,
  })

  return mercadopago
}

// Crear preferencia de pago para checkout
export async function crearPreferenciaPago(
  productos: Array<{ producto: Producto; cantidad: number }>,
  cliente: DatosPedido["cliente"],
  idPedido: string,
) {
  try {
    const mp = inicializarMercadoPago()

    // Configurar items para MercadoPago
    const items = productos.map(({ producto, cantidad }) => ({
      id: producto.id,
      title: producto.nombre,
      description: producto.descripcion.substring(0, 256),
      unit_price: producto.precio,
      quantity: cantidad,
      currency_id: "ARS",
      picture_url: producto.imagenes[0],
    }))

    // Configurar datos del comprador
    const payer = {
      name: cliente.nombre,
      surname: cliente.apellido,
      email: cliente.email,
      phone: {
        area_code: cliente.telefono.substring(0, 3),
        number: cliente.telefono.substring(3),
      },
      address: {
        zip_code: cliente.codigoPostal,
        street_name: cliente.direccion,
        street_number: "0", // Requerido por MercadoPago
      },
    }

    // Configurar URLs de retorno
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    // Crear preferencia
    const preference = {
      items,
      payer,
      external_reference: idPedido,
      back_urls: {
        success: `${baseUrl}/checkout/exito`,
        failure: `${baseUrl}/checkout/fallo`,
        pending: `${baseUrl}/checkout/pendiente`,
      },
      auto_return: "approved",
      statement_descriptor: "PSICO01CLOTHING",
      expires: true,
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
    }

    const response = await mp.preferences.create(preference)
    return response.body
  } catch (error) {
    console.error("Error al crear preferencia de pago:", error)
    throw error
  }
}

// Verificar estado de un pago
export async function verificarPago(pagoId: string) {
  try {
    const mp = inicializarMercadoPago()
    const response = await mp.payment.get(pagoId)
    return response.body
  } catch (error) {
    console.error("Error al verificar pago:", error)
    throw error
  }
}

// Crear reembolso
export async function crearReembolso(pagoId: string) {
  try {
    const mp = inicializarMercadoPago()
    const response = await mp.refund.create({ payment_id: pagoId })
    return response.body
  } catch (error) {
    console.error("Error al crear reembolso:", error)
    throw error
  }
}

