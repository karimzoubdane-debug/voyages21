/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/design/homepage-v2-luxe.html',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
