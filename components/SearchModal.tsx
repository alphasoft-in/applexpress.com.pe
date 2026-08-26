"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MACBOOKS, IPHONES, IPADS, WATCHES, AIRPODS, ACCESSORIES } from "@/lib/data";

interface Product {
  slug: string;
  model: string;
  price: string;
  image: string;
  category: string;
}

const ALL_PRODUCTS: Product[] = [
  ...MACBOOKS.map(p => ({ ...p, category: 'mac' })),
  ...IPHONES.map(p => ({ ...p, category: 'iphone' })),
  ...IPADS.map(p => ({ ...p, category: 'ipad' })),
  ...WATCHES.map(p => ({ ...p, category: 'watch' })),
  ...AIRPODS.map(p => ({ ...p, category: 'airpods' })),
  ...ACCESSORIES.map(p => ({ ...p, category: 'accesorios' })),
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow render
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery(""); // clear query on close
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ""
    ? []
    : ALL_PRODUCTS.filter(p =>
        p.model.toLowerCase().includes(query.toLowerCase()) ||
        p.slug.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-slate-100 dark:border-slate-800 px-4 py-4">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-0 focus:ring-0 px-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
            placeholder="Buscar productos, modelos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {query.trim() !== "" && (
          <div className="overflow-y-auto flex-1 p-2">
            {filteredProducts.length > 0 ? (
              <div className="space-y-1">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/${product.category}/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.model}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-brand dark:group-hover:text-brand-hover transition-colors">
                        {product.model}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {product.price}
                      </p>
                    </div>
                    <ChevronRightIcon />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                <p>No se encontraron resultados para &quot;{query}&quot;</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-brand dark:group-hover:text-brand-hover transition-colors"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
