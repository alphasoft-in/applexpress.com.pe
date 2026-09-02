"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface ProductActionsProps {
  productId: string;
}

export function ProductActions({ productId }: ProductActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const { error } = await supabase.from("products").delete().eq("id", productId);
      if (error) throw error;
      
      // Refresh the page to show the updated list
      router.refresh();
    } catch (error: any) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar el producto: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-end gap-3">
      <Link 
        href={`/admin/productos/${productId}`} 
        className="text-[#0071e3] hover:text-[#0077ed] transition-colors p-1" 
        title="Editar"
      >
        <Pencil className="w-4 h-4" />
      </Link>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-500 hover:text-red-700 transition-colors p-1 disabled:opacity-50" 
        title="Eliminar"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
