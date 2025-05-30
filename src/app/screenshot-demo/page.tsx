"use client"

import React from 'react';
import { WindsurfingGraphEmbed } from '~/components/WindsurfingGraphEmbed';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";

export default function ScreenshotDemo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-sky-300 mb-6">Screenshot Demo</h1>
      
      <Card className="border-sky-700/30 bg-slate-900/60 mb-6">
        <CardHeader>
          <CardTitle className="text-sky-300">Windsurfing Graph Embed</CardTitle>
          <CardDescription className="text-sky-200">
            Direct iframe embed of the Windsurfing Urnersee weather graph
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sky-100">
              This demo uses a direct iframe embed to display the weather graph from the Windsurfing Urnersee website.
              The graph updates in real-time as the source website updates.
            </p>
          </div>
          
          <WindsurfingGraphEmbed />
        </CardContent>
      </Card>
      

      
      <div className="mt-8 border-t border-sky-700/30 pt-6">
        <h2 className="text-xl font-semibold text-sky-400 mb-3">How It Works</h2>
        <div className="bg-slate-900/60 rounded-md p-4 border border-sky-700/30">
          <h3 className="text-lg font-medium text-sky-300 mb-2">Direct Iframe Embed</h3>
          <p className="text-sky-200 mb-3">
            This approach uses a simple iframe to embed the weather graph directly:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sky-200">
            <li>The iframe loads the Windsurfing Urnersee website</li>
            <li>CSS positioning is used to focus on just the graph portion</li>
            <li>The graph updates in real-time as the source website updates</li>
            <li>No screenshot processing or server-side automation required</li>
          </ol>
          <p className="mt-3 text-sky-200">
            This method is the most reliable and efficient way to display the graph, as it simply embeds
            the original content directly from the source website.
          </p>
        </div>
      </div>
      
      <div className="mt-8 border-t border-sky-700/30 pt-6">
        <h2 className="text-xl font-semibold text-sky-400 mb-3">Usage Example</h2>
        <div className="bg-slate-900/60 rounded-md p-4 border border-sky-700/30">
          <pre className="text-sm text-sky-200 overflow-x-auto">
{`// Import the WindsurfingGraphEmbed component
import { WindsurfingGraphEmbed } from '~/components/WindsurfingGraphEmbed';

// Use it in your component
<WindsurfingGraphEmbed />

// The component handles all the iframe setup and positioning`}
          </pre>
        </div>
      </div>
    </div>
  );
}
