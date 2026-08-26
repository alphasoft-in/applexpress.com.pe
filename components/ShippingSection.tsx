"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h4l3 4v4h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    number: "01",
    title: "Envios a todo el Peru",
    description: "Coordinamos el envio seguro a cualquier ciudad del pais. Embalaje profesional, seguimiento en tiempo real.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
    number: "02",
    title: "Entrega Personalizada",
    description: "Acordamos contigo el lugar y la hora que mejor te convienen. Flexibilidad total en la coordinacion.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    number: "03",
    title: "Retiro en Tienda",
    description: "Recoge tu producto de inmediato. Verificamos contigo cada detalle antes de que te lo lleves.",
  },
];

export function ShippingSection() {
  return (
    <section className="bg-[#000000] py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-[980px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-[11px] sm:text-xs font-semibold text-[#6e6e73] uppercase tracking-[0.2em] mb-5 sm:mb-6"
          >
            Metodos de entrega
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.06, ease }}
            className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            Tu compra, a tu manera.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#6e6e73] max-w-xl mx-auto leading-relaxed"
          >
            Elegimos el metodo que mas te conviene para que recibas tu producto con total confianza.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2a2a2a] rounded-2xl sm:rounded-3xl overflow-hidden">
          {services.map(({ icon, number, title, description }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease }}
              className="group bg-[#111111] px-7 sm:px-8 py-8 sm:py-10 flex flex-col gap-0 hover:bg-[#161616] transition-colors duration-300"
            >
              {/* Icon + number row */}
              <div className="flex items-center justify-between mb-7 sm:mb-8">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1d1d1f] border border-[#2a2a2a] flex items-center justify-center text-[#98989d] group-hover:text-white group-hover:border-[#3a3a3a] transition-all duration-300">
                  {icon}
                </div>
                <span className="text-[#3a3a3a] text-xs font-mono tracking-widest group-hover:text-[#4a4a4a] transition-colors">
                  {number}
                </span>
              </div>

              {/* Text */}
              <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-2 sm:mb-3 leading-snug">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="text-center mt-10 sm:mt-12"
        >
          <p className="text-[#6e6e73] text-xs sm:text-sm mb-2">
            Tienes dudas sobre el envio?
          </p>
          <a
            href="https://wa.me/51934288165?text=Hola,%20tengo%20una%20consulta%20sobre%20los%20metodos%20de%20entrega"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#2997ff] underline underline-offset-2 transition-colors duration-200 font-medium text-xs sm:text-sm"
          >
            Hablemos por WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  );
}