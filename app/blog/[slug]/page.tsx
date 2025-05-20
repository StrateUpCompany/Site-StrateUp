import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Breadcrumb from "@/components/ui/breadcrumb"
import ChatbotSDR from "@/components/chatbot/chatbot-sdr"
import { getBlogPost, getRelatedPosts } from "@/app/actions/blog-actions"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { post, success } = await getBlogPost(params.slug)

  if (!success || !post) {
    return {
      title: "Artigo não encontrado | StrateUp",
      description: "O artigo que você está procurando não foi encontrado.",
    }
  }

  return {
    title: `${post.title} | Blog StrateUp`,
    description: post.excerpt || "Leia este artigo no blog da StrateUp.",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author],
      images: [
        {
          url: post.image_url || "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { post, success } = await getBlogPost(params.slug)

  if (!success || !post) {
    notFound()
  }

  const { posts: relatedPosts } = await getRelatedPosts(post.category, post.id)

  const formattedDate = new Date(post.published_at || post.created_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <>
      <Header />
      <main>
        <div className="bg-gray-50 py-6">
          <div className="container mx-auto">
            <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
          </div>
        </div>

        <article className="py-12">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

              <div className="flex items-center mb-8">
                <div className="mr-6">
                  <span className="text-sm text-gray-500">Por </span>
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="mr-6">
                  <span className="text-sm text-gray-500">{formattedDate}</span>
                </div>
                <Link
                  href={`/blog/categoria/${encodeURIComponent(post.category.toLowerCase())}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors"
                >
                  {post.category}
                </Link>
              </div>

              {post.image_url && (
                <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.image_url || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </article>

        {relatedPosts && relatedPosts.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-8">Artigos Relacionados</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                      <div className="relative h-48 w-full">
                        <Image
                          src={relatedPost.image_url || "/placeholder.svg?height=300&width=500"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3">{relatedPost.title}</h3>
                        <p className="text-gray-600">{relatedPost.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <ChatbotSDR />
    </>
  )
}
