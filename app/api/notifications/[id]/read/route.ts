import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const notificationId = params.id

    // Simulate database update delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    console.log("[v0] API: Marked notification as read:", notificationId)

    return NextResponse.json({
      message: "Notification marked as read",
      notificationId,
    })
  } catch (error) {
    console.error("[v0] API: Error marking notification as read:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
