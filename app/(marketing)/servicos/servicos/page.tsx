import type { Metadata } from "next"
import Image from "next/image"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ChatbotSDR from "@/components/features/chatbot/chatbot-sdr"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Serviços | StrateUp",
  description:
    "Conheça os serviços de consultoria estratégica da StrateUp para transformação digital, marketing e vendas. Soluções personalizadas para resultados mensuráveis.",
  keywords:
    "consultoria estratégica, transformação digital, marketing digital, estratégia de vendas, consultoria de negócios",
}

// Mock services data
const services = [
  {
    id: "consultoria",
    title: "Consultoria Estratégica",
    description:
      "Desenvolvemos estratégias personalizadas para impulsionar o crescimento do seu negócio, com foco em resultados mensuráveis e sustentáveis.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Análise completa do seu negócio e mercado",
      "Identificação de oportunidades de crescimento",
      "Desenvolvimento de plano estratégico personalizado",
      "Acompanhamento de implementação e resultados",
      "Otimização contínua baseada em dados",
    ],
    cta: "Agendar Consultoria Gratuita",
  },
  {
    id: "marketing",
    title: "Marketing Digital",
    description:
      "Criamos e implementamos estratégias de marketing digital que geram leads qualificados, aumentam conversões e fortalecem sua marca no ambiente online.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Estratégia de conteúdo alinhada ao seu público-alvo",
      "Otimização para mecanismos de busca (SEO)",
      "Gestão de campanhas de mídia paga",
      "Marketing de redes sociais",
      "Email marketing e automação",
    ],
    cta: "Conhecer Soluções de Marketing",
  },
  {
    id: "vendas",
    title: "Estratégia de Vendas",
    description:
      "Estruturamos processos comerciais eficientes que aumentam suas taxas de conversão, reduzem o ciclo de vendas e maximizam o valor do cliente.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Desenvolvimento de funil de vendas otimizado",
      "Treinamento e capacitação de equipe comercial",
      "Implementação de CRM e automação de vendas",
      "Estratégias de qualificação e nutrição de leads",
      "Técnicas de fechamento e pós-venda",
    ],
    cta: "Otimizar Processo de Vendas",
  },
  {
    id: "treinamentos",
    title: "Treinamentos",
    description:
      "Capacitamos sua equipe com conhecimentos e habilidades práticas em marketing digital, vendas e estratégia de negócios para autonomia na execução.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Treinamentos personalizados para sua equipe",
      "Workshops práticos com exercícios reais",
      "Material didático completo e atualizado",
      "Acompanhamento pós-treinamento",
      "Certificação para participantes",
    ],
    cta: "Conhecer Treinamentos",
  },
  {
    id: "implementacao",
    title: "Implementação de Sistemas",
    description:
      "Implementamos e integramos sistemas e ferramentas que automatizam processos, aumentam a produtividade e fornecem insights valiosos para seu negócio.",
    image: "/placeholder.svg?height=400&width=600",
    benefits: [
      "Análise de necessidades e seleção de ferramentas",
      "Implementação e configuração de sistemas",
      "Integração com plataformas existentes",
      "Treinamento da equipe para utilização",
      "Suporte técnico e manutenção",
    ],
    cta: "Solicitar Avaliação",
  },
]

export default function ServicosPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#e6f0ff] to-white py-16 md:py-24">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Soluções para <span className="text-[#0066ff]">Transformar</span> seu Negócio
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Oferecemos serviços especializados em estratégia, marketing digital e vendas para empresas que buscam
                crescimento sustentável e resultados mensuráveis.
              </p>
              <Button size="lg" className="bg-[#ff8c00] hover:bg-[#cc7000]">
                Agendar Diagnóstico Gratuito
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nossos Serviços</h2>
              <p className="text-lg text-gray-700">
                Desenvolvemos soluções personalizadas para cada etapa da jornada de transformação digital da sua
                empresa, desde o diagnóstico inicial até a implementação e otimização contínua.
              </p>
            </div>

            <div className="space-y-24">
              {services.map((service, index) => (
                <div key={service.id} id={service.id} className="scroll-mt-24">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? "lg:grid-flow-dense" : ""
                    }`}
                  >
                    <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h3>
                      <p className="text-lg text-gray-700 mb-6">{service.description}</p>

                      <div className="space-y-3 mb-8">
                        {service.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start">
                            <CheckCircle className="h-6 w-6 text-[#0066ff] mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-gray-700">{benefit}</p>
                          </div>
                        ))}
                      </div>

                      <Button className="bg-[#0066ff] hover:bg-[#0052cc]">
                        {service.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                      <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {index < services.length - 1 && <div className="border-b border-gray-200 mt-16"></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nosso Processo</h2>
              <p className="text-lg text-gray-700">
                Trabalhamos de forma estruturada e transparente, seguindo uma metodologia comprovada que garante
                resultados consistentes para nossos clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md relative">
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-[#0066ff] text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 pt-4">Diagnóstico</h3>
                <p className="text-gray-700">
                  Realizamos uma análise completa do seu negócio, identificando pontos fortes, oportunidades de melhoria
                  e definindo objetivos claros.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md relative">
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-[#0066ff] text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 pt-4">Estratégia</h3>
                <p className="text-gray-700">
                  Desenvolvemos um plano estratégico personalizado, com ações priorizadas e métricas de acompanhamento
                  claramente definidas.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md relative">
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-[#0066ff] text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 pt-4">Implementação</h3>
                <p className="text-gray-700">
                  Executamos as estratégias definidas, trabalhando lado a lado com sua equipe e garantindo a correta
                  aplicação das técnicas.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md relative">
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-[#0066ff] text-white flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-bold mb-4 pt-4">Otimização</h3>
                <p className="text-gray-700">
                  Monitoramos continuamente os resultados, realizando ajustes e melhorias para maximizar o retorno sobre
                  investimento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-[#0066ff] text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Transformar seu Negócio?</h2>
              <p className="text-lg mb-8 opacity-90">
                Agende uma consultoria gratuita e descubra como podemos ajudar sua empresa a alcançar resultados
                extraordinários com estratégias personalizadas.
              </p>
              <Button size="lg" className="bg-white text-[#0066ff] hover:bg-gray-100">
                Agendar Consultoria Gratuita
              </Button>
            </div>
          </div>
        </section>
      </div>

      <ChatbotSDR leadType="morno" />
      <Footer />
    </main>
  )
}
