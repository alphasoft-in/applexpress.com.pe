"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // No trackear rutas de administración
    if (pathname && !pathname.startsWith("/admin")) {
      const recordView = async () => {
        try {
          await supabase.from("page_views").insert([
            { path: pathname }
          ]);
        } catch (error) {
          console.error("Error tracking page view:", error);
        }
      };

      recordView();
    }
  }, [pathname]);

  return null;
}
