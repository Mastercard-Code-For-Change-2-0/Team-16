import { type NextRequest, NextResponse } from "next/server"

// Mock notification data
const mockNotifications = [
  {
    _id: "notif1",
    user: { _id: "donor1", name: "John Doe" },
    title: "Match Found!",
    message: "Your donation 'Educational Books' has been matched with a request from Hope Foundation.",
    type: "match",
    read: false,
    actionUrl: "/dashboard/donor/matches",
    createdAt: "2024-01-22T10:30:00Z",
  },
  {
    _id: "notif2",
    user: { _id: "donor1", name: "John Doe" },
    title: "New Message",
    message: "You have received a message from Priya Sharma regarding your book donation.",
    type: "message",
    read: false,
    actionUrl: "/messages/receiver1",
    createdAt: "2024-01-22T09:15:00Z",
  },
  {
    _id: "notif3",
    user: { _id: "donor1", name: "John Doe" },
    title: "Donation Approved",
    message: "Your donation has been approved by our admin team and is now visible to receivers.",
    type: "approval",
    read: true,
    actionUrl: "/dashboard/donor/donations",
    createdAt: "2024-01-21T16:45:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Filter notifications for user (in real app, this would be done in database)
    const userNotifications = mockNotifications.filter((n) => n.user._id === userId)

    console.log("[v0] API: Fetched notifications for user:", userId)

    return NextResponse.json({
      notifications: userNotifications,
      unreadCount: userNotifications.filter((n) => !n.read).length,
    })
  } catch (error) {
    console.error("[v0] API: Error fetching notifications:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
