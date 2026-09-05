"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftRight, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useCompareStore } from "@/lib/store/useCompareStore";

interface ProductCardProps {
  name: string;
  specs?: string;
  price: string;
  image: string;
  href: string;
  waLink: string;
  badge?: string;
  stock?: number;
  idx?: number;
}

export function ProductCard({ name, specs, price, image, href, waLink, badge, stock, idx = 0 }: ProductCardProps) {
  const { selectedSlugs, toggleProduct } = useCompareStore();
  
  // Extract category and slug from href (e.g. "/mac/macbook-pro")
  const parts = href.split('/').filter(Boolean);
  const category = parts[0];
  const slug = parts[1];

  const isSelected = slug ? selectedSlugs.includes(slug) : false;

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (slug && category) {
      toggleProduct(slug, category);
    }
  };
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
      className="group flex flex-col bg-white dark:bg-[#161617] rounded-2xl overflow-hidden border border-[#e8e8ed] dark:border-[#2a2a2a] hover:shadow-xl hover:shadow-black/[0.07] dark:hover:shadow-black/40 transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f5f5f7] dark:bg-[#1c1c1e] flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-4 mix-blend-multiply group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />
        {badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full text-[10px] font-bold text-[#1d1d1f] dark:text-white tracking-wide shadow-sm">
            {badge}
          </span>
        )}
        
        {slug && category && (
          <button
            onClick={handleCompareClick}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-sm cursor-pointer ${
              isSelected 
                ? "bg-[#0071e3] text-white" 
                : "bg-white/80 dark:bg-black/60 text-[#1d1d1f] dark:text-white hover:bg-white dark:hover:bg-black/80"
            }`}
            aria-label="Comparar producto"
            title="Comparar producto"
          >
            {isSelected ? <Check className="w-4 h-4" /> : <ArrowLeftRight className="w-4 h-4" />}
          </button>
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

        {/* Price & Stock */}
        <div>
          <p className="text-[13px] sm:text-sm font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
            Desde: {price || "-"}
          </p>
          <div className="mt-2.5">
            {stock === 0 ? (
              <span className="inline-block px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
                Agotado
              </span>
            ) : (
              <span className="inline-block px-2.5 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-semibold uppercase tracking-wider">
                {stock !== undefined && stock > 0 ? `Stock: ${stock} unidades` : "Stock disponible"}
              </span>
            )}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <a
            href={`https://wa.me/51982848503?text=${encodeURIComponent(`Hola, quiero consultar sobre: ${name}${specs ? ` (${specs})` : ""}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full py-[9px] text-[13px] font-semibold transition-colors duration-200"
          >
            Me interesa
            <FaWhatsapp className="w-4 h-4" />
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