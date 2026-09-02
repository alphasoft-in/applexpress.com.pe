import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/FadeIn";

const ALL_FEATURES = [
  { key: "price", label: "Precio" },
  { key: "processor", label: "Procesador / Chip" },
  { key: "memory", label: "Memoria / RAM" },
  { key: "storage", label: "Almacenamiento" },
  { key: "screen", label: "Pantalla" },
  { key: "camera", label: "Cámara" },
  { key: "battery", label: "Batería" },
  { key: "connectivity", label: "Conectividad" },
  { key: "features", label: "Características" },
  { key: "compatibility", label: "Compatibilidad" },
  { key: "type", label: "Tipo" },
  { key: "extra", label: "Acabado / Extra" },
];

export default async function CompararPage({
  searchParams,
}: {
  searchParams: Promise<{ slugs?: string; category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const slugs = resolvedParams.slugs?.split(",") || [];
  const category = resolvedParams.category || "";

  // Fetch only the requested slugs
  const { data: items } = await supabase
    .from("products")
    .select("*")
    .in("slug", slugs);

  const validItems = items || [];

  const relevantFeatures = ALL_FEATURES.filter((f) =>
    validItems.some((item) => item[f.key as keyof typeof item])
  );

  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <Navbar />

      <section className="pt-10 pb-20 px-4 sm:px-6 max-w-[1200px] mx-auto">
        <FadeIn delay={0}>
          <Link
            href={category ? `/${category}` : "/"}
            className="group inline-flex items-center gap-1.5 text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white transition-colors mb-8 sm:mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 duration-200" />
            Volver a {category ? category.charAt(0).toUpperCase() + category.slice(1) : "Inicio"}
          </Link>
        </FadeIn>

        <StaggerContainer>
          <StaggerItem>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white mb-10 text-center">
              Comparar Modelos
            </h1>
          </StaggerItem>

          {validItems.length === 0 ? (
            <StaggerItem>
              <div className="text-center py-20 text-[#86868b]">
                <p>No se encontraron productos para comparar.</p>
              </div>
            </StaggerItem>
          ) : (
            <StaggerItem className="overflow-x-auto pb-8">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr>
                    <th className="w-48 p-4 text-left border-b border-[#e8e8ed] dark:border-[#2a2a2a] bg-[#fbfbfd]/50 dark:bg-black/50 sticky left-0 z-10 backdrop-blur-md"></th>
                    {validItems.map((item) => (
                      <th
                        key={item.slug}
                        className="p-4 text-center border-b border-[#e8e8ed] dark:border-[#2a2a2a] min-w-[200px]"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="relative w-32 h-32 flex items-center justify-center bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-xl overflow-hidden">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.model}
                                fill
                                className="object-contain p-2"
                              />
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white">
                              {item.model}
                            </h3>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {relevantFeatures.map((feature) => (
                    <tr key={feature.key} className="group hover:bg-[#f5f5f7]/50 dark:hover:bg-[#1c1c1e]/50 transition-colors">
                      <td className="p-4 text-sm font-semibold text-[#86868b] dark:text-[#6e6e73] border-b border-[#e8e8ed] dark:border-[#2a2a2a] bg-[#fbfbfd] dark:bg-black group-hover:bg-[#f5f5f7]/50 dark:group-hover:bg-[#1c1c1e]/50 sticky left-0 z-10 transition-colors">
                        {feature.label}
                      </td>
                      {validItems.map((item) => (
                        <td
                          key={item.slug}
                          className="p-4 text-sm text-[#1d1d1f] dark:text-[#f5f5f7] text-center border-b border-[#e8e8ed] dark:border-[#2a2a2a]"
                        >
                          {item[feature.key as keyof typeof item] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 border-b border-[#e8e8ed] dark:border-[#2a2a2a] bg-[#fbfbfd] dark:bg-black sticky left-0 z-10"></td>
                    {validItems.map((item) => (
                      <td
                        key={`action-${item.slug}`}
                        className="p-4 text-center border-b border-[#e8e8ed] dark:border-[#2a2a2a]"
                      >
                        <Link
                          href={`/${item.category}/${item.slug}`}
                          className="inline-block px-6 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[13px] font-semibold rounded-full transition-colors"
                        >
                          Ver detalle
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </StaggerItem>
          )}
        </StaggerContainer>
      </section>

      <Footer />
    </main>
  );
}
