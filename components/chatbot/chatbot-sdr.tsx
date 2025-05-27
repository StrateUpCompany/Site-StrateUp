// /components/chatbot/chatbot-sdr.tsx - IMPORTAÇÃO DO REACT CORRIGIDA E AJUSTES MENORES
"use client"

// AQUI ESTÁ A CORREÇÃO PRINCIPAL DA IMPORTAÇÃO:
import React, { useState, useRef, useEffect, useCallback, useReducer, createContext, useContext } from "react";

import { Send, X, Sparkles, User, MessageSquareText, CheckCircle2, Clock, Loader2 } from "lucide-react"; // Loader2 estava sendo usado mas não importado
import { cn } from "@/lib/utils";
import type { LeadType } from "./chatbot-wrapper";

// ===== TYPES & INTERFACES =====
interface Message {
  id: string;
  text: string | React.ReactNode;
  sender: "bot" | "user";
  timestamp: Date;
  options?: QuickOption[];
  isTyping?: boolean;
  metadata?: {
    leadScore?: number;
    intent?: string;
    confidence?: number;
  };
}

interface QuickOption {
  id: string;
  text: string;
  action: string; // Essencial para mapear para as respostas no ConversationFlow
  priority?: 'high' | 'medium' | 'low';
}

interface ChatState {
  isOpen: boolean;
  messages: Message[];
  inputValue: string;
  isLoading: boolean;
  isButtonAnimating: boolean;
  currentFlow: LeadType | string; // Permitir fluxos nomeados além de LeadType
  leadScore: number;
  userProfile: UserProfile;
}

interface UserProfile {
  nome?: string;
  email?: string;
  whatsapp?: string;
  interactions: number;
  lastSeen?: Date;
  interests: string[];
}

interface ChatbotSDRProps {
  leadType?: LeadType;
  userInfo?: Partial<UserProfile>;
  onLeadConversion?: (data: any) => void;
  customFlows?: Record<string, ConversationFlow>;
  apiEndpoint?: string;
}

interface ConversationFlow {
  welcome: string;
  options: QuickOption[];
  responses: Record<string, FlowResponse>; // A chave aqui DEVE ser a 'action' da QuickOption
}

interface FlowResponse {
  text: string;
  options?: QuickOption[];
  nextFlow?: string;
  leadScoreImpact?: number;
}

// ===== CHAT CONTEXT =====
type ChatAction =
  | { type: 'TOGGLE_CHAT' }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_BUTTON_ANIMATION'; payload: boolean }
  | { type: 'UPDATE_LEAD_SCORE'; payload: number }
  | { type: 'SET_FLOW'; payload: string }
  | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'INITIALIZE_CHAT'; payload: { messages: Message[], leadScore: number, currentFlow: LeadType | string }};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'TOGGLE_CHAT':
      return { ...state, isOpen: !state.isOpen, isButtonAnimating: false };
    case 'ADD_MESSAGE':
      // Lógica para evitar duplicar a mensagem do bot se ela já existe com '-no-options'
      // ou para substituir a mensagem do bot que tinha opções pela nova sem opções.
      let updatedMessages = state.messages.filter(msg => {
        if (action.payload.id.endsWith('-no-options')) {
          // Se a nova mensagem é a versão "-no-options", remove a original com opções.
          return msg.id !== action.payload.id.replace('-no-options', '');
        }
        return true;
      });
      updatedMessages = [...updatedMessages, action.payload];

      return {
        ...state,
        messages: updatedMessages,
        userProfile: {
          ...state.userProfile,
          interactions: (state.userProfile.interactions || 0) + 1,
          lastSeen: new Date()
        }
      };
    case 'SET_INPUT':
      return { ...state, inputValue: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_BUTTON_ANIMATION':
      return { ...state, isButtonAnimating: action.payload };
    case 'UPDATE_LEAD_SCORE':
      return {
        ...state,
        leadScore: Math.min(100, Math.max(0, (state.leadScore || 0) + action.payload))
      };
    case 'SET_FLOW':
      return { ...state, currentFlow: action.payload };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        userProfile: { ...state.userProfile, ...action.payload }
      };
    case 'INITIALIZE_CHAT':
        return {
            ...state,
            messages: action.payload.messages,
            leadScore: action.payload.leadScore,
            currentFlow: action.payload.currentFlow,
            isLoading: false,
        };
    default:
      return state;
  }
};

const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
} | null>(null);

// ===== CUSTOM HOOKS =====
const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext deve ser usado dentro de um ChatProvider');
  }
  return context;
};

