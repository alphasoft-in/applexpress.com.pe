"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const INFO = [
  {
    Icon: MapPin,
    title: "Dirección",
    lines: ["Calle Oslo 198, Oficina 201", "Los Portales - Ate, Lima"],
  },
  {
    Icon: Phone,
    title: "Contacto",
    lines: ["982 848 503", "934 288 165"],
  },
  {
    Icon: Clock,
    title: "Horario",
    lines: ["Lun - Vie: 9:00 - 18:00", "Sábado: 9:00 - 13:00", "Domingo: Cerrado"],
  },
];

export function TiendaClient() {
  return (
    <>
      {/* Hero header */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 max-w-[980px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-[11px] sm:text-xs font-semibold text-[#6e6e73] uppercase tracking-[0.18em] mb-4"
        >
          Visita nuestro espacio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.06, ease }}
          className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1d1d1f] dark:text-white leading-tight mb-4 sm:mb-5"
        >
          Nuestra Tienda
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease }}
          className="text-base sm:text-lg md:text-xl text-[#6e6e73] dark:text-[#86868b] max-w-xl mx-auto font-medium leading-relaxed"
        >
          Visítanos para ver nuestros productos en persona y recibir asesoría experta sin compromiso.
        </motion.p>
      </section>

      {/* Info + Map grid */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-28 max-w-[980px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="bg-white dark:bg-[#111111] rounded-2xl sm:rounded-3xl border border-[#d2d2d7]/40 dark:border-[#2a2a2a] overflow-hidden"
          >
            <div className="px-7 sm:px-10 pt-8 sm:pt-10 pb-2">
              <p className="text-[10px] font-semibold text-[#6e6e73] uppercase tracking-[0.18em] mb-1">Sede</p>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] dark:text-white tracking-tight">Sede Principal</h2>
            </div>

            <div className="divide-y divide-[#f0f0f0] dark:divide-[#1e1e1e]">
              {INFO.map(({ Icon, title, lines }, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1, ease }}
                  className="flex items-start gap-4 px-7 sm:px-10 py-5 sm:py-6 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#f5f5f7] dark:bg-[#1d1d1f] border border-[#e8e8ed] dark:border-[#2a2a2a] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0071e3]/10 group-hover:border-[#0071e3]/20 transition-colors duration-200">
                    <Icon className="w-4 h-4 text-[#6e6e73] group-hover:text-[#0071e3] transition-colors duration-200" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wider mb-1">{title}</p>
                    {lines.map((line, i) => (
                      <p key={i} className="text-sm text-[#1d1d1f] dark:text-white font-medium leading-relaxed">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-7 sm:px-10 py-6 sm:py-8 border-t border-[#f0f0f0] dark:border-[#1e1e1e]">
              <a
                href="https://wa.me/51934288165?text=Hola,%20quiero%20coordinar%20una%20visita%20a%20la%20tienda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-[#0071e3] hover:bg-[#0077ed] text-white py-3 rounded-full text-sm font-semibold transition-colors duration-200"
              >
                Coordinar visita
              </a>
            </div>
          </motion.div>

          {/* Map card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="bg-white dark:bg-[#111111] rounded-2xl sm:rounded-3xl border border-[#d2d2d7]/40 dark:border-[#2a2a2a] overflow-hidden"
          >
            {/* Map placeholder with Apple Maps aesthetic */}
            <div className="h-56 sm:h-72 lg:h-80 bg-[#f5f5f7] dark:bg-[#1a1a1a] relative flex items-center justify-center">
              {/* Grid lines for map feel */}
              <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{ backgroundImage: 'linear-gradient(#d2d2d7 1px, transparent 1px), linear-gradient(90deg, #d2d2d7 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0071e3] shadow-lg shadow-[#0071e3]/30 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white dark:bg-[#1d1d1f] rounded-xl px-4 py-2 shadow-lg border border-[#d2d2d7]/40 dark:border-[#2a2a2a]">
                  <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">Apple Express</p>
                  <p className="text-[10px] text-[#6e6e73]">Calle Oslo 198, Ate</p>
                </div>
              </div>
            </div>

            <div className="px-7 sm:px-10 py-6 sm:py-8">
              <p className="text-sm text-[#1d1d1f] dark:text-white font-semibold mb-1">Calle Oslo 198, Oficina 201</p>
              <p className="text-xs text-[#6e6e73] mb-5">Los Portales - Ate, Lima, Perú</p>
              <a
                href="https://maps.google.com/?q=Calle+Oslo+198+Ate+Lima"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#0071e3] hover:text-[#0077ed] text-sm font-semibold hover:underline underline-offset-2 transition-colors duration-200"
              >
                Abrir en Google Maps &rarr;
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}