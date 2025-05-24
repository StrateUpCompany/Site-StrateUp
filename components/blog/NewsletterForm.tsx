"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react'
import { useFormValidation } from '@/hooks/use-form-validation'
import { Loading } from '@/components/ui/loading'
import { cn } from '@/lib/utils'

interface NewsletterFormProps {
  placeholder?: string
  buttonText?: string
}

export function NewsletterForm({
  placeholder = 'Seu melhor e-mail',
  buttonText = 'Inscrever-se'
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const controls = useAnimation()
  const { errors, validateField, clearErrors } = useFormValidation()

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        await controls.start({
          scale: 1.02,
          transition: { duration: 0.3 }
        })
        await controls.start({
          scale: 1,
          transition: { duration: 0.3 }
        })
        
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        await controls.start({
          y: -2,
          transition: { duration: 0.2 }
        })
        await controls.start({
          y: 0,
          transition: { duration: 0.2 }
        })
      }
    }

    sequence()
  }, [controls])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()
    setIsSubmitting(true)

    try {
      const emailError = validateField(email, { 
        required: true, 
        email: true 
      }, 'email')

      if (emailError) {
        throw new Error(emailError)
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(true)
      setEmail('')
    } catch (err) {
      console.error('Erro ao enviar newsletter:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <motion.div
            animate={controls}
            className="relative"
          >
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                clearErrors()
              }}
              placeholder={placeholder}
              className={cn(
                "w-full pl-12 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder-white/70",
                "focus:bg-white/20 focus:border-white/30 focus:ring-2 focus:ring-white/30",
                errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"
              )}
              disabled={isSubmitting || success}
            />
          </motion.div>
          
          <motion.div
            animate={controls}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-3"
          >
            <Button
              type="submit"
              disabled={isSubmitting || success}
              className="w-full bg-white text-[#0066ff] hover:bg-gray-100 transition-colors duration-200"
            >
              {isSubmitting ? (
                <Loading size="sm" variant="primary" />
              ) : success ? (
                <CheckCircle2 className="h-5 w-5 mr-2" />
              ) : (
                buttonText
              )}
            </Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {errors.email && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-red-300 text-sm"
            >
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-green-300 text-sm"
            >
              <CheckCircle2 className="h-4 w-4" />
              Inscrição realizada com sucesso!
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
} 