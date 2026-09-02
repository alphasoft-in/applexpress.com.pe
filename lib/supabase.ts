import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kduevgbrnffmmijdmvox.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_e8WkqQQMeAmmQ3X2jHWUig_Fy5DnULD";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
