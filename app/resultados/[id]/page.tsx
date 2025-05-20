import { getDiagnosticResults } from "@/app/actions/diagnostic-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, FileText, BarChart3, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react"
import Link from "next/link"
import ResultsOverview from "@/components/diagnostic/results-overview"
import ResultsDetailedAnalysis from "@/components/diagnostic/results-detailed-analysis"
import ResultsRecommendations from "@/components/diagnostic/results-recommendations"
import ResultsActionPlan from "@/components/diagnostic/results-action-plan"
import ResultsDownloadPDF from "@/components/diagnostic/results-download-pdf"

export default async function ResultsPage({ params }: { params: { id: string } }) {
  const results = await getDiagnosticResults(params.id)

  if (!results) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Resultados não encontrados</h1>
          <p className="mb-6">Não foi possível encontrar os resultados do diagnóstico solicitado.</p>
          <Link href="/diagnostico">
            <Button>Realizar novo diagnóstico</Button>
          </Link>
        </div>
      </div>
    )
  }

  const {
    overallScore,
    categories,
    userInfo,
    strengths,
    weaknesses,
    recommendations,
    leadType,
    leadScore,
    leadRecommendations,
  } = results

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-[#0066ff] hover:underline mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para a página inicial
        </Link>
        <h1 className="text-3xl font-bold">Resultados do Diagnóstico Digital</h1>
        <p className="text-lg text-gray-600 mt-2">
          Análise completa da presença digital e estratégia de marketing da sua empresa.
        </p>
      </div>

      {/* Lead Classification Card */}
      <Card
        className={`mb-8 border-l-4 ${
          leadType === "quente"
            ? "border-l-green-500"
            : leadType === "morno"
              ? "border-l-yellow-500"
              : "border-l-blue-500"
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-start">
            <div
              className={`rounded-full p-2 mr-4 ${
                leadType === "quente"
                  ? "bg-green-100 text-green-600"
                  : leadType === "morno"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-blue-100 text-blue-600"
              }`}
            >
              {leadType === "quente" ? (
                <CheckCircle className="h-6 w-6" />
              ) : leadType === "morno" ? (
                <AlertTriangle className="h-6 w-6" />
              ) : (
                <Lightbulb className="h-6 w-6" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{leadRecommendations.title}</h3>
              <p className="text-gray-600 mb-4">{leadRecommendations.description}</p>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Nível de Maturidade Digital</span>
                  <span className="font-medium">{leadScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      leadType === "quente" ? "bg-green-500" : leadType === "morno" ? "bg-yellow-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${leadScore}%` }}
                  ></div>
                </div>
              </div>

              <h4 className="font-medium mb-2">Próximos passos recomendados:</h4>
              <ul className="space-y-1">
                {leadRecommendations.actions.map((action, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#0066ff] mr-2">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" /> Visão Geral
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" /> Análise Detalhada
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center">
            <Lightbulb className="mr-2 h-4 w-4" /> Recomendações
          </TabsTrigger>
          <TabsTrigger value="action-plan" className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" /> Plano de Ação
          </TabsTrigger>
          <TabsTrigger value="download" className="flex items-center">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ResultsOverview
            overallScore={overallScore}
            categories={categories}
            userInfo={userInfo}
            strengths={strengths}
            weaknesses={weaknesses}
            leadType={leadType}
            leadScore={leadScore}
          />
        </TabsContent>

        <TabsContent value="analysis">
          <ResultsDetailedAnalysis categories={categories} />
        </TabsContent>

        <TabsContent value="recommendations">
          <ResultsRecommendations recommendations={recommendations} leadRecommendations={leadRecommendations} />
        </TabsContent>

        <TabsContent value="action-plan">
          <ResultsActionPlan categories={categories} leadType={leadType} />
        </TabsContent>

        <TabsContent value="download">
          <ResultsDownloadPDF />
        </TabsContent>
      </Tabs>

      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Pronto para transformar sua estratégia digital?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Agende uma consultoria gratuita com nossos especialistas para discutir os resultados do seu diagnóstico.
        </p>
        <Link href="/contato">
          <Button size="lg" className="bg-[#ff8c00] hover:bg-[#cc7000]">
            Agendar Consultoria Gratuita
          </Button>
        </Link>
      </div>
    </div>
  )
}
