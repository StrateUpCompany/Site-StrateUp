export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  date: string
  author: string
  category: string
  tags?: string[]
  featured?: boolean
  createdAt: string
  updatedAt: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  postCount?: number
  createdAt: string
  updatedAt: string
} 