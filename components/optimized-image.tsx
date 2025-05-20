"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  onLoad?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  sizes = "100vw",
  priority = false,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
    if (onLoad) onLoad()
  }

  // Generate blur data URL for placeholder if not provided
  const placeholderUrl =
    blurDataURL ||
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImcxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiNmMWYxZjEiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjZTBlMGUwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2cxKSIvPjwvc3ZnPg=="

  return (
    <div className={`relative ${className} ${isLoading ? "animate-pulse bg-gray-200" : ""}`}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={placeholderUrl}
        onLoad={handleLoad}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}`}
      />
    </div>
  )
}
