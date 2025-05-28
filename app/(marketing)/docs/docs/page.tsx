import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "Documentação | StrateUp",
  description: "Documentação técnica e guia de implementação do projeto StrateUp",
}

export default function DocsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow container py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Documentação do Projeto StrateUp</h1>

          <Tabs defaultValue="overview">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="architecture">Arquitetura</TabsTrigger>
              <TabsTrigger value="database">Banco de Dados</TabsTrigger>
              <TabsTrigger value="features">Funcionalidades</TabsTrigger>
              <TabsTrigger value="deployment">Implantação</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Visão Geral do Projeto</CardTitle>
                  <CardDescription>
                    Informações gerais sobre o projeto StrateUp, seus objetivos e tecnologias utilizadas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Sobre o Projeto</h3>
                    <p>
                      O StrateUp é uma plataforma de diagnóstico de maturidade digital para empresas que desejam
                      melhorar sua presença online e estratégia digital. A plataforma oferece um diagnóstico
                      personalizado, recomendações estratégicas e consultoria especializada.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tecnologias Utilizadas</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Next.js 14 (App Router)</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>Supabase (PostgreSQL)</li>
                      <li>Vercel (Hospedagem)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Estrutura do Projeto</h3>
                    <p>
                      O projeto segue a estrutura padrão do Next.js App Router, com páginas organizadas em diretórios
                      correspondentes às rotas da aplicação. Os componentes reutilizáveis estão no diretório
                      "components", e as funções utilitárias estão em "lib".
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex">
                    <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800">
                        Este projeto foi desenvolvido como uma solução completa para empresas de consultoria estratégica
                        que desejam oferecer diagnósticos digitais online. A plataforma é totalmente personalizável e
                        pode ser adaptada para diferentes nichos e necessidades.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="architecture">
              <Card>
                <CardHeader>
                  <CardTitle>Arquitetura do Sistema</CardTitle>
                  <CardDescription>
                    Detalhes sobre a arquitetura técnica, componentes e fluxo de dados da aplicação.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Componentes Principais</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Frontend:</strong> Interface do usuário construída com Next.js e Tailwind CSS
                      </li>
                      <li>
                        <strong>Backend:</strong> API Routes e Server Actions do Next.js
                      </li>
                      <li>
                        <strong>Banco de Dados:</strong> PostgreSQL hospedado no Supabase
                      </li>
                      <li>
                        <strong>Autenticação:</strong> Sistema de autenticação do Supabase
                      </li>
                      <li>
                        <strong>Armazenamento:</strong> Supabase Storage para arquivos e imagens
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Fluxo de Dados</h3>
                    <p>
                      A aplicação segue um fluxo de dados unidirecional, onde as ações do usuário são processadas pelos
                      componentes do cliente, que então chamam Server Actions para interagir com o banco de dados. Os
                      resultados são então retornados para a interface do usuário.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Segurança</h3>
                    <p>
                      A segurança é garantida através de várias camadas de proteção, incluindo autenticação de usuários,
                      autorização baseada em funções, validação de dados de entrada e proteção contra ataques comuns
                      como CSRF, XSS e SQL Injection.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Escalabilidade</h3>
                    <p>
                      A arquitetura foi projetada para ser escalável, permitindo o crescimento do número de usuários e
                      dados sem comprometer o desempenho. O uso de Vercel e Supabase facilita o escalonamento automático
                      conforme necessário.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle>Estrutura do Banco de Dados</CardTitle>
                  <CardDescription>
                    Informações sobre o esquema do banco de dados, tabelas e relacionamentos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tabelas Principais</h3>
                    <ul className="list-disc pl-6 space-y-3">
                      <li>
                        <strong>users:</strong> Armazena informações dos usuários (nome, email, telefone, empresa,
                        cargo)
                      </li>
                      <li>
                        <strong>diagnostic_submissions:</strong> Armazena as respostas do formulário de diagnóstico e os
                        resultados calculados
                      </li>
                      <li>
                        <strong>contact_submissions:</strong> Armazena mensagens enviadas através do formulário de
                        contato
                      </li>
                      <li>
                        <strong>newsletter_subscriptions:</strong> Armazena emails inscritos na newsletter
                      </li>
                      <li>
                        <strong>consultations:</strong> Armazena agendamentos de consultorias
                      </li>
                      <li>
                        <strong>blog_posts:</strong> Armazena artigos do blog
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Relacionamentos</h3>
                    <p>
                      As tabelas estão relacionadas através de chaves estrangeiras, permitindo consultas eficientes e
                      manutenção da integridade dos dados. Por exemplo, diagnostic_submissions e consultations estão
                      relacionadas à tabela users através do campo user_id.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Índices</h3>
                    <p>
                      Foram criados índices nas colunas frequentemente utilizadas em consultas para melhorar o
                      desempenho, como user_id em diagnostic_submissions e consultations, slug em blog_posts e category
                      em blog_posts.
                    </p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-yellow-800">
                        É importante executar o script de criação do banco de dados antes de utilizar a aplicação. O
                        script está disponível na página de administração (/admin) e pode ser executado com um clique.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle>Funcionalidades Implementadas</CardTitle>
                  <CardDescription>
                    Lista de funcionalidades disponíveis na aplicação e como utilizá-las.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Diagnóstico Digital</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Formulário de diagnóstico com 5 etapas</li>
                      <li>Cálculo automático de pontuação por categoria</li>
                      <li>Geração de relatório personalizado</li>
                      <li>Recomendações estratégicas baseadas nas respostas</li>
                      <li>Plano de ação prático</li>
                      <li>Download do relatório em PDF</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Blog</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Listagem de artigos com paginação</li>
                      <li>Filtro por categoria</li>
                      <li>Página de detalhe do artigo</li>
                      <li>Compartilhamento em redes sociais</li>
                      <li>Newsletter para inscrição</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Chatbot SDR</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Chatbot interativo para atendimento</li>
                      <li>Sistema de pontuação de leads</li>
                      <li>Agendamento de consultorias</li>
                      <li>Integração com WhatsApp</li>
                      <li>Respostas personalizadas baseadas no tipo de lead</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Otimizações</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>SEO otimizado para melhor ranqueamento</li>
                      <li>Integração com Google Analytics</li>
                      <li>Testes A/B para otimização de conversão</li>
                      <li>Suporte a múltiplos idiomas</li>
                      <li>Otimização de imagens para melhor desempenho</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-md p-4 flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-green-800">
                        Todas as funcionalidades foram testadas e estão funcionando corretamente. A aplicação está
                        pronta para uso em ambiente de produção.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deployment">
              <Card>
                <CardHeader>
                  <CardTitle>Implantação e Manutenção</CardTitle>
                  <CardDescription>
                    Instruções para implantar, configurar e manter a aplicação em produção.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Requisitos</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Conta na Vercel para hospedagem</li>
                      <li>Conta no Supabase para banco de dados</li>
                      <li>Domínio personalizado (opcional)</li>
                      <li>Conta no Google Analytics (opcional)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Variáveis de Ambiente</h3>
                    <p>As seguintes variáveis de ambiente devem ser configuradas na Vercel:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <code>NEXT_PUBLIC_SUPABASE_URL</code>: URL do projeto Supabase
                      </li>
                      <li>
                        <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>: Chave anônima do Supabase
                      </li>
                      <li>
                        <code>SUPABASE_SERVICE_ROLE_KEY</code>: Chave de serviço do Supabase
                      </li>
                      <li>
                        <code>NEXT_PUBLIC_SITE_URL</code>: URL do site em produção
                      </li>
                      <li>
                        <code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code>: ID do Google Analytics (opcional)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Passos para Implantação</h3>
                    <ol className="list-decimal pl-6 space-y-1">
                      <li>Clone o repositório do GitHub</li>
                      <li>Conecte o repositório à Vercel</li>
                      <li>Configure as variáveis de ambiente</li>
                      <li>Execute o deploy</li>
                      <li>Configure o domínio personalizado (opcional)</li>
                      <li>Execute o script de criação do banco de dados na página /admin</li>
                      <li>Popule o banco de dados com dados iniciais (opcional)</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Manutenção</h3>
                    <p>
                      A aplicação requer manutenção mínima, mas é recomendável monitorar regularmente o desempenho,
                      fazer backup do banco de dados e atualizar as dependências para garantir segurança e estabilidade.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex">
                    <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800">
                        Para suporte técnico ou dúvidas sobre a implantação, entre em contato com a equipe de
                        desenvolvimento através do email suporte@strateup.com.br.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  )
}
