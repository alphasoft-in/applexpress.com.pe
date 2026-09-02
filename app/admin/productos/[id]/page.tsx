"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function EditarProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  
  const [formData, setFormData] = useState({
    model: "",
    slug: "",
    category: "iphone",
    price: "",
    stock: "0",
    type: "",
    compatibility: "",
    features: "",
    connectivity: "",
    screen: "",
    processor: "",
    storage: "",
    memory: "",
    camera: "",
    battery: "",
    extra: ""
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          // Exclude id, created_at, updated_at from formData
          const { id: _, created_at, image, ...rest } = data;
          
          setFormData({
            ...rest,
            stock: rest.stock.toString()
          });
          setCurrentImage(image || "");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Error cargando el producto");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Auto-generate slug from model only if it's empty or we want to force it
    // Usually editing shouldn't auto-change the slug unless intended
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = currentImage;

      // 1. Upload new image if selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${formData.slug}-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }

      // 2. Update product
      const { error: updateError } = await supabase
        .from("products")
        .update({
          ...formData,
          stock: parseInt(formData.stock),
          image: imageUrl
        })
        .eq("id", id);

      if (updateError) throw updateError;

      router.push("/admin/productos");
      router.refresh();
      
    } catch (error: any) {
      console.error("Error updating product:", error);
      alert("Error al guardar: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0071e3]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/productos" className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Producto</h1>
          <p className="text-sm text-gray-500">Modifica los datos del producto.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Info Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Información Básica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modelo (Nombre) *</label>
                <input required type="text" name="model" value={formData.model || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071e3]" placeholder="Ej. iPhone 15 Pro Max" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
                <input required type="text" name="slug" value={formData.slug || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                <select required name="category" value={formData.category || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071e3]">
                  <option value="iphone">iPhone</option>
                  <option value="mac">Mac</option>
                  <option value="ipad">iPad</option>
                  <option value="watch">Apple Watch</option>
                  <option value="airpods">AirPods</option>
                  <option value="accesorios">Accesorios</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
                <input required type="text" name="price" value={formData.price || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071e3]" placeholder="Ej. S/ 4,599" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Inicial *</label>
                <input required type="number" name="stock" value={formData.stock || "0"} onChange={handleChange} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071e3]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Extra (Badge)</label>
                <input type="text" name="extra" value={formData.extra || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071e3]" placeholder="Ej. Chip M3" />
              </div>
            </div>
          </div>

          {/* Imagen */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Fotografía</h3>
            {currentImage && !imageFile && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Imagen actual:</p>
                <img src={currentImage} alt="Actual" className="w-32 h-32 object-contain bg-gray-50 border rounded-lg" />
              </div>
            )}
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Haz clic para subir una nueva imagen</span> o arrastra aquí
                  </p>
                  <p className="text-xs text-gray-500">{imageFile ? imageFile.name : "Opcional (PNG, JPG hasta 5MB)"}</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          {/* Especificaciones Opcionales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Especificaciones (Opcionales)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pantalla</label>
                <input type="text" name="screen" value={formData.screen || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Ej. 6.7 pulgadas" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Procesador</label>
                <input type="text" name="processor" value={formData.processor || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Ej. A17 Pro" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Almacenamiento</label>
                <input type="text" name="storage" value={formData.storage || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Ej. 256GB" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cámara</label>
                <input type="text" name="camera" value={formData.camera || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Ej. 48MP" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Batería</label>
                <input type="text" name="battery" value={formData.battery || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Ej. Hasta 29 hrs" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Características (Accesorios)</label>
                <input type="text" name="features" value={formData.features || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Ej. Cancelación de ruido" />
              </div>
            </div>
          </div>

        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <Link href="/admin/productos" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancelar
          </Link>
          <button disabled={saving} type="submit" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#0071e3] rounded-lg hover:bg-[#0077ed] transition-colors disabled:opacity-50">
            {saving ? "Guardando..." : <><Save className="w-4 h-4" /> Guardar Cambios</>}
          </button>
        </div>
      </form>
    </div>
  );
}
