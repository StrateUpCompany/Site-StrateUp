// Check if we're in a browser environment
if (typeof window !== "undefined") {
  // Safe import for browser environments
  let LanguageManager

  try {
    // Try to import as ES module
    import("./i18n/language-manager.js")
      .then((module) => {
        LanguageManager = module.default
        initializeApp()
      })
      .catch((error) => {
        console.error("Error importing language manager:", error)
        // Fallback to global variable if available
        if (window.LanguageManager) {
          LanguageManager = window.LanguageManager
          initializeApp()
        } else {
          console.error("Language manager not available")
        }
      })
  } catch (error) {
    // Fallback for environments that don't support dynamic imports
    console.error("Dynamic import not supported:", error)

    // Check if LanguageManager is available globally
    if (window.LanguageManager) {
      LanguageManager = window.LanguageManager
      initializeApp()
    } else {
      console.error("Language manager not available")
    }
  }

  // Main initialization function
  function initializeApp() {
    document.addEventListener("DOMContentLoaded", async () => {
      try {
        // Initialize language manager
        const languageManager = new LanguageManager()
        await languageManager.init()

        // Make it globally available
        window.languageManager = languageManager

        // Initialize other functionality
        initializeChat()
        setupSmoothScrolling()
        setupAnimations()

        console.log("Application initialized successfully")
      } catch (error) {
        console.error("Error initializing application:", error)
      }
    })
  }

  // Chat functionality
  function initializeChat() {
    const chatForm = document.getElementById("chat-form")
    const chatInput = document.getElementById("chat-input")
    const chatMessages = document.getElementById("chat-messages")

    if (!chatForm || !chatInput || !chatMessages) {
      console.log("Chat elements not found, skipping chat initialization")
      return
    }

    chatForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const message = chatInput.value.trim()
      if (!message) return

      // Add user message
      addMessage(message, "user")
      chatInput.value = ""

      // Simulate bot response after a short delay
      setTimeout(() => {
        // Get responses based on current language
        const responses = getLocalizedChatResponses()
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        addMessage(randomResponse, "bot")
      }, 1000)
    })

    function addMessage(text, sender) {
      const messageDiv = document.createElement("div")
      messageDiv.className = "flex items-start mb-4"

      if (sender === "user") {
        messageDiv.innerHTML = `
          <div class="ml-auto bg-gray-200 rounded-lg py-2 px-3 max-w-[80%]">
            <p>${escapeHtml(text)}</p>
          </div>
        `
      } else {
        messageDiv.innerHTML = `
          <div class="bg-primary text-white rounded-lg py-2 px-3 mr-4 max-w-[80%]">
            <p>${escapeHtml(text)}</p>
          </div>
        `
      }

      chatMessages.appendChild(messageDiv)
      chatMessages.scrollTop = chatMessages.scrollHeight
    }

    function getLocalizedChatResponses() {
      const lang = window.languageManager?.currentLang || "pt"

      const responses = {
        pt: [
          "Obrigado pelo seu contato! Um de nossos consultores entrará em contato em breve.",
          "Que tal fazer nosso diagnóstico gratuito? Você pode acessá-lo em nossa página de diagnóstico.",
          "Interessante! Podemos agendar uma consultoria para discutir isso em mais detalhes.",
          "Temos várias soluções que podem ajudar com isso. Gostaria de agendar uma demonstração?",
          "Entendi sua necessidade. Vamos analisar as melhores estratégias para o seu caso específico.",
        ],
        en: [
          "Thank you for your message! One of our consultants will contact you soon.",
          "How about taking our free diagnostic? You can access it on our diagnostic page.",
          "Interesting! We can schedule a consultation to discuss this in more detail.",
          "We have several solutions that can help with this. Would you like to schedule a demo?",
          "I understand your need. Let's analyze the best strategies for your specific case.",
        ],
        es: [
          "¡Gracias por tu mensaje! Uno de nuestros consultores se pondrá en contacto contigo pronto.",
          "¿Qué tal hacer nuestro diagnóstico gratuito? Puedes acceder a él en nuestra página de diagnóstico.",
          "¡Interesante! Podemos programar una consultoría para discutir esto con más detalle.",
          "Tenemos varias soluciones que pueden ayudar con esto. ¿Te gustaría programar una demostración?",
          "Entiendo tu necesidad. Vamos a analizar las mejores estrategias para tu caso específico.",
        ],
      }

      return responses[lang] || responses.pt
    }
  }

  // Helper function to escape HTML
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  // Smooth scrolling for anchor links
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        if (targetId === "#") return

        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      })
    })
  }

  // Animations with Intersection Observer
  function setupAnimations() {
    // Only set up if IntersectionObserver is available
    if ("IntersectionObserver" in window) {
      const elements = document.querySelectorAll(".animate-on-scroll")

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fadeIn")
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.1,
        },
      )

      elements.forEach((element) => {
        observer.observe(element)
      })
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      document.querySelectorAll(".animate-on-scroll").forEach((element) => {
        element.classList.add("animate-fadeIn")
      })
    }
  }

  // Mobile menu toggle
  function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu")
    if (mobileMenu) {
      mobileMenu.classList.toggle("hidden")
    }
  }

  // Expose function to global scope for HTML onclick
  window.toggleMobileMenu = toggleMobileMenu
}
