const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  {
    id: 'mac',
    title: 'MacBook Pro en Peru | Importado de EE.UU.',
    description: 'Compra MacBook Pro M1, M2, M3 importado directamente desde Estados Unidos. Stock disponible en Lima. Garantia incluida. Envio a todo el Peru.',
    keywords: '["MacBook Pro Peru", "MacBook M1 Peru", "MacBook M2 Peru", "MacBook M3 Peru", "MacBook Lima"]',
    eyebrow: 'Importados desde EE.UU.',
    catTitle: 'MacBook Pro',
    catSubtitle: 'Superpotencia para pros. Catalogo exclusivo importado directamente desde Estados Unidos.',
    specs: '[item.processor, item.memory, item.storage]',
  },
  {
    id: 'iphone',
    title: 'iPhone 15 y 16 en Peru | Importado de EE.UU.',
    description: 'Compra iPhone 15 Pro, 15 Pro Max, 16 Pro importados de USA. Stock en Lima. Garantia incluida.',
    keywords: '["iPhone 15 Peru", "iPhone 16 Peru", "Comprar iPhone Lima", "iPhone importado Peru"]',
    eyebrow: 'Importados desde EE.UU.',
    catTitle: 'iPhone',
    catSubtitle: 'Diseñados para brillar. Stock exclusivo de los modelos mas recientes.',
    specs: '[item.processor, item.memory, item.storage]',
  },
  {
    id: 'ipad',
    title: 'iPad Pro y Air en Peru | Importado de EE.UU.',
    description: 'Compra iPad Pro M2, iPad Air importados de USA. Stock en Lima. Garantia incluida.',
    keywords: '["iPad Pro Peru", "iPad Air Peru", "Comprar iPad Lima", "iPad importado Peru"]',
    eyebrow: 'Importados desde EE.UU.',
    catTitle: 'iPad',
    catSubtitle: 'Toca, dibuja, crea. La tableta más avanzada del mundo.',
    specs: '[item.processor, item.storage, item.screen]',
  },
  {
    id: 'watch',
    title: 'Apple Watch Ultra y Series 9 en Peru | Importado de EE.UU.',
    description: 'Compra Apple Watch Ultra 2, Series 9 importados de USA. Stock en Lima. Garantia incluida.',
    keywords: '["Apple Watch Peru", "Watch Ultra Peru", "Comprar Apple Watch Lima", "Watch importado Peru"]',
    eyebrow: 'Importados desde EE.UU.',
    catTitle: 'Apple Watch',
    catSubtitle: 'El futuro de la salud en tu muñeca.',
    specs: '[item.processor, item.screen, item.extra]',
  },
  {
    id: 'airpods',
    title: 'AirPods Pro y Max en Peru | Importado de EE.UU.',
    description: 'Compra AirPods Pro 2, AirPods Max importados de USA. Stock en Lima. Garantia incluida.',
    keywords: '["AirPods Pro Peru", "AirPods Max Peru", "Comprar AirPods Lima", "AirPods importados Peru"]',
    eyebrow: 'Importados desde EE.UU.',
    catTitle: 'AirPods',
    catSubtitle: 'Magia para tus oídos. Audio de alta fidelidad.',
    specs: '[item.processor, item.features, item.connectivity]',
  },
  {
    id: 'accesorios',
    title: 'Accesorios Originales Apple en Peru',
    description: 'Compra Apple Pencil, Magic Keyboard, MagSafe originales e importados de USA. Stock en Lima.',
    keywords: '["Accesorios Apple Peru", "Apple Pencil Peru", "Magic Keyboard Peru", "Cargador Apple Lima"]',
    eyebrow: 'Originales',
    catTitle: 'Accesorios',
    catSubtitle: 'El complemento perfecto para tus dispositivos.',
    specs: '[item.type, item.compatibility, item.connectivity]',
  }
];

function generateListPage(cat) {
  return `import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeader } from "@/components/CategoryHeader";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // 1 minute cache

export const metadata: Metadata = {
  title: "${cat.title}",
  description: "${cat.description}",
  keywords: ${cat.keywords},
  alternates: { canonical: "https://applexpress-com-pe.vercel.app/${cat.id}" },
  openGraph: {
    title: "${cat.title} | Apple Express",
    description: "${cat.description}",
    url: "https://applexpress-com-pe.vercel.app/${cat.id}",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default async function ${cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}Page() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", "${cat.id}")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <Navbar />
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[980px] mx-auto">
        <CategoryHeader
          eyebrow="${cat.eyebrow}"
          title="${cat.catTitle}"
          subtitle="${cat.catSubtitle}"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {products?.map((item, idx) => (
            <ProductCard
              key={item.id} idx={idx}
              name={item.model}
              specs={${cat.specs}.filter(Boolean).join(" · ")}
              price={item.price}
              image={item.image}
              href={\`/${cat.id}/\${item.slug}\`}
              waLink={\`https://wa.me/51934288165?text=Hola,%20me%20interesa%20la%20\${encodeURIComponent(item.model)}\`}
              badge={item.extra}
              stock={item.stock}
            />
          ))}
          {(!products || products.length === 0) && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No hay productos disponibles en esta categoría por el momento.
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
`;
}

function generateDetailPage(cat) {
  return `import { supabase } from "@/lib/supabase";
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
  const { data: products } = await supabase.from("products").select("slug").eq("category", "${cat.id}");
  return products?.map((p) => ({ slug: p.slug })) || [];
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const { data: item } = await supabase.from("products").select("*").eq("slug", slug).single();
  if (!item) return {};

  const specs = ${cat.specs}.filter(Boolean).join(", ");
  const title = \`\${item.model} \${specs} en Peru\`.trim();
  const description = \`Compra \${item.model} con \${specs} importado desde EE.UU. \${item.price}. Garantia incluida. Envio a todo el Peru.\`;

  return {
    title,
    description,
    alternates: { canonical: \`https://applexpress-com-pe.vercel.app/${cat.id}/\${slug}\` },
    openGraph: {
      title: \`\${title} | Apple Express Peru\`,
      description,
      url: \`https://applexpress-com-pe.vercel.app/${cat.id}/\${slug}\`,
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

  const priceRaw = item.price.replace(/[^\\d]/g, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.model,
    description: \`\${item.model} importado desde EE.UU.\`,
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
            href="/${cat.id}"
            className="group inline-flex items-center gap-1.5 text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white transition-colors mb-8 sm:mb-10 capitalize"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 duration-200" />
            ${cat.catTitle}
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
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
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
                  <span className={\`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider \${item.stock > 0 ? "bg-[#0071e3]/10 text-[#0071e3]" : "bg-red-100 text-red-600"}\`}>
                    {item.stock > 0 ? \`Stock: \${item.stock} unidades\` : "Agotado"}
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
              <PurchaseOptions productName={item.model} productSpecs={${cat.specs}.filter(Boolean).join(" · ")} />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
      <Footer />
    </main>
  );
}
`;
}

CATEGORIES.forEach(cat => {
  const dir = path.join(__dirname, '..', 'app', cat.id);
  const slugDir = path.join(dir, '[slug]');
  
  // Make dirs if they don't exist
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(slugDir)) fs.mkdirSync(slugDir, { recursive: true });

  fs.writeFileSync(path.join(dir, 'page.tsx'), generateListPage(cat));
  fs.writeFileSync(path.join(slugDir, 'page.tsx'), generateDetailPage(cat));
  console.log(`Actualizado ${cat.id} y ${cat.id}/[slug]`);
});
