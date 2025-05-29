import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogNotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container py-16 flex flex-col items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
          <p className="text-gray-700 mb-6">
            O artigo que você está procurando não foi encontrado ou pode ter sido removido.
          </p>
          <Link href="/blog">
            <Button className="bg-[#0066ff]">Voltar para o Blog</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
