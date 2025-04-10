# WindScope

WindScope is a web application that displays live webcam feeds and wind information from various locations. The application provides real-time updates on wind conditions, webcam views, and other relevant information for water sports enthusiasts.

## Features

- Live webcam feeds from various locations
- Real-time wind speed and condition information
- Multiple viewing angles for select locations
- Educational wind diagrams and resources
- Mobile-optimized responsive design
- Automatic image refresh (every 30 seconds)
- Location selection via burger menu on mobile
- Clickable webcam images for full-size viewing

## Technologies Used

- [Next.js](https://nextjs.org) - React framework for building the UI
- [Tailwind CSS](https://tailwindcss.com) - For styling
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Lucide React](https://lucide.dev/) - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd wind-scope
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Adding New Webcams

To add new webcams, update the `webcams` array in `src/app/page.tsx` with the new webcam information:

```javascript
{
  name: "Location Name",
  location: "Region",
  image: "https://example.com/webcam.jpg",
  windSpeed: "10-15 knots",
  lastUpdated: "Just now",
  isLive: true,
  views: [
    {
      name: "Main View",
      image: "https://example.com/webcam.jpg",
    },
    // Add additional views if available
  ],
}
```

If using external image URLs, make sure to add the domain to the `images.remotePatterns` array in `next.config.js`.

## Performance Optimizations

WindScope includes several performance optimizations:
- Lazy loading of images
- Preconnect and DNS prefetch for external resources
- Mobile web app capabilities
- Conditional rendering of UI elements

## Deployment

This application can be deployed on platforms like Vercel, Netlify, or using Docker. Follow the respective platform's deployment guides for more information.
