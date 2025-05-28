import { createClientSupabaseClient } from "@/core/lib/supabase/client"

// Helper function to create a Supabase client
export function createClient() {
  return createClientSupabaseClient()
}
