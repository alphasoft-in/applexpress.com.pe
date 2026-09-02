import { MACBOOKS } from "@/lib/data";
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
  return MACBOOKS.map((mac) => ({ slug: mac.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const mac = MACBOOKS.find((m) => m.slug === slug);
  if (!mac) return {};

  const specs = [mac.chip, mac.ram, mac.storage].filter(Boolean).join(", ");
  const title = `${mac.model} ${mac.chip || ""} ${mac.storage || ""} en Peru`.trim();
  const description = `Compra ${mac.model} con ${specs} importado desde EE.UU. ${mac.price}. Garantia incluida. Envio a todo el Peru.`;

  return {
    title,
    description,
    keywords: [`${mac.model} Peru`, `${mac.model} Lima`, `MacBook ${mac.chip} Peru`, "MacBook importado Peru"],
    alternates: { canonical: `https://applexpress-com-pe.vercel.app/mac/${slug}` },
    openGraph: {
      title: `${title} | Apple Express Peru`,
      description,
      url: `https://applexpress-com-pe.vercel.app/mac/${slug}`,
      images: mac.image.startsWith("http")
        ? [{ url: mac.image, width: 800, height: 600, alt: mac.model }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}


const SPECS_MAP = [
  { key: "chip",    label: "Chip" },
  { key: "ram",     label: "Memoria" },
  { key: "storage", label: "Almacenamiento" },
  { key: "screen",  label: "Pantalla" },
  { key: "battery", label: "Bateria" },
  { key: "ports",   label: "Puertos" },
];

const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default async function MacBookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const mac = MACBOOKS.find((m) => m.slug === resolvedParams.slug);
  if (!mac) notFound();

  const waHref = `https://wa.me/51934288165?text=Hola,%20quiero%20consultar%20sobre%20la%20${encodeURIComponent(mac.model)}`;

  const priceRaw = mac.price.replace(/[^\d]/g, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${mac.model} ${mac.chip || ""} ${mac.storage || ""}`.trim(),
    description: `${mac.model} con chip ${mac.chip || ""}, ${mac.ram || ""} RAM y ${mac.storage || ""} importado desde EE.UU.`,
    image: mac.image,
    brand: { "@type": "Brand", name: "Apple" },
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: priceRaw,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Apple Express Peru",
        url: "https://applexpress-com-pe.vercel.app",
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

        {/* Back link */}
        <FadeIn delay={0}>
          <Link
            href="/mac"
            className="group inline-flex items-center gap-1.5 text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white transition-colors mb-8 sm:mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 duration-200" />
            MacBook
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* Image */}
          <FadeIn delay={0.1} className="w-full md:sticky md:top-24">
            <div className="relative bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center aspect-[4/3] sm:aspect-square group">
              <Image
                src={mac.image}
                alt={mac.model}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
            </div>
          </FadeIn>

          {/* Details */}
          <StaggerContainer className="flex flex-col">

            {/* Badge */}
            {(mac as any).extra && (
              <StaggerItem>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[10px] font-semibold uppercase tracking-wider mb-3">
                  {(mac as any).extra}
                </span>
              </StaggerItem>
            )}

            {/* Title */}
            <StaggerItem>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white leading-tight mb-1">
                {mac.model}
              </h1>
            </StaggerItem>

            {/* Price & Stock */}
            <StaggerItem>
              <div className="mb-6 sm:mb-8">
                <p className="text-base sm:text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                  Desde {mac.price}
                </p>
                <div className="mt-2.5">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-semibold uppercase tracking-wider">
                    {(mac as any).stock ? `Stock: ${(mac as any).stock} unidades` : "Stock disponible"}
                  </span>
                </div>
              </div>
            </StaggerItem>

            {/* Specs */}
            <StaggerItem>
              <div className="border-t border-[#e8e8ed] dark:border-[#2a2a2a] pt-5 mb-6 sm:mb-8">
                <p className="text-[10px] font-semibold text-[#6e6e73] uppercase tracking-[0.15em] mb-4">
                  Especificaciones
                </p>
                <dl className="space-y-0 divide-y divide-[#f0f0f0] dark:divide-[#1e1e1e]">
                  {SPECS_MAP.map(({ key, label }) =>
                    (mac as any)[key] ? (
                      <div key={key} className="flex items-start gap-3 py-2.5">
                        <dt className="text-[12px] text-[#86868b] dark:text-[#6e6e73] w-[100px] sm:w-[110px] shrink-0 pt-px leading-snug">{label}</dt>
                        <dd className="text-[12px] sm:text-[13px] text-[#1d1d1f] dark:text-white leading-snug">{(mac as any)[key]}</dd>
                      </div>
                    ) : null
                  )}
                </dl>
              </div>
            </StaggerItem>

            {/* Purchase options with delivery selector */}
            <StaggerItem>
              <PurchaseOptions productName={mac.model} productSpecs={[mac.chip, mac.ram, mac.storage, (mac as any).extra].filter(Boolean).join(" · ")} />
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      <Footer />
    </main>
  );
}