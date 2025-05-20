"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase"

export default function SeoTools() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("meta-tags")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [urlToAnalyze, setUrlToAnalyze] = useState("")
  const [metaTags, setMetaTags] = useState({
    title: "",
    description: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
  })
  const [seoScore, setSeoScore] = useState<null | {
    overall: number
    titleScore: number
    descriptionScore: number
    keywordsScore: number
    contentScore: number
    speedScore: number
    mobileScore: number
  }>(null)

  const supabase = createClient()

  const handleMetaTagChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setMetaTags((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveMetaTags = async () => {
    try {
      const { error } = await supabase.from("seo_settings").upsert([
        {
          id: 1, // Assumindo que temos apenas um registro de configurações SEO
          meta_title: metaTags.title,
          meta_description: metaTags.description,
          meta_keywords: metaTags.keywords,
          og_title: metaTags.ogTitle,
          og_description: metaTags.ogDescription,
          og_image: metaTags.ogImage,
          updated_at: new Date().toISOString(),
        },
      ])

      if (error) throw error

      toast({
        title: "Sucesso",
        description: "Meta tags salvas com sucesso!",
      })
    } catch (error) {
      console.error("Erro ao salvar meta tags:", error)
      toast({
        title: "Erro",
        description: "Não foi possível salvar as meta tags.",
        variant: "destructive",
      })
    }
  }

  const handleAnalyzeUrl = () => {
    if (!urlToAnalyze) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma URL válida.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Simulação de análise SEO
    setTimeout(() => {
      // Gerar pontuações aleatórias para demonstração
      const titleScore = Math.floor(Math.random() * 30) + 70
      const descriptionScore = Math.floor(Math.random() * 30) + 70
      const keywordsScore = Math.floor(Math.random() * 30) + 70
      const contentScore = Math.floor(Math.random() * 30) + 70
      const speedScore = Math.floor(Math.random() * 30) + 70
      const mobileScore = Math.floor(Math.random() * 30) + 70

      const overall = Math.floor(
        (titleScore + descriptionScore + keywordsScore + contentScore + speedScore + mobileScore) / 6,
      )

      setSeoScore({
        overall,
        titleScore,
        descriptionScore,
        keywordsScore,
        contentScore,
        speedScore,
        mobileScore,
      })

      setIsAnalyzing(false)

      toast({
        title: "Análise concluída",
        description: `Pontuação geral: ${overall}/100`,
      })
    }, 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-600"
    if (score >= 70) return "bg-yellow-600"
    return "bg-red-600"
  }

  const getSeoRecommendations = () => {
    if (!seoScore) return []

    const recommendations = []

    if (seoScore.titleScore < 90) {
      recommendations.push(
        "Melhore o título da página. Use palavras-chave relevantes e mantenha entre 50-60 caracteres.",
      )
    }

    if (seoScore.descriptionScore < 90) {
      recommendations.push("Otimize a meta descrição. Inclua palavras-chave e mantenha entre 150-160 caracteres.")
    }

    if (seoScore.keywordsScore < 90) {
      recommendations.push(
        "Revise suas palavras-chave. Certifique-se de que são relevantes e estão sendo usadas adequadamente no conteúdo.",
      )
    }

    if (seoScore.contentScore < 90) {
      recommendations.push(
        "Melhore a qualidade do conteúdo. Adicione mais texto relevante, use subtítulos (H2, H3) e inclua imagens com alt text.",
      )
    }

    if (seoScore.speedScore < 90) {
      recommendations.push("Otimize a velocidade da página. Comprima imagens, minimize CSS/JS e considere usar um CDN.")
    }

    if (seoScore.mobileScore < 90) {
      recommendations.push(
        "Melhore a experiência mobile. Certifique-se de que o site é responsivo e os elementos são facilmente clicáveis em dispositivos móveis.",
      )
    }

    return recommendations
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="meta-tags">Meta Tags</TabsTrigger>
          <TabsTrigger value="analyzer">Analisador SEO</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
        </TabsList>

        <TabsContent value="meta-tags" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meta Tags</CardTitle>
              <CardDescription>Configure as meta tags para melhorar o SEO do seu site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título (Meta Title)</Label>
                <Input
                  id="title"
                  name="title"
                  value={metaTags.title}
                  onChange={handleMetaTagChange}
                  placeholder="Título da página (50-60 caracteres)"
                />
                <p className="text-xs text-muted-foreground">{metaTags.title.length} caracteres (recomendado: 50-60)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (Meta Description)</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={metaTags.description}
                  onChange={handleMetaTagChange}
                  placeholder="Descrição da página (150-160 caracteres)"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {metaTags.description.length} caracteres (recomendado: 150-160)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Palavras-chave (Meta Keywords)</Label>
                <Input
                  id="keywords"
                  name="keywords"
                  value={metaTags.keywords}
                  onChange={handleMetaTagChange}
                  placeholder="palavra1, palavra2, palavra3"
                />
              </div>

              <div className="pt-4">
                <h4 className="mb-2 text-sm font-medium">Open Graph (Redes Sociais)</h4>

                <div className="space-y-2">
                  <Label htmlFor="ogTitle">OG Title</Label>
                  <Input
                    id="ogTitle"
                    name="ogTitle"
                    value={metaTags.ogTitle}
                    onChange={handleMetaTagChange}
                    placeholder="Título para compartilhamento em redes sociais"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogDescription">OG Description</Label>
                  <Textarea
                    id="ogDescription"
                    name="ogDescription"
                    value={metaTags.ogDescription}
                    onChange={handleMetaTagChange}
                    placeholder="Descrição para compartilhamento em redes sociais"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ogImage">OG Image URL</Label>
                  <Input
                    id="ogImage"
                    name="ogImage"
                    value={metaTags.ogImage}
                    onChange={handleMetaTagChange}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveMetaTags}>Salvar Meta Tags</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analyzer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analisador SEO</CardTitle>
              <CardDescription>Analise o SEO de qualquer URL do seu site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={urlToAnalyze}
                  onChange={(e) => setUrlToAnalyze(e.target.value)}
                  placeholder="https://exemplo.com/pagina"
                />
                <Button onClick={handleAnalyzeUrl} disabled={isAnalyzing}>
                  {isAnalyzing ? "Analisando..." : "Analisar"}
                </Button>
              </div>

              {seoScore && (
                <div className="mt-6 space-y-6">
                  <div className="text-center">
                    <div className="relative mx-auto mb-4 h-32 w-32 rounded-full border-8 border-gray-100">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                        <span className={`text-4xl font-bold ${getScoreColor(seoScore.overall)}`}>
                          {seoScore.overall}
                        </span>
                      </div>
                      <div
                        className="absolute top-0 h-full w-full rounded-full"
                        style={{
                          background: `conic-gradient(${getProgressColor(seoScore.overall)} ${seoScore.overall}%, transparent 0)`,
                          transform: "rotate(270deg)",
                        }}
                      ></div>
                    </div>
                    <h3 className="text-xl font-bold">Pontuação SEO</h3>
                    <p className="text-sm text-muted-foreground">
                      {seoScore.overall >= 90
                        ? "Excelente! Seu SEO está muito bom."
                        : seoScore.overall >= 70
                          ? "Bom! Seu SEO está razoável, mas pode melhorar."
                          : "Atenção! Seu SEO precisa de melhorias significativas."}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm">Título</span>
                        <span className={`text-sm font-medium ${getScoreColor(seoScore.titleScore)}`}>
                          {seoScore.titleScore}/100
                        </span>
                      </div>
                      <Progress value={seoScore.titleScore} className={getProgressColor(seoScore.titleScore)} />
                    </div>

                    <div>
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm">Descrição</span>
                        <span className={`text-sm font-medium ${getScoreColor(seoScore.descriptionScore)}`}>
                          {seoScore.descriptionScore}/100
                        </span>
                      </div>
                      <Progress
                        value={seoScore.descriptionScore}
                        className={getProgressColor(seoScore.descriptionScore)}
                      />
                    </div>

                    <div>
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm">Palavras-chave</span>
                        <span className={`text-sm font-medium ${getScoreColor(seoScore.keywordsScore)}`}>
                          {seoScore.keywordsScore}/100
                        </span>
                      </div>
                      <Progress value={seoScore.keywordsScore} className={getProgressColor(seoScore.keywordsScore)} />
                    </div>

                    <div>
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm">Conteúdo</span>
                        <span className={`text-sm font-medium ${getScoreColor(seoScore.contentScore)}`}>
                          {seoScore.contentScore}/100
                        </span>
                      </div>
                      <Progress value={seoScore.contentScore} className={getProgressColor(seoScore.contentScore)} />
                    </div>

                    <div>
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm">Velocidade</span>
                        <span className={`text-sm font-medium ${getScoreColor(seoScore.speedScore)}`}>
                          {seoScore.speedScore}/100
                        </span>
                      </div>
                      <Progress value={seoScore.speedScore} className={getProgressColor(seoScore.speedScore)} />
                    </div>

                    <div>
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm">Mobile</span>
                        <span className={`text-sm font-medium ${getScoreColor(seoScore.mobileScore)}`}>
                          {seoScore.mobileScore}/100
                        </span>
                      </div>
                      <Progress value={seoScore.mobileScore} className={getProgressColor(seoScore.mobileScore)} />
                    </div>
                  </div>

                  <div className="rounded-md bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium">Recomendações</h4>
                    <ul className="space-y-2 pl-5 text-sm">
                      {getSeoRecommendations().map((recommendation, index) => (
                        <li key={index} className="list-disc">
                          {recommendation}
                        </li>
                      ))}
                      {getSeoRecommendations().length === 0 && (
                        <li>Parabéns! Seu SEO está excelente. Continue mantendo as boas práticas.</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sitemap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciador de Sitemap</CardTitle>
              <CardDescription>Gere e gerencie o sitemap do seu site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-gray-50 p-4">
                <h4 className="mb-2 font-medium">Sitemap Atual</h4>
                <p className="mb-2 text-sm text-muted-foreground">
                  Seu sitemap está disponível em:{" "}
                  <code className="rounded bg-gray-200 px-1 py-0.5">https://seusite.com/sitemap.xml</code>
                </p>
                <p className="text-sm text-muted-foreground">Última atualização: 20/05/2025 às 10:30</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">Visualizar Sitemap</Button>
                <Button>Gerar Novo Sitemap</Button>
              </div>

              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">Configurações do Sitemap</h4>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="excludePaths">Caminhos a excluir (um por linha)</Label>
                    <Textarea
                      id="excludePaths"
                      placeholder="/admin
/login
/paginas-privadas"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="changefreq">Frequência de mudança padrão</Label>
                    <select
                      id="changefreq"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="always">always</option>
                      <option value="hourly">hourly</option>
                      <option value="daily" selected>
                        daily
                      </option>
                      <option value="weekly">weekly</option>
                      <option value="monthly">monthly</option>
                      <option value="yearly">yearly</option>
                      <option value="never">never</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridade padrão</Label>
                    <Input id="priority" type="number" min="0.0" max="1.0" step="0.1" defaultValue="0.8" />
                  </div>

                  <Button>Salvar Configurações</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
