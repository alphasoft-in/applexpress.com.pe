"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Tienda", href: "/tienda" },
  { name: "Mac", href: "/mac" },
  { name: "iPad", href: "/ipad" },
  { name: "iPhone", href: "/iphone" },
  { name: "Watch", href: "/watch" },
  { name: "AirPods", href: "/airpods" },
  { name: "Accesorios", href: "/accesorios" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Top Announcement Banner */}
      <div className="bg-neutral-100 dark:bg-neutral-900 text-center py-2.5 text-[0.8rem] sm:text-sm border-b border-neutral-200 dark:border-neutral-800">
        <p className="max-w-7xl mx-auto px-4 text-slate-600 dark:text-slate-300">
          Bienvenidos a FHARMAG SAC. Distribuidores oficiales e importadores de los mejores productos Apple en el Perú.{" "}
          <Link href="#" className="text-brand dark:text-brand-hover hover:underline font-medium">
            Saber más &gt;
          </Link>
        </p>
      </div>

      <div
        className={cn(
          "transition-all duration-300 border-t-[3px] border-brand w-full",
          isScrolled
            ? "glass dark:glass-dark shadow-sm"
            : "bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col hover:opacity-80 transition-opacity"
          >
            <span className="text-xl font-black tracking-tight text-brand dark:text-brand-hover leading-none">FHARMAG</span>
            <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-slate-500 uppercase leading-none mt-1">Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors">
              <Search className="w-5 h-5" />
              <span className="sr-only">Buscar</span>
            </button>
            <button className="text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="sr-only">Bolsa</span>
            </button>
            <button
              className="md:hidden text-neutral-800 dark:text-neutral-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 h-screen bg-white dark:bg-black p-4 z-40 flex flex-col space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-semibold border-b border-neutral-200 dark:border-neutral-800 pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
