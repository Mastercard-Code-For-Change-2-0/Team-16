import { type NextRequest, NextResponse } from "next/server"

// Mock request data
const mockRequests = [
  {
    _id: "request1",
    title: "Urgent: Books for Tribal School",
    description: "We need educational books for 100 tribal children in grades 1-5. Any language books welcome.",
    category: "books",
    urgency: "high",
    quantity: 100,
    requester: {
      _id: "receiver1",
      name: "Priya Sharma",
      email: "priya@ngo.org",
      role: "receiver",
      organization: "Hope Foundation",
    },
    location: {
      city: "Nashik",
      state: "Maharashtra",
      pincode: "422001",
    },
    status: "open",
    tags: ["education", "books", "tribal", "urgent"],
    createdAt: "2024-01-21T11:00:00Z",
    updatedAt: "2024-01-21T11:00:00Z",
  },
  {
    _id: "request2",
    title: "Warm Clothes for Homeless Shelter",
    description: "Winter is approaching and we need warm clothes for 50 homeless individuals",
    category: "clothes",
    urgency: "critical",
    quantity: 50,
    requester: {
      _id: "receiver2",
      name: "Rajesh Kumar",
      email: "rajesh@shelter.org",
      role: "receiver",
      organization: "City Homeless Shelter",
    },
    location: {
      city: "Delhi",
      state: "Delhi",
      pincode: "110002",
    },
    status: "matched",
    tags: ["clothes", "winter", "homeless", "shelter"],
    createdAt: "2024-01-19T16:30:00Z",
    updatedAt: "2024-01-22T10:15:00Z",
  },
  {
    _id: "request3",
    title: "Computer Equipment for Skill Center",
    description: "Need laptops and computers to train underprivileged youth in digital skills",
    category: "electronics",
    urgency: "medium",
    quantity: 15,
    requester: {
      _id: "receiver3",
      name: "Anita Desai",
      email: "anita@skillcenter.org",
      role: "receiver",
      organization: "Digital Skills Center",
    },
    location: {
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
    },
    status: "open",
    tags: ["electronics", "computers", "skills", "training"],
    createdAt: "2024-01-17T13:45:00Z",
    updatedAt: "2024-01-17T13:45:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const urgency = searchParams.get("urgency")
    const status = searchParams.get("status")

    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    let filteredRequests = [...mockRequests]

    // Apply filters
    if (category) {
      filteredRequests = filteredRequests.filter((r) => r.category === category)
    }
    if (urgency) {
      filteredRequests = filteredRequests.filter((r) => r.urgency === urgency)
    }
    if (status) {
      filteredRequests = filteredRequests.filter((r) => r.status === status)
    }

    console.log("[v0] API: Fetched requests:", filteredRequests.length)

    return NextResponse.json({
      requests: filteredRequests,
      total: filteredRequests.length,
      page: 1,
      limit: 20,
    })
  } catch (error) {
    console.error("[v0] API: Error fetching requests:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json()

    // Simulate database save delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const newRequest = {
      _id: `request_${Date.now()}`,
      ...requestData,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log("[v0] API: Created request:", newRequest.title)

    return NextResponse.json({
      request: newRequest,
      message: "Request created successfully",
    })
  } catch (error) {
    console.error("[v0] API: Error creating request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
