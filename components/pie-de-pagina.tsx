"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useMobile } from "@/hooks/use-mobile"

export default function PieDePagina() {
  const esMobil = useMobile()

  return (
    <footer className="bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-16">
        {esMobil ? <PieDePaginaMovil /> : <PieDePaginaEscritorio />}

        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} PSICO01CLOTHING. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <img src="/placeholder.svg?height=30&width=50" alt="Visa" className="h-6" />
            <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" className="h-6" />
            <img src="/placeholder.svg?height=30&width=50" alt="PayPal" className="h-6" />
            <img src="/placeholder.svg?height=30&width=50" alt="MercadoPago" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function PieDePaginaMovil() {
  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-xl font-bold font-mono mb-4 block text-center">
          PSICO<span className="text-[#39FF14]">01</span>
        </Link>
        <p className="text-gray-400 mb-6 text-center">
          Ropa urbana experimental para la era digital. Distorsiona la realidad.
        </p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
            <Youtube size={24} />
          </a>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="enlaces-rapidos" className="border-zinc-800">
          <AccordionTrigger className="text-lg font-bold py-4">Enlaces Rápidos</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3 py-2">
              <li>
                <Link href="/productos" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Todos los Productos
                </Link>
              </li>
              <li>

              </li>
              <li>
                <Link href="/nosotros" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/preguntas-frecuentes"
                  className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="servicio-cliente" className="border-zinc-800">
          <AccordionTrigger className="text-lg font-bold py-4">Servicio al Cliente</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3 py-2">
              <li>
                <Link href="/envios" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Envíos y Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/guia-tallas" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link href="/seguimiento" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Seguimiento de Pedido
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contacto" className="border-zinc-800">
          <AccordionTrigger className="text-lg font-bold py-4">Contáctanos</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3 py-2">
              <li className="flex items-start py-2">
                <Mail size={20} className="text-[#39FF14] mr-3 mt-0.5" />
                <span className="text-gray-400">info@psico01clothing.com.ar</span>
              </li>
              <li className="flex items-start py-2">
                <Phone size={20} className="text-[#39FF14] mr-3 mt-0.5" />
                <span className="text-gray-400">+54 (11) 1234-5678</span>
              </li>
              <li className="flex items-start py-2">
                <MapPin size={20} className="text-[#39FF14] mr-3 mt-0.5" />
                <span className="text-gray-400">Cordoba, Cordoba, Argentina</span>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4 text-center">Boletín Informativo</h3>
        <div className="flex">
          <input
            type="email"
            placeholder="Tu email"
            className="bg-zinc-900 border border-zinc-800 rounded-l-md px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
          />
          <Button className="rounded-l-none h-[50px] bg-[#39FF14] hover:bg-[#39FF14]/90 text-black">Suscribirse</Button>
        </div>
      </div>
    </>
  )
}

function PieDePaginaEscritorio() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Marca */}
      <div>
        <Link href="/" className="text-xl font-bold font-mono mb-4 block">
          PSICO<span className="text-[#39FF14]">01</span>
        </Link>
        <p className="text-gray-400 mb-6">Ropa urbana experimental para la era digital. Distorsiona la realidad.</p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
            <Youtube size={20} />
          </a>
        </div>
      </div>

      {/* Enlaces Rápidos */}
      <div>
        <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/productos" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Todos los Productos
            </Link>
          </li>

          <li>
            <Link href="/nosotros" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Sobre Nosotros
            </Link>
          </li>
          <li>
            <Link href="/contacto" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Contacto
            </Link>
          </li>
          <li>
            <Link href="/preguntas-frecuentes" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Preguntas Frecuentes
            </Link>
          </li>
        </ul>
      </div>

      {/* Servicio al Cliente */}
      <div>
        <h3 className="text-lg font-bold mb-4">Servicio al Cliente</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/envios" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Envíos y Devoluciones
            </Link>
          </li>
          <li>
            <Link href="/privacidad" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Política de Privacidad
            </Link>
          </li>
          <li>
            <Link href="/terminos" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Términos y Condiciones
            </Link>
          </li>
          <li>
            <Link href="/guia-tallas" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Guía de Tallas
            </Link>
          </li>
          <li>
            <Link href="/seguimiento" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Seguimiento de Pedido
            </Link>
          </li>
        </ul>
      </div>

      {/* Contacto y Boletín */}
      <div>
        <h3 className="text-lg font-bold mb-4">Mantente Conectado</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start">
            <Mail size={18} className="text-[#39FF14] mr-2 mt-0.5" />
            <span className="text-gray-400">info@psico01clothing.com.ar</span>
          </li>
          <li className="flex items-start">
            <Phone size={18} className="text-[#39FF14] mr-2 mt-0.5" />
            <span className="text-gray-400">+54 (11) 1234-5678</span>
          </li>
          <li className="flex items-start">
            <MapPin size={18} className="text-[#39FF14] mr-2 mt-0.5" />
            <span className="text-gray-400">Cordoba, Cordoba, Argentina</span>
          </li>
        </ul>

        <h3 className="text-lg font-bold mb-4">Boletín Informativo</h3>
        <div className="flex">
          <input
            type="email"
            placeholder="Tu email"
            className="bg-zinc-900 border border-zinc-800 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
          />
          <Button className="rounded-l-none bg-[#39FF14] hover:bg-[#39FF14]/90 text-black">Suscribirse</Button>
        </div>
      </div>
    </div>
  )
}

