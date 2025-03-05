import { createClient } from '@supabase/supabase-js';

// Retrieve values from environment variables if available, or use hardcoded values as fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://maqgaxfwwiuionbqxvtd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hcWdheGZ3d2l1aW9uYnF4dnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExOTkwMDAsImV4cCI6MjA1Njc3NTAwMH0.e5W-xl2hYVbi3WKCl6n6Brkt2saB4CrSkhVY2zEybo4';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

// Create singleton Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false, // Disabled for security
    storageKey: 'debugshala-admin-auth', // Custom storage key for the session
  },
  global: {
    // Custom error handling for fetch calls
    fetch: (...args) => {
      return fetch(...args).catch(err => {
        console.error('Network error during Supabase operation:', err);
        throw err;
      });
    }
  },
  // Add some reasonable timeouts
  db: {
    schema: 'public'
  }
});

export default supabase;
