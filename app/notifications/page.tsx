"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProtectedRoute } from "@/components/ui/protected-route"
import {
  Heart,
  ArrowLeft,
  Bell,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Gift,
  Settings,
  Trash2,
  MapPinnedIcon as MarkAsUnreadIcon,
} from "lucide-react"
import Link from "next/link"
import { useNotifications } from "@/hooks/use-notifications"

const notificationIcons = {
  match: CheckCircle,
  message: MessageSquare,
  approval: Gift,
  system: AlertCircle,
}

const notificationColors = {
  match: "text-green-600",
  message: "text-blue-600",
  approval: "text-purple-600",
  system: "text-orange-600",
}

export default function NotificationsPage() {
  const { notifications, loading, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedTab === "all") return true
    if (selectedTab === "unread") return !notification.read
    return notification.type === selectedTab
  })

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification._id)
    }
    if (notification.actionUrl) {
      // In a real app, this would navigate to the action URL
      console.log("[v0] Navigate to:", notification.actionUrl)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <div className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-primary" />
                  <span className="font-playfair font-bold text-xl">Notifications</span>
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    Mark All Read
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="font-playfair font-bold text-2xl text-foreground mb-2">Your Notifications</h1>
              <p className="text-muted-foreground">Stay updated with your donation activities and matches</p>
            </div>

            <Card>
              <CardHeader>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all" className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      All
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="flex items-center gap-2">
                      <MarkAsUnreadIcon className="h-4 w-4" />
                      Unread
                      {unreadCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="ml-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="match" className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Matches
                    </TabsTrigger>
                    <TabsTrigger value="message" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Messages
                    </TabsTrigger>
                    <TabsTrigger value="system" className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      System
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  {loading ? (
                    <div className="p-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading notifications...</p>
                    </div>
                  ) : filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="font-semibold text-lg mb-2">No notifications</h3>
                      <p className="text-muted-foreground">
                        {selectedTab === "unread" ? "You're all caught up!" : "No notifications in this category yet."}
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredNotifications.map((notification) => {
                        const IconComponent = notificationIcons[notification.type as keyof typeof notificationIcons]
                        const iconColor = notificationColors[notification.type as keyof typeof notificationColors]

                        return (
                          <div
                            key={notification._id}
                            className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                              !notification.read ? "bg-muted/30" : ""
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="flex items-start space-x-4">
                              <div className={`p-2 rounded-full bg-muted ${iconColor}`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h3 className={`font-medium text-sm ${!notification.read ? "font-semibold" : ""}`}>
                                    {notification.title}
                                  </h3>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(notification.createdAt).toLocaleDateString()}
                                    </span>
                                    {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                                <div className="flex items-center justify-between">
                                  <Badge variant="secondary" className="text-xs">
                                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                  </Badge>
                                  <div className="flex items-center space-x-2">
                                    {notification.actionUrl && (
                                      <Button variant="ghost" size="sm" className="text-xs">
                                        View Details
                                      </Button>
                                    )}
                                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
