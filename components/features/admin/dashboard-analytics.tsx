"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/core/hooks/use-toast"

// Componente de gráfico de linha
const LineChart = ({ data, title }: { data: number[]; title: string }) => {
  const max = Math.max(...data) || 100

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">{title}</h4>
      <div className="h-[200px] w-full">
        <div className="flex h-full items-end gap-1">
          {data.map((value, i) => (
            <div
              key={i}
              className="relative flex-1 bg-primary transition-all duration-300"
              style={{ height: `${(value / max) * 100}%` }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 hover:opacity-100">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
    </div>
  )
}

// Componente de gráfico de pizza
const PieChart = ({ data }: { data: { label: string; value: number; color: string }[] }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0)
  let cumulativePercentage = 0

  return (
    <div className="flex items-center justify-center space-x-8">
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          {data.map((item, i) => {
            const percentage = (item.value / total) * 100
            const startAngle = cumulativePercentage
            cumulativePercentage += percentage

            return (
              <circle
                key={i}
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={item.color}
                strokeWidth="20"
                strokeDasharray={`${percentage} ${100 - percentage}`}
                strokeDashoffset={-startAngle}
                className="transition-all duration-300"
              />
            )
          })}
        </svg>
      </div>
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center space-x-2">
            <div className="h-3 w-3" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm">
              {item.label}: {item.value} ({((item.value / total) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardAnalytics() {
  const { toast } = useToast()
  const [period, setPeriod] = useState("7d")
  const [isLoading, setIsLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState({
    visitors: Array(7)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100)),
    pageViews: Array(7)
      .fill(0)
      .map(() => Math.floor(Math.random() * 200)),
    conversions: Array(7)
      .fill(0)
      .map(() => Math.floor(Math.random() * 20)),
    sources: [
      { label: "Direto", value: 45, color: "#3b82f6" },
      { label: "Orgânico", value: 30, color: "#10b981" },
      { label: "Social", value: 15, color: "#f59e0b" },
      { label: "Referência", value: 10, color: "#6366f1" },
    ],
    devices: [
      { label: "Desktop", value: 55, color: "#3b82f6" },
      { label: "Mobile", value: 40, color: "#10b981" },
      { label: "Tablet", value: 5, color: "#f59e0b" },
    ],
    topPages: [
      { path: "/", views: 1245, title: "Página Inicial" },
      { path: "/blog", views: 856, title: "Blog" },
      { path: "/servicos", views: 721, title: "Serviços" },
      { path: "/sobre", views: 543, title: "Sobre Nós" },
      { path: "/contato", views: 432, title: "Contato" },
    ],
  })

  useEffect(() => {
    // Simulação de carregamento de dados
    setIsLoading(true)

    const timer = setTimeout(() => {
      // Gerar dados aleatórios baseados no período
      const daysInPeriod = period === "7d" ? 7 : period === "30d" ? 30 : 90

      setAnalyticsData({
        visitors: Array(daysInPeriod)
          .fill(0)
          .map(() => Math.floor(Math.random() * 100)),
        pageViews: Array(daysInPeriod)
          .fill(0)
          .map(() => Math.floor(Math.random() * 200)),
        conversions: Array(daysInPeriod)
          .fill(0)
          .map(() => Math.floor(Math.random() * 20)),
        sources: [
          { label: "Direto", value: Math.floor(Math.random() * 50) + 30, color: "#3b82f6" },
          { label: "Orgânico", value: Math.floor(Math.random() * 40) + 20, color: "#10b981" },
          { label: "Social", value: Math.floor(Math.random() * 20) + 10, color: "#f59e0b" },
          { label: "Referência", value: Math.floor(Math.random() * 15) + 5, color: "#6366f1" },
        ],
        devices: [
          { label: "Desktop", value: Math.floor(Math.random() * 30) + 40, color: "#3b82f6" },
          { label: "Mobile", value: Math.floor(Math.random() * 30) + 30, color: "#10b981" },
          { label: "Tablet", value: Math.floor(Math.random() * 10) + 5, color: "#f59e0b" },
        ],
        topPages: [
          { path: "/", views: Math.floor(Math.random() * 1000) + 800, title: "Página Inicial" },
          { path: "/blog", views: Math.floor(Math.random() * 800) + 600, title: "Blog" },
          { path: "/servicos", views: Math.floor(Math.random() * 600) + 400, title: "Serviços" },
          { path: "/sobre", views: Math.floor(Math.random() * 400) + 300, title: "Sobre Nós" },
          { path: "/contato", views: Math.floor(Math.random() * 300) + 200, title: "Contato" },
        ],
      })

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [period])

  const handleExportData = () => {
    toast({
      title: "Dados exportados",
      description: "Os dados foram exportados com sucesso.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h3 className="text-lg font-medium">Estatísticas do Site</h3>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <button
            onClick={handleExportData}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Exportar
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.visitors.reduce((a, b) => a + b, 0)}</div>
                <LineChart data={analyticsData.visitors} title="Visitantes por dia" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Visualizações de Página</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.pageViews.reduce((a, b) => a + b, 0)}</div>
                <LineChart data={analyticsData.pageViews} title="Visualizações por dia" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.conversions.reduce((a, b) => a + b, 0)}</div>
                <LineChart data={analyticsData.conversions} title="Conversões por dia" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="sources" className="space-y-4">
            <TabsList>
              <TabsTrigger value="sources">Fontes de Tráfego</TabsTrigger>
              <TabsTrigger value="devices">Dispositivos</TabsTrigger>
              <TabsTrigger value="pages">Páginas Populares</TabsTrigger>
            </TabsList>

            <TabsContent value="sources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fontes de Tráfego</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart data={analyticsData.sources} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dispositivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart data={analyticsData.devices} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Páginas Mais Visitadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topPages.map((page, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{page.title}</div>
                          <div className="text-sm text-muted-foreground">{page.path}</div>
                        </div>
                        <div className="font-medium">{page.views.toLocaleString()} visualizações</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
