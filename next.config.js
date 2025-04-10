/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["elbeato.bplaced.net", "bhsboots.myhostpoint.ch", "meteo.windsurfing-urnersee.ch"],
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
    ],
    unoptimized: true,
  },
};

export default config;
