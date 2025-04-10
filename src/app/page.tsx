"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Wind } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function Home() {
  // State to track the selected webcam
  const [selectedWebcamIndex, setSelectedWebcamIndex] = React.useState(0);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const selectedWebcam = webcams[selectedWebcamIndex];

  // Function to handle tab change and refresh images
  const handleTabChange = (index: number) => {
    setSelectedWebcamIndex(index);
    setRefreshKey(prev => prev + 1); // Increment refresh key to force re-render
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white">
      <header className="border-b border-sky-700/30 backdrop-blur-sm bg-slate-900/60 sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Wind className="h-6 w-6 text-sky-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">WindScope</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-300 to-blue-400 text-transparent bg-clip-text sm:text-5xl">Wind Conditions</h1>
            <p className="mt-4 text-lg text-sky-300/80">
              Monitor real-time wind conditions at popular locations.
            </p>
          </div>

          {/* Location selector */}
          <div className="flex justify-center mb-8">
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

          <div className="mt-6 mx-auto max-w-5xl">
            {selectedWebcam && <WebcamCard key={`webcam-${selectedWebcamIndex}-${refreshKey}`} webcam={selectedWebcam} />}
          </div>
          
          {/* Föhn diagram */}
          <div className="mt-2 mb-8 mx-auto max-w-4xl">
            <div className="bg-slate-900/40 border border-sky-700/30 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
              <div className="p-4 border-b border-sky-700/30">
                <h2 className="text-xl font-bold bg-gradient-to-r from-sky-300 to-blue-400 text-transparent bg-clip-text">Föhn Wind Diagram</h2>
              </div>
              <div className="flex justify-center bg-white p-2">
                <img 
                  src="https://profiwetter.ch/wind_foehn_ch_de.png?t=1699802646" 
                  alt="Föhn Wind Diagram" 
                  className="max-w-full h-auto"
                  style={{ maxHeight: '400px' }}
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
]

function WebcamCard({ webcam }: { webcam: Webcam }) {
  const [currentView, setCurrentView] = React.useState<string>(webcam.image);
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

  return (
    <Card className="overflow-hidden bg-slate-900/40 border-sky-700/30 backdrop-blur-sm shadow-xl rounded-xl">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-0"></div>
        <div className="w-full bg-black rounded-t-lg flex items-center justify-center" style={{ minHeight: '500px', maxHeight: '90vh', padding: '0' }}>
          {isSisikon ? (
            <img 
              src={currentViewWithTimestamp} 
              alt={`${webcam.name} webcam`} 
              className="w-full h-auto object-contain"
              key={refreshTimestamp}
              style={{ maxWidth: '100%', maxHeight: '100%', objectPosition: 'center' }}
            />
          ) : isWindsurfingUrnersee ? (
            <div className="w-full h-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={currentView}
                alt={`${webcam.name} webcam`}
                className="w-full h-auto object-contain"
                style={{ maxWidth: '100%', maxHeight: '100%', objectPosition: 'top center', transform: 'scale(0.95)' }}
              />
            </div>
          ) : (
            <div className="w-full h-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={currentView}
                alt={`${webcam.name} webcam`}
                className="w-full h-auto object-contain"
                style={{ maxWidth: '100%', maxHeight: '100%', objectPosition: 'center' }}
              />
            </div>
          )}
        </div>
      </div>
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-sky-300 to-blue-400 text-transparent bg-clip-text">{webcam.name}</CardTitle>
        <CardDescription className="text-sky-300/80">{webcam.location}</CardDescription>
      </CardHeader>
      <CardContent>
        {webcam.views && webcam.views.length > 0 && (
          <div className="mt-2 pt-4 border-t border-sky-700/30">
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
                      />
                    ) : (
                      <img
                        src={view.image}
                        alt={view.name}
                        className={`w-full h-auto object-contain transition-all duration-200 ${currentView === view.image ? '' : 'opacity-80 hover:opacity-100'}`}
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent rounded-lg flex items-end justify-center p-2">
                    <span className="text-white text-sm font-medium bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                      {view.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
