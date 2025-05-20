"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { submitDiagnosticForm } from "@/app/actions/diagnostic-actions"

interface FormData {
  // Company Info
  companyName: string
  industry: string
  website: string
  employeeCount: string

  // Contact Info
  name: string
  email: string
  phone: string
  position: string

  // Instagram
  hasInstagram: boolean
  instagramHandle: string
  instagramFollowers: string
  instagramPostFrequency: string
  instagramEngagement: string

  // Google Business
  hasGoogleBusiness: boolean
  googleBusinessClaimed: boolean
  googleBusinessComplete: boolean
  googleBusinessReviews: string
  googleBusinessResponses: boolean

  // Website
  hasWebsite: boolean
  websiteMobile: boolean
  websiteSpeed: string
  websiteSEO: boolean
  websiteAnalytics: boolean

  // Commercial
  salesProcess: boolean
  crmSystem: boolean
  leadGeneration: string
  conversionRate: string
  salesCycle: string
}

const initialFormData: FormData = {
  // Company Info
  companyName: "",
  industry: "",
  website: "",
  employeeCount: "",

  // Contact Info
  name: "",
  email: "",
  phone: "",
  position: "",

  // Instagram
  hasInstagram: false,
  instagramHandle: "",
  instagramFollowers: "",
  instagramPostFrequency: "",
  instagramEngagement: "",

  // Google Business
  hasGoogleBusiness: false,
  googleBusinessClaimed: false,
  googleBusinessComplete: false,
  googleBusinessReviews: "",
  googleBusinessResponses: false,

  // Website
  hasWebsite: false,
  websiteMobile: false,
  websiteSpeed: "",
  websiteSEO: false,
  websiteAnalytics: false,

  // Commercial
  salesProcess: false,
  crmSystem: false,
  leadGeneration: "",
  conversionRate: "",
  salesCycle: "",
}

