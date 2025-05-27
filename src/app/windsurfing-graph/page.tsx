"use client"

import React from 'react';
import { ServerSideScreenshot } from '~/components/ServerSideScreenshot';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";

export default function WindsurfingGraphPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-sky-300 mb-6">Windsurfing Graph Screenshot</h1>
      
      <Card className="border-sky-700/30 bg-slate-900/60 mb-6">
        <CardHeader>
          <CardTitle className="text-sky-300">Windsurfing Urnersee Weather Graph</CardTitle>
          <CardDescription className="text-sky-200">
            Capture the weather graph from the Windsurfing Urnersee website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sky-100">
              This uses a server-side approach with Puppeteer to capture the graph.
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
            <li>Navigate to the windsurfing website</li>
            <li>Wait for the graph element to load</li>
            <li>Capture a screenshot with padding to ensure the full graph is visible</li>
            <li>Return the image data to your browser</li>
          </ol>
          <p className="mt-3 text-sky-200">
            This method is reliable because it runs on the server and isn't subject to 
            cross-origin restrictions that would prevent client-side capturing.
          </p>
        </div>
      </div>
      
      <div className="mt-8 border-t border-sky-700/30 pt-6">
        <h2 className="text-xl font-semibold text-sky-400 mb-3">Important Notes</h2>
        <div className="bg-slate-900/60 rounded-md p-4 border border-sky-700/30">
          <ul className="list-disc list-inside space-y-2 text-sky-200">
            <li>
              <strong>Permissions:</strong> Always ensure you have permission to capture 
              and use content from external websites.
            </li>
            <li>
              <strong>Data Freshness:</strong> The captured screenshot represents the graph 
              at the moment of capture. For real-time data, you'll need to refresh.
            </li>
            <li>
              <strong>Server Resources:</strong> The server-side method uses more server resources 
              as it needs to launch a headless browser for each screenshot.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
