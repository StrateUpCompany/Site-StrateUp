"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FaqItem[] = [
    {
      question: "Como funciona o diagnóstico de maturidade digital?",
      answer:
        "O diagnóstico é um questionário estruturado que avalia diferentes aspectos da sua presença digital, incluindo site, redes sociais, estratégia comercial e processos internos. Após o preenchimento, nosso sistema gera um relatório personalizado com pontuação por área e recomendações específicas para seu negócio.",
    },
    {
      question: "Quanto tempo leva para ver resultados após implementar as estratégias?",
      answer:
        "Os primeiros resultados geralmente começam a aparecer entre 30 e 60 dias após o início da implementação. No entanto, o tempo exato varia conforme o setor, situação atual da empresa e quão rapidamente as estratégias são implementadas. Nossos clientes costumam ver melhorias significativas em métricas-chave dentro de 90 dias.",
    },
    {
      question: "A StrateUp trabalha com empresas de qualquer tamanho?",
      answer:
        "Sim, trabalhamos com empresas de todos os portes, desde startups até grandes corporações. Nossa metodologia é adaptável e escalável, permitindo criar estratégias personalizadas para diferentes realidades e orçamentos. Temos soluções específicas para pequenas, médias e grandes empresas.",
    },
    {
      question: "Quais setores a StrateUp atende?",
      answer:
        "Atendemos empresas de diversos setores, incluindo varejo, serviços, saúde, educação, tecnologia, indústria e muitos outros. Nossa metodologia é adaptável a diferentes mercados, e contamos com consultores especializados em diversos segmentos para garantir estratégias relevantes e eficazes para cada setor.",
    },
    {
      question: "Como é feito o acompanhamento dos resultados?",
      answer:
        "Implementamos um sistema de monitoramento contínuo com dashboards personalizados que mostram a evolução das principais métricas do seu negócio. Realizamos reuniões periódicas de acompanhamento para analisar resultados, identificar oportunidades de otimização e ajustar estratégias conforme necessário.",
    },
    {
      question: "Preciso ter conhecimento técnico para implementar as estratégias?",
      answer:
        "Não. Nossas recomendações são apresentadas de forma clara e acessível, e oferecemos suporte completo na implementação. Para clientes que preferem uma solução mais hands-off, também oferecemos serviços de implementação onde nossa equipe executa as estratégias para você.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-lg text-gray-700">Tire suas dúvidas sobre nossos serviços e metodologia</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border border-gray-200 rounded-lg bg-white overflow-hidden">
              <button
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-inset"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#0066ff]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
