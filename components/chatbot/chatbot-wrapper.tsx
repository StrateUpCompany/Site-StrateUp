'use client'

import dynamic from "next/dynamic"

const ChatbotSDR = dynamic(() => import("./chatbot-sdr"), {
  ssr: false,
})

interface ChatbotWrapperProps {
  leadType: string
}

export default function ChatbotWrapper({ leadType }: ChatbotWrapperProps) {
  return <ChatbotSDR leadType={leadType} />
} 