"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Compass, Info, Map, Wind } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Wind className="h-8 w-8 text-sky-600" />
              <h1 className="text-2xl font-bold text-sky-900">WindScope</h1>
            </div>
            <nav className="flex gap-6">
              <Link href="#" className="text-sky-800 hover:text-sky-600 font-medium">
                Home
              </Link>
              <Link href="#" className="text-sky-800 hover:text-sky-600 font-medium">
                Forecast
              </Link>
              <Link href="#" className="text-sky-800 hover:text-sky-600 font-medium">
                Resources
              </Link>
              <Link href="#" className="text-sky-800 hover:text-sky-600 font-medium">
                Community
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-sky-900 mb-2">Wind Conditions</h2>
            <p className="text-sky-700 max-w-2xl mx-auto">
              Monitor real-time wind conditions at popular locations and learn about wind patterns with our
              comprehensive guides.
            </p>
          </div>

          <Tabs defaultValue="webcams" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="webcams" className="text-base">
                <Compass className="mr-2 h-4 w-4" />
                Live Webcams
              </TabsTrigger>
              <TabsTrigger value="diagrams" className="text-base">
                <Info className="mr-2 h-4 w-4" />
                Wind Guides
              </TabsTrigger>
            </TabsList>

            <TabsContent value="webcams" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {webcams.map((webcam, index) => (
                  <WebcamCard key={index} webcam={webcam} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="diagrams" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diagrams.map((diagram, index) => (
                  <DiagramCard key={index} diagram={diagram} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-sky-900 mb-3">Find Ideal Wind Locations</h2>
              <p className="text-sky-700 mb-4">
                Discover the best locations for wind activities based on current conditions, preferences, and proximity.
              </p>
              <Button className="bg-sky-600 hover:bg-sky-700">
                <Map className="mr-2 h-4 w-4" />
                Open Location Finder
              </Button>
            </div>
            <div className="flex-1">
              <Image
                src="/placeholder.svg?height=250&width=400"
                alt="Map of wind monitoring locations"
                width={400}
                height={250}
                className="rounded-lg shadow-sm"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-sky-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">WindScope</h3>
              <p className="text-sky-200">
                Your comprehensive resource for wind conditions, weather patterns, and community.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sky-200 hover:text-white">
                    Webcams
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sky-200 hover:text-white">
                    Wind Forecast
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sky-200 hover:text-white">
                    Learning Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sky-200 hover:text-white">
                    Community Forum
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
              <p className="text-sky-200 mb-4">Join our newsletter for updates on conditions and events.</p>
              <div className="flex gap-4">
                <Link href="#" className="text-sky-200 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-sky-200 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-sky-200 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-sky-800 text-center text-sky-300">
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

interface Diagram {
  title: string
  category: string
  image: string
  description: string
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
    name: "Hood River",
    location: "Oregon, USA",
    image: "/placeholder.svg?height=200&width=350",
    windSpeed: "18-22 knots",
    lastUpdated: "5 minutes ago",
  },
  {
    name: "Tarifa Beach",
    location: "Spain",
    image: "/placeholder.svg?height=200&width=350",
    windSpeed: "15-20 knots",
    lastUpdated: "2 minutes ago",
  },
  {
    name: "Lake Garda",
    location: "Italy",
    image: "/placeholder.svg?height=200&width=350",
    windSpeed: "12-16 knots",
    lastUpdated: "7 minutes ago",
  },
  {
    name: "Maui North Shore",
    location: "Hawaii, USA",
    image: "/placeholder.svg?height=200&width=350",
    windSpeed: "20-25 knots",
    lastUpdated: "Just now",
  },
  {
    name: "Cabarete",
    location: "Dominican Republic",
    image: "/placeholder.svg?height=200&width=350",
    windSpeed: "16-20 knots",
    lastUpdated: "3 minutes ago",
  },
  {
    name: "Bonaire",
    location: "Caribbean",
    image: "/placeholder.svg?height=200&width=350",
    windSpeed: "18-22 knots",
    lastUpdated: "10 minutes ago",
  },
]

const diagrams: Diagram[] = [
  {
    title: "Wind Patterns Basics",
    category: "Meteorology",
    image: "/placeholder.svg?height=200&width=350",
    description: "Learn the fundamentals of wind patterns and how they form across different regions.",
  },
  {
    title: "Weather Systems",
    category: "Meteorology",
    image: "/placeholder.svg?height=200&width=350",
    description: "Detailed breakdown of high and low pressure systems and their effect on wind.",
  },
  {
    title: "Reading Wind Forecasts",
    category: "Education",
    image: "/placeholder.svg?height=200&width=350",
    description: "Step-by-step guide to understanding and interpreting wind forecast data.",
  },
  {
    title: "Wind Window Explained",
    category: "Theory",
    image: "/placeholder.svg?height=200&width=350",
    description: "Understanding the wind window concept and how it affects various outdoor activities.",
  },
  {
    title: "Seasonal Wind Patterns",
    category: "Climate",
    image: "/placeholder.svg?height=200&width=350",
    description: "How wind patterns change throughout the seasons in different parts of the world.",
  },
  {
    title: "Wind Measurement Guide",
    category: "Equipment",
    image: "/placeholder.svg?height=200&width=350",
    description: "How to choose and use the right equipment for measuring wind speed and direction.",
  },
]

function WebcamCard({ webcam }: { webcam: Webcam }) {
  const [currentView, setCurrentView] = React.useState<string>(webcam.image);

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={currentView || "/placeholder.svg"}
          alt={`${webcam.name} webcam`}
          width={350}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-sky-600 text-white px-2 py-1 rounded-md text-sm font-medium">
          {webcam.windSpeed}
        </div>
        {webcam.isLive && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            LIVE
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{webcam.name}</CardTitle>
        <CardDescription>{webcam.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Updated {webcam.lastUpdated}</span>
          <Button variant="outline" size="sm">
            View Live
          </Button>
        </div>

        {webcam.views && webcam.views.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm font-medium mb-2">Available Views:</p>
            <div className="grid grid-cols-2 gap-2">
              {webcam.views.map((view, index) => (
                <div 
                  key={index} 
                  className="relative group cursor-pointer"
                  onClick={() => setCurrentView(view.image)}
                >
                  <Image
                    src={view.image || "/placeholder.svg"}
                    alt={view.name}
                    width={150}
                    height={80}
                    className={`w-full h-16 object-cover rounded-md ${currentView === view.image ? 'ring-2 ring-sky-500' : ''}`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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

function DiagramCard({ diagram }: { diagram: Diagram }) {
  return (
    <Card className="overflow-hidden">
      <Image
        src={diagram.image || "/placeholder.svg"}
        alt={diagram.title}
        width={350}
        height={200}
        className="w-full h-48 object-cover"
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{diagram.title}</CardTitle>
          <span className="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded-full">{diagram.category}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{diagram.description}</p>
        <Button variant="outline" size="sm" className="w-full">
          View Full Guide
        </Button>
      </CardContent>
    </Card>
  )
}
