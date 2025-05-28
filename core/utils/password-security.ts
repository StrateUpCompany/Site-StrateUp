import { randomBytes, pbkdf2Sync } from "crypto"

// Constants for password hashing
const ITERATIONS = 10000
const KEY_LENGTH = 64
const DIGEST = "sha512"
const SALT_LENGTH = 16

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH).toString("hex")
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex")
  return `${salt}:${hash}`
}

// Verify a password against a hash
export async function verifyPassword(storedHash: string, password: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(":")
  const calculatedHash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex")
  return hash === calculatedHash
}

// Validate password strength
export function validatePasswordStrength(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" }
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" }
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" }
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" }
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one special character" }
  }

  return { valid: true }
}

// Generate a secure random password
export function generateSecurePassword(length = 12): string {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
  const numberChars = "0123456789"
  const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?"

  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars

  // Ensure at least one of each type
  let password =
    uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)] +
    lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)] +
    numberChars[Math.floor(Math.random() * numberChars.length)] +
    specialChars[Math.floor(Math.random() * specialChars.length)]

  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("")
}
