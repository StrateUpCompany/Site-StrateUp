import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ChatbotSDR from "@/components/features/chatbot/chatbot-sdr"

export const metadata: Metadata = {
  title: "Termos de Uso | StrateUp",
  description:
    "Conheça os termos e condições de uso dos serviços da StrateUp. Transparência e clareza em todas as nossas relações.",
  keywords: "termos de uso, condições de serviço, termos e condições, contrato, StrateUp",
}

export default function TermosPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow py-16 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Termos de Uso</h1>
            <p className="text-gray-600 mb-8">Última atualização: 15 de Maio de 2023</p>

            <div className="prose prose-lg max-w-none">
              <p>
                Bem-vindo à StrateUp. Estes Termos de Uso ("Termos") regem seu acesso e uso do site da StrateUp,
                produtos e serviços ("Serviços"). Ao acessar ou usar nossos Serviços, você concorda com estes Termos.
                Por favor, leia-os cuidadosamente.
              </p>

              <h2>1. Aceitação dos Termos</h2>
              <p>
                Ao acessar ou usar nossos Serviços, você confirma que tem pelo menos 18 anos de idade e que concorda em
                ficar vinculado a estes Termos. Se você estiver usando os Serviços em nome de uma organização, você
                declara e garante que tem autoridade para vincular essa organização a estes Termos.
              </p>

              <h2>2. Alterações nos Termos</h2>
              <p>
                Podemos modificar estes Termos a qualquer momento. Se fizermos alterações, publicaremos os Termos
                revisados e atualizaremos a data da "última atualização". O uso contínuo dos Serviços após tais
                alterações constitui sua aceitação dos Termos revisados.
              </p>

              <h2>3. Uso dos Serviços</h2>
              <p>Você concorda em usar os Serviços apenas para fins legais e de acordo com estes Termos.</p>
              <p>Você não deve:</p>
              <ul>
                <li>Violar quaisquer leis ou regulamentos aplicáveis;</li>
                <li>Infringir os direitos de propriedade intelectual ou outros direitos de terceiros;</li>
                <li>
                  Interferir ou tentar interferir com o funcionamento adequado dos Serviços ou qualquer atividade
                  conduzida nos Serviços;
                </li>
                <li>
                  Contornar, desativar ou interferir de outra forma com recursos relacionados à segurança dos Serviços;
                </li>
                <li>
                  Usar os Serviços de qualquer maneira que possa danificar, desativar, sobrecarregar ou prejudicar os
                  Serviços;
                </li>
                <li>Coletar ou colher qualquer informação de outros usuários sem o seu consentimento;</li>
                <li>Usar os Serviços para enviar comunicações comerciais não solicitadas;</li>
                <li>
                  Usar os Serviços para distribuir malware, spyware ou qualquer outro software malicioso, ou para
                  hospedar ou distribuir conteúdo ilegal.
                </li>
              </ul>

              <h2>4. Contas</h2>
              <p>
                Alguns de nossos Serviços podem exigir que você crie uma conta. Você é responsável por manter a
                confidencialidade de suas credenciais de conta e por todas as atividades que ocorrem sob sua conta. Você
                concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta.
              </p>

              <h2>5. Conteúdo</h2>
              <p>
                Nossos Serviços podem permitir que você envie, armazene, envie ou receba conteúdo ("Conteúdo do
                Usuário"). Você mantém a propriedade de qualquer propriedade intelectual que você detenha em seu
                Conteúdo do Usuário, mas concede à StrateUp uma licença mundial, não exclusiva, isenta de royalties,
                sublicenciável e transferível para usar, reproduzir, modificar, adaptar, publicar, traduzir, criar
                trabalhos derivados, distribuir e exibir tal Conteúdo do Usuário em conexão com a operação e provisão
                dos Serviços.
              </p>

              <h2>6. Propriedade Intelectual</h2>
              <p>
                Os Serviços e todo o conteúdo, recursos e funcionalidades contidos neles são de propriedade da StrateUp,
                seus licenciadores ou outros provedores de tal material e são protegidos por direitos autorais, marcas
                registradas, patentes, segredos comerciais e outras leis de propriedade intelectual ou direitos de
                propriedade.
              </p>

              <h2>7. Links para Sites de Terceiros</h2>
              <p>
                Os Serviços podem conter links para sites de terceiros que não são de propriedade ou controlados pela
                StrateUp. A StrateUp não tem controle sobre, e não assume nenhuma responsabilidade pelo conteúdo,
                políticas de privacidade ou práticas de quaisquer sites de terceiros. Você reconhece e concorda que a
                StrateUp não será responsável, direta ou indiretamente, por qualquer dano ou perda causada ou alegada
                como sendo causada por ou em conexão com o uso ou confiança em qualquer conteúdo, bens ou serviços
                disponíveis em ou através de tais sites.
              </p>

              <h2>8. Rescisão</h2>
              <p>
                Podemos encerrar ou suspender seu acesso aos Serviços imediatamente, sem aviso prévio ou
                responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar estes Termos. Após a
                rescisão, seu direito de usar os Serviços cessará imediatamente.
              </p>

              <h2>9. Isenção de Garantias</h2>
              <p>
                OS SERVIÇOS SÃO FORNECIDOS "COMO ESTÃO" E "CONFORME DISPONÍVEIS", SEM GARANTIAS DE QUALQUER TIPO,
                EXPRESSAS OU IMPLÍCITAS. A STRATEUP EXPRESSAMENTE RENUNCIA A TODAS AS GARANTIAS DE QUALQUER TIPO, SEJAM
                EXPRESSAS OU IMPLÍCITAS, INCLUINDO, MAS NÃO SE LIMITANDO A, GARANTIAS IMPLÍCITAS DE COMERCIALIZAÇÃO,
                ADEQUAÇÃO A UM DETERMINADO FIM, NÃO VIOLAÇÃO E QUAISQUER GARANTIAS DECORRENTES DO CURSO DE NEGOCIAÇÃO OU
                USO COMERCIAL.
              </p>

              <h2>10. Limitação de Responsabilidade</h2>
              <p>
                EM NENHUM CASO A STRATEUP, SEUS DIRETORES, FUNCIONÁRIOS, PARCEIROS, AGENTES, FORNECEDORES OU AFILIADOS
                SERÃO RESPONSÁVEIS POR QUAISQUER DANOS INDIRETOS, INCIDENTAIS, ESPECIAIS, CONSEQUENCIAIS OU PUNITIVOS,
                INCLUINDO, SEM LIMITAÇÃO, PERDA DE LUCROS, DADOS, USO, BOA VONTADE OU OUTRAS PERDAS INTANGÍVEIS,
                RESULTANTES DE (I) SEU ACESSO OU USO OU INCAPACIDADE DE ACESSAR OU USAR OS SERVIÇOS; (II) QUALQUER
                CONDUTA OU CONTEÚDO DE TERCEIROS NOS SERVIÇOS; (III) QUALQUER CONTEÚDO OBTIDO DOS SERVIÇOS; E (IV)
                ACESSO NÃO AUTORIZADO, USO OU ALTERAÇÃO DE SUAS TRANSMISSÕES OU CONTEÚDO, SEJA COM BASE EM GARANTIA,
                CONTRATO, DELITO (INCLUINDO NEGLIGÊNCIA) OU QUALQUER OUTRA TEORIA LEGAL, INDEPENDENTEMENTE DE TERMOS
                SIDO AVISADOS DA POSSIBILIDADE DE TAIS DANOS.
              </p>

              <h2>11. Lei Aplicável</h2>
              <p>
                Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem levar em conta seus
                princípios de conflito de leis.
              </p>

              <h2>12. Resolução de Disputas</h2>
              <p>
                Qualquer disputa decorrente ou relacionada a estes Termos será submetida à jurisdição exclusiva dos
                tribunais localizados em São Paulo, SP, Brasil.
              </p>

              <h2>13. Disposições Gerais</h2>
              <p>
                Estes Termos constituem o acordo integral entre você e a StrateUp em relação ao assunto aqui tratado e
                substituem todos os acordos anteriores e contemporâneos, sejam escritos ou orais. A falha da StrateUp em
                exercer ou fazer cumprir qualquer direito ou disposição destes Termos não constituirá uma renúncia a tal
                direito ou disposição. Se qualquer disposição destes Termos for considerada inválida ou inexequível por
                um tribunal, as disposições restantes destes Termos permanecerão em vigor.
              </p>

              <h2>14. Contato</h2>
              <p>
                Se você tiver dúvidas sobre estes Termos, entre em contato conosco pelo email: termos@strateup.com.br
              </p>
            </div>
          </div>
        </div>
      </div>

      <ChatbotSDR leadType="frio" />
      <Footer />
    </main>
  )
}
