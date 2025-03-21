import type { Metadata } from "next"
import Link from "next/link"
import TextoGlitch from "@/components/texto-glitch"

export const metadata: Metadata = {
  title: "Términos y Condiciones | PSICO01CLOTHING",
  description: "Términos y condiciones de uso de PSICO01CLOTHING.",
}

export default function PaginaTerminos() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <TextoGlitch text="TÉRMINOS Y CONDICIONES" />
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Última actualización: {new Date().toLocaleDateString("es-AR")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-zinc-900 rounded-lg p-6 sm:p-8">
          <div className="prose prose-invert max-w-none">
            <p>
              Bienvenido a PSICO01CLOTHING. Estos términos y condiciones describen las reglas y regulaciones para el uso
              del sitio web de PSICO01CLOTHING, ubicado en psico01clothing.com.ar.
            </p>
            <p className="mt-4">
              Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando
              PSICO01CLOTHING si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">1. Definiciones</h2>
            <p>Para los propósitos de estos Términos y Condiciones:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>"Cliente"</strong>, <strong>"Tú"</strong> y <strong>"Tu"</strong> se refiere a ti, la persona
                que accede a este sitio web y acepta los términos y condiciones de la Compañía.
              </li>
              <li>
                <strong>"La Compañía"</strong>, <strong>"Nosotros"</strong>, <strong>"Nos"</strong> y{" "}
                <strong>"Nuestro"</strong> se refiere a PSICO01CLOTHING.
              </li>
              <li>
                <strong>"Parte"</strong>, <strong>"Partes"</strong>, o <strong>"Nosotros"</strong>, se refiere tanto al
                Cliente como a nosotros mismos, o al Cliente o a nosotros mismos.
              </li>
              <li>
                <strong>"Sitio web"</strong> se refiere a PSICO01CLOTHING, accesible desde psico01clothing.com.ar
              </li>
              <li>
                <strong>"Servicio"</strong> se refiere a los servicios y productos que ofrecemos a través de nuestro
                sitio web.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">2. Uso del sitio</h2>
            <p>El permiso para usar el sitio web es otorgado bajo las siguientes condiciones:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Solo podrás usar el sitio web para propósitos legítimos y de acuerdo con estos términos.</li>
              <li>
                No puedes copiar, reproducir, republicar, descargar, publicar, transmitir o distribuir cualquier
                material de este sitio web de cualquier forma sin nuestro permiso previo por escrito.
              </li>
              <li>
                No puedes usar este sitio web de manera que cause, o pueda causar, daño al sitio web o deterioro de la
                disponibilidad o accesibilidad del sitio web.
              </li>
              <li>
                No puedes usar este sitio web de manera ilegal, fraudulenta o dañina, o en conexión con cualquier
                propósito o actividad ilegal, fraudulenta o dañina.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">3. Compras</h2>
            <p>
              Si deseas comprar cualquier producto o servicio disponible a través del sitio web ("Compra"), se te puede
              solicitar que proporciones cierta información relevante para tu Compra, incluyendo, sin limitación, tu
              tarjeta de crédito, fecha de vencimiento, dirección de facturación y dirección de envío.
            </p>
            <p className="mt-4">
              Representas y garantizas que: (i) tienes el derecho legal de usar cualquier tarjeta de crédito u otro
              método de pago en conexión con cualquier Compra; y que (ii) la información que nos proporcionas es
              verdadera, correcta y completa.
            </p>
            <p className="mt-4">
              Nos reservamos el derecho de rechazar o cancelar tu pedido en cualquier momento por razones que incluyen,
              pero no se limitan a: disponibilidad del producto o servicio, errores en la descripción o precio del
              producto o servicio, error en tu pedido u otras razones.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">4. Devoluciones y reembolsos</h2>
            <p>Nuestra política de devoluciones y reembolsos es la siguiente:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Los productos pueden ser devueltos dentro de los 14 días posteriores a la recepción.</li>
              <li>Los productos deben estar en su estado original, sin usar y con todas las etiquetas y embalajes.</li>
              <li>Para iniciar una devolución, contacta a nuestro servicio al cliente.</li>
              <li>
                Los reembolsos se procesarán dentro de los 14 días posteriores a la recepción del producto devuelto.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Propiedad intelectual</h2>
            <p>
              El contenido del sitio web, incluyendo, pero no limitado a, texto, gráficos, logotipos, iconos, imágenes,
              clips de audio, descargas digitales, compilaciones de datos y software, es propiedad de PSICO01CLOTHING o
              sus proveedores de contenido y está protegido por las leyes de derechos de autor argentinas e
              internacionales.
            </p>
            <p className="mt-4">
              Todos los derechos de marca registrada no expresamente otorgados aquí están reservados por sus respectivos
              propietarios.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">6. Limitación de responsabilidad</h2>
            <p>
              En ningún caso PSICO01CLOTHING, ni sus directores, empleados, socios, agentes, proveedores o afiliados,
              serán responsables por cualquier daño indirecto, incidental, especial, consecuente o punitivo, incluyendo,
              sin limitación, pérdida de ganancias, datos, uso, buena voluntad, u otras pérdidas intangibles,
              resultantes de (i) tu acceso o uso o incapacidad para acceder o usar el Servicio; (ii) cualquier conducta
              o contenido de terceros en el Servicio; (iii) cualquier contenido obtenido del Servicio; y (iv) acceso no
              autorizado, uso o alteración de tus transmisiones o contenido, ya sea basado en garantía, contrato,
              agravio (incluyendo negligencia) o cualquier otra teoría legal, ya sea que hayamos sido informados o no de
              la posibilidad de tal daño.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">7. Ley aplicable</h2>
            <p>
              Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de la República Argentina, y
              te sometes irrevocablemente a la jurisdicción exclusiva de los tribunales en esa ubicación.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">8. Cambios a estos términos</h2>
            <p>
              Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en
              cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso de al menos 30 días
              antes de que los nuevos términos entren en vigencia. Lo que constituye un cambio material será determinado
              a nuestra sola discreción.
            </p>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <Link href="/" className="text-[#39FF14] hover:underline">
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

