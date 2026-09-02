import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeader } from "@/components/CategoryHeader";
import { WATCHES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Apple Watch en Peru | Importado de EE.UU.",
  description: "Apple Watch SE, Series 9 y Ultra 2 importados desde Estados Unidos. Con garantia. Envio a todo el Peru desde Lima.",
  keywords: ["Apple Watch Peru", "Apple Watch SE Peru", "Apple Watch Series 9 Peru", "Apple Watch Ultra Peru"],
  alternates: { canonical: "https://applexpress-com-pe.vercel.app/watch" },
  openGraph: {
    title: "Apple Watch en Peru | Apple Express",
    description: "Apple Watch SE, Series 9 y Ultra 2 importados de EE.UU. Con garantia. Envio a todo el Peru.",
    url: "https://applexpress-com-pe.vercel.app/watch",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function WatchPage() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <Navbar />
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[980px] mx-auto">
        <CategoryHeader
          eyebrow="Importados desde EE.UU."
          title="Apple Watch"
          subtitle="Tu salud, tu deporte, tu vida. El reloj inteligente mas avanzado del mundo."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {WATCHES.map((item, idx) => (
            <ProductCard key={idx} idx={idx} name={item.model}
              specs={[(item as any).chip, (item as any).size, item.battery].filter(Boolean).join(" · ")}
              price={item.price} image={item.image}
              href={`/watch/${item.slug}`}
              waLink={`https://wa.me/51934288165?text=Hola,%20me%20interesa%20el%20${encodeURIComponent(item.model)}`}
              badge={(item as any).extra} stock={(item as any).stock} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}