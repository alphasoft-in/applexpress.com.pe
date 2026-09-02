"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Megaphone, Phone, Mail, Video, CheckCircle2 } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ConfiguracionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    banner_text: "",
    whatsapp_number: "",
    whatsapp_number_2: "",
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

        if (error) return;
        
        if (data) {
          setFormData({
            banner_text: data.banner_text || "",
            whatsapp_number: data.whatsapp_number || "",
            whatsapp_number_2: data.whatsapp_number_2 || "",
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
    setShowSuccess(false);

    try {
      const { error } = await supabase
        .from("settings")
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);

      if (error) throw error;

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
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
    <div className="max-w-5xl mx-auto pb-12">
      {/* Encabezado fijo para acciones rápidas */}
      <div className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md pt-4 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
          <p className="mt-1 text-sm text-gray-500">
            Personaliza la información pública de tu tienda.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {showSuccess && (
            <span className="text-sm font-medium text-emerald-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4 duration-300">
              <CheckCircle2 className="w-4 h-4" /> Guardado
            </span>
          )}
          <button 
            onClick={handleSubmit} 
            disabled={saving} 
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[#0071e3] rounded-full shadow-sm hover:bg-[#0077ed] transition-all disabled:opacity-50 active:scale-95"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Guardar Cambios
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Banner General */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Megaphone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Banner Superior</h2>
                <p className="text-sm text-gray-500">El mensaje que aparece en la parte más alta de la tienda.</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Texto del Anuncio</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="banner_text" 
                  value={formData.banner_text} 
                  onChange={handleChange} 
                  className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all" 
                  placeholder="Ej. Envío gratis a todo el Perú en compras mayores a S/ 200" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contacto y Ventas */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Contacto y Ventas</h2>
                <p className="text-sm text-gray-500">Los números donde tus clientes se comunicarán para comprar.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp (Asesor 1)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="w-4 h-4 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    name="whatsapp_number" 
                    value={formData.whatsapp_number} 
                    onChange={handleChange} 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all" 
                    placeholder="Ej. 51934288165" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp (Asesor 2)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="w-4 h-4 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    name="whatsapp_number_2" 
                    value={formData.whatsapp_number_2} 
                    onChange={handleChange} 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all" 
                    placeholder="Ej. 51982848503" 
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico Principal</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    name="contact_email" 
                    value={formData.contact_email} 
                    onChange={handleChange} 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all" 
                    placeholder="ventas@applexpress.com.pe" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Redes Sociales */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                <FaInstagram className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Redes Sociales</h2>
                <p className="text-sm text-gray-500">Enlaces que aparecerán en el pie de página de la web.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enlace de Facebook</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaFacebook className="w-4 h-4 text-gray-400" />
                  </div>
                  <input 
                    type="url" 
                    name="facebook_link" 
                    value={formData.facebook_link} 
                    onChange={handleChange} 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all" 
                    placeholder="https://facebook.com/..." 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enlace de Instagram</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaInstagram className="w-4 h-4 text-gray-400" />
                  </div>
                  <input 
                    type="url" 
                    name="instagram_link" 
                    value={formData.instagram_link} 
                    onChange={handleChange} 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all" 
                    placeholder="https://instagram.com/..." 
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Enlace de TikTok</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaTiktok className="w-4 h-4 text-gray-400" />
                  </div>
                  <input 
                    type="url" 
                    name="tiktok_link" 
                    value={formData.tiktok_link} 
                    onChange={handleChange} 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all" 
                    placeholder="https://tiktok.com/@..." 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </form>
    </div>
  );
}
