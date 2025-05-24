"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import DiagnosticForm from "@/components/diagnostic/diagnostic-form"
import ChatbotSDR from "@/components/chatbot/chatbot-sdr"
import Benefits from "@/components/diagnostic/benefits"
import Methodology from "@/components/diagnostic/methodology"
import Testimonials from "@/components/diagnostic/testimonials"
import FAQ from "@/components/diagnostic/faq"
import CTA from "@/components/diagnostic/cta"

export default function DiagnosticPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">StrateUp</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium text-gray-800 hover:text-primary">Home</Link>
            <Link href="/servicos" className="font-medium text-gray-800 hover:text-primary">Serviços</Link>
            <Link href="/diagnostico" className="font-medium text-primary border-b-2 border-primary">Diagnóstico</Link>
            <Link href="/blog" className="font-medium text-gray-800 hover:text-primary">Blog</Link>
            <Link href="/sobre" className="font-medium text-gray-800 hover:text-primary">Sobre</Link>
            <Link href="/contato" className="font-medium text-gray-800 hover:text-primary">Contato</Link>
          </nav>

          {/* Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-primary">
                <span>PT</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <Link href="/contato" className="bg-secondary hover:bg-opacity-90 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Contato
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-800 focus:outline-none" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="max-w-lg animate-fadeIn">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Diagnóstico de Maturidade Digital
                </h1>
                <p className="text-xl mb-8 text-gray-700">
                  Descubra o nível de maturidade digital da sua empresa e receba recomendações personalizadas para acelerar seu crescimento.
                </p>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="text-gray-700">Mais de 500 empresas avaliadas</span>
                </div>
                <a href="#diagnostic-form" className="btn btn-primary inline-flex items-center">
                  Iniciar Diagnóstico
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img src="/api/placeholder/600/400" alt="Diagnóstico Digital" className="rounded-lg shadow-lg w-full" />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary">100% Gratuito</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <DiagnosticForm />

      <Benefits />
      <Methodology />
      <Testimonials />
      <FAQ />
      <CTA />

      <ChatbotSDR leadType="morno" />
      <Footer />
    </div>
  )
}
