'use server'

import { createServerSupabaseClient } from "@/core/lib/supabase/client"

export async function getBlogPosts() {
  try {
    console.log('Iniciando busca de posts no servidor...')
    const supabase = createServerSupabaseClient()
    
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar posts no servidor:', error)
      return { posts: [], success: false, error: error.message }
    }

    console.log('Posts encontrados no servidor:', posts?.length)
    return { posts: posts || [], success: true }
  } catch (error) {
    console.error('Erro ao buscar posts no servidor:', error)
    return { posts: [], success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' }
  }
}

export async function getBlogCategories() {
  try {
    console.log('Iniciando busca de categorias no servidor...')
    const supabase = createServerSupabaseClient()
    
    const { data: categories, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Erro ao buscar categorias no servidor:', error)
      return { categories: [], success: false, error: error.message }
    }

    console.log('Categorias encontradas no servidor:', categories?.length)
    return { categories: categories?.map(cat => cat.name) || [], success: true }
  } catch (error) {
    console.error('Erro ao buscar categorias no servidor:', error)
    return { categories: [], success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' }
  }
}
