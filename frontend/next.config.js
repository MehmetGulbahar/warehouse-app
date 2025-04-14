/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Explicitly disable the pages directory
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(extension => {
    return !process.env.NODE_ENV.startsWith('dev') || extension !== 'spec.tsx';
  })
}

module.exports = nextConfig
