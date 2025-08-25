import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  Building2,
  School,
  Home,
  Gift,
  Search,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="font-playfair font-bold text-2xl text-foreground">DonateLink</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="#impact" className="text-muted-foreground hover:text-foreground transition-colors">
                Impact Stories
              </Link>
              <Link href="/browse" className="text-muted-foreground hover:text-foreground transition-colors">
                Find a Cause
              </Link>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/indian-cultural-patterns-mandala-lotus-traditional.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6">
            Powered by Seva Sahayog Foundation
          </Badge>
          <h1 className="font-playfair font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
            Connecting Hearts,
            <span className="text-primary block">Building Communities</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Bridge the gap between generous donors and organizations in need. Our transparent platform makes in-kind
            donations simple, efficient, and impactful across India.
          </p>
          <div className="mb-8">
            <img
              src="/indian-community-donation-sharing-food-clothes-boo.png"
              alt="Community members sharing donations in India"
              className="mx-auto rounded-lg shadow-lg max-w-2xl w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/donate">
                Start Donating <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/receive">Request Donations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Donation Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-4">Donation Categories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from various categories to make your donation or find what you need
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm">Books & Education</h3>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm">Clothes & Textiles</h3>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm">Food & Groceries</h3>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm">Stationery & Supplies</h3>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm">Furniture & Home</h3>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm">Electronics & Tech</h3>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/categories">
                View All Categories <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-muted-foreground">Successful Matches</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Partner Organizations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">₹50L+</div>
              <div className="text-muted-foreground">Value Donated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-4">How DonateLink Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent, and efficient donation matching in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 opacity-20">
                <img src="/indian-person-listing-donation-items-books-clothes.png" alt="" className="w-full h-full object-cover" />
              </div>
              <CardHeader className="relative z-10">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-playfair">List Your Donation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Donors easily list items they want to donate with photos and descriptions. Our quality checks ensure
                  authentic listings.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 opacity-20">
                <img src="/indian-admin-reviewing-donation-matches-on-compute.png" alt="" className="w-full h-full object-cover" />
              </div>
              <CardHeader className="relative z-10">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-playfair">Smart Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our platform intelligently matches donations with receiver needs. Admins review and approve the best
                  matches.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 opacity-20">
                <img src="/indian-families-receiving-donations-happy-children.png" alt="" className="w-full h-full object-cover" />
              </div>
              <CardHeader className="relative z-10">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-playfair">Complete Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Both parties are notified of successful matches. Track your donation impact with transparent
                  transaction history.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="py-20 bg-muted/50 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 opacity-5">
          <img src="/indian-paisley-pattern-traditional-motifs-subtle-b.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-4">Who We Serve</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connecting diverse communities for maximum social impact across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 opacity-30">
                <img src="/indian-individual-person-donating-items-traditiona.png" alt="" className="w-full h-full object-cover" />
              </div>
              <CardHeader className="text-center relative z-10 pt-28">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="font-playfair">Individual Donors</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Everyday people making a difference by donating items they no longer need
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 opacity-30">
                <img src="/indian-corporate-office-building-csr-donation-even.png" alt="" className="w-full h-full object-cover" />
              </div>
              <CardHeader className="text-center relative z-10 pt-28">
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="font-playfair">Corporates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Businesses contributing to CSR initiatives through strategic donations
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 opacity-30">
                <img src="/indian-school-children-students-in-uniform-traditi.png" alt="" className="w-full h-full object-cover" />
              </div>
              <CardHeader className="text-center relative z-10 pt-28">
                <School className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="font-playfair">Educational Institutions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Schools and colleges both giving and receiving educational resources</CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 opacity-30">
                <img src="/indian-ngo-workers-community-volunteers-helping-pe.png" alt="" className="w-full h-full object-cover" />
              </div>
              <CardHeader className="text-center relative z-10 pt-28">
                <Home className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="font-playfair">NGOs & Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Organizations serving communities and requesting needed resources</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-4">Real Impact Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how DonateLink is transforming communities across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="/indian-rural-school-library-children-reading-books.png"
                  alt="Indian school library with children reading"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Badge variant="secondary">Success Story</Badge>
                </div>
                <CardTitle className="font-playfair">School Library Transformation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  "Thanks to DonateLink, we received 500+ books from corporate donors. Our rural school library now
                  serves 300 students daily."
                </CardDescription>
                <div className="text-sm text-muted-foreground">- Sunita Sharma, Principal, Gram Vidyalaya</div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="/indian-elderly-care-home-medical-equipment-seniors.png"
                  alt="Indian elder care facility with medical equipment"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Badge variant="secondary">Impact</Badge>
                </div>
                <CardTitle className="font-playfair">Elder Care Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  "The medical equipment donated through this platform has improved healthcare for 50+ elderly residents
                  in our care home."
                </CardDescription>
                <div className="text-sm text-muted-foreground">- Dr. Rajesh Kumar, Seva Ashram</div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="/indian-community-kitchen-volunteers-serving-food-t.png"
                  alt="Indian community kitchen serving meals"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <Badge variant="secondary">Growth</Badge>
                </div>
                <CardTitle className="font-playfair">Community Kitchen</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  "Kitchen equipment donations helped us expand from serving 100 to 500 meals daily for underprivileged
                  families."
                </CardDescription>
                <div className="text-sm text-muted-foreground">- Meera Devi, Community Kitchen Coordinator</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/indian-people-holding-hands-unity-diversity-tradit.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of donors and receivers creating positive change in communities across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/register?type=donor">Become a Donor</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/register?type=receiver">Request Donations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-playfair font-bold text-xl">DonateLink</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Connecting donors with receivers for meaningful social impact.
              </p>
              <p className="text-sm text-muted-foreground">Powered by Seva Sahayog Foundation</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/how-it-works" className="hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="hover:text-foreground transition-colors">
                    Browse Donations
                  </Link>
                </li>
                <li>
                  <Link href="/impact" className="hover:text-foreground transition-colors">
                    Impact Stories
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Get Started</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/register?type=donor" className="hover:text-foreground transition-colors">
                    Become a Donor
                  </Link>
                </li>
                <li>
                  <Link href="/register?type=receiver" className="hover:text-foreground transition-colors">
                    Request Donations
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-foreground transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="hover:text-foreground transition-colors">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 DonateLink by Seva Sahayog Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
