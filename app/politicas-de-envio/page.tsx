import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Políticas de Envío | Apple Express",
  description: "Información sobre los métodos, tiempos y políticas de envío en Apple Express.",
};

export default function PoliticasEnvioPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#161617] flex flex-col">
      <Navbar />
      
      <section className="flex-1 pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white tracking-tight mb-8">
            Políticas de Envío
          </h1>
          
          <div className="text-[#1d1d1f] dark:text-[#f5f5f7]">
            <p className="text-lg text-[#86868b] font-medium leading-relaxed mb-8">
              En Apple Express trabajamos para que recibas tus productos de la manera más rápida y segura posible.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">Envíos a Lima Metropolitana</h2>
            <p className="mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              Realizamos entregas el mismo día o al día siguiente hábil para la mayoría de los distritos de Lima Metropolitana, dependiendo de la hora de confirmación del pedido y de la disponibilidad del producto. Los envíos se realizan a través de courier motorizado o unidad móvil de confianza.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">Envíos a Provincia</h2>
            <p className="mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              Realizamos envíos a todo el Perú a través de agencias de transporte reconocidas (como Olva Courier o agencias de buses) asegurando que el producto viaje de manera óptima. El tiempo de tránsito habitual es de 24 a 72 horas hábiles, según el destino.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">Seguridad de tu Compra</h2>
            <ul className="list-disc pl-6 mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6] space-y-2">
              <li>Todos los equipos de alto valor son embalados cuidadosamente.</li>
              <li>Te proporcionaremos el número de remito o tracking para que puedas hacer seguimiento a tu pedido.</li>
              <li>El cliente asume la responsabilidad de proveer los datos exactos para la entrega.</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">Recojo en Tienda</h2>
            <p className="mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              Si lo prefieres, puedes seleccionar la opción de recojo en nuestra oficina ubicada en Calle Oslo 198, Oficina 201, Ate. Te notificaremos cuando tu pedido esté listo para ser retirado.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
