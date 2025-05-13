import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Geist } from "next/font/google";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0ea5e9" // A blue color that matches water theme
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://wind-scope.vercel.app"),
  title: "WindScope",
  description: "Live webcam feeds and wind information",
  icons: [{ rel: "icon", url: "/wind-scope.ico" }],
  keywords: ["windsurfing", "webcams", "wind conditions", "water sports", "live feeds"],
  authors: [{ name: "WindScope Team" }],
  openGraph: {
    title: "WindScope",
    description: "Live webcam feeds and wind information for windsurfing locations",
    url: "https://windscope.app", // Replace with your actual domain when deployed
    siteName: "WindScope",
    images: [
      {
        url: "/og-image.jpg", // Create this image in your public folder
        width: 1200,
        height: 630,
        alt: "WindScope - Live wind and webcam information",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WindScope",
    description: "Live webcam feeds and wind information for windsurfing locations",
    images: ["/og-image.jpg"], // Same as OpenGraph image
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  }
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <head>
        <link rel="preconnect" href="https://profiwetter.ch" />
        <link rel="dns-prefetch" href="https://profiwetter.ch" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-50 flex flex-col">
        {children}
      </body>
    </html>
  );
}
