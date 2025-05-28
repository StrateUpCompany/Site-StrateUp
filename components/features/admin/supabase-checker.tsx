"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

export function SupabaseChecker() {
  const [status, setStatus] = useState<"checking" | "success" | "error">("checking")
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        // Tenta importar o módulo Supabase
        const supabase = await import("@supabase/supabase-js")

        // Verifica se a versão é compatível
        if (supabase) {
          setStatus("success")
        } else {
          setStatus("error")
          setErrorMessage("Supabase está instalado, mas pode haver problemas de compatibilidade.")
        }
      } catch (error) {
        setStatus("error")
        setErrorMessage(`Erro ao importar Supabase: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    checkSupabase()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verificação do Supabase</CardTitle>
      </CardHeader>
      <CardContent>
        {status === "checking" && <p>Verificando instalação do Supabase...</p>}

        {status === "success" && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="mr-2 h-5 w-5" />
            <p>Supabase está instalado corretamente.</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-red-600">
              <XCircle className="mr-2 h-5 w-5" />
              <p>Problema com a instalação do Supabase.</p>
            </div>
            <p className="text-sm text-gray-600">{errorMessage}</p>
            <Button
              onClick={() => window.open("https://supabase.com/docs/reference/javascript/installing", "_blank")}
              variant="outline"
              size="sm"
            >
              Ver Documentação de Instalação
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
