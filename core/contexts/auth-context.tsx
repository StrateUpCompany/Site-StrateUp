"use client"

import { createClientSupabaseClient } from "@/core/lib/supabase/client"
import type { User, Session } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true)

      // Get session from Supabase
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error("Error getting session:", error)
      } else if (session) {
        setSession(session)
        setUser(session.user)

        // Check if user is admin
        const { data: adminData } = await supabase.from("admin_users").select("role").eq("id", session.user.id).single()

        setIsAdmin(adminData?.role === "admin")
      }

      setIsLoading(false)
    }

    getSession()

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)

      if (session?.user) {
        const { data: adminData } = await supabase.from("admin_users").select("role").eq("id", session.user.id).single()

        setIsAdmin(adminData?.role === "admin")
      } else {
        setIsAdmin(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      // Use o cliente do lado do cliente para autenticação
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Login error:", error.message)
        return { success: false, error: error.message }
      }

      setSession(data.session)
      setUser(data.user)

      if (data.user) {
        const { data: adminData } = await supabase.from("admin_users").select("role").eq("id", data.user.id).single()

        setIsAdmin(adminData?.role === "admin")
      }

      return { success: true }
    } catch (error) {
      console.error("Unexpected login error:", error)
      return { success: false, error: "An unexpected error occurred during sign in" }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setIsAdmin(false)
  }

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signOut,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
