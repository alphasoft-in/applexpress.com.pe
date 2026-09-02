import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeader } from "@/components/CategoryHeader";
import { ACCESSORIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Accesorios Apple en Peru | Originales importados de EE.UU.",
  description: "Apple Pencil, Magic Keyboard, MagSafe y mas accesorios originales importados desde Estados Unidos. Con garantia. Envio a todo el Peru.",
  keywords: ["accesorios Apple Peru", "Apple Pencil Peru", "MagSafe Peru", "Magic Keyboard Peru"],
  alternates: { canonical: "https://applexpress-com-pe.vercel.app/accesorios" },
  openGraph: {
    title: "Accesorios Apple en Peru | Apple Express",
    description: "Apple Pencil, MagSafe, Magic Keyboard originales importados de EE.UU. Con garantia.",
    url: "https://applexpress-com-pe.vercel.app/accesorios",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function AccesoriosPage() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <Navbar />
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[980px] mx-auto">
        <CategoryHeader
          eyebrow="Originales Apple"
          title="Accesorios"
          subtitle="Complementa tu experiencia Apple con accesorios originales importados directamente."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {ACCESSORIES.map((item, idx) => (
            <ProductCard key={idx} idx={idx} name={item.model}
              specs={[(item as any).type, (item as any).compatibility].filter(Boolean).join(" · ")}
              price={item.price} image={item.image}
              href={`/accesorios/${item.slug}`}
              waLink={`https://wa.me/51934288165?text=Hola,%20me%20interesa%20el%20${encodeURIComponent(item.model)}`}
              badge={(item as any).extra} stock={(item as any).stock} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}