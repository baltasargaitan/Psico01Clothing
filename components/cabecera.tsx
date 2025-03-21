"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

import { Menu, X, Search, ShoppingCart, User, Eye, Home, Grid, Info, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

const itemsNavegacion = [
  { nombre: "Inicio", ruta: "/", icono: Home },
  { nombre: "Productos", ruta: "/productos", icono: Grid },
  { nombre: "Nosotros", ruta: "/nosotros", icono: Info },
  { nombre: "Contacto", ruta: "/contacto", icono: MessageSquare },
]

export default function Cabecera() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false)
  const [busquedaAbierta, setBusquedaAbierta] = useState(false)
  const pathname = usePathname()
  const esMobil = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMenuMovilAbierto(false)
    setBusquedaAbierta(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold font-mono">
              PSICO<span className="text-[#39FF14]">01</span>
            </Link>

            {/* Navegación de Escritorio */}
            <nav className="hidden md:flex items-center space-x-7">
              {itemsNavegacion.map((item) => (
                <Link
                  key={item.nombre}
                  href={item.ruta}
                  className={`text-sm hover:text-[#39FF14] transition-colors ${
                    pathname === item.ruta ? "text-[#39FF14]" : "text-gray-300"
                  }`}
                >
                  {item.nombre}
                </Link>
              ))}
            </nav>

            {/* Acciones */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-[#39FF14]"
                onClick={() => setBusquedaAbierta(!busquedaAbierta)}
              >
                <Search size={20} />
              </Button>

              {!esMobil && (
                <>
                  

                  <Link href="/cuenta">
                    <Button variant="ghost" size="icon" className="text-gray-300 hover:text-[#39FF14]">
                      <User size={20} />
                    </Button>
                  </Link>
                </>
              )}

              <Link href="/carrito">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-[#39FF14] relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-[#39FF14] text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    2
                  </span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-[#39FF14] md:hidden"
                onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
              >
                {menuMovilAbierto ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Barra de Búsqueda */}
          <AnimatePresence>
            {busquedaAbierta && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mt-4"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#39FF14] text-base"
                    autoFocus
                  />
                  <Button
                    className="absolute right-1 top-1 bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-10"
                    size="sm"
                  >
                    Buscar
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Menú Móvil */}
        <AnimatePresence>
          {menuMovilAbierto && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-black/95 backdrop-blur-md absolute top-full left-0 right-0 border-t border-zinc-800 z-50"
            >
              <nav className="container mx-auto px-4 py-4">
                <ul className="space-y-4">
                  {itemsNavegacion.map((item) => (
                    <li key={item.nombre}>
                      <Link
                        href={item.ruta}
                        className={`flex items-center py-3 hover:text-[#39FF14] transition-colors ${
                          pathname === item.ruta ? "text-[#39FF14]" : "text-gray-300"
                        }`}
                      >
                        <item.icono size={20} className="mr-3" />
                        {item.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
