export interface Producto {
  id: string
  nombre: string
  descripcion: string
  precio: number
  imagenes: string[]
  categoria: string
  tallas: string[]
  colores: string[]
  stock: number
  destacado?: boolean
  fechaCreacion: Date
  fechaActualizacion: Date
  slug?: string
  etiquetas?: string[]
  peso?: number
  dimensiones?: {
    alto: number
    ancho: number
    profundidad: number
  }
  informacionAdicional?: Record<string, string>
  metadatos?: Record<string, any>
}

export interface ItemCarrito {
  producto: Producto
  cantidad: number
  talla?: string
  color?: string
  precioUnitario: number
  subtotal: number
}

export interface Carrito {
  items: ItemCarrito[]
  subtotal: number
  impuestos: number
  envio: number
  descuento: number
  total: number
  codigoDescuento?: string
}

export interface Categoria {
  id: string
  nombre: string
  descripcion?: string
  imagen?: string
  slug: string
  productosCount?: number
  destacada?: boolean
}

export interface FiltrosProducto {
  categoria?: string
  precioMin?: number
  precioMax?: number
  tallas?: string[]
  colores?: string[]
  ordenarPor?: "precio_asc" | "precio_desc" | "nombre_asc" | "nombre_desc" | "recientes"
  busqueda?: string
  pagina?: number
  porPagina?: number
}

export interface ResultadoProductos {
  productos: Producto[]
  total: number
  pagina: number
  totalPaginas: number
}

