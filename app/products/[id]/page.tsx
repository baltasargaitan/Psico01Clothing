import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProductById } from "@/lib/products"
import { formatearPrecio } from "@/lib/utils"

import type { Metadata } from "next"
import AddToCartButton from "@/components/add-to-cart-button"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProductById(params.id)

  if (!product) {
    return {
      title: "Product Not Found | PSICO01CLOTHING",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: `${product.name} | PSICO01CLOTHING`,
    description: product.description,
    openGraph: {
      images: [{ url: product.images[0] }],
    },
  }
}
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)
  
  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black">
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/products"
            className="flex items-center text-gray-400 hover:text-[#39FF14]"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-3">
            <div className="aspect-square relative rounded-lg overflow-hidden border border-zinc-800">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.length > 1 ? (
                product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square relative rounded-md overflow-hidden cursor-pointer border ${
                      index === 0 ? "border-[#39FF14]" : "border-zinc-800"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12vw"
                    />
                  </div>
                ))
              ) : (
                // Placeholder thumbnails if only one image
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square relative rounded-md overflow-hidden border border-zinc-800 bg-zinc-900"
                    />
                  ))
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-sm text-[#39FF14] font-medium mr-2">
                  {product.category}
                </span>
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}
                      />
                    ))}
                  <span className="text-sm text-gray-400 ml-2">(42 reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-mono text-[#39FF14]">
                {formatearPrecio(product.price)}
              </p>
            </div>

            <p className="text-gray-400 mb-6">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className="w-10 h-10 rounded-full cursor-pointer border border-zinc-700 flex items-center justify-center"
                    style={{
                      backgroundColor:
                        color.toLowerCase() === "black"
                          ? "#000"
                          : color.toLowerCase() === "white"
                          ? "#fff"
                          : color.toLowerCase() === "neon green"
                          ? "#39FF14"
                          : "",
                    }}
                  >
                    {color.toLowerCase() === "black" && (
                      <div className="w-3 h-3 rounded-full border-2 border-[#39FF14]"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium">Size</h3>
                <button className="text-sm text-[#39FF14] hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <div
                    key={size}
                    className="border border-zinc-800 rounded text-center py-3 cursor-pointer hover:border-[#39FF14] hover:text-[#39FF14] transition-colors"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex border border-zinc-800 rounded-md">
                <button className="px-4 py-3 text-xl font-bold min-w-[44px]">-</button>
                <div className="px-4 py-3 border-l border-r border-zinc-800">1</div>
                <button className="px-4 py-3 text-xl font-bold min-w-[44px]">+</button>
              </div>

              <AddToCartButton
                product={product}
                className="flex-1 bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-14"
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </AddToCartButton>

              <Button variant="outline" size="icon" className="border-zinc-800 h-14 w-14">
                <Heart size={18} />
              </Button>

              <Button variant="outline" size="icon" className="border-zinc-800 h-14 w-14">
                <Share2 size={18} />
              </Button>
            </div>

            {/* AR Try-On Button */}
            <Button variant="outline" className="w-full border-zinc-800 h-14 mb-8" asChild>
              <Link href="/ar-experience">Try On with AR</Link>
            </Button>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description">
              <TabsList className="w-full bg-zinc-900 h-14">
                <TabsTrigger value="description" className="flex-1 h-full">
                  Description
                </TabsTrigger>
                <TabsTrigger value="details" className="flex-1 h-full">
                  Details
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 h-full">
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4 text-gray-400">
                <p>{product.description}</p>
                <p className="mt-2">
                  Each piece is individually crafted and features unique variations, making your item one of a kind - just like your digital identity in a world of conformity.
                </p>
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <ul className="space-y-2 text-gray-400">
                  <li>• 80% cotton, 20% polyester</li>
                  <li>• Heavyweight fleece fabric</li>
                  <li>• Hidden inner pocket</li>
                  <li>• Glitch effect screen printing</li>
                  <li>• Ribbed cuffs and hem</li>
                  <li>• Machine wash cold, tumble dry low</li>
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="pt-4">
                <div className="space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="border-b border-zinc-800 pb-4">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">Customer {i + 1}</div>
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
                            ? "Perfect product for the digital age! The quality is amazing and the hidden pocket is perfect for storing my tech."
                            : i === 1
                            ? "Great design and comfortable fit. The glitch effect looks even better in person."
                            : "Runs slightly large, but I love the material and the futuristic aesthetic."}
                        </p>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products Section would go here */}
      </div>
    </main>
  )
}
