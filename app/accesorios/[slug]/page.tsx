import { ACCESSORIES } from "@/lib/data";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/FadeIn";

export async function generateStaticParams() {
  return ACCESSORIES.map((accessory) => ({
    slug: accessory.slug,
  }));
}

export default async function AccessoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const accessory = ACCESSORIES.find((a) => a.slug === resolvedParams.slug);

  if (!accessory) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] dark:bg-black pt-28">
      <Navbar />

      <section className="pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <Link 
            href="/accesorios"
            className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 mr-3 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </span>
            Volver a Accesorios
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-xl shadow-brand/5 border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Image Section */}
            <FadeIn delay={0.1} className="w-full md:sticky md:top-32 h-[300px] md:h-[500px] relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-8 group">
              <img 
                src={accessory.image} 
                alt={accessory.model}
                className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
            </FadeIn>

            {/* Details Section */}
            <StaggerContainer className="flex flex-col justify-center">
              {accessory.extra && (
                <StaggerItem>
                  <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-2 w-fit">
                    {accessory.extra}
                  </span>
                </StaggerItem>
              )}
              <StaggerItem>
                <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">
                  {accessory.model}
                </h1>
              </StaggerItem>
              <StaggerItem>
                <div className="text-xl lg:text-3xl font-medium text-brand mb-4">
                  {accessory.price}
                </div>
              </StaggerItem>

              <StaggerItem className="space-y-4 mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">
                  Detalles del Producto
                </h3>
                <ul className="space-y-3 text-sm">
                  {accessory.type && (
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-brand mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Tipo</p>
                      <p className="text-slate-600 dark:text-slate-400">{accessory.type}</p>
                    </div>
                  </li>
                  )}
                  {accessory.compatibility && (
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-brand mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Compatibilidad</p>
                      <p className="text-slate-600 dark:text-slate-400">{accessory.compatibility}</p>
                    </div>
                  </li>
                  )}
                  {accessory.features && (
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-brand mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Características destacadas</p>
                      <p className="text-slate-600 dark:text-slate-400">{accessory.features}</p>
                    </div>
                  </li>
                  )}
                  {accessory.connectivity && (
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-brand mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Conectividad</p>
                      <p className="text-slate-600 dark:text-slate-400">{accessory.connectivity}</p>
                    </div>
                  </li>
                  )}
                </ul>
              </StaggerItem>

              <StaggerItem className="flex flex-col gap-3">
                <a 
                  href={`https://wa.me/51934288165?text=Hola,%20quiero%20comprar%20el%20${encodeURIComponent(accessory.model)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-brand text-white py-2 px-4 rounded-lg font-medium hover:bg-brand-hover transition-all duration-300 shadow-sm shadow-brand/20 text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Consultar ahora
                </a>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
