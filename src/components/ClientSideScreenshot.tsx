'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

interface ClientSideScreenshotProps {
  url: string;
  selector?: string;
  width?: number;
  height?: number;
  onCapture?: (dataUrl: string) => void;
  className?: string;
}

export function ClientSideScreenshot({
  url,
  selector,
  width = 800,
  height = 600,
  onCapture,
  className = '',
}: ClientSideScreenshotProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const captureScreenshot = async () => {
    if (!iframeRef.current) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const iframe = iframeRef.current;
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (!iframeDocument) {
        throw new Error('Cannot access iframe content. This might be due to cross-origin restrictions.');
      }
      
      let element: HTMLElement | null = null;
      
      // If selector is provided, try to find the specific element
      if (selector) {
        element = iframeDocument.querySelector(selector) as HTMLElement;
        if (!element) {
          throw new Error(`Element with selector "${selector}" not found in iframe`);
        }
      } else {
        // Otherwise capture the entire body
        element = iframeDocument.body;
      }
      
      const canvas = await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        logging: false,
        windowWidth: width,
        windowHeight: height,
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      setScreenshotUrl(dataUrl);
      
      if (onCapture) {
        onCapture(dataUrl);
      }
    } catch (err) {
      console.error('Error capturing screenshot:', err);
      setError(err instanceof Error ? err.message : 'Failed to capture screenshot');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle iframe load event
  const handleIframeLoad = () => {
    // Wait a moment for any dynamic content to load
    setTimeout(() => {
      captureScreenshot();
    }, 2000);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2">Capturing screenshot...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 mb-4">
          <p className="font-medium">Error capturing screenshot:</p>
          <p>{error}</p>
          <p className="text-sm mt-2">
            Note: Due to cross-origin restrictions, client-side screenshots may not work for all websites.
          </p>
        </div>
      )}
      
      {screenshotUrl ? (
        <div>
          <img 
            src={screenshotUrl} 
            alt="Captured screenshot" 
            className="max-w-full border rounded-md shadow-sm"
          />
          <button
            onClick={captureScreenshot}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Refresh Screenshot
          </button>
        </div>
      ) : (
        <div>
          <iframe
            ref={iframeRef}
            src={url}
            width={width}
            height={height}
            onLoad={handleIframeLoad}
            className="border rounded-md"
            style={{ opacity: isLoading ? 0.5 : 1 }}
          />
        </div>
      )}
    </div>
  );
}
