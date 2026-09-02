import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeader } from "@/components/CategoryHeader";
import { IPHONES } from "@/lib/data";

export const metadata: Metadata = {
  title: "iPhone en Peru | Importado de EE.UU.",
  description: "iPhone 14, iPhone 15 y iPhone 15 Pro importados directamente desde Estados Unidos. Desbloqueados, con garantia. Envio a todo el Peru.",
  keywords: ["iPhone Peru", "iPhone 15 Peru", "iPhone 15 Pro Peru", "iPhone Lima", "comprar iPhone Peru"],
  alternates: { canonical: "https://applexpress-com-pe.vercel.app/iphone" },
  openGraph: {
    title: "iPhone en Peru | Apple Express",
    description: "iPhone 14, 15 y 15 Pro importados de EE.UU. Desbloqueados, con garantia. Envio a todo el Peru.",
    url: "https://applexpress-com-pe.vercel.app/iphone",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function IPhonePage() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <Navbar />
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[980px] mx-auto">
        <CategoryHeader
          eyebrow="Importados desde EE.UU."
          title="iPhone"
          subtitle="Poder en tus manos. Encuentra el modelo ideal para ti con la mejor garantia."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {IPHONES.map((item, idx) => (
            <ProductCard key={idx} idx={idx} name={item.model}
              specs={[item.chip, item.storage].filter(Boolean).join(" · ")}
              price={item.price} image={item.image}
              href={`/iphone/${item.slug}`}
              waLink={`https://wa.me/51934288165?text=Hola,%20me%20interesa%20el%20${encodeURIComponent(item.model)}`}
              badge={(item as any).extra} stock={(item as any).stock} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}