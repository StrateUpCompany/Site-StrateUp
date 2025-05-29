import type React from "react"
import { AuthProvider } from "@/core/contexts/auth-context"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </AuthProvider>
  )
}
