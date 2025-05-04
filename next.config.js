/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports to reduce server requirements
  output: 'export',
  
  // Optimize bundle size with webpack configuration
  webpack: (config) => {
    // Optimize bundle size
    config.optimization.minimize = true;
    
    // Split chunks better for large dependencies like three.js
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
      maxSize: 200000,
      cacheGroups: {
        three: {
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          name: 'three-vendors',
          priority: 10,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    };
    
    return config;
  },
  
  // Use SWC minify for better performance
  swcMinify: true,
  
  // Add trailing slashes for better compatibility with static hosting
  trailingSlash: true,
  
  // Disable server actions for static export
  experimental: {
    serverActions: false,
  },
  
  // Disable powered-by header
  poweredByHeader: false,
  
  // Configure images for static export
  images: {
    unoptimized: true,
    // Keep domains for any external images that might be used
    domains: ['portfolio-1-bda1.onrender.com'],
  },
};

module.exports = nextConfig;
