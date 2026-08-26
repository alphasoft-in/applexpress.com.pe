import { MetadataRoute } from "next";
import { MACBOOKS, IPHONES, IPADS, WATCHES, AIRPODS, ACCESSORIES } from "@/lib/data";

const BASE = "https://applexpress.com.pe";
const NOW = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
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

  const mac_pages     = MACBOOKS.map(    p => ({ url: `${BASE}/mac/${p.slug}`,        lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.8 }));
  const iphone_pages  = IPHONES.map(     p => ({ url: `${BASE}/iphone/${p.slug}`,     lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.8 }));
  const ipad_pages    = IPADS.map(       p => ({ url: `${BASE}/ipad/${p.slug}`,       lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.8 }));
  const watch_pages   = WATCHES.map(     p => ({ url: `${BASE}/watch/${p.slug}`,      lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.7 }));
  const airpod_pages  = AIRPODS.map(     p => ({ url: `${BASE}/airpods/${p.slug}`,    lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.7 }));
  const acc_pages     = ACCESSORIES.map( p => ({ url: `${BASE}/accesorios/${p.slug}`, lastModified: NOW, changeFrequency: "monthly" as const, priority: 0.6 }));

  return [
    ...static_pages,
    ...mac_pages,
    ...iphone_pages,
    ...ipad_pages,
    ...watch_pages,
    ...airpod_pages,
    ...acc_pages,
  ];
}