export default function DiagnosticForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leadScore, setLeadScore] = useState(0)
  const [leadType, setLeadType] = useState<"frio" | "morno" | "quente">("frio")
  const totalSteps = 5

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Update lead score when certain fields change
    if (
      field === "salesProcess" ||
      field === "crmSystem" ||
      field === "websiteAnalytics" ||
      field === "googleBusinessClaimed" ||
      field === "instagramFollowers" ||
      field === "conversionRate"
    ) {
      calculateLeadScore({ ...formData, [field]: value })
    }
  }

  // Calculate lead score based on form data
  const calculateLeadScore = (data: FormData) => {
    let score = 0

    // Company size factor
    if (data.employeeCount === "201+") score += 15
    else if (data.employeeCount === "51-200") score += 12
    else if (data.employeeCount === "21-50") score += 8
    else if (data.employeeCount === "6-20") score += 5
    else if (data.employeeCount === "1-5") score += 2

    // Digital presence factors
    if (data.hasWebsite) score += 10
    if (data.websiteMobile) score += 5
    if (data.websiteSEO) score += 8
    if (data.websiteAnalytics) score += 7

    // Social media factors
    if (data.hasInstagram) score += 5
    if (data.instagramFollowers === "mais-10000") score += 10
    else if (data.instagramFollowers === "5000-10000") score += 8
    else if (data.instagramFollowers === "1000-5000") score += 5

    // Google Business factors
    if (data.hasGoogleBusiness) score += 5
    if (data.googleBusinessClaimed) score += 5
    if (data.googleBusinessComplete) score += 5
    if (data.googleBusinessResponses) score += 5

    // Commercial maturity factors
    if (data.salesProcess) score += 15
    if (data.crmSystem) score += 10

    if (data.conversionRate === "mais-30") score += 10
    else if (data.conversionRate === "21-30") score += 8
    else if (data.conversionRate === "11-20") score += 5

    // Update lead score
    setLeadScore(score)

    // Categorize lead type
    if (score >= 70) {
      setLeadType("quente")
    } else if (score >= 40) {
      setLeadType("morno")
    } else {
      setLeadType("frio")
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      if (validateCurrentStep()) {
        setCurrentStep((prev) => prev + 1)
        window.scrollTo(0, 0)

        // Calculate lead score when moving to step 3
        if (currentStep === 2) {
          calculateLeadScore(formData)
        }
      }
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  const validateCurrentStep = (): boolean => {
    setError(null)

    if (currentStep === 1) {
      if (!formData.companyName) {
        setError("Por favor, informe o nome da empresa")
        return false
      }
      if (!formData.industry) {
        setError("Por favor, selecione o setor de atuação")
        return false
      }
      if (!formData.employeeCount) {
        setError("Por favor, selecione o número de funcionários")
        return false
      }
    } else if (currentStep === 2) {
      if (!formData.name) {
        setError("Por favor, informe seu nome completo")
        return false
      }
      if (!formData.email) {
        setError("Por favor, informe seu email")
        return false
      }
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setError("Por favor, informe um email válido")
        return false
      }
      if (!formData.position) {
        setError("Por favor, informe seu cargo na empresa")
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateCurrentStep()) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Calculate final lead score before submission
      calculateLeadScore(formData)

      const result = await submitDiagnosticForm({
        ...formData,
        leadScore,
        leadType,
      })

      if (result.success && result.submissionId) {
        // Redirect to results page with the submission ID
        router.push(`/resultados/${result.submissionId}?leadType=${leadType}&score=${leadScore}`)
      } else {
        setError("Ocorreu um erro ao enviar o diagnóstico. Por favor, tente novamente.")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("Ocorreu um erro ao enviar o diagnóstico. Por favor, tente novamente.")
      setIsSubmitting(false)
    }
  }

  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progresso</span>
          <span className="text-sm font-medium">
            {currentStep} de {totalSteps}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">{error}</div>}

      {currentStep > 2 && (
        <div
          className={`mb-6 p-4 rounded-md ${
            leadType === "quente"
              ? "bg-green-50 border border-green-200 text-green-700"
              : leadType === "morno"
                ? "bg-yellow-50 border border-yellow-200 text-yellow-700"
                : "bg-blue-50 border border-blue-200 text-blue-700"
          }`}
        >
          <div className="font-medium mb-1">
            {leadType === "quente" ? "Lead Quente" : leadType === "morno" ? "Lead Morno" : "Lead Frio"}
          </div>
          <div className="text-sm">
            {leadType === "quente"
              ? "Este lead demonstra alta prontidão para conversão."
              : leadType === "morno"
                ? "Este lead demonstra interesse moderado e potencial para desenvolvimento."
                : "Este lead está em estágio inicial de conscientização."}
          </div>
          <div className="mt-2 bg-white bg-opacity-50 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                leadType === "quente" ? "bg-green-500" : leadType === "morno" ? "bg-yellow-500" : "bg-blue-500"
              }`}
              style={{ width: `${Math.min(100, leadScore)}%` }}
            ></div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: Company Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Informações da Empresa</h3>

            <div>
              <label htmlFor="companyName" className="form-label">
                Nome da Empresa
              </label>
              <input
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={(e) => updateFormData("companyName", e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="industry" className="form-label">
                Setor de Atuação
              </label>
              <select
                id="industry"
                value={formData.industry}
                onChange={(e) => updateFormData("industry", e.target.value)}
                className="form-input"
                required
              >
                <option value="">Selecione o setor</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="saude">Saúde</option>
                <option value="educacao">Educação</option>
                <option value="varejo">Varejo</option>
                <option value="servicos">Serviços</option>
                <option value="industria">Indústria</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label htmlFor="website" className="form-label">
                Website
              </label>
              <input
                type="url"
                id="website"
                value={formData.website}
                onChange={(e) => updateFormData("website", e.target.value)}
                className="form-input"
                placeholder="https://www.seusite.com.br"
              />
            </div>

            <div>
              <label htmlFor="employeeCount" className="form-label">
                Número de Funcionários
              </label>
              <select
                id="employeeCount"
                value={formData.employeeCount}
                onChange={(e) => updateFormData("employeeCount", e.target.value)}
                className="form-input"
                required
              >
                <option value="">Selecione</option>
                <option value="1-5">1-5</option>
                <option value="6-20">6-20</option>
                <option value="21-50">21-50</option>
                <option value="51-200">51-200</option>
                <option value="201+">201+</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Informações de Contato</h3>

            <div>
              <label htmlFor="name" className="form-label">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
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
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="form-label">
                Telefone / WhatsApp
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className="form-input"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label htmlFor="position" className="form-label">
                Cargo na Empresa
              </label>
              <input
                type="text"
                id="position"
                value={formData.position}
                onChange={(e) => updateFormData("position", e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>
        )}

        {/* Step 3: Instagram Analysis */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Análise do Instagram</h3>

            <div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="hasInstagram"
                  checked={formData.hasInstagram}
                  onChange={(e) => updateFormData("hasInstagram", e.target.checked)}
                  className="h-4 w-4 text-[#0066ff] focus:ring-[#0066ff] border-gray-300 rounded"
                />
                <label htmlFor="hasInstagram" className="ml-2 block text-sm font-medium text-gray-700">
                  A empresa possui perfil no Instagram?
                </label>
              </div>

              {formData.hasInstagram && (
                <>
                  <div className="mb-4">
                    <label htmlFor="instagramHandle" className="form-label">
                      Nome de usuário no Instagram
                    </label>
                    <input
                      type="text"
                      id="instagramHandle"
                      value={formData.instagramHandle}
                      onChange={(e) => updateFormData("instagramHandle", e.target.value)}
                      className="form-input"
                      placeholder="@suaempresa"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="instagramFollowers" className="form-label">
                      Número aproximado de seguidores
                    </label>
                    <select
                      id="instagramFollowers"
                      value={formData.instagramFollowers}
                      onChange={(e) => updateFormData("instagramFollowers", e.target.value)}
                      className="form-input"
                    >
                      <option value="">Selecione</option>
                      <option value="menos-500">Menos de 500</option>
                      <option value="500-1000">500 - 1.000</option>
                      <option value="1000-5000">1.000 - 5.000</option>
                      <option value="5000-10000">5.000 - 10.000</option>
                      <option value="mais-10000">Mais de 10.000</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="instagramPostFrequency" className="form-label">
                      Frequência de publicação
                    </label>
                    <select
                      id="instagramPostFrequency"
                      value={formData.instagramPostFrequency}
                      onChange={(e) => updateFormData("instagramPostFrequency", e.target.value)}
                      className="form-input"
                    >
                      <option value="">Selecione</option>
                      <option value="diaria">Diária</option>
                      <option value="semanal">Semanal</option>
                      <option value="quinzenal">Quinzenal</option>
                      <option value="mensal">Mensal</option>
                      <option value="irregular">Irregular</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="instagramEngagement" className="form-label">
                      Nível de engajamento (curtidas, comentários)
                    </label>
                    <select
                      id="instagramEngagement"
                      value={formData.instagramEngagement}
                      onChange={(e) => updateFormData("instagramEngagement", e.target.value)}
                      className="form-input"
                    >
                      <option value="">Selecione</option>
                      <option value="muito-baixo">Muito baixo</option>
                      <option value="baixo">Baixo</option>
                      <option value="medio">Médio</option>
                      <option value="alto">Alto</option>
                      <option value="muito-alto">Muito alto</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Google Business Analysis */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Análise do Google Meu Negócio</h3>

            <div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="hasGoogleBusiness"
                  checked={formData.hasGoogleBusiness}
                  onChange={(e) => updateFormData("hasGoogleBusiness", e.target.checked)}
                  className="h-4 w-4 text-[#0066ff] focus:ring-[#0066ff] border-gray-300 rounded"
                />
                <label htmlFor="hasGoogleBusiness" className="ml-2 block text-sm font-medium text-gray-700">
                  A empresa possui perfil no Google Meu Negócio?
                </label>
              </div>

              {formData.hasGoogleBusiness && (
                <>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="googleBusinessClaimed"
                      checked={formData.googleBusinessClaimed}
                      onChange={(e) => updateFormData("googleBusinessClaimed", e.target.checked)}
                      className="h-4 w-4 text-[#0066ff] focus:ring-[#0066ff] border-gray-300 rounded"
                    />
                    <label htmlFor="googleBusinessClaimed" className="ml-2 block text-sm font-medium text-gray-700">
                      A ficha foi reivindicada e está sob controle da empresa?
                    </label>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="googleBusinessComplete"
                      checked={formData.googleBusinessComplete}
                      onChange={(e) => updateFormData("googleBusinessComplete", e.target.checked)}
                      className="h-4 w-4 text-[#0066ff] focus:ring-[#0066ff] border-gray-300 rounded"
                    />
                    <label htmlFor="googleBusinessComplete" className="ml-2 block text-sm font-medium text-gray-700">
                      O perfil está completo (endereço, telefone, horários, fotos)?
                    </label>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="googleBusinessReviews" className="form-label">
                      Quantidade aproximada de avaliações
                    </label>
                    <select
                      id="googleBusinessReviews"
                      value={formData.googleBusinessReviews}
                      onChange={(e) => updateFormData("googleBusinessReviews", e.target.value)}
                      className="form-input"
                    >
                      <option value="">Selecione</option>
                      <option value="0">0</option>
                      <option value="1-10">1 - 10</option>
                      <option value="11-50">11 - 50</option>
                      <option value="51-100">51 - 100</option>
                      <option value="mais-100">Mais de 100</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="googleBusinessResponses"
                      checked={formData.googleBusinessResponses}
                      onChange={(e) => updateFormData("googleBusinessResponses", e.target.checked)}
                      className="h-4 w-4 text-[#0066ff] focus:ring-[#0066ff] border-gray-300 rounded"
                    />
                    <label htmlFor="googleBusinessResponses" className="ml-2 block text-sm font-medium text-gray-700">
                      A empresa responde regularmente às avaliações?
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Website and Commercial Analysis */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Análise do Site e Processo Comercial</h3>

            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3">Website</h4>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="hasWebsite"
                  checked={formData.hasWebsite}
                  onChange={(e) => updateFormData("hasWebsite", e.target.checked)}
                  className="h-4 w-4 text-[#0066ff] focus:ring-[#0066ff] border-gray-300 rounded"
                />
                <label htmlFor="hasWebsite" className="ml-2 block text-sm font-medium text-gray-700">
                  A empresa possui website?
                </label>
              </div>

              {formData.hasWebsite && (
                <>
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="websiteMobile"
                      checked={formData.websiteMobile}
                      onChange={(e) => updateFormData("websiteMobile", e.target.checked)}
                      className="h-4 w-4 text-[#0066ff] focus:ring-[#0066ff] border-gray-300 rounded"
                    />
                    <label htmlFor="websiteMobile" className="ml-2 block text-sm font-medium text-gray-700">
                      O site é responsivo (adaptado para dispositivos móveis)?
                    </label>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="websiteSpeed" className="form-label">
                      Velocidade de carregamento do site
                    </label>
                    <select
                      id="websiteSpeed"
                      value={formData.websiteSpeed}
                      onChange={(e) => updateFormData("websiteSpeed", e.target.value)}
                      className="form-input"
                    >
                      <option value="">Selecione</option>
                      <option value="muito-lento">Muito lento</option>
                      <option value="lento">Lento</option>
                      <option value="medio">Médio</option>
                      <option value="rapido">Rápido</option>
                      <option value="muito-rapido">Muito rápido</option>
                    </select>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="websiteSEO"
                      checked={formData.websiteSEO}
                      onChange={(e) => updateFormData("websiteSEO", e.target.checked)}
                      className="h-4 w-4 text-[#0066ff] focus:ring-[#0066ff] border-gray-300 rounded"
                    />
                    <label htmlFor="websiteSEO" className="ml-2 block text-sm font-medium text-gray-700">
                      O site possui otimização para SEO (meta tags, alt text, etc.)?
                    </label>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="websiteAnalytics"
                      checked={formData.websiteAnalytics}
                      onChange={(e) => updateFormData("websiteAnalytics", e.target.checked)}
                      className="h-4 w-4 text-[#0066ff] focus:ring-[#0066ff] border-gray-300 rounded"
                    />
                    <label htmlFor="websiteAnalytics" className="ml-2 block text-sm font-medium text-gray-700">
                      O site possui ferramentas de análise (Google Analytics, etc.)?
                    </label>
                  </div>
                </>
              )}
            </div>

            <div>
              <h4 className="text-lg font-medium mb-3">Processo Comercial</h4>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="salesProcess"
                  checked={formData.salesProcess}
                  onChange={(e) => updateFormData("salesProcess", e.target.checked)}
                  className="h-4 w-4 text-[#0066ff] focus:ring-[#0066ff] border-gray-300 rounded"
                />
                <label htmlFor="salesProcess" className="ml-2 block text-sm font-medium text-gray-700">
                  A empresa possui um processo de vendas estruturado?
                </label>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="crmSystem"
                  checked={formData.crmSystem}
                  onChange={(e) => updateFormData("crmSystem", e.target.checked)}
                  className="h-4 w-4 text-[#0066ff] focus:ring-[#0066ff] border-gray-300 rounded"
                />
                <label htmlFor="crmSystem" className="ml-2 block text-sm font-medium text-gray-700">
                  Utiliza algum sistema de CRM?
                </label>
              </div>

              <div className="mb-4">
                <label htmlFor="leadGeneration" className="form-label">
                  Principal fonte de geração de leads
                </label>
                <select
                  id="leadGeneration"
                  value={formData.leadGeneration}
                  onChange={(e) => updateFormData("leadGeneration", e.target.value)}
                  className="form-input"
                >
                  <option value="">Selecione</option>
                  <option value="indicacoes">Indicações</option>
                  <option value="redes-sociais">Redes Sociais</option>
                  <option value="google">Google (orgânico)</option>
                  <option value="anuncios">Anúncios pagos</option>
                  <option value="eventos">Eventos</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="conversionRate" className="form-label">
                  Taxa média de conversão (leads para clientes)
                </label>
                <select
                  id="conversionRate"
                  value={formData.conversionRate}
                  onChange={(e) => updateFormData("conversionRate", e.target.value)}
                  className="form-input"
                >
                  <option value="">Selecione</option>
                  <option value="menos-5">Menos de 5%</option>
                  <option value="5-10">5% - 10%</option>
                  <option value="11-20">11% - 20%</option>
                  <option value="21-30">21% - 30%</option>
                  <option value="mais-30">Mais de 30%</option>
                  <option value="nao-sei">Não sei</option>
                </select>
              </div>

              <div>
                <label htmlFor="salesCycle" className="form-label">
                  Ciclo médio de vendas
                </label>
                <select
                  id="salesCycle"
                  value={formData.salesCycle}
                  onChange={(e) => updateFormData("salesCycle", e.target.value)}
                  className="form-input"
                >
                  <option value="">Selecione</option>
                  <option value="menos-7">Menos de 7 dias</option>
                  <option value="7-30">7 - 30 dias</option>
                  <option value="1-3">1 - 3 meses</option>
                  <option value="3-6">3 - 6 meses</option>
                  <option value="mais-6">Mais de 6 meses</option>
                  <option value="nao-sei">Não sei</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={handlePrev} disabled={isSubmitting}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
          ) : (
            <div></div>
          )}

          {currentStep < totalSteps ? (
            <Button type="button" onClick={handleNext}>
              Próximo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="bg-[#ff8c00] hover:bg-[#cc7000]">
              {isSubmitting ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Enviando...
                </>
              ) : (
                <>
                  Finalizar Diagnóstico <CheckCircle className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
