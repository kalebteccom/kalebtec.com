import type { MetadataRoute } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { locales } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kalebtec.com';

function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = locale === 'en' ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`;
  }
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: buildAlternates(''),
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: buildAlternates('/projects'),
    },
  ];

  let projectPages: MetadataRoute.Sitemap = [];

  try {
    const payload = await getPayload({ config });
    const projects = await payload.find({
      collection: 'projects',
      where: { status: { equals: 'published' } },
      limit: 1000,
    });

    projectPages = projects.docs.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: buildAlternates(`/projects/${project.slug}`),
    }));
  } catch {
    // Projects collection may not be available yet
  }

  return [...staticPages, ...projectPages];
}
