import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder dog art is SVG; allow the optimizer to serve it. The CSP
    // sandbox keeps SVGs from executing scripts. Real raster photos arrive later.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
