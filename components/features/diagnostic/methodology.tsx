export default function Methodology() {
  return (
    <section id="methodology" className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nossa Metodologia</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Utilizamos uma abordagem estruturada para avaliar a maturidade digital da sua empresa.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Etapa 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Diagnóstico</h3>
            <p className="text-gray-600">
              Avaliação completa da sua presença digital atual através de um questionário detalhado.
            </p>
          </div>

          {/* Etapa 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Análise</h3>
            <p className="text-gray-600">
              Processamento dos dados coletados para identificar pontos fortes e oportunidades de melhoria.
            </p>
          </div>

          {/* Etapa 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Relatório</h3>
            <p className="text-gray-600">
              Geração de um relatório personalizado com insights e recomendações específicas.
            </p>
          </div>

          {/* Etapa 4 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="text-xl font-semibold mb-2">Plano de Ação</h3>
            <p className="text-gray-600">
              Desenvolvimento de um roteiro prático para implementar as melhorias sugeridas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 