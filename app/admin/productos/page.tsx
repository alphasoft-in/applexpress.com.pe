import Link from "next/link";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ProductActions } from "@/components/admin/ProductActions";
import { SearchProduct } from "@/components/admin/SearchProduct";

export const revalidate = 0; // Disable cache for this page

const PAGE_SIZE = 10;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = parseInt(resolvedParams.page || "1");
  const searchQuery = resolvedParams.q || "";
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (searchQuery) {
    query = query.or(`model.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`);
  }

  const { data: products, error, count } = await query.range(from, to);

  if (error) {
    console.error("Error fetching products:", error);
  }

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona el catálogo de productos de la tienda.
          </p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
          <SearchProduct />
          <Link
            href="/admin/productos/nuevo"
            className="inline-flex items-center gap-2 bg-[#0071e3] hover:bg-[#0077ed] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {product.image && (
                          <img src={product.image} alt={product.model} className="w-10 h-10 rounded-md object-cover bg-gray-100" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.model}</p>
                          <p className="text-xs text-gray-500">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <ProductActions productId={product.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                    No hay productos registrados. ¡Crea el primero!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Mostrando página <span className="font-semibold text-gray-900">{currentPage}</span> de <span className="font-semibold text-gray-900">{totalPages}</span> (Total: {count} productos)
            </span>
            
            <div className="flex items-center gap-2">
              <Link
                href={currentPage > 1 ? `/admin/productos?page=${currentPage - 1}` : "#"}
                className={`p-2 rounded-lg border border-gray-300 flex items-center justify-center transition-colors ${
                  currentPage > 1 ? "bg-white hover:bg-gray-100 text-gray-700" : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <Link
                href={currentPage < totalPages ? `/admin/productos?page=${currentPage + 1}` : "#"}
                className={`p-2 rounded-lg border border-gray-300 flex items-center justify-center transition-colors ${
                  currentPage < totalPages ? "bg-white hover:bg-gray-100 text-gray-700" : "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