const useMessageProcessor = (initialLeadType: LeadType, customFlowsProp?: Record<string, ConversationFlow>) => {
  const { state, dispatch } = useChatContext();

  const defaultFlows: Record<LeadType | string, ConversationFlow> = {
    quente: {
        welcome: `🔥 Olá${state.userProfile.nome ? `, ${state.userProfile.nome}` : ""}! Sou seu especialista StrateUp. Vejo um potencial incrível aqui! Como posso te ajudar a escalar seus resultados AGORA? 🚀`,
        options: [
            { id: "q_scale", text: "🚀 Quero escalar meus resultados AGORA!", action: "scale_results", priority: "high" },
            { id: "q_cases", text: "📊 Me mostre cases de SUCESSO no meu nicho.", action: "show_cases", priority: "high" },
            { id: "q_consult", text: "📅 Agendar consultoria estratégica GRATUITA.", action: "schedule_consultation", priority: "high" }
        ],
        responses: {
            scale_results: {
                text: "Perfeito! Nossos clientes PME (como o seu!) costumam ver um aumento de 30-70% no faturamento e redução de até 40% no CAC em 6 meses. Com sua temperatura de lead, tenho um plano de ação rápido. Quer conhecer nossa metodologia F.O.C.O.?",
                options: [ { id: "q_s_method", text: "✨ Sim, sobre a metodologia F.O.C.O.", action: "explain_methodology", priority: "high" }, { id: "q_s_consult", text: "🎯 Agendar agora a consultoria!", action: "schedule_consultation", priority: "high" }],
                leadScoreImpact: 15,
                nextFlow: "quente_methodology_discussion"
            },
            show_cases: {
                text: "🏆 Com certeza! Para PMEs como a sua, temos cases de sucesso em [Nicho 1], [Nicho 2] e [Nicho 3], com aumentos de até 347% em conversões e ROI de 8.5x. Qual desses nichos mais te interessa para detalharmos?",
                options: [ { id: "q_c_nicho1", text: "[Nicho 1]", action: "case_nicho1" }, { id: "q_c_nicho2", text: "[Nicho 2]", action: "case_nicho2" }, { id: "q_c_outro", text: "Outro/Geral", action: "case_general" } ],
                leadScoreImpact: 10
            },
            schedule_consultation: {
                text: "Excelente decisão! Nossa consultoria estratégica gratuita é o primeiro passo para desbloquear seu crescimento. Para agilizar, qual seu melhor email para contato e o principal desafio que gostaria de resolver?",
                options: [{id: "back_main_q", text: "Voltar às opções", action: "main_options"}],
                nextFlow: "collecting_info_schedule",
                leadScoreImpact: 25
            },
            // Fallback para 'quente'
            fallback: {
                text: "Entendi. Para te ajudar de forma precisa, qual destes tópicos sobre escalar resultados te interessa mais agora?",
                options: [
                    { id: "q_scale", text: "🚀 Escalar resultados", action: "scale_results", priority: "high" },
                    { id: "q_cases", text: "📊 Cases de sucesso", action: "show_cases", priority: "high" },
                    { id: "q_consult", text: "📅 Agendar consultoria", action: "schedule_consultation", priority: "high" }
                ],
            }
        }
    },
    morno: {
        welcome: `👋 Olá${state.userProfile.nome ? `, ${state.userProfile.nome}` : ""}! Da StrateUp aqui. Percebi seu interesse em crescimento e otimização. Qual seu maior desafio digital hoje? 🤔`,
        options: [
            { id: "m_methodology", text: "🔍 Como funciona a metodologia StrateUp?", action: "explain_methodology", priority: "medium" },
            { id: "m_results", text: "📈 Que tipo de resultados posso esperar?", action: "show_results", priority: "medium" },
            { id: "m_diagnosis", text: "🎯 Quero um diagnóstico digital GRATUITO.", action: "free_diagnosis", priority: "high" }
        ],
        responses: {
            explain_methodology: {
                text: "Nossa metodologia F.O.C.O. (Fórmula Organizacional para Crescimento Otimizado) é um framework de 4 etapas: 1️⃣ Diagnóstico Profundo, 2️⃣ Estratégia Personalizada, 3️⃣ Implementação Ágil e 4️⃣ Otimização Contínua (Kaizen Digital). Foco em RESULTADOS MENSURÁVEIS! Quer saber mais sobre alguma etapa?",
                options: [ { id: "m_em_diagnosis", text: "🔬 Sobre o Diagnóstico", action: "free_diagnosis" }, { id: "m_em_cases", text: "📊 Ver Cases de Resultados", action: "show_results" }],
                leadScoreImpact: 8
            },
            show_results: {
                text: "Nossos clientes PME costumam ver um aumento de 30-70% no faturamento e redução de até 40% no CAC em 6 meses. Quer um diagnóstico para ver como isso se aplicaria a você?",
                options: [{id: "m_sr_diagnosis", text: "Sim, quero o diagnóstico", action: "free_diagnosis"}, {id: "m_sr_method", text: "Mais sobre a metodologia", action: "explain_methodology"}],
                leadScoreImpact: 10
            },
            free_diagnosis: {
                text: "Ótima escolha! Nosso Diagnóstico Digital Gratuito de 5 minutos analisa seus pontos fortes e fracos, entregando um plano de ação personalizado. Vamos começar? Link: /diagnostico (ou posso fazer as perguntas aqui mesmo!)",
                // TODO-STRATEUP: Implementar fluxo de perguntas do diagnóstico aqui ou direcionar.
                options: [{id: "m_fd_start", text: "Começar perguntas aqui", action: "start_diag_questions"}, {id: "m_fd_link", text: "Ir para a página do diagnóstico", action: "redirect_diag_page"}],
                leadScoreImpact: 20
            },
             fallback: {
                text: "Entendi. Para te ajudar melhor, qual destes tópicos sobre crescimento digital te interessa mais agora?",
                options: [
                    { id: "m_methodology", text: "🔍 Como funciona sua metodologia?", action: "explain_methodology", priority: "medium" },
                    { id: "m_results", text: "📈 Quais resultados posso esperar?", action: "show_results", priority: "medium" },
                    { id: "m_diagnosis", text: "🎯 Quero um diagnóstico personalizado", action: "free_diagnosis", priority: "high" }
                ],
            }
        }
    },
    frio: {
        welcome: `💡 Olá${state.userProfile.nome ? `, ${state.userProfile.nome}` : ""}! Bem-vindo à StrateUp! Sou seu consultor de crescimento. Qual o principal obstáculo que te impede de faturar mais hoje?`,
        options: [
            { id: "f_convert", text: "😥 Estou com desafios para converter leads.", action: "conversion_help", priority: "medium" },
            { id: "f_understand", text: "🤔 Como a StrateUp pode me ajudar?", action: "explain_work", priority: "low" },
            { id: "f_different", text: "❓ Qual o diferencial da StrateUp?", action: "show_diferential", priority: "medium" }
        ],
        responses: {
            conversion_help: {
                text: "Entendo perfeitamente! Desafios de conversão são comuns. Normalmente, focamos em 3 áreas chave: 🎯 Posicionamento da Oferta, 📱 Experiência do Usuário no Funil, e 📊 Qualificação dos Leads. Quer um diagnóstico rápido e gratuito para identificar seus pontos de melhoria?",
                options: [ { id: "f_ch_diag", text: "✅ Sim, quero o diagnóstico gratuito!", action: "free_diagnosis", priority: "high" }, { id: "f_ch_moreinfo", text: "📋 Quero mais informações primeiro", action: "more_information", priority: "low" } ],
                leadScoreImpact: 5
            },
            explain_work: {
                text: "A StrateUp funciona como seu Growth Advisor particular! Analisamos seu negócio, definimos uma estratégia clara com funis de venda e automações, e acompanhamos os resultados para otimizar continuamente. Quer um exemplo prático?",
                options: [{id: "f_ew_example", text: "Sim, um exemplo prático", action: "show_example_work"}, {id: "f_ew_differential", text: "Qual o diferencial?", action: "show_diferential"}],
                leadScoreImpact: 3
            },
            show_diferential: {
                text: "Nosso diferencial é o F.O.C.O. em Resultados Mensuráveis e a aplicação de um Framework Comprovado. Não vendemos 'serviços de marketing', entregamos CRESCIMENTO para PMEs que faturam acima de R$100k/mês e querem escalar. Transparência total e parceria real!",
                options: [{id: "f_sd_method", text: "Fale mais da metodologia", action: "explain_methodology"}, {id: "f_sd_diag", text: "Quero o diagnóstico", action: "free_diagnosis"}],
                leadScoreImpact: 7
            },
            fallback: {
                text: "Compreendo. Para que eu possa te direcionar melhor, qual sua maior dúvida ou desafio neste momento em relação ao crescimento do seu negócio?",
                options: [
                    { id: "f_convert", text: "😥 Desafios para converter leads.", action: "conversion_help", priority: "medium" },
                    { id: "f_understand", text: "🤔 Como a StrateUp pode me ajudar?", action: "explain_work", priority: "low" },
                    { id: "f_different", text: "❓ Qual o diferencial da StrateUp?", action: "show_diferential", priority: "medium" }
                ],
            }
        }
    },
    collecting_info_schedule: { /* ... (seu fluxo collecting_info_schedule aqui) ... */
        welcome: "Para confirmar seu agendamento, por favor, informe seu melhor email e o principal desafio que gostaria de discutir.",
        options: [], // Input livre
        responses: {
            "user_provides_info": { // Supondo que você tenha uma forma de detectar essa ação
                text: "Obrigado! Recebemos suas informações. Nossa equipe entrará em contato em breve para confirmar os detalhes do agendamento. Algo mais em que posso ajudar?",
                options: [{id: "back_to_main_final", text: "Não, obrigado!", action: "end_chat"}],
                nextFlow: initialLeadType, // Volta ao fluxo inicial
                leadScoreImpact: 30
            }
        }
    }
  };

  const flows = { ...defaultFlows, ...customFlowsProp };

  const processMessage = useCallback(async (userMessageText: string, selectedOptionAction?: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    const currentFlowKey = state.currentFlow as keyof typeof flows;
    const leadTypeFlowKey = initialLeadType as keyof typeof flows; // Use initialLeadType para o fluxo base
    const activeFlow = flows[currentFlowKey] || flows[leadTypeFlowKey];

    let responseText = "Desculpe, não captei bem. Poderia tentar de outra forma ou escolher uma das opções?";
    let responseOptions: QuickOption[] = activeFlow?.options || getInitialOptions(initialLeadType);
    let leadScoreDelta = 0;
    let nextFlowOverride = state.currentFlow;
    let intentDetected = 'general_fallback';
    let confidenceLvl = 0; // Para o metadata da mensagem do bot

    // 1. Se uma ação de opção foi explicitamente passada (clique no botão)
    if (selectedOptionAction && activeFlow?.responses && activeFlow.responses[selectedOptionAction]) {
      const flowActionResponse = activeFlow.responses[selectedOptionAction];
      responseText = flowActionResponse.text;
      responseOptions = flowActionResponse.options || [];
      leadScoreDelta = flowActionResponse.leadScoreImpact || 0;
      nextFlowOverride = flowActionResponse.nextFlow || nextFlowOverride;
      intentDetected = selectedOptionAction;
      confidenceLvl = 1; // Ação explícita tem confiança máxima
    } else {
      // 2. Se não foi uma ação de opção, tenta análise de intenção no texto livre
      const messageWords = userMessageText.toLowerCase();
      const intentPatterns = {
        // Patterns mais específicos e com prioridade
        schedule_consultation_strong: /\b(quero|preciso|vamos|gostaria de|necessito)\s+(agendar|marcar|uma|minha)\s+(consultoria|reunião|conversa|call)\b/i,
        free_diagnosis_strong: /\b(quero|preciso|gostaria de|fazer|iniciar)\s+(o|meu)?\s*(diagnóstico|teste|avaliação|analise)\s+(gratuito|grátis|digital|online|personalizado)?\b/i,
        // Patterns mais gerais
        scheduling: /\b(agendar|reunião|conversar|call|consultoria|horário|disponibilidade|marcar)\b/i,
        methodology: /\b(metodologia|como funciona|processo|etapas|trabalham|value-first|foco)\b/i,
        results: /\b(resultado|case|sucesso|crescimento|conversão|aumento|roi|números|prova social)\b/i,
        pricing: /\b(preço|valor|investimento|custo|quanto custa)\b/i,
        diagnosis: /\b(diagnóstico|analisar|avaliação)\b/i,
        contact_whatsapp: /\b(whatsapp|zap)\b/i,
        problem_conversion: /\b(converter|conversão|vender|vendas|leads)\s+(ruim|baixo|pouco|difícil|desafio|problema)\b/i,
        understand_work: /\b(entender|saber|conhecer)\s+(como|vocês|strateup|trabalham|funciona|ajuda)\b/i,
        show_differential: /\b(diferencial|diferente|porque|por que)\s+(strateup|vocês)\b/i,
        urgency: /\b(urgente|rápido|agora|hoje|imediato|já)\b/i,
      };

      let maxConfidence = 0;
      for (const [intent, pattern] of Object.entries(intentPatterns)) {
        const matches = messageWords.match(pattern);
        if (matches && matches.length > maxConfidence) {
          intentDetected = intent.replace('_strong', ''); // Normaliza se for _strong
          maxConfidence = matches.length + (intent.includes('_strong') ? 2 : 0); // Dá um peso maior para _strong
        }
      }
      confidenceLvl = maxConfidence;


      // Busca a resposta no fluxo ATIVO (currentFlow ou leadTypeFlow)
      // A 'action' para buscar em `activeFlow.responses` deve ser a `intentDetected`
      if (activeFlow?.responses && activeFlow.responses[intentDetected]) {
        const flowIntentResponse = activeFlow.responses[intentDetected];
        responseText = flowIntentResponse.text;
        responseOptions = flowIntentResponse.options || activeFlow.options || [];
        leadScoreDelta = flowIntentResponse.leadScoreImpact || 0;
        nextFlowOverride = flowIntentResponse.nextFlow || nextFlowOverride;
      } else {
        // Fallback se a intenção detectada não tiver resposta direta no fluxo atual
        // Pode usar um fluxo de fallback genérico ou as opções do fluxo atual
        const fallbackFlow = flows['fallback_general'] || activeFlow; // Supondo um 'fallback_general'
        if (fallbackFlow?.responses && fallbackFlow.responses['fallback_action']) { // Supondo uma 'fallback_action'
             const fallbackActionResponse = fallbackFlow.responses['fallback_action'];
             responseText = fallbackActionResponse.text;
             responseOptions = fallbackActionResponse.options || fallbackFlow.options || [];
        } else {
            responseText = "Entendi. Para te ajudar melhor, qual dos tópicos abaixo mais te interessa agora ou qual sua principal dúvida?";
            responseOptions = activeFlow?.options || getInitialOptions(initialLeadType);
        }
        leadScoreDelta = 1; // Pequeno impacto para fallback
      }

      if (intentPatterns.urgency.test(messageWords)) {
        leadScoreDelta += 5; // Menor boost para urgência em texto livre
      }
    }

    if (nextFlowOverride !== state.currentFlow) {
      dispatch({ type: 'SET_FLOW', payload: nextFlowOverride });
    }

    const delay = 600 + Math.random() * 500;
    setTimeout(() => {
      dispatch({ type: 'UPDATE_LEAD_SCORE', payload: leadScoreDelta });
      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        options: responseOptions,
        metadata: {
          intent: intentDetected,
          confidence: confidenceLvl,
          leadScore: (state.leadScore || 0) + leadScoreDelta
        }
      };
      dispatch({ type: 'ADD_MESSAGE', payload: botMessage });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, delay);

  }, [state.currentFlow, state.leadScore, state.messages, initialLeadType, flows, dispatch]);

  return { processMessage };
};


