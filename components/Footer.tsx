"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

const CATEGORIES = [
  { name: "Mac", href: "/mac" },
  { name: "iPhone", href: "/iphone" },
  { name: "AirPods", href: "/airpods" },
  { name: "Accesorios", href: "/Accesorios" },
];

const INFO_LINKS = [
  { name: "Quiénes Somos", href: "/quienes-somos" },
  { name: "Garantía", href: "/garantia" },
  { name: "Políticas de Envío", href: "/politicas-de-envio" },
  { name: "Términos", href: "/terminos" },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-[#111111] text-[#6e6e73] border-t border-[#3a3a3c]">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 py-10 sm:py-12">

        {/* Grid 2 cols on mobile, 4 on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#424245]">
          <div>
            <h4 className="text-[0.65rem] font-semibold text-white mb-3 sm:mb-4 uppercase tracking-wider">Productos</h4>
            <ul className="space-y-2.5">
              {CATEGORIES.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className={`text-xs transition-colors duration-200 ${isActive ? "text-white font-semibold" : "hover:text-white"}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.65rem] font-semibold text-white mb-3 sm:mb-4 uppercase tracking-wider">Información</h4>
            <ul className="space-y-2.5">
              {INFO_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className={`text-xs transition-colors duration-200 ${isActive ? "text-white font-semibold" : "hover:text-white"}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.65rem] font-semibold text-white mb-3 sm:mb-4 uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://wa.me/51982848503" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">
                  982 848 503
                </a>
              </li>
              <li>
                <a href="https://wa.me/51934288165" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">
                  934 288 165
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[0.65rem] font-semibold text-white mb-3 sm:mb-4 uppercase tracking-wider">Ubicación</h4>
            <p className="text-xs leading-relaxed">
              Calle Oslo 198<br />Oficina 201, Ate<br />Lima, Perú
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <FaTiktok className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="text-xs leading-relaxed">
            <p className="text-white font-medium mb-0.5">FHARMAG S.A.C &mdash; RUC: 20612083950</p>
            <p>Importación directa de tecnología original desde Estados Unidos.</p>
          </div>
          <p className="text-xs whitespace-nowrap text-[#6e6e73]">
            &copy; {new Date().getFullYear()} Apple Express
          </p>
        </div>

      </div>
    </footer>
  );
}
