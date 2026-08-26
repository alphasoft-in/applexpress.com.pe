"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface CategoryHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function CategoryHeader({ eyebrow, title, subtitle }: CategoryHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="text-center mb-12 sm:mb-16 lg:mb-20">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        className="text-[11px] sm:text-xs font-semibold text-[#6e6e73] uppercase tracking-[0.18em] mb-4"
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.06, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1d1d1f] dark:text-white leading-tight mb-4 sm:mb-5"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        className="text-base sm:text-lg md:text-xl text-[#6e6e73] dark:text-[#86868b] max-w-xl mx-auto font-medium leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}