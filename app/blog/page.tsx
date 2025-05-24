import type { Metadata } from "next"
import BlogClientPage from "./BlogClientPage"

export const metadata: Metadata = {
  title: "Blog | StrateUp",
  description: "Artigos, dicas e insights sobre marketing digital, estratégia de negócios e transformação digital.",
}

export default function BlogPage() {
  return <BlogClientPage />
}
