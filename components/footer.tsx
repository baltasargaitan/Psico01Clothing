"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useMobile } from "@/hooks/use-mobile"

export default function Footer() {
  const isMobile = useMobile()

  return (
    <footer className="bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-16">
        {isMobile ? <MobileFooter /> : <DesktopFooter />}

        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} PSICO01CLOTHING. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <img src="/placeholder.svg?height=30&width=50" alt="Visa" className="h-6" />
            <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" className="h-6" />
            <img src="/placeholder.svg?height=30&width=50" alt="PayPal" className="h-6" />
            <img src="/placeholder.svg?height=30&width=50" alt="Apple Pay" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function MobileFooter() {
  return (
    <>
      <div className="mb-8">
        <Link href="/" className="text-xl font-bold font-mono mb-4 block text-center">
          PSICO<span className="text-[#39FF14]">01</span>
        </Link>
        <p className="text-gray-400 mb-6 text-center">Experimental streetwear for the digital age. Distort reality.</p>
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
        <AccordionItem value="quick-links" className="border-zinc-800">
          <AccordionTrigger className="text-lg font-bold py-4">Quick Links</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3 py-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/ar-experience" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  AR Experience
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  FAQ
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="customer-service" className="border-zinc-800">
          <AccordionTrigger className="text-lg font-bold py-4">Customer Service</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3 py-2">
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-400 hover:text-[#39FF14] transition-colors block py-2">
                  Track Order
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contact" className="border-zinc-800">
          <AccordionTrigger className="text-lg font-bold py-4">Contact Us</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3 py-2">
              <li className="flex items-start py-2">
                <Mail size={20} className="text-[#39FF14] mr-3 mt-0.5" />
                <span className="text-gray-400">info@psico01clothing.com</span>
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
        <h3 className="text-lg font-bold mb-4 text-center">Newsletter</h3>
        <div className="flex">
          <input
            type="email"
            placeholder="Your email"
            className="bg-zinc-900 border border-zinc-800 rounded-l-md px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
          />
          <Button className="rounded-l-none h-[50px] bg-[#39FF14] hover:bg-[#39FF14]/90 text-black">Subscribe</Button>
        </div>
      </div>
    </>
  )
}

function DesktopFooter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Brand */}
      <div>
        <Link href="/" className="text-xl font-bold font-mono mb-4 block">
          PSICO<span className="text-[#39FF14]">01</span>
        </Link>
        <p className="text-gray-400 mb-6">Experimental streetwear for the digital age. Distort reality.</p>
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

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/products" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Shop All
            </Link>
          </li>
          <li>
            <Link href="/ar-experience" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              AR Experience
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/faq" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              FAQ
            </Link>
          </li>
        </ul>
      </div>

      {/* Customer Service */}
      <div>
        <h3 className="text-lg font-bold mb-4">Customer Service</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/shipping" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Shipping & Returns
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link href="/size-guide" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Size Guide
            </Link>
          </li>
          <li>
            <Link href="/track-order" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Track Order
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact & Newsletter */}
      <div>
        <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start">
            <Mail size={18} className="text-[#39FF14] mr-2 mt-0.5" />
            <span className="text-gray-400">info@psico01clothing.com</span>
          </li>
          <li className="flex items-start">
            <Phone size={18} className="text-[#39FF14] mr-2 mt-0.5" />
            <span className="text-gray-400">+54 (11) 1234-5678</span>
          </li>
          <li className="flex items-start">
            <MapPin size={18} className="text-[#39FF14] mr-2 mt-0.5" />
            <span className="text-gray-400">Palermo, Buenos Aires, Argentina</span>
          </li>
        </ul>

        <h3 className="text-lg font-bold mb-4">Newsletter</h3>
        <div className="flex">
          <input
            type="email"
            placeholder="Your email"
            className="bg-zinc-900 border border-zinc-800 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#39FF14]"
          />
          <Button className="rounded-l-none bg-[#39FF14] hover:bg-[#39FF14]/90 text-black">Subscribe</Button>
        </div>
      </div>
    </div>
  )
}

