// /app/layout.tsx - AJUSTE NA IMPORTAÇÃO
import type { Metadata } from "next";
import { Bricolage_Grotesque, Montserrat, IBM_Plex_Sans, Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/shared/theme-provider";
// Correção aqui: import default para ChatbotWrapper, type LeadType continua nomeado
import ChatbotWrapper, { type LeadType } from '@/components/chatbot/chatbot-wrapper';
import { cn } from "@/core/utils";
import "./globals.css";

// --- Configuração das Fontes StrateUp ---
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-bricolage',
  weight: ['400', '700', '800'],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['700', '800'],
});

const ibmplex = IBM_Plex_Sans({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-ibmplex',
  weight: ['400', '600'],
});

const roboto = Roboto({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
});

// --- Metadados Globais ---
export const metadata: Metadata = {
  title: {
    default: "StrateUp Digital - Acelerando PMEs com Estratégia e Tecnologia",
    template: "%s | StrateUp Digital",
  },
  description: "A StrateUp Digital é seu Growth Advisor. Aplicamos frameworks precisos para aumentar seu faturamento, otimizar resultados e empoderar seu negócio.",
  keywords: ["Growth Advisor", "Marketing Digital", "PMEs", "Aumento Faturamento", "Funil de Vendas", "Consultoria PME"],
  authors: [{ name: "StrateUp Digital" }],
};

// --- Componente RootLayout ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentLeadType: LeadType = "morno";

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          bricolage.variable,
          montserrat.variable,
          ibmplex.variable,
          roboto.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          {/* <Header /> */}
          <main className="flex min-h-screen flex-col items-center">
            {children}
          </main>
          {/* <Footer /> */}
          <ChatbotWrapper leadType={currentLeadType} />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}