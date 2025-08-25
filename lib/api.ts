// This simulates backend API calls that would connect to Express.js + MongoDB

// Types for MERN stack data structures
export interface User {
  _id: string
  name: string
  email: string
  role: "donor" | "receiver" | "admin"
  phone?: string
  address?: string
  organization?: string
  verified: boolean
  createdAt: string
  updatedAt: string
}

export interface Donation {
  _id: string
  title: string
  description: string
  category: string
  condition: "new" | "good" | "fair" | "poor"
  quantity: number
  images: string[]
  donor: User
  location: {
    city: string
    state: string
    pincode: string
  }
  status: "available" | "matched" | "completed" | "cancelled"
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Request {
  _id: string
  title: string
  description: string
  category: string
  urgency: "low" | "medium" | "high" | "critical"
  quantity: number
  requester: User
  location: {
    city: string
    state: string
    pincode: string
  }
  status: "open" | "matched" | "fulfilled" | "closed"
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Match {
  _id: string
  donation: Donation
  request: Request
  status: "pending" | "approved" | "rejected" | "completed"
  adminNotes?: string
  createdAt: string
  updatedAt: string
}

export interface Message {
  _id: string
  sender: User
  receiver: User
  content: string
  type: "text" | "image" | "file"
  read: boolean
  createdAt: string
}

export interface Notification {
  _id: string
  user: User
  title: string
  message: string
  type: "match" | "message" | "approval" | "system"
  read: boolean
  actionUrl?: string
  createdAt: string
}

// Simulated API functions (would connect to Express.js backend)
export const api = {
  // Authentication
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Call actual API endpoint
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Login failed")
    }

    const data = await response.json()
    return data
  },

  async register(userData: Partial<User>): Promise<{ user: User; token: string }> {
    // Call actual API endpoint
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Registration failed")
    }

    const data = await response.json()
    return data
  },

  // Donations
  async getDonations(filters?: any): Promise<Donation[]> {
    // Simulate API call to GET /api/donations
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [] // Mock data would be returned here
  },

  async createDonation(donationData: Partial<Donation>): Promise<Donation> {
    // Call actual API endpoint
    const response = await fetch("/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donationData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to create donation")
    }

    const data = await response.json()
    return data.donation
  },

  // Requests
  async getRequests(filters?: any): Promise<Request[]> {
    // Simulate API call to GET /api/requests
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [] // Mock data would be returned here
  },

  async createRequest(requestData: Partial<Request>): Promise<Request> {
    // Simulate API call to POST /api/requests
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      _id: Math.random().toString(),
      ...requestData,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Request
  },

  // Matches
  async getMatches(userId: string): Promise<Match[]> {
    // Simulate API call to GET /api/matches
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [] // Mock data would be returned here
  },

  async createMatch(donationId: string, requestId: string): Promise<Match> {
    // Simulate API call to POST /api/matches
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      _id: Math.random().toString(),
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Match
  },

  // Messages
  async getMessages(conversationId: string): Promise<Message[]> {
    // Simulate API call to GET /api/messages/:conversationId
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [] // Mock data would be returned here
  },

  async sendMessage(receiverId: string, content: string): Promise<Message> {
    // Simulate API call to POST /api/messages
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      _id: Math.random().toString(),
      content,
      type: "text",
      read: false,
      createdAt: new Date().toISOString(),
    } as Message
  },

  // Notifications
  async getNotifications(userId: string): Promise<Notification[]> {
    // Simulate API call to GET /api/notifications
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock notification data
    return [
      {
        _id: "notif1",
        user: { _id: userId, name: "Current User" } as User,
        title: "Match Found!",
        message: "Your donation 'Educational Books' has been matched with a request from Hope Foundation.",
        type: "match",
        read: false,
        actionUrl: "/dashboard/donor/matches",
        createdAt: "2024-01-22T10:30:00Z",
      },
      {
        _id: "notif2",
        user: { _id: userId, name: "Current User" } as User,
        title: "New Message",
        message: "You have received a message from Priya Sharma regarding your book donation.",
        type: "message",
        read: false,
        actionUrl: "/messages/receiver1",
        createdAt: "2024-01-22T09:15:00Z",
      },
      {
        _id: "notif3",
        user: { _id: userId, name: "Current User" } as User,
        title: "Donation Approved",
        message: "Your donation has been approved by our admin team and is now visible to receivers.",
        type: "approval",
        read: true,
        actionUrl: "/dashboard/donor/donations",
        createdAt: "2024-01-21T16:45:00Z",
      },
    ]
  },

  async markNotificationRead(notificationId: string): Promise<void> {
    // Simulate API call to PUT /api/notifications/:id/read
    await new Promise((resolve) => setTimeout(resolve, 300))
  },

  // Admin
  async getAdminStats(): Promise<any> {
    // Simulate API call to GET /api/admin/stats
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      totalDonations: 1250,
      totalRequests: 890,
      totalMatches: 567,
      totalUsers: 2340,
      pendingApprovals: 23,
    }
  },

  async generateReport(type: string, dateRange: any): Promise<Blob> {
    // Simulate API call to POST /api/admin/reports
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return new Blob(["Mock report data"], { type: "application/pdf" })
  },
}

// WebSocket simulation for real-time features
export class SocketService {
  private listeners: { [event: string]: Function[] } = {}

  connect(token: string) {
    // Simulate WebSocket connection to backend
    console.log("[v0] Simulating WebSocket connection...")
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  emit(event: string, data: any) {
    // Simulate emitting events to backend
    console.log("[v0] Simulating socket emit:", event, data)
  }

  disconnect() {
    // Simulate WebSocket disconnection
    console.log("[v0] Simulating WebSocket disconnect...")
  }
}

export const socketService = new SocketService()
