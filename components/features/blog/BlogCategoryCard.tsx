import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import type { BlogCategory } from '@/core/types/blog'

interface BlogCategoryCardProps {
  category: BlogCategory
  index: number
}

export function BlogCategoryCard({ category, index }: BlogCategoryCardProps) {
  const controls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        // Aguarda 3 segundos
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // Pulso suave no card
        await controls.start({
          scale: 1.02,
          transition: { duration: 0.3 }
        })
        await controls.start({
          scale: 1,
          transition: { duration: 0.3 }
        })
        
        // Aguarda mais 3 segundos
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // Animação no contador de posts
        await controls.start({
          y: -2,
          transition: { duration: 0.2 }
        })
        await controls.start({
          y: 0,
          transition: { duration: 0.2 }
        })
      }
    }

    sequence()
  }, [controls])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={controls}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link
        href={`/blog/categoria/${category.slug}`}
        className="block rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
      >
        <motion.h3
          whileHover={{ x: 5 }}
          className="mb-2 text-xl font-bold text-gray-900"
        >
          {category.name}
        </motion.h3>
        
        {category.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-gray-600"
          >
            {category.description}
          </motion.p>
        )}
        
        {category.postCount !== undefined && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600"
          >
            {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
          </motion.div>
        )}
      </Link>
    </motion.div>
  )
} 