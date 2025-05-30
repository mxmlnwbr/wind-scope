"use client"

import React from 'react';
import { WindsurfingGraphEmbed } from '~/components/WindsurfingGraphEmbed';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";

export default function WindsurfingGraphPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-sky-300 mb-6">Windsurfing Graph Screenshot</h1>
      
      <Card className="border-sky-700/30 bg-slate-900/60 mb-6">
        <CardHeader>
          <CardTitle className="text-sky-300">Windsurfing Urnersee Weather Graph</CardTitle>
          <CardDescription className="text-sky-200">
            Live weather graph from the Windsurfing Urnersee website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sky-100">
              This embeds the weather graph directly from the Windsurfing Urnersee website using an iframe.
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
        <h2 className="text-xl font-semibold text-sky-400 mb-3">Important Notes</h2>
        <div className="bg-slate-900/60 rounded-md p-4 border border-sky-700/30">
          <ul className="list-disc list-inside space-y-2 text-sky-200">
            <li>
              <strong>Permissions:</strong> Always ensure you have permission to embed 
              content from external websites. Most websites allow iframe embedding for public content.
            </li>
            <li>
              <strong>Real-time Data:</strong> The embedded graph always shows the latest data
              from the source website without needing to refresh.
            </li>
            <li>
              <strong>Cross-Origin Considerations:</strong> Some websites may use X-Frame-Options headers
              to prevent their content from being embedded in iframes. If the graph doesn't appear,
              this might be the reason.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
