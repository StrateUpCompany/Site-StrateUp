import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Create a singleton instance of the Supabase client to be used throughout the app
// This prevents multiple instances from being created

// For server components
const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Variáveis de ambiente do Supabase não encontradas para o servidor')
    throw new Error('Supabase configuration missing')
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  })
}

// For client components
let clientSupabaseInstance: ReturnType<typeof createSupabaseClient> | null = null

const createClientSupabaseClient = () => {
  if (clientSupabaseInstance) return clientSupabaseInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Variáveis de ambiente do Supabase não encontradas para o cliente')
    throw new Error('Supabase configuration missing')
  }

  console.log('Criando cliente Supabase com URL:', supabaseUrl)
  clientSupabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey)
  return clientSupabaseInstance
}

// Helper function that uses the server client by default
const createClient = () => {
  return createServerSupabaseClient()
}

export { createServerSupabaseClient, createClientSupabaseClient, createClient }
