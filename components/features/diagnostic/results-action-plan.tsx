import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, BarChart } from "lucide-react"

interface ResultsActionPlanProps {
  categories: {
    instagram: number
    googleBusiness: number
    website: number
    commercial: number
  }
  leadType?: string
}

export default function ResultsActionPlan({ categories, leadType = "frio" }: ResultsActionPlanProps) {
  // Generate action items based on scores and lead type
  const generateActionItems = () => {
    const actions = []

    // Instagram actions
    if (categories.instagram < 30) {
      actions.push({
        category: "Instagram",
        title: "Criar perfil profissional no Instagram",
        description: "Configurar um perfil comercial com informações completas da empresa",
        timeframe: "Imediato",
        priority: "Alta",
        impact: "Média",
      })
    } else if (categories.instagram < 60) {
      actions.push({
        category: "Instagram",
        title: "Desenvolver calendário de conteúdo",
        description: "Criar um plano de postagens semanais com conteúdo relevante para seu público",
        timeframe: "7 dias",
        priority: "Média",
        impact: "Alta",
      })
    } else {
      actions.push({
        category: "Instagram",
        title: "Otimizar estratégia de engajamento",
        description: "Implementar táticas avançadas para aumentar interações e alcance",
        timeframe: "30 dias",
        priority: "Média",
        impact: "Alta",
      })
    }

    // Google Business actions
    if (categories.googleBusiness < 30) {
      actions.push({
        category: "Google Meu Negócio",
        title: "Criar e verificar perfil no Google Meu Negócio",
        description: "Configurar e reivindicar sua ficha de empresa no Google",
        timeframe: "Imediato",
        priority: "Alta",
        impact: "Alta",
      })
    } else if (categories.googleBusiness < 60) {
      actions.push({
        category: "Google Meu Negócio",
        title: "Completar informações e adicionar fotos",
        description: "Adicionar horários, serviços, fotos de qualidade e informações completas",
        timeframe: "7 dias",
        priority: "Alta",
        impact: "Média",
      })
    } else {
      actions.push({
        category: "Google Meu Negócio",
        title: "Implementar estratégia de avaliações",
        description: "Criar sistema para solicitar e responder avaliações de clientes",
        timeframe: "14 dias",
        priority: "Média",
        impact: "Alta",
      })
    }

    // Website actions
    if (categories.website < 30) {
      actions.push({
        category: "Website",
        title: "Criar website responsivo",
        description: "Desenvolver um site otimizado para dispositivos móveis com informações essenciais",
        timeframe: "30 dias",
        priority: "Alta",
        impact: "Alta",
      })
    } else if (categories.website < 60) {
      actions.push({
        category: "Website",
        title: "Otimizar SEO on-page",
        description: "Implementar meta tags, otimizar velocidade e melhorar estrutura do site",
        timeframe: "14 dias",
        priority: "Alta",
        impact: "Alta",
      })
    } else {
      actions.push({
        category: "Website",
        title: "Implementar estratégia de conversão",
        description: "Otimizar formulários, CTAs e jornada do usuário para aumentar conversões",
        timeframe: "21 dias",
        priority: "Média",
        impact: "Alta",
      })
    }

    // Commercial actions
    if (categories.commercial < 30) {
      actions.push({
        category: "Comercial",
        title: "Estruturar processo de vendas básico",
        description: "Definir etapas do funil de vendas e pontos de contato com o cliente",
        timeframe: "14 dias",
        priority: "Alta",
        impact: "Alta",
      })
    } else if (categories.commercial < 60) {
      actions.push({
        category: "Comercial",
        title: "Implementar CRM",
        description: "Configurar sistema de CRM para gerenciar leads e oportunidades",
        timeframe: "21 dias",
        priority: "Alta",
        impact: "Alta",
      })
    } else {
      actions.push({
        category: "Comercial",
        title: "Otimizar funil de vendas",
        description: "Analisar e otimizar cada etapa do funil para aumentar taxas de conversão",
        timeframe: "30 dias",
        priority: "Média",
        impact: "Alta",
      })
    }

    // Lead-specific actions
    if (leadType === "quente") {
      actions.push({
        category: "Prioridade",
        title: "Agendar demonstração personalizada",
        description: "Apresentar solução completa com foco em resultados rápidos",
        timeframe: "Imediato",
        priority: "Alta",
        impact: "Alta",
      })
    } else if (leadType === "morno") {
      actions.push({
        category: "Prioridade",
        title: "Enviar materiais educativos segmentados",
        description: "Compartilhar estudos de caso e conteúdo específico para o setor",
        timeframe: "3 dias",
        priority: "Alta",
        impact: "Média",
      })
    } else {
      actions.push({
        category: "Prioridade",
        title: "Iniciar sequência de nutrição",
        description: "Implementar emails educativos sobre fundamentos de marketing digital",
        timeframe: "7 dias",
        priority: "Média",
        impact: "Média",
      })
    }

    return actions
  }

  const actionItems = generateActionItems()

  // Sort by priority (Alta > Média > Baixa)
  const sortedActions = [...actionItems].sort((a, b) => {
    const priorityOrder = { Alta: 0, Média: 1, Baixa: 2 }
    return (
      priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
    )
  })

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Plano de Ação Estratégico</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-gray-600">
            Este plano de ação foi desenvolvido com base nos resultados do seu diagnóstico digital. As ações estão
            organizadas por prioridade e impacto esperado.
          </p>

          <div className="space-y-6">
            {sortedActions.map((action, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium mr-3 ${
                          action.category === "Instagram"
                            ? "bg-pink-100 text-pink-800"
                            : action.category === "Google Meu Negócio"
                              ? "bg-blue-100 text-blue-800"
                              : action.category === "Website"
                                ? "bg-purple-100 text-purple-800"
                                : action.category === "Comercial"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {action.category}
                      </span>
                      <h3 className="font-medium">{action.title}</h3>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        action.priority === "Alta"
                          ? "bg-red-100 text-red-800"
                          : action.priority === "Média"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {action.priority}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{action.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span>
                        Prazo: <strong>{action.timeframe}</strong>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 text-gray-400 mr-1" />
                      <span>
                        Impacto: <strong>{action.impact}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cronograma de Implementação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-[#0066ff] pl-4 pb-6 relative">
              <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-[#0066ff]"></div>
              <h3 className="font-medium">Fase 1: Ações Imediatas (Primeiros 7 dias)</h3>
              <p className="text-gray-600 mt-1 mb-3">Foco em quick wins e configurações essenciais</p>
              <ul className="space-y-2">
                {sortedActions
                  .filter((a) => a.timeframe === "Imediato" || a.timeframe === "3 dias" || a.timeframe === "7 dias")
                  .map((action, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#0066ff] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{action.title}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="border-l-4 border-[#0066ff] pl-4 pb-6 relative">
              <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-[#0066ff]"></div>
              <h3 className="font-medium">Fase 2: Otimizações (8-21 dias)</h3>
              <p className="text-gray-600 mt-1 mb-3">Melhorias e ajustes nos canais principais</p>
              <ul className="space-y-2">
                {sortedActions
                  .filter((a) => a.timeframe === "14 dias" || a.timeframe === "21 dias")
                  .map((action, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#0066ff] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{action.title}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="border-l-4 border-[#0066ff] pl-4 relative">
              <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-[#0066ff]"></div>
              <h3 className="font-medium">Fase 3: Estratégias Avançadas (22-30 dias)</h3>
              <p className="text-gray-600 mt-1 mb-3">Implementação de táticas avançadas para crescimento</p>
              <ul className="space-y-2">
                {sortedActions
                  .filter((a) => a.timeframe === "30 dias")
                  .map((action, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-[#0066ff] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{action.title}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
