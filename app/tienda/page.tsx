"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export default function TiendaPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32">
      <Navbar />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4"
          >
            Nuestra Tienda Física
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Visítanos para conocer nuestros productos en persona, recibir asesoría experta y realizar tus compras con total seguridad.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Store Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl shadow-brand/5 border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Sede Principal</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand/10 text-brand rounded-xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Dirección</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      Calle Oslo 198<br/>
                      Oficina 201, Los Portales - Ate<br/>
                      Lima, Perú
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand/10 text-brand rounded-xl">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Teléfonos</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      982 848 503<br/>
                      934 288 165
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand/10 text-brand rounded-xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Horario de Atención</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      Lunes a Viernes: 9:00 AM - 6:00 PM<br/>
                      Sábados: 9:00 AM - 1:00 PM<br/>
                      Domingos: Cerrado
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-full min-h-[400px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative shadow-xl shadow-brand/5"
          >
            {/* Visual representation of a map */}
            <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center">
              <MapPin className="w-12 h-12 text-brand mb-4 animate-bounce" />
              <p className="text-slate-500 font-medium text-center px-4">Mapa Interactivo<br/><span className="text-sm font-normal">Aquí se integrará Google Maps con la ubicación: Calle Oslo 198</span></p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
