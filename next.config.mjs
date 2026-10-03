/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: '/work', destination: '/proyectos', permanent: true },
      { source: '/contact', destination: '/contacto', permanent: true },
      { source: '/talengo', destination: '/proyectos', permanent: true },
      { source: '/catalonia', destination: '/proyectos/catalonia', permanent: true },
      { source: '/burger-king', destination: '/proyectos/burger-king', permanent: true },
      { source: '/push', destination: '/proyectos/push', permanent: true },
      { source: '/rbi', destination: '/proyectos/rbi', permanent: true },
      { source: '/santalucia', destination: '/proyectos/santalucia', permanent: true },
      { source: '/rank-me-higher', destination: '/proyectos/rank-me-higher', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*.mp4',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
    ]
  },
}

export default nextConfig
