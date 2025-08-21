"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Menu,
  Sun,
  Moon,
  Home,
  Building,
  Tractor,
  Factory,
  MapPin,
  IndianRupee,
  User,
  UserPlus,
  Plus,
} from "lucide-react"

const BuyerRequirementsPage = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  // Form state
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [location, setLocation] = useState("")
  const [budget, setBudget] = useState([500000, 5000000])
  const [additionalRequirements, setAdditionalRequirements] = useState("")

  // Residential specific
  const [bedrooms, setBedrooms] = useState("2")
  const [bathrooms, setBathrooms] = useState("2")
  const [propertySubType, setPropertySubType] = useState("")
  const [residentialAmenities, setResidentialAmenities] = useState<string[]>([])

  // Agricultural specific
  const [landArea, setLandArea] = useState("")
  const [soilType, setSoilType] = useState("")
  const [waterSource, setWaterSource] = useState("")
  const [cropType, setCropType] = useState("")

  // Commercial specific
  const [floorArea, setFloorArea] = useState("")
  const [buildingType, setBuildingType] = useState("")
  const [parkingSpaces, setParkingSpaces] = useState("")
  const [businessType, setBusinessType] = useState("")

  // Industrial specific
  const [plotSize, setPlotSize] = useState("")
  const [powerRequirement, setPowerRequirement] = useState("")
  const [industryType, setIndustryType] = useState("")
  const [transportationAccess, setTransportationAccess] = useState<string[]>([])

  // UI state
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const propertyTypes = [
    {
      id: "residential",
      name: "Residential",
      icon: Home,
      color: "blue",
      description: "Houses, Apartments, Villas",
      bgColor:
        "bg-blue-50 hover:bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:border-blue-800",
      textColor: "text-blue-700 dark:text-blue-300",
      selectedBg: "bg-blue-100 border-blue-400 dark:bg-blue-900/40 dark:border-blue-600",
    },
    {
      id: "commercial",
      name: "Commercial",
      icon: Building,
      color: "orange",
      description: "Offices, Shops, Warehouses",
      bgColor:
        "bg-orange-50 hover:bg-orange-100 border-orange-200 dark:bg-orange-900/20 dark:hover:bg-orange-900/30 dark:border-orange-800",
      textColor: "text-orange-700 dark:text-orange-300",
      selectedBg: "bg-orange-100 border-orange-400 dark:bg-orange-900/40 dark:border-orange-600",
    },
    {
      id: "agricultural",
      name: "Agricultural",
      icon: Tractor,
      color: "green",
      description: "Farmland, Plantations",
      bgColor:
        "bg-green-50 hover:bg-green-100 border-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:border-green-800",
      textColor: "text-green-700 dark:text-green-300",
      selectedBg: "bg-green-100 border-green-400 dark:bg-green-900/40 dark:border-green-600",
    },
    {
      id: "industrial",
      name: "Industrial",
      icon: Factory,
      color: "purple",
      description: "Manufacturing, Factories",
      bgColor:
        "bg-purple-50 hover:bg-purple-100 border-purple-200 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 dark:border-purple-800",
      textColor: "text-purple-700 dark:text-purple-300",
      selectedBg: "bg-purple-100 border-purple-400 dark:bg-purple-900/40 dark:border-purple-600",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Collect all form data
    const formData = {
      personalInfo: { name, phone, email },
      propertyType,
      location,
      budget,
      additionalRequirements,
      ...(propertyType === "residential" && {
        residential: { bedrooms, bathrooms, propertySubType, amenities: residentialAmenities },
      }),
      ...(propertyType === "agricultural" && {
        agricultural: { landArea, soilType, waterSource, cropType },
      }),
      ...(propertyType === "commercial" && {
        commercial: { floorArea, buildingType, parkingSpaces, businessType },
      }),
      ...(propertyType === "industrial" && {
        industrial: { plotSize, powerRequirement, industryType, transportationAccess },
      }),
    }

    console.log("Buyer Requirements Submitted:", formData)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Redirect after 4 seconds
    setTimeout(() => {
      switch (propertyType) {
        case "residential":
          router.push("/residential")
          break
        case "agricultural":
          router.push("/agriculture")
          break
        case "commercial":
          router.push("/commercial")
          break
        case "industrial":
          router.push("/industrial")
          break
        default:
          router.push("/")
      }
    }, 4000)
  }

  const handlePropertyTypeSelect = (type: string) => {
    setPropertyType(type)
    // Reset property-specific fields when changing type
    setBedrooms("2")
    setBathrooms("2")
    setPropertySubType("")
    setResidentialAmenities([])
    setLandArea("")
    setSoilType("")
    setWaterSource("")
    setCropType("")
    setFloorArea("")
    setBuildingType("")
    setParkingSpaces("")
    setBusinessType("")
    setPlotSize("")
    setPowerRequirement("")
    setIndustryType("")
    setTransportationAccess([])
  }

  const toggleResidentialAmenity = (amenity: string) => {
    if (residentialAmenities.includes(amenity)) {
      setResidentialAmenities(residentialAmenities.filter((a) => a !== amenity))
    } else {
      setResidentialAmenities([...residentialAmenities, amenity])
    }
  }

  const toggleTransportationAccess = (access: string) => {
    if (transportationAccess.includes(access)) {
      setTransportationAccess(transportationAccess.filter((a) => a !== access))
    } else {
      setTransportationAccess([...transportationAccess, access])
    }
  }

  const getSelectedPropertyType = () => {
    return propertyTypes.find((type) => type.id === propertyType)
  }

  if (isSubmitted) {
    const selectedType = getSelectedPropertyType()
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-14 h-14 text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Thank You!
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                  We will help you find the perfect {selectedType?.name.toLowerCase()} property!
                </p>
              </div>
              <div className="space-y-4">
                {selectedType && (
                  <div
                    className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full border-2 ${selectedType.selectedBg} ${selectedType.textColor} shadow-md`}
                  >
                    <selectedType.icon className="w-6 h-6" />
                    <span className="font-semibold text-lg">{selectedType.name} Properties</span>
                  </div>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Our expert team will contact you within 24 hours with the best {selectedType?.name.toLowerCase()}{" "}
                  properties in {location || "your preferred location"} matching your budget and requirements.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                <span>Redirecting to {selectedType?.name.toLowerCase()} properties...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
              >
                <SheetHeader className="pb-6">
                  <SheetTitle className="text-xl font-bold text-gray-900 dark:text-white">Navigation Menu</SheetTitle>
                </SheetHeader>

                {/* Authentication Section */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Account
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start h-12 text-left border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <User className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Sign In</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-12 text-left border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <UserPlus className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Sign Up</span>
                    </Button>
                  </div>
                </div>

                <Separator className="my-6 bg-gray-200 dark:bg-gray-600" />

                {/* User Types Section */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User Types
                  </h3>
                  <div className="space-y-2">
                    <Link href="/buyer-requirements" className="block">
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-left bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      >
                        <span className="font-medium">Buyer</span>
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Agent
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Builder
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Investor
                    </Button>
                  </div>
                </div>

                <Separator className="my-6 bg-gray-200 dark:bg-gray-600" />

                {/* Property Types Section */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Property Types
                  </h3>
                  <div className="space-y-2">
                    <Link href="/residential" className="block">
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-left text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Home className="w-4 h-4 mr-3" />
                        <span>Residential</span>
                      </Button>
                    </Link>
                    <Link href="/commercial" className="block">
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-left text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400"
                      >
                        <Building className="w-4 h-4 mr-3" />
                        <span>Commercial</span>
                      </Button>
                    </Link>
                    <Link href="/agriculture" className="block">
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-left text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400"
                      >
                        <Tractor className="w-4 h-4 mr-3" />
                        <span>Agricultural</span>
                      </Button>
                    </Link>
                    <Link href="/industrial" className="block">
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-left text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400"
                      >
                        <Factory className="w-4 h-4 mr-3" />
                        <span>Industrial</span>
                      </Button>
                    </Link>
                  </div>
                </div>

                <Separator className="my-6 bg-gray-200 dark:bg-gray-600" />

                {/* Post Property Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </h3>
                  <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Property
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GroLow
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/buyer-requirements"
                className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Buyer
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Agent
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Builder
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Investor
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-600 dark:text-gray-300" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-600 dark:text-gray-300" />
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                Post Property
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span>Buyer Requirements</span>
            </CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Tell us what you're looking for and we'll help you find the perfect property
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center space-x-3 text-gray-800 dark:text-gray-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <span>Personal Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter your full name"
                      className="h-12 border-2 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+91 9876543210"
                      className="h-12 border-2 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your.email@example.com"
                      className="h-12 border-2 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Property Type Selection */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center space-x-3 text-gray-800 dark:text-gray-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <span>Choose Property Type</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {propertyTypes.map((type) => {
                    const IconComponent = type.icon
                    const isSelected = propertyType === type.id
                    return (
                      <Card
                        key={type.id}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                          isSelected ? type.selectedBg : type.bgColor
                        } ${isSelected ? "shadow-lg scale-105" : "hover:scale-102"}`}
                        onClick={() => handlePropertyTypeSelect(type.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                isSelected ? "bg-white dark:bg-gray-800 shadow-md" : "bg-white/70 dark:bg-gray-700/70"
                              }`}
                            >
                              <IconComponent className={`w-6 h-6 ${type.textColor}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-bold text-lg ${type.textColor}`}>{type.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                            </div>
                            {isSelected && (
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Location and Budget - Only show if property type is selected */}
              {propertyType && (
                <>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center space-x-3 text-gray-800 dark:text-gray-200">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <span>Location & Budget</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>Preferred Location *</span>
                        </Label>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger className="h-12 border-2 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                            <SelectValue placeholder="Select preferred location" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                            <SelectItem value="mangalore">Mangalore</SelectItem>
                            <SelectItem value="udupi">Udupi</SelectItem>
                            <SelectItem value="puttur">Puttur</SelectItem>
                            <SelectItem value="sullia">Sullia</SelectItem>
                            <SelectItem value="bantwal">Bantwal</SelectItem>
                            <SelectItem value="belthangady">Belthangady</SelectItem>
                            <SelectItem value="kundapur">Kundapur</SelectItem>
                            <SelectItem value="karkala">Karkala</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                          <IndianRupee className="w-4 h-4" />
                          <span>Budget Range</span>
                        </Label>
                        <div className="space-y-3">
                          <div className="flex justify-between text-lg font-semibold text-gray-700 dark:text-gray-300">
                            <span>₹{budget[0].toLocaleString()}</span>
                            <span>₹{budget[1].toLocaleString()}</span>
                          </div>
                          <Slider
                            value={budget}
                            onValueChange={setBudget}
                            max={10000000}
                            min={100000}
                            step={100000}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Property Type Specific Requirements */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center space-x-3 text-gray-800 dark:text-gray-200">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        4
                      </div>
                      <span>Specific Requirements</span>
                    </h3>

                    {propertyType === "residential" && (
                      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                        <h4 className="text-xl font-bold flex items-center space-x-2 text-blue-700 dark:text-blue-300 mb-6">
                          <Home className="w-6 h-6" />
                          <span>Residential Requirements</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bedrooms</Label>
                            <Select value={bedrooms} onValueChange={setBedrooms}>
                              <SelectTrigger className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-700">
                                <SelectItem value="1">1 BHK</SelectItem>
                                <SelectItem value="2">2 BHK</SelectItem>
                                <SelectItem value="3">3 BHK</SelectItem>
                                <SelectItem value="4">4+ BHK</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bathrooms</Label>
                            <Select value={bathrooms} onValueChange={setBathrooms}>
                              <SelectTrigger className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-700">
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Property Type
                            </Label>
                            <Select value={propertySubType} onValueChange={setPropertySubType}>
                              <SelectTrigger className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-700">
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="house">Independent House</SelectItem>
                                <SelectItem value="penthouse">Penthouse</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Preferred Amenities
                          </Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                              "Swimming Pool",
                              "Gym",
                              "Parking",
                              "Security",
                              "Garden",
                              "Elevator",
                              "Balcony",
                              "Power Backup",
                            ].map((amenity) => (
                              <div
                                key={amenity}
                                className="flex items-center space-x-2 bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
                              >
                                <Checkbox
                                  id={amenity}
                                  checked={residentialAmenities.includes(amenity)}
                                  onCheckedChange={() => toggleResidentialAmenity(amenity)}
                                />
                                <Label
                                  htmlFor={amenity}
                                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                  {amenity}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {propertyType === "agricultural" && (
                      <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                        <h4 className="text-xl font-bold flex items-center space-x-2 text-green-700 dark:text-green-300 mb-6">
                          <Tractor className="w-6 h-6" />
                          <span>Agricultural Requirements</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Land Area (Acres)
                            </Label>
                            <Input
                              value={landArea}
                              onChange={(e) => setLandArea(e.target.value)}
                              placeholder="e.g., 5 acres"
                              className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Soil Type</Label>
                            <Select value={soilType} onValueChange={setSoilType}>
                              <SelectTrigger className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                <SelectValue placeholder="Select soil type" />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-700">
                                <SelectItem value="red">Red Soil</SelectItem>
                                <SelectItem value="black">Black Soil</SelectItem>
                                <SelectItem value="laterite">Laterite Soil</SelectItem>
                                <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                                <SelectItem value="clay">Clay Soil</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Water Source
                            </Label>
                            <Select value={waterSource} onValueChange={setWaterSource}>
                              <SelectTrigger className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                <SelectValue placeholder="Select water source" />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-700">
                                <SelectItem value="borewell">Borewell</SelectItem>
                                <SelectItem value="river">River</SelectItem>
                                <SelectItem value="canal">Canal</SelectItem>
                                <SelectItem value="rainwater">Rainwater</SelectItem>
                                <SelectItem value="well">Open Well</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Intended Crop
                            </Label>
                            <Select value={cropType} onValueChange={setCropType}>
                              <SelectTrigger className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                <SelectValue placeholder="Select crop type" />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-700">
                                <SelectItem value="rice">Rice</SelectItem>
                                <SelectItem value="coconut">Coconut</SelectItem>
                                <SelectItem value="areca">Areca Nut</SelectItem>
                                <SelectItem value="rubber">Rubber</SelectItem>
                                <SelectItem value="spices">Spices</SelectItem>
                                <SelectItem value="vegetables">Vegetables</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {propertyType === "commercial" && (
                      <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border-2 border-orange-200 dark:border-orange-800">
                        <h4 className="text-xl font-bold flex items-center space-x-2 text-orange-700 dark:text-orange-300 mb-6">
                          <Building className="w-6 h-6" />
                          <span>Commercial Requirements</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Floor Area (sq ft)
                            </Label>
                            <Input
                              value={floorArea}
                              onChange={(e) => setFloorArea(e.target.value)}
                              placeholder="e.g., 2000 sq ft"
                              className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Building Type
                            </Label>
                            <Select value={buildingType} onValueChange={setBuildingType}>
                              <SelectTrigger className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                <SelectValue placeholder="Select building type" />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-700">
                                <SelectItem value="office">Office Space</SelectItem>
                                <SelectItem value="retail">Retail Shop</SelectItem>
                                <SelectItem value="warehouse">Warehouse</SelectItem>
                                <SelectItem value="showroom">Showroom</SelectItem>
                                <SelectItem value="mall">Shopping Mall</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Parking Spaces
                            </Label>
                            <Input
                              value={parkingSpaces}
                              onChange={(e) => setParkingSpaces(e.target.value)}
                              placeholder="Number of parking spaces"
                              className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Business Type
                            </Label>
                            <Select value={businessType} onValueChange={setBusinessType}>
                              <SelectTrigger className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                <SelectValue placeholder="Select business type" />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-700">
                                <SelectItem value="it">IT/Software</SelectItem>
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="restaurant">Restaurant</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {propertyType === "industrial" && (
                      <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                        <h4 className="text-xl font-bold flex items-center space-x-2 text-purple-700 dark:text-purple-300 mb-6">
                          <Factory className="w-6 h-6" />
                          <span>Industrial Requirements</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Plot Size (sq ft)
                            </Label>
                            <Input
                              value={plotSize}
                              onChange={(e) => setPlotSize(e.target.value)}
                              placeholder="e.g., 10000 sq ft"
                              className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Power Requirement (KW)
                            </Label>
                            <Input
                              value={powerRequirement}
                              onChange={(e) => setPowerRequirement(e.target.value)}
                              placeholder="e.g., 500 KW"
                              className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Industry Type
                            </Label>
                            <Select value={industryType} onValueChange={setIndustryType}>
                              <SelectTrigger className="h-12 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                                <SelectValue placeholder="Select industry type" />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-700">
                                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                <SelectItem value="textile">Textile</SelectItem>
                                <SelectItem value="food">Food Processing</SelectItem>
                                <SelectItem value="chemical">Chemical</SelectItem>
                                <SelectItem value="automotive">Automotive</SelectItem>
                                <SelectItem value="electronics">Electronics</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Transportation Access
                          </Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                              "Highway Access",
                              "Railway Line",
                              "Port Access",
                              "Airport Nearby",
                              "Truck Terminal",
                              "Container Service",
                            ].map((access) => (
                              <div
                                key={access}
                                className="flex items-center space-x-2 bg-white dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
                              >
                                <Checkbox
                                  id={access}
                                  checked={transportationAccess.includes(access)}
                                  onCheckedChange={() => toggleTransportationAccess(access)}
                                />
                                <Label
                                  htmlFor={access}
                                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                  {access}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Additional Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold flex items-center space-x-3 text-gray-800 dark:text-gray-200">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        5
                      </div>
                      <span>Additional Requirements</span>
                    </h3>
                    <Textarea
                      value={additionalRequirements}
                      onChange={(e) => setAdditionalRequirements(e.target.value)}
                      placeholder="Any specific requirements, preferences, or additional details..."
                      rows={4}
                      className="w-full border-2 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isSubmitting || !name || !phone || !email || !propertyType || !location}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-3">
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>Submitting Your Requirements...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5" />
                          <span>Submit My Requirements</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default BuyerRequirementsPage
