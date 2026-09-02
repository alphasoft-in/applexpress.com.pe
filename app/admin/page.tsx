import { supabase } from "@/lib/supabase";
import { Eye, MousePointerClick, Package, Tag, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | Apple Express Admin",
};
export const revalidate = 0; // Don't cache admin pages

export default async function AdminDashboardPage() {
  // Fetch products count and unique categories
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("category");
    
  let totalProducts = 0;
  let activeCategories = 0;

  if (!productsError && products) {
    totalProducts = products.length;
    const uniqueCategories = new Set(products.map(p => p.category));
    activeCategories = uniqueCategories.size;
  }

  // Fetch page views count (All time)
  const { count: totalViews, error: viewsError } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true });

  // Fetch WA clicks count (All time)
  const { count: totalClicks, error: clicksError } = await supabase
    .from("whatsapp_clicks")
    .select("*", { count: "exact", head: true });

  // Fetch top 5 pages
  // Note: For complex aggregation, RPC (Stored Procedures) is best in Supabase, 
  // but we can fetch recent views and group them in JS for this simple MVP.
  // We'll fetch the last 1000 views to find the top pages.
  const { data: recentViews, error: recentViewsError } = await supabase
    .from("page_views")
    .select("path")
    .order("created_at", { ascending: false })
    .limit(1000);

  const pathCounts: Record<string, number> = {};
  if (recentViews) {
    recentViews.forEach(view => {
      // Exclude generic paths like /, /tienda, /mac to focus on products?
      // For now, let's include everything
      pathCounts[view.path] = (pathCounts[view.path] || 0) + 1;
    });
  }

  const topPaths = Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

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
          <p className="text-3xl font-bold text-gray-900">{totalClicks || 0}</p>
          <p className="text-xs text-gray-500 mt-2">Intenciones de compra directas</p>
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
            <h3 className="text-base font-semibold text-gray-900">Páginas más visitadas</h3>
            <p className="text-sm text-gray-500 mt-1">Las 5 rutas con mayor tráfico reciente.</p>
          </div>
          <div className="divide-y divide-gray-200">
            {topPaths.length > 0 ? (
              topPaths.map(([path, count], index) => (
                <div key={path} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-400 w-4">{index + 1}</span>
                    <Link href={path} target="_blank" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
                      {path} <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {count} vistas
                  </span>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-sm text-gray-500">
                Aún no hay suficientes datos de visitas registradas.
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
              <p><strong className="text-white">Optimiza tu catálogo:</strong> Mira qué productos son los más visitados para asegurar que siempre haya stock disponible.</p>
            </li>
            <li className="flex gap-3">
              <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center shrink-0">2</span>
              <p><strong className="text-white">Mide el interés real:</strong> Las vistas de página son buenas, pero los clics en WhatsApp te dicen cuántas personas realmente están listas para comprarte.</p>
            </li>
            <li className="flex gap-3">
              <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center shrink-0">3</span>
              <p><strong className="text-white">Decisiones de Marketing:</strong> Si una categoría tiene muchas visitas pero pocos clics, podría ser momento de ofrecer un descuento.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
