"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ana Silva",
      position: "CEO, TechSolutions",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "O diagnóstico de maturidade digital da StrateUp foi um divisor de águas para nossa empresa. Identificamos pontos cegos que estavam limitando nosso crescimento e implementamos as estratégias recomendadas. Em apenas 3 meses, aumentamos nossas vendas em 42%.",
      rating: 5,
    },
    {
      name: "Carlos Mendes",
      position: "Diretor de Marketing, Retail Group",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Estávamos investindo em marketing digital sem uma estratégia clara. A StrateUp nos ajudou a estruturar um funil de vendas eficiente e a otimizar nossos investimentos. O resultado foi uma redução de 30% no custo de aquisição de clientes.",
      rating: 5,
    },
    {
      name: "Mariana Costa",
      position: "Fundadora, Estúdio Criativo",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Como pequena empresa, precisávamos de estratégias que pudéssemos implementar com recursos limitados. A StrateUp entendeu perfeitamente nossa realidade e desenvolveu um plano sob medida. Hoje temos um fluxo constante de leads qualificados.",
      rating: 4,
    },
    {
      name: "Roberto Almeida",
      position: "Diretor Comercial, Indústria BR",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "A metodologia da StrateUp é extremamente prática e focada em resultados. Não são apenas teorias bonitas, mas estratégias que realmente funcionam no dia a dia. Nossa equipe comercial está mais produtiva e nossas vendas aumentaram significativamente.",
      rating: 5,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const handlePrev = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-lg text-gray-700">
            Mais de 200 empresas já transformaram seus resultados com nossa metodologia. Veja o que elas têm a dizer:
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="relative h-20 w-20 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[currentIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div>
                  <p className="font-semibold">{testimonials[currentIndex].name}</p>
                  <p className="text-gray-600">{testimonials[currentIndex].position}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false)
                  setCurrentIndex(index)
                }}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? "w-8 bg-[#0066ff]" : "w-2 bg-gray-300"
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
