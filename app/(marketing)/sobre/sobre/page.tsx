import Image from "next/image"
import type { Metadata } from "next"
import Logo from "@/components/shared/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sobre Nós | StrateUp",
  description:
    "Conheça a história, missão e valores da StrateUp. Saiba como ajudamos empresas a transformar suas estratégias digitais em resultados mensuráveis.",
}

export default function SobrePage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-[#0d1829] to-[#0066ff] text-white py-20">
        <div className="container">
          <div className="flex flex-col items-center text-center">
            <Logo variant="white" className="mb-8 animate-fadeIn" />
            <h1 className="animate-slideUp">Sobre a StrateUp</h1>
            <p className="text-xl max-w-3xl mx-auto animate-slideUp animation-delay-100">
              Transformando estratégias digitais em resultados mensuráveis para empresas que buscam crescimento
              sustentável.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[#0066ff]">Nossa História</h2>
              <p>
                A StrateUp nasceu da percepção de que muitas empresas investem em marketing digital sem uma estratégia
                clara e mensurável. Fundada em 2018 por especialistas com mais de 15 anos de experiência no mercado,
                nossa missão é transformar a maneira como as empresas abordam sua presença digital.
              </p>
              <p>
                Ao longo dos anos, desenvolvemos uma metodologia própria de diagnóstico que permite identificar com
                precisão os gargalos e oportunidades no funil de vendas digital de nossos clientes, possibilitando ações
                estratégicas com alto retorno sobre investimento.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Nossa+História"
                alt="História da StrateUp"
                fill
                className="object-cover"
              />
              {/* Logo overlay in the corner */}
              <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg shadow-md">
                <Logo variant="small" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-center text-[#0066ff] mb-12">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Resultados Mensuráveis",
                description:
                  "Acreditamos que toda estratégia deve ser mensurável e gerar resultados concretos para o negócio.",
              },
              {
                title: "Transparência",
                description:
                  "Mantemos uma comunicação clara e honesta com nossos clientes em todas as etapas do processo.",
              },
              {
                title: "Inovação Contínua",
                description:
                  "Buscamos constantemente novas tecnologias e metodologias para oferecer soluções de ponta.",
              },
            ].map((valor, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-[#0066ff] mb-4">{valor.title}</h3>
                <p>{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-[#0066ff]">Nossa Equipe</h2>
            <p className="max-w-3xl mx-auto">
              Contamos com profissionais especializados em diferentes áreas do marketing digital, formando um time
              multidisciplinar capaz de atender às diversas necessidades de nossos clientes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Ana Silva", role: "CEO & Fundadora" },
              { name: "Carlos Mendes", role: "Diretor de Estratégia" },
              { name: "Juliana Costa", role: "Head de Marketing" },
              { name: "Roberto Alves", role: "Especialista em Analytics" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=200&width=200&text=${member.name}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0066ff] text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Pronto para transformar sua estratégia digital?</h2>
              <p className="text-xl">
                Faça agora mesmo nosso diagnóstico gratuito e descubra oportunidades para seu negócio.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-[#0066ff] hover:bg-gray-100">
                <Link href="/diagnostico">Fazer Diagnóstico</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/contato">Falar com Especialista</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
