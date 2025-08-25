"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { socketService, type SocketService } from "@/lib/api"
import { useAuth } from "./auth-provider"

interface SocketContextType {
  socket: SocketService | null
  connected: boolean
  onlineUsers: string[]
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const [connected, setConnected] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])

  useEffect(() => {
    if (isAuthenticated && user) {
      const token = localStorage.getItem("token")
      if (token) {
        socketService.connect(token)
        setConnected(true)

        // Listen for real-time events
        socketService.on("user-online", (userId: string) => {
          setOnlineUsers((prev) => [...prev, userId])
          console.log("[v0] User came online:", userId)
        })

        socketService.on("user-offline", (userId: string) => {
          setOnlineUsers((prev) => prev.filter((id) => id !== userId))
          console.log("[v0] User went offline:", userId)
        })

        socketService.on("new-message", (message: any) => {
          console.log("[v0] New message received:", message)
          // Handle new message notification
        })

        socketService.on("match-update", (match: any) => {
          console.log("[v0] Match update received:", match)
          // Handle match status updates
        })
      }
    } else {
      socketService.disconnect()
      setConnected(false)
      setOnlineUsers([])
    }

    return () => {
      socketService.disconnect()
    }
  }, [isAuthenticated, user])

  const value = {
    socket: socketService,
    connected,
    onlineUsers,
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}
