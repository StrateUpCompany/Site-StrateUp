// /app/(funnels)/layout.tsx - IMPORTAÇÃO DO LOGO CORRIGIDA
import React from 'react';
import Logo from '@/components/shared/logo'; // <-- CORREÇÃO AQUI: Importação default

// Este é um layout minimalista para funis.
// Ele remove o Header e Footer padrão para focar na conversão.
export default function FunnelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col"> {/* Adicionado text-foreground */}
      {/* Podemos ter um 'mini-header' com apenas o logo, se desejado */}
      <header className="py-4 px-6 border-b flex items-center"> {/* Adicionado flex items-center para melhor alinhamento vertical do logo */}
        <Logo variant="default" /> {/* Passando uma variant default, ajuste conforme necessário */}
      </header>

      {/* O conteúdo principal do funil */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8"> {/* flex-col para o conteúdo do funil poder se expandir verticalmente */}
        {children}
      </main>

      {/* Um 'mini-footer' com links essenciais (privacidade, termos), se necessário */}
      <footer className="py-6 px-6 text-center text-xs text-muted-foreground border-t">
        © {new Date().getFullYear()} StrateUp Digital. Todos os direitos reservados.
        <span className="mx-1">|</span>
        {/* TODO-STRATEUP: Criar a página /privacidade e /termos se ainda não existirem */}
        <a href="/privacidade" className="hover:text-primary underline"> 
          Política de Privacidade
        </a>
        {/* Exemplo de link para Termos de Uso:
        <span className="mx-1">|</span>
        <a href="/termos" className="hover:text-primary underline">
          Termos de Uso
        </a>
        */}
      </footer>
    </div>
  );
}