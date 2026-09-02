import { IPHONES } from "@/lib/data";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/FadeIn";
import { PurchaseOptions } from "@/components/PurchaseOptions";
import type { Metadata } from "next";
import Image from "next/image";

export function generateStaticParams() {
  return IPHONES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = IPHONES.find((i) => i.slug === slug);
  if (!item) return {};

  const specs = [item.chip, item.storage, item.screen].filter(Boolean).join(", ");
  const title = `${item.model} ${item.storage || ""} en Perú | Apple Express`;
  const description = `Compra ${item.model} ${item.storage || ""} con ${specs} importado desde EE.UU. Precio ${item.price}. Garantía incluida. Envío a todo el Perú.`;

  return {
    title,
    description,
    keywords: [`${item.model} Peru`, `${item.model} Lima`, `iPhone ${item.storage} Peru`, "iPhone importado Peru", "comprar iPhone"],
    alternates: { canonical: `https://applexpress.com.pe/iphone/${slug}` },
    openGraph: {
      title: `${title} | Apple Express Perú`,
      description,
      url: `https://applexpress.com.pe/iphone/${slug}`,
      images: item.image.startsWith("http")
        ? [{ url: item.image, width: 800, height: 600, alt: item.model }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

const SPECS_MAP = [
  { key: "chip",    label: "Chip" },
  { key: "storage", label: "Almacenamiento" },
  { key: "screen",  label: "Pantalla" },
  { key: "camera",  label: "Cámara" },
  { key: "battery", label: "Batería" },
  { key: "extra",   label: "Acabado" },
];

export default async function IPhoneDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const item = IPHONES.find((i) => i.slug === resolvedParams.slug);
  if (!item) notFound();

  const priceRaw = item.price.replace(/[^\d]/g, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${item.model} ${item.storage || ""}`.trim(),
    description: `${item.model} con chip ${item.chip || ""}, pantalla ${item.screen || ""} y ${item.storage || ""} importado desde EE.UU.`,
    image: item.image,
    brand: { "@type": "Brand", name: "Apple" },
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: priceRaw,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Apple Express Perú",
        url: "https://applexpress.com.pe",
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <section className="pt-6 sm:pt-10 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[980px] mx-auto">
        <FadeIn delay={0}>
          <Link
            href="/iphone"
            className="group inline-flex items-center gap-1.5 text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white transition-colors mb-8 sm:mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 duration-200" />
            iPhone
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          <FadeIn delay={0.1} className="w-full md:sticky md:top-24">
            <div className="relative bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center aspect-[4/3] sm:aspect-square group">
              <Image
                src={item.image}
                alt={item.model}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
            </div>
          </FadeIn>

          <StaggerContainer className="flex flex-col">
            {(item as any).extra && (
              <StaggerItem>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[10px] font-semibold uppercase tracking-wider mb-3">
                  {(item as any).extra}
                </span>
              </StaggerItem>
            )}

            <StaggerItem>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white leading-tight mb-1">
                {item.model}
              </h1>
            </StaggerItem>

            {/* Price & Stock */}
            <StaggerItem>
              <div className="mb-6 sm:mb-8">
                <p className="text-base sm:text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                  Desde {item.price}
                </p>
                <div className="mt-2.5">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-semibold uppercase tracking-wider">
                    {(item as any).stock ? `Stock: ${(item as any).stock} unidades` : "Stock disponible"}
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
                    (item as any)[key] ? (
                      <div key={key} className="flex items-start gap-3 py-2.5">
                        <dt className="text-[12px] text-[#86868b] dark:text-[#6e6e73] w-[100px] sm:w-[110px] shrink-0 pt-px leading-snug">{label}</dt>
                        <dd className="text-[12px] sm:text-[13px] text-[#1d1d1f] dark:text-white leading-snug">{(item as any)[key]}</dd>
                      </div>
                    ) : null
                  )}
                </dl>
              </div>
            </StaggerItem>

            <StaggerItem>
              <PurchaseOptions productName={item.model} productSpecs={[item.chip, item.storage, (item as any).extra].filter(Boolean).join(" · ")} />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <Footer />
    </main>
  );
}