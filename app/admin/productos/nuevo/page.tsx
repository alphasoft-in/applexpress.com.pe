"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, ChevronDown, CloudUpload, Package, ImageIcon, List } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

import { clearCache } from "@/app/admin/actions";

export default function NuevoProductoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
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

  const [slugEdited, setSlugEdited] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (e.target.name === "slug") {
      setSlugEdited(true);
    }
    
    // Auto-generate slug from model only if user hasn't manually edited the slug
    if (e.target.name === "model" && !slugEdited) {
      setFormData(prev => ({
        ...prev,
        slug: e.target.value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // 1. Upload image if selected
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

      // 2. Insert product
      const { error: insertError } = await supabase.from("products").insert([
        {
          ...formData,
          stock: parseInt(formData.stock),
          image: imageUrl
        }
      ]);

      await clearCache();

      await Swal.fire({
        title: "¡Éxito!",
        text: "Producto guardado exitosamente",
        icon: "success",
        confirmButtonColor: "#0071e3",
      });
      router.push("/admin/productos");
      router.refresh();
      
    } catch (error: any) {
      console.error("Error creating product:", error);
      Swal.fire("Error", "Error al guardar: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md pt-4 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/productos" className="p-2 text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-full shadow-sm border border-gray-200">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nuevo Producto</h1>
            <p className="mt-1 text-xs text-gray-500">Completa los datos para agregar al catálogo.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/productos" className="px-6 py-2.5 text-sm font-medium text-gray-700 cursor-pointer bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-all shadow-sm">
            Cancelar
          </Link>
          <button disabled={loading} type="submit" onClick={handleSubmit} className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium cursor-pointer text-white cursor-pointer bg-[#0071e3] rounded-full shadow-sm hover:bg-[#0077ed] transition-all disabled:opacity-50 active:scale-95">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            Guardar Producto
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Info Básica */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Información Básica</h3>
                <p className="text-xs text-gray-500">Datos principales del producto.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Modelo (Nombre) *</label>
                <input required type="text" name="model" value={formData.model} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all appearance-none cursor-pointer" placeholder="Ej. iPhone 15 Pro Max" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Slug (URL) *</label>
                <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-500 focus:outline-none" readOnly={!slugEdited} />
              </div>
              <div className="relative">
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Categoría *</label>
                <select required name="category" value={formData.category} onChange={handleChange} className="w-full pl-3 pr-10 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all appearance-none cursor-pointer">
                  <option value="iphone">iPhone</option>
                  <option value="mac">Mac</option>
                  <option value="ipad">iPad</option>
                  <option value="airpods">AirPods</option>
                  <option value="accesorios">Accesorios</option>
                </select>
                <div className="absolute right-3 top-[30px] pointer-events-none text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Precio *</label>
                <input required type="text" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all appearance-none cursor-pointer" placeholder="Ej. S/ 4,599" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Stock Inicial *</label>
                <input required type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all appearance-none cursor-pointer" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Extra (Badge)</label>
                <input type="text" name="extra" value={formData.extra} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all appearance-none cursor-pointer" placeholder="Ej. Chip M3" />
              </div>
            </div>
          </div>
        </section>

        {/* Imagen */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <ImageIcon className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Fotografía *</h3>
                <p className="text-xs text-gray-500">Imagen principal del producto.</p>
              </div>
            </div>
            
            {previewUrl ? (
              <div className="flex flex-col items-start w-full">
                <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Vista previa</p>
                <div className="relative group w-48 h-48 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm transition-all hover:shadow-md">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain p-4" />
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white backdrop-blur-sm">
                    <CloudUpload className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">Cambiar imagen</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudUpload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-xs text-gray-500">
                      <span className="font-semibold">Haz clic para subir una imagen</span> o arrastra aquí
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG hasta 5MB</p>
                  </div>
                  <input required type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            )}
          </div>
        </section>

        {/* Especificaciones Opcionales */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <List className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Especificaciones (Opcionales)</h3>
                <p className="text-xs text-gray-500">Detalles técnicos adicionales.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Pantalla</label>
                <input type="text" name="screen" value={formData.screen} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all appearance-none cursor-pointer" placeholder="Ej. 6.7 pulgadas" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Procesador</label>
                <input type="text" name="processor" value={formData.processor} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all appearance-none cursor-pointer" placeholder="Ej. A17 Pro" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Almacenamiento</label>
                <input type="text" name="storage" value={formData.storage} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all appearance-none cursor-pointer" placeholder="Ej. 256GB" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Cámara</label>
                <input type="text" name="camera" value={formData.camera} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all appearance-none cursor-pointer" placeholder="Ej. 48MP" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Batería</label>
                <input type="text" name="battery" value={formData.battery} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all appearance-none cursor-pointer" placeholder="Ej. Hasta 29 hrs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Características (Accesorios)</label>
                <input type="text" name="features" value={formData.features} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all appearance-none cursor-pointer" placeholder="Ej. Cancelación de ruido" />
              </div>
            </div>
          </div>
        </section>

      </form>
    </div>
  );
}
