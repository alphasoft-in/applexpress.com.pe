"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, ChevronRight, ShieldCheck } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError("Credenciales incorrectas o usuario no autorizado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-center relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-[420px] px-4 sm:px-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-xl py-10 px-8 shadow-2xl shadow-gray-200/50 sm:rounded-[2rem] border border-white/60 relative overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-900 to-black text-white shadow-lg mb-6 shadow-black/10 ring-1 ring-black/5">
              <FaApple className="w-8 h-8 -mt-1" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
              Apple Express
            </h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Panel de Administración
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-100 text-red-600 px-4 py-3.5 rounded-xl text-sm flex items-center gap-3 font-medium shadow-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></div>
                {error}
              </motion.div>
            )}
            
            <div className="space-y-4">
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0071e3] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#0071e3]/10 focus:border-[#0071e3] focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0071e3] transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#0071e3]/10 focus:border-[#0071e3] focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-[#0071e3] hover:bg-[#0077ed] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-[#0071e3]/20 overflow-hidden"
              >
                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Iniciar Sesión
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            Acceso seguro y encriptado
          </div>
        </motion.div>
      </div>
    </div>
  );
}
