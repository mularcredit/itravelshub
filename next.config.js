/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        AMADEUS_CLIENT_ID: process.env.AMADEUS_CLIENT_ID,
        AMADEUS_CLIENT_SECRET: process.env.AMADEUS_CLIENT_SECRET,
    },
    experimental: {
        serverComponentsExternalPackages: ['puppeteer', 'puppeteer-extra', 'puppeteer-extra-plugin-stealth'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
}

module.exports = nextConfig
