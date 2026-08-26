"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const MACBOOKS = [
  {
    model: "MacBook Pro 13\"",
    chip: "M1 2020",
    ram: "16GB",
    storage: "256GB SSD",
    price: "S/. 2,299",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  },
  {
    model: "MacBook Pro 13\"",
    chip: "M1 2020",
    ram: "16GB",
    storage: "512GB SSD",
    price: "S/. 2,499",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M1 2021",
    ram: "16GB",
    storage: "512GB SSD",
    price: "S/. 3,299",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M1 2021",
    ram: "16GB",
    storage: "1TB SSD",
    price: "S/. 3,499",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M1 2021",
    ram: "32GB",
    storage: "1TB SSD",
    price: "S/. 4,299",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M1 Max 2021",
    ram: "32GB",
    storage: "1TB SSD",
    extra: "32 Núcleos",
    price: "S/. 5,299",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M2 2023",
    ram: "16GB",
    storage: "512GB SSD",
    price: "S/. 4,299",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M2 2023",
    ram: "32GB",
    storage: "512GB SSD",
    price: "S/. 5,199",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  },
  {
    model: "MacBook Pro 16\"",
    chip: "M3 2024",
    ram: "36GB",
    storage: "1TB SSD",
    price: "S/. 6,999",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  },
];

function MacBookCard({ mac, idx }: { mac: any; idx: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl shadow-brand/5 border border-slate-200 dark:border-slate-800 flex flex-col hover:border-brand/40 transition-colors group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
      
      {/* Image Area */}
      <div className="w-full h-48 mb-6 relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        {/* Usamos img en lugar de next/image temporalmente para no bloquear por dominios no configurados en next.config */}
        <img 
          src={mac.image}
          alt={mac.model}
          className="object-cover w-full h-full mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{mac.model}</h3>
        {mac.extra && <span className="inline-block mt-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold">{mac.extra}</span>}
      </div>
      
      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
        {mac.price}
      </div>

      {/* Expand/Collapse Toggle */}
      <button 
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-sm font-semibold text-slate-600 dark:text-slate-300 mb-4 hover:text-brand transition-colors"
      >
        <span>{expanded ? "Ocultar características" : "Ver características"}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Expandable Specifications */}
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 mb-6 overflow-hidden"
          >
            <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-3 pt-2">
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
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto pt-2">
        <button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-brand group-hover:text-white py-3.5 rounded-xl font-semibold transition-all duration-300">
          Me interesa
        </button>
      </div>
    </motion.div>
  );
}

export default function MacPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MACBOOKS.map((mac, idx) => (
            <MacBookCard key={idx} mac={mac} idx={idx} />
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
