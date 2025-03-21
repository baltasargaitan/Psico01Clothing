"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlitchText from "@/components/glitch-text"
import { useMobile } from "@/hooks/use-mobile"

export default function ARExperiencePage() {
  const [cameraActive, setCameraActive] = useState(false)
  const isMobile = useMobile()

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-gray-400 hover:text-primary">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <GlitchText text="AR EXPERIENCE" />
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Try on our products in augmented reality. See how they look on you before making a purchase.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900 rounded-lg overflow-hidden">
            <div className="aspect-video bg-black relative">
              {cameraActive ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400">Camera feed would appear here</p>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <Camera size={48} className="text-gray-400 mb-4" />
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">AR Try-On Experience</h2>
                  <p className="text-gray-400 text-center mb-6 max-w-md">
                    Use your camera to see how our products look on you in augmented reality.
                  </p>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-6 text-base"
                    onClick={() => setCameraActive(true)}
                  >
                    Start Camera
                  </Button>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-4">Select a Product to Try On</h2>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-zinc-800 rounded-md flex items-center justify-center cursor-pointer hover:border hover:border-primary transition-all"
                    >
                      <div className="text-center p-2">
                        <div className="text-xs text-gray-400">Product {i + 1}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-zinc-900 rounded-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold mb-4">How It Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-bold mb-2">Select a Product</h3>
                <p className="text-gray-400 text-sm">Choose from our collection of products to try on virtually.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-bold mb-2">Allow Camera Access</h3>
                <p className="text-gray-400 text-sm">Enable your device's camera to use the AR experience.</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-bold mb-2">See How It Looks</h3>
                <p className="text-gray-400 text-sm">Experience our products virtually before making a purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

