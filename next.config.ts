import type { NextConfig } from "next";

/**
 * Nothing to configure yet. Every image is a local /public path, so no
 * `remotePatterns` are needed; the SVG allowance that used to live here went
 * away with the placeholder art it existed for.
 *
 * Phase 2 (Cloudflare R2) will add `remotePatterns` for the media bucket.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
