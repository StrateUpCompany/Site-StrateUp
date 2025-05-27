// /app/page.tsx
import React from 'react';
import { HeroSectionFunnel } from '@/components/sections/hero-section-funnel'; // Importa o componente CORRETO
import { BenefitsSection } from '@/components/sections/benefits-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { CtaSection } from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSectionFunnel /> 
      <BenefitsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}