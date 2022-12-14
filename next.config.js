/** @type {import('next').NextConfig} */

// const withPWA = require("next-pwa");

const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
});

const nextConfig = withPWA({
    reactStrictMode: true,
    trailingSlash: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [{
            source: '/manifest.json',
            destination: '/api/manifest'
        }];
    }
});
module.exports = nextConfig;