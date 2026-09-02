import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/FadeIn";
import { PurchaseOptions } from "@/components/PurchaseOptions";
import type { Metadata } from "next";
import Image from "next/image";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: products } = await supabase.from("products").select("slug").eq("category", "airpods");
  return products?.map((p) => ({ slug: p.slug })) || [];
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const { data: item } = await supabase.from("products").select("*").eq("slug", slug).single();
  if (!item) return {};

  const specs = [item.processor, item.features, item.connectivity].filter(Boolean).join(", ");
  const title = `${item.model} ${specs} en Peru`.trim();
  const description = `Compra ${item.model} con ${specs} importado desde EE.UU. ${item.price}. Garantia incluida. Envio a todo el Peru.`;

  return {
    title,
    description,
    alternates: { canonical: `https://applexpress-com-pe.vercel.app/airpods/${slug}` },
    openGraph: {
      title: `${title} | Apple Express Peru`,
      description,
      url: `https://applexpress-com-pe.vercel.app/airpods/${slug}`,
      images: item.image?.startsWith("http")
        ? [{ url: item.image, width: 800, height: 600, alt: item.model }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

const SPECS_MAP = [
  { key: "processor", label: "Procesador / Chip" },
  { key: "memory", label: "Memoria / RAM" },
  { key: "storage", label: "Almacenamiento" },
  { key: "screen", label: "Pantalla" },
  { key: "camera", label: "Cámara" },
  { key: "battery", label: "Batería" },
  { key: "connectivity", label: "Conectividad" },
  { key: "features", label: "Características" },
];

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { data: item } = await supabase.from("products").select("*").eq("slug", resolvedParams.slug).single();
  if (!item) notFound();

  const priceRaw = item.price.replace(/[^\d]/g, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.model,
    description: `${item.model} importado desde EE.UU.`,
    image: item.image,
    brand: { "@type": "Brand", name: "Apple" },
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: priceRaw,
      availability: item.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Apple Express Peru",
        url: "https://applexpress-com-pe.vercel.app",
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <section className="pt-6 sm:pt-10 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[980px] mx-auto">
        <FadeIn delay={0}>
          <Link
            href="/airpods"
            className="group inline-flex items-center gap-1.5 text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white transition-colors mb-8 sm:mb-10 capitalize"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 duration-200" />
            AirPods
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          <FadeIn delay={0.1} className="w-full md:sticky md:top-24">
            <div className="relative bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center aspect-[4/3] sm:aspect-square group">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.model}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-8 mix-blend-multiply group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="text-gray-400">Sin imagen</div>
              )}
            </div>
          </FadeIn>

          <StaggerContainer className="flex flex-col">
            {item.extra && (
              <StaggerItem>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[10px] font-semibold uppercase tracking-wider mb-3">
                  {item.extra}
                </span>
              </StaggerItem>
            )}

            <StaggerItem>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white leading-tight mb-1">
                {item.model}
              </h1>
            </StaggerItem>

            <StaggerItem>
              <div className="mb-6 sm:mb-8">
                <p className="text-base sm:text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                  Desde {item.price}
                </p>
                <div className="mt-2.5">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${item.stock > 0 ? "bg-[#0071e3]/10 text-[#0071e3]" : "bg-red-100 text-red-600"}`}>
                    {item.stock > 0 ? `Stock: ${item.stock} unidades` : "Agotado"}
                  </span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="border-t border-[#e8e8ed] dark:border-[#2a2a2a] pt-5 mb-6 sm:mb-8">
                <p className="text-[10px] font-semibold text-[#6e6e73] uppercase tracking-[0.15em] mb-4">
                  Especificaciones
                </p>
                <dl className="space-y-0 divide-y divide-[#f0f0f0] dark:divide-[#1e1e1e]">
                  {SPECS_MAP.map(({ key, label }) =>
                    item[key as keyof typeof item] ? (
                      <div key={key} className="flex items-start gap-3 py-2.5">
                        <dt className="text-[12px] text-[#86868b] dark:text-[#6e6e73] w-[100px] sm:w-[110px] shrink-0 pt-px leading-snug">{label}</dt>
                        <dd className="text-[12px] sm:text-[13px] text-[#1d1d1f] dark:text-white leading-snug">{item[key as keyof typeof item]}</dd>
                      </div>
                    ) : null
                  )}
                </dl>
              </div>
            </StaggerItem>

            <StaggerItem>
              <PurchaseOptions productName={item.model} productSpecs={[item.processor, item.features, item.connectivity].filter(Boolean).join(" · ")} />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
      <Footer />
    </main>
  );
}
