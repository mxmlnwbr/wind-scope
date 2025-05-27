"use client"

import React, { useRef, useState } from 'react';
import { ScreenshotCapture } from '~/components/ScreenshotCapture';
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function ScreenshotDemo() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const handleCapture = (dataUrl: string) => {
    setCapturedImage(dataUrl);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-sky-300 mb-6">Screenshot Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Example 1: Capture the card itself */}
        <div>
          <h2 className="text-xl font-semibold text-sky-400 mb-3">Example 1: Capture Component</h2>
          <ScreenshotCapture
            fileName="card-screenshot"
            showPreview={true}
            onCapture={handleCapture}
          >
            <Card className="border-sky-700/30 bg-slate-900/60">
              <CardHeader>
                <CardTitle className="text-sky-300">Capturable Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sky-100">
                  This entire card will be captured when you click the button below.
                </p>
                <div className="mt-4 p-3 bg-sky-950/50 rounded-md border border-sky-700/30">
                  <p className="text-sm text-sky-200">
                    This is a nested element that will also be included in the screenshot.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScreenshotCapture>
        </div>
        
        {/* Example 2: Capture by selector */}
        <div>
          <h2 className="text-xl font-semibold text-sky-400 mb-3">Example 2: Capture by Selector</h2>
          <div className="mb-4">
            <Card id="target-card" className="border-sky-700/30 bg-slate-900/60">
              <CardHeader>
                <CardTitle className="text-sky-300">Target Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sky-100">
                  This card has ID "target-card" and will be captured using a selector.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="p-2 bg-sky-950/50 rounded border border-sky-700/30">
                    <p className="text-xs text-sky-200">Item 1</p>
                  </div>
                  <div className="p-2 bg-sky-950/50 rounded border border-sky-700/30">
                    <p className="text-xs text-sky-200">Item 2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <ScreenshotCapture
            targetSelector="#target-card"
            fileName="selector-screenshot"
            imageType="image/jpeg"
            quality={0.9}
            showPreview={true}
          />
        </div>
      </div>
      
      {/* Captured image display */}
      {capturedImage && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-sky-400 mb-3">Captured Image (from Example 1)</h2>
          <div className="border border-sky-700/30 rounded-md p-2 bg-slate-900/60">
            <img 
              src={capturedImage} 
              alt="Captured screenshot" 
              className="max-w-full h-auto rounded"
            />
          </div>
        </div>
      )}
      
      {/* Usage instructions */}
      <div className="mt-12 border-t border-sky-700/30 pt-6">
        <h2 className="text-xl font-semibold text-sky-400 mb-3">How to Use the Screenshot Component</h2>
        <div className="bg-slate-900/60 rounded-md p-4 border border-sky-700/30">
          <pre className="text-sm text-sky-200 overflow-x-auto">
{`// Method 1: Wrap the content you want to capture
<ScreenshotCapture fileName="my-screenshot" showPreview={true}>
  <div>Content to capture</div>
</ScreenshotCapture>

// Method 2: Target an existing element by selector
<ScreenshotCapture 
  targetSelector="#my-element-id" 
  fileName="element-screenshot"
  imageType="image/jpeg"
  quality={0.9}
/>

// Method 3: Get the captured image as a data URL
<ScreenshotCapture
  targetSelector=".my-element-class"
  onCapture={(dataUrl) => {
    // Do something with the dataUrl
    console.log(dataUrl);
  }}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
