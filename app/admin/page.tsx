"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Upload, Download, Save, MapPin, Building, Home, Factory, Tractor } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminPanel() {
  const [districts, setDistricts] = useState([{ id: 1, name: "Dakshina Kannada", code: "dakshina-kannada" }])

  const [taluks, setTaluks] = useState([
    { id: 1, name: "Mangaluru", code: "mangaluru", districtId: 1 },
    { id: 2, name: "Moodabidri", code: "moodabidri", districtId: 1 },
    { id: 3, name: "Bantwal", code: "bantwal", districtId: 1 },
    { id: 4, name: "Puttur", code: "puttur", districtId: 1 },
    { id: 5, name: "Belthangady", code: "belthangady", districtId: 1 },
    { id: 6, name: "Sullia", code: "sullia", districtId: 1 },
  ])

  const [locations, setLocations] = useState([
    { id: 1, name: "Ullal", type: "City", talukId: 1 },
    { id: 2, name: "Mulki", type: "City", talukId: 1 },
    { id: 3, name: "Surathkal", type: "City", talukId: 1 },
    { id: 4, name: "Adyapady", type: "Village", talukId: 1 },
    { id: 5, name: "Aikala", type: "Village", talukId: 1 },
  ])

  const [propertyTypes, setPropertyTypes] = useState({
    residential: ["Apartment", "Villa", "House", "Penthouse", "Studio", "Plot"],
    commercial: ["Office", "Showroom", "Warehouse", "Shop", "IT Office", "Co-working", "Shopping Complex"],
    agriculture: ["Farm Land", "Agricultural Plot", "Orchard", "Plantation", "Tea Estate", "Organic Farm"],
    industrial: [
      "Manufacturing",
      "Warehouse",
      "Textile Mill",
      "Food Processing",
      "Chemical Plant",
      "Auto Component",
      "Pharmaceutical",
    ],
  })

  const [budgetRanges, setBudgetRanges] = useState({
    residential: [
      { label: "₹0-50L", value: "0-50" },
      { label: "₹50L-1Cr", value: "50-100" },
      { label: "₹1-2Cr", value: "100-200" },
      { label: "₹2Cr+", value: "200+" },
    ],
    commercial: [
      { label: "₹0-1Cr", value: "0-100" },
      { label: "₹1-5Cr", value: "100-500" },
      { label: "₹5-10Cr", value: "500-1000" },
      { label: "₹10Cr+", value: "1000+" },
    ],
    agriculture: [
      { label: "₹0-50L", value: "0-50" },
      { label: "₹50L-1Cr", value: "50-100" },
      { label: "₹1-2Cr", value: "100-200" },
      { label: "₹2Cr+", value: "200+" },
    ],
    industrial: [
      { label: "₹0-5Cr", value: "0-500" },
      { label: "₹5-10Cr", value: "500-1000" },
      { label: "₹10-20Cr", value: "1000-2000" },
      { label: "₹20Cr+", value: "2000+" },
    ],
  })

  const [newDistrict, setNewDistrict] = useState({ name: "", code: "" })
  const [newTaluk, setNewTaluk] = useState({ name: "", code: "", districtId: "" })
  const [newLocation, setNewLocation] = useState({ name: "", type: "City", talukId: "" })
  const [bulkLocationText, setBulkLocationText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("residential")
  const [newPropertyType, setNewPropertyType] = useState("")
  const [newBudgetRange, setNewBudgetRange] = useState({ label: "", value: "" })

  // Bulk location import
  const handleBulkLocationImport = () => {
    const lines = bulkLocationText.split("\n").filter((line) => line.trim())
    const newLocations = []

    lines.forEach((line, index) => {
      const parts = line.split(",").map((part) => part.trim())
      if (parts.length >= 3) {
        const [name, type, talukName] = parts
        const taluk = taluks.find((t) => t.name.toLowerCase() === talukName.toLowerCase())
        if (taluk) {
          newLocations.push({
            id: locations.length + index + 1,
            name,
            type: type === "City" ? "City" : "Village",
            talukId: taluk.id,
          })
        }
      }
    })

    setLocations([...locations, ...newLocations])
    setBulkLocationText("")
  }

  // Export data
  const exportData = () => {
    const data = {
      districts,
      taluks,
      locations,
      propertyTypes,
      budgetRanges,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "property-data.json"
    a.click()
  }

  // Import data
  const importData = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          if (data.districts) setDistricts(data.districts)
          if (data.taluks) setTaluks(data.taluks)
          if (data.locations) setLocations(data.locations)
          if (data.propertyTypes) setPropertyTypes(data.propertyTypes)
          if (data.budgetRanges) setBudgetRanges(data.budgetRanges)
        } catch (error) {
          alert("Invalid JSON file")
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="GroLow" width={45} height={45} className="w-11 h-11" />
              <div className="text-2xl font-bold text-blue-600">GroLow Admin</div>
            </Link>
            <div className="flex items-center space-x-3">
              <Button onClick={exportData} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <label className="cursor-pointer">
                <Button variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
                <input type="file" accept=".json" onChange={importData} className="hidden" />
              </label>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700">Back to Site</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage all property platform data from one place</p>
        </div>

        <Tabs defaultValue="locations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="locations" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Locations</span>
            </TabsTrigger>
            <TabsTrigger value="property-types" className="flex items-center space-x-2">
              <Building className="w-4 h-4" />
              <span>Property Types</span>
            </TabsTrigger>
            <TabsTrigger value="budget-ranges" className="flex items-center space-x-2">
              <span>💰</span>
              <span>Budget Ranges</span>
            </TabsTrigger>
            <TabsTrigger value="bulk-operations" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Bulk Operations</span>
            </TabsTrigger>
          </TabsList>

          {/* Locations Management */}
          <TabsContent value="locations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Districts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>🏛️</span>
                    <span>Districts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="District Name"
                      value={newDistrict.name}
                      onChange={(e) => setNewDistrict({ ...newDistrict, name: e.target.value })}
                    />
                    <Input
                      placeholder="District Code"
                      value={newDistrict.code}
                      onChange={(e) => setNewDistrict({ ...newDistrict, code: e.target.value })}
                    />
                    <Button
                      onClick={() => {
                        if (newDistrict.name && newDistrict.code) {
                          setDistricts([...districts, { ...newDistrict, id: districts.length + 1 }])
                          setNewDistrict({ name: "", code: "" })
                        }
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add District
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {districts.map((district) => (
                      <div
                        key={district.id}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                      >
                        <span className="text-sm font-medium">{district.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDistricts(districts.filter((d) => d.id !== district.id))}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Taluks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>🏘️</span>
                    <span>Taluks</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Select
                      value={newTaluk.districtId}
                      onValueChange={(value) => setNewTaluk({ ...newTaluk, districtId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.id} value={district.id.toString()}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Taluk Name"
                      value={newTaluk.name}
                      onChange={(e) => setNewTaluk({ ...newTaluk, name: e.target.value })}
                    />
                    <Input
                      placeholder="Taluk Code"
                      value={newTaluk.code}
                      onChange={(e) => setNewTaluk({ ...newTaluk, code: e.target.value })}
                    />
                    <Button
                      onClick={() => {
                        if (newTaluk.name && newTaluk.code && newTaluk.districtId) {
                          setTaluks([
                            ...taluks,
                            { ...newTaluk, id: taluks.length + 1, districtId: Number.parseInt(newTaluk.districtId) },
                          ])
                          setNewTaluk({ name: "", code: "", districtId: "" })
                        }
                      }}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Taluk
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {taluks.map((taluk) => (
                      <div
                        key={taluk.id}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                      >
                        <span className="text-sm font-medium">{taluk.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setTaluks(taluks.filter((t) => t.id !== taluk.id))}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Locations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>📍</span>
                    <span>Cities & Villages</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Select
                      value={newLocation.talukId}
                      onValueChange={(value) => setNewLocation({ ...newLocation, talukId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Taluk" />
                      </SelectTrigger>
                      <SelectContent>
                        {taluks.map((taluk) => (
                          <SelectItem key={taluk.id} value={taluk.id.toString()}>
                            {taluk.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Location Name"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                    />
                    <Select
                      value={newLocation.type}
                      onValueChange={(value) => setNewLocation({ ...newLocation, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Location Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="City">🏙️ City</SelectItem>
                        <SelectItem value="Village">🏘️ Village</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() => {
                        if (newLocation.name && newLocation.talukId) {
                          setLocations([
                            ...locations,
                            { ...newLocation, id: locations.length + 1, talukId: Number.parseInt(newLocation.talukId) },
                          ])
                          setNewLocation({ name: "", type: "City", talukId: "" })
                        }
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Location
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {locations.map((location) => (
                      <div
                        key={location.id}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{location.name}</span>
                          <Badge variant={location.type === "City" ? "default" : "secondary"} className="text-xs">
                            {location.type}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setLocations(locations.filter((l) => l.id !== location.id))}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Property Types Management */}
          <TabsContent value="property-types" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>Property Types Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">🏠 Residential</SelectItem>
                      <SelectItem value="commercial">🏢 Commercial</SelectItem>
                      <SelectItem value="agriculture">🌾 Agriculture</SelectItem>
                      <SelectItem value="industrial">🏭 Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="New Property Type"
                    value={newPropertyType}
                    onChange={(e) => setNewPropertyType(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      if (newPropertyType && selectedCategory) {
                        setPropertyTypes({
                          ...propertyTypes,
                          [selectedCategory]: [...propertyTypes[selectedCategory], newPropertyType],
                        })
                        setNewPropertyType("")
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Type
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(propertyTypes).map(([category, types]) => (
                    <Card key={category} className="border-2">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          {category === "residential" && <Home className="w-5 h-5 text-blue-600" />}
                          {category === "commercial" && <Building className="w-5 h-5 text-orange-600" />}
                          {category === "agriculture" && <Tractor className="w-5 h-5 text-green-600" />}
                          {category === "industrial" && <Factory className="w-5 h-5 text-purple-600" />}
                          <span className="capitalize">{category}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {types.map((type, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                          >
                            <span className="text-sm">{type}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setPropertyTypes({
                                  ...propertyTypes,
                                  [category]: types.filter((_, i) => i !== index),
                                })
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Budget Ranges Management */}
          <TabsContent value="budget-ranges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>💰</span>
                  <span>Budget Ranges Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">🏠 Residential</SelectItem>
                      <SelectItem value="commercial">🏢 Commercial</SelectItem>
                      <SelectItem value="agriculture">🌾 Agriculture</SelectItem>
                      <SelectItem value="industrial">🏭 Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Range Label (e.g., ₹0-50L)"
                    value={newBudgetRange.label}
                    onChange={(e) => setNewBudgetRange({ ...newBudgetRange, label: e.target.value })}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Range Value (e.g., 0-50)"
                    value={newBudgetRange.value}
                    onChange={(e) => setNewBudgetRange({ ...newBudgetRange, value: e.target.value })}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      if (newBudgetRange.label && newBudgetRange.value && selectedCategory) {
                        setBudgetRanges({
                          ...budgetRanges,
                          [selectedCategory]: [...budgetRanges[selectedCategory], newBudgetRange],
                        })
                        setNewBudgetRange({ label: "", value: "" })
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Range
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(budgetRanges).map(([category, ranges]) => (
                    <Card key={category} className="border-2">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <span>💰</span>
                          <span className="capitalize">{category}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {ranges.map((range, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                          >
                            <span className="text-sm font-medium">{range.label}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setBudgetRanges({
                                  ...budgetRanges,
                                  [category]: ranges.filter((_, i) => i !== index),
                                })
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bulk Operations */}
          <TabsContent value="bulk-operations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Bulk Location Import</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Format Instructions:</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                    Enter one location per line in the format: <code>Name, Type, Taluk</code>
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Example: Ullal, City, Mangaluru</p>
                </div>
                <Textarea
                  placeholder="Ullal, City, Mangaluru&#10;Mulki, City, Mangaluru&#10;Adyapady, Village, Mangaluru"
                  value={bulkLocationText}
                  onChange={(e) => setBulkLocationText(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />
                <Button
                  onClick={handleBulkLocationImport}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={!bulkLocationText.trim()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import Locations
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Save className="w-5 h-5" />
                  <span>Data Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{districts.length}</div>
                    <div className="text-sm text-blue-800 dark:text-blue-200">Districts</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{taluks.length}</div>
                    <div className="text-sm text-green-800 dark:text-green-200">Taluks</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">{locations.length}</div>
                    <div className="text-sm text-purple-800 dark:text-purple-200">Locations</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {Object.values(propertyTypes).flat().length}
                    </div>
                    <div className="text-sm text-orange-800 dark:text-orange-200">Property Types</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
