import { obtenerProductos } from "@/lib/productos"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urlBase = process.env.NEXT_PUBLIC_SITE_URL || "https://psico01clothing.com.ar"

  // Rutas estáticas
  const rutasEstaticas = ["", "/productos", "/nosotros", "/contacto", "/carrito", "/checkout"].map(
    (ruta) => ({
      url: `${urlBase}${ruta}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: ruta === "" ? 1 : 0.8,
    }),
  )

  // Rutas dinámicas (productos)
  const resultado = await obtenerProductos()
  const rutasProductos = resultado.productos.map((producto) => ({
    url: `${urlBase}/productos/${producto.id}`,
    lastModified: new Date(producto.fechaActualizacion),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...rutasEstaticas, ...rutasProductos]
}

