"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, MessageSquare } from "lucide-react"
import { useSocket } from "@/components/providers/socket-provider"

interface MessageToastProps {
  message: {
    id: string
    sender: {
      name: string
      avatar?: string
    }
    content: string
    timestamp: string
  }
  onClose: () => void
  onView: () => void
}

export function MessageToast({ message, onClose, onView }: MessageToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-lg animate-in slide-in-from-bottom-2">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
            <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-sm">{message.sender.name}</h4>
              <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <Button variant="ghost" size="sm" onClick={onView} className="text-xs">
                <MessageSquare className="h-3 w-3 mr-1" />
                Reply
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MessageToastProvider({ children }: { children: React.ReactNode }) {
  const { socket } = useSocket()
  const [toasts, setToasts] = useState<any[]>([])

  useEffect(() => {
    if (socket) {
      socket.on("new-message", (message: any) => {
        const toast = {
          id: `toast_${Date.now()}`,
          sender: message.sender,
          content: message.content,
          timestamp: message.timestamp,
        }
        setToasts((prev) => [...prev, toast])
        console.log("[v0] New message toast:", message.content)
      })
    }
  }, [socket])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const handleViewMessage = (toast: any) => {
    // Navigate to messages page
    window.location.href = "/messages"
    removeToast(toast.id)
  }

  return (
    <>
      {children}
      {toasts.map((toast) => (
        <MessageToast
          key={toast.id}
          message={toast}
          onClose={() => removeToast(toast.id)}
          onView={() => handleViewMessage(toast)}
        />
      ))}
    </>
  )
}
