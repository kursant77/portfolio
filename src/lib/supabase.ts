import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  // Only show error in development
  if (import.meta.env.DEV) {
    const errorMessage = `
      ⚠️ Supabase environment variables are missing!
      
      Please create a .env file in the root directory with:
      
      VITE_SUPABASE_URL=your_supabase_project_url
      VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
      
      You can get these values from:
      1. Supabase Dashboard > Project Settings > API
      2. Or check SUPABASE_SETUP.md for detailed instructions
    `;
    console.error(errorMessage);
  }
  
  // Throw a more descriptive error
  if (!supabaseUrl) {
    throw new Error('VITE_SUPABASE_URL is required. Please check your .env file or environment variables.');
  }
  if (!supabaseAnonKey) {
    throw new Error('VITE_SUPABASE_ANON_KEY is required. Please check your .env file or environment variables.');
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-client-info': 'portfolio-app',
    },
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

