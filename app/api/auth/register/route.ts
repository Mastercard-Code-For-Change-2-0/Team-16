import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    // Simulate database operations
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate email validation
    if (!userData.email || !userData.email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Simulate password validation
    if (!userData.password || userData.password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Create new user object
    const newUser = {
      _id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || "donor",
      phone: userData.phone,
      address: userData.address,
      organization: userData.organization,
      verified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Simulate JWT token generation
    const token = `mock-jwt-${newUser._id}-${Date.now()}`

    console.log("[v0] API: User registered:", newUser.name)

    return NextResponse.json({
      user: newUser,
      token,
      message: "Registration successful",
    })
  } catch (error) {
    console.error("[v0] API: Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
