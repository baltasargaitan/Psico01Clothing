"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, ShoppingCart, User, Eye, Home, Grid, Info, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Products", path: "/products", icon: Grid },
  { name: "AR Experience", path: "/ar-experience", icon: Eye },
  { name: "About", path: "/about", icon: Info },
  { name: "Contact", path: "/contact", icon: MessageSquare },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-sm hover:text-[#39FF14] transition-colors ${
                    pathname === item.path ? "text-[#39FF14]" : "text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-[#39FF14]"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search size={20} />
              </Button>

              {!isMobile && (
                <>
                  <Link href="/ar-experience">
                    <Button variant="ghost" size="icon" className="text-gray-300 hover:text-[#39FF14]">
                      <Eye size={20} />
                    </Button>
                  </Link>

                  <Link href="/account">
                    <Button variant="ghost" size="icon" className="text-gray-300 hover:text-[#39FF14]">
                      <User size={20} />
                    </Button>
                  </Link>
                </>
              )}

              <Link href="/cart">
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
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {searchOpen && (
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
                    placeholder="Search for products..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#39FF14] text-base"
                    autoFocus
                  />
                  <Button
                    className="absolute right-1 top-1 bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-10"
                    size="sm"
                  >
                    Search
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-black/95 backdrop-blur-md absolute top-full left-0 right-0 border-t border-zinc-800 z-50"
            >
              <nav className="container mx-auto px-4 py-4">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        className={`flex items-center py-3 hover:text-[#39FF14] transition-colors ${
                          pathname === item.path ? "text-[#39FF14]" : "text-gray-300"
                        }`}
                      >
                        <item.icon size={20} className="mr-3" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/account"
                      className="flex items-center py-3 hover:text-[#39FF14] transition-colors text-gray-300"
                    >
                      <User size={20} className="mr-3" />
                      Account
                    </Link>
                  </li>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-zinc-800 z-40">
          <div className="flex justify-around items-center h-16">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`flex flex-col items-center justify-center w-full h-full ${
                  pathname === item.path ? "text-[#39FF14]" : "text-gray-400"
                }`}
              >
                <item.icon size={20} />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            ))}
            <Link
              href="/account"
              className={`flex flex-col items-center justify-center w-full h-full ${
                pathname === "/account" ? "text-[#39FF14]" : "text-gray-400"
              }`}
            >
              <User size={20} />
              <span className="text-xs mt-1">Account</span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

