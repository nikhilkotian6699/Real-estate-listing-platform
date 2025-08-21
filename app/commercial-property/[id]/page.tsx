"use client"

import {
  Star,
  Phone,
  MessageCircle,
  Shield,
  Hospital,
  ShoppingCart,
  Bus,
  Coffee,
  Square,
  Users,
  Car,
  Zap,
  Wifi,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import PropertyHeader from "@/components/property-header"

export default function CommercialPropertyDetailsPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock data - will be replaced with actual data from database based on params.id
  const property = {
    id: params.id,
    title: "Premium Office Space",
    price: "₹85,000/month",
    originalPrice: "₹95,000/month",
    location: "BKC, Mumbai",
    type: "Commercial",
    status: "For Rent",
    rating: 4.3,
    reviews: 8,
    isNew: true,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    details: {
      area: "2,500 sq ft",
      capacity: "50 People",
      parking: "10 Cars",
      furnished: "Fully Furnished",
      floor: "12th Floor",
      age: "2 Years",
      electricity: "24/7 Power",
      internet: "High Speed WiFi",
      security: "24/7 Security",
      ac: "Central AC",
      cafeteria: "Available",
      conference: "3 Rooms",
    },
    landmarks: [
      { name: "Metro", icon: Bus, distance: "0.2 km", color: "bg-blue-100 text-blue-600" },
      { name: "Bank", icon: Building, distance: "0.1 km", color: "bg-green-100 text-green-600" },
      { name: "Mall", icon: ShoppingCart, distance: "0.5 km", color: "bg-purple-100 text-purple-600" },
      { name: "Restaurant", icon: Coffee, distance: "0.3 km", color: "bg-orange-100 text-orange-600" },
      { name: "Hospital", icon: Hospital, distance: "1.0 km", color: "bg-red-100 text-red-600" },
    ],
    description:
      "Premium office space located in the heart of BKC, Mumbai's premier business district. This fully furnished office offers modern amenities, excellent connectivity, and a professional environment perfect for growing businesses. The space features contemporary design, high-speed internet, 24/7 security, and ample parking. Ideal for IT companies, consulting firms, and corporate offices.",
    seller: {
      name: "Rajesh Kumar",
      username: "@rajeshkumar",
      avatar: "/placeholder.svg?height=50&width=50",
      phone: "+91 9876543210",
      verified: true,
    },
    coordinates: { lat: 19.0596, lng: 72.8295 },
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const relatedProperties = [
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
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <PropertyHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Slideshow */}
              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={property.images[currentImageIndex] || "/placeholder.svg"}
                      alt={property.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Navigation Arrows */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.isNew && <Badge className="bg-green-600 text-white">New</Badge>}
                    <Badge variant="secondary" className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {property.type}
                    </Badge>
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          index === currentImageIndex ? "border-orange-500" : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${property.title} ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Price and Rating */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl font-bold text-orange-600">{property.price}</div>
                        {property.originalPrice && (
                          <div className="text-lg text-gray-500 dark:text-gray-400 line-through">
                            {property.originalPrice}
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{property.status}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= property.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                        ({property.rating}) {property.reviews} reviews
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Information Grid */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Property Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Square className="w-6 h-6 text-orange-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{property.details.area}</span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Total Area</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Users className="w-6 h-6 text-orange-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.details.capacity}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Capacity</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Car className="w-6 h-6 text-orange-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.details.parking}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Parking</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Building className="w-6 h-6 text-orange-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.details.furnished}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Furnished</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Zap className="w-6 h-6 text-orange-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.details.electricity}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Power</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Wifi className="w-6 h-6 text-orange-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.details.internet}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Internet</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Shield className="w-6 h-6 text-orange-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.details.security}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Security</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Calendar className="w-6 h-6 text-orange-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{property.details.age}</span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Property Age</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Landmarks */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Nearby Landmarks</h3>
                  <div className="flex space-x-4 overflow-x-auto pb-2">
                    {property.landmarks.map((landmark, index) => (
                      <div key={index} className="flex-shrink-0 flex flex-col items-center space-y-2">
                        <div className={`w-12 h-12 rounded-full ${landmark.color} flex items-center justify-center`}>
                          <landmark.icon className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{landmark.name}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">{landmark.distance}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{property.description}</p>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Location</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-700 dark:text-gray-300">{property.location}</span>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Map will be integrated here</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Seller Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Seller Details</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={property.seller.avatar || "/placeholder.svg"} />
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center text-gray-900 dark:text-white">
                        {property.seller.name}
                        {property.seller.verified && <Shield className="w-4 h-4 text-green-500 ml-1" />}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{property.seller.username}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      View Number
                    </Button>
                    <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Advertisement */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 mb-4">
                      <div className="text-gray-500 dark:text-gray-400">Advertisement</div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Sponsored Content</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Properties */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((relatedProperty) => (
                <Card
                  key={relatedProperty.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <div className="relative">
                    <Image
                      src={relatedProperty.image || "/placeholder.svg"}
                      alt={relatedProperty.title}
                      width={350}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      variant="secondary"
                      className="absolute top-3 left-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {relatedProperty.type}
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">
                          {relatedProperty.title}
                        </h3>
                        <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="text-sm line-clamp-1">{relatedProperty.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Square className="w-4 h-4 mr-1" />
                            <span>{relatedProperty.area}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{relatedProperty.capacity}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-orange-600">{relatedProperty.price}</div>
                        <Link href={`/commercial-property/${relatedProperty.id}`}>
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
          </div>

          {/* Advertisement Section */}
          <div className="mt-12">
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-12 mb-4">
                    <div className="text-gray-500 dark:text-gray-400 text-lg">Advertisement Banner</div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Sponsored Content</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
