"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";

interface ProductCardProps {
  name: string;
  specs?: string;
  price: string;
  image: string;
  href: string;
  waLink: string;
  badge?: string;
  idx?: number;
}

export function ProductCard({ name, specs, price, image, href, waLink, badge, idx = 0 }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
      className="group flex flex-col bg-white dark:bg-[#161617] rounded-2xl overflow-hidden border border-[#e8e8ed] dark:border-[#2a2a2a] hover:shadow-xl hover:shadow-black/[0.07] dark:hover:shadow-black/40 transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f5f5f7] dark:bg-[#1c1c1e]" style={{ aspectRatio: '4/3' }}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />
        {badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full text-[10px] font-bold text-[#1d1d1f] dark:text-white tracking-wide shadow-sm">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3">
        {/* Title block */}
        <div className="flex-1">
          <h3 className="text-[15px] sm:text-base font-bold text-[#1d1d1f] dark:text-white tracking-tight leading-snug">
            {name}
          </h3>
          {specs && (
            <p className="text-[11px] sm:text-xs text-[#86868b] dark:text-[#6e6e73] mt-1 leading-relaxed line-clamp-2">
              {specs}
            </p>
          )}
        </div>

        {/* Price */}
        <p className="text-[13px] sm:text-sm font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
          Desde {price}
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full py-[9px] text-[13px] font-semibold transition-colors duration-200"
          >
            <Heart className="w-3.5 h-3.5" strokeWidth={2.5} />
            Me interesa
          </a>
          <Link
            href={href}
            className="text-[#0071e3] text-[13px] font-medium hover:underline underline-offset-2 transition-colors duration-200 py-0.5"
          >
            Ver características &rsaquo;
          </Link>
        </div>
      </div>
    </motion.article>
  );
}