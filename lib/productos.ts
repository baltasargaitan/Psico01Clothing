import type { Producto, FiltrosProducto, ResultadoProductos, Categoria } from "@/tipos/producto"

// Productos de ejemplo para desarrollo - reemplazar con llamadas reales a la BD en producción
const productosEjemplo: Producto[] = Array(24)
  .fill(0)
  .map((_, i) => ({
    id: (i + 1).toString(),
    nombre: [
      "Sudadera Glitch",
      "Camiseta Error",
      "Gorra Digital",
      "Pantalón Cargo Neón",
      "Chaqueta Estática",
      "Tabla Skate Hack",
      "Gorro Sistema",
      "Mochila Vacío",
      "Zapatillas Glitch",
      "Calcetines Binarios",
      "Bomber Neón",
      "Guantes Psico",
    ][i % 12],
    descripcion:
      "Abraza la rebelión digital con nuestro diseño característico. Fabricado con materiales premium con una estética futurista, presenta bolsillos ocultos y estampados con efecto glitch que simbolizan la distorsión de la realidad.",
    precio: Math.floor(Math.random() * 10000) + 1999,
    imagenes: [`/placeholder.svg?height=500&width=500&text=Producto${i + 1}`],
    categoria: [
      "Sudaderas",
      "Camisetas",
      "Accesorios",
      "Pantalones",
      "Abrigos",
      "Skate",
      "Accesorios",
      "Accesorios",
      "Calzado",
      "Accesorios",
      "Abrigos",
      "Accesorios",
    ][i % 12],
    tallas: ["XS", "S", "M", "L", "XL", "XXL"],
    colores: ["Negro", "Blanco", "Verde Neón"],
    stock: Math.floor(Math.random() * 50) + 5,
    destacado: i < 8,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
  }))

export async function obtenerProductos(filtros?: FiltrosProducto): Promise<ResultadoProductos> {
  try {
    // En producción, usar Supabase o tu base de datos elegida
    // let query = supabase.from('productos').select('*')

    // if (filtros?.categoria) {
    //   query = query.eq('categoria', filtros.categoria)
    // }

    // if (filtros?.precioMin !== undefined) {
    //   query = query.gte('precio', filtros.precioMin)
    // }

    // if (filtros?.precioMax !== undefined) {
    //   query = query.lte('precio', filtros.precioMax)
    // }

    // if (filtros?.tallas && filtros.tallas.length > 0) {
    //   query = query.overlaps('tallas', filtros.tallas)
    // }

    // if (filtros?.colores && filtros.colores.length > 0) {
    //   query = query.overlaps('colores', filtros.colores)
    // }

    // if (filtros?.busqueda) {
    //   query = query.ilike('nombre', `%${filtros.busqueda}%`)
    // }

    // // Paginación
    // const pagina = filtros?.pagina || 1
    // const porPagina = filtros?.porPagina || 12
    // const desde = (pagina - 1) * porPagina
    // const hasta = desde + porPagina - 1

    // // Ordenación
    // if (filtros?.ordenarPor) {
    //   switch (filtros.ordenarPor) {
    //     case 'precio_asc':
    //       query = query.order('precio', { ascending: true })
    //       break
    //     case 'precio_desc':
    //       query = query.order('precio', { ascending: false })
    //       break
    //     case 'nombre_asc':
    //       query = query.order('nombre', { ascending: true })
    //       break
    //     case 'nombre_desc':
    //       query = query.order('nombre', { ascending: false })
    //       break
    //     case 'recientes':
    //     default:
    //       query = query.order('fecha_creacion', { ascending: false })
    //       break
    //   }
    // } else {
    //   query = query.order('fecha_creacion', { ascending: false })
    // }

    // // Ejecutar consulta con paginación
    // const { data, error, count } = await query
    //   .range(desde, hasta)
    //   .count('exact')

    // if (error) {
    //   console.error('Error al obtener productos:', error)
    //   return { productos: [], total: 0, pagina, totalPaginas: 0 }
    // }

    // const totalPaginas = Math.ceil((count || 0) / porPagina)

    // return {
    //   productos: data as Producto[],
    //   total: count || 0,
    //   pagina,
    //   totalPaginas
    // }

    // Por ahora, filtrar datos de ejemplo
    let productosFiltrados = [...productosEjemplo]

    if (filtros?.categoria) {
      productosFiltrados = productosFiltrados.filter((p) => p.categoria === filtros.categoria)
    }

    if (filtros?.precioMin !== undefined) {
      productosFiltrados = productosFiltrados.filter((p) => p.precio >= filtros.precioMin!)
    }

    if (filtros?.precioMax !== undefined) {
      productosFiltrados = productosFiltrados.filter((p) => p.precio <= filtros.precioMax!)
    }

    if (filtros?.tallas && filtros.tallas.length > 0) {
      productosFiltrados = productosFiltrados.filter((p) => filtros.tallas!.some((talla) => p.tallas.includes(talla)))
    }

    if (filtros?.colores && filtros.colores.length > 0) {
      productosFiltrados = productosFiltrados.filter((p) => filtros.colores!.some((color) => p.colores.includes(color)))
    }

    if (filtros?.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase()
      productosFiltrados = productosFiltrados.filter(
        (p) => p.nombre.toLowerCase().includes(busqueda) || p.descripcion.toLowerCase().includes(busqueda),
      )
    }

    // Ordenación
    if (filtros?.ordenarPor) {
      switch (filtros.ordenarPor) {
        case "precio_asc":
          productosFiltrados.sort((a, b) => a.precio - b.precio)
          break
        case "precio_desc":
          productosFiltrados.sort((a, b) => b.precio - a.precio)
          break
        case "nombre_asc":
          productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre))
          break
        case "nombre_desc":
          productosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre))
          break
        case "recientes":
        default:
          productosFiltrados.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
          break
      }
    } else {
      productosFiltrados.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
    }

    // Paginación
    const pagina = filtros?.pagina || 1
    const porPagina = filtros?.porPagina || 12
    const total = productosFiltrados.length
    const totalPaginas = Math.ceil(total / porPagina)

    const desde = (pagina - 1) * porPagina
    const hasta = Math.min(desde + porPagina, total)

    return {
      productos: productosFiltrados.slice(desde, hasta),
      total,
      pagina,
      totalPaginas,
    }
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return { productos: [], total: 0, pagina: 1, totalPaginas: 0 }
  }
}

