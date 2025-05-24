export default function Benefits() {
  return (
    <section id="benefits" className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Por que fazer o diagnóstico?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nosso diagnóstico de maturidade digital é uma ferramenta poderosa para avaliar e melhorar sua presença online.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Benefício 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-chart-line text-primary text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Análise Completa</h3>
            <p className="text-gray-600">
              Avaliação detalhada de todos os aspectos da sua presença digital, desde redes sociais até estratégias de marketing.
            </p>
          </div>

          {/* Benefício 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-lightbulb text-primary text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Insights Valiosos</h3>
            <p className="text-gray-600">
              Receba recomendações personalizadas para melhorar sua estratégia digital e aumentar seus resultados.
            </p>
          </div>

          {/* Benefício 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <i className="fas fa-rocket text-primary text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Plano de Ação</h3>
            <p className="text-gray-600">
              Um roteiro claro e prático para implementar melhorias e alcançar seus objetivos de negócio.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 