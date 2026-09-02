import { supabase } from "@/lib/supabase";
import { Eye, MousePointerClick, Package, Tag, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | Apple Express Admin",
};
export const revalidate = 0;

export default async function AdminDashboardPage() {
  // 1. Fetch products and categories
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("category, slug, model");
    
  let totalProducts = 0;
  let activeCategories = 0;
  const productMap: Record<string, string> = {}; // slug -> model

  if (!productsError && products) {
    totalProducts = products.length;
    const uniqueCategories = new Set(products.map(p => p.category));
    activeCategories = uniqueCategories.size;
    products.forEach(p => {
      productMap[p.slug] = p.model;
    });
  }

  // 2. Fetch page views count (All time)
  const { count: totalViews } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true });

  // 3. Fetch WA clicks for each asesor
  const { count: clicks1 } = await supabase
    .from("whatsapp_clicks")
    .select("*", { count: "exact", head: true })
    .eq("asesor", "Asesor 1");

  const { count: clicks2 } = await supabase
    .from("whatsapp_clicks")
    .select("*", { count: "exact", head: true })
    .eq("asesor", "Asesor 2");

  // 4. Fetch top 5 products (from recent views)
  const { data: recentViews } = await supabase
    .from("page_views")
    .select("path")
    .order("created_at", { ascending: false })
    .limit(1000);

  const slugCounts: Record<string, number> = {};
  if (recentViews) {
    recentViews.forEach(view => {
      // Paths usually look like /iphone/iphone-15-pro
      const segments = view.path.split("/").filter(Boolean);
      // We assume product pages have at least 2 segments (category/slug)
      if (segments.length >= 2) {
        const slug = segments[segments.length - 1];
        // Only count if it matches a known product slug
        if (productMap[slug]) {
          slugCounts[slug] = (slugCounts[slug] || 0) + 1;
        }
      }
    });
  }

  const topProducts = Object.entries(slugCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([slug, count]) => ({
      slug,
      name: productMap[slug],
      count,
    }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard de Analíticas</h1>
        <p className="mt-1 text-sm text-gray-500">
          Revisa el rendimiento y comportamiento de los usuarios en tu tienda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Visitas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Vistas Totales</h3>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalViews || 0}</p>
          <p className="text-xs text-gray-500 mt-2">Visitas a páginas registradas</p>
        </div>

        {/* Clics WA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Clics a WhatsApp</h3>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <MousePointerClick className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{(clicks1 || 0) + (clicks2 || 0)}</p>
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs font-medium">
            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Asesor 1: {clicks1 || 0}</span>
            <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Asesor 2: {clicks2 || 0}</span>
          </div>
        </div>

        {/* Productos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Productos</h3>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
          <p className="text-xs text-gray-500 mt-2">En el catálogo actual</p>
        </div>

        {/* Categorías */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Categorías Activas</h3>
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
              <Tag className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{activeCategories}</p>
          <p className="text-xs text-gray-500 mt-2">Con al menos 1 producto</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Páginas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Productos más visitados</h3>
            <p className="text-sm text-gray-500 mt-1">Los 5 productos con mayor interés reciente.</p>
          </div>
          <div className="divide-y divide-gray-200">
            {topProducts.length > 0 ? (
              topProducts.map((prod, index) => (
                <div key={prod.slug} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-400 w-4">{index + 1}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {prod.name}
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {prod.count} vistas
                  </span>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-sm text-gray-500">
                Aún no hay suficientes datos de visitas a productos.
              </div>
            )}
          </div>
        </div>

        {/* Resumen o Tips */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-sm border border-transparent p-8 text-white flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-4">¿Por qué importan estos datos?</h3>
          <ul className="space-y-4 text-blue-100 text-sm">
            <li className="flex gap-3">
              <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center shrink-0">1</span>
              <p><strong className="text-white">Rendimiento por Asesor:</strong> Ahora puedes ver exactamente cuántas personas hicieron clic en el botón del Asesor 1 vs el Asesor 2.</p>
            </li>
            <li className="flex gap-3">
              <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center shrink-0">2</span>
              <p><strong className="text-white">Interés Real:</strong> La lista de la izquierda ya no muestra páginas sueltas, sino que identifica el nombre exacto de tus productos más populares.</p>
            </li>
            <li className="flex gap-3">
              <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center shrink-0">3</span>
              <p><strong className="text-white">Decisiones de Marketing:</strong> Si un producto tiene muchas visitas pero pocos clics, podría ser momento de ofrecer un descuento.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
