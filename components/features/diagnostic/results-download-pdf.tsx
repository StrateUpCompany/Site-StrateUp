import { Button } from "@/components/ui/button"
import { FileDown, FileText, Mail, Calendar } from "lucide-react"

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

export default function ResultsDownloadPdf({ results }: ResultsProps) {
  return (
    <div>
      <div className="bg-[#0066ff] text-white rounded-xl shadow-md p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Baixe seu Relatório Completo</h2>
            <p className="mb-6 opacity-90">
              Receba uma versão detalhada deste diagnóstico em PDF, com análises aprofundadas e um plano de ação
              personalizado para transformar sua estratégia digital.
            </p>

            <div className="space-y-4">
              <Button className="w-full bg-white text-[#0066ff] hover:bg-gray-100">
                <FileDown className="mr-2 h-4 w-4" />
                Baixar Relatório PDF
              </Button>

              <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
                <Mail className="mr-2 h-4 w-4" />
                Receber por Email
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative mx-auto w-64 h-80 bg-white rounded-lg shadow-lg transform rotate-3">
              <div className="absolute inset-0 p-4 transform -rotate-3">
                <div className="h-6 w-24 bg-[#0066ff] rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="h-32 w-full bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="absolute bottom-4 right-4 h-12 w-12 bg-[#ff8c00] rounded-full flex items-center justify-center text-white font-bold">
                  PDF
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-md p-6 md:p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Agende uma Consultoria Estratégica Gratuita</h2>
        <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
          Converse com um de nossos consultores especializados para discutir seu diagnóstico em detalhes e receber
          orientações personalizadas para implementar as recomendações.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-[#ff8c00] hover:bg-[#cc7000]">
            <Calendar className="mr-2 h-5 w-5" />
            Agendar Consultoria Gratuita
          </Button>

          <Button size="lg" variant="outline">
            <FileText className="mr-2 h-5 w-5" />
            Conhecer Nossos Serviços
          </Button>
        </div>
      </div>
    </div>
  )
}
