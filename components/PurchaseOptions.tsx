"use client";

import { useState } from "react";
import { Truck, MapPin, ShoppingBag } from "lucide-react";

const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const DELIVERY = [
  {
    id: "envio",
    Icon: Truck,
    label: "Envío a domicilio",
    desc: "A todo el Perú · Seguimiento en tiempo real",
  },
  {
    id: "personalizada",
    Icon: MapPin,
    label: "Entrega personalizada",
    desc: "Coordina lugar y hora con nosotros",
  },
  {
    id: "tienda",
    Icon: ShoppingBag,
    label: "Retiro en tienda",
    desc: "Calle Oslo 198, Ate — Lima",
  },
];

interface Props {
  productName: string;
  productSpecs?: string;
}

export function PurchaseOptions({ productName, productSpecs }: Props) {
  const [selected, setSelected] = useState<string>("envio");

  const deliveryLabel = DELIVERY.find((d) => d.id === selected)?.label ?? "";
  const specsText = productSpecs ? ` (${productSpecs})` : "";
  const waText = encodeURIComponent(
    `Hola, quiero consultar sobre: ${productName}${specsText}. Método de entrega preferido: ${deliveryLabel}.`
  );

  return (
    <div className="space-y-5">

      {/* Section label */}
      <p className="text-[11px] font-medium text-[#6e6e73] uppercase tracking-[0.1em] mb-3">
        Método de entrega
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {DELIVERY.map(({ id, Icon, label, desc }) => {
          const active = selected === id;
          return (
            <button
              key={id}
              onClick={() => setSelected(id)}
              className={[
                "w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border text-left transition-all duration-200 group",
                active
                  ? "border-[#1d1d1f] dark:border-white bg-[#f5f5f7] dark:bg-white/[0.06]"
                  : "border-[#e8e8ed] dark:border-[#2a2a2a] hover:border-[#c7c7cc] dark:hover:border-[#424245]",
              ].join(" ")}
            >
              {/* Icon */}
              <div className={[
                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200",
                active
                  ? "bg-[#1d1d1f] dark:bg-white"
                  : "bg-[#f0f0f5] dark:bg-[#222] group-hover:bg-[#e8e8ed] dark:group-hover:bg-[#2a2a2a]",
              ].join(" ")}>
                <Icon className={`w-4 h-4 transition-colors duration-200 ${active ? "text-white dark:text-black" : "text-[#6e6e73]"}`} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[#1d1d1f] dark:text-white leading-tight">
                  {label}
                </p>
                <p className="text-[12px] text-[#86868b] leading-tight mt-0.5">{desc}</p>
              </div>

              {/* Checkmark */}
              <div className={[
                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200",
                active
                  ? "bg-[#1d1d1f] dark:bg-white border-[#1d1d1f] dark:border-white"
                  : "border-[#c7c7cc] dark:border-[#424245]",
              ].join(" ")}>
                {active && (
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                    <path d="M1 3.5L3.5 6L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      className="text-white dark:text-black" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-2 mt-1">
        <a
          href={`https://wa.me/51934288165?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#0071e3] hover:bg-[#0077ed] text-white py-3 px-6 rounded-full font-semibold text-[14px] transition-colors duration-200"
        >
          {WA_ICON}
          Consultar (Asesor 1)
        </a>
        <a
          href={`https://wa.me/51982848503?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-[#f5f5f7] dark:text-black text-white py-3 px-6 rounded-full font-semibold text-[14px] transition-colors duration-200"
        >
          {WA_ICON}
          Consultar (Asesor 2)
        </a>
      </div>

      <p className="text-[11px] text-[#86868b] text-center leading-relaxed">
        Te responderemos en menos de 24 horas.
      </p>
    </div>
  );
}