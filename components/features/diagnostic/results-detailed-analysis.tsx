import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface ResultsProps {
  results: {
    id: string
    overallScore: number
    categories: {
      instagram: number
      googleBusiness: number
      website: number
      commercial: number
    }
    strengths: string[]
    weaknesses: string[]
    recommendations: string[]
  }
}

export default function ResultsDetailedAnalysis({ results }: ResultsProps) {
  return (
    <div className="mb-12">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Análise Detalhada</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Pontos Fortes
            </h3>
            <ul className="space-y-3">
              {results.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-500 mr-2 flex-shrink-0">
                    <CheckCircle className="h-4 w-4" />
                  </span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Oportunidades de Melhoria
            </h3>
            <ul className="space-y-3">
              {results.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-500 mr-2 flex-shrink-0">
                    <XCircle className="h-4 w-4" />
                  </span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Análise por Categoria</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Instagram ({results.categories.instagram}%)</h4>
              <p className="text-gray-700">
                Sua presença no Instagram demonstra consistência e qualidade visual, mas há oportunidades para aumentar
                o engajamento e conversões. Recomendamos implementar uma estratégia de conteúdo mais direcionada e
                aumentar a interação com seguidores.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Google Meu Negócio ({results.categories.googleBusiness}%)</h4>
              <p className="text-gray-700">
                Sua ficha no Google Meu Negócio precisa de otimização urgente. Completar todas as informações, adicionar
                fotos de qualidade e implementar uma estratégia de avaliações pode aumentar significativamente sua
                visibilidade local.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Website ({results.categories.website}%)</h4>
              <p className="text-gray-700">
                Seu website tem boa estrutura, mas carece de otimização para SEO e conversão. Implementar melhorias
                técnicas e criar páginas de destino específicas para diferentes segmentos de clientes pode aumentar
                significativamente suas taxas de conversão.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Comercial ({results.categories.commercial}%)</h4>
              <p className="text-gray-700">
                Seu processo comercial tem fundamentos sólidos, mas falta estruturação e automação. Implementar um funil
                de vendas baseado no DotCom Secrets e integrar ferramentas de CRM pode reduzir seu ciclo de vendas e
                aumentar a taxa de fechamento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
