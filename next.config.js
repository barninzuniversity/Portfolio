/** @type {import('next').NextConfig} */
const nextConfig = {
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
  
  // Increase build memory allocation
  experimental: {
    serverMemoryBasedTurbopack: true,
  },
  
  // Set higher memory limit (though this is more effective via environment variables)
  // This setting is more a hint than a strict allocation
  poweredByHeader: false,
  
  images: {
    domains: ['portfolio-1-bda1.onrender.com'],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;