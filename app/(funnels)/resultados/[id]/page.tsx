// /app/(funnels)/resultados/[id]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getDiagnosticResults } from '@/app/actions/diagnostic-actions';
import { Metadata } from 'next';
import { ResultsOverview } from '@/components/diagnostic/results-overview';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

// ... (interface e generateMetadata como antes)

export default async function ResultsPage({ params }: { params: { id: string } }) {
  const diagnosticData = await getDiagnosticResults(params.id);
  if (!diagnosticData) {
    notFound();
  }
  const { formData, scores, leadScore, leadType, id } = diagnosticData;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* ====================================================
        SEÇÃO 1: O HOOK & VALOR IMEDIATO (Seus Resultados!)
        ====================================================
      */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-strateup-blue mb-3">
            Parabéns, {formData?.respondentName}! Seu Raio-X Digital está aqui.
        </h1>
        <p className="text-xl text-gray-700 mb-6">Sua pontuação é <span className={`font-bold ${leadType === 'Quente' ? 'text-green-500' : leadType === 'Morno' ? 'text-yellow-500' : 'text-red-500'}`}>{leadScore}/100</span> ({leadType}) - Veja o que isso <span className="underline">realmente</span> significa para seu faturamento:</p>
      </div>
      <ResultsOverview scores={scores} leadScore={leadScore} leadType={leadType} userInfo={formData} />

      {/* ====================================================
        SEÇÃO 2: A HISTÓRIA & O GAP (Conectando com a Dor)
        ====================================================
      */}
      <Card className="my-16 p-8 bg-gray-50 dark:bg-gray-800">
        <CardContent className="text-center">
            <h2 className="text-2xl font-bold font-montserrat mb-4">Você se identifica com isso?</h2>
            {/* Aqui entra a história do Felipe ou um caso de cliente, 
                conectando os *resultados* (scores baixos/médios) com os *problemas* reais 
                que a StrateUp resolve. Mostrar o "Gap" (Gap Selling).
            */}
            <p className="text-lg mb-6 font-bricolage">
                "Muitos dos nossos clientes chegam com pontuações similares à sua. Eles trabalham duro, mas sentem que estão <span className="font-bold text-strateup-orange">apagando incêndios</span> em vez de construir um castelo. O problema não é falta de esforço, mas sim a <span className="font-bold text-strateup-blue">falta de um *framework* claro</span>. Nós descobrimos que ajustar [Ponto Chave 1] e [Ponto Chave 2] pode [Resultado Desejado]..."
            </p>
            {/* Opcional: Um vídeo curto do Felipe explicando isso */}
            {/* <div className="aspect-video bg-gray-300 rounded-lg mb-6">[Placeholder Vídeo Felipe]</div> */}
        </CardContent>
      </Card>

      {/* ====================================================
        SEÇÃO 3: A OFERTA (A Ponte para a Solução)
        ====================================================
      */}
      <div className="text-center bg-white dark:bg-gray-900 p-12 rounded-lg shadow-2xl border-t-4 border-strateup-orange">
          <h2 className="text-3xl font-bold font-montserrat text-strateup-blue mb-4">
              A Boa Notícia? Você tem um <span className="text-strateup-orange">Enorme Potencial</span> a Desbloquear!
          </h2>
          <p className="text-xl text-gray-700 mb-8 font-bricolage">
              Seus resultados mostram exatamente onde estão as <span className="font-bold">oportunidades de crescimento rápido</span>. Quer um plano passo a passo para transformar esses insights em <span className="font-bold">lucro real</span>?
          </p>
          <p className="text-lg mb-8 font-bricolage">
              Agende uma <span className="font-bold">Sessão Estratégica Gratuita</span> de 30 minutos comigo ou com um especialista da StrateUp. Vamos mapear seu caminho para o próximo nível - <span className="underline">sem compromisso</span>.
          </p>

          {/* O CTA Principal - O Botão Mágico */}
           <Link href="https://calendly.com/strateup/consultoria" target="_blank" passHref> {/* Use seu link real */}
             <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white font-bold text-2xl py-8 px-20 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate-pulse">
                AGENDAR MINHA SESSÃO GRATUITA!
             </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">Vagas limitadas esta semana! Não perca a chance.</p>
          
          {/* Prova Social (Perto do CTA) */}
          <div className="mt-12">
             <h3 className="text-lg font-semibold mb-4">O que outros PMEs dizem:</h3>
             <p className="italic text-gray-600">"A sessão com a StrateUp clareou tudo. Em 60 dias, nosso faturamento aumentou 30%!" - João Silva, CEO XYZ</p>
          </div>
      </div>

       {/* O Chatbot pode entrar aqui se o usuário não agendar */}
       {/* <ChatbotSDR leadType={leadType as 'Frio' | 'Morno' | 'Quente'} /> */}
    </div>
  );
}