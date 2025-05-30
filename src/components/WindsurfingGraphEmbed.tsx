"use client";

import React from 'react';

interface WindsurfingGraphEmbedProps {
  className?: string;
}

export function WindsurfingGraphEmbed({ className = '' }: WindsurfingGraphEmbedProps) {
  return (
    <div className={className}>
      <div className="relative w-full aspect-[3/1] min-h-[300px] border border-sky-700/30 rounded-md overflow-hidden">
        <iframe
          src="https://www.windsurfing-urnersee.ch/ueber-uns/wetter-und-webcam"
          className="absolute inset-0 w-full h-full"
          style={{
            // Position the iframe to show just the graph area
            position: 'absolute',
            top: '-325px', // Increased negative value to scroll down further
            left: '0',
            width: '100%',
            height: '1000px', // Increased height to ensure we capture the full graph
            border: 'none',
            transform: 'scale(1.0)', // Adjust scale if needed
          }}
          scrolling="no"
          title="Windsurfing Urnersee Weather Graph"
          loading="lazy"
        />
      </div>
      <p className="mt-2 text-sm text-sky-200">
        Weather graph from{' '}
        <a 
          href="https://www.windsurfing-urnersee.ch/ueber-uns/wetter-und-webcam" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sky-400 hover:underline"
        >
          windsurfing-urnersee.ch
        </a>
      </p>
    </div>
  );
}
