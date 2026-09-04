"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const GRID_STYLES = [
  { colSpan: "md:col-span-2", bgClass: "bg-[#fbfbfd]", theme: "light" },
  { colSpan: "md:col-span-1", bgClass: "bg-black", theme: "dark" },
  { colSpan: "md:col-span-1", bgClass: "bg-[#111111]", theme: "dark" },
  { colSpan: "md:col-span-2", bgClass: "bg-white", theme: "light" },
];

export function ProductGrid({ initialProducts = [] }: { initialProducts?: any[] }) {
  // Solo mostramos hasta 4 productos para mantener el diseño del grid
  const displayProducts = initialProducts.slice(0, 4);

  if (displayProducts.length === 0) return null;

  return (
    <section className="w-full px-3 sm:px-4 py-8 sm:py-12 lg:py-16 bg-white dark:bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {displayProducts.map((product, index) => {
          const style = GRID_STYLES[index % GRID_STYLES.length];
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.0, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "group relative overflow-hidden rounded-2xl sm:rounded-[2rem] flex flex-col items-center",
                "h-[380px] sm:h-[440px] md:h-[500px] lg:h-[540px]",
                "transition-transform hover:scale-[1.01] duration-500",
                style.bgClass,
                style.colSpan
              )}
            >
              {/* Text at top - Fixed size */}
              <div className={cn(
                "relative z-10 text-center pt-8 sm:pt-10 px-4 sm:px-8 shrink-0",
                style.theme === "dark" ? "text-white" : "text-[#1d1d1f]"
              )}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  {product.model}
                </h2>
                {product.extra && (
                  <p className={cn(
                    "text-sm sm:text-base md:text-lg mb-4 sm:mb-5 font-medium",
                    style.theme === "dark" ? "text-[#86868b]" : "text-[#6e6e73]"
                  )}>
                    {product.extra}
                  </p>
                )}
                <Link
                  href={`/${product.category}/${product.slug}`}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200",
                    "backdrop-blur-md border",
                    style.theme === "dark"
                      ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      : "bg-black/5 text-[#1d1d1f] border-black/10 hover:bg-black/10"
                  )}
                >
                  Comprar <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Image - Fills remaining space, anchored to bottom */}
              <div className="relative w-full flex-1 mt-4 sm:mt-6">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.model}
                    fill
                    priority={index < 2}
                    className="object-contain object-bottom group-hover:scale-105 transition-transform duration-700 ease-out p-4 sm:p-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}