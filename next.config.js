/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["elbeato.bplaced.net", "bhsboots.myhostpoint.ch", "meteo.windsurfing-urnersee.ch", "profiwetter.ch"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elbeato.bplaced.net',
      },
      {
        protocol: 'https',
        hostname: 'bhsboots.myhostpoint.ch',
      },
      {
        protocol: 'http',
        hostname: 'bhsboots.myhostpoint.ch',
      },
      {
        protocol: 'https',
        hostname: 'meteo.windsurfing-urnersee.ch',
      },
      {
        protocol: 'https',
        hostname: 'profiwetter.ch',
      },
    ],
    unoptimized: true,
  },
  // Add environment variables at build time
  env: {
    NEXT_PUBLIC_VERCEL_DEPLOYMENT_DATE: new Date().toISOString(),
  },
};

export default config;
