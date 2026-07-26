/** @type {import('next').NextConfig} */

// GitHub Pages serves from https://<user>.github.io/<repo>/, so the app needs a
// base path in production. The deploy workflow sets NEXT_PUBLIC_BASE_PATH; local
// dev/build leave it empty so the site runs at the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  // Static HTML export — no server needed, deployable to any static host.
  output: 'export',
  reactStrictMode: true,
  // Emit /route/index.html so paths resolve correctly on GitHub Pages.
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    // next/image optimization requires a server; disable it for static export.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
