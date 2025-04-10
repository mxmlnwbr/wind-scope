# WindScope

WindScope is a web application that displays live webcam feeds and wind information from various windsurfing and water sports locations around the world. The application provides real-time updates on wind conditions, webcam views, and other relevant information for water sports enthusiasts.

## Features

- Live webcam feeds from popular windsurfing locations
- Real-time wind speed and condition information
- Multiple viewing angles for select locations
- Educational wind diagrams and resources

## Technologies Used

- [Next.js](https://nextjs.org) - React framework for building the UI
- [Tailwind CSS](https://tailwindcss.com) - For styling
- [Shadcn UI](https://ui.shadcn.com/) - Component library

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

To add new webcams, update the `webcams` array in `src/app/page.tsx` with the new webcam information. If using external image URLs, make sure to add the domain to the `images.domains` array in `next.config.js`.

## Deployment

This application can be deployed on platforms like Vercel, Netlify, or using Docker. Follow the respective platform's deployment guides for more information.
