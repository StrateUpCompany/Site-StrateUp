export interface TranslationSchema {
  common: {
    home: string
    services: string
    diagnostic: string
    blog: string
    about: string
    contact: string
    language: string
  }
  home: {
    hero: {
      title: string
      subtitle: string
      cta: {
        primary: string
        secondary: string
      }
    }
    benefits: {
      title: string
      item1: {
        title: string
        description: string
      }
      item2: {
        title: string
        description: string
      }
      item3: {
        title: string
        description: string
      }
    }
    howitworks: {
      title: string
      step1: {
        title: string
        description: string
      }
      step2: {
        title: string
        description: string
      }
      step3: {
        title: string
        description: string
      }
      step4: {
        title: string
        description: string
      }
      cta: string
    }
    testimonials: {
      title: string
      testimonial1: string
      testimonial2: string
      testimonial3: string
    }
    cta: {
      title: string
      description: string
      primary: string
      secondary: string
    }
  }
  blog: {
    title: string
    description: string
    searchPlaceholder: string
    recentPosts: string
    categories: string
    popularPosts: string
    newsletter: {
      title: string
      description: string
      placeholder: string
      button: string
    }
  }
  footer: {
    about: string
    services: {
      title: string
      strategy: string
      marketing: string
      analytics: string
      consulting: string
    }
    company: {
      title: string
      about: string
      blog: string
      contact: string
      careers: string
    }
    contact: {
      title: string
      newsletterLabel: string
      newsletterPlaceholder: string
      subscribeLabel: string
    }
    copyright: string
    privacy: string
    terms: string
  }
}

export type LanguageCode = 'pt-BR' | 'en' | 'es'

export interface TranslationCache {
  [key: string]: TranslationSchema
}

export interface TranslationConfig {
  defaultLanguage: LanguageCode
  fallbackLanguage: LanguageCode
  supportedLanguages: LanguageCode[]
  cacheEnabled: boolean
  preloadLanguages: LanguageCode[]
} 