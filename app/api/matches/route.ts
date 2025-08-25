import { type NextRequest, NextResponse } from "next/server"

// Mock match data
const mockMatches = [
  {
    _id: "match1",
    donation: {
      _id: "donation1",
      title: "Educational Books for Rural Schools",
      category: "books",
      donor: { name: "John Doe", email: "john@example.com" },
    },
    request: {
      _id: "request1",
      title: "Urgent: Books for Tribal School",
      category: "books",
      requester: { name: "Priya Sharma", organization: "Hope Foundation" },
    },
    status: "pending",
    adminNotes: "Good match - both parties in Maharashtra",
    createdAt: "2024-01-22T09:30:00Z",
    updatedAt: "2024-01-22T09:30:00Z",
  },
  {
    _id: "match2",
    donation: {
      _id: "donation2",
      title: "Winter Clothes for Children",
      category: "clothes",
      donor: { name: "Sarah Wilson", email: "sarah@example.com" },
    },
    request: {
      _id: "request2",
      title: "Warm Clothes for Homeless Shelter",
      category: "clothes",
      requester: { name: "Rajesh Kumar", organization: "City Homeless Shelter" },
    },
    status: "approved",
    adminNotes: "Approved - urgent need for winter clothes",
    createdAt: "2024-01-21T14:20:00Z",
    updatedAt: "2024-01-22T10:15:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    let filteredMatches = [...mockMatches]

    // Apply filters
    if (status) {
      filteredMatches = filteredMatches.filter((m) => m.status === status)
    }

    console.log("[v0] API: Fetched matches:", filteredMatches.length)

    return NextResponse.json({
      matches: filteredMatches,
      total: filteredMatches.length,
    })
  } catch (error) {
    console.error("[v0] API: Error fetching matches:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { donationId, requestId } = await request.json()

    // Simulate database operations
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newMatch = {
      _id: `match_${Date.now()}`,
      donationId,
      requestId,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log("[v0] API: Created match:", newMatch._id)

    return NextResponse.json({
      match: newMatch,
      message: "Match created successfully",
    })
  } catch (error) {
    console.error("[v0] API: Error creating match:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
