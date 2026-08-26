import Link from "next/link";
import { MapPin, Phone, CreditCard } from "lucide-react";

const FOOTER_LINKS = {
  "Descubrir": [
    { name: "Mac", href: "/mac" },
    { name: "iPad", href: "/ipad" },
    { name: "iPhone", href: "/iphone" },
    { name: "Accesorios", href: "/accesorios" },
  ],
  "Información de la Empresa": [
    { name: "Quiénes Somos", href: "#" },
    { name: "Garantía", href: "#" },
    { name: "Políticas de Envío", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#f5f5f7] dark:bg-[#1d1d1f] text-neutral-600 dark:text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Column 1: Brand & Location */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-black text-brand dark:text-brand-hover mb-2">FHARMAG S.A.C</h3>
              <p className="text-sm text-slate-500">RUC: 20612083950</p>
              <p className="text-sm text-slate-500 mt-2">Importador Independiente de Productos Apple desde USA.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center"><MapPin className="w-4 h-4 mr-2 text-brand" /> Ubicación</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Calle Oslo 198<br/>Oficina 201, Los Portales - Ate<br/>Lima, Perú</p>
            </div>
          </div>

          {/* Column 2: Contact & Payments */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center"><Phone className="w-4 h-4 mr-2 text-brand" /> Contacto</h4>
              <p className="text-sm text-slate-500 leading-relaxed flex flex-col gap-1">
                <a href="https://wa.me/51982848503?text=Hola,%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">982 848 503</a>
                <a href="https://wa.me/51934288165?text=Hola,%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">934 288 165</a>
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center"><CreditCard className="w-4 h-4 mr-2 text-brand" /> Pagos y Cuentas</h4>
              <p className="text-sm text-slate-500 mb-1"><strong className="text-slate-700 dark:text-slate-300">BCP Soles:</strong> 1937072818003</p>
              <p className="text-sm text-slate-500 mb-3"><strong className="text-slate-700 dark:text-slate-300">CCI:</strong> 00219300707281800318</p>
              <p className="text-xs text-slate-500 leading-relaxed">Aceptamos Visa, Mastercard, Diners Club, Izipay, Yape y Plin.</p>
            </div>
          </div>

          {/* Columns 3 & 4: Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-brand dark:hover:text-brand-hover transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-neutral-300 dark:border-neutral-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center md:space-x-4">
            <p>Copyright © {new Date().getFullYear()} FHARMAG SAC. Todos los derechos reservados.</p>
            <div className="hidden md:block h-3 w-px bg-neutral-400"></div>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link href="#" className="hover:text-black dark:hover:text-white hover:underline">
                Términos y Condiciones
              </Link>
            </div>
          </div>
          <div className="text-neutral-800 dark:text-neutral-200">
            Perú
          </div>
        </div>
      </div>
    </footer>
  );
}
