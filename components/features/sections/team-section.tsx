import Image from "next/image"

interface TeamMember {
  id: number
  name: string
  position: string
  bio: string
  imageUrl: string
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Ana Silva",
      position: "CEO & Estrategista Digital",
      bio: "Com mais de 15 anos de experiência em marketing digital e estratégia de negócios, Ana lidera a StrateUp com visão inovadora e foco em resultados mensuráveis para nossos clientes.",
      imageUrl: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Carlos Mendes",
      position: "Diretor de Marketing",
      bio: "Especialista em SEO e marketing de conteúdo, Carlos desenvolve estratégias personalizadas que aumentam a visibilidade online e geram leads qualificados para empresas de diversos segmentos.",
      imageUrl: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "Juliana Costa",
      position: "Especialista em Mídias Sociais",
      bio: "Com formação em Comunicação Digital e certificações em plataformas como Facebook e Instagram, Juliana cria estratégias de engajamento que convertem seguidores em clientes.",
      imageUrl: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Ricardo Oliveira",
      position: "Consultor de Vendas",
      bio: "Especializado em processos comerciais e CRM, Ricardo ajuda empresas a otimizarem seu funil de vendas e aumentarem suas taxas de conversão através de metodologias comprovadas.",
      imageUrl: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Equipe</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Contamos com especialistas em diversas áreas do marketing digital, estratégia de negócios e tecnologia,
            unidos pelo propósito de transformar empresas através da inovação digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <div className="relative h-64 w-full">
                <Image src={member.imageUrl || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-[#0066ff] font-medium mb-3">{member.position}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
