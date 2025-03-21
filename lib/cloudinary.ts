import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export default cloudinary

export async function subirImagen(archivo: File): Promise<string> {
  try {
    // Convertir el archivo a base64
    const base64 = await convertirArchivoABase64(archivo)

    // Subir a Cloudinary
    const resultado = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload(
        base64,
        {
          folder: "psico01clothing/productos",
          resource_type: "image",
          transformation: [{ width: 1000, crop: "limit" }, { quality: "auto" }],
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
    })

    return resultado.secure_url
  } catch (error) {
    console.error("Error al subir imagen a Cloudinary:", error)
    throw error
  }
}

function convertirArchivoABase64(archivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(archivo)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

