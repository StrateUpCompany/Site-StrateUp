import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Logo from "@/components/shared/logo"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-[#0d1829] to-[#0066ff] text-white pt-32 pb-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <Image src="/images/grid-pattern.png" alt="Background pattern" fill className="object-cover" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          {/* Large logo display at the top of the hero */}
          <Logo variant="white" className="mb-8 animate-fadeIn" />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slideUp">
            Transforme sua Estratégia Digital
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 animate-slideUp animation-delay-100">
            Diagnóstico personalizado para identificar oportunidades e acelerar o crescimento do seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slideUp animation-delay-200">
            <Button asChild size="lg" className="bg-[#ff8c00] hover:bg-[#cc7000] text-white text-lg px-8">
              <Link href="/diagnostico">Diagnóstico Gratuito</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8"
            >
              <Link href="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#0066ff] text-white px-6 py-2 rounded-full font-medium">
            Empresas que confiam na StrateUp
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* Client logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative h-12 w-32">
                <Image
                  src={`/placeholder.svg?height=48&width=128&text=Cliente ${i}`}
                  alt={`Cliente ${i}`}
                  fill
                  className="object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave shape at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
