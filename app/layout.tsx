import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"
import Cabecera from "@/components/cabecera"
import PieDePagina from "@/components/pie-de-pagina"
import Analytics from "@/components/analytics"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "PSICO01CLOTHING | Ropa Experimental",
    template: "%s | PSICO01CLOTHING",
  },
  description: "Distorsiona la realidad.",
  keywords: ["ropa urbana", "ropa", "moda", "experimental", "digital", "argentina"],
  authors: [{ name: "PSICO01CLOTHING" }],
  creator: "PSICO01CLOTHING",
  publisher: "PSICO01CLOTHING",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://psico01clothing.com.ar",
    siteName: "PSICO01CLOTHING",
    title: "PSICO01CLOTHING | Ropa Experimental",
    description: "Ropa experimental para la era digital. Distorsiona la realidad.",
    images: [
      {
        url: "/images/brand-bg.png",
        width: 1200,
        height: 630,
        alt: "PSICO01CLOTHING",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PSICO01CLOTHING | Ropa Experimental",
    description: "Ropa experimental para la era digital. Distorsiona la realidad.",
    images: ["/images/brand-bg.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased pb-16 md:pb-0`}>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Cabecera />
          {children}
          <PieDePagina />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}



import './globals.css'