"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function ARTryOn() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  return (
    <>
      <Button variant="outline" className="w-full border-zinc-800 h-14" onClick={() => setIsOpen(true)}>
        <Camera size={18} className="mr-2" />
        Try On with AR
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative bg-zinc-900 rounded-lg max-w-2xl w-full">
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-white p-2"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">AR Try-On Experience</h2>
              <p className="text-gray-400 mb-6">
                Use your camera to see how this item looks on you in augmented reality.
              </p>

              <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-6">
                <p className="text-gray-400">Camera feed will appear here</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <Button variant="outline" className="border-zinc-800 h-12" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                  Start AR Experience
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