const useTimingLogic = (initialLeadType: LeadType) => {
  const { state, dispatch } = useChatContext();

  useEffect(() => {
    const keyOpenedOnce = "chatbotOpenedOnce-" + initialLeadType; // Chave única por leadType

    if (state.isOpen || localStorage.getItem(keyOpenedOnce) === "true") {
      dispatch({ type: 'SET_BUTTON_ANIMATION', payload: false });
      return;
    }

    const timingConfig = {
      quente: { animation: 4000, open: 6000 },  // Tempos mais rápidos
      morno: { animation: 7000, open: 9000 },
      frio: { animation: 10000, open: 12000 }
    };
    const config = timingConfig[initialLeadType] || timingConfig.frio;

    let animationTimer: NodeJS.Timeout;
    let openTimer: NodeJS.Timeout;

    // Inicia a animação do botão apenas se não foi aberto e não está aberto
    animationTimer = setTimeout(() => {
      if (!localStorage.getItem(keyOpenedOnce) && !state.isOpen) {
        dispatch({ type: 'SET_BUTTON_ANIMATION', payload: true });
      }
    }, config.animation);

    // Abre o chat automaticamente apenas se não foi aberto e não está aberto
    openTimer = setTimeout(() => {
      if (!localStorage.getItem(keyOpenedOnce) && !state.isOpen) {
        dispatch({ type: 'TOGGLE_CHAT' }); // Isso vai setar isOpen para true
        // O dispatch de SET_BUTTON_ANIMATION para false e o localStorage.setItem
        // podem ser movidos para dentro do case 'TOGGLE_CHAT' no reducer,
        // para garantir que só ocorram quando o chat realmente abre.
      }
    }, config.open);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(openTimer);
    };
  }, [initialLeadType, dispatch, state.isOpen]); // Adicionado state.isOpen
};


