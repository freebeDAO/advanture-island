/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.multiavatar.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
