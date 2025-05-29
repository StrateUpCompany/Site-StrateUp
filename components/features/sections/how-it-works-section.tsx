"use client"

import { useState } from "react"
import Image from "next/image"
import { Tab } from "@headlessui/react"
import { ClipboardCheck, FileText, LineChart, Users } from "lucide-react"
import { cn } from "@/core/utils"

export default function HowItWorksSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const steps = [
    {
      icon: <ClipboardCheck className="h-6 w-6" />,
      title: "Diagnóstico",
      description:
        "Realizamos uma análise completa da maturidade digital do seu negócio, identificando pontos fortes e oportunidades de melhoria.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Estratégia",
      description:
        "Desenvolvemos um plano estratégico personalizado, com ações claras e priorizadas para maximizar resultados.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Implementação",
      description:
        "Nossa equipe trabalha lado a lado com você para implementar as estratégias, garantindo execução perfeita.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Otimização",
      description:
        "Monitoramos resultados continuamente, realizando ajustes para garantir melhoria constante e ROI crescente.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Transformamos seu Negócio</h2>
          <p className="text-lg text-gray-700">
            Nossa metodologia exclusiva foi desenvolvida para garantir resultados rápidos e sustentáveis, com foco em
            implementação prática e ROI mensurável.
          </p>
        </div>

        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex flex-wrap justify-center space-x-1 rounded-xl bg-white p-1 shadow-md mb-8">
            {steps.map((step, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  cn(
                    "flex items-center space-x-2 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-opacity-50",
                    selected ? "bg-[#0066ff] text-white shadow" : "text-gray-700 hover:bg-gray-100",
                  )
                }
              >
                <span>{step.icon}</span>
                <span>{step.title}</span>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-8">
            {steps.map((step, index) => (
              <Tab.Panel
                key={index}
                className={cn(
                  "rounded-xl bg-white p-6 shadow-md",
                  "focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-opacity-50",
                )}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-lg text-gray-700 mb-6">{step.description}</p>

                    {index === 0 && (
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            1
                          </div>
                          <p>Análise completa da presença digital</p>
                        </div>
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            2
                          </div>
                          <p>Avaliação de processos comerciais</p>
                        </div>
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            3
                          </div>
                          <p>Identificação de oportunidades de crescimento</p>
                        </div>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            1
                          </div>
                          <p>Desenvolvimento de funil de vendas otimizado</p>
                        </div>
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            2
                          </div>
                          <p>Criação de plano de ação priorizado</p>
                        </div>
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            3
                          </div>
                          <p>Definição de métricas e KPIs de acompanhamento</p>
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            1
                          </div>
                          <p>Treinamento da equipe para execução</p>
                        </div>
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            2
                          </div>
                          <p>Implementação assistida das estratégias</p>
                        </div>
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            3
                          </div>
                          <p>Acompanhamento semanal de progresso</p>
                        </div>
                      </div>
                    )}

                    {index === 3 && (
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            1
                          </div>
                          <p>Análise contínua de métricas e resultados</p>
                        </div>
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            2
                          </div>
                          <p>Ajustes estratégicos baseados em dados</p>
                        </div>
                        <div className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-[#0066ff] text-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                            3
                          </div>
                          <p>Escala progressiva para maximizar resultados</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                    <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                  </div>
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  )
}
