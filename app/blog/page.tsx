import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/ui/breadcrumb"
import ChatbotSDR from "@/components/chatbot/chatbot-sdr"
import { getBlogPosts } from "../actions/blog-actions"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Blog | StrateUp",
  description: "Artigos, dicas e insights sobre marketing digital, estratégia de negócios e transformação digital.",
}

export default async function BlogPage() {
  const { posts, success } = await getBlogPosts()

  return (
    <>
      <Header />
      <main>
        <div className="bg-gray-50 py-6">
          <div className="container mx-auto">
            <Breadcrumb items={[{ label: "Blog" }]} />
          </div>
        </div>

        <section className="py-12">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Blog StrateUp</h1>
            <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Artigos, dicas e insights sobre marketing digital, estratégia de negócios e transformação digital.
            </p>

            {!success ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <p>Não foi possível carregar os artigos. Por favor, tente novamente mais tarde.</p>
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image_url || "/placeholder.svg?height=300&width=500"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-sm text-[#0066ff] font-medium">{post.category}</span>
                        <h2 className="text-xl font-bold mt-2 mb-3">{post.title}</h2>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Por {post.author}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(post.published_at || post.created_at).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Nenhum artigo encontrado.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotSDR />
    </>
  )
}
