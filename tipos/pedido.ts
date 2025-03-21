import type { ItemCarrito } from "./producto"

export interface DatosPedido {
  id: string
  items: ItemCarrito[]
  cliente: {
    id?: string
    nombre: string
    apellido: string
    email: string
    telefono: string
    direccion: string
    ciudad: string
    codigoPostal: string
    provincia: string
    pais: string
    notas?: string
  }
  envio: {
    metodo: string
    costo: number
    direccionEnvio?: {
      direccion: string
      ciudad: string
      codigoPostal: string
      provincia: string
      pais: string
    }
    seguimiento?: {
      numero: string
      empresa: string
      url: string
    }
  }
  pago: {
    metodo: string
    estado: EstadoPago
    idTransaccion?: string
    fechaPago?: Date
    detalles?: Record<string, any>
  }
  subtotal: number
  impuestos: number
  descuento: number
  total: number
  estado: EstadoPedido
  fechaCreacion: Date
  fechaActualizacion: Date
  historialEstados?: Array<{
    estado: EstadoPedido
    fecha: Date
    notas?: string
  }>
  codigoDescuento?: string
  metadatos?: Record<string, any>
}

export type EstadoPedido = "pendiente" | "procesando" | "enviado" | "entregado" | "cancelado" | "reembolsado"

export type EstadoPago = "pendiente" | "aprobado" | "rechazado" | "reembolsado"

export interface ResumenPedido {
  id: string
  fechaCreacion: Date
  total: number
  estado: EstadoPedido
  estadoPago: EstadoPago
  cantidadItems: number
}

