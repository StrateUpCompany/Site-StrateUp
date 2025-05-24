export default function Testimonials() {
  return (
    <section id="testimonials" className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">O que nossos clientes dizem</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Veja como o diagnóstico de maturidade digital tem ajudado empresas a melhorar sua presença online.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Depoimento 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold">João Silva</h4>
                <p className="text-gray-600 text-sm">CEO, Tech Solutions</p>
              </div>
            </div>
            <p className="text-gray-600">
              "O diagnóstico nos ajudou a identificar pontos críticos em nossa estratégia digital. As recomendações foram muito práticas e já estamos vendo resultados."
            </p>
          </div>

          {/* Depoimento 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold">Maria Santos</h4>
                <p className="text-gray-600 text-sm">Diretora de Marketing, Retail Plus</p>
              </div>
            </div>
            <p className="text-gray-600">
              "Excelente ferramenta! O relatório foi muito detalhado e nos deu uma visão clara de onde precisamos melhorar. Recomendo fortemente!"
            </p>
          </div>

          {/* Depoimento 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold">Pedro Oliveira</h4>
                <p className="text-gray-600 text-sm">Fundador, Startup XYZ</p>
              </div>
            </div>
            <p className="text-gray-600">
              "Como startup, precisávamos de uma direção clara para nossa estratégia digital. O diagnóstico nos forneceu exatamente isso, com um plano de ação muito prático."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 