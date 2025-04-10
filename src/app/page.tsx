"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Wind, Menu } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function Home() {
  // State to track the selected webcam
  const [selectedWebcamIndex, setSelectedWebcamIndex] = React.useState(0);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Ensure selectedWebcam is never undefined by defaulting to first webcam
  const selectedWebcam = webcams.length > 0 ? webcams[selectedWebcamIndex] ?? webcams[0] : null;

  // Function to handle tab change and refresh images
  const handleTabChange = (index: number) => {
    setSelectedWebcamIndex(index);
    setRefreshKey(prev => prev + 1); // Increment refresh key to force re-render
    setMobileMenuOpen(false); // Close menu after selection
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white">
      <header className="border-b border-sky-700/30 backdrop-blur-sm bg-slate-900/60 sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Wind className="h-6 w-6 text-sky-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">WindScope</span>
          </div>
          
          {/* Mobile burger menu button */}
          <button 
            className="md:hidden flex items-center justify-center p-2 rounded-full bg-slate-800/70 text-sky-400 hover:text-sky-300 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle location menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 py-4 sm:py-8 relative">
        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="absolute top-0 left-0 right-0 z-20 md:hidden">
            <div className="bg-slate-900/95 backdrop-blur-md border-b border-sky-700/30 shadow-lg py-2 px-4 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col space-y-1">
                {webcams.map((webcam, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabChange(index)}
                    className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200 flex items-center ${
                      selectedWebcamIndex === index
                        ? 'bg-sky-500/20 text-white'
                        : 'text-sky-300/80 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mr-2 ${selectedWebcamIndex === index ? 'bg-sky-400' : 'bg-slate-700'}`}></span>
                    <div className="flex flex-col">
                      <span>{webcam.name}</span>
                      <span className="text-xs text-sky-300/60">{webcam.location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-2 sm:px-4">
          <div className="mx-auto max-w-4xl text-center mb-6 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-300 to-blue-400 text-transparent bg-clip-text md:text-5xl">Wind Conditions</h1>
          </div>

          {/* Desktop location selector - Hidden on mobile */}
          <div className="hidden md:flex justify-center mb-8">
            <div className="inline-flex p-1 bg-slate-800/50 backdrop-blur-sm rounded-full">
              {webcams.map((webcam, index) => (
                <button
                  key={index}
                  onClick={() => handleTabChange(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedWebcamIndex === index
                      ? 'bg-sky-500 text-white shadow-lg'
                      : 'text-sky-300/80 hover:text-white'
                  }`}
                >
                  {webcam.name}
                </button>
              ))}
            </div>
          </div>

          {/* Current location indicator for mobile */}
          <div className="md:hidden flex justify-center mb-4">
            {selectedWebcam && (
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 text-white font-medium"
                onClick={toggleMobileMenu}
              >
                <span>{selectedWebcam.name}</span>
                <span className="text-xs text-sky-300/80">▼</span>
              </button>
            )}
          </div>

          <div className="mt-4 sm:mt-6 mx-auto max-w-5xl">
            {selectedWebcam && <WebcamCard key={`webcam-${selectedWebcamIndex}-${refreshKey}`} webcam={selectedWebcam} />}
          </div>
          
          {/* Föhn diagram */}
          <div className="mt-2 mb-8 mx-auto max-w-5xl">
            <div className="bg-slate-900/40 border border-sky-700/30 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
              <div className="p-4 border-b border-sky-700/30">
                <h2 className="text-xl font-bold bg-gradient-to-r from-sky-300 to-blue-400 text-transparent bg-clip-text">Föhn Wind Diagram</h2>
              </div>
              <div className="flex justify-center bg-black p-2">
                <img 
                  src="https://profiwetter.ch/wind_foehn_ch_de.png?t=1699802646" 
                  alt="Föhn Wind Diagram" 
                  className="max-w-full h-auto"
                  style={{ maxHeight: '400px' }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-sky-700/30 py-6 backdrop-blur-sm bg-slate-900/60">
        <div className="container mx-auto px-4">
          <div className="text-center text-sky-400/60">
            <p>&copy; {new Date().getFullYear()} WindScope. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface Webcam {
  name: string
  location: string
  image: string
  windSpeed: string
  lastUpdated: string
  isLive?: boolean
  views?: {
    name: string
    image: string
  }[]
}

const webcams: Webcam[] = [
  {
    name: "Flüelen, Gruonbach",
    location: "Switzerland",
    image: "https://elbeato.bplaced.net/webcamSurfclub/webcam_bucht.jpg",
    windSpeed: "10-15 knots",
    lastUpdated: "Just now",
    isLive: true,
    views: [
      {
        name: "Bay View",
        image: "https://elbeato.bplaced.net/webcamSurfclub/webcam_bucht.jpg",
      },
      {
        name: "Axenegg View",
        image: "https://elbeato.bplaced.net/webcamSurfclub/webcam_axenegg.jpg",
      },
    ],
  },
  {
    name: "Sisikon, Bootshafen",
    location: "Switzerland",
    image: "/api/proxy?url=http://bhsboots.myhostpoint.ch/kamera04.jpg",
    windSpeed: "8-12 knots",
    lastUpdated: "Just now",
    isLive: true,
    views: [
      {
        name: "North View",
        image: "/api/proxy?url=http://bhsboots.myhostpoint.ch/kamera04.jpg",
      },
      {
        name: "South View",
        image: "/api/proxy?url=http://bhsboots.myhostpoint.ch/kamera05.jpg",
      },
    ],
  },
  {
    name: "Isleten",
    location: "Switzerland",
    image: "https://meteo.windsurfing-urnersee.ch/webcam_isleten.jpg",
    windSpeed: "8-12 knots",
    lastUpdated: "Just now",
    isLive: true,
    views: [
      {
        name: "Main View",
        image: "https://meteo.windsurfing-urnersee.ch/webcam_isleten.jpg",
      },
    ],
  },
  {
    name: "Flüelen, Windsurfing Urnersee",
    location: "Switzerland",
    image: "https://meteo.windsurfing-urnersee.ch/webcam_rechts.jpg",
    windSpeed: "10-15 knots",
    lastUpdated: "Just now",
    isLive: true,
    views: [
      {
        name: "Main View",
        image: "https://meteo.windsurfing-urnersee.ch/webcam_rechts.jpg",
      },
    ],
  },
]

function WebcamCard({ webcam }: { webcam: Webcam }) {
  const [currentView, setCurrentView] = React.useState<string>(webcam.image);
  const [viewsExpanded, setViewsExpanded] = React.useState(false);
  const isSisikon = webcam.name.includes("Sisikon");
  const isWindsurfingUrnersee = webcam.name.includes("Windsurfing Urnersee");
  const [refreshTimestamp, setRefreshTimestamp] = React.useState(Date.now());

  // Function to add timestamp to URL to force refresh
  const getRefreshedUrl = (url: string) => {
    // Only add timestamp for proxy URLs
    if (url.startsWith('/api/proxy')) {
      return `${url}&t=${Date.now()}`;
    }
    return url;
  };

  // Handle view change with refresh
  const handleViewChange = (viewUrl: string) => {
    setCurrentView(viewUrl);
    setRefreshTimestamp(Date.now());
    // On mobile, collapse the views panel after selection
    if (window.innerWidth < 768) {
      setViewsExpanded(false);
    }
  };

  // Toggle views expanded state (for mobile)
  const toggleViewsExpanded = () => {
    setViewsExpanded(!viewsExpanded);
  };

  // Auto-refresh every 30 seconds
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshTimestamp(Date.now());
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Get the current view URL with timestamp for refreshing
  const currentViewWithTimestamp = getRefreshedUrl(currentView);

  // Find the name of the current view
  const currentViewName = webcam.views?.find(view => view.image === currentView)?.name ?? "Main View";

  return (
    <Card className="overflow-hidden bg-slate-900/40 border-sky-700/30 backdrop-blur-sm shadow-xl rounded-xl">
      <div className="relative">
        <div className="w-full bg-black rounded-t-lg flex items-center justify-center" style={{ minHeight: '400px', maxHeight: '90vh', padding: '0' }}>
          {isSisikon ? (
            <a href={currentView} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
              <img 
                src={currentViewWithTimestamp} 
                alt={`${webcam.name} webcam`} 
                className="w-full h-auto object-contain cursor-pointer"
                key={refreshTimestamp}
                style={{ width: '100%', maxHeight: '100%', objectPosition: 'center' }}
                loading="lazy"
              />
            </a>
          ) : isWindsurfingUrnersee ? (
            <a href={currentView} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
              <img
                src={currentView}
                alt={`${webcam.name} webcam`}
                className="cursor-pointer"
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '100%', 
                  objectFit: 'contain',
                  objectPosition: 'top center'
                }}
                loading="lazy"
              />
            </a>
          ) : (
            <a href={currentView} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
              <img
                src={currentView}
                alt={`${webcam.name} webcam`}
                className="cursor-pointer"
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '100%', 
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
                loading="lazy"
              />
            </a>
          )}
        </div>
      </div>
      <CardHeader className="pb-2 relative z-10 px-3 sm:px-6 pt-4 pb-8 sm:pt-6">
        <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-300 to-blue-400 text-transparent bg-clip-text">{webcam.name}</CardTitle>
        <CardDescription className="text-sky-300/80">{webcam.location}</CardDescription>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-4 sm:pb-6">
        {webcam.views && webcam.views.length > 1 && (
          <div className="mt-2 pt-4 border-t border-sky-700/30">
            {/* Mobile view selector */}
            <div className="md:hidden">
              <div className="flex items-center justify-between mb-3">
                {webcam.views && webcam.views.length > 1 && (
                  <>
                    <p className="text-sm font-medium text-sky-300/80">Current View: <span className="text-white">{currentViewName}</span></p>
                    <button 
                      onClick={toggleViewsExpanded}
                      className="text-xs px-3 py-1 rounded-full bg-slate-800/70 text-sky-300 hover:text-white transition-colors"
                    >
                      {viewsExpanded ? 'Hide Views' : 'Change View'}
                    </button>
                  </>
                )}
              </div>
              
              {viewsExpanded && (
                <div className="space-y-2 mt-3 mb-2">
                  {webcam.views.map((view, index) => (
                    <button 
                      key={index} 
                      className={`w-full flex items-center p-2 rounded-lg transition-all duration-200 ${
                        currentView === view.image 
                          ? 'bg-sky-500/20 text-white' 
                          : 'bg-slate-800/50 text-sky-300/80 hover:text-white'
                      }`}
                      onClick={() => handleViewChange(view.image)}
                    >
                      <div className="w-16 h-16 bg-black rounded-md mr-3 flex-shrink-0 overflow-hidden">
                        {isSisikon ? (
                          <img 
                            src={getRefreshedUrl(view.image)} 
                            alt={view.name}
                            className="w-full h-full object-cover"
                            key={`thumb-mobile-${index}-${refreshTimestamp}`}
                            loading="lazy"
                          />
                        ) : (
                          <img
                            src={view.image}
                            alt={view.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <span className="font-medium">{view.name}</span>
                      {currentView === view.image && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-sky-400"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Desktop view selector - grid layout */}
            <div className="hidden md:block">
              <p className="text-sm font-medium mb-3 text-sky-300/80">Available Views:</p>
              <div className="grid grid-cols-2 gap-4">
                {webcam.views.map((view, index) => (
                  <div 
                    key={index} 
                    className="relative group cursor-pointer transform transition-all duration-200 hover:scale-105"
                    onClick={() => handleViewChange(view.image)}
                  >
                    <div className={`w-full h-32 bg-black rounded-lg shadow-md flex items-center justify-center ${currentView === view.image ? 'ring-2 ring-sky-400 shadow-sky-400/30' : ''}`}>
                      {isSisikon ? (
                        <img 
                          src={getRefreshedUrl(view.image)} 
                          alt={view.name}
                          className={`w-full h-auto object-contain transition-all duration-200 ${currentView === view.image ? '' : 'opacity-80 hover:opacity-100'}`}
                          key={`thumb-${index}-${refreshTimestamp}`}
                          style={{ width: '100%' }}
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={view.image}
                          alt={view.name}
                          className={`w-full h-auto object-contain transition-all duration-200 ${currentView === view.image ? '' : 'opacity-80 hover:opacity-100'}`}
                          style={{ width: '100%' }}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2">
                      <span className="text-white text-sm font-medium bg-slate-900/70 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                        {view.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
