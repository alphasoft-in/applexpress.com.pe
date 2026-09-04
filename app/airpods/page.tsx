import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeader } from "@/components/CategoryHeader";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // 1 minute cache

export const metadata: Metadata = {
  title: "AirPods Pro y Max en Perú | Importado de EE.UU.",
  description: "Compra AirPods Pro 2, AirPods Max importados de USA. Stock en Lima. Garantia incluida.",
  keywords: ["AirPods Pro Peru", "AirPods Max Peru", "Comprar AirPods Lima", "AirPods importados Peru"],
  alternates: { canonical: "https://appleexpress.com.pe/airpods" },
  openGraph: {
    title: "AirPods Pro y Max en Perú | Importado de EE.UU. | Apple Express",
    description: "Compra AirPods Pro 2, AirPods Max importados de USA. Stock en Lima. Garantia incluida.",
    url: "https://appleexpress.com.pe/airpods",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default async function AirpodsPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", "airpods")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <Navbar />
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[980px] mx-auto">
        <CategoryHeader
          eyebrow="Importados desde EE.UU."
          title="AirPods"
          subtitle="Magia para tus oídos. Audio de alta fidelidad."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {products?.map((item, idx) => (
            <ProductCard
              key={item.id} idx={idx}
              name={item.model}
              specs={[item.processor, item.features, item.connectivity].filter(Boolean).join(" · ")}
              price={item.price}
              image={item.image}
              href={`/airpods/${item.slug}`}
              waLink={`https://wa.me/51934288165?text=Hola,%20me%20interesa%20la%20${encodeURIComponent(item.model)}`}
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
