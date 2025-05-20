import { BarChart3, LineChart, TrendingUp, Users, Target, Zap } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <BarChart3 className="h-10 w-10 text-[#0066ff]" />,
      title: "Aumento de Vendas",
      description:
        "Nossos clientes experimentam, em média, um aumento de 35% nas vendas após implementação das estratégias recomendadas.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-[#0066ff]" />,
      title: "Crescimento Sustentável",
      description: "Desenvolvemos estratégias que garantem crescimento consistente e previsível ao longo do tempo.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-[#0066ff]" />,
      title: "ROI Mensurável",
      description: "Todas as nossas estratégias são focadas em resultados mensuráveis, com ROI claramente definido.",
    },
    {
      icon: <Users className="h-10 w-10 text-[#0066ff]" />,
      title: "Equipe Capacitada",
      description: "Sua equipe será treinada para implementar e manter as estratégias, garantindo autonomia.",
    },
    {
      icon: <Target className="h-10 w-10 text-[#0066ff]" />,
      title: "Foco no Cliente",
      description: "Estratégias centradas no cliente para aumentar satisfação, retenção e valor vitalício.",
    },
    {
      icon: <Zap className="h-10 w-10 text-[#0066ff]" />,
      title: "Implementação Rápida",
      description: "Metodologia ágil que permite ver os primeiros resultados em semanas, não meses.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefícios Comprovados para seu Negócio</h2>
          <p className="text-lg text-gray-700">
            Mais de 200 empresas já transformaram seus resultados com nossa metodologia exclusiva. Veja o que você pode
            conquistar:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
