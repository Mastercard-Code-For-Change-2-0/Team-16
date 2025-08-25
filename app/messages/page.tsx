"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ProtectedRoute } from "@/components/ui/protected-route"
import { NotificationBell } from "@/components/ui/notification-bell"
import {
  Heart,
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  ArrowLeft,
  Circle,
  CheckCheck,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"
import { useSocket } from "@/components/providers/socket-provider"

// Mock conversation data
const mockConversations = [
  {
    id: "conv1",
    participant: {
      id: "user2",
      name: "Priya Sharma",
      avatar: "/professional-woman.png",
      organization: "Hope Foundation",
      online: true,
    },
    lastMessage: {
      content: "Thank you for the book donation! When can we arrange pickup?",
      timestamp: "2024-01-22T14:30:00Z",
      sender: "user2",
      read: false,
    },
    unreadCount: 2,
  },
  {
    id: "conv2",
    participant: {
      id: "user3",
      name: "Rajesh Kumar",
      avatar: "/professional-man.png",
      organization: "City Homeless Shelter",
      online: false,
    },
    lastMessage: {
      content: "The winter clothes are perfect for our shelter residents.",
      timestamp: "2024-01-22T10:15:00Z",
      sender: "user3",
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: "conv3",
    participant: {
      id: "admin1",
      name: "Admin Support",
      avatar: "/support-admin.png",
      organization: "DonateLink Team",
      online: true,
    },
    lastMessage: {
      content: "Your donation has been approved and is now live!",
      timestamp: "2024-01-21T16:45:00Z",
      sender: "admin1",
      read: true,
    },
    unreadCount: 0,
  },
]

const mockMessages = [
  {
    id: "msg1",
    content: "Hi! I'm interested in your book donation for our tribal school.",
    sender: "user2",
    timestamp: "2024-01-22T14:00:00Z",
    read: true,
  },
  {
    id: "msg2",
    content:
      "That's wonderful! We have about 50 educational books suitable for primary grades. Are these what you need?",
    sender: "user1",
    timestamp: "2024-01-22T14:05:00Z",
    read: true,
  },
  {
    id: "msg3",
    content: "Yes, exactly what we need! Our children will be so happy. How should we proceed?",
    sender: "user2",
    timestamp: "2024-01-22T14:10:00Z",
    read: true,
  },
  {
    id: "msg4",
    content: "Great! I can arrange for pickup this weekend. What's the best time for your organization?",
    sender: "user1",
    timestamp: "2024-01-22T14:15:00Z",
    read: true,
  },
  {
    id: "msg5",
    content: "Thank you for the book donation! When can we arrange pickup?",
    sender: "user2",
    timestamp: "2024-01-22T14:30:00Z",
    read: false,
  },
]

export default function MessagesPage() {
  const { user } = useAuth()
  const { socket, connected } = useSocket()
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (socket && connected) {
      socket.on("new-message", (message: any) => {
        setMessages((prev) => [...prev, message])
        console.log("[v0] New message received via socket:", message.content)
      })
    }
  }, [socket, connected])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: `msg_${Date.now()}`,
      content: newMessage,
      sender: user?._id || "user1",
      timestamp: new Date().toISOString(),
      read: false,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate sending via socket
    if (socket) {
      socket.emit("send-message", {
        receiverId: selectedConversation.participant.id,
        content: newMessage,
      })
    }

    console.log("[v0] Message sent:", newMessage)
  }

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.participant.organization.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
                  <span className="font-playfair font-bold text-xl">Messages</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Circle
                    className={`h-2 w-2 ${connected ? "fill-green-500 text-green-500" : "fill-gray-400 text-gray-400"}`}
                  />
                  <span className="text-sm text-muted-foreground">{connected ? "Online" : "Offline"}</span>
                </div>
                <NotificationBell />
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair">Conversations</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b ${
                        selectedConversation.id === conversation.id ? "bg-muted/50" : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.participant.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.participant.online && (
                            <Circle className="absolute -bottom-1 -right-1 h-3 w-3 fill-green-500 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-sm truncate">{conversation.participant.name}</h3>
                            <span className="text-xs text-muted-foreground">
                              {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{conversation.participant.organization}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate flex-1">
                              {conversation.lastMessage.content}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <Badge
                                variant="destructive"
                                className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                              >
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2 flex flex-col">
              {/* Chat Header */}
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={selectedConversation.participant.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedConversation.participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selectedConversation.participant.online && (
                        <Circle className="absolute -bottom-1 -right-1 h-3 w-3 fill-green-500 text-green-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedConversation.participant.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedConversation.participant.organization}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <Separator />

              {/* Messages */}
              <CardContent className="flex-1 p-4">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === user?._id ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.sender === user?._id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-end mt-1 space-x-1">
                            <span className="text-xs opacity-70">
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {message.sender === user?._id && (
                              <CheckCheck className={`h-3 w-3 ${message.read ? "text-blue-400" : "opacity-50"}`} />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <Separator />

              {/* Message Input */}
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="pr-10"
                    />
                    <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
