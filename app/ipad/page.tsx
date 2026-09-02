import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeader } from "@/components/CategoryHeader";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // 1 minute cache

export const metadata: Metadata = {
  title: "iPad Pro y Air en Perú | Importado de EE.UU.",
  description: "Compra iPad Pro M2, iPad Air importados de USA. Stock en Lima. Garantia incluida.",
  keywords: ["iPad Pro Peru", "iPad Air Peru", "Comprar iPad Lima", "iPad importado Peru"],
  alternates: { canonical: "https://applexpress-com-pe.vercel.app/ipad" },
  openGraph: {
    title: "iPad Pro y Air en Perú | Importado de EE.UU. | Apple Express",
    description: "Compra iPad Pro M2, iPad Air importados de USA. Stock en Lima. Garantia incluida.",
    url: "https://applexpress-com-pe.vercel.app/ipad",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default async function IpadPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", "ipad")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <Navbar />
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[980px] mx-auto">
        <CategoryHeader
          eyebrow="Importados desde EE.UU."
          title="iPad"
          subtitle="Toca, dibuja, crea. La tableta más avanzada del mundo."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {products?.map((item, idx) => (
            <ProductCard
              key={item.id} idx={idx}
              name={item.model}
              specs={[item.processor, item.storage, item.screen].filter(Boolean).join(" · ")}
              price={item.price}
              image={item.image}
              href={`/ipad/${item.slug}`}
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
