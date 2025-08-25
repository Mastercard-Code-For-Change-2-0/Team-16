import { type NextRequest, NextResponse } from "next/server"

// Simulate MongoDB user data
const mockUsers = [
  {
    _id: "donor1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In real app, this would be hashed
    role: "donor",
    phone: "+91 9876543210",
    address: "123 Main St, Mumbai, MH 400001",
    verified: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "receiver1",
    name: "Priya Sharma",
    email: "priya@ngo.org",
    password: "password123",
    role: "receiver",
    phone: "+91 9876543211",
    organization: "Hope Foundation",
    address: "456 NGO Street, Delhi, DL 110001",
    verified: true,
    createdAt: "2024-01-10T08:15:00Z",
    updatedAt: "2024-01-10T08:15:00Z",
  },
  {
    _id: "admin1",
    name: "Admin User",
    email: "admin@donatelink.org",
    password: "admin123",
    role: "admin",
    phone: "+91 9876543212",
    verified: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Simulate database lookup
    await new Promise((resolve) => setTimeout(resolve, 800))

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Simulate JWT token generation
    const token = `mock-jwt-${user._id}-${Date.now()}`

    console.log("[v0] API: User logged in:", user.name)

    return NextResponse.json({
      user: userWithoutPassword,
      token,
      message: "Login successful",
    })
  } catch (error) {
    console.error("[v0] API: Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
