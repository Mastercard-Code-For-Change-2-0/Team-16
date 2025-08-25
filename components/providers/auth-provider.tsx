"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { api, type User } from "@/lib/api"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: Partial<User>) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem("token")
    if (token) {
      // In real MERN app, verify token with backend
      console.log("[v0] Token found, would verify with backend")
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await api.login(email, password)
      setUser(response.user)
      localStorage.setItem("token", response.token)
      console.log("[v0] User logged in:", response.user.name)
    } catch (error) {
      console.error("[v0] Login error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: Partial<User>) => {
    setLoading(true)
    try {
      const response = await api.register(userData)
      setUser(response.user)
      localStorage.setItem("token", response.token)
      console.log("[v0] User registered:", response.user.name)
    } catch (error) {
      console.error("[v0] Registration error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
    console.log("[v0] User logged out")
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
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
