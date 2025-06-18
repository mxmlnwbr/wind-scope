"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Wind, Menu, Camera } from "lucide-react"
import React, { useEffect } from "react"
import { WindsurfingGraphEmbed } from "~/components/WindsurfingGraphEmbed"

export default function Home() {
  // State to track the selected webcam
  const [selectedWebcamIndex, setSelectedWebcamIndex] = React.useState(0);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [currentViewUrl, setCurrentViewUrl] = React.useState<string>("");
  
  // Effect to handle URL parameters for location sharing
  useEffect(() => {
    // Check for location parameter in URL
    const params = new URLSearchParams(window.location.search);
    const locationParam = params.get('location');
    
    if (locationParam) {
      // Find the webcam index that matches the location parameter
      const index = webcams.findIndex(webcam => 
        webcam.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 
        locationParam.toLowerCase().replace(/[^a-z0-9]/g, '')
      );
      
      if (index !== -1) {
        setSelectedWebcamIndex(index);
      }
    }
  }, []);

  // Ensure selectedWebcam is never undefined by defaulting to first webcam
  const selectedWebcam = webcams.length > 0 ? webcams[selectedWebcamIndex] ?? webcams[0] : null;

  // Function to handle tab change, refresh images, and update URL
  const handleTabChange = (index: number) => {
    setSelectedWebcamIndex(index);
    setRefreshKey(prev => prev + 1); // Increment refresh key to force re-render
    setMobileMenuOpen(false); // Close menu after selection
    
    // Update URL for sharing
    if (webcams[index]) {
      const locationSlug = webcams[index].name.toLowerCase().replace(/[^a-z0-9]/g, '');
      // Update URL without page reload
      window.history.pushState(
        { webcamIndex: index },
        webcams[index].name,
        `?location=${locationSlug}`
      );
    }
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
          
          {/* Utility links */}
          <div className="hidden md:flex items-center gap-4">
            {/* Navigation links can be added here in the future */}
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
                
                {/* Utility links in mobile menu */}
                <div className="mt-3 pt-3 border-t border-sky-700/30">
                  {/* Mobile navigation links can be added here in the future */}
                </div>
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
            {selectedWebcam && (
              <WebcamCard 
                key={`webcam-${selectedWebcamIndex}-${refreshKey}`} 
                webcam={selectedWebcam} 
                onViewChange={setCurrentViewUrl} 
              />
            )}
          </div>

                    
          {/* Windsurfing Urnersee Weather Graph - Only show for Flüelen and Isleten */}
          {selectedWebcam && 
           !selectedWebcam.name.includes("Sisikon") && 
           !selectedWebcam.name.includes("Oberaegeri") && (
            <div className="mt-2 mb-8 mx-auto max-w-5xl">
              <div className="bg-slate-900/40 border border-sky-700/30 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
                <div className="p-4 border-b border-sky-700/30">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-sky-300 to-blue-400 text-transparent bg-clip-text">Windsurfing Urnersee Weather Graph</h2>
                </div>
                <div className="p-4">
                  <WindsurfingGraphEmbed />
                </div>
              </div>
            </div>
          )}

          {/* Föhn diagram */}
          <div className="mt-2 mb-8 mx-auto max-w-5xl">
            <div className="bg-slate-900/40 border border-sky-700/30 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
              <div className="p-4 border-b border-sky-700/30">
                <h2 className="text-xl font-bold bg-gradient-to-r from-sky-300 to-blue-400 text-transparent bg-clip-text">Föhn Wind Diagram</h2>
              </div>
              <div className="flex justify-center bg-black p-2">
                <a href="https://profiwetter.ch/wind_foehn_ch_de.png?t=1699802646" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://profiwetter.ch/wind_foehn_ch_de.png?t=1699802646" 
                    alt="Föhn Wind Diagram" 
                    className="max-w-full h-auto cursor-pointer"
                    style={{ maxHeight: '400px' }}
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Windguru Forecast Overview */}
          <div className="mt-2 mb-8 mx-auto max-w-5xl">
            <div className="bg-slate-900/40 border border-sky-700/30 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
              <div className="p-4 border-b border-sky-700/30">
                <h2 className="text-xl font-bold bg-gradient-to-r from-sky-300 to-blue-400 text-transparent bg-clip-text">Windguru Forecast</h2>
              </div>
              <div className="p-2 bg-white">
                {/* Add key prop to force re-render when station ID changes */}
                <WindguruWidget 
                  key={`windguru-${currentViewUrl}-${selectedWebcamIndex}`}
                  stationId={
                    // For Sisikon, use station 57010
                    selectedWebcam?.name.includes("Sisikon") 
                      ? "57010" 
                      // For Oberaegeri/Ägeri, use station 147758
                      : selectedWebcam?.name.includes("Oberaegeri") 
                        ? "147758"
                        // For Flüelen webcams
                        : (selectedWebcam?.name.includes("Flüelen") && 
                           !(selectedWebcam?.name.includes("Windsurfing Urnersee") && 
                             currentViewUrl.toLowerCase().includes("isleten"))) 
                            ? "303067" : "988948"
                  } />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-sky-700/30 py-6 backdrop-blur-sm bg-slate-900/60">
        <div className="container mx-auto px-4">
          <div className="text-center text-sky-400/60">
            <p>&copy; {new Date().getFullYear()} WindScope. All rights reserved.</p>
            <p className="mt-3 text-sm">
              <span className="opacity-80">Have feedback or suggestions? </span>
              <a 
                href="mailto:maximilian.weber@bluewin.ch" 
                className="inline-block ml-1 px-3 py-1 bg-sky-700/40 hover:bg-sky-600/50 text-sky-300 hover:text-white rounded-md transition-colors text-xs font-medium border border-sky-700/50"
              >
                Send Feedback
              </a>
            </p>
            {process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_DATE && (
              <p className="mt-2 text-xs opacity-50">
                Last Webpage update: {new Date(process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_DATE).toLocaleString()} 
              </p>
            )}
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
    name: "Oberaegeri",
    location: "Segel Club Aegeri",
    image: "https://scae.ch/webcam/image.jpg",
    views: [
      {
        name: "Main View",
        image: "https://scae.ch/webcam/image.jpg",
      },
    ],
  },
]

