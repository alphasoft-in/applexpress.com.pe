import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeader } from "@/components/CategoryHeader";
import { MACBOOKS } from "@/lib/data";

export const metadata: Metadata = {
  title: "MacBook Pro en Peru | Importado de EE.UU.",
  description: "Compra MacBook Pro M1, M2, M3 importado directamente desde Estados Unidos. Stock disponible en Lima. Garantia incluida. Envio a todo el Peru.",
  keywords: ["MacBook Pro Peru", "MacBook M1 Peru", "MacBook M2 Peru", "MacBook M3 Peru", "MacBook Lima"],
  alternates: { canonical: "https://applexpress.com.pe/mac" },
  openGraph: {
    title: "MacBook Pro en Peru | Apple Express",
    description: "Stock de MacBook Pro M1, M2 y M3 importado desde EE.UU. Garantia y envio a todo el Peru.",
    url: "https://applexpress.com.pe/mac",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function MacPage() {
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
          {MACBOOKS.map((mac, idx) => (
            <ProductCard
              key={idx} idx={idx}
              name={mac.model}
              specs={[mac.chip, mac.ram, mac.storage].filter(Boolean).join(" · ")}
              price={mac.price}
              image={mac.image}
              href={`/mac/${mac.slug}`}
              waLink={`https://wa.me/51934288165?text=Hola,%20me%20interesa%20la%20${encodeURIComponent(mac.model)}%20${encodeURIComponent(mac.storage || "")}`}
              badge={(mac as any).extra}
            />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}