/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/HelloMorroco",
        destination: "/WelcomeChina/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
