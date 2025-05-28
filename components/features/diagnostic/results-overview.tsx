import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, Lightbulb } from "lucide-react"

interface ResultsOverviewProps {
  overallScore: number
  categories: {
    instagram: number
    googleBusiness: number
    website: number
    commercial: number
  }
  userInfo: {
    name: string
    email: string
    company: string
  }
  strengths: string[]
  weaknesses: string[]
  leadType?: string
  leadScore?: number
}

export default function ResultsOverview({
  overallScore,
  categories,
  userInfo,
  strengths,
  weaknesses,
  leadType = "frio",
  leadScore = 0,
}: ResultsOverviewProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pontuação Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 text-4xl font-bold text-[#0066ff] mb-2">
                {overallScore}%
              </div>
              <p className="text-sm text-gray-500">Pontuação do diagnóstico digital</p>
            </div>
            <Progress value={overallScore} className="h-2 mb-2" />
            <div className="text-xs text-gray-500 flex justify-between">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Classificação do Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div
                className={`rounded-full p-2 mr-3 ${
                  leadType === "quente"
                    ? "bg-green-100 text-green-600"
                    : leadType === "morno"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                }`}
              >
                {leadType === "quente" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : leadType === "morno" ? (
                  <AlertTriangle className="h-5 w-5" />
                ) : (
                  <Lightbulb className="h-5 w-5" />
                )}
              </div>
              <div>
                <h3 className="font-medium">
                  {leadType === "quente" ? "Lead Quente" : leadType === "morno" ? "Lead Morno" : "Lead Frio"}
                </h3>
                <p className="text-sm text-gray-500">
                  {leadType === "quente"
                    ? "Pronto para conversão"
                    : leadType === "morno"
                      ? "Em fase de consideração"
                      : "Em fase de conscientização"}
                </p>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Maturidade Digital</span>
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
            <p className="text-sm mt-4">
              {leadType === "quente"
                ? "Este lead demonstra alta prontidão para conversão e está no estágio de decisão."
                : leadType === "morno"
                  ? "Este lead está avaliando opções e precisa de mais informações."
                  : "Este lead está começando a reconhecer desafios, mas ainda não está pronto para uma solução."}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Instagram</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{categories.instagram}%</div>
              <Progress value={categories.instagram} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Google Meu Negócio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{categories.googleBusiness}%</div>
              <Progress value={categories.googleBusiness} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Website</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{categories.website}%</div>
              <Progress value={categories.website} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Comercial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{categories.commercial}%</div>
              <Progress value={categories.commercial} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pontos Fortes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pontos de Melhoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Empresa</p>
              <p className="font-medium">{userInfo.company}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contato</p>
              <p className="font-medium">{userInfo.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="font-medium">{userInfo.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
