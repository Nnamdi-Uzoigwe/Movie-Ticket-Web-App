/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      domains: ['m.media-amazon.com'], // Add the hostname here
    },
  };
  
  export default nextConfig;
  