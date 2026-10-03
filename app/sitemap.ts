import type { MetadataRoute } from 'next'
import { projects } from '@/content/projects'

const BASE_URL = 'https://oi0.es'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/proyectos`, lastModified: new Date() },
    { url: `${BASE_URL}/contacto`, lastModified: new Date() },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/proyectos/${project.slug}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...projectRoutes]
}
