import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiénes Somos | Apple Express",
  description: "Conoce más sobre Apple Express, tu tienda de confianza para productos Apple en Perú.",
};

export default function QuienesSomosPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#161617] flex flex-col">
      <Navbar />
      
      <section className="flex-1 pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white tracking-tight mb-8">
            Quiénes Somos
          </h1>
          
          <div className="text-[#1d1d1f] dark:text-[#f5f5f7]">
            <p className="text-lg text-[#86868b] font-medium leading-relaxed mb-8">
              En Apple Express somos unos apasionados por la tecnología y la innovación, dedicados a acercarte lo mejor del ecosistema Apple.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">Nuestra Misión</h2>
            <p className="mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              Nuestra misión es brindar una experiencia de compra excepcional a todos nuestros clientes en el Perú, ofreciendo productos con garantía y el mejor servicio de asesoría personalizada.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">¿Por qué elegirnos?</h2>
            <ul className="list-disc pl-6 mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6] space-y-2">
              <li><strong>Importación Directa:</strong> Traemos nuestros productos directamente desde Estados Unidos.</li>
              <li><strong>Confianza y Seguridad:</strong> Somos una empresa registrada (FHARMAG S.A.C) con tienda física para brindarte la mayor seguridad en tu compra.</li>
              <li><strong>Asesoría Personalizada:</strong> Nuestro equipo de especialistas está siempre listo para ayudarte a elegir el dispositivo ideal para tus necesidades.</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">Visítanos</h2>
            <p className="mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              Estaremos encantados de recibirte en nuestra oficina ubicada en Calle Oslo 198, Oficina 201, Ate (Lima, Perú). Vive la experiencia Apple Express.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
