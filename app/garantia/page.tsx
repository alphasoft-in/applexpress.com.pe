import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Garantía | Apple Express",
  description: "Información sobre la garantía de tus productos Apple adquiridos en Apple Express.",
};

export default function GarantiaPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#161617] flex flex-col">
      <Navbar />
      
      <section className="flex-1 pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white tracking-tight mb-8">
            Garantía de Productos
          </h1>
          
          <div className="text-[#1d1d1f] dark:text-[#f5f5f7]">
            <p className="text-lg text-[#86868b] font-medium leading-relaxed mb-8">
              En Apple Express, nos enorgullecemos de ofrecer productos de la más alta calidad, con la tranquilidad que mereces.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">Garantía de 2 Meses</h2>
            <p className="mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              Todos nuestros productos cuentan con una garantía directa de 2 (dos) meses, contados a partir de la fecha de compra. Esta garantía cubre de manera exclusiva defectos de fabricación y problemas internos de hardware que se presenten bajo un uso normal y adecuado del dispositivo.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">Atención Directa</h2>
            <p className="mb-4 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              En caso de requerir hacer efectiva la garantía, el soporte y la atención se brindarán directamente a través de nuestro equipo. Puedes contactarnos vía WhatsApp o visitarnos en nuestra tienda física para gestionar cualquier revisión técnica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a href="https://wa.me/51982848503" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#0071e3] text-sm sm:text-[15px] hover:underline font-medium">
                <FaWhatsapp className="w-4 h-4" />
                Asesor 1: 982 848 503
              </a>
              <a href="https://wa.me/51934288165" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#0071e3] text-sm sm:text-[15px] hover:underline font-medium">
                <FaWhatsapp className="w-4 h-4" />
                Asesor 2: 934 288 165
              </a>
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">¿Qué no cubre la garantía?</h2>
            <ul className="list-disc pl-6 mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6] space-y-2">
              <li>Daños causados por accidentes, abuso, mal uso, contacto con líquidos, fuego, terremotos u otras causas externas.</li>
              <li>Daños cosméticos, incluyendo rayones, abolladuras o plástico roto en los puertos.</li>
              <li>Daños causados por el uso de componentes de terceros o servicios no autorizados por Apple.</li>
              <li>El deterioro normal de la batería (a menos que haya ocurrido una falla debido a un defecto en los materiales o en la fabricación).</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-[#1d1d1f] dark:text-white tracking-tight">Asistencia y Soporte</h2>
            <p className="mb-6 text-sm sm:text-[15px] leading-relaxed text-[#1d1d1f] dark:text-[#a1a1a6]">
              En Apple Express estamos siempre dispuestos a guiarte y asesorarte. Si tu equipo presenta algún inconveniente dentro del periodo de garantía, o simplemente tienes dudas sobre su funcionamiento, no dudes en contactar a nuestro equipo de soporte.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
