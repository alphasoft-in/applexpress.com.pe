import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { ShippingSection } from "@/components/ShippingSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] dark:bg-black">
      <Navbar />
      
      <Hero />
      <ProductGrid />
      <ShippingSection />
      <Footer />
    </main>
  );
}

