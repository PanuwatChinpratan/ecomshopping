/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["epic-projects.nyc3.digitaloceanspaces.com" ,"files.stripe.com"],
  },
};

module.exports = nextConfig;
