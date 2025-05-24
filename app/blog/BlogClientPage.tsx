"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from '@/hooks/use-translations'
import { BlogPostList } from '@/components/blog/BlogPostList'
import { NewsletterForm } from '@/components/blog/NewsletterForm'
import { SearchInput } from '@/components/blog/SearchInput'
import { LoadingPage } from '@/components/ui/loading'
import { BlogPost } from '@/types/blog'

export default function BlogClientPage() {
  const { t } = useTranslations()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/blog/posts')
        if (!response.ok) {
          throw new Error('Erro ao carregar posts')
        }
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-4">
          {t('blog.title')}
        </h1>
        <p className="text-xl text-gray-600 text-center mb-8">
          {t('blog.description')}
        </p>

        <div className="mb-8">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('blog.search.placeholder')}
          />
                            </div>

        <BlogPostList
          posts={filteredPosts}
          isLoading={isLoading}
          error={error}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 bg-gray-50 rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            {t('newsletter.title')}
          </h2>
          <p className="text-gray-600 text-center mb-6">
            {t('newsletter.description')}
          </p>
          <NewsletterForm
            placeholder={t('newsletter.placeholder')}
            buttonText={t('newsletter.button')}
          />
        </motion.div>
      </motion.div>
      </div>
  )
}
