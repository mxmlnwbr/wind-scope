"use client"

import React, { useState } from 'react';
import { Camera, Loader2, Download, RefreshCw } from 'lucide-react';

interface ServerSideScreenshotProps {
  url: string;
  selector: string;
  title?: string;
  description?: string;
}

export const ServerSideScreenshot: React.FC<ServerSideScreenshotProps> = ({
  url,
  selector,
  title = 'Screenshot',
  description,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<number>(Date.now());

  const captureScreenshot = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create API URL with query parameters
      const apiUrl = `/api/screenshot?url=${encodeURIComponent(url)}&selector=${encodeURIComponent(selector)}&t=${timestamp}`;
      
      // Fetch the screenshot from our API
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server returned ${response.status}`);
      }
      
      // Create a blob URL from the response
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      setScreenshotUrl(objectUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error capturing screenshot:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshScreenshot = () => {
    setTimestamp(Date.now());
    captureScreenshot();
  };

  const downloadScreenshot = () => {
    if (!screenshotUrl) return;
    
    const link = document.createElement('a');
    link.href = screenshotUrl;
    link.download = `windsurfing-graph-${new Date().toISOString().split('T')[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="server-side-screenshot">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-sky-300">{title}</h3>
        {description && <p className="text-sm text-sky-200 mt-1">{description}</p>}
      </div>
      
      <div className="controls mb-4 flex flex-wrap gap-2">
        <button
          onClick={captureScreenshot}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium 
            transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
            bg-sky-700/40 hover:bg-sky-600/50 text-sky-300 hover:text-white border border-sky-700/50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              Capturing...
            </>
          ) : (
            <>
              <Camera className="mr-1 h-4 w-4" />
              Capture Screenshot
            </>
          )}
        </button>
        
        {screenshotUrl && (
          <>
            <button
              onClick={refreshScreenshot}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium 
                transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                bg-sky-700/40 hover:bg-sky-600/50 text-sky-300 hover:text-white border border-sky-700/50"
            >
              <RefreshCw className="mr-1 h-4 w-4" />
              Refresh
            </button>
            
            <button
              onClick={downloadScreenshot}
              className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium 
                transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                bg-sky-700/40 hover:bg-sky-600/50 text-sky-300 hover:text-white border border-sky-700/50"
            >
              <Download className="mr-1 h-4 w-4" />
              Download
            </button>
          </>
        )}
      </div>
      
      {error && (
        <div className="error-message mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded-md text-red-300">
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <div className="preview-container">
        {isLoading && (
          <div className="loading-placeholder h-64 flex items-center justify-center bg-slate-900/60 border border-sky-700/30 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
            <span className="ml-2 text-sky-300">Capturing screenshot...</span>
          </div>
        )}
        
        {!isLoading && !screenshotUrl && !error && (
          <div className="empty-placeholder h-64 flex items-center justify-center bg-slate-900/60 border border-sky-700/30 rounded-md">
            <p className="text-sky-400/60">Click "Capture Screenshot" to get started</p>
          </div>
        )}
        
        {screenshotUrl && !isLoading && (
          <div className="screenshot-preview border border-sky-700/30 rounded-md overflow-hidden">
            <img 
              src={screenshotUrl} 
              alt="Captured screenshot" 
              className="max-w-full h-auto"
            />
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs text-sky-400/60">
        <p>
          Screenshot captured server-side using Puppeteer. Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ServerSideScreenshot;
