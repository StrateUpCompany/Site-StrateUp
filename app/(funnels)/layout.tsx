// /app/(funnels)/layout.tsx
import React from 'react';
import { Logo } from '@/components/ui/logo'; // Supondo que você tenha um logo simples

// Este é um layout minimalista para funis.
// Ele remove o Header e Footer padrão para focar na conversão.
export default function FunnelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
        {/* Podemos ter um 'mini-header' com apenas o logo, se desejado */}
        <header className="py-4 px-6 border-b">
            <Logo />
        </header>
        {/* O conteúdo principal do funil */}
        <main className="flex-grow flex items-center justify-center p-4 md:p-8">
            {children}
        </main>
        {/* Um 'mini-footer' com links essenciais (privacidade, termos), se necessário */}
        <footer className="py-4 px-6 text-center text-xs text-muted-foreground border-t">
            © {new Date().getFullYear()} StrateUp. Todos os direitos reservados. | <a href="/privacidade" className="underline">Política de Privacidade</a>
        </footer>
    </div>
  );
}