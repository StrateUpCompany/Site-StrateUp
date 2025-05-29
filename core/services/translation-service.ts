import { TranslationSchema, LanguageCode, TranslationCache, TranslationConfig } from '@/core/types/translations'

class TranslationService {
  private static instance: TranslationService
  private cache: TranslationCache = {}
  private config: TranslationConfig = {
    defaultLanguage: 'pt-BR',
    fallbackLanguage: 'pt-BR',
    supportedLanguages: ['pt-BR', 'en', 'es'],
    cacheEnabled: true,
    preloadLanguages: ['pt-BR', 'en']
  }

  private constructor() {
    this.initializeCache()
    this.preloadLanguages()
  }

  public static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService()
    }
    return TranslationService.instance
  }

  private async initializeCache() {
    if (typeof window !== 'undefined') {
      const savedCache = localStorage.getItem('translationCache')
      if (savedCache) {
        try {
          this.cache = JSON.parse(savedCache)
        } catch (error) {
          console.error('Erro ao carregar cache de traduções:', error)
          this.cache = {}
        }
      }
    }
  }

  private async preloadLanguages() {
    if (this.config.preloadLanguages) {
      await Promise.all(
        this.config.preloadLanguages.map(lang => this.loadTranslation(lang))
      )
    }
  }

  private async loadTranslation(lang: LanguageCode): Promise<TranslationSchema> {
    try {
      console.log(`[TranslationService] Carregando traduções para ${lang}`)
      
      // Verifica cache primeiro
      if (this.cache[lang]) {
        console.log(`[TranslationService] Traduções para ${lang} encontradas no cache`)
        return this.cache[lang]
      }

      // Carrega do arquivo
      const response = await fetch(`/translations/${lang}.js`)
      if (!response.ok) {
        throw new Error(`Erro ao carregar traduções para ${lang}: ${response.statusText}`)
      }

      const text = await response.text()
      const translations = this.parseTranslationFile(text)

      // Valida estrutura
      this.validateTranslationSchema(translations)

      // Salva no cache
      if (this.config.cacheEnabled) {
        this.cache[lang] = translations
        this.saveCache()
      }

      console.log(`[TranslationService] Traduções para ${lang} carregadas com sucesso`)
      return translations
    } catch (error) {
      console.error(`[TranslationService] Erro ao carregar traduções para ${lang}:`, error)
      // Retorna traduções do idioma padrão em caso de erro
      return this.loadTranslation(this.config.fallbackLanguage)
    }
  }

  private parseTranslationFile(text: string): TranslationSchema {
    try {
      // Remove a parte de exportação do arquivo
      const jsonStr = text.replace('export default ', '')
      return JSON.parse(jsonStr)
    } catch (error) {
      console.error('[TranslationService] Erro ao fazer parse das traduções:', error)
      throw new Error('Formato de arquivo de tradução inválido')
    }
  }

  private validateTranslationSchema(translations: any): asserts translations is TranslationSchema {
    // Implementar validação completa do schema
    if (!translations.common || !translations.home || !translations.blog || !translations.footer) {
      throw new Error('Schema de tradução inválido')
    }
  }

  private saveCache() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('translationCache', JSON.stringify(this.cache))
      } catch (error) {
        console.error('[TranslationService] Erro ao salvar cache:', error)
      }
    }
  }

  public async getTranslation(lang: LanguageCode): Promise<TranslationSchema> {
    return this.loadTranslation(lang)
  }

  public getCachedTranslation(lang: LanguageCode): TranslationSchema | null {
    return this.cache[lang] || null
  }

  public clearCache() {
    this.cache = {}
    if (typeof window !== 'undefined') {
      localStorage.removeItem('translationCache')
    }
  }

  public getConfig(): TranslationConfig {
    return { ...this.config }
  }

  public updateConfig(newConfig: Partial<TranslationConfig>) {
    this.config = { ...this.config, ...newConfig }
  }
}

export const translationService = TranslationService.getInstance() 