"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PRODUCTS = [
  {
    id: "macbook-air",
    title: "MacBook Air",
    subtitle: "Súper ligero. Súper chip M3.",
    theme: "light",
    href: "/macbook-air",
    className: "md:col-span-2 h-[500px]",
    bgClass: "bg-[#fbfbfd]", // Light gray background
  },
  {
    id: "ipad-pro",
    title: "iPad Pro",
    subtitle: "Increíblemente fino. Pantalla Ultra Retina XDR.",
    theme: "dark",
    href: "/ipad-pro",
    className: "md:col-span-1 h-[500px]",
    bgClass: "bg-black",
  },
  {
    id: "watch-s9",
    title: "Apple Watch Series 9",
    subtitle: "Más inteligente. Más brillante. Más poderoso.",
    theme: "dark",
    href: "/watch-series-9",
    className: "md:col-span-1 h-[500px]",
    bgClass: "bg-[#111111]",
  },
  {
    id: "airpods-pro",
    title: "AirPods Pro",
    subtitle: "Magia remasterizada.",
    theme: "light",
    href: "/airpods-pro",
    className: "md:col-span-2 h-[500px]",
    bgClass: "bg-white",
  },
];

export function ProductGrid() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Lo más vendido</h2>
        <p className="text-slate-500 mt-2">Encuentra los equipos favoritos de nuestros clientes.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-brand/5 hover:border-brand/30 transition-all flex flex-col h-full"
          >
            {/* Image Placeholder */}
            <div className="w-full aspect-square bg-slate-50 dark:bg-slate-800 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                <span className="text-xs text-slate-400">Imagen</span>
                <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {product.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1">
                {product.subtitle}
              </p>
              
              <Link
                href={product.href}
                className="w-full py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-brand hover:text-white dark:hover:bg-brand dark:hover:text-white transition-colors text-center text-sm flex items-center justify-center gap-2"
              >
                Ver Detalles <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
