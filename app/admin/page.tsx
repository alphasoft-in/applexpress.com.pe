import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Dashboard | Apple Express Admin",
};
export const revalidate = 0; // Don't cache admin pages

export default async function AdminDashboardPage() {
  // Fetch products count and unique categories
  const { data: products, error } = await supabase
    .from("products")
    .select("category");
    
  let totalProducts = 0;
  let activeCategories = 0;

  if (!error && products) {
    totalProducts = products.length;
    const uniqueCategories = new Set(products.map(p => p.category));
    activeCategories = uniqueCategories.size;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Bienvenido al panel de administración de Apple Express.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Productos</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500">Categorías Activas</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{activeCategories}</p>
        </div>
      </div>
    </div>
  );
}
