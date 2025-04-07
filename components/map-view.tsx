"use client"
import { Filter } from "lucide-react"
import dynamic from "next/dynamic"

// Import the LeafletMap component with dynamic import and ssr: false
const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-gray-200 flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading map...</div>
    </div>
  ),
})

interface MapViewProps {
  currentDepartment: string
}

export default function MapView({ currentDepartment }: MapViewProps) {
  return (
    <div className="h-full relative">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg space-y-3 max-w-xs w-full z-[1000]">
        <button className="flex items-center w-full text-left text-sm p-2 hover:bg-gray-100 rounded-md transition-colors">
          <Filter className="w-4 h-4 mr-2 text-gray-500" />
          Filter Issues
        </button>
        <input
          type="text"
          placeholder="Search Nalgonda area..."
          className="w-full p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Leaflet Map Component */}
      <LeafletMap currentDepartment={currentDepartment} />
    </div>
  )
}

