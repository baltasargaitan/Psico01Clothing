import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token

  // Rutas protegidas que requieren autenticación
  const rutasProtegidas = ["/cuenta", "/checkout"]

  // Rutas de administrador
  const rutasAdmin = ["/admin"]

  // Rutas de autenticación (redirigir si ya está autenticado)
  const rutasAuth = ["/iniciar-sesion", "/registro"]

  const path = request.nextUrl.pathname

  // Verificar rutas protegidas
  if (rutasProtegidas.some((ruta) => path.startsWith(ruta)) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/iniciar-sesion", request.url))
  }

  // Verificar rutas de administrador
  if (rutasAdmin.some((ruta) => path.startsWith(ruta)) && (!isAuthenticated || token?.role !== "admin")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Redirigir a la cuenta si ya está autenticado e intenta acceder a rutas de autenticación
  if (rutasAuth.some((ruta) => path.startsWith(ruta)) && isAuthenticated) {
    return NextResponse.redirect(new URL("/cuenta", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/cuenta/:path*", "/checkout/:path*", "/admin/:path*", "/iniciar-sesion", "/registro"],
}

