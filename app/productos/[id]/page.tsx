import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { obtenerProductoPorId, obtenerProductosRelacionados } from "@/lib/productos"
import { formatearPrecio } from "@/lib/utils"
import type { Metadata } from "next"
import BotonAgregarAlCarrito from "@/components/boton-agregar-al-carrito"
import ProductosRelacionados from "@/components/productos-relacionados"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const producto = await obtenerProductoPorId(params.id)

  if (!producto) {
    return {
      title: "Producto No Encontrado | PSICO01CLOTHING",
      description: "El producto solicitado no pudo ser encontrado.",
    }
  }

  return {
    title: `${producto.nombre} | PSICO01CLOTHING`,
    description: producto.descripcion,
    openGraph: {
      images: [{ url: producto.imagenes[0] }],
    },
  }
}

export default async function PaginaProducto({ params }: { params: { id: string } }) {
  const producto = await obtenerProductoPorId(params.id)
  const productosRelacionados = await obtenerProductosRelacionados(params.id, 4)

  if (!producto) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Producto No Encontrado</h1>
          <p className="text-gray-400 mb-8">El producto que estás buscando no existe o ha sido eliminado.</p>
          <Button asChild className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black">
            <Link href="/productos">Volver a Productos</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Migas de pan */}
        <div className="mb-6">
          <Link href="/productos" className="flex items-center text-gray-400 hover:text-[#39FF14]">
            <ArrowLeft size={16} className="mr-2" />
            Volver a Productos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imágenes del Producto */}
          <div className="space-y-3">
            <div className="aspect-square relative rounded-lg overflow-hidden border border-zinc-800">
              <Image
                src={producto.imagenes[0] || "/placeholder.svg"}
                alt={producto.nombre}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {producto.imagenes.length > 1
                ? producto.imagenes.map((imagen, index) => (
                    <div
                      key={index}
                      className={`aspect-square relative rounded-md overflow-hidden cursor-pointer border ${index === 0 ? "border-[#39FF14]" : "border-zinc-800"}`}
                    >
                      <Image
                        src={imagen || "/placeholder.svg"}
                        alt={`${producto.nombre} - Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 12vw"
                      />
                    </div>
                  ))
                : // Miniaturas de marcador de posición si solo hay una imagen
                  Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="aspect-square relative rounded-md overflow-hidden border border-zinc-800 bg-zinc-900"
                      />
                    ))}
            </div>
          </div>

          {/* Información del Producto */}
          <div>
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-sm text-[#39FF14] font-medium mr-2">{producto.categoria}</span>
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} size={14} className={i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-400"} />
                    ))}
                  <span className="text-sm text-gray-400 ml-2">(42 reseñas)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{producto.nombre}</h1>
              <p className="text-2xl font-mono text-[#39FF14]">{formatearPrecio(producto.precio)}</p>
            </div>

            <p className="text-gray-400 mb-6">{producto.descripcion}</p>

            {/* Selección de Color */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Color</h3>
              <div className="flex space-x-3">
                {producto.colores.map((color) => (
                  <div
                    key={color}
                    className="w-10 h-10 rounded-full cursor-pointer border border-zinc-700 flex items-center justify-center"
                    style={{
                      backgroundColor:
                        color.toLowerCase() === "negro"
                          ? "#000"
                          : color.toLowerCase() === "blanco"
                            ? "#fff"
                            : color.toLowerCase() === "verde neón"
                              ? "#39FF14"
                              : "",
                    }}
                  >
                    {color.toLowerCase() === "negro" && (
                      <div className="w-3 h-3 rounded-full border-2 border-[#39FF14]"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selección de Talla */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium">Talla</h3>
                <button className="text-sm text-[#39FF14] hover:underline">Guía de Tallas</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {producto.tallas.map((talla) => (
                  <div
                    key={talla}
                    className="border border-zinc-800 rounded text-center py-3 cursor-pointer hover:border-[#39FF14] hover:text-[#39FF14] transition-colors"
                  >
                    {talla}
                  </div>
                ))}
              </div>
            </div>

            {/* Agregar al Carrito */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex border border-zinc-800 rounded-md">
                <button className="px-4 py-3 text-xl font-bold min-w-[44px]">-</button>
                <div className="px-4 py-3 border-l border-r border-zinc-800">1</div>
                <button className="px-4 py-3 text-xl font-bold min-w-[44px]">+</button>
              </div>

              <BotonAgregarAlCarrito
                producto={producto}
                className="flex-1 bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-14"
              >
                <ShoppingCart size={18} className="mr-2" />
                Agregar al Carrito
              </BotonAgregarAlCarrito>

              <Button variant="outline" size="icon" className="border-zinc-800 h-14 w-14">
                <Heart size={18} />
              </Button>

              <Button variant="outline" size="icon" className="border-zinc-800 h-14 w-14">
                <Share2 size={18} />
              </Button>
            </div>



            {/* Pestañas de Detalles del Producto */}
            <Tabs defaultValue="descripcion">
              <TabsList className="w-full bg-zinc-900 h-14">
                <TabsTrigger value="descripcion" className="flex-1 h-full">
                  Descripción
                </TabsTrigger>
                <TabsTrigger value="detalles" className="flex-1 h-full">
                  Detalles
                </TabsTrigger>
                <TabsTrigger value="resenas" className="flex-1 h-full">
                  Reseñas
                </TabsTrigger>
              </TabsList>
              <TabsContent value="descripcion" className="pt-4 text-gray-400">
                <p>{producto.descripcion}</p>
                <p className="mt-2">
                  Cada pieza está elaborada individualmente y presenta variaciones únicas, haciendo que tu artículo sea
                  único - como tu identidad digital en un mundo de conformidad.
                </p>
              </TabsContent>
              <TabsContent value="detalles" className="pt-4">
                <ul className="space-y-2 text-gray-400">
                  <li>• 80% algodón, 20% poliéster</li>
                  <li>• Tejido de vellón pesado</li>
                  <li>• Bolsillo interior oculto</li>
                  <li>• Estampado con efecto glitch</li>
                  <li>• Puños y dobladillo acanalados</li>
                  <li>• Lavar a máquina en frío, secar a baja temperatura</li>
                </ul>
              </TabsContent>
              <TabsContent value="resenas" className="pt-4">
                <div className="space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="border-b border-zinc-800 pb-4">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">Cliente {i + 1}</div>
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, j) => (
                                <Star
                                  key={j}
                                  size={14}
                                  className={j < 5 - i ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}
                                />
                              ))}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {i === 0
                            ? "Producto perfecto para la era digital. La calidad es increíble y el bolsillo oculto es perfecto para guardar mi tecnología."
                            : i === 1
                              ? "Gran diseño y ajuste cómodo. El efecto glitch se ve aún mejor en persona."
                              : "Talla un poco grande, pero me encanta el material y la estética futurista."}
                        </p>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sección de Productos Relacionados */}
        {productosRelacionados.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
            <ProductosRelacionados productos={productosRelacionados} />
          </div>
        )}
      </div>
    </main>
  )
}

