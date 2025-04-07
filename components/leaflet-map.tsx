"use client"

import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet"
import L from "leaflet"
import { ZoomIn, ZoomOut, LocateFixed, Layers } from "lucide-react"
import "leaflet/dist/leaflet.css"

// Default center coordinates for Nalgonda, India
const DEFAULT_CENTER = [17.0575, 79.2674]
const DEFAULT_ZOOM = 13

// Available map styles
const MAP_STYLES = [
  {
    name: "Street",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  },
  {
    name: "Terrain",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  },
]

// Sample civic issues data for demonstration
const SAMPLE_ISSUES = [
  {
    id: 1,
    position: [17.0575, 79.2674],
    title: "Water Supply Issue",
    description: "Irregular water supply in RTC Colony",
    department: "water",
  },
  {
    id: 2,
    position: [17.0625, 79.2714],
    title: "Streetlight Out",
    description: "Streetlight on NG College Road not working",
    department: "municipal",
  },
  {
    id: 3,
    position: [17.0535, 79.2624],
    title: "Pothole",
    description: "Deep pothole on Miryalaguda Road",
    department: "roads",
  },
]

// Component to update map view when center changes
function ChangeMapView({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

// Fix for Leaflet default icon issue
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

interface LeafletMapProps {
  currentDepartment: string
}

export default function LeafletMap({ currentDepartment }: LeafletMapProps) {
  const [mapStyle, setMapStyle] = useState(0)
  const [center, setCenter] = useState(DEFAULT_CENTER)
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [showStyleSelector, setShowStyleSelector] = useState(false)
  const mapRef = useRef(null)

  // Filter issues based on selected department
  const filteredIssues = SAMPLE_ISSUES.filter(
    (issue) => currentDepartment === "all" || issue.department === currentDepartment,
  )

  // Handle user location
  const handleGetUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCenter([latitude, longitude])
          setZoom(15)
        },
        (error) => {
          console.error("Error getting user location:", error)
          alert("Could not get your location. Please check your browser permissions.")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 18))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 3))
  }

  // Get department color for markers
  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "water":
        return "blue"
      case "municipal":
        return "gray"
      case "roads":
        return "purple"
      case "electricity":
        return "yellow"
      case "sanitation":
        return "green"
      default:
        return "red"
    }
  }

  return (
    <div className="h-full relative">
      {/* Map Container */}
      <div className="h-full w-full">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          ref={mapRef}
        >
          <TileLayer url={MAP_STYLES[mapStyle].url} attribution={MAP_STYLES[mapStyle].attribution} />

          {/* Markers for civic issues */}
          {filteredIssues.map((issue) => (
            <Marker key={issue.id} position={issue.position}>
              <Popup>
                <div className="p-1">
                  <h3 className="font-semibold text-sm">{issue.title}</h3>
                  <p className="text-xs text-gray-600">{issue.description}</p>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 mt-1 inline-block rounded-full bg-${getDepartmentColor(issue.department)}-100 text-${getDepartmentColor(issue.department)}-700`}
                  >
                    {issue.department.charAt(0).toUpperCase() + issue.department.slice(1)}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Update map view when center/zoom changes */}
          <ChangeMapView center={center} zoom={zoom} />
          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>

      {/* Map Style Selector */}
      <div className="absolute bottom-4 right-4 bg-white p-1.5 rounded-lg shadow-lg space-y-1 z-[1000]">
        <button
          className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
          title="Change Map Style"
          onClick={() => setShowStyleSelector(!showStyleSelector)}
        >
          <Layers className="w-4 h-4" />
        </button>
        <button
          className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
          title="Zoom In"
          onClick={handleZoomIn}
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
          title="Zoom Out"
          onClick={handleZoomOut}
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
          title="My Location"
          onClick={handleGetUserLocation}
        >
          <LocateFixed className="w-4 h-4" />
        </button>
      </div>

      {/* Map Style Selector Dropdown */}
      {showStyleSelector && (
        <div className="absolute bottom-24 right-4 bg-white p-2 rounded-lg shadow-lg z-[1000]">
          <div className="text-sm font-medium mb-2 text-gray-700">Map Style</div>
          {MAP_STYLES.map((style, index) => (
            <button
              key={style.name}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                mapStyle === index ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setMapStyle(index)
                setShowStyleSelector(false)
              }}
            >
              {style.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

