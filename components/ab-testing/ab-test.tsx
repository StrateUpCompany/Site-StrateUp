"use client"

import { useState, useEffect, type ReactNode } from "react"

interface ABTestProps {
  variants: {
    id: string
    component: ReactNode
    weight?: number
  }[]
  onVariantSelected?: (variantId: string) => void
}

export default function ABTest({ variants, onVariantSelected }: ABTestProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)

  useEffect(() => {
    // Check if a variant has already been selected for this user
    const storedVariant = localStorage.getItem("ab_test_variant")

    if (storedVariant && variants.some((v) => v.id === storedVariant)) {
      setSelectedVariant(storedVariant)
      onVariantSelected?.(storedVariant)
      return
    }

    // Select a variant based on weights
    const totalWeight = variants.reduce((sum, variant) => sum + (variant.weight || 1), 0)
    let random = Math.random() * totalWeight
    let selectedId = variants[0].id

    for (const variant of variants) {
      const weight = variant.weight || 1
      if (random < weight) {
        selectedId = variant.id
        break
      }
      random -= weight
    }

    // Store the selected variant
    localStorage.setItem("ab_test_variant", selectedId)
    setSelectedVariant(selectedId)
    onVariantSelected?.(selectedId)
  }, [variants, onVariantSelected])

  if (!selectedVariant) return null

  const variant = variants.find((v) => v.id === selectedVariant)
  return <>{variant?.component}</>
}