// ===== COMPONENTS (Estilizados com Cores e Fontes StrateUp) =====
const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-3">
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
    </div>
    <span className="text-xs text-muted-foreground ml-2 font-roboto">Digitando...</span>
  </div>
);

const LeadScoreIndicator = ({ score }: { score: number }) => {
  const getScoreClasses = (currentScore: number) => {
    if (currentScore >= 70) return 'text-green-600 bg-green-100 border-green-300';
    if (currentScore >= 40) return 'text-yellow-600 bg-yellow-100 border-yellow-300';
    return 'text-muted-foreground bg-muted border-border'; // Usando cores do tema StrateUp
  };

  const getScoreLabel = (currentScore: number) => {
    if (currentScore >= 70) return 'Lead Quente 🔥';
    if (currentScore >= 40) return 'Lead Morno 🌡️';
    return 'Lead Frio ❄️';
  };

  return (
    <div className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getScoreClasses(score),
        "font-ibmplex" // Fonte StrateUp
    )}>
      <div className={cn("w-1.5 h-1.5 rounded-full mr-1.5",
        score >= 70 ? "bg-green-500" : score >= 40 ? "bg-yellow-500" : "bg-muted-foreground" // Cores StrateUp
      )}></div>
      {getScoreLabel(score)} ({score})
    </div>
  );
};

