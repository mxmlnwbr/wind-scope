"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Wind } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function Home() {
  // Ensure webcam data is available
  const firstWebcam = webcams.length > 0 ? webcams[0] : null;

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

          <div className="mt-10 mx-auto max-w-5xl">
            {firstWebcam && <WebcamCard webcam={firstWebcam} />}
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
]

function WebcamCard({ webcam }: { webcam: Webcam }) {
  const [currentView, setCurrentView] = React.useState<string>(webcam.image);

  return (
    <Card className="overflow-hidden bg-slate-900/40 border-sky-700/30 backdrop-blur-sm shadow-xl rounded-xl">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-0"></div>
        <Image
          src={currentView || "/placeholder.svg"}
          alt={`${webcam.name} webcam`}
          width={800}
          height={500}
          className="w-full object-contain bg-black rounded-t-lg"
          unoptimized={true}
        />
        {webcam.isLive && (
          <div className="absolute top-3 left-3 bg-red-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            LIVE
          </div>
        )}
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
                  onClick={() => setCurrentView(view.image)}
                >
                  <Image
                    src={view.image || "/placeholder.svg"}
                    alt={view.name}
                    width={300}
                    height={150}
                    className={`w-full h-32 object-contain bg-black rounded-lg shadow-md transition-all duration-200 ${currentView === view.image ? 'ring-2 ring-sky-400 shadow-sky-400/30' : 'opacity-80 hover:opacity-100'}`}
                    unoptimized={true}
                  />
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
