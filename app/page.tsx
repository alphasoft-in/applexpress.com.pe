import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { ShippingSection } from "@/components/ShippingSection";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple Express Peru | MacBook, iPhone, iPad importados de EE.UU.",
  description: "Importamos MacBook Pro, iPhone 15, iPad Pro, Apple Watch y AirPods directamente desde Estados Unidos. Garantia total, precios competitivos y envio a todo el Peru.",
  alternates: { canonical: "https://applexpress-com-pe.vercel.app" },
  openGraph: {
    title: "Apple Express Peru | MacBook, iPhone, iPad importados de EE.UU.",
    description: "MacBook Pro, iPhone 15, iPad Pro y AirPods importados de EE.UU. Garantia total. Envio a todo el Peru.",
    url: "https://applexpress-com-pe.vercel.app",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Apple Express Peru" }],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Apple Express Peru",
  description: "Importadora de productos Apple desde Estados Unidos. MacBook, iPhone, iPad, Apple Watch y AirPods con garantia.",
  url: "https://applexpress-com-pe.vercel.app",
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
    latitude: -12.0432,
    longitude: -76.9352,
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
  sameAs: [
    "https://facebook.com",
    "https://instagram.com",
    "https://tiktok.com",
  ],
  priceRange: "$$",
  currenciesAccepted: "PEN",
  paymentAccepted: "Cash, Bank Transfer",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Navbar />
      <Hero />
      <ProductGrid />
      <ShippingSection />
      <Footer />
    </main>
  );
}