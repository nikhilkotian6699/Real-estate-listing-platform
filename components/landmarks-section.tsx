import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface Landmark {
  name: string
  icon: LucideIcon
  distance: string
}

interface LandmarksSectionProps {
  landmarks: Landmark[]
}

export default function LandmarksSection({ landmarks }: LandmarksSectionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Nearby Landmarks</h3>
        <div className="flex flex-wrap gap-4">
          {landmarks.map((landmark, index) => (
            <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <landmark.icon className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium">{landmark.name}</div>
                <div className="text-xs text-gray-600">{landmark.distance}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
