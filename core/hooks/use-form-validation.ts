import { useState, useCallback } from 'react'

interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  email?: boolean
  custom?: (value: string) => boolean
}

interface ValidationErrors {
  [key: string]: string
}

export function useFormValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isValid, setIsValid] = useState(true)

  const validateField = useCallback((value: string, rules: ValidationRules, fieldName: string) => {
    if (rules.required && !value) {
      return 'Este campo é obrigatório'
    }

    if (value) {
      if (rules.minLength && value.length < rules.minLength) {
        return `Mínimo de ${rules.minLength} caracteres`
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return `Máximo de ${rules.maxLength} caracteres`
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return 'Formato inválido'
      }

      if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Email inválido'
      }

      if (rules.custom && !rules.custom(value)) {
        return 'Valor inválido'
      }
    }

    return ''
  }, [])

  const validateForm = useCallback((values: { [key: string]: string }, rules: { [key: string]: ValidationRules }) => {
    const newErrors: ValidationErrors = {}
    let formIsValid = true

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(values[fieldName], rules[fieldName], fieldName)
      if (error) {
        newErrors[fieldName] = error
        formIsValid = false
      }
    })

    setErrors(newErrors)
    setIsValid(formIsValid)
    return formIsValid
  }, [validateField])

  const clearErrors = useCallback(() => {
    setErrors({})
    setIsValid(true)
  }, [])

  return {
    errors,
    isValid,
    validateForm,
    validateField,
    clearErrors
  }
} 