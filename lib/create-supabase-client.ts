import { createClientSupabaseClient } from "@/lib/supabase"

// Helper function to create a Supabase client
export function createClient() {
  return createClientSupabaseClient()
}
