export interface Usuario {
  id: string
  email: string
  nombre?: string
  apellido?: string
  telefono?: string
  direcciones: DireccionUsuario[]
  fechaRegistro: Date
  ultimoAcceso?: Date
  preferencias: {
    recibirEmails: boolean
    temaOscuro: boolean
  }
  metadatos?: Record<string, any>
}

export interface DireccionUsuario {
  id: string
  nombre: string
  direccion: string
  ciudad: string
  codigoPostal: string
  provincia: string
  pais: string
  predeterminada: boolean
  telefono?: string
  instrucciones?: string
}

export interface SesionUsuario {
  usuario: Usuario | null
  cargando: boolean
  error: Error | null
}

