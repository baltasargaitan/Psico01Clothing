export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      productos: {
        Row: {
          id: string
          nombre: string
          descripcion: string
          precio: number
          imagenes: string[]
          categoria: string
          tallas: string[]
          colores: string[]
          stock: number
          destacado: boolean
          fecha_creacion: string
          fecha_actualizacion: string
          slug: string | null
          etiquetas: string[] | null
          peso: number | null
          dimensiones: Json | null
          informacion_adicional: Json | null
          metadatos: Json | null
        }
        Insert: {
          id?: string
          nombre: string
          descripcion: string
          precio: number
          imagenes: string[]
          categoria: string
          tallas: string[]
          colores: string[]
          stock: number
          destacado?: boolean
          fecha_creacion?: string
          fecha_actualizacion?: string
          slug?: string | null
          etiquetas?: string[] | null
          peso?: number | null
          dimensiones?: Json | null
          informacion_adicional?: Json | null
          metadatos?: Json | null
        }
        Update: {
          id?: string
          nombre?: string
          descripcion?: string
          precio?: number
          imagenes?: string[]
          categoria?: string
          tallas?: string[]
          colores?: string[]
          stock?: number
          destacado?: boolean
          fecha_creacion?: string
          fecha_actualizacion?: string
          slug?: string | null
          etiquetas?: string[] | null
          peso?: number | null
          dimensiones?: Json | null
          informacion_adicional?: Json | null
          metadatos?: Json | null
        }
      }
      categorias: {
        Row: {
          id: string
          nombre: string
          descripcion: string | null
          imagen: string | null
          slug: string
          destacada: boolean
          fecha_creacion: string
          fecha_actualizacion: string
        }
        Insert: {
          id?: string
          nombre: string
          descripcion?: string | null
          imagen?: string | null
          slug: string
          destacada?: boolean
          fecha_creacion?: string
          fecha_actualizacion?: string
        }
        Update: {
          id?: string
          nombre?: string
          descripcion?: string | null
          imagen?: string | null
          slug?: string
          destacada?: boolean
          fecha_creacion?: string
          fecha_actualizacion?: string
        }
      }
      pedidos: {
        Row: {
          id: string
          usuario_id: string | null
          items: Json
          cliente: Json
          envio: Json
          pago: Json
          subtotal: number
          impuestos: number
          descuento: number
          total: number
          estado: string
          fecha_creacion: string
          fecha_actualizacion: string
          historial_estados: Json | null
          codigo_descuento: string | null
          metadatos: Json | null
        }
        Insert: {
          id?: string
          usuario_id?: string | null
          items: Json
          cliente: Json
          envio: Json
          pago: Json
          subtotal: number
          impuestos: number
          descuento: number
          total: number
          estado: string
          fecha_creacion?: string
          fecha_actualizacion?: string
          historial_estados?: Json | null
          codigo_descuento?: string | null
          metadatos?: Json | null
        }
        Update: {
          id?: string
          usuario_id?: string | null
          items?: Json
          cliente?: Json
          envio?: Json
          pago?: Json
          subtotal?: number
          impuestos?: number
          descuento?: number
          total?: number
          estado?: string
          fecha_creacion?: string
          fecha_actualizacion?: string
          historial_estados?: Json | null
          codigo_descuento?: string | null
          metadatos?: Json | null
        }
      }
      usuarios: {
        Row: {
          id: string
          email: string
          nombre: string | null
          apellido: string | null
          telefono: string | null
          direcciones: Json
          fecha_registro: string
          ultimo_acceso: string | null
          preferencias: Json
          metadatos: Json | null
        }
        Insert: {
          id: string
          email: string
          nombre?: string | null
          apellido?: string | null
          telefono?: string | null
          direcciones?: Json
          fecha_registro?: string
          ultimo_acceso?: string | null
          preferencias?: Json
          metadatos?: Json | null
        }
        Update: {
          id?: string
          email?: string
          nombre?: string | null
          apellido?: string | null
          telefono?: string | null
          direcciones?: Json
          fecha_registro?: string
          ultimo_acceso?: string | null
          preferencias?: Json
          metadatos?: Json | null
        }
      }
      descuentos: {
        Row: {
          id: string
          codigo: string
          tipo: string
          valor: number
          minimo_compra: number | null
          fecha_inicio: string
          fecha_fin: string | null
          usos_maximos: number | null
          usos_actuales: number
          activo: boolean
          productos_aplicables: string[] | null
          categorias_aplicables: string[] | null
          usuarios_aplicables: string[] | null
          fecha_creacion: string
          fecha_actualizacion: string
        }
        Insert: {
          id?: string
          codigo: string
          tipo: string
          valor: number
          minimo_compra?: number | null
          fecha_inicio: string
          fecha_fin?: string | null
          usos_maximos?: number | null
          usos_actuales?: number
          activo?: boolean
          productos_aplicables?: string[] | null
          categorias_aplicables?: string[] | null
          usuarios_aplicables?: string[] | null
          fecha_creacion?: string
          fecha_actualizacion?: string
        }
        Update: {
          id?: string
          codigo?: string
          tipo?: string
          valor?: number
          minimo_compra?: number | null
          fecha_inicio?: string
          fecha_fin?: string | null
          usos_maximos?: number | null
          usos_actuales?: number
          activo?: boolean
          productos_aplicables?: string[] | null
          categorias_aplicables?: string[] | null
          usuarios_aplicables?: string[] | null
          fecha_creacion?: string
          fecha_actualizacion?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

