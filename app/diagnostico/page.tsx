import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import DiagnosticForm from "@/components/diagnostic/diagnostic-form"
import ChatbotSDR from "@/components/chatbot/chatbot-sdr"

export const metadata: Metadata = {
  title: "Diagnóstico de Maturidade Digital | StrateUp",
  description:
    "Faça seu diagnóstico gratuito de maturidade digital e receba um relatório personalizado com insights estratégicos para seu negócio.",
  keywords: "diagnóstico digital, maturidade digital, análise de marketing, estratégia digital, consultoria online",
}

export default function DiagnosticPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center mb-8">Diagnóstico de Maturidade Digital</h1>
          <p className="text-center text-lg mb-8">
            Responda às perguntas abaixo para receber uma análise personalizada da maturidade digital do seu negócio.
            Este diagnóstico avalia diferentes aspectos da sua presença online e estratégia digital.
          </p>

          <DiagnosticForm />
        </div>
      </div>

      <ChatbotSDR leadType="morno" />
      <Footer />
    </main>
  )
}
