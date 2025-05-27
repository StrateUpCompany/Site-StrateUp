// /app/page.tsx - VERSÃO COMPLETA E CORRIGIDA
import React from 'react';
import { HeroSectionFunnel } from '@/components/sections/hero-section-funnel';
import BenefitsSection from '@/components/sections/benefits-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import CtaSection from '@/components/sections/cta-section';
// Poderíamos adicionar outras seções aqui, como 'Como Funciona' ou 'FAQ', se necessário.

/**
 * HomePage: A página inicial (landing page) da StrateUp Digital.
 * Objetivo: Aplicar o framework AIDA para guiar o visitante
 * desde a Atenção até a Ação (iniciar o diagnóstico).
 */
export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center"> {/* Garante que as seções ocupem a largura total */}

      {/* Seção 1: Herói (Atenção & Interesse) - Foco Funil */}
      {/* Deve capturar a atenção imediatamente e gerar interesse na solução. */}
      <HeroSectionFunnel />

      {/* Seção 2: Benefícios (Interesse & Desejo) - Prova de Valor */}
      {/* Deve detalhar OS NÚMEROS e a transformação que a StrateUp oferece. */}
      <BenefitsSection />

      {/* Seção 3: Depoimentos (Desejo & Confiança) - Prova Social */}
      {/* Deve construir confiança mostrando resultados reais de PMEs. */}
      <TestimonialsSection />

      {/* Seção 4: Chamada para Ação (Ação) - O Próximo Passo */}
      {/* Deve direcionar claramente o usuário para o Diagnóstico. */}
      <CtaSection />

    </div>
  );
}