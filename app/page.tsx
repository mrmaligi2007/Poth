"use client"

import { useState } from "react"
import {
  Home,
  Map,
  PlusCircle,
  TrendingUp,
  User,
  MapPin,
  Search,
  Bell,
  LayoutList,
  Landmark,
  Droplet,
  Zap,
  RouteIcon as Road,
  Recycle,
  HeartPulse,
  Shield,
  GraduationCap,
  Bus,
  TreePine,
  HelpCircle,
  ThumbsUp,
  MessageCircle,
  Share2,
  X,
  UploadCloud,
  Settings,
  LogOut,
  FileText,
  CheckCircle,
  MessagesSquare,
  FolderSearch,
  BarChartBig,
  Plus,
} from "lucide-react"
import dynamic from "next/dynamic"

// Import MapView with dynamic import to prevent SSR issues with Leaflet
const MapView = dynamic(() => import("../components/map-view"), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-gray-200 flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading map...</div>
    </div>
  ),
})

export default function CivicReporter() {
  const [currentView, setCurrentView] = useState("feed-view")
  const [currentDepartment, setCurrentDepartment] = useState("all")

  const navigateTo = (viewId: string) => {
    setCurrentView(viewId)
    // Scroll to top when changing views
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDepartmentChange = (department: string) => {
    setCurrentDepartment(department)
  }

  // Filter items based on selected department
  const shouldShowItem = (itemDepartment: string) => {
    return currentDepartment === "all" || itemDepartment === currentDepartment
  }

  return (
    <div className="min-h-screen md:flex bg-slate-100 font-sans antialiased">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-shrink-0 bg-white border-r p-4 shadow-sm fixed md:sticky top-0 h-screen overflow-y-auto z-30 flex-col">
        <div className="flex items-center space-x-2 mb-8 pt-3 px-1">
          <MapPin className="text-blue-500 text-2xl" />
          <h1 className="text-xl font-bold text-gray-800">Civic Reporter</h1>
        </div>
        <h2 className="text-xs font-semibold mb-2 text-gray-500 uppercase tracking-wider px-2">Navigation</h2>
        <nav className="space-y-1 flex-grow">
          <button
            onClick={() => navigateTo("feed-view")}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left ${
              currentView === "feed-view" ? "bg-blue-50 text-blue-500 font-semibold" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home className="text-xl" />
            <span>Feed</span>
          </button>
          <button
            onClick={() => navigateTo("map-view")}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left ${
              currentView === "map-view" ? "bg-blue-50 text-blue-500 font-semibold" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Map className="text-xl" />
            <span>Map</span>
          </button>
          <button
            onClick={() => navigateTo("report-view")}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left ${
              currentView === "report-view"
                ? "bg-blue-50 text-blue-500 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <PlusCircle className="text-xl" />
            <span>Report Issue</span>
          </button>
          <button
            onClick={() => navigateTo("trending-view")}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left ${
              currentView === "trending-view"
                ? "bg-blue-50 text-blue-500 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <TrendingUp className="text-xl" />
            <span>Trending</span>
          </button>
          <button
            onClick={() => navigateTo("profile-view")}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg w-full text-left ${
              currentView === "profile-view"
                ? "bg-blue-50 text-blue-500 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <User className="text-xl" />
            <span>Profile</span>
          </button>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          Nalgonda Civic Reporter &copy; 2025
        </div>
      </aside>

      <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm sticky top-0 md:hidden px-4 h-16 flex items-center justify-between z-20 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <MapPin className="text-blue-500" />
            <h1 className="text-xl font-bold text-gray-800">Civic Reporter</h1>
          </div>
          <div className="flex items-center space-x-1">
            <button className="text-gray-500 hover:text-blue-500 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search />
            </button>
            <button className="text-gray-500 hover:text-blue-500 relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell />
              <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-danger-DEFAULT ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {/* Department Tabs */}
        <div className="bg-white px-4 py-2 border-b flex items-center space-x-1 overflow-x-auto no-scrollbar sticky top-16 md:top-0 z-10 flex-shrink-0 h-14">
          <button
            onClick={() => handleDepartmentChange("all")}
            className={`dept-tab flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 whitespace-nowrap transition-colors duration-150 ${
              currentDepartment === "all" ? "border-b-3 border-blue-500 text-blue-500 font-semibold" : "text-gray-700"
            }`}
          >
            <LayoutList className="w-4 h-4 mr-1.5" />
            All Issues
          </button>
          <button
            onClick={() => handleDepartmentChange("municipal")}
            className={`dept-tab flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 whitespace-nowrap transition-colors duration-150 ${
              currentDepartment === "municipal"
                ? "border-b-3 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-700"
            }`}
          >
            <Landmark className="w-4 h-4 mr-1.5" />
            Municipal
          </button>
          <button
            onClick={() => handleDepartmentChange("water")}
            className={`dept-tab flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 whitespace-nowrap transition-colors duration-150 ${
              currentDepartment === "water" ? "border-b-3 border-blue-500 text-blue-500 font-semibold" : "text-gray-700"
            }`}
          >
            <Droplet className="w-4 h-4 mr-1.5" />
            Water
          </button>
          <button
            onClick={() => handleDepartmentChange("electricity")}
            className={`dept-tab flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 whitespace-nowrap transition-colors duration-150 ${
              currentDepartment === "electricity"
                ? "border-b-3 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-700"
            }`}
          >
            <Zap className="w-4 h-4 mr-1.5" />
            Electricity
          </button>
          <button
            onClick={() => handleDepartmentChange("roads")}
            className={`dept-tab flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 whitespace-nowrap transition-colors duration-150 ${
              currentDepartment === "roads" ? "border-b-3 border-blue-500 text-blue-500 font-semibold" : "text-gray-700"
            }`}
          >
            <Road className="w-4 h-4 mr-1.5" />
            Roads (R&B)
          </button>
          <button
            onClick={() => handleDepartmentChange("sanitation")}
            className={`dept-tab flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 whitespace-nowrap transition-colors duration-150 ${
              currentDepartment === "sanitation"
                ? "border-b-3 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-700"
            }`}
          >
            <Recycle className="w-4 h-4 mr-1.5" />
            Sanitation
          </button>
          <button
            onClick={() => handleDepartmentChange("health")}
            className={`dept-tab flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 whitespace-nowrap transition-colors duration-150 ${
              currentDepartment === "health"
                ? "border-b-3 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-700"
            }`}
          >
            <HeartPulse className="w-4 h-4 mr-1.5" />
            Health
          </button>
          <button
            onClick={() => handleDepartmentChange("police")}
            className={`dept-tab flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 whitespace-nowrap transition-colors duration-150 ${
              currentDepartment === "police"
                ? "border-b-3 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-700"
            }`}
          >
            <Shield className="w-4 h-4 mr-1.5" />
            Police/Safety
          </button>
          <button
            onClick={() => handleDepartmentChange("education")}
            className={`dept-tab flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 whitespace-nowrap transition-colors duration-150 ${
              currentDepartment === "education"
                ? "border-b-3 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-700"
            }`}
          >
            <GraduationCap className="w-4 h-4 mr-1.5" />
            Education
          </button>
          <button
            onClick={() => handleDepartmentChange("transport")}
            className={`dept-tab flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 whitespace-nowrap transition-colors duration-150 ${
              currentDepartment === "transport"
                ? "border-b-3 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-700"
            }`}
          >
            <Bus className="w-4 h-4 mr-1.5" />
            Transport (RTA)
          </button>
          <button
            onClick={() => handleDepartmentChange("environment")}
            className={`dept-tab flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 whitespace-nowrap transition-colors duration-150 ${
              currentDepartment === "environment"
                ? "border-b-3 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-700"
            }`}
          >
            <TreePine className="w-4 h-4 mr-1.5" />
            Environment
          </button>
          <button
            onClick={() => handleDepartmentChange("other")}
            className={`dept-tab flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-500 whitespace-nowrap transition-colors duration-150 ${
              currentDepartment === "other" ? "border-b-3 border-blue-500 text-blue-500 font-semibold" : "text-gray-700"
            }`}
          >
            <HelpCircle className="w-4 h-4 mr-1.5" />
            Other
          </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-grow overflow-y-auto no-scrollbar pb-20 md:pb-6 bg-slate-100">
          {/* Feed View */}
          {currentView === "feed-view" && (
            <div className="p-4 md:p-6 space-y-6">
              {/* No Results Message */}
              {["water", "municipal", "roads"].every((dept) => !shouldShowItem(dept)) && (
                <div className="text-center text-gray-500 py-16">
                  <FolderSearch className="mx-auto text-4xl mb-4 text-gray-400" />
                  <p className="text-lg font-medium">No issues found</p>
                  <p className="text-sm">Try selecting a different department or check back later.</p>
                </div>
              )}

              {/* Water Department Issue */}
              {shouldShowItem("water") && (
                <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-blue-300">
                  <div className="p-5">
                    <div className="flex items-center mb-4 space-x-3">
                      <div className="w-10 h-10 rounded-full flex-shrink-0 bg-sky-200 text-sky-900 flex items-center justify-center font-medium">
                        RG
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Ramesh G.</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Irregular water supply in RTC Colony for the past 3 days. Only getting water for 1 hour in the
                      morning. Please resolve.
                    </p>
                    <div className="rounded-lg mb-4 w-full object-cover max-h-72 border bg-sky-50 text-slate-600 flex items-center justify-center h-48">
                      Water Supply Issue
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-4 space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>RTC Colony, Nalgonda</span>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                        Water Dept.
                      </span>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        #Nalgonda
                      </span>
                    </div>
                    <div className="flex justify-around items-center border-t border-gray-100 pt-4 text-gray-600">
                      <button className="flex items-center space-x-1.5 text-sm hover:text-blue-500 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>25 Confirm</span>
                      </button>
                      <button className="flex items-center space-x-1.5 text-sm hover:text-blue-500 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>11 Comments</span>
                      </button>
                      <button className="flex items-center space-x-1.5 text-sm hover:text-blue-500 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </article>
              )}

              {/* Municipal Department Issue */}
              {shouldShowItem("municipal") && (
                <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-gray-300">
                  <div className="p-5">
                    <div className="flex items-center mb-4 space-x-3">
                      <div className="w-10 h-10 rounded-full flex-shrink-0 bg-red-200 text-red-900 flex items-center justify-center font-medium">
                        LP
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Lakshmi P.</p>
                        <p className="text-xs text-gray-500">Yesterday</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Streetlight on NG College Road near the junction has not been working for a week. It's very dark
                      and unsafe at night.
                    </p>
                    <div className="rounded-lg mb-4 w-full object-cover max-h-72 border bg-red-50 text-red-700 flex items-center justify-center h-48">
                      Streetlight Out
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-4 space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>NG College Road, Nalgonda</span>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                        Municipal
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                        #Safety
                      </span>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        #Nalgonda
                      </span>
                    </div>
                    <div className="flex justify-around items-center border-t border-gray-100 pt-4 text-gray-600">
                      <button className="flex items-center space-x-1.5 text-sm hover:text-blue-500 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>14 Confirm</span>
                      </button>
                      <button className="flex items-center space-x-1.5 text-sm hover:text-blue-500 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>5 Comments</span>
                      </button>
                      <button className="flex items-center space-x-1.5 text-sm hover:text-blue-500 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </article>
              )}

              {/* Roads Department Issue */}
              {shouldShowItem("roads") && (
                <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-gray-400">
                  <div className="p-5">
                    <div className="flex items-center mb-4 space-x-3">
                      <div className="w-10 h-10 rounded-full flex-shrink-0 bg-purple-200 text-purple-900 flex items-center justify-center font-medium">
                        AK
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Anand K.</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Deep pothole forming on Miryalaguda Road just after the bridge. Dangerous for two-wheelers.
                    </p>
                    <div className="rounded-lg mb-4 w-full object-cover max-h-72 border bg-purple-50 text-purple-700 flex items-center justify-center h-48">
                      Pothole
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-4 space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>Miryalaguda Road, Nalgonda</span>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                        Roads (R&B)
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                        #RoadSafety
                      </span>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        #Nalgonda
                      </span>
                    </div>
                    <div className="flex justify-around items-center border-t border-gray-100 pt-4 text-gray-600">
                      <button className="flex items-center space-x-1.5 text-sm hover:text-blue-500 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>19 Confirm</span>
                      </button>
                      <button className="flex items-center space-x-1.5 text-sm hover:text-blue-500 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>6 Comments</span>
                      </button>
                      <button className="flex items-center space-x-1.5 text-sm hover:text-blue-500 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </article>
              )}
            </div>
          )}

          {/* Map View */}
          {currentView === "map-view" && (
            <div className="h-full">
              <MapView currentDepartment={currentDepartment} />
            </div>
          )}

          {/* Report View */}
          {currentView === "report-view" && (
            <div className="p-4 md:p-6">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8 pb-4 border-b">
                  <h2 className="text-2xl font-semibold text-gray-800">Report New Issue</h2>
                  <button
                    onClick={() => navigateTo("feed-view")}
                    className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    title="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault()
                    alert("Report submitted successfully! (Demo)")
                    navigateTo("feed-view")
                  }}
                >
                  <div>
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Photo (Optional)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-6 pb-7 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors duration-200 cursor-pointer">
                      <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-300" />
                        <div className="flex text-sm text-gray-600 justify-center items-center">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-500 hover:text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-1"
                          >
                            <span>Choose a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/png, image/jpeg"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                      </div>
                    </div>
                    <div id="image-preview" className="mt-2 text-sm text-gray-500"></div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      placeholder="Describe the issue clearly..."
                      required
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm transition duration-150 ease-in-out"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category (Department) *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      defaultValue=""
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm transition duration-150 ease-in-out"
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option value="municipal">Municipal (General, Pavement, Drainage)</option>
                      <option value="water">Water Supply / Leak</option>
                      <option value="electricity">Electricity / Power Cut / Streetlight</option>
                      <option value="roads">Roads / Pothole (Major Roads - R&B)</option>
                      <option value="sanitation">Garbage / Sanitation</option>
                      <option value="health">Health Related</option>
                      <option value="police">Police / Safety Concern</option>
                      <option value="education">Education / School Issue</option>
                      <option value="transport">Transport / RTA Issue</option>
                      <option value="environment">Environment / Forest / Trees</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <button
                      type="button"
                      className="mt-1 flex items-center justify-center w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      Tap to select location on map
                    </button>
                    <div className="mt-2 h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm border">
                      Map preview will appear here
                    </div>
                    <input
                      type="text"
                      id="location-text"
                      name="location-text"
                      placeholder="Or type address/landmark"
                      className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm transition duration-150 ease-in-out"
                    />
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date Observed (Defaults to Today)
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm transition duration-150 ease-in-out"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50"
                  >
                    Submit Report
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Trending View */}
          {currentView === "trending-view" && (
            <div className="p-4 md:p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5">Trending Issues in Nalgonda</h2>

              {/* No Results Message */}
              {["municipal", "electricity", "water"].every((dept) => !shouldShowItem(dept)) && (
                <div className="text-center text-gray-500 py-16">
                  <BarChartBig className="mx-auto text-4xl mb-4 text-gray-400" />
                  <p className="text-lg font-medium">No trending issues found</p>
                  <p className="text-sm">Check back later or view the main feed.</p>
                </div>
              )}

              {/* Municipal Trending Issue */}
              {shouldShowItem("municipal") && (
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center space-x-4 border-l-4 border-gray-300">
                  <div className="w-16 h-16 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 border">
                    Pave
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-800 mb-1 leading-snug">
                      Broken pavement near Clock Tower Centre, causing difficulty for walkers.
                    </p>
                    <p className="text-xs text-gray-500 mb-2 flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-gray-400" /> Clock Tower Centre, Nalgonda
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                        Municipal
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-700">
                        High confirms
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Electricity Trending Issue */}
              {shouldShowItem("electricity") && (
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center space-x-4 border-l-4 border-yellow-400">
                  <div className="w-16 h-16 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 border">
                    Power
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-800 mb-1 leading-snug">
                      Frequent power cuts reported in RTC Colony area over the past week.
                    </p>
                    <p className="text-xs text-gray-500 mb-2 flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-gray-400" /> RTC Colony, Nalgonda
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-50 text-yellow-700">
                        Electricity
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                        Multiple reports
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Water Trending Issue */}
              {shouldShowItem("water") && (
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center space-x-4 border-l-4 border-blue-300">
                  <div className="w-16 h-16 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center flex-shrink-0 border">
                    Water
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-800 mb-1 leading-snug">
                      Ongoing water supply issues affecting multiple households in RTC Colony.
                    </p>
                    <p className="text-xs text-gray-500 mb-2 flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-gray-400" /> RTC Colony, Nalgonda
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                        Water Dept.
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-green-700">
                        High discussion
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile View */}
          {currentView === "profile-view" && (
            <div className="p-4 md:p-6">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-lg mx-auto text-center">
                <div className="w-28 h-28 rounded-full mx-auto mb-5 border-4 border-white shadow-lg bg-slate-200 text-slate-600 flex items-center justify-center text-xl font-bold">
                  NR
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">Nalgonda Resident</h2>
                <p className="text-sm text-gray-500 mb-8">Joined Apr 2025</p>
                <div className="flex justify-around border-t border-gray-100 pt-6 mb-8">
                  <div className="text-center px-2">
                    <div className="flex items-center justify-center text-blue-500 mb-1">
                      <FileText className="w-4 h-4 mr-1" />
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Reports</p>
                  </div>
                  <div className="text-center px-2">
                    <div className="flex items-center justify-center text-blue-500 mb-1">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <p className="text-2xl font-bold">35</p>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Confirms</p>
                  </div>
                  <div className="text-center px-2">
                    <div className="flex items-center justify-center text-blue-500 mb-1">
                      <MessagesSquare className="w-4 h-4 mr-1" />
                      <p className="text-2xl font-bold">19</p>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Comments</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4 text-left border-b pb-3">My Recent Activity</h3>
                <div className="text-left text-gray-700 space-y-3">
                  <p className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                    Reported: Irregular water supply in RTC...
                  </p>
                  <p className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                    Commented: Streetlight on NG College Rd...
                  </p>
                  <p className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                    Confirmed: Broken pavement near Clock...
                  </p>
                  <a href="#" className="text-sm text-blue-500 hover:underline pt-2 block">
                    View all activity
                  </a>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center space-x-4">
                  <button className="text-sm text-gray-600 hover:text-blue-500 flex items-center space-x-1">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button className="text-sm text-red-700 hover:text-red-800 flex items-center space-x-1">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Mobile Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around md:hidden z-20 h-16">
          <button
            onClick={() => navigateTo("feed-view")}
            className={`flex flex-col items-center justify-center p-2 w-full ${
              currentView === "feed-view" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Feed</span>
          </button>
          <button
            onClick={() => navigateTo("map-view")}
            className={`flex flex-col items-center justify-center p-2 w-full ${
              currentView === "map-view" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <Map className="w-5 h-5" />
            <span className="text-xs mt-1">Map</span>
          </button>
          <button
            onClick={() => navigateTo("report-view")}
            className="flex flex-col items-center justify-center p-2 w-full relative -top-2"
          >
            <span className="bg-blue-500 text-white rounded-full p-3 shadow-lg">
              <Plus className="w-6 h-6" />
            </span>
          </button>
          <button
            onClick={() => navigateTo("trending-view")}
            className={`flex flex-col items-center justify-center p-2 w-full ${
              currentView === "trending-view" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs mt-1">Trending</span>
          </button>
          <button
            onClick={() => navigateTo("profile-view")}
            className={`flex flex-col items-center justify-center p-2 w-full ${
              currentView === "profile-view" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </nav>
      </div>
    </div>
  )
}

