import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ResultsRecommendationsProps {
  recommendations: string[]
  leadRecommendations?: {
    title: string
    description: string
    actions: string[]
  }
}

export default function ResultsRecommendations({ recommendations, leadRecommendations }: ResultsRecommendationsProps) {
  // Default lead recommendations if not provided
  const defaultLeadRecs = {
    title: "Recomendações Personalizadas",
    description: "Com base no seu diagnóstico, recomendamos as seguintes ações:",
    actions: [
      "Implementar estratégia de marketing digital integrada",
      "Otimizar presença online para melhorar visibilidade",
      "Estruturar processo de vendas para aumentar conversões",
    ],
  }

  const leadRecs = leadRecommendations || defaultLeadRecs

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-[#0066ff]" />
            Recomendações Estratégicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-gray-600">
            Com base na análise do seu diagnóstico digital, identificamos as seguintes recomendações para melhorar sua
            presença online e estratégia de marketing:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Recomendações Gerais</h3>
              <ul className="space-y-3">
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start bg-gray-50 p-3 rounded-md">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-3">{leadRecs.title}</h3>
              <p className="mb-4 text-gray-600">{leadRecs.description}</p>

              <ul className="space-y-3">
                {leadRecs.actions.map((action, index) => (
                  <li key={index} className="flex items-start bg-blue-50 p-3 rounded-md">
                    <ArrowRight className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-[#ff8c00]" />
            Próximos Passos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-gray-600">
            Para implementar estas recomendações e melhorar sua estratégia digital, sugerimos os seguintes passos:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="bg-[#0066ff] text-white rounded-full w-8 h-8 flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-medium mb-2">Consultoria Estratégica</h3>
              <p className="text-sm text-gray-600 mb-4">
                Agende uma consultoria gratuita para discutir os resultados do diagnóstico e definir prioridades.
              </p>
              <Link href="/contato">
                <Button variant="outline" size="sm" className="w-full">
                  Agendar Consultoria
                </Button>
              </Link>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="bg-[#0066ff] text-white rounded-full w-8 h-8 flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-medium mb-2">Plano de Ação</h3>
              <p className="text-sm text-gray-600 mb-4">
                Desenvolva um plano de ação detalhado com base nas recomendações prioritárias.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Ver Plano de Ação
              </Button>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="bg-[#0066ff] text-white rounded-full w-8 h-8 flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-medium mb-2">Implementação</h3>
              <p className="text-sm text-gray-600 mb-4">
                Implemente as estratégias com o suporte da nossa equipe especializada.
              </p>
              <Link href="/servicos">
                <Button variant="outline" size="sm" className="w-full">
                  Conhecer Serviços
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
