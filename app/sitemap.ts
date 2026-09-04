import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE = "https://appleexpress.com.pe";
const NOW = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const static_pages: MetadataRoute.Sitemap = [
    { url: BASE,                     lastModified: NOW, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/mac`,            lastModified: NOW, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/iphone`,         lastModified: NOW, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/ipad`,           lastModified: NOW, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/watch`,          lastModified: NOW, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/airpods`,        lastModified: NOW, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/accesorios`,     lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tienda`,         lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
  ];

  const { data: products } = await supabase.from("products").select("slug, category");

  const product_pages: MetadataRoute.Sitemap = (products || []).map((p) => ({
    url: `${BASE}/${p.category}/${p.slug}`,
    lastModified: NOW,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  return [
    ...static_pages,
    ...product_pages,
  ];
}