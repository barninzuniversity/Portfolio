/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports to reduce server requirements
  output: 'export',
  
  // Configure image handling for static export
  images: {
    unoptimized: true,
  },
  
  // Add trailing slashes for better compatibility with static hosting
  trailingSlash: true,
  
  // Disable powered-by header
  poweredByHeader: false,
};

module.exports = nextConfig;
