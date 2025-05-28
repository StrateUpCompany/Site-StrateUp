import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#0066ff] to-[#0052cc] text-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Transformar sua Estratégia Digital?</h2>

          <p className="text-lg md:text-xl mb-8 opacity-90">
            Faça agora seu diagnóstico gratuito e descubra como sua empresa pode alcançar resultados extraordinários com
            estratégias personalizadas.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostico">
              <Button size="lg" className="bg-white text-[#0066ff] hover:bg-gray-100">
                Fazer Diagnóstico Gratuito
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/contato">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Falar com um Consultor
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm opacity-80">
            Mais de 200 empresas já transformaram seus resultados com nossa metodologia. Seja a próxima história de
            sucesso!
          </p>
        </div>
      </div>
    </section>
  )
}
