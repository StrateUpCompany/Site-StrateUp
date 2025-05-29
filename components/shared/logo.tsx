import Image from "next/image"
import Link from "next/link"
import { cn } from "@/core/utils"

export type LogoVariant = "default" | "white" | "small" | "footer"

interface LogoProps {
  variant?: LogoVariant
  className?: string
  withTagline?: boolean
}

export default function Logo({ variant = "default", className = "", withTagline = false }: LogoProps) {
  // Determine logo source based on variant
  const logoSrc =
    variant === "white"
      ? "/images/logo-white.png"
      : variant === "footer"
        ? "/images/logo-footer.png"
        : "/images/logo.png"

  // Set dimensions based on variant
  const width = variant === "small" ? 140 : variant === "footer" ? 160 : 180
  const height = variant === "small" ? 40 : variant === "footer" ? 45 : 50

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <Link href="/" className="block">
        <Image
          src={logoSrc || "/placeholder.svg"}
          alt="StrateUp Logo"
          width={width}
          height={height}
          className="h-auto w-auto"
          priority
        />
      </Link>

      {withTagline && (
        <p
          className={cn(
            "text-xs mt-2 font-medium",
            variant === "white" || variant === "footer" ? "text-gray-200" : "text-gray-600",
          )}
        >
          Transformando estratégias em resultados
        </p>
      )}
    </div>
  )
}
