import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SBURL;
const supabaseKey = import.meta.env.VITE_SBKEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
