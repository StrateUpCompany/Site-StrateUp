"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/core/hooks/use-toast"
import { Sparkles, Loader2, Copy, ThumbsUp, ThumbsDown, RefreshCw, Send, ImageIcon } from "lucide-react"

export default function AiTools() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("content-generator")
  const [isGenerating, setIsGenerating] = useState(false)
  const [contentType, setContentType] = useState("blog-post")
  const [contentTopic, setContentTopic] = useState("")
  const [contentLength, setContentLength] = useState([500])
  const [generatedContent, setGeneratedContent] = useState("")
  const [imagePrompt, setImagePrompt] = useState("")
  const [generatedImage, setGeneratedImage] = useState("")
  const [seoKeywords, setSeoKeywords] = useState("")
  const [seoSuggestions, setSeoSuggestions] = useState<string[]>([])
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    { role: "system", content: "Olá! Sou o assistente de IA do StrateUp. Como posso ajudar você hoje?" },
  ])

  const handleGenerateContent = () => {
    if (!contentTopic) {
      toast({
        title: "Erro",
        description: "Por favor, insira um tópico para o conteúdo.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedContent("")

    // Simulação de geração de conteúdo
    setTimeout(() => {
      let content = ""

      if (contentType === "blog-post") {
        content = `# ${contentTopic}\n\n## Introdução\n\nNos últimos anos, ${contentTopic} tem se tornado um tópico cada vez mais relevante no mundo dos negócios. Empresas de todos os tamanhos estão buscando maneiras de implementar estratégias eficazes para aproveitar as oportunidades que surgem neste cenário.\n\n## Principais Aspectos\n\n### Tendências Atuais\n\nO mercado atual apresenta diversas tendências relacionadas a ${contentTopic}. Especialistas apontam que empresas que adotam abordagens inovadoras tendem a se destacar da concorrência e conquistar uma fatia maior do mercado.\n\n### Desafios Comuns\n\nApesar das oportunidades, muitas empresas enfrentam desafios ao lidar com ${contentTopic}. Entre os obstáculos mais comuns estão a falta de conhecimento técnico, recursos limitados e dificuldade em acompanhar as rápidas mudanças do mercado.\n\n## Estratégias Eficazes\n\n1. **Investimento em capacitação**: Treine sua equipe para dominar as habilidades necessárias.\n2. **Análise de dados**: Utilize métricas relevantes para tomar decisões informadas.\n3. **Parcerias estratégicas**: Colabore com especialistas e outras empresas do setor.\n4. **Inovação contínua**: Esteja sempre atento às novidades e tendências emergentes.\n\n## Conclusão\n\nImplementar estratégias eficazes relacionadas a ${contentTopic} pode ser um diferencial competitivo significativo para sua empresa. Ao adotar uma abordagem estruturada e manter-se atualizado sobre as melhores práticas, é possível alcançar resultados expressivos e garantir o crescimento sustentável do negócio.`
      } else if (contentType === "product-description") {
        content = `# ${contentTopic}\n\n**Transforme sua experiência com nossa solução inovadora**\n\nApresentamos ${contentTopic}, a solução definitiva para empresas que buscam otimizar seus processos e aumentar sua produtividade. Desenvolvido com tecnologia de ponta e pensando nas necessidades específicas do mercado atual, nosso produto oferece uma combinação perfeita de funcionalidade, facilidade de uso e resultados comprovados.\n\n## Principais Características\n\n- **Interface intuitiva**: Navegação simplificada que permite utilização imediata, sem necessidade de treinamentos extensos.\n- **Personalização avançada**: Adapte-se às necessidades específicas do seu negócio com nossas opções de configuração flexíveis.\n- **Integração completa**: Conecte-se facilmente com as ferramentas que você já utiliza, garantindo uma transição suave.\n- **Suporte premium**: Nossa equipe de especialistas está sempre disponível para ajudar com qualquer dúvida ou necessidade.\n\n## Benefícios Comprovados\n\n- Aumento de até 35% na produtividade\n- Redução de 40% nos custos operacionais\n- Melhoria significativa na satisfação dos clientes\n- ROI positivo em menos de 6 meses\n\nNão perca mais tempo com soluções inadequadas. Escolha ${contentTopic} e transforme a maneira como sua empresa opera. Entre em contato hoje mesmo para uma demonstração gratuita!`
      } else if (contentType === "social-media") {
        content = `# Post para Instagram sobre ${contentTopic}\n\n📱 **Texto para Feed**\n\n🚀 Você já parou para pensar como ${contentTopic} pode transformar completamente os resultados do seu negócio?\n\nNossos especialistas desenvolveram estratégias comprovadas que já ajudaram centenas de empresas a superarem seus desafios e alcançarem novos patamares de sucesso.\n\nSwipe para descobrir 5 dicas práticas que você pode implementar HOJE MESMO! 👉\n\n#Estratégia #Negócios #Crescimento #${contentTopic.replace(/\s+/g, "")}\n\n---\n\n# Post para LinkedIn sobre ${contentTopic}\n\n🔍 **O GUIA DEFINITIVO SOBRE ${contentTopic.toUpperCase()}**\n\nNos últimos 12 meses, acompanhamos de perto como empresas líderes em seus segmentos têm utilizado ${contentTopic} para criar vantagens competitivas significativas.\n\nO resultado? Um crescimento médio de 27% em receita e 40% em eficiência operacional.\n\nMas o que exatamente estas empresas estão fazendo diferente?\n\nNeste artigo, compartilho as 3 estratégias principais que identificamos em nossa pesquisa com mais de 200 empresas de alto desempenho:\n\n1️⃣ Abordagem centrada em dados para tomada de decisões\n2️⃣ Implementação de processos ágeis e adaptáveis\n3️⃣ Foco contínuo em capacitação e desenvolvimento de talentos\n\nVocê está aplicando alguma destas estratégias no seu negócio? Compartilhe nos comentários sua experiência!\n\n#LiderançaEstratégica #Inovação #${contentTopic.replace(/\s+/g, "")}`
      } else if (contentType === "email-campaign") {
        content = `# Campanha de Email sobre ${contentTopic}\n\n## Assunto: [EXCLUSIVO] Descubra como dominar ${contentTopic} em apenas 30 dias\n\nOlá, {nome},\n\nEspero que esteja tudo bem com você.\n\nEstou entrando em contato porque notei que sua empresa tem buscado maneiras de aprimorar suas estratégias relacionadas a ${contentTopic}.\n\nNos últimos 5 anos, nossa equipe tem trabalhado com empresas como a sua, ajudando-as a superar desafios semelhantes e alcançar resultados extraordinários.\n\n**Aqui estão alguns resultados que nossos clientes conseguiram:**\n\n- Aumento de 45% em conversões\n- Redução de 30% nos custos operacionais\n- Melhoria de 60% na satisfação dos clientes\n\nGostaríamos de compartilhar com você nosso guia exclusivo: **"${contentTopic}: O Caminho para o Sucesso em 30 Dias"**.\n\nEste material reúne as melhores práticas, estudos de caso e ferramentas práticas que você pode implementar imediatamente no seu negócio.\n\n[BAIXAR GUIA GRATUITO]\n\nAlém disso, estamos oferecendo uma consultoria inicial gratuita de 30 minutos para os primeiros 20 respondentes deste email.\n\nInteressado? Basta responder a esta mensagem ou agendar diretamente pelo link abaixo:\n\n[AGENDAR CONSULTORIA]\n\nFicamos à disposição para qualquer dúvida.\n\nAtenciosamente,\n\n[Seu Nome]\n[`
      }

      setGeneratedContent(content)
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Ferramentas de IA</h2>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Gerador de Conteúdo</TabsTrigger>
          <TabsTrigger value="images">Gerador de Imagens</TabsTrigger>
          <TabsTrigger value="assistant">Assistente de IA</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerador de Conteúdo com IA</CardTitle>
              <CardDescription>Crie conteúdo de alta qualidade para blog, redes sociais, emails e mais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-2/3">
                    <label htmlFor="prompt" className="text-sm font-medium block mb-2">
                      O que você deseja criar?
                    </label>
                    <Textarea
                      id="prompt"
                      placeholder="Ex: Escreva um artigo sobre estratégias de marketing digital para pequenas empresas em 2023"
                      value={contentTopic}
                      onChange={(e) => setContentTopic(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  <div className="w-full md:w-1/3 space-y-4">
                    <div>
                      <label htmlFor="content-type" className="text-sm font-medium block mb-2">
                        Tipo de Conteúdo
                      </label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blog-post">Artigo de Blog</SelectItem>
                          <SelectItem value="social-media">Post para Redes Sociais</SelectItem>
                          <SelectItem value="email-campaign">Email Marketing</SelectItem>
                          <SelectItem value="product-description">Descrição de Produto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="tone" className="text-sm font-medium block mb-2">
                        Tom de Voz
                      </label>
                      <Select defaultValue="professional">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tom" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Profissional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="friendly">Amigável</SelectItem>
                          <SelectItem value="authoritative">Autoritativo</SelectItem>
                          <SelectItem value="enthusiastic">Entusiasmado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="length" className="text-sm font-medium block mb-2">
                        Tamanho
                      </label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tamanho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Curto</SelectItem>
                          <SelectItem value="medium">Médio</SelectItem>
                          <SelectItem value="long">Longo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleGenerateContent}
                    disabled={!contentTopic || isGenerating}
                    className="bg-[#0066ff] hover:bg-[#0052cc]"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Gerar Conteúdo
                      </>
                    )}
                  </Button>
                </div>

                {isGenerating && (
                  <div className="text-center py-12 border rounded-lg">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#0066ff]" />
                    <p className="text-gray-600">Gerando conteúdo de alta qualidade...</p>
                    <p className="text-sm text-gray-500 mt-2">Isso pode levar alguns segundos</p>
                  </div>
                )}

                {generatedContent && !isGenerating && (
                  <div className="border rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">Conteúdo Gerado</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerar
                        </Button>
                      </div>
                    </div>

                    <div className="prose prose-blue max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-base">{generatedContent}</pre>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <div className="text-sm text-gray-500">Como está este conteúdo?</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Bom
                        </Button>
                        <Button variant="outline" size="sm">
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          Precisa Melhorar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerador de Imagens com IA</CardTitle>
              <CardDescription>Crie imagens personalizadas para seu site, blog e redes sociais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-2/3">
                    <label htmlFor="image-prompt" className="text-sm font-medium block mb-2">
                      Descreva a imagem que você deseja criar
                    </label>
                    <Textarea
                      id="image-prompt"
                      placeholder="Ex: Uma imagem profissional mostrando um empresário analisando gráficos de marketing digital em um escritório moderno, estilo fotográfico"
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  <div className="w-full md:w-1/3 space-y-4">
                    <div>
                      <label htmlFor="image-style" className="text-sm font-medium block mb-2">
                        Estilo
                      </label>
                      <Select defaultValue="realistic">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estilo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realistic">Fotorrealista</SelectItem>
                          <SelectItem value="3d">3D Render</SelectItem>
                          <SelectItem value="cartoon">Cartoon</SelectItem>
                          <SelectItem value="watercolor">Aquarela</SelectItem>
                          <SelectItem value="digital">Arte Digital</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="image-ratio" className="text-sm font-medium block mb-2">
                        Proporção
                      </label>
                      <Select defaultValue="square">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a proporção" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="square">Quadrada (1:1)</SelectItem>
                          <SelectItem value="portrait">Retrato (3:4)</SelectItem>
                          <SelectItem value="landscape">Paisagem (16:9)</SelectItem>
                          <SelectItem value="social">Redes Sociais (4:5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="image-quality" className="text-sm font-medium block mb-2">
                        Qualidade
                      </label>
                      <Select defaultValue="high">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a qualidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Padrão</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#0066ff] hover:bg-[#0052cc]">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Gerar Imagem
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="aspect-square bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Variação
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="aspect-square bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Variação
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assistant" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Assistente de IA</CardTitle>
              <CardDescription>
                Converse com um assistente de IA para obter ajuda com marketing, SEO, conteúdo e mais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg h-[400px] flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#0066ff] text-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p>Olá! Sou o assistente de IA da StrateUp. Como posso ajudar você hoje?</p>
                    </div>
                  </div>

                  <div className="flex items-start justify-end">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                      <p>Preciso de ideias para melhorar o engajamento nas redes sociais da minha empresa.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#0066ff] text-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p>Aqui estão 5 estratégias para aumentar o engajamento nas redes sociais:</p>
                      <ol className="list-decimal pl-5 mt-2 space-y-1">
                        <li>Crie conteúdo interativo como enquetes, quizzes e perguntas abertas</li>
                        <li>Utilize vídeos curtos, que têm 2x mais engajamento que outros formatos</li>
                        <li>Estabeleça um calendário consistente de postagens</li>
                        <li>Responda comentários e mensagens rapidamente</li>
                        <li>Participe de tendências relevantes para seu nicho</li>
                      </ol>
                      <p className="mt-2">Gostaria que eu elaborasse alguma dessas estratégias?</p>
                    </div>
                  </div>
                </div>

                <div className="border-t p-3">
                  <div className="flex gap-2">
                    <Textarea placeholder="Digite sua mensagem..." className="resize-none" rows={1} />
                    <Button className="bg-[#0066ff] hover:bg-[#0052cc] h-full">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-gray-500">Sugestões:</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        Ideias de conteúdo
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        Otimizar SEO
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        Analisar concorrentes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
