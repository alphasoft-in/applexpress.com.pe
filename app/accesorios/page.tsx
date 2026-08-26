"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ACCESSORIES } from "@/lib/data";

function AccessoryCard({ accessory, idx }: { accessory: any; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl shadow-brand/5 border border-slate-200 dark:border-slate-800 flex flex-col hover:border-brand/40 transition-colors group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
      
      {/* Image Area */}
      <div className="w-full h-56 mb-6 relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4">
        <img 
          src={accessory.image}
          alt={accessory.model}
          className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{accessory.model}</h3>
        {accessory.extra && <span className="inline-block mt-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold">{accessory.extra}</span>}
      </div>
      
      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
        {accessory.price}
      </div>

      <div className="mt-auto pt-2 flex flex-col gap-3">
        <Link 
          href={`/accesorios/${accessory.slug}`}
          className="w-full block text-center bg-brand text-white py-3.5 rounded-xl font-semibold hover:bg-brand-hover transition-all duration-300 shadow-md shadow-brand/20"
        >
          Ver características
        </Link>
        <a 
          href={`https://wa.me/51982848503?text=Hola,%20me%20interesa%20el%20${encodeURIComponent(accessory.model)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 py-3.5 rounded-xl font-semibold transition-all duration-300"
        >
          Me interesa
        </a>
      </div>
    </motion.div>
  );
}

export default function AccessoriesPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] dark:bg-black pt-32">
      <Navbar />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Accesorios
            </h1>
            <span className="text-4xl">🔌</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            Todo lo que necesitas para sacarle el máximo provecho a tus dispositivos Apple.
          </motion.p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACCESSORIES.map((accessory, idx) => (
            <AccessoryCard key={idx} accessory={accessory} idx={idx} />
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-neutral-500">
          <p>Los equipos están sujetos a disponibilidad. Contáctanos por WhatsApp para confirmar stock y gestionar tu compra.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