const MessageBubble = ({ message }: { message: Message }) => {
  const { dispatch } = useChatContext();
  const { processMessage } = useMessageProcessor(useChatContext().state.currentFlow as LeadType);
  const isBot = message.sender === 'bot';

  const handleOptionClickInternal = (option: QuickOption) => {
    const userMessageOnClick: Message = {
      id: Date.now().toString() + '-user-option',
      text: option.text,
      sender: 'user',
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMessageOnClick });
    
    // A mensagem do bot que continha esta opção é "atualizada" para não ter mais opções
    // Isso é feito adicionando uma nova mensagem com o mesmo conteúdo, mas sem 'options'.
    // O ideal seria um ID estável para a mensagem do bot e uma ação 'UPDATE_MESSAGE_OPTIONS'.
    // Por agora, esta abordagem remove visualmente as opções.
    const botMessageKey = message.id; // O ID da mensagem do BOT que continha as opções
    dispatch({
        type: 'ADD_MESSAGE',
        payload: {
            ...message, // Mantém texto, sender, timestamp, metadata
            id: `${botMessageKey}-options-processed-${Date.now()}`, // Novo ID para evitar conflito de chave
            options: undefined, // Remove as opções
        }
    });

    processMessage(option.text, option.action); // Passa a action da opção
  };

  return (
    <div className={cn("flex mb-3 sm:mb-4", isBot ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "p-3 sm:p-3.5 rounded-2xl max-w-[85%] shadow-md text-sm leading-relaxed font-bricolage",
          isBot
            ? "bg-card text-card-foreground border border-border rounded-br-lg"
            : "bg-primary text-primary-foreground rounded-bl-lg"
        )}
      >
        {typeof message.text === 'string' ? <p dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }} /> : message.text}

        {isBot && message.options && message.options.length > 0 && (
          <div className="mt-2.5 grid grid-cols-1 gap-2">
            {message.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClickInternal(option)}
                className={cn(
                  "w-full text-left p-2.5 rounded-lg border transition-all duration-200 transform hover:bg-opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 text-xs sm:text-sm font-bricolage",
                  option.priority === 'high'
                    ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 font-semibold"
                    : "bg-accent border-border text-accent-foreground hover:bg-accent/60"
                )}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
        <div className={cn("flex items-center mt-2 text-xs", isBot ? "text-muted-foreground" : "text-primary-foreground/80")}>
          <Clock size={11} className="mr-1" />
          <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {isBot && message.metadata?.leadScore !== undefined && (
            <>
              <span className="mx-1 opacity-50">·</span>
              <span className="font-ibmplex opacity-70">LS: {message.metadata.leadScore}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// QuickOptionButton não é mais necessário pois a lógica foi integrada em MessageBubble

const ChatHeader = () => {
  const { state, dispatch } = useChatContext();
  return (
    <div className="bg-gradient-to-r from-primary via-strateup-blue-600 to-strateup-blue-700 p-3 sm:p-4 flex items-center justify-between text-primary-foreground rounded-t-xl">
      <div className="flex items-center">
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white flex items-center justify-center mr-2.5 sm:mr-3 shadow-md">
          <Sparkles size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="font-montserrat font-semibold text-base sm:text-lg">Assistente StrateUp</h2>
          <div className="flex items-center text-primary-foreground/80 text-xs">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></div> {/* TODO-STRATEUP: Cor de status online StrateUp */}
            Online
          </div>
        </div>
      </div>
      <button onClick={() => dispatch({ type: 'TOGGLE_CHAT' })} aria-label="Fechar chat" className="text-primary-foreground hover:opacity-75 p-1.5 rounded-full hover:bg-black/10 focus-visible:ring-2 focus-visible:ring-primary-foreground">
          <X size={18}/>
      </button>
    </div>
  );
};

const MessageInput = () => {
  const { state, dispatch } = useChatContext();
  const { processMessage } = useMessageProcessor(state.currentFlow as LeadType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now().toString() + '-user',
        text: state.inputValue.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
      processMessage(state.inputValue.trim()); // Processa a mensagem
      dispatch({ type: 'SET_INPUT', payload: '' });
    }
  };

  return (
    <div className="p-3 border-t border-border bg-card rounded-b-xl">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input // Usando Input do Shadcn implicitamente se as classes são compatíveis ou Input customizado
          value={state.inputValue}
          onChange={(e) => dispatch({ type: 'SET_INPUT', payload: e.target.value })}
          placeholder="Sua dúvida aqui..."
          className="flex-1 border border-input bg-transparent text-foreground rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all font-bricolage text-sm h-10"
          disabled={state.isLoading}
          autoComplete="off"
        />
        <button // Usando Button do Shadcn implicitamente se as classes são compatíveis ou Button customizado
          type="submit"
          disabled={state.isLoading || !state.inputValue.trim()}
          className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 h-10 w-10 flex items-center justify-center"
          aria-label="Enviar mensagem"
        >
          {state.isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </form>
    </div>
  );
};

// ===== MAIN COMPONENT EXPORT =====
export default function ChatbotSDR({
  leadType = "frio",
  userInfo = {},
  onLeadConversion,
  customFlows,
  apiEndpoint
}: ChatbotSDRProps) {
  const initialState: ChatState = {
    isOpen: false,
    messages: [],
    inputValue: '',
    isLoading: false,
    isButtonAnimating: false,
    currentFlow: leadType,
    leadScore: leadType === 'quente' ? 70 : leadType === 'morno' ? 40 : 10,
    userProfile: {
      nome: userInfo.nome,
      email: userInfo.email,
      whatsapp: userInfo.whatsapp,
      interactions: 0,
      interests: [],
      lastSeen: new Date(),
    }
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inicialização do chatbot com mensagem de boas-vindas
  useEffect(() => {
    if (state.messages.length === 0) { // Garante que só roda uma vez na montagem inicial ou se as mensagens forem zeradas
      const welcomeMessageText = getWelcomeMessage(state.currentFlow as LeadType, state.userProfile.nome);
      const initialOptions = getInitialOptions(state.currentFlow as LeadType);
      const welcomeMessage: Message = {
        id: 'welcome-' + Date.now(),
        text: welcomeMessageText,
        sender: 'bot',
        timestamp: new Date(),
        options: initialOptions,
        metadata: {
          leadScore: state.leadScore,
          intent: 'welcome',
          confidence: 1
        }
      };
      dispatch({ type: 'INITIALIZE_CHAT', payload: { messages: [welcomeMessage], leadScore: state.leadScore, currentFlow: state.currentFlow } });
    }
  }, [state.currentFlow, state.userProfile.nome, state.messages.length, state.leadScore, dispatch]);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.messages]);

  useEffect(() => {
    if (state.leadScore >= 70 && onLeadConversion && state.messages.length > 1) { // Evita chamar na mensagem de boas-vindas
      // TODO-STRATEUP: Adicionar lógica para evitar chamar onLeadConversion múltiplas vezes para o mesmo lead "convertido"
      onLeadConversion({
        leadScore: state.leadScore,
        userProfile: state.userProfile,
        conversationHistory: state.messages.map(m => ({sender: m.sender, text: typeof m.text === 'string' ? m.text : 'Interactive Component', timestamp: m.timestamp})),
        timestamp: new Date()
      });
    }
  }, [state.leadScore, state.userProfile, state.messages, onLeadConversion]);

  const getWelcomeMessage = (type: LeadType, nome?: string): string => {
    const userName = nome ? `, ${nome}` : "";
    const messages = {
      quente: `🔥 Olá${userName}! Sou seu especialista StrateUp. Percebi seu grande potencial! Como posso te ajudar a escalar seus resultados AGORA? 🚀`,
      morno: `👋 Olá${userName}! Da StrateUp aqui. Vi que você está buscando crescimento. Qual seu maior desafio digital no momento? 🤔`,
      frio: `💡 Olá${userName}! Bem-vindo à StrateUp! Sou seu consultor de crescimento. Qual o principal obstáculo que te impede de faturar mais hoje?`
    };
    return messages[type] || messages.frio;
  };
  const getInitialOptions = (type: LeadType): QuickOption[] => {
    const options: Record<LeadType, QuickOption[]> = {
      quente: [
        { id: "q_scale", text: "🚀 Quero escalar meus resultados AGORA!", action: "scale_results", priority: "high" },
        { id: "q_cases", text: "📊 Me mostre cases de SUCESSO no meu nicho.", action: "show_cases", priority: "high" },
        { id: "q_consult", text: "📅 Agendar consultoria estratégica GRATUITA.", action: "schedule_consultation", priority: "high" }
      ],
      morno: [
        { id: "m_methodology", text: "🔍 Como funciona a metodologia StrateUp?", action: "explain_methodology", priority: "medium" },
        { id: "m_results", text: "📈 Que tipo de resultados posso esperar?", action: "show_results", priority: "medium" },
        { id: "m_diagnosis", text: "🎯 Quero um diagnóstico digital GRATUITO.", action: "free_diagnosis", priority: "high" }
      ],
      frio: [
        { id: "f_convert", text: "😥 Estou com desafios para converter leads.", action: "conversion_help", priority: "medium" },
        { id: "f_understand", text: "🤔 Como a StrateUp pode me ajudar?", action: "explain_work", priority: "low" },
        { id: "f_different", text: "❓ Qual o diferencial da StrateUp?", action: "show_diferential", priority: "medium" }
      ]
    };
    return options[type] || options.frio;
  };

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      <ChatbotContainer
        initialLeadType={leadType}
        messagesEndRef={messagesEndRef}
      />
    </ChatContext.Provider>
  );
}

const ChatbotContainer = ({
  initialLeadType,
  messagesEndRef
}: {
  initialLeadType: LeadType;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}) => {
  const { state, dispatch } = useChatContext();
  useTimingLogic(initialLeadType);

  const getButtonVisualState = () => {
    // Cores StrateUp para o botão flutuante
    if (state.isOpen) return { pulse: "", color: "bg-destructive hover:bg-destructive/90", icon: <X size={24} /> }; // Usando X menor
    if (state.leadScore >= 70) return { pulse: "animate-bounce", color: "bg-green-500 hover:bg-green-600", icon: <Sparkles size={24} /> }; // TODO-STRATEUP: Cor StrateUp de sucesso
    if (state.leadScore >= 40) return { pulse: "animate-pulse", color: "bg-yellow-500 hover:bg-yellow-600", icon: <MessageSquareText size={24} strokeWidth={2}/> }; // TODO-STRATEUP: Cor StrateUp de alerta/morno
    if (state.isButtonAnimating) return { pulse: "animate-pulse", color: "bg-primary hover:bg-primary/90", icon: <MessageSquareText size={24} strokeWidth={2}/> };
    return { pulse: "", color: "bg-primary hover:bg-primary/90", icon: <MessageSquareText size={24} strokeWidth={2}/> };
  };

  const buttonState = getButtonVisualState();

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[1000] flex flex-col items-end">
      <button
        onClick={() => dispatch({ type: 'TOGGLE_CHAT' })}
        className={cn(
          "relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full text-primary-foreground shadow-2xl transition-all duration-300 transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          buttonState.color,
          buttonState.pulse
        )}
        aria-label={state.isOpen ? "Fechar StrateUp Assistente" : "Abrir StrateUp Assistente"}
      >
        {buttonState.icon}
        {!state.isOpen && state.leadScore > 5 && (
             <div className={cn(
                "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border-2 border-card",
                state.leadScore >= 70 ? "bg-destructive text-destructive-foreground" : state.leadScore >=40 ? "bg-yellow-400 text-black" : "bg-secondary text-secondary-foreground"
             )}>
                {state.leadScore >=70 ? '🔥' : state.leadScore >=40 ? '💡' : '!'}
            </div>
        )}
      </button>

      {state.isOpen && (
        <div className={cn(
            "mt-3 w-[360px] sm:w-[380px] max-w-[calc(100vw-2.5rem)] h-[calc(100vh-7rem)] sm:h-[calc(100vh-8rem)] max-h-[600px] sm:max-h-[650px]",
            "bg-card text-card-foreground rounded-xl shadow-2xl border border-border",
            "flex flex-col transition-all duration-300 ease-out",
            // TODO-STRATEUP: Adicionar animações de entrada/saída com framer-motion se desejado
        )}>
          <ChatHeader />
          <div className="flex-1 overflow-y-auto bg-background/60 custom-scrollbar-chatbot p-0">
            <div className="p-3 sm:p-4 space-y-1">
              {state.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {state.isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <MessageInput />
          <div className="px-4 py-1.5 sm:py-2 bg-muted/70 border-t border-border rounded-b-xl">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center font-ibmplex"> {/* Fonte StrateUp */}
                <CheckCircle2 size={11} className="mr-1.5 text-green-500" /> {/* TODO-STRATEUP: Cor StrateUp */}
                Powered by StrateUp AI
              </div>
              <div className="flex items-center font-ibmplex"> {/* Fonte StrateUp */}
                <Clock size={11} className="mr-1.5" />
                Online
              </div>
            </div>
          </div>
        </div>
      )}
      {state.isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden -z-10"
          onClick={() => dispatch({ type: 'TOGGLE_CHAT' })}
        />
      )}
    </div>
  );
};