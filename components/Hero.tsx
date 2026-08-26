"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[85vh] w-full bg-white dark:bg-black overflow-hidden flex flex-col items-center justify-center pt-32">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/10 blur-[100px] rounded-full"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block py-1 px-3 rounded-full bg-brand/10 text-brand font-semibold text-sm mb-4 border border-brand/20"
        >
          Nuevo Ingreso
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight"
        >
          La mejor tecnología, <br/> ahora en Perú
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto"
        >
          Importamos directamente de Estados Unidos. Garantía total, seguridad en tu compra y los últimos modelos disponibles.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link 
            href="/mac" 
            className="bg-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-hover transition-colors shadow-lg shadow-brand/25 flex items-center gap-2"
          >
            Ver MacBooks <ArrowRight className="w-5 h-5" />
          </Link>
          <a 
            href="https://wa.me/51982848503?text=Hola,%20vengo%20de%20la%20web%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Contáctanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
