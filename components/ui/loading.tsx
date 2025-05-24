"use client"

import { cn } from "@/lib/utils"

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary'
  className?: string
}

export function Loading({ size = 'md', variant = 'default', className }: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  const variantClasses = {
    default: 'border-gray-300',
    primary: 'border-[#0066ff] border-t-transparent'
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2",
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loading size="lg" variant="primary" />
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        </div>
      </div>
    </div>
  )
} 