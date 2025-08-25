import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Heart, Plus, CheckCircle, TrendingUp, Gift, Users, Star, Eye } from "lucide-react"
import Link from "next/link"

export default function DonorDashboard() {
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
                New Donation
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-playfair font-bold text-3xl text-foreground mb-2">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground">
            Track your donations and see the impact you're making in the community
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Successful Matches</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">75% success rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">People Helped</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Across 8 organizations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Based on receiver feedback</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="donations">My Donations</TabsTrigger>
            <TabsTrigger value="matches">Active Matches</TabsTrigger>
            <TabsTrigger value="impact">Impact Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="donations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-playfair font-bold text-2xl">Your Donations</h2>
              <Button asChild>
                <Link href="/donate/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Donation
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
                  <CardTitle className="font-playfair">Laptop & Accessories</CardTitle>
                  <CardDescription>Dell Laptop with charger and mouse, good condition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Matched with:</span>
                      <span className="font-medium">Sunrise School</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-green-600">Delivered</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Impact:</span>
                      <span className="font-medium">25 students benefited</span>
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
                    <Badge variant="outline">Pending Review</Badge>
                  </div>
                  <CardTitle className="font-playfair">Educational Books</CardTitle>
                  <CardDescription>50+ textbooks for grades 6-10, various subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Listed:</span>
                      <span className="font-medium">2 days ago</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Views:</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Interested:</span>
                      <span className="font-medium">3 organizations</span>
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
                    <Badge variant="secondary">Furniture</Badge>
                    <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                  </div>
                  <CardTitle className="font-playfair">Office Chairs</CardTitle>
                  <CardDescription>5 ergonomic office chairs, excellent condition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Matched with:</span>
                      <span className="font-medium">Hope NGO</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-blue-600">Pickup Scheduled</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pickup Date:</span>
                      <span className="font-medium">Tomorrow, 2 PM</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
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
                      <CardTitle className="font-playfair">Office Chairs → Hope NGO</CardTitle>
                      <CardDescription>Match approved, pickup scheduled</CardDescription>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={75} className="w-full" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Next Step:</span>
                        <p className="font-medium">Pickup Tomorrow</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Contact:</span>
                        <p className="font-medium">Priya Sharma</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone:</span>
                        <p className="font-medium">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">Contact Receiver</Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-playfair">Educational Books → Multiple Schools</CardTitle>
                      <CardDescription>Pending admin approval for best match</CardDescription>
                    </div>
                    <Badge variant="outline">Under Review</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={25} className="w-full" />
                    <div className="text-sm">
                      <span className="text-muted-foreground">Interested Organizations:</span>
                      <div className="mt-2 space-y-1">
                        <p className="font-medium">• Sunrise School (25 students)</p>
                        <p className="font-medium">• Green Valley Academy (40 students)</p>
                        <p className="font-medium">• Rural Education Trust (60 students)</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View All Requests
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <h2 className="font-playfair font-bold text-2xl">Your Impact Stories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <Badge variant="secondary">Success Story</Badge>
                  </div>
                  <CardTitle className="font-playfair">Computer Lab Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    "The laptop you donated helped us set up a computer lab. 25 students now have access to digital
                    learning. Thank you for making education accessible!"
                  </CardDescription>
                  <div className="text-sm text-muted-foreground mb-4">- Mrs. Sunita, Sunrise School Principal</div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Impact:</span>
                      <span className="font-medium ml-1">25 students</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium ml-1">Dec 15, 2024</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <Badge variant="secondary">Growth Impact</Badge>
                  </div>
                  <CardTitle className="font-playfair">Library Expansion</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    "Your book donation doubled our library collection! Reading hours increased by 300% and student
                    engagement in literature has improved significantly."
                  </CardDescription>
                  <div className="text-sm text-muted-foreground mb-4">- Rajesh Kumar, Green Valley Academy</div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Impact:</span>
                      <span className="font-medium ml-1">150 students</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium ml-1">Nov 28, 2024</span>
                    </div>
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
