"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

const MACBOOKS = [
  {
    model: "MacBook Pro 13\"",
    chip: "M1 2020",
    ram: "16GB",
    storage: "256GB SSD",
    price: "S/. 2,299",
  },
  {
    model: "MacBook Pro 13\"",
    chip: "M1 2020",
    ram: "16GB",
    storage: "512GB SSD",
    price: "S/. 2,499",
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M1 2021",
    ram: "16GB",
    storage: "512GB SSD",
    price: "S/. 3,299",
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M1 2021",
    ram: "16GB",
    storage: "1TB SSD",
    price: "S/. 3,499",
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M1 2021",
    ram: "32GB",
    storage: "1TB SSD",
    price: "S/. 4,299",
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M1 Max 2021",
    ram: "32GB",
    storage: "1TB SSD",
    extra: "32 Núcleos",
    price: "S/. 5,299",
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M2 2023",
    ram: "16GB",
    storage: "512GB SSD",
    price: "S/. 4,299",
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M2 2023",
    ram: "32GB",
    storage: "512GB SSD",
    price: "S/. 5,199",
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M3 2024",
    ram: "36GB",
    storage: "1TB SSD",
    price: "S/. 6,999",
  },
];

export default function MacPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] dark:bg-black pt-32">
      <Navbar />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white">
              MacBook Pro
            </h1>
            <span className="text-4xl">🇺🇸</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            Superpotencia para pros. Descubre nuestro catálogo exclusivo importado de Estados Unidos.
          </motion.p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MACBOOKS.map((mac, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl shadow-brand/5 border border-slate-200 dark:border-slate-800 flex flex-col hover:border-brand/40 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{mac.model}</h3>
                {mac.extra && <span className="inline-block mt-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold">{mac.extra}</span>}
              </div>
              
              <div className="space-y-4 flex-1 mb-8">
                <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-slate-500">Procesador</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">{mac.chip}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-slate-500">Memoria RAM</span>
                  <span className="font-medium text-slate-900 dark:text-slate-200">{mac.ram}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-slate-500">Almacenamiento</span>
                  <span className="font-medium text-slate-900 dark:text-slate-200">{mac.storage}</span>
                </div>
              </div>

              <div className="mt-auto">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {mac.price}
                </div>
                <button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-brand group-hover:text-white py-3.5 rounded-xl font-semibold transition-all duration-300">
                  Me interesa
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-neutral-500">
          <p>Los equipos están sujetos a disponibilidad. Contáctanos por WhatsApp para confirmar stock y gestionar tu compra.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
