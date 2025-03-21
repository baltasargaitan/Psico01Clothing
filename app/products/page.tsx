import { Suspense } from "react"
import GlitchText from "@/components/glitch-text"
import ProductsGrid from "@/components/products-grid"
import ProductsFilter from "@/components/products-filter"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products | PSICO01CLOTHING",
  description: "Browse our collection of experimental streetwear. Each piece is designed for the digital rebel.",
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <GlitchText text="PRODUCTS" />
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our collection of experimental streetwear. Each piece is designed for the digital rebel.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <SlidersHorizontal size={18} />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-black border-r border-zinc-800 p-0">
                <div className="h-full overflow-auto py-6 px-4">
                  <ProductsFilter />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <ProductsFilter />
          </aside>

          <div className="flex-1">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="bg-zinc-900 rounded-lg overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
    </div>
  )
}

