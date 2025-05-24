import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HeroSectionAB from "@/components/sections/hero-section-ab"
import BenefitsSection from "@/components/sections/benefits-section"
import HowItWorksSection from "@/components/sections/how-it-works-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import FAQSection from "@/components/sections/faq-section"
import CTASection from "@/components/sections/cta-section"
import ScriptLoader from "@/components/script-loader"
import ChatbotWrapper from "@/components/chatbot/chatbot-wrapper"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Your page content here */}
      <Header />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center">StrateUp</h1>
        <p className="text-center mt-4 mb-8">Transforme sua estratégia digital com a StrateUp</p>
      </div>

      <HeroSectionAB />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />

      {/* Load scripts properly */}
      <ScriptLoader src="/js/i18n/language-manager.js" type="module" id="language-manager" />
      <ScriptLoader src="/js/main.js" type="module" id="main-js" />

      {/* Add the chatbot component */}
      <ChatbotWrapper leadType="morno" />
      <Footer />
    </main>
  )
}
