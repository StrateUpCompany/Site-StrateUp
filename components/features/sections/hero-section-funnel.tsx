// /components/sections/hero-section-funnel.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSectionFunnel() {
  return (
    <section className="w-full py-20 md:py-32 bg-gray-50 dark:bg-gray-800 text-center border-b">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* O HOOK: Título Principal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 font-montserrat text-strateup-blue dark:text-white">
            Sua PME está <span className="text-strateup-orange">Invisível</span> no Digital? Descubra o <span className="underline">Erro #1</span> que 90% dos Empreendedores Cometem (e Como Corrigi-lo em 5 Minutos).
          </h1>
          
          {/* A HISTÓRIA (Curta) / CURIOSIDADE */}
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 font-bricolage">
            Eu sou Felipe Ribeiro. Vi centenas de PMEs patinando no digital. Descobri um padrão - um *framework* simples que, quando aplicado, desbloqueia o crescimento. Quer saber se você está no caminho certo?
          </p>
          
          {/* A OFERTA (Para o Diagnóstico) / O ÚNICO CTA */}
          <Link href="/diagnostico" passHref>
             <Button 
                size="lg" 
                className="bg-strateup-orange hover:bg-orange-600 text-white font-bold text-xl py-8 px-16 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                FAZER DIAGNÓSTICO GRATUITO AGORA!
                <span className="block text-sm font-normal">(Receba sua nota na hora!)</span>
             </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">Junte-se a +500 PMEs que já transformaram seus resultados.</p>
        </div>
      </div>
    </section>
  );
}