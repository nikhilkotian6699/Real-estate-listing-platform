import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface LocationSectionProps {
  coordinates: { lat: number; lng: number }
  address: string
}

export default function LocationSection({ coordinates, address }: LocationSectionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Location
        </h3>
        <div className="mb-4">
          <p className="text-gray-700">{address}</p>
        </div>
        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-2" />
            <p>Interactive Map</p>
            <p className="text-sm">
              Lat: {coordinates.lat}, Lng: {coordinates.lng}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
