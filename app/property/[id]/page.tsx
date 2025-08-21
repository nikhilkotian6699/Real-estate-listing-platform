"use client"

import {
  Heart,
  Star,
  Phone,
  MessageCircle,
  Shield,
  School,
  Hospital,
  ShoppingCart,
  Bus,
  Coffee,
  Bed,
  Bath,
  Square,
  Car,
  Home,
  Zap,
  Droplets,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
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

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock data - will be replaced with actual data from database based on params.id
  const property = {
    id: params.id,
    title: "Luxury 3BHK Apartment",
    price: "₹31,00,000",
    originalPrice: "₹35,00,000",
    location: "Mangalore, Karnataka",
    type: "Residential",
    status: "For Sale",
    rating: 4.5,
    reviews: 12,
    isNew: true,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    details: {
      bedrooms: 3,
      bathrooms: 2,
      area: "1,200 sq ft",
      parking: "2 Cars",
      furnished: "Semi-Furnished",
      facing: "East",
      floor: "Ground Floor",
      age: "5 Years",
      electricity: "Available",
      water: "Borewell + Corporation",
      security: "Gated Community",
      carpet: "1,100 sq ft",
    },
    landmarks: [
      { name: "School", icon: School, distance: "0.5 km", color: "bg-blue-100 text-blue-600" },
      { name: "Hospital", icon: Hospital, distance: "1.2 km", color: "bg-red-100 text-red-600" },
      { name: "Mall", icon: ShoppingCart, distance: "2.1 km", color: "bg-purple-100 text-purple-600" },
      { name: "Bus Stop", icon: Bus, distance: "0.3 km", color: "bg-green-100 text-green-600" },
      { name: "Restaurant", icon: Coffee, distance: "0.8 km", color: "bg-orange-100 text-orange-600" },
    ],
    description:
      "Beautiful individual house located in a prime area of Mangalore. This property offers excellent connectivity and is surrounded by all necessary amenities. The house is well-maintained and ready to move in. Perfect for families looking for a peaceful yet well-connected location. The property features modern amenities, spacious rooms, and a great layout suitable for comfortable living.",
    seller: {
      name: "Varun Poojary",
      username: "@varunpoojary",
      avatar: "/placeholder.svg?height=50&width=50",
      phone: "+91 9876543210",
      verified: true,
    },
    coordinates: { lat: 12.9141, lng: 74.856 },
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
      title: "Modern 2BHK Villa",
      location: "Whitefield, Bangalore",
      price: "₹35,000/month",
      bedrooms: 2,
      bathrooms: 2,
      area: "1,500 sq ft",
      type: "Villa",
      listingType: "rent",
      image: "/placeholder.svg?height=250&width=350",
    },
    {
      id: 3,
      title: "Spacious 4BHK House",
      location: "Sector 62, Gurgaon",
      price: "₹3.2 Cr",
      bedrooms: 4,
      bathrooms: 3,
      area: "2,000 sq ft",
      type: "House",
      listingType: "sell",
      image: "/placeholder.svg?height=250&width=350",
    },
    {
      id: 4,
      title: "Cozy 1BHK Flat",
      location: "Koramangala, Bangalore",
      price: "₹25,000/month",
      bedrooms: 1,
      bathrooms: 1,
      area: "650 sq ft",
      type: "Apartment",
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
                          index === currentImageIndex ? "border-blue-500" : "border-gray-200 dark:border-gray-600"
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
                        <div className="text-3xl font-bold text-green-600">{property.price}</div>
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
                      <Bed className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.details.bedrooms}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Bedrooms</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Bath className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.details.bathrooms}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Bathrooms</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Square className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{property.details.area}</span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Total Area</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Car className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.details.parking}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Parking</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Home className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.details.furnished}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Furnished</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Zap className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.details.electricity}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Electricity</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Droplets className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Water</span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">Available</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-600 mb-2" />
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
                      <MapPin className="w-5 h-5 text-blue-600" />
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
                      <AvatarFallback>VP</AvatarFallback>
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
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
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
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-3 right-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
                    >
                      <Heart className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </Button>
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
                            <Bed className="w-4 h-4 mr-1" />
                            <span>{relatedProperty.bedrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            <span>{relatedProperty.bathrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="w-4 h-4 mr-1" />
                            <span>{relatedProperty.area}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-blue-600">{relatedProperty.price}</div>
                        <Link href={`/property/${relatedProperty.id}`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-xl">
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
