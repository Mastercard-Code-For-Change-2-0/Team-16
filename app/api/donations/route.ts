import { type NextRequest, NextResponse } from "next/server"

// Mock donation data
const mockDonations = [
  {
    _id: "donation1",
    title: "Educational Books for Rural Schools",
    description: "Collection of 50+ textbooks and storybooks suitable for primary education",
    category: "books",
    condition: "good",
    quantity: 50,
    images: ["/educational-books.png"],
    donor: {
      _id: "donor1",
      name: "John Doe",
      email: "john@example.com",
      role: "donor",
    },
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    status: "available",
    tags: ["education", "books", "primary", "rural"],
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
  },
  {
    _id: "donation2",
    title: "Winter Clothes for Children",
    description: "Warm jackets, sweaters, and blankets for children aged 5-12",
    category: "clothes",
    condition: "new",
    quantity: 25,
    images: ["/winter-clothes-children.png"],
    donor: {
      _id: "donor2",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "donor",
    },
    location: {
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
    },
    status: "available",
    tags: ["clothes", "winter", "children", "warm"],
    createdAt: "2024-01-18T14:15:00Z",
    updatedAt: "2024-01-18T14:15:00Z",
  },
  {
    _id: "donation3",
    title: "Office Furniture Set",
    description: "Desks, chairs, and filing cabinets suitable for small office or NGO",
    category: "furniture",
    condition: "good",
    quantity: 10,
    images: ["/office-furniture-desk-chair.png"],
    donor: {
      _id: "donor3",
      name: "Tech Corp Ltd",
      email: "donations@techcorp.com",
      role: "donor",
    },
    location: {
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
    },
    status: "matched",
    tags: ["furniture", "office", "desk", "chair"],
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-22T16:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const city = searchParams.get("city")

    // Simulate database query delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredDonations = [...mockDonations]

    // Apply filters
    if (category) {
      filteredDonations = filteredDonations.filter((d) => d.category === category)
    }
    if (status) {
      filteredDonations = filteredDonations.filter((d) => d.status === status)
    }
    if (city) {
      filteredDonations = filteredDonations.filter((d) => d.location.city.toLowerCase().includes(city.toLowerCase()))
    }

    console.log("[v0] API: Fetched donations:", filteredDonations.length)

    return NextResponse.json({
      donations: filteredDonations,
      total: filteredDonations.length,
      page: 1,
      limit: 20,
    })
  } catch (error) {
    console.error("[v0] API: Error fetching donations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const donationData = await request.json()

    // Simulate database save delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newDonation = {
      _id: `donation_${Date.now()}`,
      ...donationData,
      status: "available",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log("[v0] API: Created donation:", newDonation.title)

    return NextResponse.json({
      donation: newDonation,
      message: "Donation created successfully",
    })
  } catch (error) {
    console.error("[v0] API: Error creating donation:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
