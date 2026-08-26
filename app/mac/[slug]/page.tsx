import { MACBOOKS } from "@/lib/data";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  return MACBOOKS.map((mac) => ({
    slug: mac.slug,
  }));
}

export default async function MacBookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const mac = MACBOOKS.find((m) => m.slug === resolvedParams.slug);

  if (!mac) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] dark:bg-black pt-32">
      <Navbar />

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link href="/mac" className="inline-flex items-center text-brand hover:underline mb-8 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a MacBooks
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-12 shadow-xl shadow-brand/5 border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="w-full h-[300px] md:h-[500px] relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <img 
                src={mac.image} 
                alt={mac.model}
                className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal opacity-90"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-center">
              {mac.extra && (
                <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                  {mac.extra}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                {mac.model}
              </h1>
              <div className="text-4xl font-bold text-brand mb-8">
                {mac.price}
              </div>

              <div className="space-y-6 mb-10">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                  Especificaciones Técnicas
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-brand mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Procesador</p>
                      <p className="text-slate-600 dark:text-slate-400">{mac.chip}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-brand mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Memoria RAM</p>
                      <p className="text-slate-600 dark:text-slate-400">{mac.ram} unificada para un rendimiento ultrarrápido.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-brand mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Almacenamiento</p>
                      <p className="text-slate-600 dark:text-slate-400">{mac.storage} súper rápido.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-brand text-white py-4 rounded-xl font-semibold hover:bg-brand-hover transition-all duration-300 shadow-lg shadow-brand/20 text-lg">
                  Comprar ahora
                </button>
                <button className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 py-4 rounded-xl font-semibold transition-all duration-300 text-lg">
                  Consultar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
