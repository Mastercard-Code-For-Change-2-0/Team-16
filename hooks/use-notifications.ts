"use client"

import { useState, useEffect } from "react"
import { api, type Notification } from "@/lib/api"
import { useAuth } from "@/components/providers/auth-provider"
import { useSocket } from "@/components/providers/socket-provider"

export function useNotifications() {
  const { user } = useAuth()
  const { socket } = useSocket()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          const data = await api.getNotifications(user._id)
          setNotifications(data)
          setUnreadCount(data.filter((n) => !n.read).length)
          console.log("[v0] Fetched notifications:", data.length)
        } catch (err) {
          console.error("[v0] Error fetching notifications:", err)
        } finally {
          setLoading(false)
        }
      }

      fetchNotifications()
    }
  }, [user])

  useEffect(() => {
    if (socket) {
      socket.on("new-notification", (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev])
        setUnreadCount((prev) => prev + 1)
        console.log("[v0] New notification received:", notification.title)
      })
    }
  }, [socket])

  const markAsRead = async (notificationId: string) => {
    try {
      await api.markNotificationRead(notificationId)
      setNotifications((prev) => prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n)))
      setUnreadCount((prev) => Math.max(0, prev - 1))
      console.log("[v0] Marked notification as read:", notificationId)
    } catch (err) {
      console.error("[v0] Error marking notification as read:", err)
    }
  }

  const markAllAsRead = async () => {
    try {
      // In real app, would call API to mark all as read
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)
      console.log("[v0] Marked all notifications as read")
    } catch (err) {
      console.error("[v0] Error marking all notifications as read:", err)
    }
  }

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
  }
}
