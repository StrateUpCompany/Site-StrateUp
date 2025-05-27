// /app/(funnels)/diagnostico/page.tsx
import React from 'react';
import { DiagnosticForm } from '@/components/diagnostic/diagnostic-form';
import { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

// Usará o FunnelLayout automaticamente.

export const metadata: Metadata = {
  title: "Diagnóstico Digital Gratuito StrateUp",
  description: "Descubra em 5 minutos os pontos cegos da sua estratégia digital e receba um plano de ação imediato.",
  robots: 'noindex, nofollow', // Pode ser 'index' se quiser ranquear, mas Squeeze Pages focam em tráfego pago/direto.
};

export default function DiagnosticPage() {
  return (
    // Usamos um Card para dar um contorno, mas o layout geral é limpo.
    <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center">

        {/* Lado Esquerdo: O Hook e a Promessa */}
        <div className="md:w-1/2 p-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-strateup-blue dark:text-white mb-4">
                Revele o <span className="text-strateup-orange">Potencial Oculto</span> da Sua Empresa no Digital.
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 font-bricolage">
                Nosso diagnóstico gratuito de 5 minutos analisa seus pontos fortes e fracos, entregando um <strong className="text-strateup-blue">plano de ação personalizado</strong> para você parar de perder dinheiro e começar a faturar de verdade.
            </p>
             <ul className="list-disc list-inside space-y-2 text-left mb-6 font-bricolage">
                <li><span className="font-bold">Clareza Imediata:</span> Saiba exatamente onde focar.</li>
                <li><span className="font-bold">Plano de Ação:</span> Passos práticos para implementar hoje.</li>
                <li><span className="font-bold">Comparativo:</span> Veja como você se posiciona no mercado.</li>
            </ul>
            <p className="text-sm text-muted-foreground">Sem spam, sem enrolação. Apenas valor real.</p>
        </div>

        {/* Lado Direito: O Formulário */}
        <div className="md:w-1/2 w-full p-4 md:p-0">
             {/* O DiagnosticForm agora está dentro de uma página focada. 
                Seu design interno também pode ser ajustado para ser mais 'funnel-like'.
             */}
            <DiagnosticForm />
        </div>

    </div>
  );
}