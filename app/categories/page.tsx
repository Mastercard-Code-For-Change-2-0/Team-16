import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Search,
  Filter,
  ArrowLeft,
  BookOpen,
  Shirt,
  UtensilsCrossed,
  PenTool,
  Sofa,
  Laptop,
  Stethoscope,
  Car,
  Gamepad2,
  Baby,
  Dumbbell,
  Music,
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "books",
    name: "Books & Education",
    icon: BookOpen,
    description: "Educational materials, textbooks, novels, and learning resources",
    count: 245,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "clothes",
    name: "Clothes & Textiles",
    icon: Shirt,
    description: "Clothing, shoes, blankets, and textile materials",
    count: 189,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: "food",
    name: "Food & Groceries",
    icon: UtensilsCrossed,
    description: "Non-perishable food items, groceries, and kitchen supplies",
    count: 156,
    color: "bg-green-500/10 text-green-600",
  },
  {
    id: "stationery",
    name: "Stationery & Supplies",
    icon: PenTool,
    description: "Office supplies, art materials, and educational stationery",
    count: 134,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    id: "furniture",
    name: "Furniture & Home",
    icon: Sofa,
    description: "Home furniture, appliances, and household items",
    count: 98,
    color: "bg-brown-500/10 text-amber-700",
  },
  {
    id: "electronics",
    name: "Electronics & Tech",
    icon: Laptop,
    description: "Computers, phones, gadgets, and electronic devices",
    count: 87,
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    id: "medical",
    name: "Medical & Healthcare",
    icon: Stethoscope,
    description: "Medical equipment, healthcare supplies, and wellness items",
    count: 76,
    color: "bg-red-500/10 text-red-600",
  },
  {
    id: "transport",
    name: "Transport & Mobility",
    icon: Car,
    description: "Vehicles, bicycles, wheelchairs, and mobility aids",
    count: 45,
    color: "bg-gray-500/10 text-gray-600",
  },
  {
    id: "toys",
    name: "Toys & Games",
    icon: Gamepad2,
    description: "Children's toys, games, and recreational items",
    count: 67,
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    id: "baby",
    name: "Baby & Kids",
    icon: Baby,
    description: "Baby care items, children's clothing, and parenting supplies",
    count: 89,
    color: "bg-yellow-500/10 text-yellow-700",
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    icon: Dumbbell,
    description: "Sports equipment, fitness gear, and outdoor activities",
    count: 54,
    color: "bg-teal-500/10 text-teal-600",
  },
  {
    id: "music",
    name: "Music & Arts",
    icon: Music,
    description: "Musical instruments, art supplies, and creative materials",
    count: 43,
    color: "bg-violet-500/10 text-violet-600",
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-playfair font-bold text-xl text-foreground">DonateLink</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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

      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-4">Donation Categories</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse through various categories to find exactly what you're looking for or what you want to donate
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search categories..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="count">Item Count</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.id}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${category.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary">{category.count} items</Badge>
                    </div>
                    <CardTitle className="font-playfair text-lg group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm leading-relaxed">{category.description}</CardDescription>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 p-0 h-auto font-medium text-primary hover:text-primary/80"
                    >
                      Browse {category.name} →
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="font-playfair font-bold text-2xl md:text-3xl mb-4">Don't see what you're looking for?</h2>
          <p className="text-lg mb-6 opacity-90 max-w-xl mx-auto">
            Contact us to add new categories or suggest improvements to help more people connect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/suggest">Suggest Category</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
