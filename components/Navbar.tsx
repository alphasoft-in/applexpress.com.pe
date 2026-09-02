"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/SearchModal";

const NAV_LINKS = [
  { name: "Tienda", href: "/tienda" },
  { name: "Mac", href: "/mac" },
  { name: "iPhone", href: "/iphone" },
  { name: "AirPods", href: "/airpods" },
  { name: "Accesorios", href: "/Accesorios" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    if (!sessionStorage.getItem("hasSeenBanner")) {
      setIsBannerVisible(true);
      sessionStorage.setItem("hasSeenBanner", "true");
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isBannerVisible) {
      const timer = setTimeout(() => setIsBannerVisible(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isBannerVisible]);

  // Close mobile menu on route change
  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Banner */}
      {isBannerVisible && (
        <div className="relative bg-[#1d1d1f] text-center py-2 px-10 text-[0.72rem]">
          <p className="max-w-7xl mx-auto text-[#a1a1a6]">
            <span className="hidden sm:inline">Bienvenidos a Apple Express. Importadores directos desde EE.UU. </span>
            <span className="sm:hidden">Importadores Apple en Perú. </span>
            <Link href="#" className="text-[#2997ff] hover:underline font-medium inline-flex items-center gap-0.5">
              Saber mas <ChevronRight className="w-3 h-3" />
            </Link>
          </p>
          <button onClick={() => setIsBannerVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e6e73] hover:text-white transition-colors p-1 cursor-pointer" aria-label="Cerrar">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Nav bar */}
      <div className={cn(
          "w-full transition-all duration-300",
          isScrolled
            ? "bg-[rgba(255,255,255,0.92)] dark:bg-[rgba(0,0,0,0.92)] backdrop-blur-2xl border-b border-[#d2d2d7]/40 dark:border-[#424245]/40"
            : "bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(0,0,0,0.85)] backdrop-blur-xl"
        )}>
        <div className="max-w-[980px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12">
            <Link href="/" className="hover:opacity-70 transition-opacity duration-200 shrink-0">
              <span className="text-sm font-semibold tracking-tight text-[#1d1d1f] dark:text-white">Apple Express</span>
            </Link>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7">
              {NAV_LINKS.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link key={link.name} href={link.href} className={cn("text-[0.72rem] transition-colors duration-200 whitespace-nowrap", isActive ? "text-[#1d1d1f] dark:text-white font-medium" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white")}>
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <button onClick={() => setIsSearchOpen(true)} className="cursor-pointer text-[#1d1d1f] dark:text-white opacity-70 hover:opacity-100 transition-opacity" aria-label="Buscar">
                <Search className="w-4 h-4" />
              </button>
              <button className="cursor-pointer text-[#1d1d1f] dark:text-white opacity-70 hover:opacity-100 transition-opacity" aria-label="Bolsa">
                <ShoppingBag className="w-4 h-4" />
              </button>
              <button className="cursor-pointer md:hidden text-[#1d1d1f] dark:text-white opacity-70 hover:opacity-100 transition-opacity" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu">
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[rgba(250,250,252,0.97)] dark:bg-[rgba(0,0,0,0.97)] backdrop-blur-xl border-t border-[#d2d2d7]/20 dark:border-[#424245]/20 w-full">
          <nav className="max-w-[980px] mx-auto px-6 py-4 flex flex-col">
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between py-4 text-base font-medium transition-colors",
                    idx < NAV_LINKS.length - 1 ? "border-b border-[#d2d2d7]/30 dark:border-[#424245]/30" : "",
                    isActive ? "text-brand" : "text-[#1d1d1f] dark:text-white"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  <ChevronRight className="w-4 h-4 text-[#6e6e73]" />
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
