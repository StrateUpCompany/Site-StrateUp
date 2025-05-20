"use client"

import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ChatbotSDR from "@/components/chatbot/chatbot-sdr"
import { Search, Calendar, User, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getBlogPosts, getBlogCategories } from "@/app/actions/blog-actions"
import { useEffect, useState } from "react"

export default function BlogClientPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [postsSuccess, setPostsSuccess] = useState<boolean>(false)
  const [categoriesSuccess, setCategoriesSuccess] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const postsData = await getBlogPosts()
      const categoriesData = await getBlogCategories()

      setPosts(postsData.posts)
      setCategories(categoriesData.categories)
      setPostsSuccess(postsData.success)
      setCategoriesSuccess(categoriesData.success)
    }

    fetchData()
  }, [])

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#e6f0ff] to-white py-16 md:py-20">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog StrateUp</h1>
              <p className="text-lg text-gray-700 mb-8">
                Insights, estratégias e tendências sobre marketing digital, transformação digital e estratégias de
                negócios para impulsionar seus resultados.
              </p>

              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:border-transparent"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-8">Artigos Recentes</h2>

                {!postsSuccess ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Erro ao carregar artigos</h3>
                    <p className="text-gray-700 mb-4">
                      Não foi possível carregar os artigos no momento. Por favor, tente novamente mais tarde.
                    </p>
                    <Button onClick={() => window.location.reload()} className="bg-[#0066ff] hover:bg-[#0052cc]">
                      Tentar novamente
                    </Button>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">Nenhum artigo encontrado</h3>
                    <p className="text-gray-700">
                      Não há artigos publicados no momento. Volte em breve para novos conteúdos.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {posts.map((post: any) => (
                      <article key={post.id} className="border-b border-gray-200 pb-10 last:border-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="relative h-60 md:h-full rounded-lg overflow-hidden">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <span className="bg-blue-100 text-[#0066ff] px-2 py-1 rounded text-xs font-medium">
                                {post.category}
                              </span>
                              <span className="mx-2">•</span>
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{post.date}</span>
                              <span className="mx-2">•</span>
                              <User className="h-4 w-4 mr-1" />
                              <span>{post.author}</span>
                            </div>

                            <h3 className="text-xl font-bold mb-2">
                              <Link
                                href={`/blog/${post.slug}`}
                                className="hover:text-[#0066ff] transition-colors duration-200"
                              >
                                {post.title}
                              </Link>
                            </h3>

                            <p className="text-gray-700 mb-4">{post.excerpt}</p>

                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center text-[#0066ff] font-medium hover:underline"
                            >
                              Ler mais <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {postsSuccess && posts.length > 0 && (
                  <div className="mt-10 flex justify-center">
                    <Button variant="outline" className="mr-2" disabled>
                      Anterior
                    </Button>
                    <Button className="bg-[#0066ff] hover:bg-[#0052cc]" disabled>
                      Próxima
                    </Button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {/* Categories */}
                  {categoriesSuccess && categories.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                      <h3 className="text-lg font-bold mb-4">Categorias</h3>
                      <ul className="space-y-2">
                        {categories.map((category, index) => (
                          <li key={index}>
                            <Link
                              href={`/blog/categoria/${category.toLowerCase().replace(/\s+/g, "-")}`}
                              className="text-gray-700 hover:text-[#0066ff] transition-colors duration-200"
                            >
                              {category}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Popular Posts */}
                  {postsSuccess && posts.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                      <h3 className="text-lg font-bold mb-4">Artigos Populares</h3>
                      <div className="space-y-4">
                        {posts.slice(0, 3).map((post: any) => (
                          <div key={post.id} className="flex items-start">
                            <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0 mr-4">
                              <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-1">
                                <Link
                                  href={`/blog/${post.slug}`}
                                  className="hover:text-[#0066ff] transition-colors duration-200"
                                >
                                  {post.title}
                                </Link>
                              </h4>
                              <div className="text-xs text-gray-500">
                                <Calendar className="inline-block h-3 w-3 mr-1" />
                                <span>{post.date}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Newsletter */}
                  <div className="bg-[#0066ff] text-white rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Inscreva-se na Newsletter</h3>
                    <p className="mb-4 text-sm opacity-90">
                      Receba as últimas tendências e estratégias de marketing digital diretamente no seu email.
                    </p>
                    <form className="space-y-3">
                      <input
                        type="email"
                        placeholder="Seu melhor email"
                        className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                        required
                      />
                      <Button className="w-full bg-white text-[#0066ff] hover:bg-gray-100">Inscrever-se</Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ChatbotSDR leadType="morno" />
      <Footer />
    </main>
  )
}
