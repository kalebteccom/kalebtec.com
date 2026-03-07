import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kalebtec.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  let projectPages: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload({ config })
    const projects = await payload.find({
      collection: 'projects',
      where: { status: { equals: 'published' } },
      limit: 1000,
    })

    projectPages = projects.docs.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Projects collection may not be available yet
  }

  return [...staticPages, ...projectPages]
}
