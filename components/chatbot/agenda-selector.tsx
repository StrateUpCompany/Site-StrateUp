"use client"

import type React from "react"

import { useState } from "react"

interface AgendaSelectorProps {
  onSelect: (data: string, horario: string) => void
}

export default function AgendaSelector({ onSelect }: AgendaSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")

  // Generate available dates (next 5 business days)
  const availableDates = generateAvailableDates()

  // Generate available times
  const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (selectedDate && selectedTime) {
      onSelect(selectedDate, selectedTime)
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-3">Selecione uma data e horário</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Data</label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecione uma data</option>
            {availableDates.map((date) => (
              <option key={date.value} value={date.value}>
                {date.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Horário</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            disabled={!selectedDate}
          >
            <option value="">Selecione um horário</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!selectedDate || !selectedTime}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          Confirmar
        </button>
      </form>
    </div>
  )
}

// Helper function to generate available dates
function generateAvailableDates() {
  const dates = []
  const today = new Date()
  let daysAdded = 0

  while (dates.length < 5) {
    const date = new Date(today)
    date.setDate(today.getDate() + daysAdded)

    // Skip weekends
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      const formattedDate = date.toLocaleDateString("pt-BR")
      const dayName = date.toLocaleDateString("pt-BR", { weekday: "long" })

      dates.push({
        value: formattedDate,
        label: `${formattedDate} (${dayName})`,
      })
    }

    daysAdded++
  }

  return dates
}
