/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'psico01clothing.com.ar',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
  },
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
}

export default nextConfig

