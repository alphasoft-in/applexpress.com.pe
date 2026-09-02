import { supabase } from "@/lib/supabase";
import { Eye, MousePointerClick, Package, Tag, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";

export const metadata = {
  title: "Dashboard | Apple Express Admin",
};
export const revalidate = 0;

export default async function AdminDashboardPage() {
  // 1. Fetch products and categories
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("category, slug, model, processor, storage");
    
  let totalProducts = 0;
  let activeCategories = 0;
  const productMap: Record<string, string> = {}; // slug -> specific name

  if (!productsError && products) {
    totalProducts = products.length;
    const uniqueCategories = new Set(products.map(p => p.category));
    activeCategories = uniqueCategories.size;
    products.forEach(p => {
      // Create a specific name like "MacBook Pro 16 (M3 - 1TB)" to avoid duplicates
      const specs = [p.processor, p.storage].filter(Boolean).join(" - ");
      productMap[p.slug] = specs ? `${p.model} (${specs})` : p.model;
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

  // 4. Fetch top products (from recent views)
  const { data: recentViews } = await supabase
    .from("page_views")
    .select("path")
    .order("created_at", { ascending: false })
    .limit(1000);

  const slugCounts: Record<string, number> = {};
  if (recentViews) {
    recentViews.forEach(view => {
      const segments = view.path.split("/").filter(Boolean);
      if (segments.length >= 2) {
        const slug = segments[segments.length - 1];
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

  const asesorData = [
    { name: "Asesor 1", clicks: clicks1 || 0 },
    { name: "Asesor 2", clicks: clicks2 || 0 },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard de Analíticas</h1>
        <p className="mt-1 text-sm text-gray-500">
          Revisa el rendimiento y comportamiento de los usuarios en tu tienda.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Visitas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-gray-500">Vistas Totales</h3>
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <Eye className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalViews || 0}</p>
        </div>

        {/* Clics WA 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-gray-500">Asesor 1 (WhatsApp)</h3>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
              <MousePointerClick className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{clicks1 || 0}</p>
        </div>

        {/* Clics WA 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-gray-500">Asesor 2 (WhatsApp)</h3>
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
              <MousePointerClick className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{clicks2 || 0}</p>
        </div>

        {/* Productos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-gray-500">Productos</h3>
            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
              <Package className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
        </div>

        {/* Categorías */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-gray-500">Categorías</h3>
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
              <Tag className="w-4 h-4 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{activeCategories}</p>
        </div>
      </div>

      {/* Gráficos con Recharts */}
      <AnalyticsCharts topProducts={topProducts} asesorClicks={asesorData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Top Páginas Lista */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Productos más visitados</h3>
            <p className="text-xs text-gray-500 mt-1">Detalle de los 5 productos con mayor interés reciente.</p>
          </div>
          <div className="divide-y divide-gray-200">
            {topProducts.length > 0 ? (
              topProducts.map((prod, index) => (
                <div key={prod.slug} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-gray-400 w-4">{index + 1}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {prod.name}
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800 uppercase tracking-wider">
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
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-sm border border-transparent p-6 text-white flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-4">¿Por qué importan estos datos?</h3>
          <ul className="space-y-3 text-blue-100 text-xs">
            <li className="flex gap-2.5">
              <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-[10px]">1</span>
              <p><strong className="text-white">Rendimiento por Asesor:</strong> Ahora puedes ver exactamente cuántas personas hicieron clic en el botón del Asesor 1 vs el Asesor 2.</p>
            </li>
            <li className="flex gap-2.5">
              <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-[10px]">2</span>
              <p><strong className="text-white">Interés Real:</strong> La lista identifica el nombre exacto de tus productos más populares.</p>
            </li>
            <li className="flex gap-2.5">
              <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-[10px]">3</span>
              <p><strong className="text-white">Decisiones de Marketing:</strong> Si un producto tiene muchas visitas pero pocos clics, podría ser momento de ofrecer un descuento o mejorar las fotos.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
