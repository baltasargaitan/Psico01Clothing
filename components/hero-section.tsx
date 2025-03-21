"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import GlitchText from "@/components/glitch-text"
import { useMobile } from "@/hooks/use-mobile"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image src="/images/brand-bg.png" alt="PSICO01 Background" fill className="object-cover opacity-70" priority />
      </div>

      {/* Glitch overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat mix-blend-screen"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
            <GlitchText text="PSICO01CLOTHING" />
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8">
            Experimental streetwear for the digital age. Distort reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-14 text-base">
              <Link href="/products">Shop Collection</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#39FF14]/50 hover:bg-[#39FF14]/10 text-[#39FF14] h-14 text-base"
            >
              <Link href="/ar-experience">Try AR Experience</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scrolling text at bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-4 bg-black/50 backdrop-blur-sm z-20">
        <div className="whitespace-nowrap animate-scrollText">
          <span className="text-base sm:text-xl font-mono mx-4 text-[#39FF14]">PSICO01</span>
          <span className="text-base sm:text-xl font-mono mx-4 text-[#39FF14]">DISTORT REALITY</span>
          <span className="text-base sm:text-xl font-mono mx-4 text-[#39FF14]">DIGITAL CHAOS</span>
          <span className="text-base sm:text-xl font-mono mx-4 text-[#39FF14]">SYSTEM ERROR</span>
          <span className="text-base sm:text-xl font-mono mx-4 text-[#39FF14]">PSICO01</span>
          <span className="text-base sm:text-xl font-mono mx-4 text-[#39FF14]">DISTORT REALITY</span>
          <span className="text-base sm:text-xl font-mono mx-4 text-[#39FF14]">DIGITAL CHAOS</span>
          <span className="text-base sm:text-xl font-mono mx-4 text-[#39FF14]">SYSTEM ERROR</span>
        </div>
      </div>
    </section>
  )
}