export async function obtenerProductoPorId(id: string): Promise<Producto | null> {
  try {
    // En producción, usar Supabase o tu base de datos elegida
    // const { data, error } = await supabase
    //   .from('productos')
    //   .select('*')
    //   .eq('id', id)
    //   .single()

    // if (error) {
    //   console.error(`Error al obtener producto ${id}:`, error)
    //   return null
    // }

    // return data as Producto

    // Por ahora, devolver datos de ejemplo
    const producto = productosEjemplo.find((p) => p.id === id)
    return producto || null
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error)
    return null
  }
}

export async function obtenerProductosPorCategoria(categoria: string): Promise<Producto[]> {
  try {
    // En producción, usar Supabase o tu base de datos elegida
    // const { data, error } = await supabase
    //   .from('productos')
    //   .select('*')
    //   .eq('categoria', categoria)

    // if (error) {
    //   console.error(`Error al obtener productos en categoría ${categoria}:`, error)
    //   return []
    // }

    // return data as Producto[]

    // Por ahora, filtrar datos de ejemplo
    return productosEjemplo.filter((p) => p.categoria === categoria)
  } catch (error) {
    console.error(`Error al obtener productos en categoría ${categoria}:`, error)
    return []
  }
}

export async function obtenerProductosDestacados(): Promise<Producto[]> {
  try {
    // En producción, usar Supabase o tu base de datos elegida
    // const { data, error } = await supabase
    //   .from('productos')
    //   .select('*')
    //   .eq('destacado', true)

    // if (error) {
    //   console.error('Error al obtener productos destacados:', error)
    //   return []
    // }

    // return data as Producto[]

    // Por ahora, filtrar datos de ejemplo
    return productosEjemplo.filter((p) => p.destacado)
  } catch (error) {
    console.error("Error al obtener productos destacados:", error)
    return []
  }
}

export async function obtenerCategorias(): Promise<Categoria[]> {
  try {
    // En producción, usar Supabase o tu base de datos elegida
    // const { data, error } = await supabase
    //   .from('categorias')
    //   .select('*')
    //   .order('nombre', { ascending: true })

    // if (error) {
    //   console.error('Error al obtener categorías:', error)
    //   return []
    // }

    // return data as Categoria[]

    // Por ahora, devolver categorías de ejemplo
    const categoriasUnicas = [...new Set(productosEjemplo.map((p) => p.categoria))]

    return categoriasUnicas.map((nombre) => ({
      id: nombre.toLowerCase().replace(/\s+/g, "-"),
      nombre,
      slug: nombre.toLowerCase().replace(/\s+/g, "-"),
      productosCount: productosEjemplo.filter((p) => p.categoria === nombre).length,
      destacada: ["Sudaderas", "Camisetas", "Skate", "Calzado"].includes(nombre),
    }))
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    return []
  }
}

export async function buscarProductos(termino: string): Promise<Producto[]> {
  try {
    // En producción, usar Supabase o tu base de datos elegida
    // const { data, error } = await supabase
    //   .from('productos')
    //   .select('*')
    //   .ilike('nombre', `%${termino}%`)
    //   .order('nombre', { ascending: true })

    // if (error) {
    //   console.error(`Error al buscar productos con término "${termino}":`, error)
    //   return []
    // }

    // return data as Producto[]

    // Por ahora, filtrar datos de ejemplo
    const terminoLower = termino.toLowerCase()
    return productosEjemplo.filter(
      (p) => p.nombre.toLowerCase().includes(terminoLower) || p.descripcion.toLowerCase().includes(terminoLower),
    )
  } catch (error) {
    console.error(`Error al buscar productos con término "${termino}":`, error)
    return []
  }
}

export async function obtenerProductosRelacionados(productoId: string, limite = 4): Promise<Producto[]> {
  try {
    const producto = await obtenerProductoPorId(productoId)

    if (!producto) {
      return []
    }

    // En producción, usar Supabase o tu base de datos elegida
    // const { data, error } = await supabase
    //   .from('productos')
    //   .select('*')
    //   .eq('categoria', producto.categoria)
    //   .neq('id', productoId)
    //   .limit(limite)

    // if (error) {
    //   console.error(`Error al obtener productos relacionados para ${productoId}:`, error)
    //   return []
    // }

    // return data as Producto[]

    // Por ahora, filtrar datos de ejemplo
    return productosEjemplo.filter((p) => p.categoria === producto.categoria && p.id !== productoId).slice(0, limite)
  } catch (error) {
    console.error(`Error al obtener productos relacionados para ${productoId}:`, error)
    return []
  }
}

