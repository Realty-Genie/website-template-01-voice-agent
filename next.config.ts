/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/**",
      }, {
        protocol: "https",
        hostname: "youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        // Optional: you can add port and pathname if needed for more specific paths
        // port: '',
        // pathname: '/your_imagekit_id/**', 
      },
    ],
  },
};
export default nextConfig;
