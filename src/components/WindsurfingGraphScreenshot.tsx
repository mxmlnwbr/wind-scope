'use client';

import { useState } from 'react';
import { ClientSideScreenshot } from './ClientSideScreenshot';

interface WindsurfingGraphScreenshotProps {
  className?: string;
}

export function WindsurfingGraphScreenshot({ className = '' }: WindsurfingGraphScreenshotProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const handleCapture = (dataUrl: string) => {
    setCapturedImage(dataUrl);
  };

  return (
    <div className={className}>
      <h2 className="text-xl font-semibold mb-4">Windsurfing Urnersee Weather Graph</h2>
      
      <ClientSideScreenshot
        url="https://windsurfing-urnersee.ch/"
        selector=".wgs-graphdraginfo" // The class of the weather graph as mentioned in your memory
        width={1000}
        height={800}
        onCapture={handleCapture}
        className="mb-6"
      />
      
      {capturedImage && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Download Screenshot</h3>
          <a 
            href={capturedImage} 
            download="windsurfing-graph.png"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Download Image
          </a>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h3 className="text-lg font-medium mb-2">Note about Cross-Origin Restrictions</h3>
        <p>
          Due to browser security restrictions, client-side screenshots may not work for all external websites.
          If you see a blank or partial screenshot, it's likely due to cross-origin resource sharing (CORS) policies.
        </p>
      </div>
    </div>
  );
}
