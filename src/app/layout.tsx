import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "WindScope",
  description: "Live webcam feeds and wind information for Urnersee",
  icons: [{ rel: "icon", url: "/wind-scope.ico" }],
  keywords: ["windsurfing", "webcams", "wind conditions", "water sports", "live feeds"],
  authors: [{ name: "WindScope Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0ea5e9", // A blue color that matches water theme
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
      <body>{children}</body>
    </html>
  );
}
