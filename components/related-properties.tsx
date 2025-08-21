import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function RelatedProperties() {
  const relatedProperties = [
    {
      id: "2",
      title: "Modern Apartment",
      price: "₹45,00,000",
      location: "Mangalore, Karnataka",
      image: "/placeholder.svg?height=200&width=300",
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: "950 sqft",
    },
    {
      id: "3",
      title: "Villa with Garden",
      price: "₹75,00,000",
      location: "Udupi, Karnataka",
      image: "/placeholder.svg?height=200&width=300",
      type: "Villa",
      bedrooms: 4,
      bathrooms: 3,
      area: "1800 sqft",
    },
    {
      id: "4",
      title: "Cozy House",
      price: "₹28,00,000",
      location: "Mangalore, Karnataka",
      image: "/placeholder.svg?height=200&width=300",
      type: "House",
      bedrooms: 2,
      bathrooms: 1,
      area: "800 sqft",
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                <Heart className="w-4 h-4" />
              </Button>
              <Badge className="absolute bottom-2 left-2">{property.type}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{property.title}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {property.location}
              </div>
              <div className="text-lg font-bold text-green-600 mb-2">{property.price}</div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{property.bedrooms} BHK</span>
                <span>{property.bathrooms} Bath</span>
                <span>{property.area}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
