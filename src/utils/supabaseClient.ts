// src/utils/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// TODO: Replace with your actual Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Get your Supabase URL and anon key from your Supabase project dashboard:
// https://app.supabase.com/project/_/settings/api
