import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ChatbotSDR from "@/components/features/chatbot/chatbot-sdr"

export const metadata: Metadata = {
  title: "Política de Privacidade | StrateUp",
  description:
    "Conheça nossa política de privacidade e como tratamos seus dados pessoais na StrateUp. Transparência e segurança são nossas prioridades.",
  keywords: "política de privacidade, proteção de dados, LGPD, privacidade, dados pessoais, StrateUp",
}

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow py-16 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de Privacidade</h1>
            <p className="text-gray-600 mb-8">Última atualização: 15 de Maio de 2023</p>

            <div className="prose prose-lg max-w-none">
              <p>
                A StrateUp está comprometida em proteger sua privacidade. Esta Política de Privacidade descreve como
                coletamos, usamos, compartilhamos e protegemos suas informações pessoais quando você utiliza nosso site
                e serviços.
              </p>

              <h2>1. Informações que Coletamos</h2>
              <p>Podemos coletar os seguintes tipos de informações:</p>
              <ul>
                <li>
                  <strong>Informações de Identificação Pessoal:</strong> Nome, endereço de email, número de telefone,
                  endereço postal, informações da empresa e cargo.
                </li>
                <li>
                  <strong>Informações de Uso:</strong> Como você interage com nosso site, incluindo páginas visitadas,
                  tempo gasto no site, links clicados e preferências de navegação.
                </li>
                <li>
                  <strong>Informações do Dispositivo:</strong> Tipo de dispositivo, sistema operacional, tipo de
                  navegador, endereço IP e identificadores de dispositivo.
                </li>
              </ul>

              <h2>2. Como Usamos Suas Informações</h2>
              <p>Utilizamos suas informações para:</p>
              <ul>
                <li>Fornecer, manter e melhorar nossos serviços;</li>
                <li>Processar e completar transações;</li>
                <li>Enviar informações técnicas, atualizações e mensagens administrativas;</li>
                <li>Responder a seus comentários, perguntas e solicitações;</li>
                <li>Comunicar sobre promoções, eventos e outras notícias sobre nossos serviços;</li>
                <li>Monitorar e analisar tendências, uso e atividades relacionadas aos nossos serviços;</li>
                <li>Personalizar e melhorar sua experiência;</li>
                <li>Detectar, investigar e prevenir atividades fraudulentas e não autorizadas.</li>
              </ul>

              <h2>3. Compartilhamento de Informações</h2>
              <p>Podemos compartilhar suas informações nas seguintes circunstâncias:</p>
              <ul>
                <li>
                  <strong>Com Prestadores de Serviços:</strong> Compartilhamos informações com empresas que prestam
                  serviços em nosso nome, como processamento de pagamentos, análise de dados, entrega de emails,
                  hospedagem de serviços e atendimento ao cliente.
                </li>
                <li>
                  <strong>Para Conformidade Legal:</strong> Podemos divulgar informações se acreditarmos de boa-fé que
                  isso é necessário para cumprir uma obrigação legal, proteger os direitos ou a segurança da StrateUp,
                  de nossos usuários ou do público.
                </li>
                <li>
                  <strong>Com Seu Consentimento:</strong> Podemos compartilhar informações com terceiros quando você nos
                  der consentimento para fazê-lo.
                </li>
              </ul>

              <h2>4. Segurança das Informações</h2>
              <p>
                Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações
                contra acesso não autorizado, uso indevido ou divulgação. No entanto, nenhum método de transmissão pela
                Internet ou método de armazenamento eletrônico é 100% seguro, e não podemos garantir sua segurança
                absoluta.
              </p>

              <h2>5. Seus Direitos e Escolhas</h2>
              <p>Você tem certos direitos em relação às suas informações pessoais:</p>
              <ul>
                <li>
                  <strong>Acesso e Atualização:</strong> Você pode acessar e atualizar certas informações através das
                  configurações da sua conta ou entrando em contato conosco.
                </li>
                <li>
                  <strong>Exclusão:</strong> Você pode solicitar a exclusão da sua conta e informações pessoais.
                </li>
                <li>
                  <strong>Comunicações de Marketing:</strong> Você pode optar por não receber nossas comunicações de
                  marketing seguindo as instruções de cancelamento de inscrição incluídas em tais comunicações.
                </li>
                <li>
                  <strong>Cookies:</strong> A maioria dos navegadores permite que você recuse cookies. No entanto, isso
                  pode afetar sua capacidade de usar certos recursos do nosso site.
                </li>
              </ul>

              <h2>6. Transferências Internacionais de Dados</h2>
              <p>
                Suas informações podem ser transferidas e processadas em países diferentes daquele em que você reside.
                Esses países podem ter leis de proteção de dados diferentes das leis do seu país.
              </p>

              <h2>7. Retenção de Dados</h2>
              <p>
                Retemos suas informações pessoais pelo tempo necessário para cumprir as finalidades descritas nesta
                Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por
                lei.
              </p>

              <h2>8. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer
                alterações publicando a nova Política de Privacidade nesta página e atualizando a data da "última
                atualização".
              </p>

              <h2>9. Contato</h2>
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco pelo email:
                privacidade@strateup.com.br
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
