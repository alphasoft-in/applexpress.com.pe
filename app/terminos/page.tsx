import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Apple Express",
  description: "Términos y condiciones de compra y uso del sitio web de Apple Express.",
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#161617] flex flex-col">
      <Navbar />
      
      <section className="flex-1 pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white tracking-tight mb-8">
            Términos y Condiciones
          </h1>
          
          <div className="text-[#1d1d1f] dark:text-[#f5f5f7]">
            <p className="text-lg text-[#86868b] font-medium leading-relaxed mb-8">
              Al utilizar nuestro sitio web y realizar compras en Apple Express, aceptas los siguientes términos y condiciones.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">1. Generalidades</h2>
            <p className="mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              El presente documento regula el acceso y el uso de los servicios ofrecidos por FHARMAG S.A.C (Apple Express). Nos reservamos el derecho de modificar estos términos en cualquier momento.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">2. Precios y Pagos</h2>
            <p className="mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              Todos los precios publicados en este sitio web están expresados en Soles (S/) o Dólares Americanos (US$), según se indique. Los precios están sujetos a cambios sin previo aviso. Los métodos de pago aceptados son transferencias bancarias, Yape, Plin y pagos en efectivo o tarjeta en nuestra tienda física.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">3. Disponibilidad de Stock</h2>
            <p className="mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              El catálogo y los niveles de stock mostrados en el sitio web son de carácter referencial. Apple Express verificará la disponibilidad final del producto al momento de la confirmación con el cliente a través de nuestros canales de atención (WhatsApp o tienda).
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">4. Cambios y Devoluciones</h2>
            <p className="mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              Solo se aceptarán devoluciones o cambios por fallas de fábrica que estén contempladas dentro de la política de garantía (2 meses) o mediante revisión del equipo técnico de la marca. No se aceptan cambios por desistimiento de compra si el equipo ya fue abierto o activado.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
