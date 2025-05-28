"use client"

import { useState } from 'react'
import { useTranslations } from '@/core/hooks/use-translations'
import { LanguageCode } from '@/core/types/translations'
import { motion, AnimatePresence } from 'framer-motion'

const languages: { code: LanguageCode; name: string; flag: string }[] = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
]

export function LanguageSwitcher() {
  const { currentLang, changeLanguage, isLoading, error } = useTranslations()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = async (lang: LanguageCode) => {
    if (lang === currentLang || isLoading) return
    await changeLanguage(lang)
    setIsOpen(false)
  }

  const currentLanguage = languages.find(lang => lang.code === currentLang)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        disabled={isLoading}
      >
        <span className="text-xl">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium">{currentLanguage?.name}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  disabled={isLoading || lang.code === currentLang}
                  className={`
                    w-full px-4 py-2 text-left text-sm
                    ${lang.code === currentLang ? 'bg-gray-100' : 'hover:bg-gray-50'}
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                    flex items-center space-x-2
                  `}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {isLoading && lang.code === currentLang && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="ml-2"
                    >
                      ⟳
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="absolute top-full mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
