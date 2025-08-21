"use client"

import { Search, MapPin, TrendingUp, Users, Building, Moon, Sun, ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import Footer from "@/components/footer"
import SlidingSidebar from "@/components/sliding-sidebar"

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedState, setSelectedState] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedTaluk, setSelectedTaluk] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const featuredPropertiesByType = {
    residential: [
      {
        id: 1,
        title: "Luxury 3BHK Apartment",
        location: "Bandra West, Mumbai",
        price: "₹2.5 Cr",
        type: "Residential",
        area: "1,200 sq ft",
        listingType: "sell",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        title: "Modern 2BHK Villa",
        location: "Whitefield, Bangalore",
        price: "₹35,000/month",
        type: "Residential",
        area: "1,500 sq ft",
        listingType: "rent",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        title: "Spacious 4BHK House",
        location: "Sector 62, Gurgaon",
        price: "₹3.2 Cr",
        type: "Residential",
        area: "2,000 sq ft",
        listingType: "sell",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    commercial: [
      {
        id: 4,
        title: "Premium Office Space",
        location: "Connaught Place, Delhi",
        price: "₹1.8 Cr",
        type: "Commercial",
        area: "800 sq ft",
        listingType: "sell",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 5,
        title: "Retail Showroom",
        location: "Commercial Street, Bangalore",
        price: "₹45,000/month",
        type: "Commercial",
        area: "1,200 sq ft",
        listingType: "lease",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 6,
        title: "Co-working Office",
        location: "Koramangala, Bangalore",
        price: "₹85 Lakh",
        type: "Commercial",
        area: "600 sq ft",
        listingType: "sell",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    agriculture: [
      {
        id: 7,
        title: "Premium Farm Land",
        location: "Nashik, Maharashtra",
        price: "₹45 Lakh",
        type: "Agriculture",
        area: "5 Acres",
        listingType: "sell",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 8,
        title: "Agricultural Plot",
        location: "Coimbatore, Tamil Nadu",
        price: "₹25 Lakh",
        type: "Agriculture",
        area: "3 Acres",
        listingType: "sell",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 9,
        title: "Organic Farm",
        location: "Pune, Maharashtra",
        price: "₹8,000/month",
        type: "Agriculture",
        area: "8 Acres",
        listingType: "lease",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    industrial: [
      {
        id: 10,
        title: "Manufacturing Unit",
        location: "MIDC Aurangabad, Maharashtra",
        price: "₹5.5 Cr",
        type: "Industrial",
        area: "15,000 sq ft",
        listingType: "sell",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 11,
        title: "Industrial Warehouse",
        location: "Hosur Industrial Area, Tamil Nadu",
        price: "₹50,000/month",
        type: "Industrial",
        area: "25,000 sq ft",
        listingType: "lease",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 12,
        title: "Food Processing Unit",
        location: "Pune Industrial Estate",
        price: "₹4.8 Cr",
        type: "Industrial",
        area: "12,000 sq ft",
        listingType: "sell",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  }

  const slideImages = [
    {
      id: 1,
      image: "/placeholder.svg?height=500&width=1200",
      title: "Premium Properties",
      subtitle: "Luxury homes in prime locations",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=500&width=1200",
      title: "Commercial Spaces",
      subtitle: "Modern offices for business growth",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=500&width=1200",
      title: "Agricultural Land",
      subtitle: "Fertile lands for farming",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=500&width=1200",
      title: "Industrial Properties",
      subtitle: "Strategic manufacturing locations",
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Residential":
        return "bg-blue-600"
      case "Commercial":
        return "bg-orange-600"
      case "Agriculture":
        return "bg-green-600"
      case "Industrial":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    { icon: Building, label: "Properties Listed", value: "78,000+" },
    { icon: Users, label: "Happy Customers", value: "25,000+" },
    { icon: MapPin, label: "Cities Covered", value: "100+" },
    { icon: TrendingUp, label: "Properties Sold", value: "15,000+" },
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section - Menu + Logo */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setSidebarOpen(true)}
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

              {/* Center Section - Navigation (Hidden on mobile) */}
              <nav className="hidden lg:flex items-center space-x-6">
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

              {/* Right Section - Theme Toggle + Login/Signup */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white hidden sm:block">Post Property</Button>
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
                    className="h-12 px-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-lg whitespace-nowrap"
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
                    className="w-full h-12 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-lg text-sm"
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

        {/* Image Slideshow */}
        <section className="relative">
          <div className="relative h-[500px] md:h-[600px] overflow-hidden">
            {slideImages.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl md:text-2xl">{slide.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slideImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Enhanced Search Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 relative -mt-20 z-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Perfect Property</h1>
            <p className="text-lg mb-8 max-w-xl mx-auto">Discover premium properties in Dakshina Kannada</p>

            {/* Enhanced Search Form */}
            <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
                {/* Search Input - Updated with right search icon */}
                <div className="col-span-2 md:col-span-3 lg:col-span-2">
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-3 shadow-md border border-gray-300 dark:border-gray-600">
                    <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">
                      Search Properties
                    </label>
                    <div className="relative">
                      <Input
                        placeholder="Search properties..."
                        className="pr-10 h-8 text-sm border-0 bg-transparent focus:ring-0 p-0 font-medium text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* State Box */}
                <div className="col-span-1">
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-3 shadow-md border border-gray-300 dark:border-gray-600">
                    <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">State</label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger className="h-8 border-0 bg-transparent p-0 text-sm font-medium text-gray-900 dark:text-white">
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>{/* States will be populated from database */}</SelectContent>
                    </Select>
                  </div>
                </div>

                {/* District Box - Updated */}
                <div className="col-span-1">
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-3 shadow-md border border-gray-300 dark:border-gray-600">
                    <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">District</label>
                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                      <SelectTrigger className="h-8 border-0 bg-transparent p-0 text-sm font-medium text-gray-900 dark:text-white">
                        <SelectValue placeholder="District" />
                      </SelectTrigger>
                      <SelectContent>{/* Districts will be populated from database */}</SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Taluk Box - Updated */}
                <div className="col-span-1">
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-3 shadow-md border border-gray-300 dark:border-gray-600">
                    <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">Taluk</label>
                    <Select
                      value={selectedTaluk}
                      onValueChange={(value) => {
                        setSelectedTaluk(value)
                        setSelectedLocation("")
                      }}
                      disabled={!selectedDistrict}
                    >
                      <SelectTrigger className="h-8 border-0 bg-transparent p-0 text-sm font-medium text-gray-900 dark:text-white">
                        <SelectValue placeholder="Taluk" />
                      </SelectTrigger>
                      <SelectContent>{/* Taluks will be populated from database */}</SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location Box - Updated with City/Village labels */}
                <div className="col-span-1">
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-3 shadow-md border border-gray-300 dark:border-gray-600">
                    <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation} disabled={!selectedTaluk}>
                      <SelectTrigger className="h-8 border-0 bg-transparent p-0 text-sm font-medium text-gray-900 dark:text-white">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>{/* Locations will be populated from database */}</SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="col-span-2 md:col-span-4 lg:col-span-2">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-3 shadow-md">
                    <Button className="w-full h-8 bg-transparent hover:bg-white/10 border-0 text-white text-sm font-medium">
                      <Search className="w-4 h-4 mr-1" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties - 4 Sections */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Properties</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Handpicked properties from our premium collection
              </p>
            </div>

            {/* Residential Properties */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  🏠 Residential Properties
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {featuredPropertiesByType.residential.map((property) => (
                  <Card
                    key={property.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  >
                    <div className="relative">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className={`absolute top-3 left-3 ${getTypeColor(property.type)} text-white`}>
                        {property.type}
                      </Badge>
                      <Badge
                        className={`absolute top-3 right-3 ${getListingColor(
                          property.listingType,
                        )} rounded-full px-3 py-1 text-xs font-semibold`}
                      >
                        {getListingLabel(property.listingType)}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{property.title}</h4>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{property.price}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{property.area}</div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Link href="/residential">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                    View More Residential Properties
                  </Button>
                </Link>
              </div>
            </div>

            {/* Commercial Properties */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  🏢 Commercial Properties
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {featuredPropertiesByType.commercial.map((property) => (
                  <Card
                    key={property.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  >
                    <div className="relative">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className={`absolute top-3 left-3 ${getTypeColor(property.type)} text-white`}>
                        {property.type}
                      </Badge>
                      <Badge
                        className={`absolute top-3 right-3 ${getListingColor(
                          property.listingType,
                        )} rounded-full px-3 py-1 text-xs font-semibold`}
                      >
                        {getListingLabel(property.listingType)}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{property.title}</h4>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-2xl font-bold text-orange-600">{property.price}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{property.area}</div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 border-orange-600 dark:border-orange-400"
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Link href="/commercial">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                    View More Commercial Properties
                  </Button>
                </Link>
              </div>
            </div>

            {/* Agriculture Properties */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  🌾 Agriculture Properties
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {featuredPropertiesByType.agriculture.map((property) => (
                  <Card
                    key={property.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  >
                    <div className="relative">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className={`absolute top-3 left-3 ${getTypeColor(property.type)} text-white`}>
                        {property.type}
                      </Badge>
                      <Badge
                        className={`absolute top-3 right-3 ${getListingColor(
                          property.listingType,
                        )} rounded-full px-3 py-1 text-xs font-semibold`}
                      >
                        {getListingLabel(property.listingType)}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{property.title}</h4>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-2xl font-bold text-green-600">{property.price}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{property.area}</div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 border-green-600 dark:border-green-400"
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Link href="/agriculture">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                    View More Agriculture Properties
                  </Button>
                </Link>
              </div>
            </div>

            {/* Industrial Properties */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  🏭 Industrial Properties
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {featuredPropertiesByType.industrial.map((property) => (
                  <Card
                    key={property.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  >
                    <div className="relative">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className={`absolute top-3 left-3 ${getTypeColor(property.type)} text-white`}>
                        {property.type}
                      </Badge>
                      <Badge
                        className={`absolute top-3 right-3 ${getListingColor(
                          property.listingType,
                        )} rounded-full px-3 py-1 text-xs font-semibold`}
                      >
                        {getListingLabel(property.listingType)}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{property.title}</h4>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{property.price}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{property.area}</div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400"
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Link href="/industrial">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                    View More Industrial Properties
                  </Button>
                </Link>
              </div>
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

        {/* Stats Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-3">
                  <stat.icon className="w-12 h-12 mx-auto" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <SlidingSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  )
}
