// /app/actions/diagnostic-actions.ts
'use server';

import { createServerSupabaseClient as createClient } from '@/core/lib/supabase/client';; // Assumindo que você tem um server client
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

// Definir o schema de validação com Zod (baseado no diagnostic-form)
const DiagnosticFormSchema = z.object({
  companyName: z.string().min(1, 'Nome da empresa é obrigatório'),
  industry: z.string().min(1, 'Setor é obrigatório'),
  companySize: z.string().min(1, 'Tamanho da empresa é obrigatório'),
  respondentName: z.string().min(1, 'Seu nome é obrigatório'),
  email: z.string().email('Email inválido'),
  position: z.string().min(1, 'Seu cargo é obrigatório'),
  hasWebsite: z.enum(['sim', 'nao']),
  googleMyBusiness: z.enum(['sim', 'nao']),
  socialMedia: z.array(z.string()),
  contentFrequency: z.string(),
  investsDigitalMarketing: z.enum(['sim', 'nao']),
  marketingBudget: z.string(),
  marketingChannels: z.array(z.string()),
  usesDataForDecisions: z.enum(['sim', 'nao']),
  trackedMetrics: z.array(z.string()),
  digitalGoals: z.array(z.string()),
  mainDigitalChallenge: z.string().optional(),
});

type FormData = z.infer<typeof DiagnosticFormSchema>;

interface Scores {
  website: number;
  gmb: number;
  socialMedia: number;
  content: number;
  investment: number;
  dataUsage: number;
}

type LeadType = 'Frio' | 'Morno' | 'Quente';

// Lógica de Pontuação (Exemplo - AJUSTE CONFORME SUA ESTRATÉGIA)
const calculateScoresAndLead = (data: FormData): { scores: Scores; leadScore: number; leadType: LeadType } => {
  const scores: Scores = {
    website: data.hasWebsite === 'sim' ? 20 : 0,
    gmb: data.googleMyBusiness === 'sim' ? 15 : 0,
    socialMedia: Math.min(data.socialMedia.length * 5, 15), // Max 15
    content: ['Diariamente', 'Algumas vezes por semana'].includes(data.contentFrequency) ? 15 : 5,
    investment: data.investsDigitalMarketing === 'sim' ? 20 : 0,
    dataUsage: data.usesDataForDecisions === 'sim' ? 15 : 0,
  };

  const leadScore = Object.values(scores).reduce((acc, score) => acc + score, 0);

  let leadType: LeadType;
  if (leadScore >= 70) {
    leadType = 'Quente';
  } else if (leadScore >= 40) {
    leadType = 'Morno';
  } else {
    leadType = 'Frio';
  }

  return { scores, leadScore, leadType };
};


export async function submitDiagnosticAction(formData: FormData) {
  const supabase = createClient();

  // 1. Validar Dados
  const validationResult = DiagnosticFormSchema.safeParse(formData);
  if (!validationResult.success) {
    console.error('Erro de validação:', validationResult.error.flatten().fieldErrors);
    return {
      success: false,
      error: 'Dados inválidos. Verifique os campos.',
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const validData = validationResult.data;

  // 2. Calcular Pontuação e Tipo de Lead
  const { scores, leadScore, leadType } = calculateScoresAndLead(validData);

  // 3. Preparar dados para o Supabase
  const diagnosticId = uuidv4();
  const dataToInsert = {
    id: diagnosticId,
    formData: validData,
    scores: scores,
    leadScore: leadScore,
    leadType: leadType,
    companyName: validData.companyName,
    email: validData.email,
  };

  // 4. Salvar no Supabase
  try {
    const { data, error } = await supabase
      .from('diagnostics') // 🚨 CERTIFIQUE-SE QUE ESTA TABELA EXISTE!
      .insert([dataToInsert])
      .select('id')
      .single();

    if (error) {
      console.error('Erro ao salvar no Supabase:', error);
      return { success: false, error: 'Ocorreu um erro ao salvar seu diagnóstico. Tente novamente.' };
    }

    if (!data || !data.id) {
        console.error('Nenhum ID retornado ao salvar no Supabase');
        return { success: false, error: 'Ocorreu um erro inesperado. Tente novamente.' };
    }

    console.log('Diagnóstico salvo com sucesso, ID:', data.id);
    return { success: true, id: data.id }; // Retorna o ID inserido

  } catch (err) {
    console.error('Erro inesperado:', err);
    return { success: false, error: 'Ocorreu um erro inesperado. Tente novamente.' };
  }
}

// Função para buscar dados (usada na página de resultados)
export async function getDiagnosticResults(id: string) {
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from('diagnostics')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Erro ao buscar diagnóstico:', error);
            return null;
        }

        return data;

    } catch (err) {
        console.error('Erro inesperado ao buscar:', err);
        return null;
    }
}
