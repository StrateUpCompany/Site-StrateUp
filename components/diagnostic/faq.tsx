"use client"

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "Quanto tempo leva para receber o relatório?",
    answer: "O relatório é gerado automaticamente após o preenchimento do diagnóstico e enviado para seu email em até 24 horas."
  },
  {
    question: "O diagnóstico é gratuito?",
    answer: "Sim, o diagnóstico é totalmente gratuito. Você receberá um relatório completo com recomendações personalizadas sem custo."
  },
  {
    question: "Quais informações são analisadas?",
    answer: "Analisamos diversos aspectos da sua presença digital, incluindo website, redes sociais, marketing digital, análise de dados e processos comerciais."
  },
  {
    question: "Como posso usar o relatório?",
    answer: "O relatório serve como um guia prático para melhorar sua estratégia digital. Você pode usá-lo para priorizar ações e implementar melhorias em sua presença online."
  },
  {
    question: "Preciso ter conhecimento técnico?",
    answer: "Não, o diagnóstico foi desenvolvido para ser acessível a todos. As perguntas são claras e objetivas, e o relatório é apresentado de forma simples e prática."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tire suas dúvidas sobre o diagnóstico de maturidade digital.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                className="w-full py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold">{item.question}</span>
                <span className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <i className="fas fa-chevron-down"></i>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 