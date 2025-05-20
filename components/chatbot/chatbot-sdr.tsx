"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, Sparkles, User } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "bot" | "user"
  options?: string[]
}

interface ChatbotSDRProps {
  leadType?: "frio" | "morno" | "quente"
  userInfo?: {
    nome?: string
    email?: string
    whatsapp?: string
  }
}

export default function ChatbotSDR({ leadType = "frio", userInfo = {} }: ChatbotSDRProps) {
  // Estados simplificados
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isButtonAnimating, setIsButtonAnimating] = useState<boolean>(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Efeito para abrir o chatbot após um tempo
  useEffect(() => {
    const popupTiming = leadType === "quente" ? 15000 : leadType === "morno" ? 20000 : 27000
    const animationTiming = popupTiming - 2000

    const animationTimer = setTimeout(() => {
      setIsButtonAnimating(true)
    }, animationTiming)

    const openTimer = setTimeout(() => {
      setIsOpen(true)
      setIsButtonAnimating(false)
    }, popupTiming)

    return () => {
      clearTimeout(animationTimer)
      clearTimeout(openTimer)
    }
  }, [leadType])

  // Inicializar o chatbot com mensagem de boas-vindas
  useEffect(() => {
    const initialMessage: Message = {
      id: 1,
      text: getWelcomeMessage(),
      sender: "bot",
      options: getInitialOptions(),
    }

    setMessages([initialMessage])
  }, [leadType])

  // Mensagens de boas-vindas baseadas no tipo de lead
  const getWelcomeMessage = (): string => {
    switch (leadType) {
      case "quente":
        return "Olá! Sou o especialista em estratégias digitais da StrateUp. Como posso ajudar você hoje?"
      case "morno":
        return "Olá! Sou consultor estratégico da StrateUp. Como posso ajudar você hoje?"
      default:
        return "Olá! Sou consultor de crescimento da StrateUp. Como posso ajudar você hoje?"
    }
  }

  // Opções iniciais baseadas no tipo de lead
  const getInitialOptions = (): string[] => {
    switch (leadType) {
      case "quente":
        return ["Quero escalar meus resultados", "Me mostre cases de sucesso", "Vamos agendar uma consultoria"]
      case "morno":
        return [
          "Como funciona sua metodologia?",
          "Quais resultados posso esperar?",
          "Quero um diagnóstico personalizado",
        ]
      default:
        return [
          "Estou com desafios para converter",
          "Quero entender como vocês trabalham",
          "Como a StrateUp é diferente?",
        ]
    }
  }

  // Rolar para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Adicionar mensagem do usuário
  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: "user",
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsLoading(true)

    // Processar resposta do bot após um pequeno atraso
    setTimeout(() => {
      processMessage(text)
      setIsLoading(false)
    }, 1200)
  }

  // Adicionar mensagem do bot
  const addBotMessage = (text: string, options?: string[]) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: "bot",
      options,
    }

    setMessages((prev) => [...prev, newMessage])
  }

  // Processar mensagem do usuário
  const processMessage = (message: string) => {
    // Respostas simplificadas baseadas em palavras-chave
    if (message.includes("agendar") || message.includes("consultoria") || message.includes("reunião")) {
      addBotMessage(
        "Ótimo! Para agendar uma consultoria, por favor entre em contato pelo nosso WhatsApp: (11) 99999-9999",
        ["Entendi, obrigado!", "Prefiro mais informações antes"],
      )
    } else if (
      message.includes("metodologia") ||
      message.includes("como funciona") ||
      message.includes("como vocês trabalham")
    ) {
      addBotMessage(
        "Nossa metodologia Value-First foi desenvolvida para maximizar resultados em 4 etapas: Diagnóstico, Estratégia, Implementação e Growth Tracking. Quer saber mais?",
        ["Sim, me conte mais", "Quais resultados posso esperar?", "Vamos agendar uma conversa"],
      )
    } else if (message.includes("resultado") || message.includes("case") || message.includes("sucesso")) {
      addBotMessage(
        "Nossos clientes conquistam em média: aumento de 43% nas conversões em 60 dias, redução de 27% no CAC após 90 dias e crescimento de 65% no tráfego orgânico em 4 meses. Quer ver cases específicos?",
        ["Sim, quero ver cases", "Como isso se aplica ao meu negócio?", "Vamos agendar uma conversa"],
      )
    } else {
      // Resposta genérica
      addBotMessage(
        "Entendi sua questão. Para oferecer a melhor orientação, seria valioso entender melhor seu negócio. Posso agendar uma consultoria gratuita para discutirmos suas necessidades específicas?",
        ["Sim, vamos agendar", "Tenho mais perguntas", "Não, obrigado"],
      )
    }
  }

  // Lidar com envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (inputValue.trim()) {
      addUserMessage(inputValue.trim())
    }
  }

  // Lidar com clique em opção
  const handleOptionClick = (option: string) => {
    addUserMessage(option)
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Botão do chatbot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 ${
          isButtonAnimating ? "animate-pulse scale-110" : ""
        }`}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </button>

      {/* Interface do chatbot */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden w-[350px] max-w-full mb-4 border border-gray-200 transition-all duration-300 ease-in-out">
          {/* Cabeçalho */}
          <div className="bg-blue-600 p-4 flex items-center">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-3">
              <User size={20} className="text-blue-600" />
            </div>
            <h2 className="text-white font-semibold text-lg">StrateUp Consultoria</h2>
          </div>

          {/* Mensagens */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`${msg.sender === "bot" ? "bg-white" : "bg-blue-600 text-white"} p-3 rounded-lg max-w-[80%] shadow-sm`}
                >
                  <p>{msg.text}</p>

                  {/* Opções de resposta */}
                  {msg.sender === "bot" && msg.options && (
                    <div className="mt-2 space-y-2">
                      {msg.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left text-sm bg-gray-100 hover:bg-gray-200 p-2 rounded transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escreva sua mensagem..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                aria-label="Enviar mensagem"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
