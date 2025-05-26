// /app/resultados/[id]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { ResultsOverview } from '@/components/diagnostic/results-overview';
import { ResultsDetailedAnalysis } from '@/components/diagnostic/results-detailed-analysis';
import { ResultsRecommendations } from '@/components/diagnostic/results-recommendations';
import { ResultsActionPlan } from '@/components/diagnostic/results-action-plan';
import { ResultsDownloadPDF } from '@/components/diagnostic/results-download-pdf';
import { ChatbotSDR } from '@/components/chatbot/chatbot-sdr';
import { getDiagnosticResults } from '@/app/actions/diagnostic-actions'; // Importa a action de busca
import { Metadata } from 'next';

interface ResultsPageProps {
  params: { id: string };
}

// Gera Metadata dinamicamente (opcional, mas bom para SEO/compartilhamento)
export async function generateMetadata({ params }: ResultsPageProps): Promise<Metadata> {
  const diagnostic = await getDiagnosticResults(params.id);
  const companyName = diagnostic?.formData?.companyName || 'Sua Empresa';

  return {
    title: `Diagnóstico Digital StrateUp - ${companyName}`,
    description: `Veja a análise completa da maturidade digital de ${companyName} e os próximos passos para o crescimento.`,
    robots: 'noindex, nofollow', // Importante para não indexar resultados individuais
  };
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const diagnosticData = await getDiagnosticResults(params.id);

  // Se não encontrar o diagnóstico, mostra página 404
  if (!diagnosticData) {
    notFound();
  }

  // Extrai os dados necessários (ajuste conforme a estrutura real)
  const { formData, scores, leadScore, leadType, id } = diagnosticData;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Seu Diagnóstico de Maturidade Digital está Pronto, {formData?.respondentName || 'Empreendedor'}!
      </h1>
      <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
        Veja a análise detalhada da {formData?.companyName || 'sua empresa'} e as recomendações StrateUp para acelerar seu crescimento.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          <ResultsOverview
            scores={scores}
            leadScore={leadScore}
            leadType={leadType}
            userInfo={formData}
          />
          <ResultsDetailedAnalysis
            scores={scores}
            formData={formData}
          />
          <ResultsRecommendations
             leadType={leadType}
             scores={scores}
          />
        </div>

        {/* Coluna Lateral (1/3) */}
        <div className="space-y-8">
            <ResultsActionPlan
                leadType={leadType}
                scores={scores}
                formData={formData}
            />
            <ResultsDownloadPDF
                diagnosticId={id} // Passa o ID para a geração/download
                diagnosticData={diagnosticData} // Passa todos os dados
            />
        </div>
      </div>

      {/* Chatbot pode ser configurado para aparecer aqui, talvez com base no leadType */}
      <ChatbotSDR leadType={leadType as 'Frio' | 'Morno' | 'Quente'} />
    </div>
  );
}
