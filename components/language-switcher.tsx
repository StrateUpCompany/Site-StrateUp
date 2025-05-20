"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languages = [
  { code: "pt-BR", name: "Português" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
]

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [currentLang, setCurrentLang] = useState("pt-BR")

  useEffect(() => {
    // In a real implementation, this would get the language from cookies or localStorage
    const savedLang = localStorage.getItem("language") || "pt-BR"
    setCurrentLang(savedLang)
  }, [])

  const handleLanguageChange = (langCode: string) => {
    // In a real implementation, this would:
    // 1. Set a cookie or localStorage value
    // 2. Redirect to the translated version of the current page
    localStorage.setItem("language", langCode)
    setCurrentLang(langCode)

    // Example of how you might handle language-specific routing
    // router.push(`/${langCode}${pathname}`)

    // For now, we'll just reload the page to simulate a language change
    // window.location.reload()

    // Track language change in analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "language_change", {
        language: langCode,
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">{languages.find((l) => l.code === currentLang)?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={currentLang === lang.code ? "bg-gray-100 font-medium" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
