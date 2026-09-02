import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeader } from "@/components/CategoryHeader";
import { IPADS } from "@/lib/data";

export const metadata: Metadata = {
  title: "iPad en Peru | Importado de EE.UU.",
  description: "iPad, iPad Air y iPad Pro con chip M1 y M2 importados desde Estados Unidos. Con garantia y envio a todo el Peru.",
  keywords: ["iPad Peru", "iPad Pro Peru", "iPad Air Peru", "iPad Lima", "comprar iPad Peru"],
  alternates: { canonical: "https://applexpress-com-pe.vercel.app/ipad" },
  openGraph: {
    title: "iPad en Peru | Apple Express",
    description: "iPad, iPad Air y iPad Pro M1/M2 importados de EE.UU. Envio a todo el Peru.",
    url: "https://applexpress-com-pe.vercel.app/ipad",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function IPadPage() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <Navbar />
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[980px] mx-auto">
        <CategoryHeader
          eyebrow="Importados desde EE.UU."
          title="iPad"
          subtitle="Versatilidad sin limites. La pantalla perfecta para crear, estudiar y trabajar."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {IPADS.map((item, idx) => (
            <ProductCard key={idx} idx={idx} name={item.model}
              specs={[item.chip, item.storage, item.screen].filter(Boolean).join(" · ")}
              price={item.price} image={item.image}
              href={`/ipad/${item.slug}`}
              waLink={`https://wa.me/51934288165?text=Hola,%20me%20interesa%20el%20${encodeURIComponent(item.model)}`}
              badge={(item as any).extra} stock={(item as any).stock} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}