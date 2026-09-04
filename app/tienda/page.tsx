import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TiendaClient } from "@/components/TiendaClient";

export const metadata: Metadata = {
  title: "Nuestra Tienda en Lima | Apple Express Perú",
  description: "Visita nuestra tienda física en Ate, Lima. Conoce los productos Apple importados en persona: MacBook, iPhone, iPad, Apple Watch. Asesoría personalizada.",
  keywords: ["tienda Apple Lima", "comprar Apple Ate", "tienda Apple Express", "Apple Store Lima Peru", "MacBook tienda Lima"],
  alternates: { canonical: "https://appleexpress.com.pe/tienda" },
  openGraph: {
    title: "Nuestra Tienda en Lima | Apple Express Perú",
    description: "Visita nuestra sede en Ate, Lima. Productos Apple importados con garantía y atención personalizada.",
    url: "https://appleexpress.com.pe/tienda",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const tiendaJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Apple Express Perú - Sede Lima",
  description: "Tienda física y showroom de importación de productos Apple en Lima, Perú.",
  url: "https://appleexpress.com.pe/tienda",
  telephone: "+51934288165",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Oslo 198, Oficina 201",
    addressLocality: "Ate",
    addressRegion: "Lima",
    addressCountry: "PE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -12.0446548,
    longitude: -76.9328728,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
};

export default function TiendaPage() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tiendaJsonLd) }}
      />
      <Navbar />
      <TiendaClient />
      <Footer />
    </main>
  );
}