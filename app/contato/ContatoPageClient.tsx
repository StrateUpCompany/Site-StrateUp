"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ChatbotSDR from "@/components/chatbot/chatbot-sdr"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitContactForm } from "@/app/actions/contact-actions"

export default function ContatoPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setFormStatus({
          success: true,
          message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
        })
      } else {
        setFormStatus({
          success: false,
          message: result.error || "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
        })
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#e6f0ff] to-white py-16 md:py-20">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Fale com a StrateUp</h1>
              <p className="text-lg text-gray-700 mb-8">
                Estamos prontos para ajudar sua empresa a transformar sua estratégia digital e alcançar resultados
                extraordinários. Entre em contato conosco hoje mesmo.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>

                {formStatus && (
                  <div
                    className={`mb-6 p-4 rounded-md flex items-start ${
                      formStatus.success
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {formStatus.success ? (
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <span>{formStatus.message}</span>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="form-label">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="form-label">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="form-label">
                      Assunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="form-input"
                      required
                      placeholder="Como podemos ajudar sua empresa?"
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full bg-[#0066ff] hover:bg-[#0052cc]" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-[#0066ff]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-gray-700 mb-1">Para informações gerais:</p>
                      <a href="mailto:contato@strateup.com.br" className="text-[#0066ff] hover:underline">
                        contato@strateup.com.br
                      </a>
                      <p className="text-gray-700 mt-2 mb-1">Para parcerias:</p>
                      <a href="mailto:parcerias@strateup.com.br" className="text-[#0066ff] hover:underline">
                        parcerias@strateup.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-[#0066ff]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Telefone</h3>
                      <p className="text-gray-700 mb-1">Central de Atendimento:</p>
                      <a href="tel:+551199999999" className="text-[#0066ff] hover:underline">
                        (11) 99999-9999
                      </a>
                      <p className="text-gray-700 mt-2 mb-1">WhatsApp:</p>
                      <a href="https://wa.me/551199999999" className="text-[#0066ff] hover:underline">
                        (11) 99999-9999
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-[#0066ff]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Endereço</h3>
                      <p className="text-gray-700">
                        Av. Paulista, 1000 - Bela Vista
                        <br />
                        São Paulo - SP, 01310-100
                        <br />
                        Brasil
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-[#0066ff]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Horário de Atendimento</h3>
                      <p className="text-gray-700">
                        Segunda a Sexta: 9h às 18h
                        <br />
                        Sábado: 9h às 13h
                        <br />
                        Domingo e Feriados: Fechado
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-lg mb-4">Agende uma Consultoria</h3>
                  <p className="text-gray-700 mb-4">
                    Prefere conversar diretamente com um de nossos consultores? Agende uma consultoria gratuita e
                    descubra como podemos ajudar sua empresa.
                  </p>
                  <Button className="w-full bg-[#ff8c00] hover:bg-[#cc7000]">Agendar Consultoria Gratuita</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">Como Chegar</h2>
              <p className="text-gray-700">
                Estamos localizados em um ponto central de São Paulo, com fácil acesso por transporte público e
                particular.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Mapa será carregado aqui</p>
                <p className="text-sm text-gray-400">
                  Em uma implementação real, aqui seria integrado um mapa interativo do Google Maps ou similar
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ChatbotSDR leadType="morno" />
      <Footer />
    </main>
  )
}
