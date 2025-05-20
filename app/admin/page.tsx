"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import DashboardAnalytics from "@/components/admin/dashboard-analytics"
import BlogManager from "@/components/admin/blog-manager"
import SeoTools from "@/components/admin/seo-tools"
import AiTools from "@/components/admin/ai-tools"
import ScriptExecutor from "@/components/admin/script-executor"
import UserManager from "@/components/admin/user-manager"

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Acesso negado",
        description: "Você precisa estar logado para acessar esta página.",
        variant: "destructive",
      })
      router.push("/admin/login")
    }
  }, [user, isLoading, router, toast])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie seu site, blog, SEO e mais.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push("/")}>
            Ver Site
          </Button>
          <Button variant="outline" onClick={() => router.push("/admin/change-password")}>
            Alterar Senha
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="ai">IA</TabsTrigger>
          <TabsTrigger value="scripts">Scripts</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Desempenho</CardTitle>
              <CardDescription>Visualize métricas e estatísticas do seu site.</CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardAnalytics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento do Blog</CardTitle>
              <CardDescription>Crie, edite e gerencie posts do blog.</CardDescription>
            </CardHeader>
            <CardContent>
              <BlogManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ferramentas de SEO</CardTitle>
              <CardDescription>Otimize seu site para mecanismos de busca.</CardDescription>
            </CardHeader>
            <CardContent>
              <SeoTools />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ferramentas de IA</CardTitle>
              <CardDescription>Use inteligência artificial para melhorar seu conteúdo.</CardDescription>
            </CardHeader>
            <CardContent>
              <AiTools />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scripts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Executor de Scripts</CardTitle>
              <CardDescription>Execute scripts personalizados no sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScriptExecutor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
              <CardDescription>Adicione, edite e gerencie usuários do sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
