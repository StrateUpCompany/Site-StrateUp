// Function to sanitize user input to prevent XSS attacks
export function sanitizeInput(input: string | undefined | null): string {
  if (input === undefined || input === null) {
    return ""
  }

  return input
    .toString()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .trim()
}

// Function to validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Add an alias for validateEmail to maintain backward compatibility
export const isValidEmail = validateEmail

// Function to validate phone number format
export function validatePhone(phone: string): boolean {
  // Basic validation - can be enhanced for specific country formats
  const phoneRegex = /^\+?[0-9]{10,15}$/
  return phoneRegex.test(phone.replace(/[\s()-]/g, ""))
}

// Function to generate a secure random token
export function generateSecureToken(length = 32): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  const charactersLength = characters.length

  // Use crypto API if available for better randomness
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const values = new Uint32Array(length)
    window.crypto.getRandomValues(values)
    for (let i = 0; i < length; i++) {
      result += characters.charAt(values[i] % charactersLength)
    }
    return result
  }

  // Fallback to Math.random
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// Function to validate URL format
export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}
