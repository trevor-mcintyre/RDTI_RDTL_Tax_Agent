import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// ✅ Warn if env variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("[supabaseClient] Missing Supabase environment variables. Check your .env config.");
}

// ✅ Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
