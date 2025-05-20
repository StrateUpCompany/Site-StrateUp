class LanguageManager {
  constructor(defaultLang = "pt") {
    this.defaultLang = defaultLang
    this.currentLang = this.detectLanguage()
    this.translations = {}
    this.supportedLanguages = ["pt", "en", "es"]
  }

  async init() {
    await this.loadTranslations()
    this.setupEventListeners()
    return this
  }

  detectLanguage() {
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search)
    const langParam = urlParams.get("lang")

    if (langParam && this.supportedLanguages.includes(langParam)) {
      localStorage.setItem("preferredLanguage", langParam)
      return langParam
    }

    // Check localStorage
    const storedLang = localStorage.getItem("preferredLanguage")
    if (storedLang && this.supportedLanguages.includes(storedLang)) return storedLang

    // Check browser language
    const browserLang = navigator.language.split("-")[0]
    if (this.supportedLanguages.includes(browserLang)) return browserLang

    return this.defaultLang
  }

  async loadTranslations() {
    try {
      // In a real implementation, this would be a dynamic import
      // For simplicity in this example, we'll simulate loading translations
      const response = await fetch(`/translations/${this.currentLang}.js`)
      if (!response.ok) throw new Error("Failed to load translations")

      const text = await response.text()
      // Extract the JSON part from the module
      const jsonText = text.replace(/const \w+ = /, "").replace(/;[\s\n]*export default \w+;?/, "")
      this.translations = JSON.parse(jsonText)

      this.applyTranslations()
      return this.translations
    } catch (error) {
      console.error("Failed to load translations:", error)
      // Fallback to default language
      if (this.currentLang !== this.defaultLang) {
        this.currentLang = this.defaultLang
        return this.loadTranslations()
      }
      return {}
    }
  }

  setupEventListeners() {
    // Listen for language change events from language selector
    document.addEventListener("click", (event) => {
      const langOption = event.target.closest(".lang-option")
      if (langOption) {
        const lang = langOption.getAttribute("data-lang")
        if (lang) {
          event.preventDefault()
          this.switchLanguage(lang)
        }
      }
    })
  }

  switchLanguage(lang) {
    if (this.currentLang === lang || !this.supportedLanguages.includes(lang)) return

    this.currentLang = lang
    localStorage.setItem("preferredLanguage", lang)

    // Update URL parameter without page reload
    const url = new URL(window.location)
    url.searchParams.set("lang", lang)
    window.history.pushState({}, "", url)

    this.loadTranslations()
  }

  translate(key) {
    const keys = key.split(".")
    let result = this.translations

    for (const k of keys) {
      if (!result || !result[k]) return key // Return key if translation not found
      result = result[k]
    }

    return result
  }

  applyTranslations() {
    // Find all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n")
      const translation = this.translate(key)

      if (translation !== key) {
        element.textContent = translation
      }
    })

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang

    // Update language selector UI
    document.querySelectorAll(".lang-option").forEach((option) => {
      const isActive = option.getAttribute("data-lang") === this.currentLang
      option.classList.toggle("active", isActive)
      if (isActive) {
        const langDisplay = document.querySelector(".current-lang")
        if (langDisplay) {
          langDisplay.textContent = this.currentLang.toUpperCase()
        }
      }
    })

    // Dispatch event for components that need to react to language changes
    window.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: { language: this.currentLang },
      }),
    )
  }

  formatDate(date, options = {}) {
    return new Intl.DateTimeFormat(this.currentLang, options).format(date)
  }

  formatNumber(number, options = {}) {
    return new Intl.NumberFormat(this.currentLang, options).format(number)
  }

  formatCurrency(amount, currency = "BRL") {
    return new Intl.NumberFormat(this.currentLang, {
      style: "currency",
      currency: currency,
    }).format(amount)
  }
}

export default LanguageManager
