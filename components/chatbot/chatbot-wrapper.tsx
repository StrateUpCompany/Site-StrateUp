// /components/chatbot/chatbot-wrapper.tsx
'use client'

import dynamic from "next/dynamic"

// Carrega o ChatbotSDR dinamicamente, apenas no client-side
const ChatbotSDR = dynamic(() => import("./chatbot-sdr"), {
  ssr: false, // Desabilita Server-Side Rendering para este componente
})

// Tipo mais preciso para leadType
export type LeadType = "frio" | "morno" | "quente";

interface ChatbotWrapperProps {
  leadType: LeadType; // Usando o tipo definido
  // TODO-STRATEUP: Considerar passar userInfo também, se necessário no wrapper
}

export default function ChatbotWrapper({ leadType }: ChatbotWrapperProps) {
  // Renderiza o ChatbotSDR, passando o leadType
  return <ChatbotSDR leadType={leadType} />
}