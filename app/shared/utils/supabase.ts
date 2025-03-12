import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseUrl: string = '';
let supabaseAnonKey: string = '';

if (typeof window !== 'undefined') {
  // Это гарантирует, что код будет выполняться только на клиенте
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
}

let supabase: SupabaseClient<any, 'public', any>;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}
export { supabase };
