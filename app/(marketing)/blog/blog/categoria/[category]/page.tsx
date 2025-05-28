import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ChatbotSDR from "@/components/features/chatbot/chatbot-sdr"
import { Search, Calendar, User, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getBlogPosts, getBlogCategories } from "@/core/actions/blog-actions"

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category.replace(/-/g, " ")

  return {
    title: `${category} | Blog StrateUp`,
    description: `Artigos sobre ${category.toLowerCase()} no blog da StrateUp. Confira as últimas tendências, dicas e estratégias.`,
    keywords: `${category}, marketing digital, transformação digital, estratégia de negócios, blog`,
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const decodedCategory = params.category.replace(/-/g, " ")
  const { posts, success } = await getBlogPosts(10, 0, decodedCategory)
  const { categories } = await getBlogCategories()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#e6f0ff] to-white py-16 md:py-20">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <Link href="/blog" className="inline-flex items-center text-[#0066ff] hover:underline mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para o Blog
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Categoria: <span className="text-[#0066ff]">{decodedCategory}</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Artigos, dicas e estratégias sobre {decodedCategory.toLowerCase()} para impulsionar os resultados do seu
                negócio.
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
                <h2 className="text-2xl font-bold mb-8">Artigos em {decodedCategory}</h2>

                {posts.length > 0 ? (
                  <div className="space-y-10">
                    {posts.map((post) => (
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
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Nenhum artigo encontrado nesta categoria.</p>
                    <Link href="/blog">
                      <Button className="bg-[#0066ff] hover:bg-[#0052cc]">Ver todos os artigos</Button>
                    </Link>
                  </div>
                )}

                {posts.length > 0 && (
                  <div className="mt-10 flex justify-center">
                    <Button variant="outline" className="mr-2">
                      Anterior
                    </Button>
                    <Button className="bg-[#0066ff] hover:bg-[#0052cc]">Próxima</Button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {/* Categories */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-bold mb-4">Categorias</h3>
                    <ul className="space-y-2">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <Link
                            href={`/blog/categoria/${category.toLowerCase().replace(/\s+/g, "-")}`}
                            className={`${
                              category.toLowerCase() === decodedCategory.toLowerCase()
                                ? "text-[#0066ff] font-medium"
                                : "text-gray-700 hover:text-[#0066ff]"
                            } transition-colors duration-200`}
                          >
                            {category}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

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
                      <button
                        type="submit"
                        className="w-full bg-white text-[#0066ff] hover:bg-gray-100 px-4 py-2 rounded-md font-medium"
                      >
                        Inscrever-se
                      </button>
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
