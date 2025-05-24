"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Interfaces para os tipos de dados do formulário
interface FormData {
  company_name?: string
  industry?: string
  company_size?: string
  respondent_name?: string
  respondent_email?: string
  respondent_position?: string
  has_website?: string
  has_google_business?: string
  content_frequency?: string
  invests_marketing?: string
  marketing_budget?: string
  data_decisions?: string
  digital_challenge?: string
  social_media?: {
    [key: string]: boolean
  }
  marketing_channels?: {
    [key: string]: boolean
  }
  performance_metrics?: {
    [key: string]: boolean
  }
  digital_goals?: {
    [key: string]: boolean
  }
  priority_areas?: {
    [key: string]: boolean
  }
}

interface ValidationState {
  isValid: boolean
  message: string
}

interface ErrorMessageProps {
  message: string
}

export default function DiagnosticForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submissionComplete, setSubmissionComplete] = useState(false)
  const [formData, setFormData] = useState<FormData>({})
  const [validation, setValidation] = useState<ValidationState>({
    isValid: true,
    message: ''
  })

  // Efeito para scroll ao topo quando mudar etapa
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  // Gerenciar mudanças nos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: {
          ...(prev[name as keyof FormData] as Record<string, boolean> || {}),
          [value]: checked
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  // Validar etapa atual antes de prosseguir
  const validateStep = (currentStep: number) => {
    let isValid = true
    let message = ''

    switch(currentStep) {
      case 1:
        // Validar campos obrigatórios da etapa 1
        const requiredFields = ['company_name', 'industry', 'company_size', 'respondent_name', 'respondent_email', 'respondent_position']
        for (const field of requiredFields) {
          if (!formData[field as keyof FormData]) {
            isValid = false
            message = 'Por favor, preencha todos os campos obrigatórios.'
            break
          }
        }
        // Validar formato de email
        if (isValid && formData.respondent_email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(formData.respondent_email)) {
            isValid = false
            message = 'Por favor, informe um endereço de email válido.'
          }
        }
        break
      
      case 2:
        // Validar campos obrigatórios da etapa 2
        if (!formData.has_website || !formData.has_google_business || !formData.content_frequency) {
          isValid = false
          message = 'Por favor, responda todas as perguntas.'
        }
        break
      
      case 3:
        // Validar campos obrigatórios da etapa 3
        if (!formData.invests_marketing || !formData.marketing_budget) {
          isValid = false
          message = 'Por favor, responda todas as perguntas.'
        }
        break
      
      case 4:
        // Validar campos obrigatórios da etapa 4
        if (!formData.data_decisions || !formData.digital_challenge || formData.digital_challenge.trim() === '') {
          isValid = false
          message = 'Por favor, responda todas as perguntas e compartilhe seu principal desafio digital.'
        }
        break
    }

    setValidation({ isValid, message })
    return isValid
  }

  // Avançar para a próxima etapa
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      setValidation({ isValid: true, message: '' })
    }
  }

  // Voltar para a etapa anterior
  const prevStep = () => {
    setStep(step - 1)
    setValidation({ isValid: true, message: '' })
  }

  // Enviar formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(step)) {
      return
    }

    setLoading(true)
    
    try {
      // Aqui você implementaria a lógica real de envio de dados
      // const response = await fetch('/api/diagnostic-submission', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })
      
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setLoading(false)
      setSubmissionComplete(true)
      
      // Opcional: registrar evento de conclusão
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'diagnostic_completion', {
          'event_category': 'diagnostic',
          'event_label': 'form_submitted'
        })
      }
    } catch (error) {
      setLoading(false)
      setValidation({
        isValid: false,
        message: 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.'
      })
    }
  }

  // Componente para exibir mensagem de erro
  const ErrorMessage = ({ message }: ErrorMessageProps) => {
    if (!message) return null

  return (
      <div className="p-3 mt-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {message}
        </div>
      </div>
    )
  }

  return (
    <section id="diagnostic-form" className="section bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            {/* Cabeçalho da página */}
            {!submissionComplete && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Diagnóstico de Transformação Digital</h2>
                <p className="text-gray-600">
                  Descubra o potencial de inovação da sua empresa através de uma avaliação abrangente e personalizada.
                  <br />O diagnóstico leva apenas 5 minutos para ser preenchido.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Progress Bar */}
              {!submissionComplete && (
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    {[1, 2, 3, 4].map((stepNum) => (
                      <div key={stepNum} className="text-center">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1
                            ${step >= stepNum ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
                        >
                          {stepNum}
          </div>
                        <span className="text-xs text-gray-500 hidden sm:block">
                          {stepNum === 1 && "Empresa"}
                          {stepNum === 2 && "Presença"}
                          {stepNum === 3 && "Marketing"}
                          {stepNum === 4 && "Análise"}
                        </span>
          </div>
                    ))}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Etapa {step} de 4</span>
                    <span>{Math.round((step / 4) * 100)}% concluído</span>
                  </div>
        </div>
      )}

              {/* Mensagem de erro de validação */}
              {!validation.isValid && <ErrorMessage message={validation.message} />}

              {/* Success Message */}
              {submissionComplete && (
                <div className="text-center py-12 animate-fadeIn">
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Diagnóstico Enviado com Sucesso!</h3>
                  <div className="max-w-lg mx-auto">
                    <p className="text-gray-600 mb-8">
                      Obrigado por completar nosso diagnóstico de maturidade digital. Em breve você receberá o relatório personalizado no seu e-mail com insights estratégicos para sua empresa.
                    </p>
                    <ul className="text-left text-gray-600 mb-8 bg-blue-50 p-4 rounded-lg inline-block mx-auto">
                      <li className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Análise de presença digital
                      </li>
                      <li className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Mapeamento de estratégias de marketing
                      </li>
                      <li className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Identificação de oportunidades de crescimento
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Recomendações personalizadas
                      </li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/" className="btn btn-primary">
                        Voltar para Home
                      </Link>
                      <Link href="/servicos" className="btn btn-outline">
                        Conhecer Nossos Serviços
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Informações da Empresa */}
              {step === 1 && !submissionComplete && (
          <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Informações da Empresa</h3>
                    <p className="text-gray-500 text-sm mt-1">Conte-nos um pouco sobre sua organização</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
            <div>
                      <label htmlFor="company_name" className="form-label">Nome da Empresa <span className="text-red-500">*</span></label>
              <input
                type="text"
                        id="company_name" 
                        name="company_name" 
                className="form-input"
                        onChange={handleChange}
                        value={formData.company_name || ''}
                required
              />
            </div>

            <div>
                      <label htmlFor="industry" className="form-label">Setor de Atuação <span className="text-red-500">*</span></label>
              <select
                id="industry"
                        name="industry" 
                className="form-input"
                        onChange={handleChange}
                        value={formData.industry || ''}
                required
              >
                        <option value="">Selecione...</option>
                        <option value="technology">Tecnologia</option>
                        <option value="retail">Varejo</option>
                        <option value="healthcare">Saúde</option>
                        <option value="education">Educação</option>
                        <option value="finance">Finanças</option>
                        <option value="manufacturing">Indústria</option>
                        <option value="services">Serviços</option>
                        <option value="other">Outro</option>
              </select>
            </div>
            </div>

            <div>
                    <label htmlFor="company_size" className="form-label">Tamanho da Empresa <span className="text-red-500">*</span></label>
              <select
                      id="company_size" 
                      name="company_size" 
                className="form-input"
                      onChange={handleChange}
                      value={formData.company_size || ''}
                required
              >
                      <option value="">Selecione...</option>
                      <option value="1-10">1-10 funcionários</option>
                      <option value="11-50">11-50 funcionários</option>
                      <option value="51-200">51-200 funcionários</option>
                      <option value="201-500">201-500 funcionários</option>
                      <option value="501+">Mais de 500 funcionários</option>
              </select>
            </div>

                  <hr className="my-6" />
                  <p className="text-sm text-gray-500 mb-4">Informações do respondente</p>

                  <div className="grid md:grid-cols-2 gap-6">
            <div>
                      <label htmlFor="respondent_name" className="form-label">Seu Nome <span className="text-red-500">*</span></label>
              <input
                type="text"
                        id="respondent_name" 
                        name="respondent_name" 
                className="form-input"
                        onChange={handleChange}
                        value={formData.respondent_name || ''}
                required
              />
            </div>

            <div>
                      <label htmlFor="respondent_position" className="form-label">Seu Cargo <span className="text-red-500">*</span></label>
              <input
                        type="text" 
                        id="respondent_position" 
                        name="respondent_position" 
                className="form-input"
                        onChange={handleChange}
                        value={formData.respondent_position || ''}
                required
              />
            </div>
            </div>

            <div>
                    <label htmlFor="respondent_email" className="form-label">Seu Email <span className="text-red-500">*</span></label>
              <input
                      type="email" 
                      id="respondent_email" 
                      name="respondent_email" 
                className="form-input"
                      onChange={handleChange}
                      value={formData.respondent_email || ''}
                required
              />
                    <p className="text-xs text-gray-500 mt-1">Enviaremos o relatório de diagnóstico para este email</p>
            </div>
          </div>
        )}

              {/* Step 2: Presença Digital */}
              {step === 2 && !submissionComplete && (
          <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Presença Digital</h3>
                    <p className="text-gray-500 text-sm mt-1">Avalie a presença online da sua empresa</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="form-label mb-3">Sua empresa possui um website? <span className="text-red-500">*</span></p>
                    <div className="flex space-x-6">
                      <label className="inline-flex items-center">
                <input
                          type="radio" 
                          name="has_website" 
                          value="yes" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.has_website === 'yes'}
                          required 
                        />
                        <span className="ml-2">Sim</span>
                </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="has_website" 
                          value="no" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.has_website === 'no'}
                        />
                        <span className="ml-2">Não</span>
                    </label>
                      <label className="inline-flex items-center">
                    <input
                          type="radio" 
                          name="has_website" 
                          value="development" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.has_website === 'development'}
                        />
                        <span className="ml-2">Em desenvolvimento</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="form-label mb-3">Quais redes sociais sua empresa utiliza ativamente?</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="social_media" 
                          value="facebook" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.social_media?.facebook || false}
                        />
                        <span className="ml-2">Facebook</span>
                    </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="social_media" 
                          value="instagram" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.social_media?.instagram || false}
                        />
                        <span className="ml-2">Instagram</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="social_media" 
                          value="linkedin" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.social_media?.linkedin || false}
                        />
                        <span className="ml-2">LinkedIn</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="social_media" 
                          value="twitter" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.social_media?.twitter || false}
                        />
                        <span className="ml-2">Twitter/X</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="social_media" 
                          value="youtube" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.social_media?.youtube || false}
                        />
                        <span className="ml-2">YouTube</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="social_media" 
                          value="tiktok" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.social_media?.tiktok || false}
                        />
                        <span className="ml-2">TikTok</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="form-label">Com que frequência sua empresa atualiza o conteúdo digital? <span className="text-red-500">*</span></p>
                    <select
                      name="content_frequency" 
                      className="form-input"
                      onChange={handleChange}
                      value={formData.content_frequency || ''}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="daily">Diariamente</option>
                      <option value="weekly">Semanalmente</option>
                      <option value="monthly">Mensalmente</option>
                      <option value="quarterly">Trimestralmente</option>
                      <option value="rarely">Raramente</option>
                      <option value="never">Nunca</option>
                    </select>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="form-label mb-3">Sua empresa possui perfil no Google Meu Negócio? <span className="text-red-500">*</span></p>
                    <div className="flex space-x-6">
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="has_google_business" 
                          value="yes" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.has_google_business === 'yes'}
                          required 
                        />
                        <span className="ml-2">Sim, atualizado</span>
                    </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="has_google_business" 
                          value="outdated" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.has_google_business === 'outdated'}
                        />
                        <span className="ml-2">Sim, desatualizado</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="has_google_business" 
                          value="no" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.has_google_business === 'no'}
                        />
                        <span className="ml-2">Não</span>
                      </label>
                  </div>
            </div>
          </div>
        )}

              {/* Step 3: Marketing Digital */}
              {step === 3 && !submissionComplete && (
          <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Marketing Digital</h3>
                    <p className="text-gray-500 text-sm mt-1">Entenda como sua empresa utiliza estratégias digitais</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="form-label mb-3">Sua empresa investe em marketing digital? <span className="text-red-500">*</span></p>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center">
                <input
                          type="radio" 
                          name="invests_marketing" 
                          value="yes" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.invests_marketing === 'yes'}
                          required 
                        />
                        <span className="ml-2">Sim, regularmente</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="invests_marketing" 
                          value="occasionally" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.invests_marketing === 'occasionally'}
                        />
                        <span className="ml-2">Sim, ocasionalmente</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="invests_marketing" 
                          value="no" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.invests_marketing === 'no'}
                        />
                        <span className="ml-2">Não</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="invests_marketing" 
                          value="planning" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.invests_marketing === 'planning'}
                        />
                        <span className="ml-2">Planejando iniciar</span>
                </label>
                    </div>
              </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="form-label mb-3">Quais canais de marketing digital sua empresa utiliza?</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                          name="marketing_channels" 
                          value="social_ads" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.marketing_channels?.social_ads || false}
                        />
                        <span className="ml-2">Anúncios em redes sociais</span>
                    </label>
                      <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                          name="marketing_channels" 
                          value="search_ads" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.marketing_channels?.search_ads || false}
                        />
                        <span className="ml-2">Google Ads/Search</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="marketing_channels" 
                          value="email" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.marketing_channels?.email || false}
                        />
                        <span className="ml-2">Email Marketing</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="marketing_channels" 
                          value="content" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.marketing_channels?.content || false}
                        />
                        <span className="ml-2">Marketing de Conteúdo</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="marketing_channels" 
                          value="influencer" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.marketing_channels?.influencer || false}
                        />
                        <span className="ml-2">Marketing de Influência</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="marketing_channels" 
                          value="seo" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.marketing_channels?.seo || false}
                        />
                        <span className="ml-2">SEO e Otimização</span>
                    </label>
                    </div>
                  </div>

                  <div>
                    <p className="form-label">Quanto sua empresa investe mensalmente em marketing digital? <span className="text-red-500">*</span></p>
                    <select
                      name="marketing_budget" 
                      className="form-input"
                      onChange={handleChange}
                      value={formData.marketing_budget || ''}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="none">Não investimos</option>
                      <option value="under1k">Menos de R$ 1.000</option>
                      <option value="1k-5k">R$ 1.000 a R$ 5.000</option>
                      <option value="5k-10k">R$ 5.000 a R$ 10.000</option>
                      <option value="10k-20k">R$ 10.000 a R$ 20.000</option>
                      <option value="over20k">Mais de R$ 20.000</option>
                    </select>
                  </div>

                  <div>
                    <p className="form-label">Como você mede o desempenho das campanhas digitais?</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                          name="performance_metrics" 
                          value="analytics" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.performance_metrics?.analytics || false}
                        />
                        <span className="ml-2">Google Analytics</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="performance_metrics" 
                          value="platform_metrics" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.performance_metrics?.platform_metrics || false}
                        />
                        <span className="ml-2">Métricas das plataformas</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="performance_metrics" 
                          value="crm" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.performance_metrics?.crm || false}
                        />
                        <span className="ml-2">CRM</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="performance_metrics" 
                          value="custom_dashboard" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.performance_metrics?.custom_dashboard || false}
                        />
                        <span className="ml-2">Dashboard personalizado</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="performance_metrics" 
                          value="none" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.performance_metrics?.none || false}
                        />
                        <span className="ml-2">Não medimos</span>
                    </label>
                  </div>
            </div>
          </div>
        )}

              {/* Step 4: Análise e Desafios */}
              {step === 4 && !submissionComplete && (
          <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Análise e Desafios</h3>
                    <p className="text-gray-500 text-sm mt-1">Compartilhe seus principais desafios e objetivos digitais</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="form-label mb-3">Sua empresa utiliza dados para tomada de decisões estratégicas? <span className="text-red-500">*</span></p>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center">
                <input
                          type="radio" 
                          name="data_decisions" 
                          value="yes" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.data_decisions === 'yes'}
                          required 
                        />
                        <span className="ml-2">Sim, regularmente</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="data_decisions" 
                          value="sometimes" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.data_decisions === 'sometimes'}
                        />
                        <span className="ml-2">Às vezes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="data_decisions" 
                          value="rarely" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.data_decisions === 'rarely'}
                        />
                        <span className="ml-2">Raramente</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="data_decisions" 
                          value="no" 
                          className="form-radio"
                          onChange={handleChange}
                          checked={formData.data_decisions === 'no'}
                        />
                        <span className="ml-2">Não</span>
                </label>
                    </div>
              </div>

                  <div>
                    <p className="form-label">Quais são os principais objetivos da sua estratégia digital?</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                          name="digital_goals" 
                          value="brand_awareness" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.digital_goals?.brand_awareness || false}
                        />
                        <span className="ml-2">Reconhecimento de marca</span>
                    </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="digital_goals" 
                          value="lead_generation" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.digital_goals?.lead_generation || false}
                        />
                        <span className="ml-2">Geração de leads</span>
                    </label>
                      <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                          name="digital_goals" 
                          value="sales" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.digital_goals?.sales || false}
                        />
                        <span className="ml-2">Aumento de vendas</span>
                    </label>
                      <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                          name="digital_goals" 
                          value="customer_loyalty" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.digital_goals?.customer_loyalty || false}
                        />
                        <span className="ml-2">Fidelização de clientes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="digital_goals" 
                          value="thought_leadership" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.digital_goals?.thought_leadership || false}
                        />
                        <span className="ml-2">Autoridade no setor</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="digital_goals" 
                          value="customer_service" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.digital_goals?.customer_service || false}
                        />
                        <span className="ml-2">Atendimento ao cliente</span>
                    </label>
                  </div>
            </div>

            <div>
                    <label htmlFor="digital_challenge" className="form-label">Qual é o principal desafio digital da sua empresa atualmente? <span className="text-red-500">*</span></label>
                    <textarea 
                      id="digital_challenge" 
                      name="digital_challenge" 
                      rows={4}
                      className="form-input"
                      placeholder="Descreva seu principal desafio..."
                      onChange={handleChange}
                      value={formData.digital_challenge || ''}
                      required
                    ></textarea>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="form-label mb-3">Quais áreas de transformação digital você gostaria de priorizar?</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <label className="inline-flex items-center">
                <input
                  type="checkbox"
                          name="priority_areas" 
                          value="website_optimization" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.priority_areas?.website_optimization || false}
                        />
                        <span className="ml-2">Otimização de website</span>
                </label>
                      <label className="inline-flex items-center">
                <input
                  type="checkbox"
                          name="priority_areas" 
                          value="social_media_strategy" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.priority_areas?.social_media_strategy || false}
                        />
                        <span className="ml-2">Estratégia em redes sociais</span>
                </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="priority_areas" 
                          value="data_analytics" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.priority_areas?.data_analytics || false}
                        />
                        <span className="ml-2">Análise de dados</span>
                </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="priority_areas" 
                          value="automation" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.priority_areas?.automation || false}
                        />
                        <span className="ml-2">Automação de marketing</span>
                </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="priority_areas" 
                          value="ecommerce" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.priority_areas?.ecommerce || false}
                        />
                        <span className="ml-2">E-commerce</span>
                </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          name="priority_areas" 
                          value="digital_training" 
                          className="form-checkbox"
                          onChange={handleChange}
                          checked={formData.priority_areas?.digital_training || false}
                        />
                        <span className="ml-2">Capacitação digital</span>
                      </label>
              </div>
            </div>
          </div>
        )}

              {/* Form Navigation Buttons */}
              {!submissionComplete && (
                <div className="mt-8 flex flex-col sm:flex-row-reverse sm:justify-between gap-4">
                  {step < 4 ? (
                    <button 
                      type="button" 
                      className="btn btn-primary flex-1 sm:flex-none sm:min-w-[150px]"
                      onClick={nextStep}
                    >
                      Próxima Etapa
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="btn btn-primary flex-1 sm:flex-none sm:min-w-[150px] flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                  Enviando...
                </>
              ) : (
                <>
                          Enviar Diagnóstico
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                </>
              )}
                    </button>
                  )}
                  
                  {step > 1 && (
                    <button 
                      type="button" 
                      className="btn btn-outline flex-1 sm:flex-none sm:min-w-[150px]"
                      onClick={prevStep}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Voltar
                    </button>
          )}
        </div>
              )}

              {/* Privacy Policy Notice */}
              {!submissionComplete && step === 4 && (
                <div className="mt-6 text-xs text-gray-500">
                  <p>Ao enviar este formulário, você concorda com nossa <Link href="/politica-privacidade" className="text-primary hover:underline">Política de Privacidade</Link> e autoriza o uso das informações fornecidas para análise e contato.</p>
                </div>
              )}
      </form>
    </div>
        </div>
      </div>
    </section>
  )
}