"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useTransition, useRef } from "react";

export function SearchProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleSearch = (term: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term.trim()) {
        params.set("q", term.trim());
        params.delete("page");
      } else {
        params.delete("q");
      }
      startTransition(() => {
        router.push(`/admin/productos?${params.toString()}`);
      });
    }, 300); // 300ms debounce
  };

  return (
    <div className="relative w-full sm:w-72">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className={`h-4 w-4 ${isPending ? "text-[#0071e3] animate-pulse" : "text-gray-400"}`} />
      </div>
      <input
        type="text"
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Buscar producto o categoría..."
        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
      />
    </div>
  );
}
