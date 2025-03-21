"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Landmark, Truck, Package } from "lucide-react"

export default function FormularioCheckout() {
  const [enviando, setEnviando] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)

    try {
      // En una implementación real, enviarías los datos del formulario a tu API
      // Esto podría ser una acción del servidor o un endpoint de API

      // Simular un retraso para la llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "¡Pedido realizado con éxito!",
        description: "Recibirás un correo de confirmación en breve.",
      })

      // Redirigir a la página de éxito
      router.push("/checkout/exito")
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo procesar tu pedido. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Información de Contacto */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Información de Contacto</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" placeholder="Ingresa tu nombre" required className="bg-zinc-800 border-zinc-700" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input id="apellido" placeholder="Ingresa tu apellido" required className="bg-zinc-800 border-zinc-700" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                type="tel"
                placeholder="Ingresa tu número de teléfono"
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
          </div>
        </div>

        {/* Dirección de Envío */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Dirección de Envío</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                placeholder="Ingresa tu dirección"
                required
                className="bg-zinc-800 border-zinc-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input id="ciudad" placeholder="Ingresa tu ciudad" required className="bg-zinc-800 border-zinc-700" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provincia">Provincia</Label>
                <Input
                  id="provincia"
                  placeholder="Ingresa tu provincia"
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigoPostal">Código Postal</Label>
                <Input
                  id="codigoPostal"
                  placeholder="Ingresa tu código postal"
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pais">País</Label>
                <Input
                  id="pais"
                  placeholder="Argentina"
                  defaultValue="Argentina"
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Método de Envío */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Método de Envío</h2>

          <RadioGroup defaultValue="estandar" className="space-y-3">
            <div className="flex items-center justify-between border border-zinc-800 rounded-md p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="estandar" id="estandar" />
                <Label htmlFor="estandar" className="flex items-center">
                  <Truck size={18} className="mr-2 text-[#39FF14]" />
                  Envío Estándar (3-5 días hábiles)
                </Label>
              </div>
              <span className="font-mono">$499</span>
            </div>

            <div className="flex items-center justify-between border border-zinc-800 rounded-md p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="flex items-center">
                  <Package size={18} className="mr-2 text-[#39FF14]" />
                  Envío Express (1-2 días hábiles)
                </Label>
              </div>
              <span className="font-mono">$999</span>
            </div>
          </RadioGroup>
        </div>

        {/* Método de Pago */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Método de Pago</h2>

          <Tabs defaultValue="tarjeta">
            <TabsList className="w-full bg-zinc-800 p-0 h-12">
              <TabsTrigger value="tarjeta" className="flex-1 h-full">
                <CreditCard size={16} className="mr-2" />
                Tarjeta de Crédito
              </TabsTrigger>
              <TabsTrigger value="banco" className="flex-1 h-full">
                <Landmark size={16} className="mr-2" />
                Transferencia Bancaria
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tarjeta" className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="numeroTarjeta">Número de Tarjeta</Label>
                <Input
                  id="numeroTarjeta"
                  placeholder="0000 0000 0000 0000"
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
                  <Input id="fechaVencimiento" placeholder="MM/AA" required className="bg-zinc-800 border-zinc-700" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required className="bg-zinc-800 border-zinc-700" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombreTarjeta">Nombre en la Tarjeta</Label>
                <Input
                  id="nombreTarjeta"
                  placeholder="Ingresa el nombre como aparece en la tarjeta"
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </TabsContent>

            <TabsContent value="banco" className="pt-4 space-y-4">
              <div className="p-4 border border-zinc-800 rounded-md">
                <p className="font-bold mb-2">Instrucciones para Transferencia Bancaria</p>
                <p className="text-gray-400 text-sm mb-4">
                  Por favor, transfiere el monto total a la siguiente cuenta bancaria:
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Banco:</span>
                    <span>Banco Nación Argentina</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nombre de la Cuenta:</span>
                    <span>PSICO01CLOTHING S.A.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Número de Cuenta:</span>
                    <span>0000-1111-2222-3333-4444</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CBU:</span>
                    <span>0110000000000000000000</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mt-4">Tu pedido será procesado una vez que confirmemos tu pago.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Botón de Envío */}
        <Button
          type="submit"
          className="w-full bg-[#39FF14] hover:bg-[#39FF14]/90 text-black h-14 text-lg"
          disabled={enviando}
        >
          {enviando ? "Procesando..." : "Realizar Pedido"}
        </Button>
      </div>
    </form>
  )
}

