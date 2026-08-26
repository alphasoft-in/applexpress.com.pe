"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { motion, useScroll, useTransform } from "framer-motion";
import { MACBOOKS } from "@/lib/data";
import { useRef } from "react";

export default function MacPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <Navbar />

      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[980px] mx-auto">
        <motion.div ref={headerRef} style={{ y, opacity }} className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            className="text-[11px] sm:text-xs font-semibold text-[#6e6e73] uppercase tracking-[0.18em] mb-4"
          >
            Importados desde EE.UU.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.06, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1d1d1f] dark:text-white leading-tight mb-4 sm:mb-5"
          >
            MacBook Pro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            className="text-base sm:text-lg md:text-xl text-[#6e6e73] dark:text-[#86868b] max-w-xl mx-auto font-medium leading-relaxed"
          >
            Superpotencia para pros. Catálogo exclusivo importado directamente desde Estados Unidos.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {MACBOOKS.map((mac, idx) => (
            <ProductCard
              key={idx}
              idx={idx}
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