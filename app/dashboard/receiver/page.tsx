import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Users,
  HandHeart,
  Package,
  Eye,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

export default function ReceiverDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-playfair font-bold text-xl">DonateLink</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-playfair font-bold text-3xl text-foreground mb-2">Welcome, Sunrise School! 🏫</h1>
          <p className="text-muted-foreground">
            Manage your donation requests and discover available donations from generous donors
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <HandHeart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+2 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Received Donations</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students Benefited</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">320</div>
              <p className="text-xs text-muted-foreground">Total impact</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Request fulfillment</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="browse">Browse Donations</TabsTrigger>
            <TabsTrigger value="matches">Active Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-playfair font-bold text-2xl">Your Requests</h2>
              <Button asChild>
                <Link href="/request/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Request
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">Electronics</Badge>
                    <Badge className="bg-green-100 text-green-800">Matched</Badge>
                  </div>
                  <CardTitle className="font-playfair">Computer Lab Equipment</CardTitle>
                  <CardDescription>Need 10 computers for new computer lab setup</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Matched with:</span>
                      <span className="font-medium">TechCorp Ltd.</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-green-600">Delivery Scheduled</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Expected:</span>
                      <span className="font-medium">Next Monday</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">Books</Badge>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <CardTitle className="font-playfair">Science Textbooks</CardTitle>
                  <CardDescription>Grade 8-10 science books for 50 students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Posted:</span>
                      <span className="font-medium">5 days ago</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Views:</span>
                      <span className="font-medium">28</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Interested Donors:</span>
                      <span className="font-medium">3</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      View Responses
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">Sports</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
                  </div>
                  <CardTitle className="font-playfair">Sports Equipment</CardTitle>
                  <CardDescription>Cricket bats, balls, and protective gear</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span className="font-medium">Yesterday</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Priority:</span>
                      <span className="font-medium">Medium</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Students:</span>
                      <span className="font-medium">80 beneficiaries</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" disabled>
                      <Clock className="h-4 w-4 mr-2" />
                      Awaiting Approval
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <h2 className="font-playfair font-bold text-2xl">Available Donations</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search donations..." className="pl-10 w-64" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">Electronics</Badge>
                    <Badge className="bg-green-100 text-green-800">Available</Badge>
                  </div>
                  <CardTitle className="font-playfair">Laptop & Accessories</CardTitle>
                  <CardDescription>Dell Laptop with charger, mouse, and bag. Good working condition.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Donor:</span>
                      <span className="font-medium">John Doe</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">Mumbai</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Condition:</span>
                      <span className="font-medium">Good</span>
                    </div>
                    <Button className="w-full">Request This Donation</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">Books</Badge>
                    <Badge className="bg-green-100 text-green-800">Available</Badge>
                  </div>
                  <CardTitle className="font-playfair">Educational Books Set</CardTitle>
                  <CardDescription>
                    50+ textbooks covering grades 6-10, multiple subjects including math and science.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Donor:</span>
                      <span className="font-medium">Sarah Wilson</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">Delhi</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="font-medium">50+ books</span>
                    </div>
                    <Button className="w-full">Request This Donation</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">Furniture</Badge>
                    <Badge className="bg-blue-100 text-blue-800">Requested</Badge>
                  </div>
                  <CardTitle className="font-playfair">Office Chairs</CardTitle>
                  <CardDescription>
                    5 ergonomic office chairs in excellent condition, perfect for staff room.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Donor:</span>
                      <span className="font-medium">Corporate Office</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">Bangalore</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Requests:</span>
                      <span className="font-medium">2 organizations</span>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent" disabled>
                      Already Requested
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <h2 className="font-playfair font-bold text-2xl">Active Matches</h2>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-playfair">Computer Lab Equipment ← TechCorp Ltd.</CardTitle>
                      <CardDescription>Match approved, delivery being arranged</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Donor Contact:</span>
                        <p className="font-medium">Amit Sharma</p>
                        <p className="text-muted-foreground">+91 98765 43210</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Items:</span>
                        <p className="font-medium">10 Desktop Computers</p>
                        <p className="text-muted-foreground">With monitors & keyboards</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Delivery:</span>
                        <p className="font-medium">Next Monday</p>
                        <p className="text-muted-foreground">10:00 AM - 12:00 PM</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">Contact Donor</Button>
                      <Button variant="outline" size="sm">
                        Confirm Receipt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-playfair">Science Textbooks ← Multiple Donors</CardTitle>
                      <CardDescription>Admin reviewing best match from 3 interested donors</CardDescription>
                    </div>
                    <Badge variant="outline">Under Review</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Potential Donors:</span>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                          <span className="font-medium">Sarah Wilson - 50 books (Delhi)</span>
                          <Badge variant="secondary">Best Match</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                          <span className="font-medium">Education Trust - 30 books (Mumbai)</span>
                          <Badge variant="outline">Alternative</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                          <span className="font-medium">Book Lovers Club - 25 books (Pune)</span>
                          <Badge variant="outline">Alternative</Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View All Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
