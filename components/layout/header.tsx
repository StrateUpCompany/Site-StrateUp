"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import Logo from "@/components/ui/logo"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto py-0">
        <div className="flex items-center justify-between">
          {/* Logo - Prominently displayed */}
          <Logo
            variant={isScrolled ? "small" : "default"}
            withTagline={!isScrolled && !isMenuOpen}
            className="transition-all duration-300"
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-[#0066ff] font-medium transition-colors">
              Home
            </Link>
            <Link href="/diagnostico" className="text-gray-700 hover:text-[#0066ff] font-medium transition-colors">
              Diagnóstico
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-[#0066ff] font-medium transition-colors">
              Sobre Nós
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#0066ff] font-medium transition-colors">
              Blog
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-[#0066ff] font-medium transition-colors">
              Contato
            </Link>
          </nav>

          {/* CTA Button and Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button className="bg-[#ff8c00] hover:bg-[#cc7000] text-white">Agendar Consultoria</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-[#0066ff] font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/diagnostico"
              className="block text-gray-700 hover:text-[#0066ff] font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Diagnóstico
            </Link>
            <Link
              href="/sobre"
              className="block text-gray-700 hover:text-[#0066ff] font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link
              href="/blog"
              className="block text-gray-700 hover:text-[#0066ff] font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contato"
              className="block text-gray-700 hover:text-[#0066ff] font-medium transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <div className="flex items-center justify-between pt-2">
              <LanguageSwitcher />
              <Button className="bg-[#ff8c00] hover:bg-[#cc7000] text-white" onClick={() => setIsMenuOpen(false)}>
                Agendar Consultoria
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
