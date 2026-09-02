"use client";

import { useCompareStore } from "@/lib/store/useCompareStore";
import { ArrowLeftRight, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export function CompareBar() {
  const { selectedSlugs, clearComparison, category } = useCompareStore();

  if (selectedSlugs.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-white dark:bg-[#161617] px-6 py-4 rounded-full shadow-2xl border border-[#e8e8ed] dark:border-[#2a2a2a] backdrop-blur-md"
      >
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-[#0071e3]" />
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">
            {selectedSlugs.length} {selectedSlugs.length === 1 ? "producto" : "productos"} seleccionados
          </span>
        </div>

        <div className="flex items-center gap-2 border-l border-[#e8e8ed] dark:border-[#2a2a2a] pl-4">
          <Link
            href={`/comparar?slugs=${selectedSlugs.join(",")}&category=${category}`}
            className="px-4 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-semibold rounded-full transition-colors"
          >
            Comparar
          </Link>
          <button
            onClick={clearComparison}
            className="cursor-pointer p-1.5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
            aria-label="Limpiar comparación"
            title="Limpiar comparación"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
