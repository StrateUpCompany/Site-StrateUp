"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle, Play, Save, Trash2, Download, Upload, Code, FileCode, Loader2 } from "lucide-react"

export default function ScriptExecutor() {
  const [script, setScript] = useState("")
  const [scriptType, setScriptType] = useState("sql")
  const [isExecuting, setIsExecuting] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    data?: any
    error?: string
  } | null>(null)

  const handleExecuteScript = () => {
    if (!script) return

    setIsExecuting(true)
    setResult(null)

    // Simulate API call
    setTimeout(() => {
      setIsExecuting(false)

      if (scriptType === "sql") {
        setResult({
          success: true,
          message: "Script SQL executado com sucesso",
          data: {
            rowsAffected: 5,
            duration: "0.23s",
          },
        })
      } else if (scriptType === "js") {
        setResult({
          success: true,
          message: "Script JavaScript executado com sucesso",
          data: {
            output: "Processamento concluído. 10 registros atualizados.",
            duration: "1.45s",
          },
        })
      } else {
        setResult({
          success: false,
          message: "Erro ao executar o script",
          error: "Tipo de script não suportado",
        })
      }
    }, 2000)
  }

  const sampleScripts = {
    sql: `-- Atualizar status de posts antigos
UPDATE blog_posts
SET status = 'archived'
WHERE published_at < NOW() - INTERVAL '1 year'
AND status = 'published';`,
    js: `// Script para processar dados de usuários
const users = await supabase.from('users').select('*');

// Filtrar usuários inativos
const inactiveUsers = users.data.filter(user => {
  const lastLogin = new Date(user.last_login);
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return lastLogin < threeMonthsAgo;
});

console.log(\`Encontrados \${inactiveUsers.length} usuários inativos\`);

// Enviar email de reengajamento
for (const user of inactiveUsers) {
  await sendReengagementEmail(user.email);
  console.log(\`Email enviado para \${user.email}\`);
}

console.log('Processamento concluído com sucesso!');`,
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Executor de Scripts</h2>

      <Tabs defaultValue="execute" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="execute">Executar Script</TabsTrigger>
          <TabsTrigger value="saved">Scripts Salvos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="execute" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Executor de Scripts</CardTitle>
              <CardDescription>
                Execute scripts SQL, JavaScript ou outros para automatizar tarefas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Select value={scriptType} onValueChange={setScriptType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tipo de Script" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sql">SQL</SelectItem>
                        <SelectItem value="js">JavaScript</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="production">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ambiente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Desenvolvimento</SelectItem>
                        <SelectItem value="staging">Homologação</SelectItem>
                        <SelectItem value="production">Produção</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setScript(sampleScripts[scriptType as keyof typeof sampleScripts] || "")}
                    >
                      <FileCode className="h-4 w-4 mr-2" />
                      Carregar Exemplo
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Importar
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
                    <span className="font-medium text-sm">
                      {scriptType === "sql" ? "Script SQL" : scriptType === "js" ? "Script JavaScript" : "Script"}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder={`Digite seu script ${scriptType.toUpperCase()} aqui...`}
                    className="font-mono text-sm border-0 rounded-none min-h-[300px]"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleExecuteScript}
                    disabled={!script || isExecuting}
                    className="bg-[#0066ff] hover:bg-[#0052cc]"
                  >
                    {isExecuting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Executando...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Executar Script
                      </>
                    )}
                  </Button>
                </div>

                {isExecuting && (
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Loader2 className="h-5 w-5 mr-2 animate-spin text-[#0066ff]" />
                      <span>Executando script, por favor aguarde...</span>
                    </div>
                  </div>
                )}

                {result && (
                  <div
                    className={`p-4 border rounded-lg ${
                      result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-start">
                      {result.success ? (
                        <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                      )}
                      <div>
                        <h4 className={`font-medium ${result.success ? "text-green-800" : "text-red-800"}`}>
                          {result.message}
                        </h4>

                        {result.success && result.data && (
                          <div className="mt-2 text-sm">
                            {scriptType === "sql" && (
                              <p>
                                Linhas afetadas: {result.data.rowsAffected} • Tempo de execução: {result.data.duration}
                              </p>
                            )}

                            {scriptType === "js" && (
                              <div>
                                <p className="font-medium mb-1">Saída:</p>
                                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                                  {result.data.output}
                                </pre>
                                <p className="mt-1">Tempo de execução: {result.data.duration}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {!result.success && result.error && <p className="mt-1 text-sm text-red-700">{result.error}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scripts Salvos</CardTitle>
              <CardDescription>Acesse e gerencie seus scripts salvos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Input placeholder="Pesquisar scripts..." className="max-w-sm" />
                  <Button className="bg-[#0066ff] hover:bg-[#0052cc]">
                    <Code className="h-4 w-4 mr-2" />
                    Novo Script
                  </Button>
                </div>

                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Nome</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Tipo</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Última Execução</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Criado por</th>
                        <th className="text-right p-3 text-sm font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">
                          <div className="font-medium">Atualizar Status de Posts</div>
                          <div className="text-sm text-gray-500">Arquiva posts antigos</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">SQL</span>
                        </td>
                        <td className="p-3 text-sm">15/05/2023 14:30</td>
                        <td className="p-3 text-sm">admin@strateup.com</td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">
                          <div className="font-medium">Enviar Emails de Reengajamento</div>
                          <div className="text-sm text-gray-500">Para usuários inativos</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            JavaScript
                          </span>
                        </td>
                        <td className="p-3 text-sm">10/05/2023 09:15</td>
                        <td className="p-3 text-sm">admin@strateup.com</td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">
                          <div className="font-medium">Limpar Dados Temporários</div>
                          <div className="text-sm text-gray-500">Remove dados de cache</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">SQL</span>
                        </td>
                        <td className="p-3 text-sm">05/05/2023 16:45</td>
                        <td className="p-3 text-sm">admin@strateup.com</td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Execuções</CardTitle>
              <CardDescription>Visualize o histórico de scripts executados e seus resultados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Input placeholder="Pesquisar no histórico..." className="max-w-sm" />
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="success">Sucesso</SelectItem>
                        <SelectItem value="error">Erro</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Script</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Tipo</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Data/Hora</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Usuário</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-right p-3 text-sm font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">
                          <div className="font-medium">Atualizar Status de Posts</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">SQL</span>
                        </td>
                        <td className="p-3 text-sm">15/05/2023 14:30</td>
                        <td className="p-3 text-sm">admin@strateup.com</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Sucesso</span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Play className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">
                          <div className="font-medium">Enviar Emails de Reengajamento</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            JavaScript
                          </span>
                        </td>
                        <td className="p-3 text-sm">10/05/2023 09:15</td>
                        <td className="p-3 text-sm">admin@strateup.com</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Sucesso</span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Play className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">
                          <div className="font-medium">Migrar Dados de Usuários</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">SQL</span>
                        </td>
                        <td className="p-3 text-sm">08/05/2023 11:20</td>
                        <td className="p-3 text-sm">admin@strateup.com</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Erro</span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Play className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3">
                          <div className="font-medium">Limpar Dados Temporários</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">SQL</span>
                        </td>
                        <td className="p-3 text-sm">05/05/2023 16:45</td>
                        <td className="p-3 text-sm">admin@strateup.com</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Sucesso</span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Play className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
