import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface Translations {
  [key: string]: string
}

export function useTranslations() {
  const [translations, setTranslations] = useState<Translations>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Obtém o idioma do localStorage ou usa pt-BR como padrão
        const savedLang = localStorage.getItem('language') || 'pt-BR'
        
        // Carrega as traduções usando import dinâmico
        const module = await import(`@/public/translations/${savedLang}.js`)
        const translations = module.default
        
        setTranslations(translations)
        document.documentElement.lang = savedLang
      } catch (err) {
        console.error('[TranslationService] Erro ao carregar traduções:', err)
        setError('Erro ao carregar traduções')
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [pathname])

  const t = (key: string): string => {
    return translations[key] || key
  }

  const changeLanguage = async (lang: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Salva a preferência no localStorage
      localStorage.setItem('language', lang)
      
      // Carrega as novas traduções
      const module = await import(`@/public/translations/${lang}.js`)
      const translations = module.default
      
      setTranslations(translations)
      document.documentElement.lang = lang
      
      // Rastreia a mudança de idioma no analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'language_change', {
          language: lang
        })
      }
    } catch (err) {
      console.error('[TranslationService] Erro ao mudar idioma:', err)
      setError('Erro ao mudar idioma')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    t,
    changeLanguage,
    isLoading,
    error
  }
} 