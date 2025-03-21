import type { Metadata } from "next"
import Link from "next/link"
import TextoGlitch from "@/components/texto-glitch"

export const metadata: Metadata = {
  title: "Política de Privacidad | PSICO01CLOTHING",
  description: "Información sobre cómo recopilamos, utilizamos y protegemos tus datos personales.",
}

export default function PaginaPrivacidad() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <TextoGlitch text="POLÍTICA DE PRIVACIDAD" />
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Última actualización: {new Date().toLocaleDateString("es-AR")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-zinc-900 rounded-lg p-6 sm:p-8">
          <div className="prose prose-invert max-w-none">
            <p>
              En PSICO01CLOTHING, accesible desde psico01clothing.com.ar, una de nuestras principales prioridades es la
              privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene los tipos de
              información que se recopilan y registran por PSICO01CLOTHING y cómo la utilizamos.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">1. Información que recopilamos</h2>
            <p>
              Cuando te registras en nuestro sitio, como parte del proceso, recopilamos la información personal que nos
              proporcionas, como tu nombre, dirección y dirección de correo electrónico. Dependiendo de la interacción
              que tengas con nuestro sitio, también podemos recopilar tu número de teléfono, información de pago y
              detalles de envío.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">2. Cómo utilizamos tu información</h2>
            <p>Utilizamos la información que recopilamos de diversas formas, incluyendo:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Proporcionar, operar y mantener nuestro sitio web</li>
              <li>Mejorar, personalizar y expandir nuestro sitio web</li>
              <li>Entender y analizar cómo utilizas nuestro sitio web</li>
              <li>Desarrollar nuevos productos, servicios, características y funcionalidades</li>
              <li>
                Comunicarnos contigo, ya sea directamente o a través de uno de nuestros socios, para proporcionarte
                actualizaciones y otra información relacionada con el sitio web y para propósitos de marketing y
                promocionales
              </li>
              <li>Enviarte correos electrónicos</li>
              <li>Encontrar y prevenir fraudes</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">3. Cookies y tecnologías de seguimiento</h2>
            <p>
              Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro sitio web
              y almacenar cierta información. Las cookies son archivos con una pequeña cantidad de datos que pueden
              incluir un identificador único anónimo. Las cookies se envían a tu navegador desde un sitio web y se
              almacenan en tu dispositivo.
            </p>
            <p className="mt-4">
              También utilizamos cookies de terceros que nos ayudan a analizar y entender cómo utilizas este sitio web,
              para almacenar tus preferencias y proporcionar contenido y anuncios que sean relevantes para ti.
            </p>
            <p className="mt-4">
              Puedes instruir a tu navegador para que rechace todas las cookies o para que te avise cuando se envía una
              cookie. Sin embargo, si no aceptas cookies, es posible que no puedas utilizar algunas partes de nuestro
              sitio web.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">4. Transferencia de datos</h2>
            <p>
              Tu información, incluidos los datos personales, puede ser transferida y mantenida en computadoras ubicadas
              fuera de tu estado, provincia, país u otra jurisdicción gubernamental donde las leyes de protección de
              datos pueden diferir de las de tu jurisdicción.
            </p>
            <p className="mt-4">
              Si te encuentras fuera de Argentina y eliges proporcionarnos información, ten en cuenta que transferimos
              los datos, incluidos los datos personales, a Argentina y los procesamos allí.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Derechos de protección de datos</h2>
            <p>
              Queremos asegurarnos de que estés completamente consciente de todos tus derechos de protección de datos.
              Cada usuario tiene derecho a lo siguiente:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Derecho de acceso</strong> - Tienes derecho a solicitar copias de tus datos personales.
              </li>
              <li>
                <strong>Derecho de rectificación</strong> - Tienes derecho a solicitar que corrijamos cualquier
                información que creas que es inexacta. También tienes derecho a solicitar que completemos la información
                que creas que está incompleta.
              </li>
              <li>
                <strong>Derecho al olvido</strong> - Tienes derecho a solicitar que borremos tus datos personales, bajo
                ciertas condiciones.
              </li>
              <li>
                <strong>Derecho a restringir el procesamiento</strong> - Tienes derecho a solicitar que restrinjamos el
                procesamiento de tus datos personales, bajo ciertas condiciones.
              </li>
              <li>
                <strong>Derecho a oponerte al procesamiento</strong> - Tienes derecho a oponerte a nuestro procesamiento
                de tus datos personales, bajo ciertas condiciones.
              </li>
              <li>
                <strong>Derecho a la portabilidad de datos</strong> - Tienes derecho a solicitar que transfiramos los
                datos que hemos recopilado a otra organización, o directamente a ti, bajo ciertas condiciones.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">6. Información de contacto</h2>
            <p>Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Por email: info@psico01clothing.com.ar</li>
              <li>Por teléfono: +54 (11) 1234-5678</li>
              <li>Por correo: Cordoba, Cordoba Argentina</li>
            </ul>

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

