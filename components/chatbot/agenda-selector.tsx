// /components/chatbot/agenda-selector.tsx
"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button" // Shadcn Button
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Shadcn Select
import { Label } from "@/components/ui/label" // Shadcn Label
import { cn } from "@/lib/utils" // Utilitário para classes condicionais

interface AgendaSelectorProps {
  onSelect: (data: string, horario: string) => void
}

// Função auxiliar para gerar datas disponíveis (mantida)
function generateAvailableDates() {
  const dates = []
  const today = new Date()
  let daysAdded = 0
  let businessDaysCount = 0

  while (businessDaysCount < 5) {
    const date = new Date(today)
    date.setDate(today.getDate() + daysAdded)

    if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
      const formattedDate = date.toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' })
      const dayName = date.toLocaleDateString("pt-BR", { weekday: "long" })
      dates.push({
        value: formattedDate,
        label: `${formattedDate} (${dayName.charAt(0).toUpperCase() + dayName.slice(1)})`,
      })
      businessDaysCount++;
    }
    daysAdded++
  }
  return dates
}

export default function AgendaSelector({ onSelect }: AgendaSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")

  const availableDates = generateAvailableDates()
  const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (selectedDate && selectedTime) {
      onSelect(selectedDate, selectedTime)
    }
  }

  return (
    <div className="w-full space-y-4 p-1"> {/* Adicionado p-1 para respiro */}
      <h3 className="text-lg font-montserrat font-semibold text-foreground mb-3"> {/* Usando font-montserrat StrateUp */}
        Selecione uma data e horário
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="agenda-date" className="text-sm font-medium mb-1 text-foreground">Data</Label> {/* Usando Label StrateUp */}
          <Select
            value={selectedDate}
            onValueChange={setSelectedDate}
            required
            name="agenda-date"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma data" />
            </SelectTrigger>
            <SelectContent>
              {availableDates.map((date) => (
                <SelectItem key={date.value} value={date.value}>
                  {date.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="agenda-time" className="text-sm font-medium mb-1 text-foreground">Horário</Label> {/* Usando Label StrateUp */}
          <Select
            value={selectedTime}
            onValueChange={setSelectedTime}
            required
            disabled={!selectedDate}
            name="agenda-time"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um horário" />
            </SelectTrigger>
            <SelectContent>
              {availableTimes.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={!selectedDate || !selectedTime}
          className="w-full font-montserrat" // Usando Shadcn Button e fonte StrateUp
          variant="default" // Usa a cor primary (StrateUp Blue)
        >
          Confirmar
        </Button>
      </form>
    </div>
  )
}