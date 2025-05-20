import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Logo from "@/components/ui/logo"

export default function Footer() {
  return (
    <footer className="bg-[#0d1829] text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <Logo variant="footer" withTagline className="mb-4" />
            <p className="text-gray-300 mt-4 text-sm">
              Ajudamos empresas a transformar suas estratégias digitais em resultados mensuráveis através de
              diagnósticos personalizados e soluções eficientes.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/diagnostico" className="text-gray-300 hover:text-white transition-colors">
                  Diagnóstico Gratuito
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-gray-300 hover:text-white transition-colors">
                  Nossos Serviços
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicos/estrategia-digital" className="text-gray-300 hover:text-white transition-colors">
                  Estratégia Digital
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/marketing-performance"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Marketing de Performance
                </Link>
              </li>
              <li>
                <Link href="/servicos/seo" className="text-gray-300 hover:text-white transition-colors">
                  Otimização para Buscadores
                </Link>
              </li>
              <li>
                <Link href="/servicos/analytics" className="text-gray-300 hover:text-white transition-colors">
                  Analytics e Dados
                </Link>
              </li>
              <li>
                <Link href="/servicos/consultoria" className="text-gray-300 hover:text-white transition-colors">
                  Consultoria Estratégica
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">Av. Paulista, 1000</p>
              <p className="mb-2">São Paulo, SP - Brasil</p>
              <p className="mb-2">CEP: 01310-100</p>
              <p className="mb-2">
                <a href="tel:+551199999999" className="hover:text-white transition-colors">
                  +55 11 9999-9999
                </a>
              </p>
              <p>
                <a href="mailto:contato@strateup.com.br" className="hover:text-white transition-colors">
                  contato@strateup.com.br
                </a>
              </p>
            </address>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} StrateUp. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacidade" className="text-gray-400 hover:text-white text-sm transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="text-gray-400 hover:text-white text-sm transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
