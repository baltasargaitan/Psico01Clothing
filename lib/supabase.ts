// Cliente de Supabase para la base de datos
// Debes agregar tus credenciales reales en .env.local

import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/tipos/database"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "⚠️ Las variables de entorno de Supabase no están configuradas. Por favor, configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en tu archivo .env.local",
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Funciones de ayuda para interactuar con Supabase

export async function obtenerDatosUsuario(userId: string) {
  const { data, error } = await supabase.from("usuarios").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error al obtener datos del usuario:", error)
    return null
  }

  return data
}

export async function actualizarDatosUsuario(userId: string, datos: any) {
  const { data, error } = await supabase.from("usuarios").update(datos).eq("id", userId)

  if (error) {
    console.error("Error al actualizar datos del usuario:", error)
    return false
  }

  return true
}

export async function subirImagen(bucket: string, ruta: string, archivo: File) {
  const { data, error } = await supabase.storage.from(bucket).upload(ruta, archivo, {
    cacheControl: "3600",
    upsert: true,
  })

  if (error) {
    console.error("Error al subir imagen:", error)
    return null
  }

  // Construir URL pública
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(ruta)

  return urlData.publicUrl
}