// Windguru Widget Component using their official widget
function WindguruWidget({ stationId }: { stationId?: string }) {
  // Use nullish coalescing instead of default parameter to satisfy ESLint
  const finalStationId = stationId ?? "988948";
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear the container first
    containerRef.current.innerHTML = '';
    
    // Remove any existing windguru scripts
    const oldScripts = document.querySelectorAll('script[src*="windguru.cz/js/widget.php"]');
    oldScripts.forEach(script => script.remove());
    
    // Create a unique ID for this instance
    const widgetId = `wg_fwdg_${finalStationId}_100_${Date.now()}`;
    
    // Create the widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = widgetId;
    containerRef.current.appendChild(widgetContainer);
    
    // Create and load the Windguru script
    const script = document.createElement('script');
    const params = [
      `s=${finalStationId}`,
      'm=100',
      `uid=${widgetId}`,
      'ai=0',
      'wj=knots',
      'tj=c',
      'waj=m',
      'tij=cm',
      'odh=0',
      'doh=24',
      'fhours=240',
      'hrsm=2',
      'vt=forecasts',
      'lng=en',
      'idbs=1',
      'p=WINDSPD,GUST,SMER,TMPE,FLHGT,CDC,APCP1s,RATING'
    ];
    
    script.src = `https://www.windguru.cz/js/widget.php?${params.join('&')}`;
    document.body.appendChild(script);
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      script.remove();
    };
  }, [finalStationId]); // Re-run when finalStationId changes
  
  return (
    <div className="windguru-wrapper w-full overflow-x-auto bg-white p-2">
      <div ref={containerRef} className="windguru-container"></div>
    </div>
  );
}

function WebcamCard({ webcam, onViewChange }: { webcam: Webcam, onViewChange?: (viewUrl: string) => void }) {
  const [currentView, setCurrentView] = React.useState<string>(webcam.image);
  const [viewsExpanded, setViewsExpanded] = React.useState(false);
  const isSisikon = webcam.name.includes("Sisikon");
  const isWindsurfingUrnersee = webcam.name.includes("Windsurfing Urnersee");
  const isIsleten = webcam.name.includes("Isleten");
  const [refreshTimestamp, setRefreshTimestamp] = React.useState(Date.now());
  
  // Format current date for outdated message
  const formattedDate = new Date().toLocaleDateString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Function to add timestamp to URL to force refresh
  const getRefreshedUrl = (url: string) => {
    // Add timestamp for proxy URLs or Isleten webcam
    if (url.startsWith('/api/proxy') || (isIsleten && url.includes('webcam_isleten.jpg'))) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}t=${Date.now()}`;
    }
    return url;
  };

  // Handle view change with refresh
  const handleViewChange = (viewUrl: string) => {
    setCurrentView(viewUrl);
    setRefreshTimestamp(Date.now());
    // Notify parent component if callback provided
    if (onViewChange) {
      onViewChange(viewUrl);
    }
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
        <div className="w-full bg-black rounded-t-lg flex items-center justify-center relative" style={{ minHeight: '400px', maxHeight: '90vh', padding: '0' }}>
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
          ) : isWindsurfingUrnersee || isIsleten ? (
            <a href={currentView} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center relative">
              <img
                src={isIsleten ? getRefreshedUrl(currentView) : currentView}
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
                key={isIsleten ? refreshTimestamp : undefined}
              />
              {isWindsurfingUrnersee && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10 pointer-events-none">
                  <div className="bg-red-600/80 text-white px-6 py-3 rounded-lg text-center shadow-lg transform rotate-[-5deg] mb-4">
                    <p className="text-2xl font-bold">OUTDATED WEBCAM</p>
                  </div>
                  <div className="bg-slate-800/80 text-white px-4 py-2 rounded-md text-center max-w-md">
                    <p className="text-sm">This webcam feed is not current. Last checked: {(process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_DATE?.toLocaleString() ?? "Not available")}</p>
                  </div>
                </div>
              )}
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
                        ) : isIsleten ? (
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
                      ) : isIsleten ? (
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
