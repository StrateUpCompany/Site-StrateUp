"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSectionAlt() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail("")

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <section className="bg-gradient-to-br from-[#0066ff] to-[#0052cc] text-white py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Estratégia Digital StrateUp"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Column - Text Content */}
          <div className="max-w-xl order-1 lg:order-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transforme sua Estratégia Digital com <span className="text-[#ff8c00]">Resultados Reais</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 mb-8">
              Descubra como sua empresa pode aumentar vendas, otimizar processos e criar previsibilidade com estratégias
              personalizadas baseadas em dados reais.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#ff8c00] mr-2 flex-shrink-0 mt-0.5" />
                <p className="opacity-90">Diagnóstico gratuito de maturidade digital</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#ff8c00] mr-2 flex-shrink-0 mt-0.5" />
                <p className="opacity-90">Relatório personalizado com insights estratégicos</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#ff8c00] mr-2 flex-shrink-0 mt-0.5" />
                <p className="opacity-90">Plano de ação prático para implementação imediata</p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
              <Link href="/diagnostico" className="block">
                <Button size="lg" className="w-full sm:w-auto bg-[#ff8c00] hover:bg-[#cc7000] text-white">
                  Fazer Diagnóstico Gratuito
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 border border-white/20 bg-white/10 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#ff8c00] focus:border-transparent placeholder-white/70"
                  required
                  aria-label="Email para receber conteúdo"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="rounded-l-none bg-white text-[#0066ff] hover:bg-gray-100"
                >
                  {isSubmitting ? "Enviando..." : isSubmitted ? "Enviado ✓" : "Receber Conteúdo"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
