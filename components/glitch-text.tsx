"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 5000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={`${isGlitching ? "opacity-0" : "opacity-100"}`}>{text}</span>

      {isGlitching && (
        <>
          <motion.span
            className="absolute left-0 top-0 text-red-500 clip-text"
            animate={{
              x: [0, -3, 2, -1, 0],
            }}
            transition={{ duration: 0.2 }}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
          >
            {text}
          </motion.span>

          <motion.span
            className="absolute left-0 top-0 text-cyan-500 clip-text"
            animate={{
              x: [0, 3, -2, 1, 0],
            }}
            transition={{ duration: 0.2 }}
            style={{ clipPath: "polygon(0 45%, 100% 45%, 100% 100%, 0 100%)" }}
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  )
}

