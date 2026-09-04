"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const ease: [number,number,number,number] = [0.16, 1, 0.3, 1];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY  = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]);
  const textOp = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen bg-[#fbfbfd] dark:bg-black overflow-hidden flex flex-col items-center justify-center"
    >
      <motion.div
        style={{ y: textY, opacity: textOp }}
        className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 max-w-4xl mx-auto w-full pt-20 sm:pt-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="text-[11px] sm:text-xs font-semibold text-[#005cbf] dark:text-[#2997ff] mb-4 sm:mb-5 tracking-[0.18em] uppercase"
        >
          Nuevo ingreso
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease }}
          className="text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 text-[#1d1d1f] dark:text-white tracking-tight leading-[1.07]"
        >
          La mejor tecnología,<br className="hidden sm:block" />{" "}ahora en Perú.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.16, ease }}
          className="text-base sm:text-lg md:text-xl font-medium text-[#6e6e73] dark:text-[#86868b] mb-9 sm:mb-11 max-w-xl mx-auto leading-relaxed"
        >
          Importamos directamente desde Estados Unidos. Garantía total, los últimos modelos y seguridad en tu compra.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.24, ease }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Link
            href="/mac"
            className="w-full sm:w-auto text-center bg-[#1d1d1f] dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-black dark:hover:bg-[#e8e8ed] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Ver MacBooks
          </Link>
          <a
            href="https://wa.me/51934288165?text=Hola,%20vengo%20de%20la%20web%20y%20me%20gustaria%20mas%20Información"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center bg-transparent text-[#1d1d1f] dark:text-white px-8 py-3.5 rounded-full font-semibold text-sm border border-[#1d1d1f]/25 dark:border-white/25 hover:border-[#1d1d1f]/60 dark:hover:border-white/50 transition-all duration-200"
          >
            Contáctanos
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}