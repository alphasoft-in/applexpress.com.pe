import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeader } from "@/components/CategoryHeader";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // 1 minute cache

export const metadata: Metadata = {
  title: "MacBook Pro en Perú | Importado de EE.UU.",
  description: "Compra MacBook Pro M1, M2, M3 importado directamente desde Estados Unidos. Stock disponible en Lima. Garantia incluida. Envio a todo el Peru.",
  keywords: ["MacBook Pro Peru", "MacBook M1 Peru", "MacBook M2 Peru", "MacBook M3 Peru", "MacBook Lima"],
  alternates: { canonical: "https://applexpress-com-pe.vercel.app/mac" },
  openGraph: {
    title: "MacBook Pro en Perú | Importado de EE.UU. | Apple Express",
    description: "Compra MacBook Pro M1, M2, M3 importado directamente desde Estados Unidos. Stock disponible en Lima. Garantia incluida. Envio a todo el Peru.",
    url: "https://applexpress-com-pe.vercel.app/mac",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default async function MacPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", "mac")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <Navbar />
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[980px] mx-auto">
        <CategoryHeader
          eyebrow="Importados desde EE.UU."
          title="MacBook Pro"
          subtitle="Superpotencia para pros. Catalogo exclusivo importado directamente desde Estados Unidos."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {products?.map((item, idx) => (
            <ProductCard
              key={item.id} idx={idx}
              name={item.model}
              specs={[item.processor, item.memory, item.storage].filter(Boolean).join(" · ")}
              price={item.price}
              image={item.image}
              href={`/mac/${item.slug}`}
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
