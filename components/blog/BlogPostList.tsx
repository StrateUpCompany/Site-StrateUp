"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BlogPost } from '@/types/blog'
import { BlogPostCard } from './BlogPostCard'
import { LoadingCard } from '@/components/ui/loading'

interface BlogPostListProps {
  posts: BlogPost[]
  isLoading?: boolean
  error?: string
}

export function BlogPostList({ posts, isLoading = false, error }: BlogPostListProps) {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-red-600 mb-2">Erro ao carregar posts</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    )
  }

  if (!filteredPosts.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum post encontrado</h3>
        <p className="text-gray-600">Tente ajustar seus filtros ou volte mais tarde.</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {filteredPosts.map((post, index) => (
          <BlogPostCard key={post.slug} post={post} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
} 