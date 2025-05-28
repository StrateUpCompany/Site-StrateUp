"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormValidation } from '@/core/hooks/use-form-validation'
import { Loading } from '@/components/shared/loading'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/core/utils'

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { errors, validateForm, clearErrors } = useFormValidation()

  const validationRules = {
    name: { required: true, minLength: 3 },
    email: { required: true, email: true },
    phone: { required: true, pattern: /^\(\d{2}\) \d{5}-\d{4}$/ },
    company: { required: true, minLength: 2 },
    message: { required: true, minLength: 10 }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    clearErrors()
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const isValid = validateForm(formData, validationRules)
      if (!isValid) {
        throw new Error('Por favor, preencha todos os campos corretamente')
      }

      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      })
    } catch (err) {
      console.error('Erro ao enviar formulário:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome"
              className={cn(
                "w-full",
                errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
              disabled={isSubmitting || success}
            />
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Seu melhor e-mail"
              className={cn(
                "w-full",
                errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
              disabled={isSubmitting || success}
            />
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const formatted = formatPhone(e.target.value)
                handleChange({ ...e, target: { ...e.target, value: formatted } })
              }}
              placeholder="(00) 00000-0000"
              className={cn(
                "w-full",
                errors.phone && "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
              disabled={isSubmitting || success}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.phone}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nome da empresa"
              className={cn(
                "w-full",
                errors.company && "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
              disabled={isSubmitting || success}
            />
            {errors.company && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.company}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Como podemos ajudar?"
            className={cn(
              "w-full min-h-[120px]",
              errors.message && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            disabled={isSubmitting || success}
          />
          {errors.message && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || success}
          className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white"
        >
          {isSubmitting ? (
            <Loading size="sm" variant="primary" />
          ) : success ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Mensagem Enviada!
            </div>
          ) : (
            'Enviar Mensagem'
          )}
        </Button>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-green-600"
            >
              <p>Obrigado pelo contato! Retornaremos em breve.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
} 