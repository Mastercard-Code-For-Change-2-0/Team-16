import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Simulate database aggregation queries
    await new Promise((resolve) => setTimeout(resolve, 700))

    const stats = {
      totalDonations: 1247,
      totalRequests: 892,
      totalMatches: 567,
      totalUsers: 2340,
      pendingApprovals: 23,
      completedMatches: 544,
      activeUsers: 1890,
      monthlyGrowth: {
        donations: 12.5,
        requests: 8.3,
        matches: 15.7,
        users: 6.2,
      },
      categoryBreakdown: {
        books: 245,
        clothes: 189,
        food: 156,
        electronics: 134,
        furniture: 98,
        medical: 87,
      },
      locationStats: {
        topCities: [
          { city: "Mumbai", count: 234 },
          { city: "Delhi", count: 198 },
          { city: "Bangalore", count: 167 },
          { city: "Chennai", count: 145 },
          { city: "Pune", count: 123 },
        ],
      },
    }

    console.log("[v0] API: Fetched admin stats")

    return NextResponse.json(stats)
  } catch (error) {
    console.error("[v0] API: Error fetching admin stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
