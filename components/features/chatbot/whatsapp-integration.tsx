// /components/chatbot/whatsapp-integration.tsx
"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button" // Shadcn Button
import { Input } from "@/components/ui/input"   // Shadcn Input
import { Label } from "@/components/ui/label"   // Shadcn Label
import { cn } from "@/core/utils"

interface WhatsAppIntegrationProps {
  onConfirm: (whatsapp: string) => void
  error: string | null
}

export default function WhatsAppIntegration({ onConfirm, error }: WhatsAppIntegrationProps) {
  const [whatsapp, setWhatsapp] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(true)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!whatsapp || whatsapp.replace(/\D/g, '').length < 10) { // Validação mais robusta
      setIsValid(false)
      return
    }
    onConfirm(whatsapp)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setWhatsapp(value)
    setIsValid(value.replace(/\D/g, '').length >= 10)
  }

  return (
    <div className="w-full space-y-4 p-1"> {/* Adicionado p-1 para respiro */}
      <h3 className="text-lg font-montserrat font-semibold text-foreground mb-3"> {/* Usando font-montserrat StrateUp */}
        Confirme seu WhatsApp
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="whatsapp-number" className="text-sm font-medium mb-1 text-foreground">WhatsApp com DDD</Label> {/* Usando Label StrateUp */}
          <Input
            type="tel"
            id="whatsapp-number"
            value={whatsapp}
            onChange={handleChange}
            placeholder="(11) 99999-9999"
            className={cn(!isValid && "border-destructive focus-visible:ring-destructive")} // Estilo de erro com cor destructive
            required
          />
          {!isValid && <p className="text-sm text-destructive mt-1">Por favor, insira um número válido com DDD.</p>}
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>

        <Button
          type="submit"
          className="w-full font-montserrat" // Usando Shadcn Button e fonte StrateUp
          variant="default" // Usa a cor primary (StrateUp Blue)
          disabled={!isValid || !whatsapp}
        >
          Confirmar
        </Button>
      </form>
    </div>
  )
}