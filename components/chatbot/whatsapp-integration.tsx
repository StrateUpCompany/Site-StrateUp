"use client"

import type React from "react"

import { useState } from "react"

interface WhatsAppIntegrationProps {
  onConfirm: (whatsapp: string) => void
  error: string | null
}

export default function WhatsAppIntegration({ onConfirm, error }: WhatsAppIntegrationProps) {
  const [whatsapp, setWhatsapp] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(true)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Basic validation
    if (!whatsapp || whatsapp.length < 10) {
      setIsValid(false)
      return
    }

    onConfirm(whatsapp)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setWhatsapp(value)
    setIsValid(value.length >= 10)
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-3">Confirme seu WhatsApp</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">WhatsApp com DDD</label>
          <input
            type="tel"
            value={whatsapp}
            onChange={handleChange}
            placeholder="(11) 99999-9999"
            className={`w-full p-2 border rounded-md ${!isValid ? "border-red-500" : "border-gray-300"}`}
            required
          />
          {!isValid && <p className="text-red-500 text-sm mt-1">Por favor, insira um número válido com DDD</p>}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Confirmar
        </button>
      </form>
    </div>
  )
}
