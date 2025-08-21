import { Home, Bed, Bath, Square, Car, Zap, Droplets, Shield, TreePine } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface PropertyDetails {
  bedrooms: string | number
  bathrooms: string | number
  area: string
  parking: string
  furnished: string
  facing: string
  floor: string
  age: string
  electricity: string
  water: string
  security: string
}

interface PropertyInfoGridProps {
  details: PropertyDetails
}

export default function PropertyInfoGrid({ details }: PropertyInfoGridProps) {
  const infoItems = [
    { icon: Bed, label: "Bedrooms", value: details.bedrooms },
    { icon: Bath, label: "Bathrooms", value: details.bathrooms },
    { icon: Square, label: "Area", value: details.area },
    { icon: Car, label: "Parking", value: details.parking },
    { icon: Home, label: "Furnished", value: details.furnished },
    { icon: TreePine, label: "Facing", value: details.facing },
    { icon: Home, label: "Floor", value: details.floor },
    { icon: Home, label: "Age", value: details.age },
    { icon: Zap, label: "Electricity", value: details.electricity },
    { icon: Droplets, label: "Water", value: details.water },
    { icon: Shield, label: "Security", value: details.security },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Property Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {infoItems.map((item, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
              <item.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-sm font-medium">{item.value}</div>
              <div className="text-xs text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
