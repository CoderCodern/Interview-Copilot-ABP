/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lint explicitly via `npm run lint`; don't let it block `next build`.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
