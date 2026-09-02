"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConfiguracionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    banner_text: "",
    whatsapp_number: "",
    contact_email: "",
    facebook_link: "",
    instagram_link: "",
    tiktok_link: "",
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("*")
          .eq("id", 1)
          .single();

        if (error) {
          console.error("Error al obtener configuración, puede que la tabla no exista aún.", error);
          return;
        }
        
        if (data) {
          setFormData({
            banner_text: data.banner_text || "",
            whatsapp_number: data.whatsapp_number || "",
            contact_email: data.contact_email || "",
            facebook_link: data.facebook_link || "",
            instagram_link: data.instagram_link || "",
            tiktok_link: data.tiktok_link || "",
          });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from("settings")
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);

      if (error) throw error;

      alert("Configuración guardada correctamente");
      router.refresh();
    } catch (error: any) {
      console.error("Error updating settings:", error);
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="mt-1 text-sm text-gray-500">
          Administra la información general y banners de la tienda pública.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          {/* General */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">General</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Texto del Banner Superior</label>
                <input 
                  type="text" 
                  name="banner_text" 
                  value={formData.banner_text} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071e3]" 
                  placeholder="Ej. Envío gratis a todo el Perú..." 
                />
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de WhatsApp (con código de país)</label>
                <input 
                  type="text" 
                  name="whatsapp_number" 
                  value={formData.whatsapp_number} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071e3]" 
                  placeholder="Ej. 51999888777" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  name="contact_email" 
                  value={formData.contact_email} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071e3]" 
                  placeholder="Ej. ventas@applexpress.com.pe" 
                />
              </div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Redes Sociales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enlace de Facebook</label>
                <input 
                  type="url" 
                  name="facebook_link" 
                  value={formData.facebook_link} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071e3]" 
                  placeholder="https://facebook.com/..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enlace de Instagram</label>
                <input 
                  type="url" 
                  name="instagram_link" 
                  value={formData.instagram_link} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071e3]" 
                  placeholder="https://instagram.com/..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enlace de TikTok</label>
                <input 
                  type="url" 
                  name="tiktok_link" 
                  value={formData.tiktok_link} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071e3]" 
                  placeholder="https://tiktok.com/@..." 
                />
              </div>
            </div>
          </div>

        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button disabled={saving} type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[#0071e3] rounded-lg hover:bg-[#0077ed] transition-colors disabled:opacity-50">
            {saving ? "Guardando..." : <><Save className="w-4 h-4" /> Guardar Cambios</>}
          </button>
        </div>
      </form>
    </div>
  );
}
