"use client"

import React from 'react';
import { ServerSideScreenshot } from '~/components/ServerSideScreenshot';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";

export default function ScreenshotDemo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-sky-300 mb-6">Screenshot Demo</h1>
      
      <Card className="border-sky-700/30 bg-slate-900/60 mb-6">
        <CardHeader>
          <CardTitle className="text-sky-300">Server-Side Screenshot Demo</CardTitle>
          <CardDescription className="text-sky-200">
            Capture screenshots of external websites using server-side rendering
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sky-100">
              This demo uses a server-side approach with Puppeteer to capture screenshots of external websites.
              It bypasses browser CORS restrictions for reliable screenshots.
            </p>
          </div>
          
          <ServerSideScreenshot 
            url="https://www.windsurfing-urnersee.ch/ueber-uns/wetter-und-webcam"
            selector=".wgs-graphdraginfo"
            title="Windsurfing Urnersee Weather Graph"
            description="Weather data from Windsurfing Urnersee"
          />
        </CardContent>
      </Card>
      

      
      <div className="mt-8 border-t border-sky-700/30 pt-6">
        <h2 className="text-xl font-semibold text-sky-400 mb-3">How It Works</h2>
        <div className="bg-slate-900/60 rounded-md p-4 border border-sky-700/30">
          <h3 className="text-lg font-medium text-sky-300 mb-2">Server-Side Screenshot Process</h3>
          <p className="text-sky-200 mb-3">
            The screenshot process uses Puppeteer, a headless browser, to:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sky-200">
            <li>Navigate to the specified URL</li>
            <li>Wait for the element matching the selector to load</li>
            <li>Capture a screenshot with padding to ensure the full element is visible</li>
            <li>Return the image data to your browser</li>
          </ol>
          <p className="mt-3 text-sky-200">
            This method is reliable because it runs on the server and isn&apos;t subject to 
            cross-origin restrictions that would prevent client-side capturing.
          </p>
        </div>
      </div>
      
      <div className="mt-8 border-t border-sky-700/30 pt-6">
        <h2 className="text-xl font-semibold text-sky-400 mb-3">Usage Example</h2>
        <div className="bg-slate-900/60 rounded-md p-4 border border-sky-700/30">
          <pre className="text-sm text-sky-200 overflow-x-auto">
{`// Import the ServerSideScreenshot component
import { ServerSideScreenshot } from '~/components/ServerSideScreenshot';

// Use it in your component
<ServerSideScreenshot 
  url="https://example.com"
  selector=".element-to-capture"
  title="Screenshot Title"
  description="Optional description of the screenshot"
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
