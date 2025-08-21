"use client"

import { Search, MapPin, Square, Users, Car, Filter, Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Footer from "@/components/footer"
import SlidingSidebar from "@/components/sliding-sidebar"

export default function CommercialPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedTaluk, setSelectedTaluk] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const properties = [
    {
      id: 1,
      title: "Premium Office Space",
      location: "BKC, Mumbai",
      price: "₹85,000/month",
      area: "2,500 sq ft",
      type: "Office",
      capacity: "50 People",
      parking: "10 Cars",
      listingType: "rent",
      isNew: true,
      image: "/placeholder.svg?height=250&width=350",
    },
    {
      id: 2,
      title: "Retail Showroom",
      location: "Commercial Street, Bangalore",
      price: "₹1.2 Cr",
      area: "1,800 sq ft",
      type: "Retail",
      capacity: "High Footfall",
      parking: "5 Cars",
      listingType: "sell",
      image: "/placeholder.svg?height=250&width=350",
    },
    {
      id: 3,
      title: "Warehouse Space",
      location: "Gurgaon Industrial Area",
      price: "₹45,000/month",
      area: "5,000 sq ft",
      type: "Warehouse",
      capacity: "Storage",
      parking: "Truck Access",
      listingType: "lease",
      image: "/placeholder.svg?height=250&width=350",
    },
    {
      id: 4,
      title: "Restaurant Space",
      location: "Koramangala, Bangalore",
      price: "₹60,000/month",
      area: "1,200 sq ft",
      type: "Restaurant",
      capacity: "80 Seats",
      parking: "8 Cars",
      listingType: "rent",
      image: "/placeholder.svg?height=250&width=350",
    },
    {
      id: 5,
      title: "IT Office Complex",
      location: "Hinjewadi, Pune",
      price: "₹3.5 Cr",
      area: "4,000 sq ft",
      type: "IT Office",
      capacity: "100 People",
      parking: "25 Cars",
      listingType: "sell",
      isNew: true,
      image: "/placeholder.svg?height=250&width=350",
    },
    {
      id: 6,
      title: "Shopping Mall Unit",
      location: "Sector 18, Noida",
      price: "₹75,000/month",
      area: "1,500 sq ft",
      type: "Mall Unit",
      capacity: "Retail",
      parking: "Mall Parking",
      listingType: "lease",
      image: "/placeholder.svg?height=250&width=350",
    },
  ]

  const getListingLabel = (listingType: string) => {
    switch (listingType) {
      case "sell":
        return "For Sale"
      case "rent":
        return "For Rent"
      case "lease":
        return "For Lease"
      default:
        return "Available"
    }
  }

  const getListingColor = (listingType: string) => {
    return "bg-black dark:bg-white text-white dark:text-black"
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="border-b bg-white dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </Button>

                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">G</span>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    GroLow
                  </div>
                </Link>
              </div>

              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  href="/buyer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Buyer
                </Link>
                <Link
                  href="/agent"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Agent
                </Link>
                <Link
                  href="/builder"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Builder
                </Link>
                <Link
                  href="/investor"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Investor
                </Link>
              </nav>

              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Post Property</Button>
              </div>
            </div>

            {/* Four Property Type Buttons */}
            <div className="mt-4">
              {/* Desktop Layout */}
              <div className="hidden md:flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                <Link href="/residential">
                  <Button
                    variant="outline"
                    className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-lg whitespace-nowrap"
                  >
                    🏠 Residential
                  </Button>
                </Link>
                <Link href="/commercial">
                  <Button
                    variant="outline"
                    className="h-12 px-6 bg-white text-orange-600 border-2 border-orange-600 font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-lg whitespace-nowrap dark:bg-gray-700 dark:text-orange-400 dark:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  >
                    🏢 Commercial
                  </Button>
                </Link>
                <Link href="/agriculture">
                  <Button
                    variant="outline"
                    className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-lg whitespace-nowrap"
                  >
                    🌾 Agriculture
                  </Button>
                </Link>
                <Link href="/industrial">
                  <Button
                    variant="outline"
                    className="h-12 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-lg whitespace-nowrap"
                  >
                    🏭 Industrial
                  </Button>
                </Link>
              </div>

              {/* Mobile Layout - 2x2 Grid */}
              <div className="md:hidden grid grid-cols-2 gap-3 max-w-md mx-auto">
                <Link href="/residential">
                  <Button
                    variant="outline"
                    className="w-full h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-lg text-sm"
                  >
                    🏠 Residential
                  </Button>
                </Link>
                <Link href="/commercial">
                  <Button
                    variant="outline"
                    className="w-full h-12 px-4 bg-white text-orange-600 border-2 border-orange-600 font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-lg text-sm dark:bg-gray-700 dark:text-orange-400 dark:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  >
                    🏢 Commercial
                  </Button>
                </Link>
                <Link href="/agriculture">
                  <Button
                    variant="outline"
                    className="w-full h-12 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-lg text-sm"
                  >
                    🌾 Agriculture
                  </Button>
                </Link>
                <Link href="/industrial">
                  <Button
                    variant="outline"
                    className="w-full h-12 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-lg text-sm"
                  >
                    🏭 Industrial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-colors duration-300">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
              <span>/</span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">Commercial Properties</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-colors duration-300">
          <div className="container mx-auto px-4 py-4">
            {/* Main Search Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
              {/* Search Input */}
              <div className="md:col-span-4">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-2 shadow-sm border border-gray-300 dark:border-gray-600">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Search Properties
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="Search commercial properties..."
                      className="pr-8 h-7 text-sm border-0 bg-transparent focus:ring-0 p-0 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                    <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
              </div>

              {/* State */}
              <div className="md:col-span-2">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-600">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">State</label>
                  <Select>
                    <SelectTrigger className="h-7 border-0 bg-transparent p-0 text-sm text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent></SelectContent>
                  </Select>
                </div>
              </div>

              {/* District */}
              <div className="md:col-span-2">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-600">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">District</label>
                  <Select
                    value={selectedDistrict}
                    onValueChange={(value) => {
                      setSelectedDistrict(value)
                      setSelectedTaluk("")
                      setSelectedLocation("")
                    }}
                  >
                    <SelectTrigger className="h-7 border-0 bg-transparent p-0 text-sm text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent></SelectContent>
                  </Select>
                </div>
              </div>

              {/* Taluk */}
              <div className="md:col-span-2">
                <div
                  className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-600 ${!selectedDistrict ? "opacity-50" : ""}`}
                >
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Taluk</label>
                  <Select
                    value={selectedTaluk}
                    onValueChange={(value) => {
                      setSelectedTaluk(value)
                      setSelectedLocation("")
                    }}
                    disabled={!selectedDistrict}
                  >
                    <SelectTrigger className="h-7 border-0 bg-transparent p-0 text-sm text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select Taluk" />
                    </SelectTrigger>
                    <SelectContent></SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <div
                  className={`bg-white dark:bg-gray-700 rounded-lg p-2 shadow-sm border border-gray-300 dark:border-gray-600 ${!selectedTaluk ? "opacity-50" : ""}`}
                >
                  <label className="block text-xs font-medium text-gray-800 dark:text-gray-200 mb-1">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation} disabled={!selectedTaluk}>
                    <SelectTrigger className="h-7 border-0 bg-transparent p-0 text-sm text-gray-900 dark:text-white">
                      <SelectValue placeholder="City/Village" />
                    </SelectTrigger>
                    <SelectContent></SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-2 md:grid-cols-8 gap-3">
              {/* Budget */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-600">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Budget</label>
                  <Select>
                    <SelectTrigger className="h-7 border-0 bg-transparent p-0 text-sm text-gray-900 dark:text-white">
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-100">₹0-1Cr</SelectItem>
                      <SelectItem value="100-500">₹1-5Cr</SelectItem>
                      <SelectItem value="500-1000">₹5-10Cr</SelectItem>
                      <SelectItem value="1000+">₹10Cr+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Property Type */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-600">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Type</label>
                  <Select>
                    <SelectTrigger className="h-7 border-0 bg-transparent p-0 text-sm text-gray-900 dark:text-white">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Area */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-600">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Area</label>
                  <Select>
                    <SelectTrigger className="h-7 border-0 bg-transparent p-0 text-sm text-gray-900 dark:text-white">
                      <SelectValue placeholder="Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1000">0-1000 sq ft</SelectItem>
                      <SelectItem value="1000-3000">1000-3000 sq ft</SelectItem>
                      <SelectItem value="3000-5000">3000-5000 sq ft</SelectItem>
                      <SelectItem value="5000+">5000+ sq ft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Capacity */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-600">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Capacity</label>
                  <Select>
                    <SelectTrigger className="h-7 border-0 bg-transparent p-0 text-sm text-gray-900 dark:text-white">
                      <SelectValue placeholder="Capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-25">0-25 People</SelectItem>
                      <SelectItem value="25-50">25-50 People</SelectItem>
                      <SelectItem value="50-100">50-100 People</SelectItem>
                      <SelectItem value="100+">100+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Listing Type */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 shadow-sm border border-gray-200 dark:border-gray-600">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Listing</label>
                  <Select>
                    <SelectTrigger className="h-7 border-0 bg-transparent p-0 text-sm text-gray-900 dark:text-white">
                      <SelectValue placeholder="Listing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sell">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="lease">For Lease</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* More Filters */}
              <div className="md:col-span-1">
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2 shadow-sm border border-orange-200 dark:border-orange-800">
                  <Button
                    variant="ghost"
                    className="w-full h-7 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 p-0 text-xs"
                  >
                    <Filter className="w-3 h-3 mr-1" />
                    More
                  </Button>
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg p-2 shadow-sm">
                  <Button className="w-full h-7 bg-transparent hover:bg-white/10 border-0 text-white text-xs font-medium">
                    <Search className="w-3 h-3 mr-1" />
                    Search Properties
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Commercial Properties</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Showing 856 properties</p>
            </div>
            <Select>
              <SelectTrigger className="w-48 rounded-xl bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                <SelectValue placeholder="Sort by: Relevance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="area">Area: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div className="relative">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={350}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {property.isNew && <Badge className="bg-green-600 text-white">New</Badge>}
                    <Badge variant="secondary" className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {property.type}
                    </Badge>
                  </div>
                  <Badge
                    className={`absolute top-3 right-3 ${getListingColor(
                      property.listingType,
                    )} rounded-full px-3 py-1 text-xs font-semibold`}
                  >
                    {getListingLabel(property.listingType)}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="text-sm line-clamp-1">{property.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          <span>{property.area}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{property.capacity}</span>
                        </div>
                        <div className="flex items-center">
                          <Car className="w-4 h-4 mr-1" />
                          <span>{property.parking}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-orange-600">{property.price}</div>
                      <Link href={`/commercial-property/${property.id}`}>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700 rounded-xl">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 rounded-xl"
            >
              Load More Properties
            </Button>
          </div>
        </div>

        {/* View More Section */}
        <section className="py-12 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Need a Specific Commercial Space?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Looking for a particular type of commercial property? Share your business requirements and we'll find
                the perfect space for you.
              </p>
              <Link href="/buyer-requirements">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View More Properties
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Advertisement Banner Section */}
        <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Advertisement Space</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Premium advertising opportunities</p>
            </div>

            <div className="max-w-6xl mx-auto">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600">
                <CardContent className="p-16 text-center">
                  <div className="text-6xl mb-6">📢</div>
                  <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Your Advertisement Here</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Reach thousands of potential property buyers and sellers
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">Contact Us for Ads</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
        <SlidingSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  )
}
