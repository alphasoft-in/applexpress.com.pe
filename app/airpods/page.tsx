import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeader } from "@/components/CategoryHeader";
import { AIRPODS } from "@/lib/data";

export const metadata: Metadata = {
  title: "AirPods en Peru | Importados de EE.UU.",
  description: "AirPods 2da gen, AirPods 3ra gen, AirPods Pro y AirPods Max importados desde Estados Unidos. Con garantia. Envio a todo el Peru.",
  keywords: ["AirPods Peru", "AirPods Pro Peru", "AirPods Max Peru", "audifonos Apple Peru"],
  alternates: { canonical: "https://applexpress.com.pe/airpods" },
  openGraph: {
    title: "AirPods en Peru | Apple Express",
    description: "AirPods, AirPods Pro y AirPods Max importados de EE.UU. Con garantia. Envio a todo el Peru.",
    url: "https://applexpress.com.pe/airpods",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function AirPodsPage() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <Navbar />
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[980px] mx-auto">
        <CategoryHeader
          eyebrow="Importados desde EE.UU."
          title="AirPods"
          subtitle="Sonido que te envuelve. Experiencia de audio premium en cada escucha."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {AIRPODS.map((item, idx) => (
            <ProductCard key={idx} idx={idx} name={item.model}
              specs={[(item as any).chip, (item as any).audio, item.battery].filter(Boolean).join(" · ")}
              price={item.price} image={item.image}
              href={`/airpods/${item.slug}`}
              waLink={`https://wa.me/51934288165?text=Hola,%20me%20interesan%20los%20${encodeURIComponent(item.model)}`}
              badge={(item as any).extra} stock={(item as any).stock} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}