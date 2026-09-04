"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[#fbfbfd] dark:bg-black overflow-hidden flex flex-col items-center justify-center">
      <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 max-w-4xl mx-auto w-full pt-20 sm:pt-24 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-both">
        <p className="text-[11px] sm:text-xs font-semibold text-[#005cbf] dark:text-[#2997ff] mb-4 sm:mb-5 tracking-[0.18em] uppercase">
          Nuevo ingreso
        </p>

        <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 text-[#1d1d1f] dark:text-white tracking-tight leading-[1.07]">
          La mejor tecnología,<br className="hidden sm:block" />{" "}ahora en Perú.
        </h1>

        <p className="text-base sm:text-lg md:text-xl font-medium text-[#6e6e73] dark:text-[#86868b] mb-9 sm:mb-11 max-w-xl mx-auto leading-relaxed">
          Importamos directamente desde Estados Unidos. Garantía total, los últimos modelos y seguridad en tu compra.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
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
        </div>
      </div>
    </section>
  );
}