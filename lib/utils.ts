import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(precio)
}

export function generarIdPedido(): string {
  return `PED-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}

export function calcularPrecioConDescuento(precio: number, porcentajeDescuento: number): number {
  return precio - precio * (porcentajeDescuento / 100)
}

export function formatearFecha(fecha: Date): string {
  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(fecha)
}

export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function validarTelefono(telefono: string): boolean {
  const regex = /^(\+?54)?\s?(11|[2368]\d)\s?(\d{4})[-\s]?(\d{4})$/
  return regex.test(telefono)
}

export function generarCodigoAleatorio(longitud = 6): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + longitud)
    .toUpperCase()
}

