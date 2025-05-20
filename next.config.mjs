/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.lummi.ai'],
  },
  webpack: (config) => {
    // Add GLSL file handling
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: 'raw-loader',
    });
    return config;
  },
};

export default nextConfig;